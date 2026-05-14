/**
 * ArticleEditor — semantic-tagged "rich-text" editor stub.
 *
 * Source: `_reference/profound/content/screenshot-content-detail.png`.
 *
 * Treatment notes (per `_reference/profound/content/notes.md`):
 *   - Each block has its semantic tag (h1, h2, p, ul, li) printed in the
 *     LEFT GUTTER. This is the AEO-as-checklist UX touch — the structure
 *     is part of the editing surface, not hidden behind a toolbar.
 *   - This is a sandbox: render styled HTML directly from the data model.
 *     No TipTap / ProseMirror / contenteditable. The brief literally says
 *     "no real WYSIWYG; this is a sandbox".
 */

import { cn } from "@/lib/cn";
import type { ArticleBlock, ArticleBody } from "@/lib/types/content";

export interface ArticleEditorProps {
  body: ArticleBody;
  className?: string;
}

const gutterClass = cn(
  "shrink-0 select-none",
  "w-20 pt-2",
  "text-mini font-mono text-text-quaternary",
);

function GutterLabel({ tag }: { tag: string }) {
  return <span className={gutterClass}>{tag}</span>;
}

function BlockRow({
  tag,
  children,
}: {
  tag: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-12">
      <GutterLabel tag={tag} />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

function renderBlock(block: ArticleBlock, key: number) {
  switch (block.tag) {
    case "h1":
      return (
        <BlockRow key={key} tag="h1">
          <h1 className="text-title-regular font-semibold text-text-primary">
            {block.text}
          </h1>
        </BlockRow>
      );
    case "h2":
      return (
        <BlockRow key={key} tag="h2">
          <h2 className="text-title-mini font-semibold text-text-primary">
            {block.text}
          </h2>
        </BlockRow>
      );
    case "h3":
      return (
        <BlockRow key={key} tag="h3">
          <h3 className="text-base font-semibold text-text-primary">
            {block.text}
          </h3>
        </BlockRow>
      );
    case "p":
      return (
        <BlockRow key={key} tag="p">
          <p className="text-paragraph text-text-primary">
            {block.bold ? (
              <>
                <strong className="font-semibold">{block.bold}</strong>
                {": "}
              </>
            ) : null}
            {block.text}
          </p>
        </BlockRow>
      );
    case "ul":
      return (
        <div key={key} className="flex items-start gap-12">
          <GutterLabel tag="ul" />
          <ul className="min-w-0 flex-1 space-y-6">
            {block.items.map((item, i) => (
              <li key={i} className="flex items-start gap-12">
                <GutterLabel tag="li" />
                <div className="min-w-0 flex-1 flex items-start gap-8 text-paragraph">
                  <span
                    aria-hidden
                    className="mt-7 inline-block size-3 shrink-0 rounded-full bg-text-tertiary"
                  />
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className={cn(
                        "min-w-0 break-all underline",
                        "text-badge-blue-emphasis hover:text-text-primary",
                      )}
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="min-w-0 text-text-primary">{item.text}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      );
    case "hr":
      return (
        <div key={key} className="flex items-start gap-12 py-4">
          <span className={gutterClass} aria-hidden />
          <hr className="flex-1 border-t border-fill-quaternary" />
        </div>
      );
  }
}

export function ArticleEditor({ body, className }: ArticleEditorProps) {
  return (
    <div
      className={cn(
        "rounded-8 bg-bg-primary border border-fill-quaternary",
        "p-32 space-y-16",
        className,
      )}
    >
      {body.blocks.map((b, i) => renderBlock(b, i))}
    </div>
  );
}
