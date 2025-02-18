import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { TRPCReactProvider } from "~/trpc/react";
import { SidebarProvider } from "~/components/ui/sidebar";
import { AppSidebar } from "./_components/appbar";

export const metadata: Metadata = {
	title: "Ajay's Chatbot",
	description: "Ajay's Chatbot",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" className={`${GeistSans.variable}`}>
			<body>
				<SidebarProvider>
					<AppSidebar />
					<TRPCReactProvider>{children}</TRPCReactProvider>
				</SidebarProvider>
			</body>
		</html>
	);
}
