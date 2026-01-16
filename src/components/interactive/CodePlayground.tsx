"use client";

import Editor from "@monaco-editor/react";

interface CodePlaygroundProps {
    initialCode?: string;
    language?: string;
    height?: string;
}

export function CodePlayground({
    initialCode = "// 코드를 입력하세요",
    language = "typescript",
    height = "300px"
}: CodePlaygroundProps) {
    return (
        <div className="w-full my-8 border rounded-lg overflow-hidden shadow-sm bg-zinc-950">
            <div className="bg-zinc-900 px-4 py-2 border-b border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/20" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                        <div className="w-3 h-3 rounded-full bg-green-500/20" />
                    </div>
                    <span className="text-xs font-mono text-zinc-400 ml-2">Playground.ts</span>
                </div>
                <div className="px-2 py-0.5 rounded text-[10px] font-medium bg-blue-500/10 text-blue-400">
                    TypeScript
                </div>
            </div>
            <Editor
                height={height}
                defaultLanguage={language}
                defaultValue={initialCode}
                theme="vs-dark"
                options={{
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    fontSize: 14,
                    fontFamily: "'Fira Code', 'JetBrains Mono', monospace",
                    padding: { top: 16, bottom: 16 },
                    lineNumbers: "on",
                    roundedSelection: false,
                    readOnly: false,
                    cursorStyle: "line",
                }}
            />
        </div>
    );
}
