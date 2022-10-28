import type { Post } from "@prisma/client";
import { prisma } from "~/db.server";

export async function getPostListItems() {
  return prisma.post.findMany({ select: { slug: true, title: true } });
}

export async function getPost(slug: string) {
  return prisma.post.findUnique({ where: { slug } });
}

interface PostData {
  title: string;
  slug: string;
  markdown: string;
}

export async function createPost({
  slug,
  title,
  markdown,
}: PostData): Promise<Post> {
  return prisma.post.create({ data: { slug, title, markdown } });
}
