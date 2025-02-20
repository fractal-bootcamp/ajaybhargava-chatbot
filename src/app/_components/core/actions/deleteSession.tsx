"use server";

import { api } from "~/trpc/server";

export async function deleteSession(sessionId: string) {
	try {
		await api.sessions.deleteSession({ sessionId });
		return { success: true };
	} catch (error) {
		console.error("Failed to delete session:", error);
		return { success: false, error: "Failed to delete session" };
	}
}
