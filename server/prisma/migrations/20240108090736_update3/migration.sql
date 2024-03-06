/*
  Warnings:

  - You are about to drop the column `postId` on the `comments` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postSlug` to the `comments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_postId_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_catSlug_fkey";

-- DropIndex
DROP INDEX "categories_title_key";

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "postId",
ADD COLUMN     "postSlug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "categories_slug_key" ON "categories"("slug");

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_postSlug_fkey" FOREIGN KEY ("postSlug") REFERENCES "posts"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_catSlug_fkey" FOREIGN KEY ("catSlug") REFERENCES "categories"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;
