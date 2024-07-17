-- CreateTable
CREATE TABLE "WorkflowRun" (
    "id" SERIAL NOT NULL,
    "wokflowId" INTEGER NOT NULL,
    "workflowId" INTEGER NOT NULL,

    CONSTRAINT "WorkflowRun_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WorkflowRun" ADD CONSTRAINT "WorkflowRun_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "Workflow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
