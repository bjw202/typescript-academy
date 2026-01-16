## 학습 목표
실제로 TypeScript 프로젝트를 시작할 수 있는 환경 구축

---

## 3.1 프로젝트 초기화 {#project-init}

TypeScript 프로젝트를 시작하기 위한 단계별 가이드입니다.

### 🏗️ 건설 현장 비유

TypeScript 프로젝트 설정은 **건설 현장 준비**와 같습니다:

1. **Node.js 설치** = 건설 허가증 취득
2. **TypeScript 설치** = 건설 장비 반입
3. **tsconfig.json** = 건축 설계도

설계도(tsconfig) 없이 집(프로젝트)을 지을 수는 있지만... 나중에 큰 문제가 생길 거예요! 🏚️

### Step 1: Node.js 설치 확인

먼저 Node.js가 설치되어 있는지 확인합니다:

```bash
node -v
# v20.0.0 ← 18 이상이면 OK
```

> 💡 **Node.js가 없다면?**
> 
> [nodejs.org](https://nodejs.org)에서 LTS 버전을 다운로드하세요.
> LTS = Long Term Support, 안정적인 버전입니다.

### Step 2: TypeScript 설치

프로젝트에 TypeScript를 개발 의존성으로 설치합니다:

```bash
npm install -D typescript
```

> 🤔 **왜 `-D` (devDependencies)인가요?**
> 
> TypeScript는 **개발할 때만** 필요합니다.
> 배포되는 코드는 JavaScript이기 때문에, 프로덕션에서는 TypeScript가 필요 없어요!

### Step 3: tsconfig.json 생성

TypeScript 설정 파일을 생성합니다:

```bash
npx tsc --init
```

이 명령어를 실행하면 기본 설정이 포함된 `tsconfig.json` 파일이 생성됩니다.

> 💡 **생성된 파일이 복잡해 보여도 걱정 마세요!**
> 
> 대부분의 옵션은 주석 처리되어 있습니다.
> 필요한 것만 켜면 됩니다. (핵심 3개만 알면 OK!)

---

## 3.2 tsconfig.json 완전 정복 {#tsconfig-deep-dive}

`tsconfig.json`의 핵심 옵션들을 알아봅시다.

### 🎛️ 믹서 조절판

tsconfig는 음악 스튜디오의 **믹서 조절판**과 같습니다.

각 슬라이더(옵션)를 조절해서 원하는 사운드(빌드 결과)를 만들어냅니다:
- 볼륨(strict) 높이면 → 더 안전한 코드
- 이펙트(target) 바꾸면 → 다른 환경 지원

### 프로젝트 유형별 권장 설정

프로젝트 유형에 따라 설정이 달라질 수 있습니다:

| 프로젝트 유형 | target | module | 특이사항 |
|:--------------|:-------|:-------|:---------|
| Node.js 백엔드 | ES2020+ | CommonJS | `esModuleInterop: true` |
| React 프론트엔드 | ES2020 | ESNext | `jsx: react-jsx` |
| Next.js | ES2020 | ESNext | Next.js가 자동 설정 |
| 라이브러리 | ES2020 | ESNext | `declaration: true` |

> 💡 **Next.js나 Vite 사용 시**
> 
> tsconfig를 **자동 생성**해줍니다! 수동으로 만들 필요 없어요.
> 프레임워크의 권장 설정을 따르는 게 좋습니다.

### 중요 옵션 설명

**`strict` (엄격 모드)** ⭐ 가장 중요!
- 모든 엄격한 타입 체크를 활성화합니다
- **권장: `true`** - TypeScript를 쓰는 이유입니다!

**`noImplicitAny`**
- 암시적 `any` 타입을 금지합니다
- 예: `function foo(x)` ← x가 any면 에러

> 🎯 **왜 `any`가 위험한가요?**
> 
> `any`는 "아무거나 OK"라는 의미입니다.
> TypeScript의 보호를 **포기**하는 것이나 마찬가지예요!
> 
> ```ts
> function process(data: any) {
>   data.toUpperCase(); // 런타임에 터질 수 있음!
> }
> ```

**`strictNullChecks`**
- `null`/`undefined`를 명시적으로 처리해야 합니다
- 가장 많은 버그를 잡아주는 옵션입니다

> 💡 **실무 경험담**
> 
> "Cannot read property of undefined" 에러의 90%는 
> `strictNullChecks`만 켜도 **컴파일 타임에 잡힙니다**.

**`target`**
- 어떤 JavaScript 버전으로 컴파일할지 결정합니다
- ES2020 권장 (대부분의 모던 브라우저 지원)

---

## 3.3 IDE 설정 (VSCode) {#ide-setup}

VSCode는 TypeScript 개발에 최적화된 IDE입니다.

### 🛠️ 장인의 도구

좋은 목수에게 좋은 연장이 필요하듯, TypeScript 개발에는 **잘 세팅된 VSCode**가 필수입니다.

VSCode + TypeScript 조합은 마치 **자동차 네비게이션**과 같아요:
- 어디로 가야 하는지 알려줌 (자동완성)
- 잘못된 길로 가면 경고 (에러 표시)
- 목적지까지 최적 경로 제안 (Quick Fix)

### 필수 확장 프로그램

1. ✅ **TypeScript 지원** - 기본 내장됨 (설치 필요 없음!)
2. **ESLint** - 코드 품질 검사 (버그 패턴 감지)
3. **Prettier** - 코드 포맷팅 (일관된 스타일)
4. **Error Lens** - 에러를 인라인으로 표시 (눈에 확 들어옴!)

> 💡 **Error Lens 강력 추천!**
> 
> 평소: 밑줄만 보이고, 마우스 올려야 에러 확인
> Error Lens: 에러 메시지가 **코드 옆에 바로 표시**됨!

### 권장 설정

`.vscode/settings.json` 파일을 생성하고 다음 설정을 추가하세요:

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.updateImportsOnFileMove.enabled": "always"
}
```

이 설정을 적용하면:
- 📝 파일 저장 시 자동으로 포맷팅됩니다
- 🔧 ESLint 에러가 자동으로 수정됩니다
- 📁 파일 이동 시 import 경로가 자동 업데이트됩니다

> 🎯 **생산성 꿀팁**
> 
> 저장할 때마다 코드가 예쁘게 정리되면, **리뷰할 때도 편하고** 
> **머지 충돌도 줄어듭니다**. 팀 전체가 같은 설정을 쓰는 게 좋아요!

---

## 3.4 린팅과 포매팅 {#linting-formatting}

코드 품질을 유지하기 위한 세 가지 도구를 알아봅시다.

### 🚦 신호등 시스템

코드 품질 도구들은 **신호등 시스템**과 같습니다:

- 🟢 **Prettier** = 초록불: "예쁘게 정리해줄게"
- 🟡 **ESLint** = 노란불: "여기 좀 이상해, 주의해"
- 🔴 **tsc** = 빨간불: "잘못됐어! 고쳐야 실행 가능"

### 도구별 역할 비교

| 도구 | 역할 | 예시 | 성격 |
|:-----|:-----|:-----|:-----|
| **tsc** | 타입 에러 체크 | "number인데 string을 넣었어요!" | 절대적 (에러면 무조건 수정) |
| **ESLint** | 코드 품질 체크 | "사용하지 않는 변수가 있어요" | 권장 (규칙 조정 가능) |
| **Prettier** | 코드 스타일 통일 | "탭 대신 스페이스 2칸" | 미학적 (취향 문제) |

### 코드 검사 흐름

코드가 저장되면 다음 순서로 검사가 진행됩니다:

1. **Prettier** → 코드 포맷팅 ✨ (들여쓰기, 줄바꿈)
2. **ESLint** → 코드 품질 검사 🔍 (버그 패턴, 베스트 프랙티스)
3. **tsc** → 타입 체크 🛡️ (타입 안전성)
4. 완벽한 코드! ✅

세 도구를 함께 사용하면 일관된 코드 스타일과 높은 코드 품질을 유지할 수 있습니다.

> 💡 **왜 세 개나 필요해요?**
> 
> 각자 **다른 문제**를 해결합니다:
> 
> - 코드가 못생겨도 동작함 → Prettier가 해결
> - 타입은 맞는데 버그 패턴 → ESLint가 해결
> - 로직이 좋아도 타입 에러 → tsc가 해결
> 
> **비유**: 살균(tsc) + 영양(ESLint) + 맛(Prettier) = 완벽한 요리! 🍳

---

## 😱 나노바나나의 실수 노트

> **초보자가 가장 많이 하는 실수: 라이브러리 타입 설치 누락**

### ❌ 에러 상황
`lodash` 같은 라이브러리를 설치했는데 빨간 줄이 떠요!

```ts
import _ from "lodash";
// ❌ Error: Could not find a declaration file for module 'lodash'.
```

### 🍌 나노바나나의 설명
"라이브러리는 설치했지만, **설명서(타입 정의 파일)**가 없어서 그래!"

JavaScript로 만들어진 라이브러리는 타입 정보가 없어서 TypeScript가 "이게 뭔지 모르겠어"라고 하는 거야. 마치 가구는 샀는데 조립 설명서가 누락된 상황이지.

### ✅ 해결 방법

**설명서(@types) 패키지를 따로 설치해줘!**

```bash
# 보통 '라이브러리명' 앞에 '@types/'를 붙이면 돼
npm install -D @types/lodash
```

> 💡 **팁**: 요즘 나온 라이브러리들은 내부에 설명서가 포함된 경우가 많아서 이 에러가 안 뜨기도 해. 에러가 뜰 때만 `@types/...`를 찾아봐!
