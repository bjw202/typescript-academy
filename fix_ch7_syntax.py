
import os

PATH = "/Users/byunjungwon/Dev/antigravity-project/typescirpt-edu/content/chapters/ch07-common-patterns.md"

def fix_ch7():
    with open(PATH, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replacements
    
    # 1. getUser function (Lines 32-39)
    # Merging the async function line into the previous block is okay, or making it a new block.
    # Previous block ends at 32: ```.
    # We will remove ``` at 32, and remove ```ts at 34.
    # Wait, line 32 is "```". Line 33 is "async function...". Line 34 "```ts".
    # If I remove 32 and 34, they merge.
    
    # Pattern: ``` \n async function ... \n ```ts
    content = content.replace("```\nasync function getUser(id: string): Promise<UserResponse> {\n```ts", "async function getUser(id: string): Promise<UserResponse> {")
    
    # 2. ApiResult usage (48-50)
    # ```\nif (result.success) {\n```ts
    content = content.replace("```\nif (result.success) {\n```ts", "if (result.success) {")
    
    # 3. try/catch 1 (102-103)
    # try {\n```ts
    # Wait, previous block end?
    # Line 102 `try {` is prose.
    # I should wrap it in ```ts.
    # Preceding line 101 is "부족:". Line 102 "try {".
    content = content.replace("부족:\ntry {\n```ts", "부족:\n```ts\ntry {")
    
    # 4. try/catch 2 (134-136)
    # ```\ntry {\n```ts
    content = content.replace("```\ntry {\n```ts", "try {")
    
    # 5. result.ok (162-164)
    # ```\nif (result.ok) {\n```ts
    content = content.replace("```\nif (result.ok) {\n```ts", "if (result.ok) {")

    # 6. try/catch 3 (178-179)
    # ```\ntry {\n```ts
    content = content.replace("```\ntry {\n```ts", "try {")
    
    # 7. todoReducer (222-224)
    # ```\n): TodoState {\n```ts
    content = content.replace("```\n): TodoState {\n```ts", "): TodoState {")

    with open(PATH, 'w', encoding='utf-8') as f:
        f.write(content)

    print("Fixed Ch 7 syntax")

if __name__ == "__main__":
    fix_ch7()
