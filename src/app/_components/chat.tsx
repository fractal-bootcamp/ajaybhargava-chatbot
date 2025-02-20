"use client";

import { useChat } from "@ai-sdk/react";
import { Chat } from "~/components/ui/chat";
import type { Message } from "ai";

export function ChatDemo(props: { id: string; initialMessages: Message[] }) {
	const { messages, input, handleInputChange, handleSubmit, stop } = useChat({
		id: props.id,
		initialMessages: props.initialMessages,
		sendExtraMessageFields: true,
		maxSteps: 5,
		async onToolCall({ toolCall }) {
			if (toolCall.toolName === "getLocation") {
				const cities = ["New York", "Los Angeles", "Chicago", "San Francisco"];
				return cities[Math.floor(Math.random() * cities.length)];
			}
		},
	});

	return (
		<main className="flex h-screen w-screen p-4">
			<Chat
				messages={messages}
				input={input}
				handleInputChange={handleInputChange}
				handleSubmit={handleSubmit}
				isGenerating={false}
				stop={stop}
			/>
		</main>
	);
}
