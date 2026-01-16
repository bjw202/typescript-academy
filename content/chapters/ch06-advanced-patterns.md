## 학습 목표
TypeScript의 고급 기능으로 강력한 타입 시스템 구축

---

## 6.1 Utility Types {#utility-types}

TypeScript는 기존 타입을 변형해서 새로운 타입을 만드는 **Utility Types**를 제공합니다.

### 🛠️ 타입의 스위스 아미 나이프

Utility Types는 **기존 타입을 가공하는 도구 모음**입니다. 레고 블록을 이용해 새로운 모양을 만드는 것처럼, 기존 타입으로 새 타입을 만들 수 있어요.

**실생활 비유:**
- `Partial<T>`: 풀옵션 자동차에서 **선택 사양**만 고르기
- `Required<T>`: 선택 사양을 **필수 사양**으로 바꾸기
- `Pick<T, K>`: 메뉴판에서 **원하는 것만** 고르기
- `Omit<T, K>`: "이것만 빼주세요" (알레르기 재료 제외)

### Partial\<T\>
모든 속성을 선택적으로 만듭니다.

```ts
interface User {
  name: string;
  age: number;
  email: string;
}

type PartialUser = Partial<User>;
// { name?: string; age?: number; email?: string; }

// 사용 예: 업데이트 함수 - 일부 속성만 전달 가능
function updateUser(id: string, updates: Partial<User>) {
  // ...
}

updateUser("123", { name: "Alice" }); // ✅ age, email 없어도 OK
```

> 🎯 **언제 쓰나요?**
> 
> **PATCH 요청**처럼 일부만 수정할 때!
> 전체 데이터가 아닌 **변경되는 필드만** 보낼 수 있어요.

### Required\<T\>
모든 속성을 필수로 만듭니다 (`Partial`의 반대).

```ts
type RequiredUser = Required<PartialUser>;
// 다시 모든 속성이 필수가 됨
```

### Pick\<T, K\>
특정 속성만 선택합니다.

```ts
type UserPreview = Pick<User, "name" | "email">;
// { name: string; email: string; }
```

> 🎯 **언제 쓰나요?**
> 
> **목록 페이지**에서 미리보기만 보여줄 때!
> 전체 데이터 중 필요한 것만 가져와서 가볍게 사용.

### Omit\<T, K\>
특정 속성을 제외합니다 (`Pick`의 반대).

```ts
type UserWithoutEmail = Omit<User, "email">;
// { name: string; age: number; }
```

> 🎯 **언제 쓰나요?**
> 
> **API 응답에서 민감 정보 제거**할 때!
> ```ts
> type PublicUser = Omit<User, "password" | "ssn">;
> ```

### Record\<K, T\>
키-값 쌍으로 이루어진 타입을 생성합니다.

```ts
type Scores = Record<string, number>;
// { [key: string]: number; }

const scores: Scores = {
  math: 95,
  english: 87,
};
```

> 🎯 **언제 쓰나요?**
> 
> **딕셔너리/맵** 형태의 데이터를 다룰 때!
> - 점수표, 설정값, 번역 키 등

---

## 6.2 Conditional Types {#conditional-types}

타입 수준에서의 **if-else**입니다.

### 🚦 타입의 신호등

Conditional Type은 타입 세계의 **분기문**입니다.

```ts
type 신호등<T> = T extends "빨강" ? "멈춤" : "진행";

type 결과1 = 신호등<"빨강">;  // "멈춤"
type 결과2 = 신호등<"초록">;  // "진행"
```

### 문법

```ts
T extends U ? X : Y
```

**해석**: T가 U에 할당 가능하면 X, 아니면 Y

### 기본 예제

```ts
type IsString<T> = T extends string ? "yes" : "no";

type A = IsString<string>;  // "yes"
type B = IsString<number>;  // "no"
```

### 실전 활용: 배열 요소 타입 추출

```ts
type Flatten<T> = T extends Array<infer U> ? U : T;

type Num = Flatten<number[]>;   // number
type Str = Flatten<string>;     // string
```

`infer` 키워드는 조건부 타입 내에서 타입을 추론하여 변수에 저장합니다.

> 🤔 **"infer가 뭐예요?"**
> 
> `infer`는 **"거기 뭐 있는지 알아내라"**는 명령입니다.
> 마치 X-ray로 배열 내부를 들여다보는 것처럼!
> 
> ```ts
> // Array<infer U> = 배열이면 그 요소 타입을 U에 저장해!
> type ElementOf<T> = T extends Array<infer U> ? U : never;
> ```

---

## 6.3 Mapped Types {#mapped-types}

기존 타입의 모든 속성을 순회하며 변환합니다.

### 🔄 타입의 map() 함수

JavaScript의 `array.map()`처럼, 타입의 모든 속성을 **순회하며 변환**합니다.

```ts
// 배열: [1, 2, 3].map(x => x * 2) = [2, 4, 6]
// 타입: { a: string, b: number } → { a: boolean, b: boolean }
```

### 문법

```ts
type Mapped<T> = {
  [K in keyof T]: 변환된타입
};
```

### keyof 이해하기

`keyof`는 타입의 모든 키를 Union 타입으로 반환합니다.

```ts
interface User {
  name: string;
  age: number;
}

type UserKeys = keyof User; // "name" | "age"
```

### 예제: 모든 속성을 boolean으로

```ts
type Flags<T> = {
  [K in keyof T]: boolean;
};

type UserFlags = Flags<User>;
// { name: boolean; age: boolean; }
```

> 🎯 **언제 쓰나요?**
> 
> - 폼의 **touched/dirty 상태** 추적
> - 설정의 **on/off 플래그** 관리
> - 필드별 **에러 상태** 표시

### 실전 패턴: Getter 함수 생성

```ts
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type UserGetters = Getters<User>;
// { getName: () => string; getAge: () => number; }
```

> 💡 **`as` 절 (Key Remapping)**
> 
> TypeScript 4.1부터 키 이름을 **변환**할 수 있습니다!
> `getName`, `getAge`처럼 패턴에 맞는 이름을 자동 생성.

---

## 6.4 Template Literal Types {#template-literal-types}

문자열 리터럴 타입을 템플릿처럼 조합합니다.

### 📝 타입의 문자열 조합

JavaScript의 템플릿 리터럴(`` `Hello ${name}` ``)처럼, **타입도 조합**할 수 있습니다!

```ts
type Greeting = `Hello ${string}`;

const g1: Greeting = "Hello World";       // ✅
const g2: Greeting = "Hello TypeScript";  // ✅
const g3: Greeting = "Hi there";          // ❌ Hello로 시작 안 함
```

### 실전 활용: 이벤트 이름

```ts
type EventName = `on${Capitalize<string>}`;

const event1: EventName = "onClick";   // ✅
const event2: EventName = "onSubmit";  // ✅
const event3: EventName = "click";     // ❌ on으로 시작 안함
```

> 🎯 **언제 쓰나요?**
> 
> React의 이벤트 핸들러 prop 이름을 강제할 때!
> `onClick`, `onSubmit`, `onChange` 등 패턴 강제.

### 실전 활용: CSS 속성

```ts
type Direction = "top" | "right" | "bottom" | "left";
type CSSProperty = `margin-${Direction}` | `padding-${Direction}`;
// "margin-top" | "margin-right" | ... | "padding-left" (8가지 조합)
```

### 실전 활용: API 라우트 조합

```ts
type Method = "GET" | "POST" | "PUT" | "DELETE";
type Route = "/users" | "/posts" | "/comments";

type ApiEndpoint = `${Method} ${Route}`;
// "GET /users" | "POST /users" | ... (12가지 조합)
```

> 💡 **조합의 힘**
> 
> 4개 메서드 × 3개 라우트 = **12개의 유효한 엔드포인트**가 자동 생성됩니다.
> 잘못된 조합은 컴파일 에러!
> 
> ```ts
> const endpoint: ApiEndpoint = "PATCH /users"; // ❌ PATCH는 없어요!
> ```

Template Literal Types를 활용하면 타입 수준에서 문자열 패턴을 강제할 수 있어, API 설계나 이벤트 시스템에서 매우 유용합니다.

> 🚀 **고급 기능의 가치**
> 
> 이런 고급 기능은 **라이브러리 작성자**에게 특히 유용합니다.
> 사용자가 잘못된 문자열을 넣으면 **즉시 에러**를 보여줄 수 있어요!

---

## 😱 나노바나나의 실수 노트

> **초보자가 가장 많이 하는 실수: 템플릿 리터럴 오타**

### ❌ 에러 상황
분명 비슷한 문자열인데 에러가 나요!

```ts
type Color = "red" | "blue";
type BoxClass = `box-${Color}`;

const myBox: BoxClass = "box-green";
// ❌ Error: Type '"box-green"' is not assignable to type '"box-red" | "box-blue"'.
```

### 🍌 나노바나나의 설명
"나는 `box-red`나 `box-blue`만 받기로 약속했는데, 뜬금없이 `box-green`을 주면 어떡해!"

Template Literal Type은 가능한 모든 조합을 미리 계산해서 엄격하게 검사에. `string`이 아니라 **유한한 문자열의 집합**이라는 걸 명심해!

### ✅ 해결 방법

**Color 타입에 'green'을 추가해주면 해결!**

```ts
type Color = "red" | "blue" | "green"; // 👈 추가
type BoxClass = `box-${Color}`;

const myBox: BoxClass = "box-green"; // ✅ 이제 OK!
```

자동 완성이 안 뜰 때는 오타가 났거나, 조합에 없는 값을 쓰고 있는지 꼭 확인해봐. TypeScript는 너의 오타를 잡아주려고 애쓰는 중이니까! 😉
