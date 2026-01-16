import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkCustomHeadingId from "remark-custom-heading-id";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import { CodePlayground } from "@/components/interactive/CodePlayground";
import { Mermaid } from "@/components/content/Mermaid";

// MDX 컴포넌트
const components = {
    CodePlayground,
    Mermaid,
};

export async function getChapterContent(chapterId: string) {
    const contentDir = path.join(process.cwd(), "content/chapters");

    // 파일명 찾기 (정확한 파일명을 모르므로 chapterId로 시작하는 파일 찾기)
    const files = fs.readdirSync(contentDir);
    const fileName = files.find(file => file.startsWith(chapterId));

    if (!fileName) {
        return null;
    }

    const filePath = path.join(contentDir, fileName);
    const rawContent = fs.readFileSync(filePath, "utf-8");

    // MDX 컴파일
    const { content, frontmatter } = await compileMDX<{ title: string }>({
        source: rawContent,
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                remarkPlugins: [remarkGfm, remarkCustomHeadingId],
                rehypePlugins: [rehypeSlug, rehypeHighlight],
            },
        },
        components: components,
    });

    return {
        content,
        frontmatter,
    };
}

