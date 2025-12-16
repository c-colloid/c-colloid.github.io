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
}

interface FetchOptions {
  repo: string
  path?: string  // デフォルト: CHANGELOG.md
  branch?: string  // デフォルト: main
}

// リポジトリ設定
const REPO_CONFIG: Record<string, FetchOptions> = {
  'BoneSelector': {
    repo: 'BoneSelector-VPM',
    path: 'Packages/jp.colloid.boneselector/ChangeLog.md'
  },
  'PBReplacer': {
    repo: 'PBReplacer-VPM',
    path: 'Packages/jp.colloid.pbreplacer/ChangeLog.txt'
  },
  'LipSyncSetter': {
    repo: 'LipSyncSetter',
    path: 'CHANGELOG.md'
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
    const entries = parseChangelog(raw)

    return { entries, raw }
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

function parseChangelog(content: string): ChangelogEntry[] {
  const entries: ChangelogEntry[] = []
  const lines = content.split('\n')

  let currentEntry: ChangelogEntry | null = null
  let contentLines: string[] = []

  for (const line of lines) {
    // 複数のフォーマットに対応:
    // ## [1.4.1] - 2024-01-15
    // ## [1.4.1]2024.12.18
    // ## 1.4.1 - 2024-01-15
    // ## v1.4.1
    const match = line.match(/^##\s+\[?v?([^\]\s\-]+)\]?\s*[-]?\s*(.*)$/)

    if (match) {
      // 前のエントリを保存
      if (currentEntry) {
        currentEntry.content = contentLines.join('\n').trim()
        entries.push(currentEntry)
      }

      // 新しいエントリを開始
      currentEntry = {
        version: match[1],
        date: match[2]?.trim() || '',
        content: ''
      }
      contentLines = []
    } else if (currentEntry) {
      contentLines.push(line)
    }
  }

  // 最後のエントリを保存
  if (currentEntry) {
    currentEntry.content = contentLines.join('\n').trim()
    entries.push(currentEntry)
  }

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
