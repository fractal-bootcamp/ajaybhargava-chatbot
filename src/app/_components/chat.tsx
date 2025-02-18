"use client";

import { useChat } from "@ai-sdk/react";
import { Chat } from "~/components/ui/chat";

export function ChatDemo(props: { id: string }) {
	const { messages, input, handleInputChange, handleSubmit, stop } = useChat({
		id: props.id,
		sendExtraMessageFields: true,
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
