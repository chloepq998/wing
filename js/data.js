/**
 * ============================================================
 *  게임 데이터 (기획 데이터) — 이 파일만 수정하면 스토리가 바뀝니다.
 *  엔진(js/engine.js)은 절대 수정할 필요가 없습니다.
 * ============================================================
 *
 * ⚠️ 안내
 * 이 파일의 대사/선택지는 아직 기획자 원고가 반영되지 않은
 * "구조 확인용 임시 텍스트"입니다. [ ] 로 표시된 부분을
 * 실제 대사/선택지 문구로 교체해서 사용하세요.
 * (씬 흐름, 게이지 시스템 등 기능 구조는 기획서와 동일하게 구현되어 있습니다.)
 *
 * ---------- 씬(scene) 한 개의 구조 ----------
 * {
 *   background: "assets/backgrounds/xxx.jpg" | null   // 배경 이미지 경로 (없으면 null)
 *   bgColor: "#111111"                                  // background 없을 때 쓸 배경색
 *   character: "assets/characters/xxx.png" | null       // 중앙 캐릭터 이미지
 *   speaker: "아내" | "남편" | "" (지문/나레이션은 빈 문자열)
 *   text: "대사 내용"
 *   choices: [                                          // 최대 2개, 없으면 next만 지정
 *     { label: "선택지 문구", patienceDelta: -10, next: "다음씬id" }
 *   ]
 *   next: "다음씬id"                                     // 선택지가 없을 때, 자동 진행할 다음 씬
 *   isEnding: true                                       // 이 씬이 엔딩이면 true
 * }
 *
 * ---------- 엔딩 분기 ----------
 * 게임 종료 시점의 인내심 수치를 endingThresholds 배열로 판정합니다.
 * min~max 구간에 해당하는 첫 번째 항목의 sceneId 로 이동합니다.
 */

const GAME_DATA = {
  startScene: "scene_01",

  initialPatience: 100,
  minPatience: 0,
  maxPatience: 100,

  // 최종 인내심 수치에 따른 엔딩 분기 (기획 확정 전 임시값)
  endingThresholds: [
    { min: 67, max: 100, sceneId: "ending_low_break" },   // 인내심이 많이 남은 엔딩
    { min: 34, max: 66, sceneId: "ending_mid_break" },    // 중간 엔딩
    { min: 0, max: 33, sceneId: "ending_full_break" },    // 인내심이 거의 소진된 엔딩
  ],

  scenes: {
    // ------------------------------------------------------------
    // 첫 장면
    // 방 안, 아내는 사내(내객)와 마주 앉아 있다.
    // 남편이 잠시 방을 비운 사이, 플레이어는 남편을 흔들기 위한
    // 행동 하나를 선택해야 한다.
    // ------------------------------------------------------------
    scene_01: {
      background: null,
      bgColor: "#1a1414",
      character: "assets/characters/wife.png",
      speaker: "",
      text: "[지문] 남편이 잠시 방을 비웠다.\n아내는 그 틈을 놓치지 않는다.",
      next: "scene_02",
    },

    scene_02: {
      background: null,
      bgColor: "#1a1414",
      character: "assets/characters/wife.png",
      speaker: "아내",
      text: "[임시 대사] ……제발 날 좀 말려줘.",
      choices: [
        {
          label: "[선택지 A - 예: 남편이 볼 수 있는 곳에 흔적을 남긴다]",
          patienceDelta: -20,
          next: "scene_03a",
        },
        {
          label: "[선택지 B - 예: 아무 일도 없었던 척 넘어간다]",
          patienceDelta: -5,
          next: "scene_03b",
        },
      ],
    },

    scene_03a: {
      background: null,
      bgColor: "#201616",
      character: "assets/characters/husband.png",
      speaker: "남편",
      text: "[임시 대사] ……",
      next: "scene_end_check",
    },

    scene_03b: {
      background: null,
      bgColor: "#201616",
      character: "assets/characters/husband.png",
      speaker: "남편",
      text: "[임시 대사] ……",
      next: "scene_end_check",
    },

    // 데모용 종료 지점: 실제로는 여러 씬을 거쳐 인내심이 누적 변동된 뒤
    // 마지막 씬에서 isEnding 판정 로직(engine.js 의 goToScene)이 실행됩니다.
    scene_end_check: {
      background: null,
      bgColor: "#0d0d0d",
      character: null,
      speaker: "",
      text: "[지문] ...",
      isEndingCheck: true,
    },

    // ---------------- 엔딩 (임시 문구) ----------------
    ending_low_break: {
      background: null,
      bgColor: "#000000",
      character: null,
      speaker: "",
      text: "[임시 엔딩 문구] 남편의 인내심이 아직 많이 남았다.",
      isEnding: true,
    },
    ending_mid_break: {
      background: null,
      bgColor: "#000000",
      character: null,
      speaker: "",
      text: "[임시 엔딩 문구] 남편의 인내심이 흔들리기 시작했다.",
      isEnding: true,
    },
    ending_full_break: {
      background: null,
      bgColor: "#000000",
      character: null,
      speaker: "",
      text: "[임시 엔딩 문구] 남편의 인내심이 완전히 무너졌다.",
      isEnding: true,
    },
  },
};
