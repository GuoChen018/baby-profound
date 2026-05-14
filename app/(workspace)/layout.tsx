import { type ReactNode } from "react";
import { Layout } from "@/components/shell";

export default function WorkspaceLayout({ children }: { children: ReactNode }) {
  return <Layout>{children}</Layout>;
}
