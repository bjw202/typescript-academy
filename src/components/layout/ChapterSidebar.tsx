"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { chapters, getDifficultyDots } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion";

interface ChapterSidebarProps {
    className?: string;
}

export function ChapterSidebar({ className }: ChapterSidebarProps) {
    const pathname = usePathname();
    const currentChapterId = pathname?.split("/chapter/")?.[1]?.split("/")?.[0];

    // 진행률 계산 (임시로 30%로 설정)
    const progressPercent = 30;

    return (
        <aside className={cn("w-64 border-r bg-sidebar", className)}>
            <div className="flex h-full flex-col">
                {/* 로고 */}
                <div className="border-b p-4">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-2xl">🍌</span>
                        <span className="font-bold text-lg">TypeScript Academy</span>
                    </Link>
                </div>

                {/* 진행률 */}
                <div className="border-b p-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">학습 진행률</span>
                        <span className="text-sm font-medium">{progressPercent}%</span>
                    </div>
                    <Progress value={progressPercent} className="h-2" />
                </div>

                {/* 챕터 목록 */}
                <ScrollArea className="flex-1 px-2">
                    <div className="py-4">
                        <Accordion
                            type="single"
                            collapsible
                            defaultValue={currentChapterId || "ch01"}
                            className="space-y-1"
                        >
                            {chapters.map((chapter) => (
                                <AccordionItem
                                    key={chapter.id}
                                    value={chapter.id}
                                    className="border-none"
                                >
                                    <div className="flex items-center">
                                        <Link
                                            href={`/chapter/${chapter.slug}`}
                                            className={cn(
                                                "flex-1 py-2 px-2 hover:bg-sidebar-accent rounded-md transition-colors",
                                                currentChapterId === chapter.slug && "bg-sidebar-accent"
                                            )}
                                        >
                                            <div className="flex items-start gap-3 text-left">
                                                <span className="text-xs font-mono text-muted-foreground mt-0.5">
                                                    {String(chapter.number).padStart(2, "0")}
                                                </span>
                                                <div>
                                                    <div className="font-medium text-sm">
                                                        {chapter.titleKo}
                                                    </div>
                                                    <div className="flex items-center gap-2 mt-0.5">
                                                        <span className="text-xs text-muted-foreground">
                                                            {chapter.duration}
                                                        </span>
                                                        <span className="text-xs text-muted-foreground">
                                                            {getDifficultyDots(chapter.difficulty)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                        <AccordionTrigger className="py-2 px-2 hover:no-underline hover:bg-sidebar-accent rounded-md [&>svg]:ml-0" />
                                    </div>
                                    <AccordionContent className="pb-0">
                                        <ul className="ml-8 space-y-1 pb-2">
                                            {chapter.sections.map((section) => (
                                                <li key={section.id}>
                                                    <Link
                                                        href={`/chapter/${chapter.slug}#${section.slug}`}
                                                        className={cn(
                                                            "block py-1.5 px-2 text-sm rounded-md transition-colors",
                                                            "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                                                            "text-muted-foreground"
                                                        )}
                                                    >
                                                        {section.title}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </ScrollArea>
            </div>
        </aside>
    );
}
