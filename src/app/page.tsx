import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { chapters, getDifficultyDots } from "@/types";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* 히어로 일러스트 영역 */}
            <div className="mb-8 text-8xl">
              🍌
            </div>

            {/* 타이틀 */}
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              TypeScript를{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                제대로 이해하는 방법
              </span>
            </h1>

            {/* 서브타이틀 */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              추상적인 타입 시스템을{" "}
              <strong className="text-foreground">시각화와 실습</strong>으로{" "}
              완전히 정복하세요
            </p>

            {/* CTA 버튼 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-lg px-8">
                <Link href="/chapter/why-typescript">
                  학습 시작하기 →
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8">
                <Link href="#chapters">
                  목차 보기
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 3가지 핵심 가치 */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* 시각적 학습 */}
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold mb-2">시각적 학습</h3>
              <p className="text-muted-foreground">
                추상적인 타입을 눈으로 보고 이해하세요
              </p>
            </div>

            {/* 실전 중심 */}
            <div className="text-center p-6">
              <div className="text-5xl mb-4">💼</div>
              <h3 className="text-xl font-semibold mb-2">실전 중심</h3>
              <p className="text-muted-foreground">
                React, Next.js 실무 패턴까지 한 번에
              </p>
            </div>

            {/* 인터랙티브 실습 */}
            <div className="text-center p-6">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">인터랙티브 실습</h3>
              <p className="text-muted-foreground">
                실시간 타입 체크로 즉시 피드백
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 챕터 목록 */}
      <section id="chapters" className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              9개 챕터로 완성하는 TypeScript
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              기초부터 실무까지, 단계별로 TypeScript를 마스터하세요
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {chapters.map((chapter) => (
              <Card
                key={chapter.id}
                className="hover:shadow-lg transition-shadow group"
              >
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                      {String(chapter.number).padStart(2, "0")}
                    </span>
                    <div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {chapter.titleKo}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {chapter.title}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {chapter.description}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      ⏱️ {chapter.duration}
                    </span>
                    <span className="text-muted-foreground">
                      {getDifficultyDots(chapter.difficulty)}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    asChild
                  >
                    <Link href={`/chapter/${chapter.slug}`}>
                      학습하기 →
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t bg-background">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-2xl">🍌</span>
            <span className="font-semibold">TypeScript Academy</span>
          </div>
          <p className="text-sm text-muted-foreground">
            &quot;타입은 약속이다&quot; - TypeScript를 제대로 이해하는 방법
          </p>
        </div>
      </footer>
    </div>
  );
}
