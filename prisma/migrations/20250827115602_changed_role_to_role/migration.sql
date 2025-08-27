/*
  Warnings:

  - You are about to drop the column `Role` on the `User` table. All the data in the column will be lost.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "Role",
ADD COLUMN     "role" "public"."Role" NOT NULL;
