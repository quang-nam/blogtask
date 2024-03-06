/*
  Warnings:

  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - Made the column `desc` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "desc" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "username";
