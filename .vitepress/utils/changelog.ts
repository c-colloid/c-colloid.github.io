// CHANGELOG を GitHub から取得するユーティリティ

interface ChangelogEntry {
  version: string
  date: string
  content: string
}

interface ChangelogData {
  entries: ChangelogEntry[]
  raw: string
  error?: string
  // 表示件数を絞った場合の、省略した件数と全文へのリンク
  omitted?: number
  sourceUrl?: string
}

interface FetchOptions {
  repo: string
  path?: string  // デフォルト: CHANGELOG.md
  branch?: string  // デフォルト: main
  limit?: number  // 表示する最大件数（省略時は全件）
}

// リポジトリ設定
const REPO_CONFIG: Record<string, FetchOptions> = {
  'BoneSelector': {
    repo: 'BoneSelector-VPM',
    path: 'Packages/jp.colloid.boneselector/ChangeLog.md'
  },
  'PBReplacer': {
    repo: 'PBReplacer-VPM',
    path: 'ChangeLog.txt'
  },
  'LipSyncSetter': {
    repo: 'LipSyncSetter',
    path: 'CHANGELOG.md'
  },
  'UITKFontFix': {
    repo: 'UITKFontFix',
    path: 'jp.colloid.uitk-font-fix/CHANGELOG.md'
  },
  'AgentPanel': {
    repo: 'AgentPanelForUnity',
    path: 'jp.colloid.unity-agent-panel/CHANGELOG.md',
    limit: 10
  },
  // FXCreater用（複数Changelog対応）
  'FXCreater-EyeJiggling': {
    repo: 'FXCreater',
    path: 'EyeJigglingGenerator/Changelog.md'
  },
  'FXCreater-ExpressionParams': {
    repo: 'FXCreater',
    path: 'VRCExpressionParameters/Changelog.md'
  },
  'FXCreater-ClipGenerator': {
    repo: 'FXCreater',
    path: 'ClipGenerator/Changelog.md'
  }
}

export async function fetchChangelog(toolName: string): Promise<ChangelogData> {
  const config = REPO_CONFIG[toolName]

  if (!config) {
    return {
      entries: [],
      raw: '',
      error: `Unknown tool: ${toolName}`
    }
  }

  const branch = config.branch || 'main'
  const path = config.path || 'CHANGELOG.md'
  const url = `https://raw.githubusercontent.com/c-colloid/${config.repo}/${branch}/${path}`

  try {
    const response = await fetch(url)

    if (!response.ok) {
      return {
        entries: [],
        raw: '',
        error: `Failed to fetch: ${response.status}`
      }
    }

    const raw = await response.text()
    const all = parseChangelog(raw)
    const entries = config.limit ? all.slice(0, config.limit) : all

    return {
      entries,
      // 全文はページに埋め込まない（巨大なCHANGELOGでページが重くなるため）
      raw: '',
      omitted: all.length - entries.length,
      sourceUrl: `https://github.com/c-colloid/${config.repo}/blob/${branch}/${path}`
    }
  } catch (e) {
    return {
      entries: [],
      raw: '',
      error: e instanceof Error ? e.message : 'Unknown error'
    }
  }
}

// 複数のChangelogを取得して統合
export async function fetchMultipleChangelogs(toolNames: string[]): Promise<ChangelogData> {
  const results = await Promise.all(toolNames.map(name => fetchChangelog(name)))

  const allEntries: ChangelogEntry[] = []
  const errors: string[] = []

  for (let i = 0; i < results.length; i++) {
    const result = results[i]
    const toolName = toolNames[i].replace('FXCreater-', '')

    if (result.error) {
      errors.push(`${toolName}: ${result.error}`)
    } else {
      // 各エントリにツール名を追加
      for (const entry of result.entries) {
        allEntries.push({
          ...entry,
          version: `${toolName} ${entry.version}`
        })
      }
    }
  }

  return {
    entries: allEntries,
    raw: '',
    error: errors.length > 0 ? errors.join(', ') : undefined
  }
}

// 見出し行からバージョンと日付を取り出す。対応フォーマット:
//   ## [1.4.1] - 2024-01-15 / ## [1.4.1]2024.12.18 / ## 1.4.1 - 2024-01-15 / ## v1.4.1
//   [3.0.0]2026.09.09（"##" なしのテキスト形式）
function matchHeading(line: string): { version: string; date: string } | null {
  const m =
    line.match(/^##\s+\[v?(\d[^\]]*)\]\s*-?\s*(.*)$/) ||
    line.match(/^##\s+v?(\d\S*)\s*-?\s*(.*)$/) ||
    line.match(/^\[v?(\d[^\]]*)\]\s*-?\s*(.*)$/)
  if (!m) return null
  return { version: m[1].trim(), date: m[2].trim() }
}

function parseChangelog(content: string): ChangelogEntry[] {
  const entries: ChangelogEntry[] = []
  const lines = content.replace(/\r\n?/g, '\n').split('\n')
  // "##" 見出しを使わないテキスト形式では、各行を箇条書きとして扱う
  const plainText = !lines.some(line => /^##\s/.test(line))

  let currentEntry: ChangelogEntry | null = null
  let skipping = false
  let contentLines: string[] = []

  const flush = () => {
    if (currentEntry) {
      currentEntry.content = contentLines.join('\n').trim()
      entries.push(currentEntry)
    }
    currentEntry = null
    contentLines = []
  }

  for (const line of lines) {
    const heading = matchHeading(line)

    if (heading) {
      flush()
      skipping = false
      currentEntry = { version: heading.version, date: heading.date, content: '' }
    } else if (/^##\s/.test(line)) {
      // [Unreleased] などバージョンではない見出しは読み飛ばす
      flush()
      skipping = true
    } else if (currentEntry && !skipping) {
      if (plainText && line.trim() !== '') {
        const sub = line.match(/^\s+[-*]\s+(.*)$/)
        contentLines.push(sub ? `  - ${sub[1]}` : `- ${line.trim().replace(/^[-*]\s+/, '')}`)
      } else {
        contentLines.push(line)
      }
    }
  }
  flush()

  return entries
}

// GitHubリポジトリURL取得
export function getGitHubUrl(toolName: string): string {
  const config = REPO_CONFIG[toolName]
  if (!config) {
    return 'https://github.com/c-colloid'
  }
  return `https://github.com/c-colloid/${config.repo}`
}
