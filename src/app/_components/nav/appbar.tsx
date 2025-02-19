"use client";

import type * as React from "react";
import { NewChatButton } from "./_header/new";
import {
	Sidebar,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarRail,
	useSidebar,
} from "~/components/ui/sidebar";
import type { Session } from "~/server/db/schema";
import { groupSessionsByDate, renderSessionGroup } from "./_content/groups";

export function AppSidebar({
	sessions,
	...props
}: React.ComponentProps<typeof Sidebar> & {
	sessions: Session[];
}) {
	const { setOpen, open } = useSidebar();
	const groupedSessions = groupSessionsByDate(sessions);

	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<NewChatButton />
			</SidebarHeader>
			<SidebarGroup>
				{Object.entries(groupedSessions).map((group) =>
					renderSessionGroup(group, setOpen, open),
				)}
			</SidebarGroup>
			<SidebarFooter />
			<SidebarRail />
		</Sidebar>
	);
}
