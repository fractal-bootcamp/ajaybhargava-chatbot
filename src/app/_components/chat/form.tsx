import { cn } from "~/lib/utils";

interface ChatFormProps {
	input: string;
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleSubmit: (e: React.FormEvent) => void;
}

export function ChatForm({
	input,
	handleInputChange,
	handleSubmit,
}: ChatFormProps) {
	return (
		<div className="border-t bg-white p-4 w-full">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					if (input.trim()) {
						handleSubmit(e);
					}
				}}
				className="relative w-full max-w-5xl mx-auto"
			>
				<input
					value={input}
					onChange={handleInputChange}
					placeholder="Type your message..."
					className={cn(
						"w-full p-3 pr-12 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500",
					)}
				/>
				<button
					type="submit"
					className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
					aria-label="Send message"
					disabled={!input.trim()}
				>
					<svg
						className="w-5 h-5 transform rotate-90"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						aria-hidden="true"
						role="img"
					>
						<title>Send message</title>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
						/>
					</svg>
				</button>
			</form>
			<div className="text-xs text-gray-400 text-center mt-2">
				Hit ⌘ + B to reveal the sidebar
			</div>
		</div>
	);
}
