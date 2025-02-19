import Link from "next/link";
import { ShinyButton } from "~/components/magicui/shiny-button";

export function NewChatButton() {
	return (
		<Link href="/" className="w-full">
			<ShinyButton className="w-full flex items-center justify-between gap-2">
				<span>New Chat</span>
			</ShinyButton>
		</Link>
	);
}
