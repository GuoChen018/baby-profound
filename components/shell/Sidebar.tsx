"use client";

/**
 * Sidebar — Profound left navigation rail.
 *
 * Anatomy (see `_reference/figma/01-components/sidebar/design-context.md`):
 *   - 232px wide, bg-bg-secondary, 0.5px right border, p-12
 *   - Workspace switcher row at top (avatar + name + chevron)
 *   - Sections separated by tertiary-text section headers
 *   - Selected tab: bg-control-selected (Figma value) + text-primary
 *   - Footer with 3 small icon buttons (settings / help / sidebar-toggle)
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BeakerIcon,
  ChevronDoubleLeftIcon,
  ChevronUpDownIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
} from "@/components/ui/icons";
import { Favicon } from "@/components/ui";
import { cn } from "@/lib/cn";
import { navSections, searchItem } from "./nav";
import { usePalette } from "./PrototypePaletteProvider";

export interface SidebarProps {
  workspaceName?: string;
  /** Domain used to fetch the workspace favicon (e.g. "brex.com"). The
   *  avatar slot falls back to a tinted letter monogram when the favicon
   *  fails to load. */
  workspaceDomain?: string;
}

export function Sidebar({
  workspaceName = "Brex",
  workspaceDomain = "brex.com",
}: SidebarProps) {
  const pathname = usePathname();
  const SearchIcon = searchItem.icon;
  const palette = usePalette();

  return (
    <aside
      className={cn(
        "shrink-0 w-232 h-full",
        "bg-bg-secondary",
        "border-r-[0.5px] border-fill-quaternary",
        "flex flex-col justify-between",
        "p-12",
      )}
    >
      <div className="space-y-12">
        {/* Workspace switcher */}
        <button
          type="button"
          className={cn(
            "w-full inline-flex items-center gap-7 px-10",
            "h-32 rounded-6",
            "cursor-pointer",
            "hover:bg-bg-tertiary transition-colors",
            "focus-visible:outline-none focus-visible:shadow-focus",
          )}
        >
          {/* Workspace avatar — fetch the favicon for the workspace's
              canonical domain. `Favicon` handles its own fallback (DDG →
              Google → monogram), so this gracefully degrades if no icon
              service responds. */}
          <Favicon
            domain={workspaceDomain}
            size={18}
            fallbackLabel={workspaceName}
            className="rounded-4"
          />
          <span className="flex-1 text-left text-small font-medium text-text-primary truncate">
            {workspaceName}
          </span>
          <ChevronUpDownIcon
            aria-hidden
            className="size-16 text-text-tertiary shrink-0"
          />
        </button>

        {/* Search row — opens the prototype palette. The product's own search
            isn't wired up in this sandbox yet, so we repurpose the affordance
            for the cmd+K palette. */}
        <button
          type="button"
          onClick={() => palette.setOpen(true)}
          className={cn(
            "w-full inline-flex items-center gap-8 px-10",
            "h-32 rounded-6",
            "cursor-pointer",
            "bg-control-bg shadow-flat",
            "text-text-tertiary",
            "hover:text-text-secondary",
            "focus-visible:outline-none focus-visible:shadow-focus",
          )}
        >
          <SearchIcon aria-hidden className="size-16 shrink-0" />
          <span className="flex-1 text-left text-small">{searchItem.placeholder}</span>
          <kbd className="text-micro font-medium text-text-tertiary bg-bg-tertiary rounded-4 px-4 py-2">
            {searchItem.hint}
          </kbd>
        </button>

        {/* Sections.
         *
         * Items inside a section sit on a `space-y-4` rhythm (matches Figma
         * `1:17682`'s `gap-[4px]`). We deviate from Figma by adding extra
         * breathing room BETWEEN sections (`space-y-20` on the nav) per
         * user feedback — Figma packs sections at 12px which still reads as
         * one continuous list. The bigger gap makes "Analytics / Action /
         * Context" feel like distinct groups. */}
        <nav className="space-y-20">
          {navSections.map((section) => (
            <div key={section.id} className="space-y-4">
              {section.title ? (
                <p className="text-mini font-medium text-text-tertiary px-10 pb-6">
                  {section.title}
                </p>
              ) : null}
              <ul className="space-y-4">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const itemHref = item.href;
                  // Root-of-app nav items must only highlight on exact
                  // pathname matches — without this, "Overview" would
                  // light up for every nested route because they all
                  // `startsWith("/")`.
                  const isRoot = itemHref === "/";
                  const active = isRoot
                    ? pathname === itemHref
                    : pathname === itemHref ||
                      pathname?.startsWith(`${itemHref}/`);
                  return (
                    <li key={item.id}>
                      <Link
                        href={itemHref}
                        className={cn(
                          "group flex items-center gap-8 px-10 h-32 rounded-8",
                          "text-small font-medium",
                          "transition-colors",
                          "focus-visible:outline-none focus-visible:shadow-focus",
                          active
                            ? "bg-control-selected text-text-primary"
                            : "text-text-secondary hover:bg-bg-tertiary hover:text-text-primary",
                        )}
                      >
                        <Icon
                          aria-hidden
                          className={cn(
                            "size-16 shrink-0",
                            active ? "text-text-primary" : "text-text-secondary",
                          )}
                        />
                        <span className="flex-1 truncate">{item.label}</span>
                        {item.flag === "beta" ? (
                          <span className="text-mini font-medium px-6 py-2 rounded-4 text-accent-beta bg-accent-beta/10">
                            Beta
                          </span>
                        ) : null}
                        {item.flag === "alpha" ? (
                          <span className="text-mini font-medium px-6 py-2 rounded-4 text-badge-purple-emphasis bg-badge-purple-muted">
                            Alpha
                          </span>
                        ) : null}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-4 px-6 pt-12">
        <FooterIcon icon={<Cog6ToothIcon className="size-16" />} label="Settings" />
        <FooterIcon
          icon={<QuestionMarkCircleIcon className="size-16" />}
          label="Help"
        />
        <FooterIcon
          href="/explorations"
          icon={<BeakerIcon className="size-16" />}
          label="Explorations"
          active={pathname?.startsWith("/explorations")}
        />
        <FooterIcon
          icon={<ChevronDoubleLeftIcon className="size-16" />}
          label="Collapse sidebar"
        />
      </div>
    </aside>
  );
}

type FooterIconProps = {
  icon: React.ReactNode;
  label: string;
  href?: string;
  active?: boolean;
};

function FooterIcon({ icon, label, href, active }: FooterIconProps) {
  const className = cn(
    "inline-flex items-center justify-center",
    "size-28 rounded-6",
    "cursor-pointer",
    "transition-colors",
    "focus-visible:outline-none focus-visible:shadow-focus",
    active
      ? "bg-bg-tertiary text-text-primary"
      : "text-text-tertiary hover:bg-bg-tertiary hover:text-text-primary",
  );

  if (href) {
    return (
      <Link href={href} aria-label={label} className={className}>
        {icon}
      </Link>
    );
  }

  return (
    <button type="button" aria-label={label} className={className}>
      {icon}
    </button>
  );
}
