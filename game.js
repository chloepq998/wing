/*
 * 이상 「날개」 2인용 선택지 게임 — 엔진
 * ---------------------------------------------------------------------------
 * 시나리오는 scenes.js(window.WINGS_SCENES)에서만 읽습니다.
 * 텍스트/분기를 바꾸려면 scenes.js만 수정하세요. 이 파일은 건드릴 필요가 없습니다.
 */
(function () {
  "use strict";

  var DATA = window.WINGS_SCENES;
  var ADVANCE_DELAY = 700; // 둘 다 선택한 뒤 다음 장면까지의 여운(ms)

  // 게임 상태
  var state = { nodeId: DATA.start, left: null, right: null };

  // 사이드별 DOM 참조
  var els = {
    left: {
      panel: document.getElementById("panel-left"),
      text: document.getElementById("left-text"),
      choices: document.getElementById("left-choices"),
      waiting: document.getElementById("left-waiting")
    },
    right: {
      panel: document.getElementById("panel-right"),
      text: document.getElementById("right-text"),
      choices: document.getElementById("right-choices"),
      waiting: document.getElementById("right-waiting")
    }
  };
  var splitEl = document.getElementById("split");
  var endingEl = document.getElementById("ending");
  var endingTitleEl = document.getElementById("ending-title");
  var endingLeftEl = document.getElementById("ending-left");
  var endingRightEl = document.getElementById("ending-right");

  // 한 장면(노드)을 그린다
  function renderNode() {
    var node = DATA.nodes[state.nodeId];
    if (!node) {
      console.error("알 수 없는 노드:", state.nodeId);
      return;
    }
    if (node.ending) {
      renderEnding(node);
      return;
    }

    // 선택 초기화 + 분할 화면 표시
    state.left = null;
    state.right = null;
    endingEl.hidden = true;
    splitEl.hidden = false;

    renderSide("left", node.left);
    renderSide("right", node.right);
  }

  // 한쪽 패널을 그린다
  function renderSide(side, sideData) {
    var side_els = els[side];
    side_els.text.textContent = sideData.text;
    side_els.waiting.hidden = true;
    side_els.panel.classList.remove("is-locked");
    side_els.choices.innerHTML = "";

    sideData.choices.forEach(function (choice) {
      var btn = document.createElement("button");
      btn.className = "choice-btn";
      btn.textContent = choice.label;
      btn.dataset.choice = choice.id;
      btn.addEventListener("click", function () {
        choose(side, choice.id);
      });
      side_els.choices.appendChild(btn);
    });
  }

  // 한쪽 플레이어가 선택
  function choose(side, choiceId) {
    if (state[side] !== null) return; // 이미 선택함(잠김)
    state[side] = choiceId;
    lockSide(side, choiceId);

    if (state.left !== null && state.right !== null) {
      advance();
    }
  }

  // 선택한 쪽 잠금 + 대기 표시
  function lockSide(side, choiceId) {
    var side_els = els[side];
    side_els.panel.classList.add("is-locked");
    var buttons = side_els.choices.querySelectorAll(".choice-btn");
    buttons.forEach(function (btn) {
      btn.disabled = true;
      if (btn.dataset.choice === choiceId) {
        btn.classList.add("chosen");
      }
    });
    side_els.waiting.hidden = false;
  }

  // 두 선택 조합으로 다음 노드 결정
  function advance() {
    var node = DATA.nodes[state.nodeId];
    var key = state.left + "_" + state.right;
    var nextId = node.next[key];
    if (!nextId) {
      console.error("조합에 대한 다음 노드가 없음:", key, "노드:", node.id);
      return;
    }
    state.nodeId = nextId;
    setTimeout(renderNode, ADVANCE_DELAY);
  }

  // 엔딩 화면
  function renderEnding(node) {
    splitEl.hidden = true;
    endingEl.hidden = false;
    endingTitleEl.textContent = node.title;
    endingLeftEl.textContent = node.left.text;
    endingRightEl.textContent = node.right.text;
    endingEl.dataset.ending = node.id; // CSS 훅(엔딩별 스타일링용)
  }

  // 다시 시작
  document.getElementById("restart").addEventListener("click", function () {
    state.nodeId = DATA.start;
    renderNode();
  });

  // 시작
  renderNode();
})();
