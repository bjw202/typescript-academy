import os
import re

DIR = "/Users/byunjungwon/Dev/antigravity-project/typescirpt-edu/content/chapters"

def process_content(content):
    # 1. Remove Top H1 Header (duplicative)
    content = re.sub(r'^# Chapter.*?\n', '', content)
    
    # 2. Remove Content Metadata Blockquotes (usually at start)
    # Removing consecutive blockquotes at the beginning of the file
    content = re.sub(r'^\s*>(?: .*)?\n', '', content, flags=re.MULTILINE)

    # 2.5 Remove leading '---' if it became the first line
    # This prevents it from being interpreted as an open frontmatter block
    content = re.sub(r'^\s*---\s*\n', '', content, count=1)

    
    # 3. Unwrap "Content Direction" and similar spec blocks
    # Pattern: ### Header \n ``` \n content \n ```
    # Only checks for empty-lang code blocks: ```\n
    
    def unwrap_match(match):
        header = match.group(1).strip()
        block_content = match.group(2)
        
        # Determine if we keep the header
        if "콘텐츠 디렉션" in header:
            final_header = ""
        else:
            final_header = header + "\n"
            
        # Format the inner content
        lines = block_content.split('\n')
        new_lines = []
        for line in lines:
            # [Tag] -> #### Tag
            # But avoid [ ] checkboxes or links [text](url)
            # Placeholder tags usually look like [개념 정리] or [실습 버튼] starting the line
            m_tag = re.match(r'^\s*\[(.*?)\]\s*$', line)
            if m_tag:
                tag_text = m_tag.group(1)
                # Convert to stylized text or header
                # If it's a structural tag, make it a sub-header
                new_lines.append(f"#### {tag_text}")
            else:
                new_lines.append(line)
        
        formatted_content = "\n".join(new_lines)
        
        # Escape MDX special characters that cause Acorn errors
        # Specifically { and } which MDX treats as JS expressions
        # We only escape them if they are not part of a valid MDX component or expression we INTEND to keep.
        # But this script is unwrapping "Content Direction" which should be text.
        # So escaping is generally safe here.
        formatted_content = formatted_content.replace("{", "\\{").replace("}", "\\}")
        
        return f"{final_header}\n{formatted_content}\n"

    # Regex to capture: (### Header) spacing ``` spacing (content) spacing ```
    # Note: explicit [^\n]+ for header to avoid crossing lines
    pattern = r'(### [^\n]+)\s+```\s*?\n([\s\S]*?)\n```'
    
    new_content = re.sub(pattern, unwrap_match, content)
    
    # 4. Clean up excessive newlines created
    new_content = re.sub(r'\n{3,}', '\n\n', new_content)
    
    return new_content.strip() + "\n"

def main():
    files = [f for f in os.listdir(DIR) if f.startswith('ch') and f.endswith('.md')]
    print(f"Found {len(files)} chapters.")
    
    for fname in files:
        # Process ALL chapters including Ch 1
        path = os.path.join(DIR, fname)
        print(f"Processing {fname}...")
        
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        new_content = process_content(content)
        
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_content)
            
    print("Done.")

if __name__ == "__main__":
    main()
