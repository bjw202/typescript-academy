
import os

PATH = "/Users/byunjungwon/Dev/antigravity-project/typescirpt-edu/content/chapters/ch02-how-typescript-works.md"

def restore_code():
    with open(PATH, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Fix braces (globally unescape them, except maybe in Mermaid?)
    # The Mermaid block is: <Mermaid chart={`...`} />
    # If I unescape \{ -> {, it should be fine inside Mermaid too (Sequence diagram doesn't use { often, and if it does, literal { is good).
    # But wait, Markdown prose \{ renders as {, but inside code block { is {.
    # If I wrap in code block, I want {. 
    # So unescaping \{ -> { is generally correct for restoring content.
    
    content = content.replace(r"\{", "{").replace(r"\}", "}")

    # 2. Restore Code Blocks (Simple string replacement based on known bad patterns)
    
    # TS function example
    bad_ts = """function greet(name: string): string {
    return `Hello, ${name}!`;
}"""
    good_ts = """```ts
function greet(name: string): string {
    return `Hello, ${name}!`;
}
```"""
    content = content.replace(bad_ts, good_ts)

    # JS function example
    bad_js = """function greet(name) {
    return `Hello, ${name}!`;
}"""
    good_js = """```js
function greet(name) {
    return `Hello, ${name}!`;
}
```"""
    content = content.replace(bad_js, good_js)

    # JSON config example
    bad_json = """{
  "compilerOptions": {
    "strict": true,           // 👈 항상 켜세요!
    "target": "ES2020",       // 👈 브라우저 지원 범위
    "module": "ESNext"        // 👈 최신 모듈 문법
  }
}"""
    good_json = """```json
{
  "compilerOptions": {
    "strict": true,           // 👈 항상 켜세요!
    "target": "ES2020",       // 👈 브라우저 지원 범위
    "module": "ESNext"        // 👈 최신 모듈 문법
  }
}
```"""
    content = content.replace(bad_json, good_json)

    # 3. Fix potential template string backtick issues if any
    # The `Hello, ${name}!` might have been messed up?
    # Original: `Hello, ${name}!`
    # If unescaped, it is `Hello, ${name}!`.
    # In Markdown prose, `Hello is text, ${name}!` is text.
    # But wait, if it was inside a code block, backticks are code.
    # I am wrapping it in ```ts, so it should be fine.

    with open(PATH, 'w', encoding='utf-8') as f:
        f.write(content)

    print("Restored code blocks in Ch 2")

if __name__ == "__main__":
    restore_code()
