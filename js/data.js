/**
 * ============================================================
 *  게임 데이터 (기획 데이터) — 이 파일만 수정하면 스토리가 바뀝니다.
 *  엔진(js/engine.js)은 절대 수정할 필요가 없습니다.
 * ============================================================
 *
 * ---------- 씬(scene) 한 개의 구조 ----------
 * {
 *   chapterLabel: "챕터 표시 문구" (선택)
 *   bgGradient: "CSS background 값"           // 배경 (이미지 없이 그라데이션으로 연출)
 *   character: "assets/characters/xxx.png" | null
 *   showGuest: true | false                    // 사내(내객) 실루엣 표시 여부
 *   speaker: "아내" | "남편" | "" (지문/나레이션은 빈 문자열)
 *   text: "대사/지문 내용"
 *   choices: [
 *     { label: "선택지 문구", patienceDelta: -30, next: "다음씬id" }
 *   ]
 *   next: "다음씬id"                            // 선택지 없이 자동 진행할 다음 씬
 *   isEnding: true                              // 엔딩 씬 여부
 * }
 *
 * ---------- 엔딩 분기 ----------
 * 최종 인내심 수치를 endingThresholds 로 판정, 해당 구간의 sceneId 로 이동합니다.
 */

const GAME_DATA = {
  startScene: "scene_01",

  initialPatience: 100,
  minPatience: 0,
  maxPatience: 100,

  // 성공(0~10%) / 실패(11%~) 두 갈래 엔딩
  endingThresholds: [
    { min: 0, max: 10, sceneId: "ending_success" },
    { min: 11, max: 100, sceneId: "ending_failure" },
  ],

  scenes: {
    // ------------------------------------------------------------
    // 00:00 ~ 00:40  시작: 의도된 흔적
    // ------------------------------------------------------------
    scene_01: {
      chapterLabel: "시작 · 의도된 흔적",
      bgGradient:
        "radial-gradient(ellipse at 30% 20%, rgba(90,60,40,0.35), transparent 60%), linear-gradient(180deg,#241a14 0%,#14100d 60%,#0a0808 100%)",
      character: "assets/characters/wife.png",
      showGuest: true,
      speaker: "",
      text: "방 안에서 사내(내객)와 마주 앉아 있다. 아내는 이 삶에 지쳤다.\n남편이 잠시 방을 비운 사이, 남편을 각성시키기 위한 단 하나의 행동을 해야 한다.",
      choices: [
        {
          label: "남편이 쉽게 볼 수 있는 화장대 위에 수면제(아달린) 병을 일부러 열어둔다.",
          patienceDelta: -30,
          next: "scene_02",
        },
        {
          label: "평소 남편이 아끼던 돋보기를 사내의 발치에 떨어뜨려 둔다.",
          patienceDelta: -15,
          next: "scene_02",
        },
      ],
    },

    // ------------------------------------------------------------
    // 00:40 ~ 01:20  전개: 벽 너머의 도발
    // ------------------------------------------------------------
    scene_02: {
      chapterLabel: "전개 · 벽 너머의 도발",
      bgGradient:
        "radial-gradient(ellipse at 70% 30%, rgba(120,30,30,0.35), transparent 55%), linear-gradient(180deg,#1c0f10 0%,#120a0b 60%,#060404 100%)",
      character: "assets/characters/wife.png",
      showGuest: true,
      speaker: "",
      text: "남편이 돌아와 자신의 방에 들어왔다. 사내가 아내의 몸을 더듬기 시작한다.\n아내는 벽 너머의 남편이 들으라는 듯 행동을 취한다.",
      choices: [
        {
          label: "사내의 농담에 일부러 과장되고 상스럽게 깔깔대며 웃어준다.",
          patienceDelta: -40,
          next: "scene_03",
        },
        {
          label: "사내에게 \"옆방의 그이는 바보라 아무것도 모른다\"며 큰소리로 속삭인다.",
          patienceDelta: -20,
          next: "scene_03",
        },
      ],
    },

    // ------------------------------------------------------------
    // 01:20 ~ 02:20  절정: 아달린의 발각
    // ------------------------------------------------------------
    scene_03: {
      chapterLabel: "절정 · 아달린의 발각",
      bgGradient:
        "radial-gradient(ellipse at 50% 15%, rgba(80,90,110,0.25), transparent 55%), linear-gradient(180deg,#11151c 0%,#0b0d10 60%,#050506 100%)",
      character: "assets/characters/husband.png",
      showGuest: false,
      speaker: "",
      text: "사내가 떠난 아침. 남편이 아내의 방으로 건너온다.\n그의 손에는 열려 있던 약병이 쥐어져 있고, 눈빛은 파르르 떨리고 있다.\n아내는 마지막 쐐기를 박아야 한다.",
      choices: [
        {
          label: "독 오른 눈을 뜨고 노려보며 남편의 뺨을 세차게 때린다.",
          patienceDelta: -40,
          next: "scene_end_check",
        },
        {
          label: "미안한 표정으로 억지 미소를 지으며 약병을 빼앗으려 한다.",
          patienceDelta: 20,
          next: "scene_end_check",
        },
      ],
    },

    scene_end_check: {
      isEndingCheck: true,
    },

    // ------------------------------------------------------------
    // 02:20 ~ 03:00  엔딩
    // ------------------------------------------------------------
    ending_success: {
      title: "역전된 구원",
      character: "assets/characters/husband.png",
      text:
        "뺨을 맞은 남편이 마침내 폭발해 아내의 손목을 꺾고 사내들의 흔적을 엎어버리고 나간다.\n아내는 짐을 챙겨 새로운 사람이 될 준비를 마쳐 집을 나와 걷다가 백화점 옥상에 올라가 있는 남편을 마주친다.\n남편을 바라보다, 다시 인파 속으로 들어간다. / 자신의 길을 걷는다.",
      isEnding: true,
    },
    ending_failure: {
      title: "무기력한 안주",
      character: "assets/characters/husband.png",
      text:
        "남편은 분노하지 못하고 고개를 숙인다.\n\"내가 오해했소……\"\n다시 방구석 이불 속으로 기어 들어가는 남편을 보며, 아내는 영원히 이 지옥을 벗어날 수 없음을 깨닫고 절망한다.",
      isEnding: true,
    },
  },
};
