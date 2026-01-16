## 학습 목표
TypeScript의 기본 타입을 완벽히 이해하고 실전에서 사용

---

## 4.1 Primitive Types (원시 타입) {#primitive-types}

TypeScript의 원시 타입은 JavaScript의 원시 타입과 동일합니다. 가장 자주 사용하는 세 가지 타입을 먼저 알아봅시다.

### 🏷️ 타입은 라벨이다

타입을 지정하는 것은 **물건에 라벨을 붙이는 것**과 같습니다.

냉장고에 반찬통이 5개 있다고 상상해보세요. 라벨이 없으면? 매번 뚜껑을 열어봐야 합니다. 🥴

```ts
// 라벨 없는 반찬통 (JavaScript)
const container1 = ???;  // 이게 김치야 된장이야?

// 라벨 있는 반찬통 (TypeScript)  
const container1: string = "김치";  // 아, 김치구나!
```

TypeScript의 타입은 미래의 나(또는 동료)를 위한 **친절한 메모**입니다. "3개월 뒤의 나도 이 코드를 이해할 수 있을까?" 항상 생각하세요!

### 🐣 주니어 vs 🍌 시니어: "모든 변수에 다 써야 해요?"

**🐣 주니어 개발자**:
"선배님, 코드가 너무 길어져요... `let name: string = 'Kim'` 이렇게 모든 변수에 다 타입을 붙여야 하나요? 손가락 아파요."

**🍌 시니어 나노바나나**:
"하하, 그건 오해야! TypeScript는 생각보다 똑똑하거든. **타입 추론(Type Inference)**이라는 기능이 있어."

**🐣 주니어 개발자**:
"추론이요?"

**🍌 시니어 나노바나나**:
"네가 `let name = 'Kim'`이라고만 써도, TypeScript는 값이 문자열인 걸 보고 '아, 이건 string이구나!'라고 알아서 라벨을 붙여줘. **명백한 경우**에는 타입을 생략해도 돼!"

### string
텍스트 데이터를 나타냅니다. 작은따옴표, 큰따옴표, 백틱 모두 사용 가능합니다.

```ts
const greeting: string = "Hello";
const name: string = 'TypeScript';
const message: string = `Welcome to ${name}!`;
```

> 💡 **팁**: 백틱(`` ` ``)을 사용하면 `${변수}`로 문자열 안에 변수를 삽입할 수 있어요!

### number
정수와 실수를 모두 포함합니다. JavaScript와 마찬가지로 별도의 정수 타입(`int`)은 없습니다.

```ts
const age: number = 42;
const pi: number = 3.14;
const negative: number = -10;
```

> 🤔 **왜 정수와 실수를 구분 안 해요?**
> JavaScript가 원래 그렇게 만들어졌기 때문입니다. 다른 언어에서 온 분들은 어색하겠지만, 오히려 신경 쓸 게 하나 줄어든 셈이에요!

### boolean
참(`true`) 또는 거짓(`false`) 값만 가집니다. 조건문의 핵심이죠.

```ts
const isActive: boolean = true;
const isCompleted: boolean = false;

// 이런 실수, 해보셨나요?
const isLoading: boolean = "true";  // ❌ 문자열 "true"는 boolean이 아닙니다!
```

### 기타 원시 타입

| 타입 | 설명 | 예시 | 언제 쓰나요? |
|:-----|:-----|:-----|:-------------|
| `null` | 의도적인 빈 값 | `const data: null = null;` | "아직 없음"을 명시할 때 |
| `undefined` | 할당되지 않은 값 | `let value: undefined;` | 변수 선언만 하고 싶을 때 |
| `symbol` | 고유한 식별자 | `const id = Symbol("id");` | 객체 키를 유일하게 만들 때 |
| `bigint` | 큰 정수 | `const big: bigint = 100n;` | number 범위를 넘는 큰 숫자 |

---

## 4.2 Array & Tuple {#array-tuple}

### 📦 박스 vs 트레이
![박스 vs 트레이 나노바나나](/illustrations/illust-04-box-vs-tray.png)

**Array**는 같은 종류의 물건을 담는 **큰 박스**입니다. 사과 박스에는 사과만, 귤 박스에는 귤만. 몇 개가 들어있는지는 중요하지 않아요.

**Tuple**은 정해진 칸이 있는 **트레이**입니다. 첫 번째 칸에는 메인 요리, 두 번째 칸에는 반찬, 세 번째는 디저트! 순서와 개수가 정해져 있습니다.

### Array (배열)
같은 타입의 요소들을 순서대로 저장합니다. 길이가 가변적입니다.

```ts
// 두 가지 선언 방식
const scores: number[] = [95, 87, 91];
const names: Array<string> = ["Alice", "Bob"];

// 요소 추가
scores.push(88); // ✅ OK - number 타입
scores.push("A+"); // ❌ Error - 숫자 박스에 문자열 넣기 금지!
```

### Tuple (튜플)
정확한 개수와 각 위치별 타입이 고정된 배열입니다.

```ts
// [이름, 나이] 형식의 튜플
const user: [string, number] = ["Alice", 25];

user[0] = "Bob";    // ✅ OK - 첫 번째는 string
user[0] = 30;       // ❌ Error - string 자리에 number 불가
```

> 🎯 **실전 사례**: React의 `useState`가 바로 튜플입니다!
> ```ts
> const [count, setCount] = useState(0);
> // [상태값, 설정함수] - 항상 이 순서, 항상 2개!
> ```

### 언제 무엇을 사용할까?

| 상황 | 추천 타입 | 이유 |
|:-----|:----------|:-----|
| 동일한 데이터의 리스트 | Array | 예: 사용자 목록, 점수 목록 |
| 고정된 구조의 데이터 | Tuple | 예: 좌표 `[x, y]`, RGB `[r, g, b]` |

---

## 4.3 Object & Interface {#object-interface}

객체를 다룰 때는 그 구조를 미리 정의해야 합니다. 마치 **설계도**를 그리는 것처럼요.

### 🏗️ 집 짓기 비유

객체 타입을 정의하는 것은 집을 짓기 전에 **설계도**를 그리는 것과 같습니다.

```ts
// 설계도 (Type 또는 Interface)
interface 집 {
  방_개수: number;
  화장실_개수: number;
  주차장?: boolean;  // 선택 사항
}

// 실제 집 (객체)
const 우리집: 집 = {
  방_개수: 3,
  화장실_개수: 2
  // 주차장은 없어도 OK (선택 사항이니까)
};
```

### Type Alias (타입 별칭)

```ts
type User = {
  name: string;
  age: number;
};

const alice: User = { name: "Alice", age: 25 };
```

### Interface (인터페이스)

```ts
interface User {
  name: string;
  age: number;
}

const bob: User = { name: "Bob", age: 30 };
```

> 🤔 **Type vs Interface, 뭘 써야 해요?**
> 
> 결론부터: **대부분의 경우 둘 다 OK!** 
> - 객체 타입 정의: 둘 다 가능
> - 확장(상속): 둘 다 가능
> - 차이점은 고급 과정에서 다룹니다 (지금은 걱정 마세요!)

두 방법은 대부분의 경우 동일하게 동작합니다. 팀 컨벤션을 따르거나, 일관성 있게 하나를 선택하세요.

### 실전 패턴

**선택적 속성 (Optional)**

`?`를 붙이면 해당 속성이 있어도 되고 없어도 됩니다. "있으면 좋고, 없어도 되는" 느낌이죠.

```ts
interface User {
  name: string;
  age?: number;  // 선택적 속성
}

const user1: User = { name: "Alice" };           // ✅ OK
const user2: User = { name: "Bob", age: 30 };    // ✅ OK
```

> 💡 **언제 쓰나요?**
> - 회원가입 시: 닉네임은 필수, 프로필 사진은 선택
> - 설정: 기본값이 있는 옵션들

**읽기 전용 (Readonly)**

`readonly`를 붙이면 초기화 후 수정할 수 없습니다. **"한 번 정하면 끝!"**

```ts
interface Config {
  readonly apiKey: string;
}

const config: Config = { apiKey: "abc123" };
config.apiKey = "new";  // ❌ Error - 수정 불가
```

> 🔐 **언제 쓰나요?**
> - API 키, 비밀번호 등 변경되면 안 되는 값
> - 설정값이 실수로 바뀌는 것을 방지

---

## 4.4 Function Types {#function-types}

함수에도 타입을 지정할 수 있습니다. 매개변수의 타입과 반환값의 타입을 명시합니다.

### 📝 계약서 비유

함수 타입은 **계약서**와 같습니다.

```ts
// 계약 내용:
// - 입력: 이름(문자열)을 받습니다
// - 출력: 인사말(문자열)을 반환합니다
function greet(name: string): string {
  return `Hello, ${name}!`;
}
```

이 계약을 어기면?

```ts
greet(123);  // ❌ 계약 위반! 문자열 아닌 숫자를 넣었어요
greet("Bob");  // ✅ 계약 이행 완료
```

### 기본 문법

```ts
function greet(name: string): string {
  return `Hello, ${name}!`;
}
```

- `name: string` → 매개변수 타입 (입력)
- `: string` (함수 이름 뒤) → 반환값 타입 (출력)

### 화살표 함수

```ts
const greet = (name: string): string => {
  return `Hello, ${name}!`;
};

// 더 간단하게 (한 줄일 때)
const greet = (name: string): string => `Hello, ${name}!`;
```

### 왜 중요한가?

1. ✅ 함수를 사용하는 사람이 **뭘 넣어야 하는지** 알 수 있음
2. ✅ 함수가 **뭘 돌려주는지** 명확함
3. ✅ 실수로 잘못된 값을 넘기면 **즉시 에러** (런타임 전에!)

> 🎯 **실전 팁**: 반환 타입은 생략해도 TypeScript가 추론하지만, 복잡한 함수는 명시하는 게 좋아요. 미래의 나를 위한 문서화!

---

## 4.5 Union & Intersection {#union-intersection}

### 🎭 복면가왕 비유

**Union (|)** = "**또는**" = 복면 뒤에 누가 있을까?

```ts
type Singer = "아이유" | "태연" | "청하";
// 이 셋 중 하나일 것이다!
```

경연 중에는 누군지 모르지만, 목소리(메서드)가 힌트가 됩니다. Type Guard로 정체를 밝히는 거죠!

**Intersection (&)** = "**그리고**" = 다재다능 만능 재주꾼

```ts
type SingerActor = Singer & Actor;
// 노래도 하고 연기도 해야 함!
```

아이유처럼 **노래도 연기도** 다 해야 합니다. 하나만 잘해서는 이 타입을 만족시킬 수 없어요!

### Union (|) - "또는"

여러 타입 중 하나가 될 수 있음을 표현합니다.

```ts
type Result = string | number;

const value1: Result = "success";  // ✅ string
const value2: Result = 200;        // ✅ number
const value3: Result = true;       // ❌ boolean은 안됨
```

> 💡 **언제 쓰나요?**
> - API 응답이 성공/실패에 따라 다른 형태일 때
> - 함수 인자가 여러 타입을 받을 때
> - null 허용: `type Maybe<T> = T | null`

**실전 예시: API 응답**

```ts
type ApiResponse = User | ErrorMessage;

// 성공하면 User, 실패하면 ErrorMessage
function fetchUser(): ApiResponse {
  // ...
}
```

### Intersection (&) - "그리고"

여러 타입의 속성을 모두 가져야 함을 표현합니다.

```ts
type Serializable = {
  serialize(): string;
};

type Loggable = {
  log(): void;
};

type LoggableSerializable = Serializable & Loggable;
// ↑ serialize()와 log() 모두 가져야 함!
```

> 💡 **언제 쓰나요?**
> - 여러 기능을 조합할 때 (믹스인 패턴)
> - 기존 타입에 속성 추가: `type UserWithTimestamp = User & { createdAt: Date }`

### 실습 문제

사용자는 다음 중 하나의 방법으로 로그인할 수 있습니다:
- 이메일 + 비밀번호
- 소셜 로그인 (provider + token)

이를 Union 타입으로 표현하면:

```ts
type LoginCredentials = 
  | { type: "email"; email: string; password: string }
  | { type: "social"; provider: string; token: string };
```

> 🎯 **보너스**: `type` 필드를 추가하면 어떤 로그인 방식인지 구분하기 쉬워집니다. 이것을 **Discriminated Union**이라고 해요! (Ch7에서 자세히 다룹니다)

---

## 😱 나노바나나의 실수 노트

> **초보자가 가장 많이 하는 실수: 없는 속성 찾기**

### ❌ 에러 상황
`user.email`을 출력하려고 했는데 에러가 나요!

```ts
interface User {
  name: string;
  age: number;
}
const user: User = { name: "Banana", age: 10 };

console.log(user.email);
// ❌ Error: Property 'email' does not exist on type 'User'.
```

### 🍌 나노바나나의 설명
"설계도(Interface)에 `email`이 없는데 왜 찾으시는 거죠? (정색)"

JavaScript 객체는 마음대로 속성을 추가하거나 읽을 수 있지만, TypeScript는 **설계도에 적힌 것만** 허용해. 혹시 오타가 났는지도 확인해봐! (ex: `name` vs `Name`)

### ✅ 해결 방법

**방법 1: 설계도 수정하기 (필수 속성인 경우)**
```ts
interface User {
  name: string;
  age: number;
  email: string;  // 👈 추가!
}
```

**방법 2: 선택적 속성으로 만들기 (있을 수도, 없을 수도)**
```ts
interface User {
  name: string;
  email?: string; // 👈 물음표? 추가
}
```
이제 `user.email`을 읽으면 `string | undefined`가 될 거야!

---

## 📝 요약

![Type Warehouse](/illustrations/cheat-ch04-warehouse.png)

*   **변수**는 물건을 담는 상자, **타입**은 상자에 붙이는 **라벨**입니다.
*   창고(코드)가 커질수록 이 라벨이 물건을 찾는 유일한 단서가 됩니다. 정리정돈의 힘!