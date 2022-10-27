import { prisma } from "~/db.server";

export async function getPostListItems() {
  return prisma.post.findMany({ select: { slug: true, title: true } });
}

// @ts-expect-error
export async function getPost(slug) {
  return prisma.post.findUnique({ where: { slug } });
}
