import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { chapters, getDifficultyDots, type Chapter } from "@/types";
import { getChapterContent } from "@/lib/mdx";

interface ChapterPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return chapters.map((chapter) => ({
        slug: chapter.slug,
    }));
}

export async function generateMetadata({ params }: ChapterPageProps) {
    const { slug } = await params;
    const chapter = chapters.find((c) => c.slug === slug);

    if (!chapter) {
        return { title: "Not Found" };
    }

    return {
        title: `${chapter.titleKo} | TypeScript Academy`,
        description: chapter.description,
    };
}

export default async function ChapterPage({ params }: ChapterPageProps) {
    const { slug } = await params;
    const chapterIndex = chapters.findIndex((c) => c.slug === slug);
    const chapter = chapters[chapterIndex];

    if (!chapter) {
        notFound();
    }

    const prevChapter = chapterIndex > 0 ? chapters[chapterIndex - 1] : null;
    const nextChapter = chapterIndex < chapters.length - 1 ? chapters[chapterIndex + 1] : null;

    // MDX 콘텐츠 로드
    const { content } = await getChapterContent(chapter.id) || {};

    return (
        <article className="max-w-none">
            {/* 챕터 헤더 */}
            <header className="mb-10 border-b pb-8">
                <div className="flex items-center gap-2 text-muted-foreground mb-4 font-mono text-sm">
                    <span className="bg-primary/10 text-primary px-2 py-0.5 rounded">
                        Chapter {String(chapter.number).padStart(2, "0")}
                    </span>
                    <span>•</span>
                    <span>{chapter.duration}</span>
                    <span>•</span>
                    <span className="tracking-widest text-primary">{getDifficultyDots(chapter.difficulty)}</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">{chapter.titleKo}</h1>
                <div className="flex flex-col gap-2">
                    <p className="text-xl text-muted-foreground">{chapter.title}</p>
                    <p className="text-muted-foreground leading-relaxed max-w-2xl">{chapter.description}</p>
                </div>
            </header>

            {/* 학습 목표 박스 */}
            <section className="mb-12">
                <div className="bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900 rounded-xl p-6 shadow-sm">
                    <h2 className="text-lg font-semibold flex items-center gap-2 mb-3 text-blue-700 dark:text-blue-300">
                        <span className="text-xl">🎯</span> 학습 목표
                    </h2>
                    <p className="text-blue-900 dark:text-blue-100 leading-relaxed pl-1">
                        {chapter.description}
                        {/* 실제로는 파일 내 '학습 목표' 섹션이 렌더링되겠지만, 요약정보로도 표시 */}
                    </p>
                </div>
            </section>

            {/* MDX 콘텐츠 영역 */}
            <div className="prose prose-slate dark:prose-invert max-w-none 
        prose-headings:scroll-mt-24
        prose-h2:text-2xl prose-h2:font-bold prose-h2:border-b prose-h2:pb-2 prose-h2:mt-16 prose-h2:mb-6
        prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-10 prose-h3:mb-4
        prose-p:leading-7 prose-p:mb-6
        prose-ul:my-6 prose-li:my-2
        prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
        prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800 prose-pre:text-gray-50 [&_pre_code]:!text-gray-50
        prose-img:rounded-xl prose-img:shadow-md prose-img:my-8
        prose-blockquote:border-l-4 prose-blockquote:border-primary/50 prose-blockquote:bg-muted/50 prose-blockquote:p-4 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
      ">
                {content ? content : (
                    <div className="p-10 text-center text-muted-foreground border rounded-lg border-dashed">
                        <p className="text-lg font-medium mb-2">콘텐츠 준비 중입니다 🚧</p>
                        <p className="text-sm">content/chapters/{chapter.id}-*.md 파일을 확인해주세요.</p>
                    </div>
                )}
            </div>

            {/* 하단 네비게이션 */}
            <nav className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-10 mt-16 border-t">
                {prevChapter ? (
                    <Link
                        href={`/chapter/${prevChapter.slug}`}
                        className="group flex flex-col items-start gap-1 p-4 rounded-lg border hover:border-primary/50 hover:bg-muted/50 transition-all text-left"
                    >
                        <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">이전 챕터</span>
                        <span className="font-semibold text-lg">← {prevChapter.titleKo}</span>
                    </Link>
                ) : (
                    <div className="flex-1" />
                )}

                {nextChapter ? (
                    <Link
                        href={`/chapter/${nextChapter.slug}`}
                        className="group flex flex-col items-end gap-1 p-4 rounded-lg border hover:border-primary/50 hover:bg-muted/50 transition-all text-right"
                    >
                        <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">다음 챕터</span>
                        <span className="font-semibold text-lg">{nextChapter.titleKo} →</span>
                    </Link>
                ) : (
                    <Button size="lg" className="w-full sm:w-auto px-8" asChild>
                        <Link href="/">
                            🎉 학습 완료!
                        </Link>
                    </Button>
                )}
            </nav>
        </article>
    );
}
