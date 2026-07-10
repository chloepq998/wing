/*
 * 이상 「날개」 2인용 선택지 게임 — 시나리오 데이터 (단일 진실 공급원)
 * ---------------------------------------------------------------------------
 * 나중에 비주얼/시나리오를 입힐 때는 이 파일의 text / label / title 문자열만
 * 교체하면 됩니다. game.js(로직)와 styles.css(디자인)는 건드릴 필요가 없습니다.
 *
 * 노드 스키마
 *   일반 노드: { id, left, right, next }
 *     left / right = { text, choices: [{ id, label }, ...] }   // left=아내, right=주인공
 *     next         = { "좌선택id_우선택id": "다음노드id", ... }
 *   엔딩 노드: { id, ending: true, title, left:{text}, right:{text} }  // choices/next 없음
 */
window.WINGS_SCENES = {
  start: "s1",
  nodes: {
    // ── 장면 1 ──────────────────────────────────────────────
    s1: {
      id: "s1",
      left: {
        text: "[아내 · 장면 1]\n여기에 아내 쪽 시나리오 텍스트가 들어갑니다.",
        choices: [
          { id: "a", label: "[아내 선택 1-A]" },
          { id: "b", label: "[아내 선택 1-B]" }
        ]
      },
      right: {
        text: "[주인공 · 장면 1]\n여기에 주인공 쪽 시나리오 텍스트가 들어갑니다.",
        choices: [
          { id: "a", label: "[주인공 선택 1-A]" },
          { id: "b", label: "[주인공 선택 1-B]" }
        ]
      },
      next: { "a_a": "s2", "a_b": "s2", "b_a": "s3", "b_b": "s3" }
    },

    // ── 장면 2 (아내가 1에서 'a'를 고른 흐름) ────────────────
    s2: {
      id: "s2",
      left: {
        text: "[아내 · 장면 2]\n여기에 아내 쪽 시나리오 텍스트가 들어갑니다.",
        choices: [
          { id: "a", label: "[아내 선택 2-A]" },
          { id: "b", label: "[아내 선택 2-B]" }
        ]
      },
      right: {
        text: "[주인공 · 장면 2]\n여기에 주인공 쪽 시나리오 텍스트가 들어갑니다.",
        choices: [
          { id: "a", label: "[주인공 선택 2-A]" },
          { id: "b", label: "[주인공 선택 2-B]" }
        ]
      },
      // 좌우 모두 'a'일 때만 성공 엔딩
      next: { "a_a": "e_success", "a_b": "e_reunion", "b_a": "e_reunion", "b_b": "e_apart" }
    },

    // ── 장면 3 (아내가 1에서 'b'를 고른 흐름) ────────────────
    s3: {
      id: "s3",
      left: {
        text: "[아내 · 장면 3]\n여기에 아내 쪽 시나리오 텍스트가 들어갑니다.",
        choices: [
          { id: "a", label: "[아내 선택 3-A]" },
          { id: "b", label: "[아내 선택 3-B]" }
        ]
      },
      right: {
        text: "[주인공 · 장면 3]\n여기에 주인공 쪽 시나리오 텍스트가 들어갑니다.",
        choices: [
          { id: "a", label: "[주인공 선택 3-A]" },
          { id: "b", label: "[주인공 선택 3-B]" }
        ]
      },
      next: { "a_a": "e_apart", "a_b": "e_numb", "b_a": "e_numb", "b_b": "e_confine" }
    },

    // ── 엔딩 5종 ────────────────────────────────────────────
    e_success: {
      id: "e_success",
      ending: true,
      title: "날개",
      left: { text: "[아내 · 성공 엔딩]\n날개야 다시 돋아라. 날자. 날자. 날자. 한 번만 더 날자꾸나." },
      right: { text: "[주인공 · 성공 엔딩]\n날개야 다시 돋아라. 날자. 날자. 날자. 한 번만 더 날자꾸나." }
    },
    e_reunion: {
      id: "e_reunion",
      ending: true,
      title: "[엔딩 · 재회]",
      left: { text: "[아내 · 재회 엔딩 텍스트]" },
      right: { text: "[주인공 · 재회 엔딩 텍스트]" }
    },
    e_apart: {
      id: "e_apart",
      ending: true,
      title: "[엔딩 · 어긋남]",
      left: { text: "[아내 · 어긋남 엔딩 텍스트]" },
      right: { text: "[주인공 · 어긋남 엔딩 텍스트]" }
    },
    e_numb: {
      id: "e_numb",
      ending: true,
      title: "[엔딩 · 무기력]",
      left: { text: "[아내 · 무기력 엔딩 텍스트]" },
      right: { text: "[주인공 · 무기력 엔딩 텍스트]" }
    },
    e_confine: {
      id: "e_confine",
      ending: true,
      title: "[엔딩 · 유폐]",
      left: { text: "[아내 · 유폐 엔딩 텍스트]" },
      right: { text: "[주인공 · 유폐 엔딩 텍스트]" }
    }
  }
};
