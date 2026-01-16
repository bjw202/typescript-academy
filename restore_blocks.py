
import os
import re

DIR = "/Users/byunjungwon/Dev/antigravity-project/typescirpt-edu/content/chapters"

def restore_blocks(content):
    # 1. Unescape braces (Global fix)
    content = content.replace(r"\{", "{").replace(r"\}", "}")
    
    # 2. Heuristic to wrap common code patterns in code blocks
    # We look for continuous blocks of code-like lines.
    
    lines = content.split('\n')
    new_lines = []
    in_code_block = False
    code_buffer = []
    
    # Simple state machine? 
    # Hard to do line-by-line because we stripped context.
    # But content directions usually have clear blocks.
    
    # Better approach: Regex replacement for specific known structures
    # JSON Configs starting with { and ending with }
    # But newlines make regex hard.
    
    # Let's verify commonly used patterns in the chapters.
    # 1. "function ..."
    # 2. "interface ..."
    # 3. "type ..."
    # 4. "const ..." (if multiple lines?)
    # 5. "{" ... "}" (JSON)
    
    # We will use a "block processor":
    # If a line looks like code, start buffering.
    # If a line looks like text (Korean, Headers), stop buffering and flush.
    
    def is_code_line(line):
        l = line.strip()
        if not l: return True # Empty lines can be in code
        if l.startswith("```"): return False # Already code
        if l.startswith("###"): return False # Header
        if l.startswith("####"): return False # Sub-header
        if l.startswith("- "): return False # List
        if l.startswith("Wait"): return False 
        
        # Positive signals
        if l.startswith("{") or l.startswith("}"): return True
        if l.startswith("function ") or l.startswith("const ") or l.startswith("let ") or l.startswith("import "): return True
        if l.startswith("interface ") or l.startswith("type ") or l.startswith("class "): return True
        if l.startswith("return ") or l.startswith("console."): return True
        if l.startswith("//"): return True
        if "->" in l: return False # Mermaid arrow or text
        
        # JSON keys
        if re.match(r'^"[a-zA-Z0-9_]+":', l): return True
        
        # Indented lines?
        if line.startswith("  ") and not line.strip().startswith("-"): return True
        
        return False

    i = 0
    while i < len(lines):
        line = lines[i]
        
        # If explicitly Markdown code blocks exist, skip them
        if line.strip().startswith("```"):
            new_lines.append(line)
            i += 1
            # Skip until end of block
            while i < len(lines) and not lines[i].strip().startswith("```"):
                new_lines.append(lines[i])
                i += 1
            if i < len(lines): new_lines.append(lines[i]) # The closing ```
            i += 1
            continue
            
        # Check start of potential code block
        if is_code_line(line) and line.strip(): # Start of code
            # Look ahead to see if it's a block (more than 1 line or significant)
            # Or if it's a "function" def
            code_chunk = [line]
            j = i + 1
            while j < len(lines):
                next_line = lines[j]
                if is_code_line(next_line):
                    code_chunk.append(next_line)
                    j += 1
                else:
                    break
            
            # Decide if chunk is code
            # If chunk has only 1 line and it's just "// comment" or simple, maybe text?
            # But "const x = 1" is code.
            # If chunk > 0 lines
            
            # Heuristic: If it contains typically code keywords or braces
            full_chunk_str = "\n".join(code_chunk)
            is_code = False
            if "{" in full_chunk_str or "}" in full_chunk_str: is_code = True
            if "function" in full_chunk_str or "const" in full_chunk_str: is_code = True
            if "interface" in full_chunk_str or "type" in full_chunk_str: is_code = True
            
            if is_code:
                # Determine lang
                lang = "ts"
                if line.strip().startswith("{"): lang = "json"
                
                new_lines.append(f"```{lang}")
                new_lines.extend(code_chunk)
                new_lines.append("```")
                i = j
                continue
                
        # Just text
        new_lines.append(line)
        i += 1
        
    return "\n".join(new_lines)

def main():
    files = [f for f in os.listdir(DIR) if f.startswith('ch') and f.endswith('.md')]
    
    for fname in files:
        if fname == 'ch02-how-typescript-works.md':
            # Skip ch02 as it's manually fixed
            continue
            
        print(f"Restoring blocks in {fname}...")
        path = os.path.join(DIR, fname)
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        new_content = restore_blocks(content)
        
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_content)
            
    print("Done.")

if __name__ == "__main__":
    main()
