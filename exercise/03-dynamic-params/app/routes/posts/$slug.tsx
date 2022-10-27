import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getPost } from "~/models/post.server";

export async function loader({ params }: LoaderArgs) {
  const { slug } = params;
  if (!slug) throw new Error("Slug not defined");
  const post = await getPost(slug);
  return json({ post });
}

export default function Post() {
  const { post } = useLoaderData<typeof loader>();
  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">{post.title}</h1>
    </main>
  );
}
