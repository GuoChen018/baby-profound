/**
 * Prompt Volumes — page route.
 *
 * Source: `_reference/profound/prompt-volumes/screenshot.png` +
 *         `_reference/profound/prompt-volumes/notes.md`.
 *
 * Server component — composes the client `<PromptVolumesView>` with
 * tab-scoped mock data so the route can keep its `metadata` export.
 */

import { PromptVolumesView } from "@/components/prompt-volumes/PromptVolumesView";
import { promptVolumesData } from "@/lib/data/prompt-volumes";

export const metadata = { title: "Prompt Volumes · Brex · baby-profound" };

export default function PromptVolumesPage() {
  return <PromptVolumesView data={promptVolumesData} />;
}
