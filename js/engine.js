/**
 * 게임 엔진 — 시점 선택 / 씬 진행 / 게이지 갱신 / 선택지 처리만 담당합니다.
 * 스토리 내용(js/data.js, js/husband-data.js)에는 관여하지 않습니다.
 *
 * 진행 순서: 배경 출력 → 캐릭터 출력 → 대사 출력 → 선택지 출력
 *           → 플레이어 선택 → 인내심 변경(해당 루트만) → 다음 장면
 */

(function () {
  const EFFECT_CLASSES = [
    "cam-zoom-in",
    "cam-zoom-in-slow",
    "cam-tilt-up",
    "fx-shake",
    "fx-flash",
    "fx-desaturate",
  ];

  const state = {
    activeData: GAME_DATA,
    patience: GAME_DATA.initialPatience,
    currentSceneId: null,
  };

  const el = {
    titleScreen: document.getElementById("title-screen"),
    routeWife: document.getElementById("route-wife"),
    routeHusband: document.getElementById("route-husband"),
    game: document.getElementById("game"),

    chapterLabel: document.getElementById("chapter-label"),
    cueCaption: document.getElementById("cue-caption"),
    bgLayer: document.getElementById("bg-layer"),
    guestSilhouette: document.getElementById("guest-silhouette"),

    portraitWrap: document.getElementById("portrait-wrap"),
    portrait: document.getElementById("portrait"),

    speakerName: document.getElementById("speaker-name"),
    dialogueText: document.getElementById("dialogue-text"),
    dialogueBox: document.getElementById("dialogue-box"),
    choices: document.getElementById("choices"),
    stage: document.getElementById("stage"),

    gaugeWrap: document.getElementById("gauge-wrap"),
    gaugeFill: document.getElementById("gauge-bar-fill"),
    gaugeValue: document.getElementById("gauge-value"),

    endingScreen: document.getElementById("ending-screen"),
    endingBgLayer: document.getElementById("ending-bg-layer"),
    endingTitle: document.getElementById("ending-title"),
    endingDesc: document.getElementById("ending-desc"),
    endingRestart: document.getElementById("ending-restart"),
  };

  function backgroundLayers(scene) {
    if (scene.bgImage) {
      return {
        image: `${scene.bgGradient || "none"}, url("${scene.bgImage}")`,
        size: "cover, cover",
      };
    }
    return {
      image: scene.bgGradient || "none",
      size: "cover",
    };
  }

  function clampPatience(value) {
    return Math.max(GAME_DATA.minPatience, Math.min(GAME_DATA.maxPatience, value));
  }

  function updateGauge() {
    const pct = clampPatience(state.patience);
    el.gaugeFill.style.width = pct + "%";
    el.gaugeValue.textContent = pct + "%";
  }

  function applyPatienceDelta(delta) {
    if (typeof delta !== "number") return;
    state.patience = clampPatience(state.patience + delta);
    updateGauge();
  }

  function resolveEndingSceneId() {
    const pct = clampPatience(state.patience);
    const thresholds = state.activeData.endingThresholds;
    const match = thresholds.find((t) => pct >= t.min && pct <= t.max);
    return match ? match.sceneId : thresholds[thresholds.length - 1].sceneId;
  }

  function renderStageVisuals(scene) {
    const layers = backgroundLayers(scene);
    el.bgLayer.style.backgroundImage = layers.image;
    el.bgLayer.style.backgroundSize = layers.size;
    el.bgLayer.style.backgroundPosition = "center";

    el.guestSilhouette.classList.toggle("hidden", !scene.showGuest);
  }

  function renderEffects(scene) {
    el.stage.classList.remove(...EFFECT_CLASSES);

    if (scene.cameraEffect) {
      el.stage.classList.add(scene.cameraEffect);
    }

    if (scene.screenEffect) {
      // 강제 리플로우로 동일한 효과가 연속 씬에서도 다시 재생되게 한다.
      void el.stage.offsetWidth;
      el.stage.classList.add(scene.screenEffect);
    }
  }

  function renderCue(scene) {
    if (scene.cue) {
      el.cueCaption.textContent = scene.cue;
      el.cueCaption.classList.remove("hidden");
    } else {
      el.cueCaption.classList.add("hidden");
    }
    el.cueCaption.classList.toggle("with-chapter", Boolean(scene.chapterLabel));
  }

  function renderPortrait(scene) {
    if (scene.character) {
      el.portrait.src = scene.character;
      el.portraitWrap.classList.remove("hidden");
    } else {
      el.portrait.removeAttribute("src");
      el.portraitWrap.classList.add("hidden");
    }
  }

  function renderChoices(scene) {
    el.choices.innerHTML = "";

    if (scene.choices && scene.choices.length > 0) {
      scene.choices.slice(0, 2).forEach((choice) => {
        const btn = document.createElement("button");
        btn.className = "choice-btn";
        btn.type = "button";

        const labelSpan = document.createElement("span");
        labelSpan.textContent = choice.label;
        btn.appendChild(labelSpan);

        if (typeof choice.patienceDelta === "number") {
          const deltaSpan = document.createElement("span");
          deltaSpan.className = "choice-delta";
          const sign = choice.patienceDelta > 0 ? "+" : "";
          deltaSpan.textContent = `(인내심 ${sign}${choice.patienceDelta}%)`;
          btn.appendChild(deltaSpan);
        }

        btn.addEventListener("click", () => {
          applyPatienceDelta(choice.patienceDelta);
          goToScene(choice.next);
        });
        el.choices.appendChild(btn);
      });
      return;
    }

    if (scene.next) {
      const btn = document.createElement("button");
      btn.className = "choice-btn";
      btn.id = "next-hint";
      btn.type = "button";
      btn.textContent = "▶ 다음";
      btn.addEventListener("click", () => goToScene(scene.next));
      el.choices.appendChild(btn);
    }
  }

  function renderEnding(scene) {
    el.dialogueBox.classList.add("hidden");
    el.choices.classList.add("hidden");
    el.stage.classList.add("hidden");
    el.gaugeWrap.classList.add("hidden");
    el.chapterLabel.classList.add("hidden");
    el.cueCaption.classList.add("hidden");

    const layers = backgroundLayers(scene);
    el.endingBgLayer.style.backgroundImage = layers.image;
    el.endingBgLayer.style.backgroundSize = layers.size;

    el.endingScreen.classList.remove("hidden");
    el.endingTitle.textContent = scene.title || "ENDING";
    el.endingDesc.textContent = scene.text || "";
    el.endingRestart.classList.remove("hidden");
  }

  function goToScene(sceneId) {
    const scene = state.activeData.scenes[sceneId];

    if (!scene) {
      console.error("존재하지 않는 씬 id 입니다:", sceneId);
      return;
    }

    state.currentSceneId = sceneId;

    if (scene.isEndingCheck) {
      goToScene(resolveEndingSceneId());
      return;
    }

    if (scene.isEnding) {
      renderEnding(scene);
      return;
    }

    if (scene.chapterLabel) {
      el.chapterLabel.textContent = scene.chapterLabel;
      el.chapterLabel.classList.remove("hidden");
    } else {
      el.chapterLabel.classList.add("hidden");
    }

    renderStageVisuals(scene);
    renderEffects(scene);
    renderCue(scene);
    renderPortrait(scene);
    el.speakerName.textContent = scene.speaker || "";
    el.dialogueText.textContent = scene.text || "";
    renderChoices(scene);
  }

  function startWifeRoute() {
    state.activeData = GAME_DATA;

    el.titleScreen.classList.add("hidden");
    el.game.classList.remove("hidden");
    el.gaugeWrap.classList.remove("hidden");

    state.patience = clampPatience(GAME_DATA.initialPatience);
    updateGauge();
    goToScene(GAME_DATA.startScene);
  }

  function startHusbandRoute() {
    state.activeData = GAME_DATA_HUSBAND;

    el.titleScreen.classList.add("hidden");
    el.game.classList.remove("hidden");
    el.gaugeWrap.classList.add("hidden");

    goToScene(GAME_DATA_HUSBAND.startScene);
  }

  function resetToTitle() {
    el.endingScreen.classList.add("hidden");
    el.endingRestart.classList.add("hidden");
    el.dialogueBox.classList.remove("hidden");
    el.choices.classList.remove("hidden");
    el.stage.classList.remove("hidden");
    el.stage.classList.remove(...EFFECT_CLASSES);
    el.game.classList.add("hidden");
    el.titleScreen.classList.remove("hidden");
  }

  el.routeWife.addEventListener("click", startWifeRoute);
  el.routeHusband.addEventListener("click", startHusbandRoute);
  el.endingRestart.addEventListener("click", resetToTitle);

  // 부팅 로딩 연출: 로딩바가 다 채워질 즈음 타이틀 화면을 드러낸다.
  const bootOverlay = document.getElementById("boot-overlay");
  if (bootOverlay) {
    setTimeout(() => bootOverlay.classList.add("boot-done"), 1300);
  }
})();
