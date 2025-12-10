
'use server';
/**
 * @fileOverview An AI flow to format and send exam submission details via email.
 *
 * - sendSubmissionEmail - A function that takes submission data and sends it.
 * - SubmissionData - The input type for the sendSubmissionEmail function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { sendEmail } from '@/lib/email-service';

const AnsweredQuestionSchema = z.object({
    question: z.string(),
    selectedAnswer: z.string(),
    correctAnswer: z.string(),
    isCorrect: z.boolean(),
});

const StudentSchema = z.object({
    name: z.string(),
    rollNumber: z.string(),
    class: z.string(),
    section: z.string(),
});

const SubmissionDataSchema = z.object({
  student: StudentSchema,
  answeredQuestions: z.array(AnsweredQuestionSchema),
  codingAnswer: z.string(),
  mcqScore: z.number(),
  mcqCorrect: z.number(),
  totalMcqQuestions: z.number(),
});

export type SubmissionData = z.infer<typeof SubmissionDataSchema>;

const EmailSchema = z.object({
    subject: z.string(),
    body: z.string(),
});
export type EmailOutput = z.infer<typeof EmailSchema>;


export async function sendSubmissionEmail(input: SubmissionData): Promise<{ success: boolean }> {
  return emailFormattingFlow(input);
}

const emailPrompt = ai.definePrompt({
    name: 'submissionEmailPrompt',
    input: { schema: SubmissionDataSchema },
    output: { schema: EmailSchema },
    prompt: `
      Generate an HTML email body for an exam submission. The output must be a JSON object with 'subject' and 'body' fields.
      The subject must be: "Exam Submission: {{student.name}} - Roll No: {{student.rollNumber}}"

      The HTML body should be well-structured and easy to read. Use inline styles for formatting.

      The body should contain the following sections in this order:
      1. A main heading: "Exam Submission Details"
      2. A "Student Details" section with Name, Roll Number, Class, and Section. Format it as a list or table.
         Example: <p><strong>Class:</strong> {{student.class}} - {{student.section}}</p>
      3. An "Exam Results Summary" section showing:
         - MCQ Score: "{{mcqScore}} / 80"
         - Correct MCQ Answers: "{{mcqCorrect}} / {{totalMcqQuestions}}"
         - Coding Challenge Score: "Pending Evaluation"
      4. A "Coding Challenge Submission" section. The student's code must be placed inside a <pre><code> block. If the codingAnswer is empty, the block should be empty. Do not add any of your own code or text.
         {{{codingAnswer}}}
      5. An "MCQ Answers Breakdown" section. This must be an ordered list (<ol>).
         For EACH question in the 'answeredQuestions' array, create a list item (<li>) with the following details:
         - The Question.
         - The Student's Answer. Indicate if it was "Correct" or "Incorrect".
         - The Correct Answer.
         - Example format for ONE question item:
           <li>
             <p><strong>Question:</strong> What is 2+2?</p>
             <p><strong>Your Answer:</strong> 5 (Incorrect)</p>
             <p><strong>Correct Answer:</strong> 4</p>
           </li>
        
         Apply this exact format for every question using the 'answeredQuestions' array:
         {{#each answeredQuestions}}
           <li>
             <p><strong>Question:</strong> {{this.question}}</p>
             <p><strong>Your Answer:</strong> {{this.selectedAnswer}} {{#if this.isCorrect}}(Correct){{else}}(Incorrect){{/if}}</p>
             <p><strong>Correct Answer:</strong> {{this.correctAnswer}}</p>
           </li>
         {{/each}}
    `,
});


const emailFormattingFlow = ai.defineFlow(
  {
    name: 'emailFormattingFlow',
    inputSchema: SubmissionDataSchema,
    outputSchema: z.object({ success: z.boolean() }),
    retrier: {
      maxAttempts: 3,
      backoff: {
        delay: 2000,
        factor: 2,
      },
    },
  },
  async (submission) => {
    try {
        const { output } = await emailPrompt(submission);
        
        if (!output) {
            throw new Error("AI generation returned no output.");
        }
        
        console.log("Generated Email Content. Preparing to send...");

        await sendEmail({
            to: 'dk3624897@gmail.com',
            subject: output.subject,
            text: 'Please view this email in an HTML-compatible client.',
            html: output.body
        });

        return { success: true };

    } catch (error) {
        console.error("Failed to generate or send email after multiple retries:", error);
        // Fallback: Try to send a basic email with raw data if AI or sending fails
        try {
            await sendEmail({
                to: 'dk3624897@gmail.com',
                subject: `FALLBACK - Exam Submission: ${submission.student.name}`,
                text: `AI generation or primary email sending failed. Raw data:\n\n${JSON.stringify(submission, null, 2)}`,
                html: `<p>AI generation or primary email sending failed. Raw data:</p><pre>${JSON.stringify(submission, null, 2)}</pre>`
            });
            return { success: true }; // Still counts as success as a fallback was sent
        } catch (fallbackError) {
            console.error("Fallback email also failed:", fallbackError);
            throw new Error('Failed to send both primary and fallback emails.');
        }
    }
  }
);

    