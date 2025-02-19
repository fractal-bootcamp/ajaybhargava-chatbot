import { openai } from '@ai-sdk/openai';
import { streamText, type Message } from 'ai';
import { api } from '~/trpc/server';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, id }: { messages: Message[]; id: string } = await req.json();
  const result = streamText({
    model: openai('gpt-4o'),
    messages,
    onError: async (error) => {
      console.error(error);
    },
    onFinish: async (result) => {
      messages.map(async (message) => {
        await api.messages.storeMessage({
          id: message.id,
          sessionId: id,
          role: message.role as "user" | "assistant",
          content: message.content,
        });
      })
    },
  });

  return result.toDataStreamResponse();
}