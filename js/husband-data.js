/**
 * ============================================================
 *  남편 루트 데이터 — 기획자가 제공한 플로우차트의 분기 구조,
 *  선택지, 엔딩을 그대로 유지하며 연출만 확장한 데이터입니다.
 *  분기/선택지/엔딩/사건 순서는 변경하지 않습니다.
 * ============================================================
 *
 * 원본 구조 (변경 금지):
 *   1단계(밥상 위의 알약) → [A: 받아먹음 / B: 몰래 버림]
 *   2단계(아내가 건네는 은화)
 *     A 경로 → [A-1: 다시 잠듦 → 엔딩 0 직행 / A-2: 뛰쳐나감 → 3단계]
 *     B 경로 → [B-1: 돈을 버림 → 3단계 / B-2: 아내의 비밀 확인 → 3단계]
 *   3단계(정오의 사이렌, 최종 분기) → [선택1: 포기 → 엔딩0 / 선택2: 도약 → 엔딩1]
 *
 * 한 대사창에 들어가는 텍스트가 너무 길면 잘리므로, 한 장면을
 * 2~3줄짜리 여러 개의 비트(beat)로 잘게 나누고 next 로 이어붙였다.
 * (연출 목적의 분할일 뿐 사건 순서·선택지·엔딩에는 영향이 없다.)
 *
 * ---------- 씬 구조 ----------
 * {
 *   chapterLabel, bgImage, bgGradient, character, showGuest,
 *   cameraEffect, screenEffect, cue,      // 연출 (선택)
 *   speaker, text, choices, next, isEnding, title
 * }
 * cameraEffect: "cam-zoom-in" | "cam-zoom-in-slow" | "cam-tilt-up"
 * screenEffect: "fx-shake" | "fx-flash" | "fx-desaturate"
 * cue: "SE / BGM 연출 메모" (제작 참고용 캡션)
 */

const GAME_DATA_HUSBAND = {
  startScene: "h1_1",

  scenes: {
    // ============================================================
    // 1단계 · 밥상 위의 알약
    // ============================================================
    h1_1: {
      chapterLabel: "1단계 · 밥상 위의 알약",
      bgGradient:
        "radial-gradient(ellipse at 40% 70%, rgba(120,90,40,0.25), transparent 60%), linear-gradient(180deg, rgba(30,24,16,0.4) 0%, rgba(14,11,8,0.65) 60%, rgba(5,4,3,0.85) 100%)",
      character: null,
      cameraEffect: "cam-zoom-in-slow",
      cue: "SE: 숟가락이 그릇에 부딪히는 소리, 벽시계 초침 소리(반복) · BGM: 낮고 조용한 현악, 점점 가까워짐",
      speaker: "남편 (독백)",
      text: "좁은 셋방, 흐린 전등 아래. 밥상 하나가 놓여 있다.\n국그릇에서 김이 피어오른다.",
      next: "h1_2",
    },
    h1_2: {
      chapterLabel: "1단계 · 밥상 위의 알약",
      bgGradient:
        "radial-gradient(ellipse at 40% 70%, rgba(120,90,40,0.25), transparent 60%), linear-gradient(180deg, rgba(30,24,16,0.4) 0%, rgba(14,11,8,0.65) 60%, rgba(5,4,3,0.85) 100%)",
      character: null,
      cue: "SE: 숟가락이 그릇에 부딪히는 소리, 벽시계 초침 소리 · BGM: 낮고 조용한 현악",
      cameraEffect: "cam-zoom-in-slow",
      speaker: "남편 (독백)",
      text: "손을 펴니 흰 알약 두 개가 놓인다.\n아내의 손에서.",
      next: "h1_3",
    },
    h1_3: {
      chapterLabel: "1단계 · 밥상 위의 알약",
      bgGradient:
        "radial-gradient(ellipse at 40% 70%, rgba(120,90,40,0.25), transparent 60%), linear-gradient(180deg, rgba(30,24,16,0.4) 0%, rgba(14,11,8,0.65) 60%, rgba(5,4,3,0.85) 100%)",
      character: null,
      cameraEffect: "cam-zoom-in-slow",
      screenEffect: "fx-flash",
      cue: "SE: 초침 소리가 점점 커짐(심장박동처럼) · BGM: 톤 다운, 불협화음 한 음",
      speaker: "남편 (독백)",
      text: "약을 입으로 집어넣으려던 손이 멈춘다.\n목구멍 안쪽이 뻑뻑하다.",
      next: "h1_4",
    },
    h1_4: {
      chapterLabel: "1단계 · 밥상 위의 알약",
      bgGradient:
        "radial-gradient(ellipse at 40% 70%, rgba(120,90,40,0.25), transparent 60%), linear-gradient(180deg, rgba(30,24,16,0.4) 0%, rgba(14,11,8,0.65) 60%, rgba(5,4,3,0.85) 100%)",
      character: null,
      cameraEffect: "cam-zoom-in",
      screenEffect: "fx-desaturate",
      cue: "SE: 심장박동이 귓가에서 울려 퍼짐 · BGM: 자장가풍 톤, 점점 낮아짐",
      speaker: "남편 (독백)",
      text: "이 약을 삼키면 오늘도 하루 종일 잠만 자게 될 것이다.\n어제도, 그제도 그랬듯이.",
      next: "h1_wife",
    },
    h1_wife: {
      chapterLabel: "1단계 · 밥상 위의 알약",
      bgGradient:
        "radial-gradient(ellipse at 40% 70%, rgba(120,90,40,0.25), transparent 60%), linear-gradient(180deg, rgba(30,24,16,0.4) 0%, rgba(14,11,8,0.65) 60%, rgba(5,4,3,0.85) 100%)",
      character: "assets/characters/wife.png",
      cue: "SE: 숟가락이 그릇에 부딪히는 소리, 벽시계 초침 소리 · BGM: 낮고 조용한 현악",
      speaker: "아내",
      text: "\"감기약이야. 얼른 먹고 자.\"",
      choices: [
        {
          label: "의심 없이 받아먹고 잠을 청한다.",
          next: "h2a_1",
        },
        {
          label: "약을 몰래 밥상 밑으로 버린다.",
          next: "h2b_1",
        },
      ],
    },

    // ============================================================
    // 2단계 · 아내가 직접 건네는 은화  (A 경로: 받아먹은 뒤 몽롱한 상태)
    // ============================================================
    h2a_1: {
      chapterLabel: "2단계 · 아내가 건네는 은화",
      bgGradient:
        "radial-gradient(ellipse at 60% 20%, rgba(90,70,90,0.2), transparent 55%), linear-gradient(180deg, rgba(22,18,26,0.45) 0%, rgba(12,10,14,0.68) 60%, rgba(4,3,5,0.85) 100%)",
      character: "assets/characters/husband.png",
      screenEffect: "fx-desaturate",
      speaker: "",
      text: "몸이 물 먹은 솜처럼 무겁다.\n눈꺼풀이 자꾸 감긴다.",
      next: "h2a_2",
    },
    h2a_2: {
      chapterLabel: "2단계 · 아내가 건네는 은화",
      bgGradient:
        "radial-gradient(ellipse at 60% 20%, rgba(90,70,90,0.2), transparent 55%), linear-gradient(180deg, rgba(22,18,26,0.45) 0%, rgba(12,10,14,0.68) 60%, rgba(4,3,5,0.85) 100%)",
      character: "assets/characters/husband.png",
      cue: "SE: 낯선 발소리, 대문 여닫는 소리",
      speaker: "",
      text: "문밖에서 낯선 발소리, 대문 여닫는 소리가 들렸다 사라진다.",
      next: "h2a_3",
    },
    h2a_3: {
      chapterLabel: "2단계 · 아내가 건네는 은화",
      bgGradient:
        "radial-gradient(ellipse at 60% 20%, rgba(90,70,90,0.2), transparent 55%), linear-gradient(180deg, rgba(22,18,26,0.45) 0%, rgba(12,10,14,0.68) 60%, rgba(4,3,5,0.85) 100%)",
      character: "assets/characters/husband.png",
      cue: "SE: 미닫이문 스르륵 열리는 소리",
      speaker: "",
      text: "미닫이문이 열리고 아내가 들어온다.\n내 손을 펴 은화 몇 닢을 쥐여준다.",
      next: "h2a_reveal1",
    },
    h2a_reveal1: {
      chapterLabel: "2단계 · 아내가 건네는 은화",
      bgGradient:
        "radial-gradient(ellipse at 60% 20%, rgba(90,70,90,0.2), transparent 55%), linear-gradient(180deg, rgba(22,18,26,0.45) 0%, rgba(12,10,14,0.68) 60%, rgba(4,3,5,0.85) 100%)",
      character: "assets/characters/wife.png",
      cue: "SE: 은화 짤랑거리는 소리",
      speaker: "아내",
      text: "아무 말 없이 미소만 짓는다.\n손에 은화 몇 닢을 쥐여준다.",
      next: "h2a_reveal2",
    },
    h2a_reveal2: {
      chapterLabel: "2단계 · 아내가 건네는 은화",
      bgGradient:
        "radial-gradient(ellipse at 60% 20%, rgba(90,70,90,0.2), transparent 55%), linear-gradient(180deg, rgba(22,18,26,0.45) 0%, rgba(12,10,14,0.68) 60%, rgba(4,3,5,0.85) 100%)",
      character: "assets/characters/wife.png",
      speaker: "아내",
      text: "손끝은 차갑지만 표정은 따뜻하다.",
      next: "h2a_mono",
    },
    h2a_mono: {
      chapterLabel: "2단계 · 아내가 건네는 은화",
      bgGradient:
        "radial-gradient(ellipse at 60% 20%, rgba(90,70,90,0.2), transparent 55%), linear-gradient(180deg, rgba(22,18,26,0.45) 0%, rgba(12,10,14,0.68) 60%, rgba(4,3,5,0.85) 100%)",
      character: "assets/characters/husband.png",
      cue: "BGM: 이전과 같은 선율, 한 톤 낮게",
      speaker: "",
      text: "손바닥에 닿는 은화가 차갑다.\n그런데 왜 나는 안심이 되는가.",
      choices: [
        {
          label: "아내가 준 은화를 머리맡에 고이 모셔두고 다시 잠든다.",
          next: "h_a1_bridge1",
        },
        {
          label: "무거운 몸을 이끌고 은화를 쥔 채 무작정 밖으로 뛰쳐나간다.",
          next: "h_a2_bridge1",
        },
      ],
    },

    // A-1: 최종 엔딩 0으로 직행
    h_a1_bridge1: {
      chapterLabel: "2단계 · 아내가 건네는 은화",
      bgGradient:
        "radial-gradient(ellipse at 50% 60%, rgba(40,30,30,0.2), transparent 60%), linear-gradient(180deg, rgba(14,11,8,0.6) 0%, rgba(4,3,3,0.9) 100%)",
      character: "assets/characters/husband.png",
      cue: "BGM: 자장가풍 멜로디, 점점 느려짐",
      screenEffect: "fx-desaturate",
      speaker: "",
      text: "은화를 머리맡에 가지런히 놓는다.\n다시 눈을 감는다.",
      next: "h_a1_bridge2",
    },
    h_a1_bridge2: {
      chapterLabel: "2단계 · 아내가 건네는 은화",
      bgGradient:
        "radial-gradient(ellipse at 50% 60%, rgba(40,30,30,0.2), transparent 60%), linear-gradient(180deg, rgba(14,11,8,0.6) 0%, rgba(4,3,3,0.9) 100%)",
      character: "assets/characters/husband.png",
      screenEffect: "fx-desaturate",
      speaker: "",
      text: "온몸이 이불 속으로 가라앉는다.",
      next: "ending_0",
    },

    // A-2: 3단계로 이동
    h_a2_bridge1: {
      chapterLabel: "2단계 · 아내가 건네는 은화",
      bgImage: "assets/backgrounds/bg-tram-night.jpg",
      bgGradient:
        "radial-gradient(ellipse at 50% 60%, rgba(60,50,40,0.2), transparent 60%), linear-gradient(180deg, rgba(20,16,12,0.5) 0%, rgba(6,5,4,0.85) 100%)",
      character: "assets/characters/husband.png",
      cue: "SE: 발소리, 거친 숨소리 · BGM: 현악 트레몰로 시작",
      screenEffect: "fx-shake",
      speaker: "",
      text: "붙잡힌 손을 뿌리친다.\n다시 달린다.",
      next: "h_a2_bridge2",
    },
    h_a2_bridge2: {
      chapterLabel: "2단계 · 아내가 건네는 은화",
      bgImage: "assets/backgrounds/bg-tram-night.jpg",
      bgGradient:
        "radial-gradient(ellipse at 50% 60%, rgba(60,50,40,0.2), transparent 60%), linear-gradient(180deg, rgba(20,16,12,0.5) 0%, rgba(6,5,4,0.85) 100%)",
      character: "assets/characters/husband.png",
      cue: "SE: 발소리, 거친 숨소리",
      speaker: "",
      text: "계단을, 또 계단을 오른다.",
      next: "h3_from_a2",
    },

    // ============================================================
    // 2단계 · 아내가 직접 건네는 은화  (B 경로: 약을 버리고 지켜본 상태)
    // ============================================================
    h2b_1: {
      chapterLabel: "2단계 · 아내가 건네는 은화",
      bgImage: "assets/backgrounds/bg-alley.jpg",
      bgGradient:
        "radial-gradient(ellipse at 60% 20%, rgba(90,50,60,0.22), transparent 55%), linear-gradient(180deg, rgba(24,14,18,0.45) 0%, rgba(13,8,10,0.68) 60%, rgba(4,3,4,0.85) 100%)",
      character: "assets/characters/husband.png",
      screenEffect: "fx-shake",
      cue: "SE: 낯선 구두 소리, 낮은 웃음소리(계속) · BGM: 불안감 있는 현악",
      speaker: "",
      text: "머리가 맑다.\n벽 너머로 낯선 구두 소리, 낮은 웃음소리가 들린다.",
      next: "h2b_2",
    },
    h2b_2: {
      chapterLabel: "2단계 · 아내가 건네는 은화",
      bgImage: "assets/backgrounds/bg-alley.jpg",
      bgGradient:
        "radial-gradient(ellipse at 60% 20%, rgba(90,50,60,0.22), transparent 55%), linear-gradient(180deg, rgba(24,14,18,0.45) 0%, rgba(13,8,10,0.68) 60%, rgba(4,3,4,0.85) 100%)",
      character: "assets/characters/husband.png",
      cue: "SE: 대문 닫히는 소리",
      speaker: "",
      text: "곧 대문 닫히는 소리.",
      next: "h2b_3",
    },
    h2b_3: {
      chapterLabel: "2단계 · 아내가 건네는 은화",
      bgImage: "assets/backgrounds/bg-alley.jpg",
      bgGradient:
        "radial-gradient(ellipse at 60% 20%, rgba(90,50,60,0.22), transparent 55%), linear-gradient(180deg, rgba(24,14,18,0.45) 0%, rgba(13,8,10,0.68) 60%, rgba(4,3,4,0.85) 100%)",
      character: "assets/characters/husband.png",
      cameraEffect: "cam-zoom-in-slow",
      cue: "SE: 미닫이문 스르륵 열리는 소리, 발소리(다가옴) · BGM: 불안감 고조",
      speaker: "",
      text: "숨죽여 앉아 있는데 미닫이문이 열리고 아내가 들어온다.\n다가와 내 손에 은화 몇 닢을 쥐여준다.",
      next: "h2b_reveal1",
    },
    h2b_reveal1: {
      chapterLabel: "2단계 · 아내가 건네는 은화",
      bgGradient:
        "radial-gradient(ellipse at 60% 20%, rgba(90,50,60,0.22), transparent 55%), linear-gradient(180deg, rgba(24,14,18,0.45) 0%, rgba(13,8,10,0.68) 60%, rgba(4,3,4,0.85) 100%)",
      character: "assets/characters/wife.png",
      cameraEffect: "cam-zoom-in",
      cue: "SE: 은화 짤랑거리는 소리(금속음) · BGM: 불협화음 한 음",
      speaker: "아내",
      text: "아무 말 없이 미소만 짓는다.\n손에 은화 몇 닢을 쥐여준다.",
      next: "h2b_reveal2",
    },
    h2b_reveal2: {
      chapterLabel: "2단계 · 아내가 건네는 은화",
      bgGradient:
        "radial-gradient(ellipse at 60% 20%, rgba(90,50,60,0.22), transparent 55%), linear-gradient(180deg, rgba(24,14,18,0.45) 0%, rgba(13,8,10,0.68) 60%, rgba(4,3,4,0.85) 100%)",
      character: "assets/characters/wife.png",
      cue: "BGM: 낮은 현악에 미세한 불협화음 한 소절",
      speaker: "아내",
      text: "손끝은 차갑지만 표정은 따뜻하다.",
      next: "h2b_mono1",
    },
    h2b_mono1: {
      chapterLabel: "2단계 · 아내가 건네는 은화",
      bgGradient:
        "radial-gradient(ellipse at 60% 20%, rgba(90,50,60,0.22), transparent 55%), linear-gradient(180deg, rgba(24,14,18,0.45) 0%, rgba(13,8,10,0.68) 60%, rgba(4,3,4,0.85) 100%)",
      character: "assets/characters/husband.png",
      screenEffect: "fx-desaturate",
      cue: "SE: 침묵 · BGM: 현악이 점점 희미해짐",
      speaker: "",
      text: "방금까지 벽 너머에서 들리던 소리와,\n지금 내 손 위의 이 온기.",
      next: "h2b_mono2",
    },
    h2b_mono2: {
      chapterLabel: "2단계 · 아내가 건네는 은화",
      bgGradient:
        "radial-gradient(ellipse at 60% 20%, rgba(90,50,60,0.22), transparent 55%), linear-gradient(180deg, rgba(24,14,18,0.45) 0%, rgba(13,8,10,0.68) 60%, rgba(4,3,4,0.85) 100%)",
      character: "assets/characters/husband.png",
      screenEffect: "fx-desaturate",
      cue: "BGM: 현악이 완전히 희미해짐, 절망감",
      speaker: "",
      text: "이 둘 사이의 거리를 나는 잴 수가 없다.",
      choices: [
        {
          label: "돈을 들고 밖으로 나가 길거리에 던져버린다.",
          next: "h_b1_bridge1",
        },
        {
          label: "아내의 방 미닫이문을 슬며시 열어 아내의 비밀을 확인한다.",
          next: "h_b2_bridge1",
        },
      ],
    },

    // B-1: 3단계로 이동
    h_b1_bridge1: {
      chapterLabel: "2단계 · 아내가 건네는 은화",
      bgImage: "assets/backgrounds/bg-tram-night.jpg",
      bgGradient:
        "radial-gradient(ellipse at 50% 60%, rgba(60,40,40,0.2), transparent 60%), linear-gradient(180deg, rgba(20,13,12,0.5) 0%, rgba(6,4,4,0.85) 100%)",
      character: "assets/characters/husband.png",
      cue: "SE: 동전이 바닥에 흩어지는 소리",
      speaker: "",
      text: "동전이 바닥에 흩어지는 소리를 뒤로하고 걷는다.",
      next: "h_b1_bridge2",
    },
    h_b1_bridge2: {
      chapterLabel: "2단계 · 아내가 건네는 은화",
      bgImage: "assets/backgrounds/bg-tram-night.jpg",
      bgGradient:
        "radial-gradient(ellipse at 50% 60%, rgba(60,40,40,0.2), transparent 60%), linear-gradient(180deg, rgba(20,13,12,0.5) 0%, rgba(6,4,4,0.85) 100%)",
      character: "assets/characters/husband.png",
      cue: "SE: 발걸음 소리",
      speaker: "",
      text: "걷다 보니 어느새 계단이다.",
      next: "h3_from_b1",
    },

    // B-2: 3단계로 이동
    h_b2_bridge1: {
      chapterLabel: "2단계 · 아내가 건네는 은화",
      bgGradient:
        "radial-gradient(ellipse at 50% 60%, rgba(60,40,40,0.2), transparent 60%), linear-gradient(180deg, rgba(20,13,12,0.5) 0%, rgba(6,4,4,0.85) 100%)",
      character: "assets/characters/husband.png",
      cameraEffect: "cam-zoom-in",
      screenEffect: "fx-shake",
      cue: "SE: 서랍 미닫이 소리, 심장박동(극적으로 가속) · BGM: 불협화음 악음, 공포감",
      speaker: "",
      text: "아내의 서랍에서 수면제(아달린) 뭉치를 발견하고 경악한다.",
      next: "h_b2_bridge2",
    },
    h_b2_bridge2: {
      chapterLabel: "2단계 · 아내가 건네는 은화",
      bgGradient:
        "radial-gradient(ellipse at 50% 60%, rgba(60,40,40,0.2), transparent 60%), linear-gradient(180deg, rgba(20,13,12,0.5) 0%, rgba(6,4,4,0.85) 100%)",
      character: "assets/characters/husband.png",
      screenEffect: "fx-shake",
      cue: "SE: 심장박동(최고조), 거친 숨소리 · BGM: 현악 트레몰로, 긴박함",
      speaker: "",
      text: "그 순간부터 다리가 제멋대로 움직인다.\n정신을 차리니 계단이다.",
      next: "h3_from_b2",
    },

    // ============================================================
    // 3단계 · 정오의 사이렌 (최종 분기) — 세 경로가 모두 같은 선택으로 수렴
    // ============================================================
    h3_from_a2: {
      chapterLabel: "3단계 · 정오의 사이렌",
      bgImage: "assets/backgrounds/bg-street-dawn.jpg",
      bgGradient:
        "radial-gradient(ellipse at 50% 20%, rgba(200,210,230,0.15), transparent 55%), linear-gradient(180deg, rgba(10,12,16,0.35) 0%, rgba(6,7,9,0.6) 60%, rgba(2,2,3,0.8) 100%)",
      character: null,
      cue: "SE: 바람 소리, 심장박동(점점 커짐)",
      cameraEffect: "cam-tilt-up",
      speaker: "",
      text: "미쓰코시 백화점 옥상.\n붙잡혔던 손의 온기가 아직 손목에 남아 있다.",
      next: "h3_env",
    },
    h3_from_b1: {
      chapterLabel: "3단계 · 정오의 사이렌",
      bgImage: "assets/backgrounds/bg-street-dawn.jpg",
      bgGradient:
        "radial-gradient(ellipse at 50% 20%, rgba(200,210,230,0.15), transparent 55%), linear-gradient(180deg, rgba(10,12,16,0.35) 0%, rgba(6,7,9,0.6) 60%, rgba(2,2,3,0.8) 100%)",
      character: null,
      cue: "SE: 바람 소리, 심장박동(점점 커짐)",
      cameraEffect: "cam-tilt-up",
      speaker: "",
      text: "미쓰코시 백화점 옥상.\n빈 손이 허전하다.",
      next: "h3_env",
    },
    h3_from_b2: {
      chapterLabel: "3단계 · 정오의 사이렌",
      bgImage: "assets/backgrounds/bg-street-dawn.jpg",
      bgGradient:
        "radial-gradient(ellipse at 50% 20%, rgba(200,210,230,0.15), transparent 55%), linear-gradient(180deg, rgba(10,12,16,0.35) 0%, rgba(6,7,9,0.6) 60%, rgba(2,2,3,0.8) 100%)",
      character: null,
      cue: "SE: 바람 소리, 심장박동(점점 커짐)",
      cameraEffect: "cam-tilt-up",
      speaker: "",
      text: "미쓰코시 백화점 옥상.\n흰 뭉치의 잔상이 눈앞에서 지워지지 않는다.",
      next: "h3_env",
    },
    h3_env: {
      chapterLabel: "3단계 · 정오의 사이렌",
      bgImage: "assets/backgrounds/bg-street-dawn.jpg",
      bgGradient:
        "radial-gradient(ellipse at 50% 20%, rgba(200,210,230,0.15), transparent 55%), linear-gradient(180deg, rgba(10,12,16,0.35) 0%, rgba(6,7,9,0.6) 60%, rgba(2,2,3,0.8) 100%)",
      character: null,
      cue: "SE: 바람 소리, 심장박동(점점 커짐)",
      cameraEffect: "cam-tilt-up",
      speaker: "",
      text: "바람이 세다.\n발밑으로 경성 거리가 아득하다.",
      next: "h3_choice",
    },
    h3_choice: {
      chapterLabel: "3단계 · 정오의 사이렌 (최종 분기)",
      bgImage: "assets/backgrounds/bg-street-dawn.jpg",
      bgGradient:
        "radial-gradient(ellipse at 50% 20%, rgba(200,210,230,0.18), transparent 55%), linear-gradient(180deg, rgba(10,12,16,0.35) 0%, rgba(6,7,9,0.6) 60%, rgba(2,2,3,0.8) 100%)",
      character: "assets/characters/husband.png",
      cue: "SE: 정오 사이렌(장음) · BGM: 정적 → 사이렌과 함께 현악 크레센도",
      screenEffect: "fx-flash",
      speaker: "",
      text: "온 거리에 정오를 알리는 거대한 사이렌 소리가 울려 퍼진다.\n겨드랑이가 가렵기 시작한다.",
      choices: [
        {
          label: "\"밖은 너무 무섭고 어지러워……\" 다시 아내의 안전한 방으로 걸어 들어간다.",
          next: "ending_0",
        },
        {
          label: "\"날개야 다시 돋아라. 한 번만 더 날아보자꾸나!\" 외치며 주체적으로 도약한다.",
          next: "ending_1",
        },
      ],
    },

    // ============================================================
    // 엔딩
    // ============================================================
    ending_0: {
      title: "Ending 0 · 박제가 되어버린 천재",
      bgImage: "assets/backgrounds/bg-street-dusk.jpg",
      bgGradient:
        "radial-gradient(ellipse at 50% 35%, rgba(90,60,60,0.2), transparent 60%), linear-gradient(180deg, rgba(10,7,7,0.6) 0%, rgba(0,0,0,0.9) 100%)",
      screenEffect: "fx-desaturate",
      cue: "BGM: 자장가풍 멜로디가 점점 느려지다 정지 · SE: 심장이 멈추는 소리",
      text:
        "발걸음이 방 쪽으로 향한다. 미닫이문을 연다. 아내가 늘 그렇듯 미소로 맞는다.\n이불 속으로 들어간다. 알약을 삼킨다.\n오늘도, 내일도.\n\n(결말: 스스로 선택하기를 포기하고 영원히 아내의 인형으로 살아간다.)",
      isEnding: true,
    },
    ending_1: {
      title: "Ending 1 · 진짜 자아를 향한 외침",
      bgImage: "assets/backgrounds/bg-riverside.jpg",
      bgGradient:
        "radial-gradient(ellipse at 50% 30%, rgba(150,180,200,0.25), transparent 60%), linear-gradient(180deg, rgba(8,10,12,0.4) 0%, rgba(0,0,0,0.75) 100%)",
      screenEffect: "fx-flash",
      cameraEffect: "cam-zoom-in",
      cue: "BGM: 현악 크레센도가 절정에서 밝은 코드로 해소 (Game Clear) · SE: 바람이 거대하게 울려퍼짐",
      text:
        "난간을 넘는다. 바람이 온몸을 때린다. 사이렌 소리가 귓가에서 멀어진다.\n다리에 힘이 들어간다. 다시, 걷는다.\n\n(결말: 아내의 통제를 부수고 내 삶의 주권을 완벽히 되찾는다. Game Clear!)",
      isEnding: true,
    },
  },
};
