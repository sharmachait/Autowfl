/*
  Warnings:

  - Added the required column `metadata` to the `WorkflowRun` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkflowRun" ADD COLUMN     "metadata" JSONB NOT NULL;
