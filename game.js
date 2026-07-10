/*
 * 이상 「날개」 1인용 루트 선택형 게임 — 엔진
 * ---------------------------------------------------------------------------
 * 시나리오는 scenes.js(window.WINGS_SCENES)에서만 읽습니다.
 * 텍스트/선택지/분기를 바꾸려면 scenes.js만 수정하세요. 이 파일은 건드릴 필요가 없습니다.
 */
(function () {
  "use strict";

  var ROUTES = window.WINGS_SCENES.routes;

  // 게임 상태
  var state = { route: null, nodeId: null };

  // DOM 참조
  var startScreenEl = document.getElementById("start-screen");
  var storyEl = document.getElementById("story");
  var routeBadgeEl = document.getElementById("route-badge");
  var storyTextEl = document.getElementById("story-text");
  var storyChoicesEl = document.getElementById("story-choices");
  var endingEl = document.getElementById("ending");
  var endingTitleEl = document.getElementById("ending-title");
  var endingTextEl = document.getElementById("ending-text");

  // 현재 루트의 노드 테이블
  function currentNodes() {
    return ROUTES[state.route].nodes;
  }

  // 시작화면 → 루트 선택
  document.querySelectorAll(".route-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      state.route = btn.dataset.route;
      state.nodeId = ROUTES[state.route].start;
      startScreenEl.hidden = true;
      endingEl.hidden = true;
      storyEl.hidden = false;
      renderNode();
    });
  });

  // 한 노드(장면 또는 엔딩)를 그린다
  function renderNode() {
    var node = currentNodes()[state.nodeId];
    if (!node) {
      console.error("알 수 없는 노드:", state.nodeId);
      return;
    }
    if (node.ending) {
      renderEnding(node);
      return;
    }

    routeBadgeEl.textContent = "지금은 " + ROUTES[state.route].label + " 시점입니다";
    storyTextEl.textContent = node.text;
    storyChoicesEl.innerHTML = "";

    node.choices.forEach(function (choice) {
      var btn = document.createElement("button");
      btn.className = "choice-btn";
      btn.textContent = choice.label;
      btn.addEventListener("click", function () {
        state.nodeId = choice.next;
        renderNode();
      });
      storyChoicesEl.appendChild(btn);
    });
  }

  // 엔딩 화면
  function renderEnding(node) {
    storyEl.hidden = true;
    endingEl.hidden = false;
    endingEl.dataset.trueEnding = node.trueEnding ? "true" : "false";
    endingEl.dataset.ending = node.id; // CSS 훅(엔딩별 스타일링용)
    endingTitleEl.textContent = node.title;
    endingTextEl.textContent = node.text;
  }

  // 처음으로 → 시작화면으로 복귀 (루트 재선택 가능)
  document.getElementById("restart").addEventListener("click", function () {
    state.route = null;
    state.nodeId = null;
    endingEl.hidden = true;
    storyEl.hidden = true;
    startScreenEl.hidden = false;
  });
})();
