import { api } from "~/trpc/server";

// Add type for the newSession response
interface SessionResponse {
	id: string;
}

/**
 * Retrieves an existing session ID or creates a new one if it doesn't exist.
 *
 * This function first checks for the existence of a session with the given ID.
 * If the session exists, it returns the session ID. If not, it attempts to create
 * a new session with the specified ID. If the creation of the new session fails
 * (i.e., the session ID is not found in the response), it throws an error.
 *
 * @param {string} id - The unique identifier for the session.
 * @returns {Promise<string>} The session ID of either the existing or newly created session.
 * @throws {Error} If the new session creation fails and does not return a valid ID.
 */
async function getOrCreateSessionId(id: string): Promise<string> {
	const existingSession = await api.sessions.existingSession({
		sessionId: id,
	});

	if (existingSession) {
		return existingSession.id;
	}

	const newSession = (await api.sessions.newSession({
		sessionId: id,
	})) as SessionResponse[];

	if (!newSession?.[0]?.id) {
		throw new Error("Failed to create session");
	}

	return newSession[0].id;
}

export default getOrCreateSessionId;
