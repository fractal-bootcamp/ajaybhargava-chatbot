"use client";

import type * as React from "react";
import { useCallback, useRef } from "react";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
	useSidebar,
} from "~/components/ui/sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { setOpen } = useSidebar();
	const closeTimeoutRef = useRef<NodeJS.Timeout>();

	const handleMouseLeave = useCallback(() => {
		closeTimeoutRef.current = setTimeout(() => {
			setOpen(false);
		}, 400);
	}, [setOpen]);

	const handleMouseEnter = useCallback(() => {
		if (closeTimeoutRef.current) {
			clearTimeout(closeTimeoutRef.current);
		}
	}, []);

	return (
		<Sidebar
			collapsible="icon"
			onMouseLeave={handleMouseLeave}
			onMouseEnter={handleMouseEnter}
			{...props}
		>
			<SidebarHeader />
			<SidebarContent />
			<SidebarFooter />
			<SidebarRail />
		</Sidebar>
	);
}
