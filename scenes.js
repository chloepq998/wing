/*
 * 이상 「날개」 1인용 루트 선택형 게임 — 시나리오 데이터 (단일 진실 공급원)
 * ---------------------------------------------------------------------------
 * 나중에 비주얼/시나리오를 입힐 때는 이 파일의 text / label / title 문자열만
 * 교체하면 됩니다. game.js(로직)와 styles.css(디자인)는 건드릴 필요가 없습니다.
 *
 * 구조: 시작화면에서 route(wife/hero)를 고르면, 그 route의 트리만 진행합니다.
 *
 * 노드 스키마
 *   일반 노드: { id, text, choices: [{ id, label, next }, ...] }   // next = 다음 노드 id
 *   엔딩 노드: { id, ending: true, trueEnding?: true, title, text } // choices/next 없음
 */
window.WINGS_SCENES = {
  routes: {
    // ══════════════════════════════════════════════════════
    // 아내 시점
    // ══════════════════════════════════════════════════════
    wife: {
      label: "아내",
      start: "w1",
      nodes: {
        w1: {
          id: "w1",
          text: "[아내 · 장면 1]\n여기에 아내 시점 시나리오 텍스트가 들어갑니다.",
          choices: [
            { id: "a", label: "[아내 선택 1-A]", next: "w2" },
            { id: "b", label: "[아내 선택 1-B]", next: "w3" }
          ]
        },
        w2: {
          id: "w2",
          text: "[아내 · 장면 2]\n여기에 아내 시점 시나리오 텍스트가 들어갑니다.",
          choices: [
            { id: "a", label: "[아내 선택 2-A]", next: "w_end_true" },
            { id: "b", label: "[아내 선택 2-B]", next: "w_end_2" }
          ]
        },
        w3: {
          id: "w3",
          text: "[아내 · 장면 3]\n여기에 아내 시점 시나리오 텍스트가 들어갑니다.",
          choices: [
            { id: "a", label: "[아내 선택 3-A]", next: "w_end_2" },
            { id: "b", label: "[아내 선택 3-B]", next: "w_end_3" }
          ]
        },

        w_end_true: {
          id: "w_end_true",
          ending: true,
          trueEnding: true,
          title: "날개 (진엔딩)",
          text: "[아내 · 진엔딩]\n날개야 다시 돋아라. 날자. 날자. 날자. 한 번만 더 날자꾸나."
        },
        w_end_2: {
          id: "w_end_2",
          ending: true,
          title: "[엔딩 · 아내 · 2]",
          text: "[아내 · 엔딩 2 텍스트]"
        },
        w_end_3: {
          id: "w_end_3",
          ending: true,
          title: "[엔딩 · 아내 · 3]",
          text: "[아내 · 엔딩 3 텍스트]"
        }
      }
    },

    // ══════════════════════════════════════════════════════
    // 주인공(남편) 시점
    // ══════════════════════════════════════════════════════
    hero: {
      label: "주인공",
      start: "h1",
      nodes: {
        h1: {
          id: "h1",
          text: "[주인공 · 장면 1]\n여기에 주인공 시점 시나리오 텍스트가 들어갑니다.",
          choices: [
            { id: "a", label: "[주인공 선택 1-A]", next: "h2" },
            { id: "b", label: "[주인공 선택 1-B]", next: "h3" }
          ]
        },
        h2: {
          id: "h2",
          text: "[주인공 · 장면 2]\n여기에 주인공 시점 시나리오 텍스트가 들어갑니다.",
          choices: [
            { id: "a", label: "[주인공 선택 2-A]", next: "h_end_true" },
            { id: "b", label: "[주인공 선택 2-B]", next: "h_end_2" }
          ]
        },
        h3: {
          id: "h3",
          text: "[주인공 · 장면 3]\n여기에 주인공 시점 시나리오 텍스트가 들어갑니다.",
          choices: [
            { id: "a", label: "[주인공 선택 3-A]", next: "h_end_2" },
            { id: "b", label: "[주인공 선택 3-B]", next: "h_end_3" }
          ]
        },

        h_end_true: {
          id: "h_end_true",
          ending: true,
          trueEnding: true,
          title: "날개 (진엔딩)",
          text: "[주인공 · 진엔딩]\n날개야 다시 돋아라. 날자. 날자. 날자. 한 번만 더 날자꾸나."
        },
        h_end_2: {
          id: "h_end_2",
          ending: true,
          title: "[엔딩 · 주인공 · 2]",
          text: "[주인공 · 엔딩 2 텍스트]"
        },
        h_end_3: {
          id: "h_end_3",
          ending: true,
          title: "[엔딩 · 주인공 · 3]",
          text: "[주인공 · 엔딩 3 텍스트]"
        }
      }
    }
  }
};
