/**
 * 게임 엔진 — 시점 선택 / 씬 진행 / 게이지 갱신 / 선택지 처리만 담당합니다.
 * 스토리 내용(js/data.js)에는 관여하지 않습니다.
 *
 * 진행 순서: 배경 출력 → 캐릭터 출력 → 대사 출력 → 선택지 출력
 *           → 플레이어 선택 → 인내심 변경 → 다음 장면
 */

(function () {
  const state = {
    patience: GAME_DATA.initialPatience,
    currentSceneId: null,
  };

  const el = {
    titleScreen: document.getElementById("title-screen"),
    routeWife: document.getElementById("route-wife"),
    routeHusband: document.getElementById("route-husband"),
    game: document.getElementById("game"),

    chapterLabel: document.getElementById("chapter-label"),
    bgLayer: document.getElementById("bg-layer"),
    guestSilhouette: document.getElementById("guest-silhouette"),
    character: document.getElementById("character"),

    speakerName: document.getElementById("speaker-name"),
    dialogueText: document.getElementById("dialogue-text"),
    dialogueBox: document.getElementById("dialogue-box"),
    choices: document.getElementById("choices"),
    stage: document.getElementById("stage"),

    gaugeWrap: document.getElementById("gauge-wrap"),
    gaugeFill: document.getElementById("gauge-bar-fill"),
    gaugeValue: document.getElementById("gauge-value"),

    endingScreen: document.getElementById("ending-screen"),
    endingTitle: document.getElementById("ending-title"),
    endingDesc: document.getElementById("ending-desc"),
    endingRestart: document.getElementById("ending-restart"),
  };

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
    const match = GAME_DATA.endingThresholds.find(
      (t) => pct >= t.min && pct <= t.max
    );
    return match ? match.sceneId : GAME_DATA.endingThresholds[GAME_DATA.endingThresholds.length - 1].sceneId;
  }

  function renderStageVisuals(scene) {
    el.bgLayer.style.background = scene.bgGradient || "#000";

    if (scene.character) {
      el.character.src = scene.character;
      el.character.classList.remove("hidden");
    } else {
      el.character.removeAttribute("src");
      el.character.classList.add("hidden");
    }

    el.guestSilhouette.classList.toggle("hidden", !scene.showGuest);
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
    el.stage.classList.add("hidden");
    el.gaugeWrap.classList.add("hidden");
    el.chapterLabel.classList.add("hidden");

    el.endingScreen.classList.remove("hidden");
    el.endingTitle.textContent = scene.title || "ENDING";
    el.endingDesc.textContent = scene.text || "";
    el.endingRestart.classList.remove("hidden");
  }

  function goToScene(sceneId) {
    const scene = GAME_DATA.scenes[sceneId];

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
    el.speakerName.textContent = scene.speaker || "";
    el.dialogueText.textContent = scene.text || "";
    renderChoices(scene);
  }

  function startWifeRoute() {
    el.titleScreen.classList.add("hidden");
    el.game.classList.remove("hidden");

    state.patience = clampPatience(GAME_DATA.initialPatience);
    updateGauge();
    goToScene(GAME_DATA.startScene);
  }

  function showHusbandRouteLocked() {
    const descSpan = el.routeHusband.querySelector(".route-desc");
    if (!descSpan) return;
    const original = descSpan.textContent;
    descSpan.textContent = "아직 개발 중입니다";
    setTimeout(() => {
      descSpan.textContent = original;
    }, 1500);
  }

  function resetToTitle() {
    el.endingScreen.classList.add("hidden");
    el.endingRestart.classList.add("hidden");
    el.dialogueBox.classList.remove("hidden");
    el.stage.classList.remove("hidden");
    el.gaugeWrap.classList.remove("hidden");
    el.game.classList.add("hidden");
    el.titleScreen.classList.remove("hidden");
  }

  el.routeWife.addEventListener("click", startWifeRoute);
  el.routeHusband.addEventListener("click", showHusbandRouteLocked);
  el.endingRestart.addEventListener("click", resetToTitle);
})();
