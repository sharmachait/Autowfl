/*
  Warnings:

  - You are about to drop the column `wokflowId` on the `WorkflowRun` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WorkflowRun" DROP COLUMN "wokflowId";

-- CreateTable
CREATE TABLE "WorkflowRunOutbox" (
    "id" SERIAL NOT NULL,
    "workflowRunId" INTEGER NOT NULL,

    CONSTRAINT "WorkflowRunOutbox_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WorkflowRunOutbox_workflowRunId_key" ON "WorkflowRunOutbox"("workflowRunId");

-- AddForeignKey
ALTER TABLE "WorkflowRunOutbox" ADD CONSTRAINT "WorkflowRunOutbox_workflowRunId_fkey" FOREIGN KEY ("workflowRunId") REFERENCES "WorkflowRun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
