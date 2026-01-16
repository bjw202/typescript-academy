# 나노바나나 일러스트 가이드

> **원본 문서**: `structure.md` 에서 추출
> **목적**: 이미지 생성을 위한 상세 디렉션 정리

---

## 🍌 스타일 가이드

### 아트 스타일
```
전반적 톤:
- 친근하고 귀여운 일러스트
- 손그림 느낌 (Excalidraw 스타일)
- 파스텔 + 비비드 색상 조합
- 최소한의 디테일, 명확한 메시지

캐릭터 디자인:
🍌 바나나: 주인공, 눈과 팔다리 있음
- 표정: 😊 행복 / 😰 걱정 / 😱 놀람
- 동작: 걷기, 뛰기, 점프, 떨어짐
- 액세서리: 안전모, 방패, 스티커

🛡️ 타입 체커: 경비원/보디가드 컨셉
- 방패나 체크리스트 들고 있음
- 엄격한 표정
- 빨간 "STOP" 팻말

⚙️ 컴파일러: 기계/공장 컨셉
- 컨베이어 벨트
- 톱니바퀴 돌아가는 모습
- 입구(input)와 출구(output)

애니메이션:
- 부드러운 easing (ease-in-out)
- 마이크로 인터랙션 강조
- 로딩 스피너는 회전하는 바나나
```

---

## 일러스트 목록 (총 25개)

### 🏠 홈페이지
| ID | 파일명 | 제목 | 설명 |
|----|--------|------|------|
| hero | `hero-banner.png` | 히어로 배너 | 바나나 주위 TypeScript 보호막이 버그를 막는 이미지 |

---

### Chapter 01: Why TypeScript

| ID | 파일명 | 제목 | 챕터 | 상세 디렉션 |
|----|--------|------|------|-------------|
| 1 | `illust-01-free-banana-journey.png` | 자유로운 바나나의 여정 | Ch01 | 4컷 만화 형식. Scene1: 바나나 신나게 날아다님, Scene2: 화산에 빨려들어감, Scene3: 폭발, Scene4: 개발자 놀란 얼굴. 캡션: "JavaScript는 뭐든 허용합니다. 런타임에 터지기 전까지는." |
| 2 | `illust-02-typescript-bodyguard.png` | TypeScript 보디가드 | Ch01 | 좌우 비교. 왼쪽: JS세계에서 버그에 노출된 바나나, 오른쪽: TS세계에서 보디가드가 지키는 바나나 |

---

### Chapter 02: How TypeScript Works

| ID | 파일명 | 제목 | 챕터 | 상세 디렉션 |
|----|--------|------|------|-------------|
| 3 | `illust-03-typescript-factory.png` | TypeScript 공장 | Ch02 | 컨베이어 벨트 스타일. .ts 입력 → 검수대(Parsing) → 타입체크 → Type Stripping → .js 출력. 불합격 박스 별도 표시 |
| 4 | `illust-04-type-lifetime.png` | 타입 정보의 일생 | Ch02 | 3막 구성. Act1: 스티커(타입)붙은 바나나, Act2: 기계가 스티커 떼어냄, Act3: 런타임에 깨끗한 바나나만 남음 |
| 5 | `illust-05-power-of-settings.png` | 설정의 힘 | Ch02 | 3단 비교. strict:false(느슨한 그물), 보통(적당한 울타리), strict:true(투명한 방) |

---

### Chapter 03: Development Environment

| ID | 파일명 | 제목 | 챕터 | 상세 디렉션 |
|----|--------|------|------|-------------|
| 6 | `illust-06-project-setup.png` | 프로젝트 준비 | Ch03 | 만화 스타일 순서도. 빈 상자 → 바나나 넣기 → 공구 설치 → 설명서 작성 → 준비 완료. 체크리스트 체크하는 바나나 캐릭터 |
| 7 | `illust-07-ide-assistant.png` | IDE는 당신의 비서 | Ch03 | 사무실 장면. 왼쪽: 비서 없이 서류더미에 파묻힌 개발자, 오른쪽: 로봇 비서와 함께 여유로운 개발자 |

---

### Chapter 04: Basic Types

| ID | 파일명 | 제목 | 챕터 | 상세 디렉션 |
|----|--------|------|------|-------------|
| 8 | `illust-08-type-kingdom.png` | 타입의 왕국 | Ch04 | 판타지 맵 스타일. 중앙: 타입 왕국 성, 구역별 마을(String, Number, Boolean, Object, Array). 경계에 검문소 |
| 9 | `illust-09-array-vs-tuple.png` | 배열 vs 튜플 | Ch04 | 좌우 비교. 왼쪽: 같은 바나나들(Array), 오른쪽: 정확히 다른 과일들(Tuple) |
| 10 | `illust-10-object-blueprint.png` | 객체는 설계도 | Ch04 | 건축 현장. 상단: Interface 설계도, 하단: 실제 Object 건물, 감독관이 비교하는 모습 |
| 11 | `illust-11-function-machine.png` | 함수는 기계 | Ch04 | 공장 기계. 입력(string) → 기계(greet) → 출력(string). 잘못된 입력 시 경고등 |
| 12 | `illust-12-union-vs-intersection.png` | Union vs Intersection | Ch04 | 벤다이어그램. Union: 합집합(둘 중 하나), Intersection: 교집합(둘 다 만족) |

---

### Chapter 05: Intermediate Concepts

| ID | 파일명 | 제목 | 챕터 | 상세 디렉션 |
|----|--------|------|------|-------------|
| 13 | `illust-13-generic-factory.png` | 제네릭 공장 | Ch05 | 공장 시스템. 제어실에서 타입 선택 → 범용 기계가 해당 타입으로 처리 → 결과물 출력 |
| 14 | `illust-14-entry-restriction.png` | 입장 제한 | Ch05 | 놀이공원 입구. 경비원이 "extends { length }" 팻말. string/array 통과, number/boolean 거부 |
| 15 | `illust-15-type-narrowing.png` | 타입 좁히기 | Ch05 | 깔때기 다이어그램. 넓은 입구(Union) → 검사대(Type Guard) → 분리된 출구(각 타입별) |
| 16 | `illust-16-limited-choices.png` | 제한된 선택지 | Ch05 | 자판기 비유. 일반 string: 무한 버튼, Literal type: 딱 3개 버튼만 |
| 17 | `illust-17-assertion-danger.png` | 타입 단언의 위험 | Ch05 | 법정 장면. 개발자가 "as Banana" 증언, 실제로는 고추가 들어있어 런타임 폭발 |

---

### Chapter 06: Advanced Patterns

| ID | 파일명 | 제목 | 챕터 | 상세 디렉션 |
|----|--------|------|------|-------------|
| 18 | `illust-18-type-workshop.png` | 타입 변환 작업장 | Ch06 | 공구 작업대. Partial 렌치, Pick 가위, Omit 지우개, Required 접착제, Record 스탬프 |
| 19 | `illust-19-type-junction.png` | 타입 분기점 | Ch06 | 철도 분기. 검문소(T extends string?) → YES/NO 경로로 분리 |
| 20 | `illust-20-type-factory-line.png` | 타입 변환 공장 라인 | Ch06 | 컨베이어 벨트. User 타입 → Mapped Type 기계 → UserFlags 출력 |
| 21 | `illust-21-string-lego.png` | 문자열 레고 블록 | Ch06 | 레고 조립. 기본 블록(get, set, name) → 조립 규칙 → 완성된 타입(getName, setAge) |

---

### Chapter 07: Common Patterns

| ID | 파일명 | 제목 | 챕터 | 상세 디렉션 |
|----|--------|------|------|-------------|
| 22 | `illust-22-api-packaging.png` | API 응답 패키징 | Ch07 | 배송 시스템. 서버 → 패키징(ApiResponse) → 클라이언트. 성공/실패 케이스 분리 |
| 23 | `illust-23-error-safety-net.png` | 에러 처리 안전망 | Ch07 | 곡예 공연. 상단: 위험한 작업, 하단: 3겹 안전망(try-catch, Type Guard, Error Handler) |

---

### Chapter 08: React with TypeScript

| ID | 파일명 | 제목 | 챕터 | 상세 디렉션 |
|----|--------|------|------|-------------|
| 24 | `illust-24-component-function.png` | 컴포넌트는 함수 | Ch08 | 공장 생산 라인. Props 입력 → Button 공장 → JSX 출력. 검문소에서 잘못된 Props 차단 |

---

### Chapter 09: Next.js with TypeScript

| ID | 파일명 | 제목 | 챕터 | 상세 디렉션 |
|----|--------|------|------|-------------|
| 25 | `illust-25-nextjs-type-safe.png` | Next.js 타입 안전 여정 | Ch09 | 도시 지도. Client/Server Component 구역, 다리(데이터 흐름), Server Actions 터널, 환경변수 금고 |

---

## 이미지 생성 프롬프트 템플릿

각 일러스트 생성 시 다음 형식의 프롬프트 사용:

```
Create a cute, hand-drawn style illustration for a TypeScript educational website.

Theme: [제목]
Style: Excalidraw/hand-drawn style, pastel colors with vibrant accents
Main character: A cute banana character with eyes and limbs (named "바나나")
Scene: [상세 디렉션]

Requirements:
- Clean, minimal design
- Clear visual metaphor for the concept
- Friendly and approachable tone
- Caption area at bottom for Korean text

Color palette:
- Primary Blue: #3b82f6
- Accent Purple: #a855f7
- Banana Yellow: #eab308
- Success Green: #22c55e
- Error Red: #ef4444
```
