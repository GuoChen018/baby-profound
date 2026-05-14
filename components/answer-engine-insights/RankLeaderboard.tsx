/**
 * RankLeaderboard — competitor ranking card.
 *
 * Used next to charts on AEI (Visibility, Share of Voice, Average Position).
 * Source: `_reference/profound/answer-engine-insights/notes.md` ("rank table
 * — Asset · Visibility Score · delta — with `#1` rank flag at the top").
 */

import type { RankRow } from "@/lib/types/answer-engine-insights";
import { Delta, Favicon, Tag } from "@/components/ui";
import { cn } from "@/lib/cn";

export interface RankLeaderboardProps {
  /** Headline rank shown above the table (e.g. "#1"). */
  rank: number;
  /** Column heading on the right (e.g. "Visibility Score"). */
  metricLabel: string;
  rows: RankRow[];
  /** Footer slot — usually an "Expand" link. */
  expandLabel?: string;
  className?: string;
}

export function RankLeaderboard({
  rank,
  metricLabel,
  rows,
  expandLabel = "Expand",
  className,
}: RankLeaderboardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-12",
        className,
      )}
    >
      <div className="flex items-baseline gap-8">
        <span className="text-title-regular font-semibold text-text-primary tabular-nums">
          #{rank}
        </span>
      </div>

      <table className="w-full text-small">
        <thead>
          <tr className="text-mini text-text-tertiary">
            <th className="pb-8 text-left font-medium w-20">#</th>
            <th className="pb-8 text-left font-medium">Asset</th>
            <th className="pb-8 text-right font-medium">{metricLabel}</th>
            <th className="pb-8 text-right font-medium w-60">Δ</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.id}
              className="border-t border-fill-quaternary"
            >
              <td className="py-8 text-text-tertiary tabular-nums">{i + 1}.</td>
              <td className="py-8 text-text-primary">
                <span className="inline-flex items-center gap-6">
                  {row.domain ? (
                    <Favicon
                      domain={row.domain}
                      size={16}
                      fallbackLabel={row.asset}
                    />
                  ) : (
                    <span
                      aria-hidden
                      className="inline-block size-16 rounded-full bg-fill-tertiary shrink-0"
                    />
                  )}
                  <span>{row.asset}</span>
                  {row.isOwned ? (
                    <Tag size="sm" asSpan className="text-mini">
                      Owned
                    </Tag>
                  ) : null}
                </span>
              </td>
              <td className="py-8 text-right tabular-nums font-medium text-text-primary">
                {row.value}
              </td>
              <td className="py-8 text-right">
                {typeof row.delta === "number" && row.delta !== 0 ? (
                  <Delta value={row.delta} />
                ) : (
                  <span className="text-text-tertiary">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end">
        <button
          type="button"
          className="text-mini text-text-tertiary hover:text-text-primary transition-colors"
        >
          {expandLabel}
        </button>
      </div>
    </div>
  );
}
