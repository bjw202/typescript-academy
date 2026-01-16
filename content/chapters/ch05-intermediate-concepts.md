## 학습 목표
타입 시스템의 진짜 힘을 발휘하는 중급 개념 마스터

---

## 5.1 Generics - 타입의 변수 {#generics}

타입마다 같은 로직의 함수를 만들어야 하는 상황을 생각해봅시다:

```ts
function wrapInArrayString(value: string): string[] {
  return [value];
}

function wrapInArrayNumber(value: number): number[] {
  return [value];
}
```

😱 타입마다 함수를 만들어야 할까요? 아닙니다!

### 🎁 선물 포장 서비스
![선물 포장 나노바나나](/illustrations/illust-05-gift-wrapping.png)

제네릭은 **맞춤형 선물 포장** 서비스입니다.

포장지(함수)는 같은데, 내용물(타입)은 다를 수 있죠. 책을 포장해도, 꽃을 포장해도, 용돈 봉투를 포장해도 **포장 과정은 똑같습니다**.

```ts
// 포장하기 서비스
function wrapInArray<T>(item: T): T[] {
  return [item];  // 박스에 넣어서 돌려줌
}

wrapInArray<string>("책");     // 책 포장 📚
wrapInArray<number>(50000);    // 용돈 포장 💰  
wrapInArray<boolean>(true);    // boolean도 포장 ✅
```

포장 과정은 똑같지만, **뭘 포장하느냐**에 따라 결과가 달라집니다. 한 가지 방법으로 모든 타입에 대응하는 마법! ✨

### 해결책: Generics

```ts
function wrapInArray<T>(value: T): T[] {
  return [value];
}

// 이제 모든 타입에서 동작!
wrapInArray<string>("hello");   // string[]
wrapInArray<number>(42);        // number[]
wrapInArray<boolean>(true);     // boolean[]
```

### 핵심 개념

`<T>`는 **타입 변수(Type Variable)** 입니다.
- 함수를 호출할 때 타입을 전달합니다
- 그 타입으로 함수 내부가 작동합니다
- 대부분의 경우 TypeScript가 타입을 자동 추론합니다

```ts
// 타입 추론 - <string>을 생략해도 됩니다
const result = wrapInArray("hello");  // string[]로 추론됨
```

### 🐣 주니어 vs 🍌 시니어: "그냥 any 쓰면 안 돼요?"

**🐣 주니어 개발자**:
"제네릭은 너무 어려워요. 그냥 `any` 쓰면 다 들어가고 좋잖아요?"

**🍌 시니어 나노바나나**:
"`any`를 쓰는 건 **선물 포장을 뜯어서 버리는 것**과 같아."

**🐣 주니어 개발자**:
"네?"

**🍌 시니어 나노바나나**:
"`any`는 내용물이 뭔지 기억하지 않겠다고 선언하는 거야. 반면 제네릭 `<T>`는 '지금 포장하는 물건이 뭔지 기억해뒀다가, 나중에 꺼낼 때 알려줄게'라고 하는 거지. 그래야 나중에 '어? 아까 넣은 게 축구공이었나 책이었나?' 하고 헷갈리지 않아!"

```ts
function badWrap(item: any): any[] {
  return [item];
}
const result = badWrap("hello");  // any[] - 뭐가 들었는지 모름 😵

function goodWrap<T>(item: T): T[] {
  return [item];
}
const result = goodWrap("hello");  // string[] - 문자열인 거 알아! 😊
```

---

## 5.2 Generic Constraints (제네릭 제약) {#generic-constraints}

### 문제 상황

```ts
function printLength<T>(value: T): void {
  console.log(value.length); // ❌ Error!
  // T가 length를 가지고 있다는 보장이 없음
}
```

> 🤔 **왜 에러?**
> 
> `<T>`는 **아무 타입이나** 될 수 있습니다. `number`가 들어오면? 
> 숫자에는 `.length`가 없죠! TypeScript가 미리 막아주는 겁니다.

### 해결: `extends`로 제약 추가

```ts
function printLength<T extends { length: number }>(value: T): void {
  console.log(value.length); // ✅ OK!
}

printLength("hello");        // ✅ string은 length 있음
printLength([1, 2, 3]);      // ✅ array도 length 있음
printLength(123);            // ❌ number는 length 없음
```

`extends`는 **최소한 이런 조건은 만족해야 함**을 의미합니다.

> 🎫 **클럽 입장 비유**
> 
> - `<T>` = 누구나 입장 가능 (연령 제한 없음)
> - `<T extends { length: number }>` = `.length` 있는 타입만 입장 가능 (VIP 전용)
>
> 문지기(TypeScript)가 조건을 체크해줍니다!

### 실전 패턴

```ts
// API 응답은 최소한 id를 가져야 함
function updateItem<T extends { id: string }>(item: T) {
  console.log(`Updating item: ${item.id}`);
  // item.id는 항상 접근 가능
}
```

> 💡 **언제 쓰나요?**
> - `id`로 항목을 찾거나 업데이트할 때
> - 공통 속성(예: `name`, `createdAt`)을 사용하는 함수를 만들 때

---

## 5.3 Type Guards & Narrowing {#type-guards}

### 🕵️ 탐정 놀이
![탐정 나노바나나](/illustrations/illust-05-detective.png)

Type Guard는 **탐정**처럼 타입의 정체를 밝히는 것입니다.

용의자(Union 타입)가 있을 때, 단서를 통해 범위를 좁혀가는 거죠!

### 상황 설명

Union 타입을 사용할 때, TypeScript는 어떤 타입인지 모르는 상태에서는 특정 메서드를 호출할 수 없습니다.

```ts
function process(value: string | number) {
  value.toUpperCase(); // ❌ Error!
  // number일 수도 있는데 toUpperCase()를 호출?
}
```

> 🤔 **왜 에러?**
> 
> TypeScript 입장에서 `value`가 `string`인지 `number`인지 모릅니다.
> `number`에 `toUpperCase()`를 호출하면 런타임 에러! 그래서 미리 막는 거예요.

### Type Guard로 해결

조건문으로 타입을 좁히면 TypeScript가 해당 블록 내에서 타입을 확신합니다.

```ts
function process(value: string | number) {
  if (typeof value === "string") {
    // 🕵️ "문자열이군! toUpperCase 심문 가능!"
    value.toUpperCase(); // ✅ OK!
  } else {
    // 🕵️ "숫자였어! toFixed 심문 가능!"
    value.toFixed(2); // ✅ OK!
  }
}
```

### Type Guard 종류

| 종류 | 문법 | 용도 | 예시 |
|:-----|:-----|:-----|:-----|
| `typeof` | `typeof x === "string"` | 원시 타입 체크 | string, number, boolean |
| `instanceof` | `x instanceof Date` | 클래스 인스턴스 체크 | Date, Error, 커스텀 클래스 |
| `in` | `"length" in x` | 속성 존재 여부 체크 | 객체 구분 |
| Custom | `x is string` | 커스텀 타입 가드 함수 | 복잡한 조건 |

> 🎯 **실전 사례: API 응답 처리**
> 
> ```ts
> type Response = SuccessData | ErrorData;
> 
> if ("error" in response) {
>   // 🕵️ "error 속성 발견! 이건 에러 응답이야!"
>   showToast(response.error);
> } else {
>   // 🕵️ "error 없음! 성공 데이터야!"
>   displayData(response.data);
> }
> ```

### 커스텀 타입 가드

복잡한 조건이 필요할 때 함수로 만들 수 있습니다.

```ts
function isString(x: unknown): x is string {
  return typeof x === "string";
}

// 사용
if (isString(value)) {
  value.toUpperCase(); // ✅ value는 string으로 좁혀짐
}
```

> 💡 **`x is string`의 의미**
> 
> "이 함수가 `true`를 반환하면, x는 string이라고 믿어도 돼!"
> TypeScript에게 조건부 힌트를 주는 것입니다.

---

## 5.4 Literal Types {#literal-types}

일반 타입 대신 **특정 값만** 허용하도록 제한할 수 있습니다.

### 🎰 자판기 버튼 비유

일반 `string`은 자판기에서 **아무 버튼이나 누르는 것**과 같습니다.
Literal Type은 **정해진 버튼만** 누를 수 있는 자판기입니다.

```ts
// 아무 버튼 자판기 (위험!)
type 음료 = string;
const 선택: 음료 = "ㅁㄴㅇㄹ";  // ✅ 이상한 것도 허용됨

// 정해진 버튼 자판기 (안전!)
type 음료 = "콜라" | "사이다" | "환타";
const 선택: 음료 = "콜라";     // ✅ OK
const 실수: 음료 = "커피";     // ❌ 이 자판기엔 커피 없어요!
```

### 일반 타입 vs Literal 타입

```ts
// 일반 타입 - 모든 문자열 허용
let status: string = "success";
status = "asdfgh";   // ✅ 의도하지 않아도 허용됨

// Literal 타입 - 특정 값만 허용
let status: "success" | "pending" | "error";
status = "success";  // ✅ OK
status = "asdfgh";   // ❌ Error!
```

### 왜 유용한가?

1. ✅ **오타 방지** - 잘못된 값을 넣으면 즉시 에러
2. ✅ **자동완성 지원** - IDE가 가능한 값을 제안해줘요!
3. ✅ **명확한 의도 전달** - 코드만 봐도 가능한 값을 알 수 있음

### 실전 예시

```ts
// HTTP 메서드 - 오타 방지!
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

// 방향 - 게임 개발에서 자주 사용
type Direction = "north" | "south" | "east" | "west";

// 테마 설정 - 다크모드 토글
type Theme = "light" | "dark" | "auto";

// 상태 관리 - 로딩 상태
type LoadingState = "idle" | "loading" | "success" | "error";
```

> 💡 **프로 팁**: 상수를 `as const`로 선언하면 자동으로 Literal Type이 됩니다!
> 
> ```ts
> const themes = ["light", "dark", "auto"] as const;
> type Theme = typeof themes[number]; // "light" | "dark" | "auto"
> ```

---

## 5.5 Type Assertions {#type-assertions}

> ⚠️ **주의**: Type Assertion은 "타입 캐스팅"이 아닙니다!

Type Assertion은 **나는 이 타입을 확신한다**고 컴파일러에게 말하는 것입니다. 런타임에는 아무 일도 일어나지 않습니다.

### 🎭 "난 알아요" 선언

TypeScript에게 "너는 모르겠지만, 난 이게 뭔지 알아!"라고 말하는 것입니다.

```ts
// TypeScript: "이 버튼이 뭔지 모르겠어..."
const button = document.querySelector(".submit");  // Element | null

// 개발자: "내가 만든 페이지야, 그건 HTMLButtonElement야!"
const button = document.querySelector(".submit") as HTMLButtonElement;
```

### 문법

```ts
// 방법 1: as 키워드 (권장)
const value = someValue as string;

// 방법 2: angle-bracket (JSX에서는 사용 불가)
const value = <string>someValue;
```

### 언제 사용하나?

**1. DOM 조작**

```ts
const input = document.getElementById("email") as HTMLInputElement;
input.value; // ✅ 이제 .value 사용 가능
```

> 💡 `getElementById`는 `HTMLElement | null`을 반환합니다.
> 우리는 그게 input인 걸 알지만, TypeScript는 모르죠!

**2. API 응답 (타입을 알고 있을 때)**

```ts
const user = JSON.parse(response) as User;
```

> ⚠️ 하지만 API가 정말 User 형식을 보내는지 **보장이 없습니다!**
> 실무에서는 zod 같은 라이브러리로 검증하는 게 좋아요.

### ⚠️ 위험!

Type Assertion은 타입 체크를 우회합니다. 잘못 사용하면 런타임 에러가 발생할 수 있습니다.

```ts
const num = "hello" as any as number; // 컴파일러는 믿지만...
console.log(num + 10); // 런타임에 "hello10" 😱
```

### 🚨 Type Assertion 안전 수칙

| 상황 | 권장 |
|------|------|
| DOM 요소 접근 | ✅ OK, 개발자가 구조를 알고 있음 |
| API 응답 | ⚠️ 주의, 가능하면 런타임 검증 추가 |
| 임의 변환 (`as any as T`) | ❌ 위험, 거의 항상 잘못된 설계 |

**`as`를 사용할 때는 책임이 개발자에게 있습니다!**

> 💡 **더 안전한 대안: Type Guard**
> 
> ```ts
> // as 대신 체크 후 사용
> const input = document.getElementById("email");
> if (input instanceof HTMLInputElement) {
>   input.value; // ✅ 안전하게 사용
> }
> ```

---

## 😱 나노바나나의 실수 노트

> **초보자가 가장 많이 하는 실수: unknown은 만질 수 없다!**

### ❌ 에러 상황
에러 처리를 하려고 `catch` 블록에서 `error.message`를 읽었는데 에러가?!

```ts
try {
  // ...
} catch (error) {
  console.log(error.message);
  // ❌ Error: 'error' is of type 'unknown'.
}
```

### 🍌 나노바나나의 설명
"이 `error` 변수는 **봉인된 상자(unknown)**야! 상자 안에 폭탄이 들었는지, 문자열이 들었는지 모르는데 막 만지면 안 돼."

TypeScript 4.4부터 `catch`문의 에러는 기본적으로 `unknown` 타입이야. (어떤 것이든 throw 될 수 있으니까!)

### ✅ 해결 방법

**방법 1: 일단 `any`로 우회하기 (비추천)**
```ts
catch (error: any) {
  console.log(error.message); // 되긴 되지만... 안전하지 않아!
}
```

**방법 2: Type Guard로 확인하고 쓰기 (추천!)**
```ts
catch (error) {
  if (error instanceof Error) {
    // 🕵️ "Error 객체인 게 확인됐군!"
    console.log(error.message); // ✅ OK
  } else {
    console.log("알 수 없는 에러:", error);
  }
}
```
진정한 탐정이라면 확인부터 해야지! 🕵️‍♂️

---

## 📝 요약

![Generic Magic Box](/illustrations/cheat-ch05-magic-box.png)

*   **Generic**: 무엇이든 담을 수 있지만, 무엇이 들었는지 기억하는 **마법 상자** `<T>`.
*   `any`는 포장을 뜯어서 버리는 것이고, 제네릭은 포장을 유지하는 것입니다. 안전하게 포장하세요!
