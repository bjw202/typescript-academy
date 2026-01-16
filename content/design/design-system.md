# 디자인 시스템

> **원본 문서**: `structure.md` 에서 추출
> **목적**: shadcn 기반 디자인 시스템 정의

---

## 🎨 Color Palette

### Primary Colors
```css
/* Blue */
--primary-50: #eff6ff;
--primary-100: #dbeafe;
--primary-200: #bfdbfe;
--primary-300: #93c5fd;
--primary-400: #60a5fa;
--primary-500: #3b82f6;  /* Main */
--primary-600: #2563eb;
--primary-700: #1d4ed8;
--primary-800: #1e40af;
--primary-900: #1e3a8a;
```

### Accent Colors
```css
/* Purple */
--accent-50: #faf5ff;
--accent-100: #f3e8ff;
--accent-200: #e9d5ff;
--accent-300: #d8b4fe;
--accent-400: #c084fc;
--accent-500: #a855f7;  /* Main */
--accent-600: #9333ea;
--accent-700: #7e22ce;
--accent-800: #6b21a8;
--accent-900: #581c87;
```

### Banana (Brand) Colors
```css
/* Yellow */
--banana-50: #fefce8;
--banana-100: #fef9c3;
--banana-200: #fef08a;
--banana-300: #fde047;
--banana-400: #facc15;
--banana-500: #eab308;  /* Main */
--banana-600: #ca8a04;
--banana-700: #a16207;
--banana-800: #854d0e;
--banana-900: #713f12;
```

### Semantic Colors
```css
/* Status */
--success: #22c55e;
--error: #ef4444;
--warning: #f97316;
--info: #0ea5e9;
```

---

## 📝 Typography

### Font Family
```css
/* Headings & Body */
font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Code */
font-family: 'Fira Code', 'JetBrains Mono', monospace;
```

### Font Sizes
```css
/* Headings */
--text-h1: 3rem;      /* 48px - bold */
--text-h2: 2.25rem;   /* 36px - bold */
--text-h3: 1.875rem;  /* 30px - semibold */
--text-h4: 1.5rem;    /* 24px - semibold */

/* Body */
--text-lg: 1.125rem;  /* 18px */
--text-base: 1rem;    /* 16px */
--text-sm: 0.875rem;  /* 14px */
--text-xs: 0.75rem;   /* 12px */

/* Code */
--text-code: 0.875rem; /* 14px */
```

### Line Heights
```css
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
```

---

## 📐 Spacing System

```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
```

---

## 🔲 Components

### Cards
```css
/* 기본 카드 */
.card {
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: box-shadow 0.2s ease;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
}
```

### Buttons
```css
/* Primary */
.btn-primary {
  background: var(--primary-500);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
}

/* Secondary */
.btn-secondary {
  background: transparent;
  border: 1px solid var(--primary-500);
  color: var(--primary-500);
}
```

### Code Blocks
```css
.code-block {
  background: #1e1e1e;  /* VSCode Dark */
  border-radius: 8px;
  font-family: 'Fira Code', monospace;
  font-size: 14px;
  
  .copy-button {
    position: absolute;
    top: 8px;
    right: 8px;
  }
}
```

### Tooltips
```css
.tooltip {
  background: #18181b;
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 12px;
  animation: fadeIn 0.15s ease;
}
```

### Progress Bar
```css
.progress-bar {
  height: 8px;
  background: var(--primary-100);
  border-radius: 4px;
  
  .progress-fill {
    background: var(--primary-500);
    transition: width 0.3s ease;
  }
}
```

### Alerts
```css
.alert-success { border-left: 4px solid var(--success); }
.alert-error { border-left: 4px solid var(--error); }
.alert-warning { border-left: 4px solid var(--warning); }
.alert-info { border-left: 4px solid var(--info); }
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile First */
--breakpoint-sm: 640px;   /* Tablet portrait */
--breakpoint-md: 768px;   /* Tablet landscape */
--breakpoint-lg: 1024px;  /* Desktop */
--breakpoint-xl: 1280px;  /* Large desktop */
--breakpoint-2xl: 1536px; /* Extra large */
```

### Layout Rules
```
Mobile (0 ~ 639px):
- 사이드바 숨김 (햄버거 메뉴)
- 1단 레이아웃
- 코드 에디터 세로 스크롤
- 간소화된 다이어그램

Tablet (640px ~ 1023px):
- 토글 사이드바
- 1~2단 레이아웃
- 터치 최적화

Desktop (1024px ~ 1279px):
- 고정 사이드바
- 2~3단 레이아웃
- 호버 효과

Large (1280px+):
- 좌측 + 우측 사이드바
- 3단 레이아웃
- 최대 너비 제한 (1536px)
```

---

## 🌙 Dark Mode

```css
/* Dark Mode Variables */
:root[data-theme="dark"] {
  --bg-primary: #18181b;
  --bg-secondary: #27272a;
  --text-primary: #fafafa;
  --text-secondary: #a1a1aa;
  --border-color: #3f3f46;
}
```

---

## 🎭 Animations

```css
/* Transitions */
--transition-fast: 0.15s ease;
--transition-normal: 0.2s ease;
--transition-slow: 0.3s ease;

/* Keyframes */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}
```
