import { redirect } from "next/navigation";
import { randomUUID } from "node:crypto";

export default async function Page() {
	const id = randomUUID();
	redirect(`/chat/${id}`);
}
