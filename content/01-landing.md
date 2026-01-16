# TypeScript Academy - 프로젝트 개요 및 홈페이지

> **원본 문서**: `structure.md` 에서 추출
> **목적**: 홈페이지(랜딩) 구성 요소 정의

---

## 🎯 프로젝트 핵심 컨셉

**"타입은 약속이다"** - 전체 사이트를 관통하는 메타포

TypeScript를 "제약"이 아닌 "약속"으로 이해시키는 것이 핵심입니다. 
- 약속을 지키면 → 안전한 코드
- 약속을 어기면 → 컴파일러가 미리 알려줌

---

## 📐 전체 사이트 구조

```
홈페이지 (랜딩)
    ↓
9개 챕터 (순차 학습)
    ↓
실습 플레이그라운드
```

### 네비게이션 플로우
1. **좌측 사이드바**: 전체 목차 (항상 고정)
2. **상단 헤더**: 다크모드, 검색, 진행률
3. **하단 네비게이션**: 이전/다음 챕터 버튼
4. **우측 사이드바** (desktop): 현재 페이지 내 목차

---

## 🏠 홈페이지 (랜딩) 구성

### Hero Section
```
[대형 타이틀]
TypeScript를 
제대로 이해하는 방법

[서브 카피]
추상적인 타입 시스템을
시각화와 실습으로 완전히 정복하세요

[CTA 버튼]
학습 시작하기 →
```

### 나노바나나 히어로 일러스트 디렉션
```
중앙에 큰 🍌(JavaScript)가 있고
그 주위를 투명한 보호막(TypeScript)이 감싸는 이미지

JavaScript 바나나 위에 작은 버그들(🐛)이 붙어있고
TypeScript 보호막이 이 버그들을 막아내는 모습

애니메이션: 버그가 다가오면 보호막이 반짝이며 튕겨냄
```

### 3가지 핵심 가치 제안 (아이콘 + 텍스트)

**1. 시각적 학습**
- 아이콘: 🎨 팔레트 + 🍌
- 텍스트: "추상적인 타입을 눈으로 보고 이해하세요"

**2. 실전 중심**
- 아이콘: 💼 서류가방 + ⚛️ React 로고
- 텍스트: "React, Next.js 실무 패턴까지 한 번에"

**3. 인터랙티브 실습**
- 아이콘: ⚡ 번개 + 💻 코드
- 텍스트: "실시간 타입 체크로 즉시 피드백"

### 챕터 미리보기 카드 (9개)
각 카드 구성:
- 챕터 번호 + 제목
- 1줄 설명
- 예상 소요 시간
- 난이도 표시 (●○○○○)
- 썸네일 이미지 (나노바나나 스타일)

---

## 🎓 학습 추천 경로

### 홈페이지에 표시될 학습 경로

**초보자 (1-2주)**
```
1주차: 기초 다지기
✓ Chapter 1: Why TypeScript
✓ Chapter 2: How It Works
✓ Chapter 3: Dev Environment
✓ Chapter 4: Basic Types

2주차: 실전 준비
✓ Chapter 5: Intermediate Concepts
✓ Chapter 7: Common Patterns (일부)
```

**중급자 (1주)**
```
핵심만 빠르게:
✓ Chapter 5: Intermediate Concepts
✓ Chapter 6: Advanced Patterns
✓ Chapter 7: Common Patterns
✓ Chapter 8 or 9: React/Next.js
```

**고급자 (2-3일)**
```
고급 패턴 집중:
✓ Chapter 6: Advanced Patterns
✓ Chapter 7: Common Patterns
✓ 실전 프로젝트 적용
```
