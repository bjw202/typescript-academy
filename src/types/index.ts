// TypeScript Academy 타입 정의

export interface Chapter {
  id: string;
  number: number;
  title: string;
  titleKo: string;
  slug: string;
  description: string;
  duration: string; // e.g., "30분"
  difficulty: 1 | 2 | 3 | 4 | 5;
  sections: Section[];
}

export interface Section {
  id: string;
  title: string;
  slug: string;
}

export interface Progress {
  chaptersCompleted: string[];
  currentChapter: string | null;
  badges: Badge[];
  totalTime: number; // minutes
  lastVisit: string; // ISO date
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  earnedAt: string;
}

export interface Bookmark {
  id: string;
  chapterId: string;
  sectionId?: string;
  note?: string;
  createdAt: string;
}

// 챕터 데이터
export const chapters: Chapter[] = [
  {
    id: "ch01",
    number: 1,
    title: "Why TypeScript?",
    titleKo: "왜 TypeScript인가?",
    slug: "why-typescript",
    description: "TypeScript가 필요한 이유와 JavaScript의 한계를 이해합니다",
    duration: "30분",
    difficulty: 1,
    sections: [
      { id: "1-1", title: "JavaScript의 자유와 혼돈", slug: "js-freedom" },
      { id: "1-2", title: "타입 에러의 비용", slug: "cost-of-type-errors" },
      { id: "1-3", title: "TypeScript가 해결하는 것들", slug: "what-ts-solves" },
      { id: "1-4", title: "언제 TypeScript를 써야 할까?", slug: "when-to-use" },
    ],
  },
  {
    id: "ch02",
    number: 2,
    title: "How TypeScript Works",
    titleKo: "TypeScript 작동 원리",
    slug: "how-typescript-works",
    description: "컴파일 과정과 타입 시스템의 동작 방식을 이해합니다",
    duration: "40분",
    difficulty: 2,
    sections: [
      { id: "2-1", title: "컴파일? 트랜스파일?", slug: "compile-vs-transpile" },
      { id: "2-2", title: "타입은 런타임에 사라진다", slug: "types-at-runtime" },
      { id: "2-3", title: "TSC의 두 가지 역할", slug: "tsc-roles" },
      { id: "2-4", title: "tsconfig.json의 역할", slug: "tsconfig" },
    ],
  },
  {
    id: "ch03",
    number: 3,
    title: "Development Environment",
    titleKo: "개발 환경 설정",
    slug: "development-environment",
    description: "TypeScript 프로젝트를 시작하기 위한 환경을 구축합니다",
    duration: "30분",
    difficulty: 2,
    sections: [
      { id: "3-1", title: "프로젝트 초기화", slug: "project-init" },
      { id: "3-2", title: "tsconfig.json 완전 정복", slug: "tsconfig-deep-dive" },
      { id: "3-3", title: "IDE 설정 (VSCode)", slug: "ide-setup" },
      { id: "3-4", title: "린팅과 포매팅", slug: "linting-formatting" },
    ],
  },
  {
    id: "ch04",
    number: 4,
    title: "Basic Types",
    titleKo: "기초 문법",
    slug: "basic-types",
    description: "TypeScript의 기본 타입을 완벽히 이해합니다",
    duration: "45분",
    difficulty: 2,
    sections: [
      { id: "4-1", title: "Primitive Types (원시 타입)", slug: "primitive-types" },
      { id: "4-2", title: "Array & Tuple", slug: "array-tuple" },
      { id: "4-3", title: "Object & Interface", slug: "object-interface" },
      { id: "4-4", title: "Function Types", slug: "function-types" },
      { id: "4-5", title: "Union & Intersection", slug: "union-intersection" },
    ],
  },
  {
    id: "ch05",
    number: 5,
    title: "Intermediate Concepts",
    titleKo: "중급 문법",
    slug: "intermediate-concepts",
    description: "타입 시스템의 진짜 힘을 발휘하는 중급 개념을 마스터합니다",
    duration: "60분",
    difficulty: 3,
    sections: [
      { id: "5-1", title: "Generics - 타입의 변수", slug: "generics" },
      { id: "5-2", title: "Generic Constraints", slug: "generic-constraints" },
      { id: "5-3", title: "Type Guards & Narrowing", slug: "type-guards" },
      { id: "5-4", title: "Literal Types", slug: "literal-types" },
      { id: "5-5", title: "Type Assertions", slug: "type-assertions" },
    ],
  },
  {
    id: "ch06",
    number: 6,
    title: "Advanced Patterns",
    titleKo: "고급 문법",
    slug: "advanced-patterns",
    description: "TypeScript의 고급 기능으로 강력한 타입 시스템을 구축합니다",
    duration: "60분",
    difficulty: 4,
    sections: [
      { id: "6-1", title: "Utility Types", slug: "utility-types" },
      { id: "6-2", title: "Conditional Types", slug: "conditional-types" },
      { id: "6-3", title: "Mapped Types", slug: "mapped-types" },
      { id: "6-4", title: "Template Literal Types", slug: "template-literal-types" },
    ],
  },
  {
    id: "ch07",
    number: 7,
    title: "Common Patterns",
    titleKo: "실무 패턴",
    slug: "common-patterns",
    description: "실제 프로젝트에서 자주 사용하는 TypeScript 패턴을 배웁니다",
    duration: "50분",
    difficulty: 3,
    sections: [
      { id: "7-1", title: "API Response 타입 정의", slug: "api-response" },
      { id: "7-2", title: "Error Handling Pattern", slug: "error-handling" },
      { id: "7-3", title: "State Management Types", slug: "state-management" },
    ],
  },
  {
    id: "ch08",
    number: 8,
    title: "React with TypeScript",
    titleKo: "React에서 TypeScript 사용하기",
    slug: "react-with-typescript",
    description: "React에서 TypeScript를 완벽하게 사용하는 방법을 배웁니다",
    duration: "60분",
    difficulty: 4,
    sections: [
      { id: "8-1", title: "Component Props 타입", slug: "component-props" },
      { id: "8-2", title: "Hooks 타이핑", slug: "hooks-typing" },
      { id: "8-3", title: "Event Handling", slug: "event-handling" },
    ],
  },
  {
    id: "ch09",
    number: 9,
    title: "Next.js with TypeScript",
    titleKo: "Next.js에서 TypeScript 사용하기",
    slug: "nextjs-with-typescript",
    description: "Next.js에서 TypeScript의 모든 기능을 활용하는 방법을 배웁니다",
    duration: "60분",
    difficulty: 5,
    sections: [
      { id: "9-1", title: "Page & API Routes", slug: "page-api-routes" },
      { id: "9-2", title: "Server Components와 Client Components", slug: "server-client-components" },
      { id: "9-3", title: "Metadata 타입", slug: "metadata-types" },
      { id: "9-4", title: "Middleware 타입", slug: "middleware-types" },
    ],
  },
];

// 난이도 별 표시
export const getDifficultyDots = (level: number): string => {
  return "●".repeat(level) + "○".repeat(5 - level);
};
