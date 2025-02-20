import { SelectContent } from "~/components/ui/select";

import { SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "~/components/ui/dialog";
import { Select } from "~/components/ui/select";

export function ActionDialog({
	showDialog,
	setShowDialog,
	handleAction,
}: {
	showDialog: boolean;
	setShowDialog: (showDialog: boolean) => void;
	handleAction: (value: string) => void;
}) {
	return (
		<Dialog open={showDialog} onOpenChange={setShowDialog}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Choose Action</DialogTitle>
				</DialogHeader>
				<Select onValueChange={handleAction}>
					<SelectTrigger className="w-full">
						<SelectValue placeholder="Select an action" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="delete">Delete</SelectItem>
					</SelectContent>
				</Select>
			</DialogContent>
		</Dialog>
	);
}
