/*
  Warnings:

  - You are about to drop the column `categoryId` on the `posts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `posts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `catSlug` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_categoryId_fkey";

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "categoryId",
ADD COLUMN     "catSlug" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "categories_title_key" ON "categories"("title");

-- CreateIndex
CREATE UNIQUE INDEX "posts_slug_key" ON "posts"("slug");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_catSlug_fkey" FOREIGN KEY ("catSlug") REFERENCES "categories"("title") ON DELETE RESTRICT ON UPDATE CASCADE;
