import { ChatDemo } from "~/app/_components/chat";

export default async function ChatPage(props: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await props.params;

	return <ChatDemo id={id} />;
}
