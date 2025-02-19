import { formatDistanceToNow } from "date-fns";
import type { Session } from "~/server/db/schema";
import { SessionItem } from "./session";

// Helper function to group sessions by relative date
export function groupSessionsByDate(sessions: Session[]) {
	const groups: Record<string, Session[]> = {};

	for (const session of sessions) {
		const distance = formatDistanceToNow(new Date(session.createdAt), {
			addSuffix: true,
		});
		if (!groups[distance]) {
			groups[distance] = [];
		}
		groups[distance].push(session);
	}

	return groups;
}

export function renderSessionGroup(
	[dateGroup, groupSessions]: [string, Session[]],
	setOpen: (open: boolean) => void,
	open: boolean,
) {
	return (
		<div key={dateGroup}>
			<div className="px-2 py-1">
				<span className="text-[0.65rem] font-semibold text-zinc-500">
					{dateGroup}
				</span>
			</div>
			{groupSessions.map((session, index) => (
				<SessionItem
					key={session.id}
					id={session.id}
					name={session.name}
					collapsedLabel={`${index + 1}`}
					setOpen={setOpen}
					isOpen={open}
				/>
			))}
		</div>
	);
}
