"use client";

import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

interface MermaidProps {
    chart: string;
}

export function Mermaid({ chart }: MermaidProps) {
    const [svg, setSvg] = useState<string>("");
    const [isError, setIsError] = useState(false);
    const elementId = useRef(`mermaid-${Math.random().toString(36).slice(2)}`).current;

    useEffect(() => {
        mermaid.initialize({
            startOnLoad: false,
            theme: "default",
            securityLevel: "loose",
            fontFamily: "var(--font-sans)",
        });

        const renderChart = async () => {
            try {
                const { svg } = await mermaid.render(elementId, chart);
                setSvg(svg);
                setIsError(false);
            } catch (error) {
                console.error("Mermaid rendering failed:", error);
                setIsError(true);
            }
        };

        renderChart();
    }, [chart, elementId]);

    if (isError) {
        return (
            <div className="p-4 border border-red-200 bg-red-50 text-red-600 rounded-md text-sm">
                다이어그램 렌더링에 실패했습니다.
            </div>
        );
    }

    if (!svg) {
        return <div className="animate-pulse h-40 bg-muted/20 rounded-md" />;
    }

    return (
        <div
            className="mermaid-container flex justify-center my-8 p-4 bg-white dark:bg-zinc-900 rounded-lg border shadow-sm overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    );
}
