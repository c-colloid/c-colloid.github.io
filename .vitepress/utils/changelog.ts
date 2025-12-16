// CHANGELOG.md を GitHub から取得するユーティリティ

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

export async function fetchChangelog(repo: string): Promise<ChangelogData> {
  const url = `https://raw.githubusercontent.com/c-colloid/${repo}/main/CHANGELOG.md`

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

function parseChangelog(content: string): ChangelogEntry[] {
  const entries: ChangelogEntry[] = []

  // ## [version] - date または ## version - date 形式をパース
  const versionRegex = /^##\s+\[?([^\]\s]+)\]?(?:\s*-\s*(.+))?$/gm
  const lines = content.split('\n')

  let currentEntry: ChangelogEntry | null = null
  let contentLines: string[] = []

  for (const line of lines) {
    const match = line.match(/^##\s+\[?([^\]\s\]]+)\]?(?:\s*-\s*(.+))?$/)

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

export function formatChangelogMarkdown(data: ChangelogData): string {
  if (data.error) {
    return `::: warning 取得エラー
CHANGELOG.mdの取得に失敗しました: ${data.error}
:::

[GitHubで確認する](https://github.com/c-colloid/) でリポジトリを確認してください。`
  }

  if (data.entries.length === 0) {
    return `::: info
更新履歴はまだありません。
:::`
  }

  let markdown = ''

  for (const entry of data.entries) {
    const dateStr = entry.date ? ` - ${entry.date}` : ''
    markdown += `## ${entry.version}${dateStr}\n\n`
    markdown += `${entry.content}\n\n`
  }

  return markdown
}
