"use client";

import { MoreVertical } from "lucide-react";
import { SidebarContent } from "~/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ActionDialog } from "./dialog";

interface SessionItemProps {
	id: string;
	name: string | null;
	collapsedLabel: string;
	setOpen: (open: boolean) => void;
	isOpen?: boolean;
}

export function SessionItem({
	id,
	name,
	collapsedLabel,
	isOpen = true,
}: SessionItemProps) {
	const router = useRouter();
	const [showDialog, setShowDialog] = useState(false);

	const handleClick = () => {
		router.push(`/chat/${id}`);
	};

	const handleAction = (value: string) => {
		if (value === "delete") {
			// Put a Delete Handler Here
		} else if (value === "fork") {
			// Put a Fork Handler Here
		}
		setShowDialog(false);
	};

	return (
		<SidebarContent className="flex items-center justify-between hover:bg-gray-100 rounded-lg">
			<div className="flex w-full items-center gap-2">
				<button
					onClick={handleClick}
					className={`flex-1 text-left font-light py-2 px-2 ${
						!isOpen ? "border border-gray-200 rounded" : ""
					}`}
					type="button"
				>
					{isOpen ? name : collapsedLabel}
				</button>
				<div className="relative">
					<button
						type="button"
						className="p-4 hover:bg-gray-200 rounded"
						onClick={() => setShowDialog(true)}
					>
						<MoreVertical className="px-1 side-4" />
					</button>
					<ActionDialog
						showDialog={showDialog}
						setShowDialog={setShowDialog}
						handleAction={handleAction}
					/>
				</div>
			</div>
		</SidebarContent>
	);
}
