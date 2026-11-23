<script setup lang="ts">
interface ChangelogEntry {
  version: string
  date: string
  content: string
}

interface ChangelogData {
  entries: ChangelogEntry[]
  raw: string
  error?: string
  omitted?: number
  sourceUrl?: string
}

defineProps<{
  data: ChangelogData
}>()
</script>

<template>
  <div class="changelog">
    <!-- エラー時はフォールバックスロットを表示 -->
    <div v-if="data.error">
      <slot name="fallback">
        <div class="custom-block warning">
          <p class="custom-block-title">取得エラー</p>
          <p>CHANGELOG.mdの取得に失敗しました: {{ data.error }}</p>
        </div>
      </slot>
    </div>

    <div v-else-if="data.entries.length === 0" class="empty">
      <div class="custom-block info">
        <p>更新履歴はまだありません。</p>
      </div>
    </div>

    <div v-else class="entries">
      <div v-for="entry in data.entries" :key="entry.version" class="entry">
        <h2 :id="entry.version.toLowerCase().replace(/\./g, '-')">
          {{ entry.version }}
          <span v-if="entry.date" class="date">({{ entry.date }})</span>
        </h2>
        <div class="content" v-html="formatContent(entry.content)"></div>
      </div>
      <p v-if="data.omitted && data.sourceUrl" class="more">
        これより前の {{ data.omitted }} 件は
        <a :href="data.sourceUrl" target="_blank" rel="noreferrer">GitHubのCHANGELOG</a>
        で確認できます。
      </p>
    </div>
  </div>
</template>

<script lang="ts">
function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

// インライン記法（コード・太字・リンク）だけを変換する
function inline(text: string): string {
  return escapeHtml(text)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')
}

interface Block {
  type: 'h3' | 'li' | 'p'
  indent: number
  text: string
}

// 折り返された行を前の行につなげる（英文は空白を挟み、和文はそのままつなぐ）
function joinLine(prev: string, next: string): string {
  const ascii = /[\x21-\x7e]$/.test(prev) && /^[\x21-\x7e]/.test(next)
  return prev + (ascii ? ' ' : '') + next
}

function formatContent(content: string): string {
  // 簡易的なMarkdown変換（見出し・入れ子の箇条書き・段落）
  const blocks: Block[] = []
  let open: Block | null = null

  for (const line of content.split('\n')) {
    if (line.trim() === '') {
      open = null
      continue
    }
    const heading = line.match(/^#{3,}\s+(.*)$/)
    const item = line.match(/^(\s*)[-*+]\s+(.*)$/)
    if (heading) {
      blocks.push({ type: 'h3', indent: 0, text: heading[1] })
      open = null
    } else if (item) {
      open = { type: 'li', indent: item[1].length, text: item[2] }
      blocks.push(open)
    } else if (open) {
      open.text = joinLine(open.text, line.trim())
    } else {
      open = { type: 'p', indent: 0, text: line.trim() }
      blocks.push(open)
    }
  }

  const html: string[] = []
  const depth: number[] = []  // 開いている <ul> のインデント幅
  const closeLists = (indent = -1) => {
    while (depth.length && depth[depth.length - 1] > indent) {
      html.push('</li></ul>')
      depth.pop()
    }
  }

  for (const block of blocks) {
    if (block.type === 'li') {
      closeLists(block.indent)
      if (depth.length && depth[depth.length - 1] === block.indent) {
        html.push('</li><li>')
      } else {
        html.push('<ul><li>')
        depth.push(block.indent)
      }
      html.push(inline(block.text))
    } else {
      closeLists()
      html.push(`<${block.type}>${inline(block.text)}</${block.type}>`)
    }
  }
  closeLists()

  return html.join('')
}
</script>

<style scoped>
.changelog .entry {
  margin-bottom: 32px;
}

.changelog h2 {
  font-size: 1.375rem;
  font-weight: 600;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.changelog .date {
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--vp-c-text-3);
  margin-left: 8px;
}

.changelog .content :deep(ul) {
  padding-left: 24px;
  margin: 12px 0;
}

.changelog .content :deep(li) {
  margin: 6px 0;
  color: var(--vp-c-text-2);
}

.changelog .content :deep(p) {
  margin: 8px 0;
  color: var(--vp-c-text-2);
}

.changelog .content :deep(h3) {
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 16px 0 8px 0;
}

.changelog .content :deep(li ul) {
  margin: 4px 0;
}

.changelog .more {
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
}

.changelog .content :deep(h3):first-child {
  margin-top: 0;
}
</style>
