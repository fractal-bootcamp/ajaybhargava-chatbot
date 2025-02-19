import { api } from "~/trpc/server";
import { AppSidebar } from "./nav/appbar";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { after } from "next/server";

export async function AppSidebarWrapper(
	props: Omit<React.ComponentProps<typeof AppSidebar>, "sessions">,
) {
	// Fetch sessions on the server
	const sessions = await api.sessions.allSessions();

	after(async () => {
		await Promise.all(
			sessions
				.filter((session) => session.name === "New Chat")
				.map(async (session) => {
					const messages = await api.messages.getMessages({
						sessionId: session.id,
						orderBy: "desc",
					});
					if (messages.length < 5) {
						return null;
					}
					const summary = await generateText({
						model: openai("gpt-4o-mini"),
						prompt: `Summarize the following messages into a title no more than 3 words and do not use quotation marks to enclose the title: ${messages.map((message) => message.content).join("\n")}`,
					});
					return api.sessions.updateSessionSummary({
						sessionId: session.id,
						summary: summary.text,
					});
				})
				.filter(Boolean),
		);
	});

	return <AppSidebar sessions={sessions} {...props} />;
}
