"use client";

import { useChat } from "@ai-sdk/react";
import type { Message } from "ai";
import { ChatMessage } from "./chat/messages";
import { ChatForm } from "./chat/form";

export function ChatDemo(props: { id: string; initialMessages: Message[] }) {
	const { messages, input, handleInputChange, handleSubmit, status } = useChat({
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
		<main className="flex h-screen flex-col relative w-full">
			<div className="flex-1 overflow-y-auto p-4 w-full">
				<div className="w-full space-y-4">
					{messages.map((message) => (
						<ChatMessage key={message.id} message={message} />
					))}
				</div>
			</div>

			<ChatForm
				input={input}
				handleInputChange={handleInputChange}
				handleSubmit={handleSubmit}
			/>
		</main>
	);
}
