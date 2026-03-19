// app/blog/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Twitter, Linkedin, Copy } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { client, urlFor } from "@/lib/sanity";

export const revalidate = 60;

async function getPost(slug: string) {
    return await client.fetch(
        `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      "date": publishedAt,
      "category": categories[0]->title,
      "slug": slug.current,
      "readTime": readTime,
      "author": author->{
        name,
        role
      },
      mainImage,
      body[] {
        ...,
        _type == "image" => {
          ...,
          asset->
        }
      }
    }`,
        { slug }
    )
}

async function getAllSlugs() {
    return await client.fetch(
        `*[_type == "post"] { "slug": slug.current }`
    )
}

export async function generateStaticParams() {
    const posts = await getAllSlugs();
    return posts.map((post: { slug: string }) => ({ slug: post.slug }));
}

const portableTextComponents = {
    block: {
        normal: ({ children }: any) => (
            <p style={{ textAlign: 'justify' }} className="mb-6 text-slate-300 leading-relaxed text-lg">
                {children}
            </p>
        ),
        h2: ({ children }: any) => (
            <h2 className="text-2xl font-bold mt-12 mb-6 text-white">{children}</h2>
        ),
        blockquote: ({ children }: any) => (
            <blockquote className="border-l-4 border-cyan-500 pl-6 py-2 my-10 text-xl italic text-slate-200 bg-cyan-500/5 rounded-r-xl">
                "{children}"
            </blockquote>
        ),
    },
    types: {
        image: ({ value }: any) => (
            <div className="relative w-full my-10 rounded-2xl overflow-hidden border border-slate-700/60">
                <Image
                    src={urlFor(value).width(1200).url()}
                    alt={value.alt || ''}
                    width={1200}
                    height={675}
                    className="w-full h-auto object-cover"
                />
                {value.caption && (
                    <p className="text-center text-xs text-slate-500 mt-2 pb-3">
                        {value.caption}
                    </p>
                )}
            </div>
        ),
    },
    marks: {
        link: ({ children, value }: any) => (
            <a href={value.href} target="_blank"
                rel="noopener noreferrer" className="text-cyan-400 hover:underline">
                {children}
            </a>
        ),
    },
}

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const post = await getPost(slug)

    if (!post) return notFound()

    return (
        <article className="relative min-h-screen bg-[#080c14] text-white pt-32 pb-24 px-4 md:px-8 overflow-hidden">

            <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/5 blur-[120px] rounded-full" />
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(to right, #22d3ee 1px, transparent 1px)`,
                    backgroundSize: "64px 64px",
                }}
            />

            <div className="relative max-w-screen-md mx-auto z-10">

                {/* Back Button */}
                <Link
                    href="/blog"
                    className="group inline-flex items-center gap-2 text-sm font-mono text-slate-400 hover:text-cyan-400 mb-10 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    Back to all articles
                </Link>

                {/* Header */}
                <header className="mb-12">
                    <div className="flex flex-wrap items-center gap-4 mb-6 text-xs font-mono text-slate-400">
                        <span className="uppercase tracking-widest text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 rounded-full px-3 py-1">
                            {post.category}
                        </span>
                        <span>•</span>
                        <span>
                            {new Date(post.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </span>
                        <span>•</span>
                        {post.readTime && (
                            <span className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5" /> {post.readTime}
                            </span>
                        )}
                    </div>

                    <h1 className="text-3xl md:text-5xl font-bold text-white leading-[1.15] mb-8">
                        {post.title}
                    </h1>

                    <div className="flex items-center justify-between border-t border-slate-700/50 pt-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-cyan-400 font-bold border border-slate-700">
                                {post.author?.name?.charAt(0)}
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-white">{post.author?.name}</p>
                                <p className="text-xs text-slate-500">{post.author?.role}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-full transition-all">
                                <Twitter className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-full transition-all">
                                <Linkedin className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-full transition-all">
                                <Copy className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Hero Image */}
                {post.mainImage && (
                    <div className="relative w-full h-[300px] md:h-[450px] rounded-2xl overflow-hidden bg-slate-800/40 border border-slate-700/60 mb-14">
                        <Image
                            src={urlFor(post.mainImage).width(1200).url()}
                            alt={post.title}
                            fill
                            priority
                            className="object-cover"
                        />
                    </div>
                )}

                {/* Article Body */}
                <div className="blog-content prose prose-invert prose-cyan max-w-none prose-p:text-slate-300 prose-p:leading-relaxed prose-p:text-lg prose-headings:text-white prose-a:text-cyan-400"
                    style={{ textAlign: 'justify' }}>
                    <PortableText
                        value={post.body}
                        components={portableTextComponents}
                    />
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 pt-8 border-t border-slate-700/50 text-center">
                    <p className="text-slate-400 mb-4">Enjoyed this article?</p>
                    <Link
                        href="/blog"
                        className="inline-flex items-center justify-center gap-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-full px-6 py-3 text-sm font-semibold transition-all"
                    >
                        Explore More Research
                    </Link>
                </div>

            </div>
        </article>
    )
}