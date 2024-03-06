/*
  Warnings:

  - You are about to drop the column `slug` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `postSlug` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `catSlug` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `posts` table. All the data in the column will be lost.
  - Added the required column `postId` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_postSlug_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_catSlug_fkey";

-- DropIndex
DROP INDEX "categories_slug_key";

-- DropIndex
DROP INDEX "posts_slug_key";

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "slug";

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "postSlug",
ADD COLUMN     "postId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "catSlug",
DROP COLUMN "slug",
ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
