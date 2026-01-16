## 학습 목표
Next.js에서 TypeScript의 모든 기능 활용

---

## 9.1 Page & API Routes {#page-api-routes}

### 🏠 아파트 주소 시스템

Next.js 라우팅은 **아파트 주소**와 같습니다.

```
/app                    → 아파트 단지
/app/about             → 101동
/app/posts             → 102동
/app/posts/[id]        → 102동 [호수]호
/app/posts/[id]/comments → 102동 [호수]호 거실
```

`[id]`는 **변수**입니다. "102동 몇 호인지는 나중에 알려줄게"라는 의미죠.

### App Router (Next.js 13+)

```tsx
// app/page.tsx
export default function HomePage() {
  return <h1>Home</h1>;
}
```

**동적 라우트**

```tsx
// app/posts/[id]/page.tsx
interface PageProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function PostPage({ params, searchParams }: PageProps) {
  const post = await getPost(params.id);
  return <article>{post.title}</article>;
}
```

> 🤔 **왜 params.id는 항상 string?**
> 
> URL은 결국 **문자열**입니다. `/posts/123`의 123도 문자열!
> 
> ```tsx
> // 숫자로 쓰고 싶다면 변환 필요
> const postId = Number(params.id);
> 
> // 또는 zod로 안전하게 파싱
> const { id } = PostParamsSchema.parse(params);
> ```
> 
> 브라우저 주소창에 타입을 입력할 수 없듯이, 모든 URL 파라미터는 문자열로 시작합니다!

### API Routes

```ts
// app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";

interface User {
  id: string;
  name: string;
}

export async function GET(request: NextRequest) {
  const users: User[] = await getUsers();
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const body: User = await request.json();
  const newUser = await createUser(body);
  return NextResponse.json(newUser, { status: 201 });
}
```

> 💡 **`NextRequest` vs `Request`**
> 
> `NextRequest`는 표준 `Request`를 확장한 것입니다.
> 추가 기능: `cookies`, `nextUrl` 등 Next.js 전용 헬퍼!

### Server Actions (Next.js 14+)

```ts
// app/actions.ts
"use server";

interface UserFormData {
  name: string;
  email: string;
}

export async function createUser(data: UserFormData) {
  const user = await db.users.create({ data });
  return { success: true, user };
}
```

> 🎯 **Server Actions의 장점**
> 
> - API 라우트 없이 **서버 로직 직접 호출**
> - 폼 제출이 **자동으로 서버 액션**과 연결
> - 타입 안전성이 **클라이언트까지 전파**

### 환경변수 타입 안전성

`env.d.ts` 파일을 생성하면 환경변수에 타입 체크와 자동완성이 적용됩니다.

```ts
// env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    API_KEY: string;
    NEXT_PUBLIC_APP_URL: string;
  }
}

// 이제 자동완성 + 타입 체크!
const dbUrl = process.env.DATABASE_URL; // ✅ string으로 추론
```

> 💡 **NEXT_PUBLIC_ 접두사**
> 
> `NEXT_PUBLIC_`로 시작하는 환경변수만 **클라이언트에 노출**됩니다.
> API 키 같은 민감 정보는 절대 이 접두사를 붙이지 마세요! 🔐

---

## 9.2 Server Components와 Client Components {#server-client-components}

### 🎭 백스테이지 vs 무대
![백스테이지 vs 무대 나노바나나](/illustrations/illust-09-stage.png)

**Server Component** = 백스테이지
- 관객(사용자)에게 안 보임
- 무거운 장비(DB) 사용 가능
- 조용히 준비 작업

**Client Component** = 무대 위
- 관객과 상호작용
- 조명, 음향 (이벤트) 처리
- 관객이 박수치면 반응 (클릭 이벤트)

### Server Components

App Router에서 기본적으로 모든 컴포넌트는 Server Component입니다.

```tsx
// async/await 사용 가능, DB 직접 접근 가능
async function ServerComponent() {
  const data = await fetchFromDB(); // 🎬 백스테이지에서 준비
  return <div>{data.title}</div>;
}
```

> 💡 **Server Component의 장점**
> 
> - 번들 크기 감소 (서버에서만 실행)
> - DB 직접 접근 (API 라우트 필요 없음)
> - async/await 바로 사용 가능

### Client Components

상호작용이 필요한 경우 `"use client"` 지시어를 사용합니다.

```tsx
"use client";

import { useState } from "react";

function ClientComponent() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

> 🤔 **언제 Client Component?**
> 
> - `useState`, `useEffect` 등 **hooks 사용**
> - `onClick`, `onChange` 등 **이벤트 핸들러**
> - 브라우저 전용 API (`localStorage`, `window`)

### Props 전달 시 주의사항

Server Component에서 Client Component로 Props를 전달할 때는 **직렬화 가능한 값**만 전달할 수 있습니다.

```ts
interface ClientProps {
  initialData: User;      // ✅ 직렬화 가능 (객체)
  onSave: () => void;     // ❌ 함수는 전달 불가!
}
```

> ⚠️ **왜 함수를 props로 못 넘겨요?**
> 
> 백스테이지(서버)에서 무대(클라이언트)로는 **소품(데이터)**만 넘길 수 있습니다.
> 배우(함수)는 이미 무대에 있어야 해요!
> 
> ```tsx
> // ❌ 배우(함수)를 소품처럼 던지기
> <ClientButton onClick={() => serverAction()} />
> 
> // ✅ 소품(데이터)만 보내고, 함수는 Client에서 정의
> <ClientButton productId={123} />
> ```

---

## 9.3 Metadata 타입 {#metadata-types}

### 정적 Metadata

```tsx
// app/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TypeScript Academy",
  description: "Learn TypeScript the right way",
  openGraph: {
    title: "TypeScript Academy",
    description: "Learn TypeScript the right way",
    images: ["/og-image.png"],
  },
};
```

> 💡 **Metadata의 효과**
> 
> - SEO 최적화 (검색엔진이 페이지 이해)
> - 소셜 공유 미리보기 (OpenGraph)
> - 브라우저 탭 제목

### 동적 Metadata

페이지별로 다른 메타데이터가 필요할 때 사용합니다.

```tsx
// app/posts/[id]/page.tsx
import type { Metadata, ResolvingMetadata } from "next";

interface Props {
  params: { id: string };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await getPost(params.id);
  
  return {
    title: post.title,
    description: post.excerpt,
  };
}
```

> 🎯 **실전 활용**
> 
> - 블로그: 각 글의 제목을 타이틀로
> - 상품: 상품명과 가격을 메타데이터로
> - 프로필: 사용자 이름을 포함한 제목

---

## 9.4 Middleware 타입 {#middleware-types}

Middleware에서 인증 체크나 리다이렉션을 타입 안전하게 처리할 수 있습니다.

### 🚧 고속도로 톨게이트

Middleware는 **고속도로 톨게이트**와 같습니다.

모든 차량(요청)이 목적지(페이지)에 가기 전에 통과해야 하는 곳이에요:
- 통행권(인증 토큰) 확인
- 목적지 변경(리다이렉트)
- 출입 금지(접근 차단)

```ts
// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  
  if (!token) {
    // 🚧 통행권 없으면 입구로 돌려보내기
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
  // ✅ 통과!
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/protected/:path*"],
};
```

`NextRequest`와 `NextResponse` 타입을 사용하면 Cookie, Headers 등의 API에 대한 자동완성과 타입 체크를 받을 수 있습니다.

> 💡 **matcher 패턴**
> 
> - `/dashboard/:path*` → `/dashboard`와 그 하위 모든 경로
> - `/((?!api|_next).*)` → api와 _next를 제외한 모든 경로
> 
> 정규식처럼 보이지만 Next.js만의 패턴 문법입니다!

> 🎯 **Middleware 활용 사례**
> 
> - **인증**: 로그인 안 했으면 로그인 페이지로
> - **리다이렉트**: 옛 URL을 새 URL로
> - **A/B 테스트**: 쿠키 기반으로 다른 페이지 제공
> - **국제화**: Accept-Language 헤더로 언어 감지

---

## 😱 나노바나나의 실수 노트

> **초보자가 가장 많이 하는 실수: 함수를 클라이언트로 보내기**

### ❌ 에러 상황
Server Component에서 Client Component로 함수를 넘겨줬는데...

```tsx
// ServerComponent.tsx
export default function Page() {
  const log = () => console.log("Hi");
  return <ClientButton onClick={log} />;
}
// ❌ Error: Functions cannot be passed directly to Client Components
```

### 🍌 나노바나나의 설명
"백스테이지(서버)에 있는 스태프(함수)를 무대(클라이언트) 위로 던질 수는 없어! **데이터(JSON)**만 보낼 수 있다고!"

서버 컴포넌트에서 클라이언트 컴포넌트로 넘어가는 건 **네트워크 경계**를 넘는 거야. 함수는 직렬화(텍스트로 변환)될 수 없어서 못 넘어가.

### ✅ 해결 방법

**함수는 Client Component 안에서 만들어!** OR **Server Action을 써!**

```tsx
// ClientButton.tsx ("use client")
export default function ClientButton() {
  const log = () => console.log("Hi"); // ✅ 클라이언트에서 만듦
  return <button onClick={log}>Click</button>;
}
```

서버 로직이 필요하면 **Server Action**을 import해서 넘겨주면 돼. 그건 Next.js가 알아서 처리해주거든! 🎩

---

## 📝 요약

![Server vs Client Control Room](/illustrations/cheat-ch09-control-room.png)

*   **Server Component**: 백스테이지(보이지 않는 곳)에서 무거운 작업(DB) 처리.
*   **Client Component**: 무대 위(브라우저)에서 관객과 소통(이벤트).
*   이 두 세계를 구분하는 것이 Next.js의 핵심입니다!