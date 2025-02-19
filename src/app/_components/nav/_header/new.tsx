import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "~/components/ui/button";

export function NewChatButton() {
	return (
		<Link href="/" className="w-full">
			<Button
				variant="ghost"
				size="icon"
				className="w-full text-zinc-50 hover:text-zinc-200 dark:text-zinc-200 dark:hover:text-zinc-50 
				border border-zinc-700/40 hover:border-zinc-700/80 
				transition-all duration-200 hover:bg-zinc-800/50 hover:shadow-lg
				flex items-center gap-2"
			>
				<Plus className="h-5 w-5" />
				<span className="font-bold tracking-tight text-sm">New Chat</span>
			</Button>
		</Link>
	);
}
