/**
 * Icon barrel — Profound icons sourced directly from Figma.
 *
 * Strategy:
 *   - Sidebar tab icons are inlined Figma SVGs (already filled glyphs).
 *   - "Conceptual" heroicons (bolt, chart, sparkles, envelope, etc.) come
 *     from `@heroicons/react/24/solid` — the actual Profound product uses
 *     filled glyphs across the app, not outlines.
 *   - Chrome-only glyphs (chevrons, sort arrows, external-link, search,
 *     plus, x-mark) stay on `@heroicons/react/24/outline` since solid
 *     versions of arrows / chevrons look too heavy.
 *   - All icons render at size-16 and inherit `currentColor`.
 */

export {
  // Profound nav glyphs — extracted from Figma 1:17682
  OverviewIcon,
  AskIcon,
  PromptVolumesIcon,
  ConversationsIcon, // alias for chat-bubble-left-right
  AnswerEngineIcon,
  BrandIcon, // alias for AnswerEngineIcon
  AgentAnalyticsIcon,
  WebsiteIcon, // alias for AgentAnalyticsIcon
  ShoppingIcon,
  AgentsIcon,
  SheetsIcon,
  ContentIcon,
  OpportunitiesIcon,
  KnowledgeBaseIcon,
  SupportIcon,
  CopilotIcon,
} from "./profound";

// ─── Heroicons SOLID (conceptual / filled glyphs used across the UI) ───

export {
  BoltIcon, // Answer Engine Insights
  ChartBarSquareIcon, // Dashboards
  Squares2X2Icon, // Generic grid

  ChartBarIcon, // Bar chart toggle in KPI panels
  PresentationChartLineIcon, // Line chart toggle in KPI panels
  ArrowDownTrayIcon, // Download

  Cog6ToothIcon, // Settings
  QuestionMarkCircleIcon, // Help / support hub
  InformationCircleIcon, // Inline info tooltip target
  MagnifyingGlassIcon, // Search
  HashtagIcon,
  SparklesIcon, // AI / summary

  CheckCircleIcon,
  XCircleIcon,
  XMarkIcon,
  PlusIcon,
  EyeIcon,
  RssIcon,

  EnvelopeIcon, // Outreach
  PencilIcon, // Content Creation
  DocumentTextIcon, // Create Content Brief
  ChatBubbleLeftRightIcon, // Reddit / LinkedIn / general chat
  BeakerIcon, // Explorations / sandbox
  PlayIcon, // Run / Run test
  TrashIcon, // Delete input chip in editor
  CommandLineIcon, // Code node category
  PuzzlePieceIcon, // Integrations node category
  Cog8ToothIcon, // Logic node category
  GlobeAltIcon, // Web Research node category
} from "@heroicons/react/24/solid";

// ─── Heroicons OUTLINE (chevrons + arrows — filled versions look wrong) ───

export {
  ChevronUpDownIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronDoubleLeftIcon,
  ArrowTopRightOnSquareIcon, // External-link arrow (boxed)
  ArrowRightIcon, // CTA right arrow
  ArrowUpRightIcon, // Preferred "external"/"open in" glyph — no surrounding box
  ArrowsUpDownIcon, // Sort indicator
  ArrowLeftIcon, // Editor back button
  ArrowUturnLeftIcon, // Editor undo
  ArrowUturnRightIcon, // Editor redo
  EllipsisHorizontalIcon, // Editor overflow menu
  MinusIcon,
  ArrowsPointingOutIcon, // Editor fit-to-screen / fullscreen
  HandRaisedIcon, // Editor pan tool
} from "@heroicons/react/24/outline";
