import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { TRPCReactProvider } from "~/trpc/react";
import { SidebarProvider } from "~/components/ui/sidebar";
import { AppSidebarWrapper } from "./_components/bar";

export const metadata: Metadata = {
	title: "Ajay's Chatbot",
	description: "Ajay's Chatbot",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" className={`${GeistSans.variable}`}>
			<body>
				<SidebarProvider>
					<AppSidebarWrapper />
					<TRPCReactProvider>{children}</TRPCReactProvider>
				</SidebarProvider>
			</body>
		</html>
	);
}
