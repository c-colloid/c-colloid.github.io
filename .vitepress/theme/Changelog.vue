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
}

defineProps<{
  data: ChangelogData
}>()
</script>

<template>
  <div class="changelog">
    <div v-if="data.error" class="error">
      <div class="custom-block warning">
        <p class="custom-block-title">取得エラー</p>
        <p>CHANGELOG.mdの取得に失敗しました: {{ data.error }}</p>
      </div>
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
          <span v-if="entry.date" class="date">{{ entry.date }}</span>
        </h2>
        <div class="content" v-html="formatContent(entry.content)"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
function formatContent(content: string): string {
  // 簡易的なMarkdown変換
  return content
    .split('\n')
    .map(line => {
      // リスト項目
      if (line.match(/^[-*]\s/)) {
        return `<li>${line.replace(/^[-*]\s/, '')}</li>`
      }
      // 空行
      if (line.trim() === '') {
        return ''
      }
      return `<p>${line}</p>`
    })
    .join('')
    .replace(/(<li>.*<\/li>)+/g, '<ul>$&</ul>')
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
</style>
