# Figma capture errors (resolved)

## Stale node IDs in original README

The README's table used `1:xxxx` node IDs that no longer exist in the file (the file was edited and the canvas duplicated, so node IDs shifted to the `2:xxxx` namespace). The IDs that did happen to resolve via the `1:` prefix (Buttons, Color, Input, etc.) seem to be backwards-compatible, but several frames returned `node ID provided was invalid`.

These were resolved by re-fetching `get_metadata` against canvas `0:1` and remapping each frame name to its current `2:xxxx` ID. Resolved mappings live in `README.md`.

| Original (stale) | Current | Status |
|---|---|---|
| `1:8719` Toast | `2:10155` | ✓ captured |
| `1:8758` Tooltip | `2:10194` | ✓ captured |
| `1:8849` Inline tooltip | `2:10285` | ✓ captured |
| `1:6907` Stepper | `2:8343` | ✓ captured |
| `1:6923` Date Selector | `2:8359` | ✓ captured |
| `1:6874` Tab Bar | `2:8310` | ✓ captured |
| `1:6894` Search | `2:8330` | ✓ captured |
| `1:7407` Sidebar | `2:8843` | ✓ captured |
| `1:6938` Browser | `2:8374` | ✓ captured |
| `1:6992` Section Title | `2:8428` | ✓ captured |
| `1:6858` Cursor | `2:8294` | ✓ captured |
| `1:7001` Data Viz (main) | `2:8437` | ✓ captured |
| `1:7246` Data Viz (alt 1) | `2:8682` | ✓ captured |
| `1:7266` Data Viz (alt 2) | `2:8702` | ✓ captured |

## Frames not found at any ID

| Frame | Original ID | Notes |
|---|---|---|
| Starter screen | `1:16860` | Not present on the "Design System" canvas (`0:1`). Likely lives on a different page in the Figma file (the Profound Design Exercise file may have multiple canvases). Will attempt with original `1:16860` ID first; if that fails, mark as deferred. |
