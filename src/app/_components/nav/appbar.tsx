"use client";

import type * as React from "react";
import { useCallback, useRef } from "react";
import { SessionItem } from "./session";

import {
	Sidebar,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarRail,
	useSidebar,
} from "~/components/ui/sidebar";
import type { Session } from "~/server/db/schema";

export function AppSidebar({
	sessions,
	...props
}: React.ComponentProps<typeof Sidebar> & {
	sessions: Session[];
}) {
	const { setOpen, open } = useSidebar();

	return (
		<Sidebar {...props}>
			<SidebarHeader />
			<SidebarGroup>
				{sessions.map((session, index) => (
					<SessionItem
						key={session.id}
						id={session.id}
						name={session.name}
						collapsedLabel={`${index + 1}`}
						setOpen={setOpen}
						isOpen={open}
					/>
				))}
			</SidebarGroup>
			<SidebarFooter />
			<SidebarRail />
		</Sidebar>
	);
}
