## 학습 목표
실제 프로젝트에서 자주 사용하는 TypeScript 패턴

---

## 7.1 API Response 타입 정의 {#api-response}

API에서 데이터를 받아올 때, 응답 구조가 명확하지 않으면 여러 문제가 발생합니다:
- `undefined` 에러 빈번
- 자동완성 불가
- 리팩토링 어려움

### 📬 우체국 비유

API 응답은 우체국에서 받는 **등기 우편**과 같습니다.

모든 우편에는 공통 양식이 있죠:
- 보낸 사람 (success: boolean)
- 내용물 (data)
- 오류 시 사유 (error)

```ts
interface 등기우편<T> {
  success: boolean;
  data: T;               // 내용물은 매번 다름
  error?: string;        // 배송 실패 시 사유
  timestamp: Date;       // 발송 시간
}
```

### 패턴 1: 제네릭 응답 구조

```ts
interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

type UserResponse = ApiResponse<User>;

async function getUser(id: string): Promise<UserResponse> {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}
```

### 패턴 2: Discriminated Union

더 타입 안전한 방식입니다. `success` 값에 따라 `data`와 `error`가 명확하게 구분됩니다.

```ts
type ApiResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

// 타입 가드로 안전하게 사용
const result = await getUser("123");
if (result.success) {
  console.log(result.data.name); // ✅ data가 보장됨
} else {
  console.log(result.error); // ✅ error가 보장됨
}
```

> 🎯 **왜 Discriminated Union?**
> 
> 일반 인터페이스의 문제:
> ```ts
> // 이러면 data와 error가 동시에 있을 수 있음 🤔
> interface Bad { success: boolean; data?: User; error?: string; }
> ```
> 
> Discriminated Union의 장점:
> ```ts
> // success가 true면 data 보장, false면 error 보장!
> type Good = 
>   | { success: true; data: User }
>   | { success: false; error: string };
> ```
> 
> 마치 "성공 우편"과 "반송 우편"을 **완전히 다른 양식**으로 처리하는 것!

### 패턴 3: 페이지네이션 응답

```ts
interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

type UserListResponse = PaginatedResponse<User>;
```

> 💡 **실무 팁**: 백엔드와 **타입 정의를 공유**하면 더 좋아요!
> 
> - OpenAPI/Swagger → 타입 자동 생성
> - tRPC → 백엔드-프론트엔드 타입 공유
> - GraphQL Code Generator → 스키마에서 타입 생성

---

## 7.2 Error Handling Pattern {#error-handling}

JavaScript의 Error는 타입 정보가 부족합니다. TypeScript에서 에러를 안전하게 처리하는 방법을 알아봅시다.

### 🎪 서커스 안전망

에러 처리는 서커스의 **안전망**과 같습니다.

줄타기(코드 실행) 중 떨어져도(에러 발생), 안전망(try-catch)이 있으면 괜찮습니다.

하지만 **어디로 어떻게 떨어졌는지** 알아야 제대로 대응할 수 있죠!

```ts
// JavaScript: "떨어졌어요!" (그게 다임)
catch (error) {
  console.log(error); // 뭔지 모름... 🤷
}

// TypeScript + Custom Error: "2m 높이에서 왼쪽으로 떨어졌어요!"
catch (error) {
  if (error instanceof ValidationError) {
    console.log(`${error.field}가 잘못됐어요!`);
  } else if (error instanceof NetworkError) {
    console.log(`서버가 ${error.statusCode}를 반환했어요!`);
  }
}
```

### 패턴 1: Custom Error Classes

```ts
class ValidationError extends Error {
  constructor(
    message: string,
    public field: string
  ) {
    super(message);
    this.name = "ValidationError";
  }
}

class NetworkError extends Error {
  constructor(
    message: string,
    public statusCode: number
  ) {
    super(message);
    this.name = "NetworkError";
  }
}

// 사용: instanceof로 에러 타입 구분
try {
  await validateUser(data);
} catch (error) {
  if (error instanceof ValidationError) {
    console.log(`${error.field} is invalid`);
  } else if (error instanceof NetworkError) {
    console.log(`HTTP ${error.statusCode}`);
  }
}
```

### 패턴 2: Result Type (Rust 스타일)

예외를 던지는 대신, 결과를 명시적으로 반환합니다.

```ts
type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

function divide(a: number, b: number): Result<number> {
  if (b === 0) {
    return { ok: false, error: new Error("Division by zero") };
  }
  return { ok: true, value: a / b };
}

// 사용
const result = divide(10, 2);
if (result.ok) {
  console.log(result.value); // ✅ 타입 안전
} else {
  console.log(result.error.message);
}
```

> 💡 **Result 패턴의 장점**
> 
> - 에러 처리를 **강제**할 수 있음 (잊어버릴 수 없음!)
> - try-catch 없이 **명시적인 흐름**
> - 함수 시그니처만 봐도 **실패 가능성** 파악

### 패턴 3: Type Guard Helper

```ts
function isError(error: unknown): error is Error {
  return error instanceof Error;
}

try {
  throw new Error("Something went wrong");
} catch (error) {
  if (isError(error)) {
    console.log(error.message); // ✅ Error 타입으로 좁혀짐
  }
}
```

> 🤔 **catch의 error가 왜 unknown이에요?**
> 
> TypeScript 4.4부터 `catch`의 `error`는 `unknown`입니다.
> 왜냐하면 **실제로 뭐가 던져질지 모르기 때문**이에요!
> 
> ```ts
> throw "문자열 에러";  // 이것도 던질 수 있음
> throw 404;            // 숫자도 던질 수 있음
> throw { wtf: true };  // 객체도 던질 수 있음
> ```

---

## 7.3 State Management Types {#state-management}

상태 관리 시 타입이 불명확하면 다음 문제가 발생합니다:
- 잘못된 액션 디스패치
- 상태 구조 변경 시 오류
- Reducer에서 타입 에러

### 🎛️ 자판기 버튼

상태 관리는 **자판기**와 같습니다.

- **State**: 자판기 안의 음료 재고
- **Action**: 버튼 (콜라 버튼, 사이다 버튼, 환불 버튼)
- **Reducer**: 버튼을 누르면 재고가 바뀌는 로직

버튼(Action)이 명확하면 잘못 누를 일이 없어요!

### Redux/Zustand 타입 패턴

**State 정의**

```ts
interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  filter: "all" | "active" | "completed";
  loading: boolean;
}
```

**Action 정의 (Discriminated Union)**

```ts
type TodoAction =
  | { type: "ADD_TODO"; payload: { text: string } }
  | { type: "TOGGLE_TODO"; payload: { id: string } }
  | { type: "DELETE_TODO"; payload: { id: string } }
  | { type: "SET_FILTER"; payload: { filter: TodoState["filter"] } };
```

> 💡 **`TodoState["filter"]`가 뭐예요?**
> 
> 인덱스 접근 타입입니다! TodoState의 filter 속성 타입을 가져옵니다.
> 즉, `"all" | "active" | "completed"`와 같아요.
> 
> 이렇게 하면 **한 곳만 수정**해도 모든 곳에 반영됩니다!

**Reducer (타입 안전)**

```ts
function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case "ADD_TODO":
      // action.payload는 자동으로 { text: string }
      return {
        ...state,
        todos: [...state.todos, {
          id: Date.now().toString(),
          text: action.payload.text,
          completed: false
        }]
      };
    
    case "TOGGLE_TODO":
      // action.payload는 자동으로 { id: string }
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    
    // ... 나머지 케이스
  }
}
```

### 상태 관리 흐름

<Mermaid chart={`graph TD
    A["UI Component"] -->|dispatch| B["Action"]
    B -->|type check| C{"Reducer"}
    C -->|ADD_TODO| D["New State 1"]
    C -->|TOGGLE_TODO| E["New State 2"]
    C -->|DELETE_TODO| F["New State 3"]
    D --> G["Updated State"]
    E --> G
    F --> G
    G -->|re-render| A
    
    style B fill:#4ade80
    style C fill:#60a5fa
    style G fill:#a78bfa`} 
/>

Discriminated Union을 사용하면 TypeScript가 각 case 블록에서 올바른 payload 타입을 자동으로 추론합니다.

> 🎯 **Discriminated Union의 마법**
> 
> ```ts
> case "ADD_TODO":
>   action.payload.text;  // ✅ string으로 추론
>   action.payload.id;    // ❌ 에러! ADD_TODO에는 id 없음
> 
> case "TOGGLE_TODO":
>   action.payload.id;    // ✅ string으로 추론
>   action.payload.text;  // ❌ 에러! TOGGLE_TODO에는 text 없음
> ```
> 
> TypeScript가 **case문을 보고** payload 타입을 자동으로 좁혀줍니다! 🔮

---

## 😱 나노바나나의 실수 노트

> **초보자가 가장 많이 하는 실수: API 응답 바로 쓰기**

### ❌ 에러 상황
API에서 받아온 데이터를 바로 썼는데 에러가!?

```ts
const response = await fetch("/api/user");
const data: unknown = await response.json();

console.log(data.name);
// ❌ Error: 'data' is of type 'unknown'.
```

### 🍌 나노바나나의 설명
"TypeScript는 의심이 많아. `unknown`이라고 하면 '이게 폭탄인지 데이터인지 모르니까 건드리지 마!'라고 막는 거야."

안전하게 쓰려면 **"이거 데이터 맞아요!"**라고 검사(Type Guard)를 하거나, **"데이터라고 믿어주세요!"**라고 단언(Assertion)해야 해.

### ✅ 해결 방법

**방법 1: Zod로 검증하기 (Best!)**
```ts
const UserSchema = z.object({ name: z.string() });
const data = UserSchema.parse(await response.json()); // 검증 + 타입 생성
console.log(data.name); // ✅ OK
```

**방법 2: 타입 단언하기 (Quick fix)**
```ts
interface User { name: string }
const data = await response.json() as User; // "나를 믿어!"
console.log(data.name); // ✅ OK (하지만 실제 데이터가 다르면 런타임 에러 펑! 💥)
```
