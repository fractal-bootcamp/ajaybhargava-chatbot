import type { Message } from "ai";
import { ChatDemo } from "~/app/_components/chat";
import getOrCreateSessionId from "~/app/_components/core/identifier";
import { api } from "~/trpc/server";

export default async function ChatPage(props: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await props.params;
	const sessionId = await getOrCreateSessionId(id);
	const messages = await api.messages.getMessages({ sessionId, limit: 100 });
	return (
		<ChatDemo
			id={sessionId}
			initialMessages={
				messages.map((message) => ({
					id: message.id,
					role: message.role as "user" | "assistant",
					content: message.content,
				})) as Message[]
			}
		/>
	);
}
