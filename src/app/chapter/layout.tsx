import { Header } from "@/components/layout/Header";
import { ChapterSidebar } from "@/components/layout/ChapterSidebar";

export default function ChapterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-1 flex">
                {/* 좌측 사이드바 (데스크탑) */}
                <ChapterSidebar className="hidden md:flex fixed left-0 top-14 bottom-0" />

                {/* 메인 콘텐츠 */}
                <main className="flex-1 md:ml-64">
                    <div className="container max-w-4xl mx-auto p-6 md:p-10">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
