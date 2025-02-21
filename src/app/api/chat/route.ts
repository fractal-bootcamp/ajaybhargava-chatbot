import { openai } from '@ai-sdk/openai';
import { streamText, type Message } from 'ai';
import { z } from 'zod';
import { api } from '~/trpc/server';

export const maxDuration = 30;

function getWeather({ city, unit }: { city: string; unit: string }) {
  return { value: 35, description: 'Sunny' };
}

export async function POST(req: Request) {
  const { messages, id }: { messages: Message[]; id: string } = await req.json();
  const result = streamText({
    model: openai('gpt-4o'),
    messages,
    tools: {
      getWeather: {
        description: 'Get the weather for a location',
        parameters: z.object({
          city: z.string().describe('The city to get the weather for'),
          unit: z
            .enum(['C', 'F'])
            .describe('The unit to display the temperature in'),
        }),
        execute: async ({ city, unit }) => {
          const { value, description } = getWeather({ city, unit });
          return `It is currently ${value}°${unit} and ${description} in ${city}!`;
        },
      },
    },
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