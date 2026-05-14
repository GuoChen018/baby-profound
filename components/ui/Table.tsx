/**
 * Table — Profound's data-table primitive.
 *
 * Source: `_reference/profound/overview/screenshot.png` (Top Keywords) and
 * Prompt Volumes / Agents tables. Reference colors sampled with PIL:
 *   - Header bg: `#1a1a1c` (= bg-bg-tertiary)
 *   - Body bg : `#0e0e10` (= bg-bg-primary, transparent — let page show)
 *   - Outer chrome: 1px `border-fill-quaternary` + `rounded-8`
 *
 * Visual rules:
 *   - Header `<thead>` row sits on a slightly elevated bg-bg-tertiary surface
 *     with rounded-top corners. Body rows are transparent.
 *   - Header text: `text-mini` (12px) `text-text-tertiary`, sort chevron next to label.
 *   - Body cell: `text-small` (13px) `text-text-primary`, numeric columns use
 *     tabular-nums and right-align.
 *   - Row separator: `border-b border-fill-quaternary` between body rows.
 *   - Row height: ~50px (py-16 + content). Header row shorter (~36px).
 *   - Hover: subtle `bg-bg-tertiary/60` highlight to signal row affordance.
 *
 * API
 * ---
 * Compound-component pattern. Mirrors `<table>` semantics so a11y is free.
 *
 *   <Table>
 *     <Table.Head>
 *       <Table.Row>
 *         <Table.HeaderCell sortable>Keyword</Table.HeaderCell>
 *         <Table.HeaderCell sortable align="right">Prompt Volume</Table.HeaderCell>
 *       </Table.Row>
 *     </Table.Head>
 *     <Table.Body>
 *       {rows.map(r => (
 *         <Table.Row key={r.id}>
 *           <Table.Cell>{r.name}</Table.Cell>
 *           <Table.Cell align="right" numeric>{r.value}</Table.Cell>
 *         </Table.Row>
 *       ))}
 *     </Table.Body>
 *   </Table>
 */

import {
  type HTMLAttributes,
  type ReactNode,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
} from "react";
import { ArrowsUpDownIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

type Align = "left" | "right" | "center";

/* -------------------------------------------------------- Table (root) */

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  children: ReactNode;
  /** Strip the outer border + rounded corners (e.g. when embedded in a Card). */
  bare?: boolean;
}

function TableRoot({ className, children, bare, ...rest }: TableProps) {
  return (
    <div
      className={cn(
        "overflow-hidden",
        !bare && "rounded-8 border border-fill-quaternary",
      )}
    >
      <table
        className={cn("w-full border-collapse", className)}
        {...rest}
      >
        {children}
      </table>
    </div>
  );
}

/* -------------------------------------------------------- Table.Head */

function TableHead({
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead className={cn("bg-bg-tertiary", className)} {...rest}>
      {children}
    </thead>
  );
}

/* -------------------------------------------------------- Table.Body */

function TableBody({
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody
      className={cn(
        // Subtle hover for every body row. Scoped to `<tbody>` so header
        // rows don't pick it up.
        "[&_tr]:transition-colors [&_tr:hover]:bg-bg-tertiary/40",
        className,
      )}
      {...rest}
    >
      {children}
    </tbody>
  );
}

/* -------------------------------------------------------- Table.Row */

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  /** Make the row look clickable (cursor + hover bg). */
  interactive?: boolean;
}

function TableRow({
  className,
  interactive,
  children,
  ...rest
}: TableRowProps) {
  return (
    <tr
      className={cn(
        "border-b border-fill-quaternary last:border-b-0",
        // Hover bg is applied at the tbody level so it doesn't bleed into
        // the header row. Here we only add the cursor when row is clickable.
        interactive && "cursor-pointer",
        className,
      )}
      {...rest}
    >
      {children}
    </tr>
  );
}

/* -------------------------------------------------------- Table.HeaderCell */

export interface TableHeaderCellProps
  extends ThHTMLAttributes<HTMLTableCellElement> {
  /** Show a sort indicator. The parent owns the actual sort state. */
  sortable?: boolean;
  /** Current sort direction (omit for unsorted). */
  sortDirection?: "asc" | "desc";
  align?: Align;
  /** Width hint (e.g. "200px" or "30%"). */
  width?: string | number;
}

function TableHeaderCell({
  className,
  sortable,
  sortDirection,
  align = "left",
  width,
  children,
  ...rest
}: TableHeaderCellProps) {
  const content = sortable ? (
    <button
      type="button"
      className={cn(
        "inline-flex items-center gap-4",
        "text-mini font-medium text-text-tertiary",
        // Tailwind v4 preflight resets <button> cursor — opt back in.
        "cursor-pointer",
        "hover:text-text-primary transition-colors",
        "focus-visible:outline-none focus-visible:text-text-primary",
      )}
    >
      {children}
      <ArrowsUpDownIcon
        className={cn(
          "size-12 shrink-0",
          sortDirection && "text-text-primary",
        )}
      />
    </button>
  ) : (
    <span className="text-mini font-medium text-text-tertiary">{children}</span>
  );

  return (
    <th
      scope="col"
      style={width ? { width } : undefined}
      className={cn(
        "px-16 py-10",
        "border-b border-fill-quaternary",
        align === "right" && "text-right",
        align === "center" && "text-center",
        align === "left" && "text-left",
        className,
      )}
      {...rest}
    >
      {content}
    </th>
  );
}

/* -------------------------------------------------------- Table.Cell */

export interface TableCellProps
  extends TdHTMLAttributes<HTMLTableCellElement> {
  align?: Align;
  /** Apply tabular-nums + medium weight (for monetary / count columns). */
  numeric?: boolean;
  /** Dim the cell to the secondary text color. */
  muted?: boolean;
}

function TableCell({
  className,
  align = "left",
  numeric,
  muted,
  children,
  ...rest
}: TableCellProps) {
  return (
    <td
      className={cn(
        "px-16 py-16 text-small",
        muted ? "text-text-secondary" : "text-text-primary",
        align === "right" && "text-right",
        align === "center" && "text-center",
        align === "left" && "text-left",
        numeric && "tabular-nums font-medium",
        className,
      )}
      {...rest}
    >
      {children}
    </td>
  );
}

/* -------------------------------------------------------- Export */

export const Table = Object.assign(TableRoot, {
  Head: TableHead,
  Body: TableBody,
  Row: TableRow,
  HeaderCell: TableHeaderCell,
  Cell: TableCell,
});
