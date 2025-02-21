import type { Message } from "ai";
import { cn } from "~/lib/utils";

export interface ChatMessageProps {
	message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
	return (
		<div
			className={cn(
				"flex w-full",
				message.role === "user" ? "justify-end" : "justify-start",
			)}
		>
			<div
				className={cn(
					"max-w-[80%] p-4 rounded-xl",
					message.role === "user"
						? "bg-blue-500 text-white"
						: "bg-gray-100 text-gray-900",
				)}
			>
				<div className="whitespace-pre-wrap">{message.content}</div>
			</div>
		</div>
	);
}
