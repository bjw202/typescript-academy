## 학습 목표
React에서 TypeScript를 완벽하게 사용하기

---

## 8.1 Component Props 타입 {#component-props}

React 컴포넌트에서 Props의 타입을 정의하는 방법을 알아봅시다.

### 🧱 레고 조립 설명서
![레고 조립 나노바나나](/illustrations/illust-08-lego-assembly.png)

Props 타입은 레고의 **조립 설명서**와 같습니다.

"이 블록(컴포넌트)에는 빨간 2x4 블록(label: string)과 파란 1x2 블록(onClick: function)이 필요합니다."

```tsx
interface 레고_버튼 {
  color: "red" | "blue" | "green";  // 필수 블록
  size?: "small" | "large";          // 선택 블록
  onClick: () => void;               // 필수 커넥터
}
```

설명서(타입)가 있으면:
- ✅ 잘못된 블록을 끼우려 하면 **바로 경고**
- ✅ 어떤 블록이 필요한지 **미리 파악**
- ✅ 다른 사람이 조립해도 **같은 결과**

### 기본 패턴

```tsx
// Props 인터페이스 정의
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

// 함수 컴포넌트
function Button({ label, onClick, variant = "primary", disabled }: ButtonProps) {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`btn-${variant}`}
    >
      {label}
    </button>
  );
}
```

> 💡 **왜 Props를 타입으로?**
> 
> - 컴포넌트를 사용하는 사람이 뭘 넣어야 하는지 **즉시 파악**
> - 필수/선택 속성을 **명확히 구분**
> - 잘못된 props를 넘기면 **컴파일 에러** (런타임 전에 발견!)

### Children Props

`children`을 받는 컴포넌트는 `React.ReactNode` 타입을 사용합니다.

```tsx
interface CardProps {
  title: string;
  children: React.ReactNode;
}

function Card({ title, children }: CardProps) {
  return (
    <div className="card">
      <h2>{title}</h2>
      {children}
    </div>
  );
}
```

> 🤔 **왜 `children: string`이 아니라 `ReactNode`?**
> 
> ```tsx
> <Card title="프로필">
>   <span>텍스트만 오면</span>      {/* string */}
>   <Button>버튼도 올 수 있고</Button>  {/* JSX.Element */}
>   {isLoading && <Spinner />}     {/* 조건부 렌더링 */}
> </Card>
> ```
> 
> `ReactNode`는 "React가 렌더링할 수 있는 **모든 것**"입니다.
> 마치 레고 판 위에 뭐든 올려놓을 수 있는 것처럼!

### 이벤트 핸들러 Props

```tsx
interface FormProps {
  onSubmit: (data: FormData) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
```

> 💡 **이벤트 타입 외우기 팁**
> 
> `React.[이벤트종류]Event<HTML[요소]Element>`
> 
> - 클릭 → `MouseEvent`
> - 입력 → `ChangeEvent`
> - 제출 → `FormEvent`
> - 키보드 → `KeyboardEvent`

### 제네릭 컴포넌트

재사용 가능한 리스트 컴포넌트를 만들 때 유용합니다.

```tsx
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

// 사용 - 타입이 자동 추론됨
<List
  items={[{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]}
  renderItem={(user) => <span>{user.name}</span>}
/>
```

> 🎯 **언제 제네릭 컴포넌트?**
> 
> - 테이블, 리스트, 셀렉트 등 **범용** UI 컴포넌트
> - 데이터 타입에 관계없이 **같은 레이아웃**을 적용할 때

---

## 8.2 Hooks 타이핑 {#hooks-typing}

### 🎣 낚시 바늘 사이즈

Hooks는 낚시와 비슷합니다. 어떤 물고기(타입)를 잡느냐에 따라 바늘(제네릭)을 바꿔야 합니다.

```tsx
// 🐟 작은 물고기: 타입 추론으로 충분
const [count, setCount] = useState(0);

// 🦈 큰 물고기: 명시적 타입 필요
const [user, setUser] = useState<User | null>(null);
```

### useState

```tsx
// 타입 자동 추론
const [count, setCount] = useState(0);     // number
const [name, setName] = useState("");      // string

// 명시적 타입 지정 (null 허용 시)
const [user, setUser] = useState<User | null>(null);

// 초기값이 없을 때
const [data, setData] = useState<Data>();  // Data | undefined
```

> 🤔 **"null 초기값일 때 왜 명시해야 해요?"**
> 
> ```tsx
> // ❌ 이러면 타입이 never가 됨
> const [user, setUser] = useState(null);
> // setUser({ name: "Alice" }); // 에러!
> 
> // ✅ 나중에 User가 올 거라고 알려줌
> const [user, setUser] = useState<User | null>(null);
> // setUser({ name: "Alice" }); // OK!
> ```
> 
> TypeScript: "처음엔 null이지만, 나중에 뭐가 올지 알려줘!"
> 개발자: "User 타입이 올 거야"
> TypeScript: "알겠어, 기다리고 있을게 🔮"

### useRef

```tsx
// DOM 요소 참조
const inputRef = useRef<HTMLInputElement>(null);
// 사용: inputRef.current?.focus();

// 일반 값 저장 (렌더링에 영향 없는 값)
const counterRef = useRef<number>(0);
```

> 💡 **`useRef` 두 가지 용도**
> 
> 1. **DOM 참조**: `<input ref={inputRef} />` → 요소에 직접 접근
> 2. **값 저장**: 렌더링 사이에 값을 유지 (useState와 달리 변경해도 리렌더 안 함)

### useReducer

Discriminated Union으로 액션 타입을 정의하면 타입 안전성이 보장됩니다.

```tsx
interface State {
  count: number;
  error: string | null;
}

type Action =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "SET_ERROR"; payload: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      return { ...state, count: state.count - 1 };
    case "SET_ERROR":
      return { ...state, error: action.payload };
  }
}

const [state, dispatch] = useReducer(reducer, { count: 0, error: null });
```

> 🎯 **왜 Discriminated Union?**
> 
> `action.type`에 따라 `payload`의 타입이 **자동으로 결정**됩니다!
> 
> ```tsx
> dispatch({ type: "INCREMENT" });              // ✅ payload 없어도 OK
> dispatch({ type: "SET_ERROR", payload: "!" }); // ✅ payload 필수
> dispatch({ type: "SET_ERROR" });               // ❌ payload 없으면 에러
> ```

### useContext

Context 사용 시 `undefined` 체크를 위한 커스텀 훅을 만드는 것이 좋습니다.

```tsx
interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom Hook으로 안전하게 사용
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
```

> 💡 **왜 커스텀 훅?**
> 
> Provider 없이 `useContext`를 호출하면 `undefined`가 반환됩니다.
> 매번 체크하기 귀찮으니, 한 번에 처리하는 훅을 만드는 거죠!

### Custom Hooks

```tsx
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const; // ← tuple로 반환
}

// 사용
const [name, setName] = useLocalStorage<string>("name", "Guest");
```

> 🎯 **`as const`가 뭐예요?**
> 
> ```tsx
> // 없으면: (string | Dispatch<...>)[]  ← 배열
> // 있으면: [string, Dispatch<...>]     ← 튜플
> ```
> 
> `as const`가 있어야 `useState`처럼 `[값, 설정함수]` 형태로 쓸 수 있어요!

---

## 8.3 Event Handling {#event-handling}

### 🎹 이벤트 타입 = 악기 + 연주자

이벤트 타입은 **어떤 악기(이벤트)를 누가(요소) 연주하는지** 명시하는 것입니다.

- `MouseEvent<HTMLButtonElement>` = 버튼에서 클릭 연주 🖱️
- `ChangeEvent<HTMLInputElement>` = 인풋에서 입력 연주 ⌨️

### 자주 쓰는 이벤트 타입

| 이벤트 | 타입 | 예시 상황 |
|:-------|:-----|:----------|
| Click | `React.MouseEvent<HTMLButtonElement>` | 버튼 클릭 |
| Change (Input) | `React.ChangeEvent<HTMLInputElement>` | 텍스트 입력 |
| Change (Select) | `React.ChangeEvent<HTMLSelectElement>` | 드롭다운 선택 |
| Submit (Form) | `React.FormEvent<HTMLFormElement>` | 폼 제출 |
| Keyboard | `React.KeyboardEvent<HTMLInputElement>` | 엔터 키 감지 |

### 실전 예제

```tsx
function Form() {
  const [email, setEmail] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted:", email);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log("Enter pressed!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### 팁: Event 타입 찾기

1. **VSCode 호버**: 이벤트 핸들러에 마우스를 올려 타입을 확인합니다
2. **에러 메시지**: 일단 작성하고 에러 메시지에서 올바른 타입을 찾습니다
3. **인라인 함수**: 먼저 인라인으로 작성하면 타입이 자동 추론됩니다

```tsx
// 1️⃣ 먼저 인라인으로 작성 (타입 자동 추론)
<input onChange={(e) => setEmail(e.target.value)} />

// 2️⃣ 추론된 타입을 확인 후 별도 함수로 분리
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setEmail(e.target.value);
};
```

> 🎯 **프로 팁**: 외울 필요 없어요!
> 
> 인라인으로 먼저 작성 → VSCode가 타입 추론 → 복사해서 함수로 분리
> 
> 10번 하다 보면 자연스럽게 외워집니다! 😊

---

## 😱 나노바나나의 실수 노트

> **초보자가 가장 많이 하는 실수: 객체 그냥 렌더링하기**

### ❌ 에러 상황
데이터를 화면에 뿌려주려고 했는데 화면이 하얗게 되고 에러가...

```tsx
function UserProfile({ user }: { user: User }) {
  return <div>{user}</div>; 
  // ❌ Error: Objects are not valid as a React child...
}
```

### 🍌 나노바나나의 설명
"React는 객체(`{ name: 'Kim' }`)를 통째로 보여주는 능력이 없어! **문자열이나 숫자**만 보여줄 수 있어."

레고 판 위에 설명서를 통째로 올려놓으면 조립이 안 되는 것과 같아. 설명서 내용을 읽어서 블록을 조립해야지!

### ✅ 해결 방법

**객체의 특정 속성을 보여줘!**
```tsx
return <div>{user.name}</div>; // ✅ OK (문자열)
```

**디버깅용이라면 JSON으로 바꿔서 보여줘!**
```tsx
return <pre>{JSON.stringify(user, null, 2)}</pre>; // ✅ OK (문자열 변환)
```

---

## 📝 요약

![React Props Blueprint](/illustrations/cheat-ch08-blueprint.png)

*   **Props**는 컴포넌트 조립을 위한 **설명서**입니다.
*   설명서(타입)가 정확해야 동료가 당신의 컴포넌트를 부수지 않고 잘 쓸 수 있어요! 튼튼한 서비스의 기초입니다.
