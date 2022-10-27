import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import invariant from "tiny-invariant";
import { marked } from "marked";

import { getPost } from "~/models/post.server";

export async function loader({ params }: LoaderArgs) {
  const { slug } = params;
  invariant(slug, "slug not set");
  const post = await getPost(slug);
  const html = marked(post.markdown);
  return json({ title: post.title, html });
}

export default function Post() {
  const { title, html } = useLoaderData<typeof loader>();
  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">{title}</h1>
      <PostContent html={html} />
    </main>
  );
}

function PostContent({ html }: { html: string }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
