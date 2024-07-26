import { z } from 'zod';

export const SignupSchema = z.object({
  username: z.string().min(5),
  password: z.string().min(6),
  name: z.string().min(6),
});

export const SigninSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const WorkflowCreateSchema = z.object({
  availableTriggerId: z.string(),
  triggerMetadata: z.any().optional(),
  actions: z.array(
    z.object({
      availableActionId: z.string(),
      actionMetadata: z.any().optional(),
    })
  ),
});

// model Workflow {
//   id          Int           @id @default(autoincrement())
//   triggerId   Int
//   userId      Int
//   trigger     Trigger?
//   actions     Action[]
//   workflowRun WorkflowRun[]
//   User User @relation(fields: [userId], references: [id], onDelete: Cascade)
// }
