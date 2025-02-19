import { after } from "next/server";
import { ChatDemo } from "~/app/_components/chat";
import { api } from "~/trpc/server";

export default async function ChatPage(props: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await props.params;
	// after the page is loaded, create a new session if it doesn't exist
	// this should speed up the page load, but we just need to be careful when doing writes.
	after(async () => {
		api.sessions.newSession({
			sessionId: id,
		});
	});
	const messages = await api.messages.getMessages({
		sessionId: id,
		limit: 100,
		orderBy: "asc",
	});
	return (
		<ChatDemo
			id={id}
			initialMessages={messages.map((message) => ({
				id: message.id,
				role: message.role as "user" | "assistant",
				content: message.content,
			}))}
		/>
	);
}
