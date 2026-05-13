# Icons — `1:3081`

**Frame label**: "Icons" · header annotation: **`heroicons.com & custom`**
**Layout**: 6-column inventory grid, single line-weight outline icons.
**Render note**: Each row = `[icon glyph]  [name]` × 6 columns. Total ≈ 270+ icons.

## Source

The frame is largely **Heroicons** (https://heroicons.com) — Profound matches their naming exactly (`arrow-right`, `bell`, `chevron-down`, `clipboard-document`, `magnifying-glass`, `square-3-stack-3d`, etc.). A handful are custom additions (e.g. `Profound`-specific status glyphs, `pause`, `cursor-arrow-rays`, etc.).

## Mapping decision for the codebase

Because the inventory matches Heroicons names directly, in code we should:

1. **Use `lucide-react`** as already specified in `AGENTS.md` (`framer-motion`, `lucide-react`, `@floating-ui/react`). Lucide names overlap heavily with Heroicons (`ArrowRight`, `Bell`, `ChevronDown`, etc.) but a handful differ.
2. **For names that don't exist in Lucide** (e.g. `square-3-stack-3d`, `cursor-arrow-rays`), import the matching Heroicon from `@heroicons/react/24/outline` or vendor an SVG into `components/ui/icons/`.
3. **Sizing**: Heroicons `24/outline` is the natural match (the inventory glyphs visually look like 16–24px outline strokes).

## Inventory (every icon name visible in the screenshot)

Listed in the order they appear (left-to-right, top-to-bottom). 270 icons across ~45 rows × 6 columns.

```
academic-cap          adjustments-horizontal  adjustments-vertical    archive-box             archive-box-arrow-down  archive-box-x-mark
archive-box-arrow…    arrow-down              arrow-down-circle       arrow-down-left         arrow-down-on-square    arrow-down-on-square…
arrow-down-right      arrow-down-tray         arrow-left              arrow-left-circle       arrow-left-on-rect…     arrow-long-down
arrow-long-left       arrow-long-right        arrow-long-up           arrow-path              arrow-path-rounded-sq…  arrow-right
arrow-right-circle    arrow-right-end-on-…    arrow-right-start-on-…  arrow-top-right-on-sq…  arrow-trending-down     arrow-trending-up
arrow-turn-down-left  arrow-turn-down-right   arrow-turn-left-down    arrow-turn-left-up      arrow-turn-right-down   arrow-turn-right-up
arrow-turn-up-left    arrow-turn-up-right     arrow-up                arrow-up-circle         arrow-up-left           arrow-up-tray
arrow-up-on-square    arrow-up-on-square-…    arrow-up-right          arrow-uturn-down        arrow-uturn-left        arrow-uturn-right
arrow-uturn-up        arrows-pointing-in      arrows-pointing-out     at-symbol               backspace               backward
banknotes             bars-2                  bars-3                  bars-3-bottom-left      bars-3-bottom-right     bars-3-center-left
bars-4                bars-arrow-down         bars-arrow-up           banknotes               battery-0               battery-50
battery-100           beaker                  bell                    bell-alert              bell-slash              bell-snooze
bold                  bolt                    bolt-slash              book-open               bookmark                bookmark-slash
bookmark-square       briefcase               bug-ant                 building-library        building-office         building-office-2
building-storefront   cake                    calculator              calendar                calendar-date-range     calendar-days
camera                chart-bar               chart-bar-square        chart-pie               chat-bubble-bottom-…    chat-bubble-bottom-c…
chat-bubble-left      chat-bubble-left-…      chat-bubble-left-r…     chat-bubble-oval-left   chat-bubble-oval-left…  check
check-badge           check-circle            chevron-double-down     chevron-double-left     chevron-double-right    chevron-double-up
chevron-down          chevron-left            chevron-right           chevron-up              circle-stack            clipboard
clipboard-document    clipboard-document-…    clipboard-document-…    clock                   cloud                   cloud-arrow-down
cloud-arrow-up        code-bracket            code-bracket-square     command-line            cog                     cog-6-tooth
cog-8-tooth           computer-desktop        cpu-chip                cube                    cube-transparent        cog
credit-card           cube                    cube-transparent        currency-bangladeshi    currency-dollar         currency-euro
currency-pound        currency-rupee          currency-yen            cursor-arrow-rays      cursor-arrow-ripple     device-phone-mobile
device-tablet         divide                  document                document-arrow-down     document-arrow-up       document-chart-bar
document-check        document-currency-…     document-currency-d…    document-currency-e…    document-currency-p…    document-currency-y…
document-duplicate    document-magnifying-…   document-minus          document-plus           document-text           ellipsis-horizontal
ellipsis-horizontal-… ellipsis-vertical       envelope                envelope-open           equals                  exclamation-circle
exclamation-triangle  eye                     eye-dropper             eye-slash               face-frown              face-smile
film                  finger-print            fire                    flag                    folder                  folder-arrow-down
folder-minus          folder-open             folder-plus             forward                 funnel                  gift
gift-top              globe-alt               globe-americas          globe-asia-australia    globe-europe-africa     h1
h2                    h3                      hand-raised             hand-thumb-down         hand-thumb-up           hashtag
heart                 home                    home-modern             identification          inbox                   inbox-arrow-down
inbox-stack           information-circle      italic                  key                     language                lifebuoy
light-bulb            link                    link-slash              list-bullet             lock-closed             lock-open
magnifying-glass      magnifying-glass-minus  magnifying-glass-plus   magnifying-glass-circle map                     map-pin
megaphone             microphone              minus                   minus-circle            moon                    musical-note
newspaper             no-symbol               numbered-list           paint-brush             paper-airplane          paper-clip
pause                 pause-circle            pencil                  pencil-square           percent-badge           phone
phone-arrow-down-…    phone-arrow-up-right    phone-x-mark            photo                   play                    play-circle
play-pause            plus                    plus-circle             power                   presentation-chart-…    presentation-chart-l…
printer               puzzle-piece            qr-code                 question-mark-circle    queue-list              radio
receipt-percent       receipt-refund          rectangle-group         rectangle-stack         rocket-launch           rss
scale                 scissors                server                  server-stack            share                   shield-check
shield-exclamation    shopping-bag            shopping-cart           signal                  signal-slash            sparkles
speaker-x-mark        speaker-wave            square-2-stack          square-3-stack-3d       squares-2x2             squares-plus
squares-type          star                    stop                    stop-circle             strikethrough           sun
swatch                table-cells             tag                     ticket                  trash                   trophy
truck                 tv                      underline               user                    user-circle             user-group
user-minus             user-plus              users                   variable                video-camera            video-camera-slash
view-columns          viewfinder-circle       wallet                  wifi                    window                  wrench
wrench-screwdriver    x-circle                x-mark                  google-colored          microsoft-colored       fit-to-view
resize                expand                  collapse                check-mark              document-pdf            drag-and-drop
chevron-fill-right    chevron-fill-up         filter                  text                    select                  draft-wide
boolean               curly-brackets          brackets                secret                  workflow                schedule
loader                markdown                history                 pin                     conditional             arrows-pointing-up
numbers               cursor                  splitview-right         splitview-left          center                  …
```

> The list above is a manual transcription of the screenshot. For an authoritative count or to find a specific glyph, refer to `screenshot.png` directly.

## Categories observed

- **Navigation & arrows**: `arrow-*`, `chevron-*`, `arrows-pointing-*`, `arrow-uturn-*`, `arrow-turn-*`, `arrow-trending-*`, `splitview-*`
- **Documents & data**: `document*`, `clipboard*`, `chart-*`, `presentation-chart-*`, `table-cells`, `circle-stack`
- **Communication**: `bell*`, `chat-bubble-*`, `envelope*`, `phone*`, `inbox*`, `microphone`, `megaphone`
- **People**: `user`, `user-circle`, `user-group`, `users`, `face-smile`, `face-frown`, `hand-thumb-up`, `hand-thumb-down`
- **Status / signals**: `check`, `check-badge`, `check-circle`, `x-mark`, `x-circle`, `exclamation-*`, `information-circle`, `shield-*`, `bolt`, `signal*`, `sparkles`
- **Devices & tech**: `computer-desktop`, `device-phone-mobile`, `device-tablet`, `cpu-chip`, `cloud*`, `code-bracket*`, `command-line`, `cog*`, `wrench*`
- **Commerce / finance**: `banknotes`, `credit-card`, `currency-*`, `receipt-*`, `shopping-*`, `wallet`, `tag`
- **Media controls**: `play`, `play-circle`, `pause`, `stop`, `forward`, `backward`, `speaker-wave`, `speaker-x-mark`
- **Editor formatting**: `bold`, `italic`, `underline`, `strikethrough`, `h1`, `h2`, `h3`, `list-bullet`, `numbered-list`, `text`, `numbers`
- **Provider brand chips**: `google-colored`, `microsoft-colored` — the only multi-color icons in the inventory (everything else is monochrome outline).
- **Custom (likely Profound-specific)**: `splitview-left`, `splitview-right`, `fit-to-view`, `select`, `draft-wide`, `boolean`, `curly-brackets`, `brackets`, `secret`, `workflow`, `schedule`, `loader`, `markdown`, `history`, `pin`, `conditional`, `arrows-pointing-up`, `cursor`, `center`, `chevron-fill-right`, `chevron-fill-up`, `filter`, `numbers`

## Visual properties

- **Stroke**: ~1.5px outline (matches Heroicons `24/outline`)
- **Color**: Single fill, follows surrounding `text-*` color
- **Size**: Glyphs render at ~20–24px in the inventory
- **No filled variants** in this frame (no `*-solid` icons captured) — Profound appears to use the outline set exclusively.
