<script setup lang="ts">
import { useData } from 'vitepress'
import { House, MousePointerClick, RefreshCcw, Sparkles, AudioLines } from 'lucide-vue-next'
import { computed } from 'vue'

const { page } = useData()

// ナビゲーション定義
const navItems = [
  {
    text: '',
    link: '/',
    icon: House,
    activeMatch: '^/$',
    isHome: true
  },
  { type: 'divider' as const },
  {
    text: 'BoneSelector',
    link: '/boneselector/',
    icon: MousePointerClick,
    activeMatch: '/boneselector/'
  },
  {
    text: 'PBReplacer',
    link: '/pbreplacer/',
    icon: RefreshCcw,
    activeMatch: '/pbreplacer/'
  },
  {
    text: 'FXCreator',
    link: '/fxcreator/',
    icon: Sparkles,
    activeMatch: '/fxcreator/'
  },
  {
    text: 'LipSyncSetter',
    link: '/lipsyncsetter/',
    icon: AudioLines,
    activeMatch: '/lipsyncsetter/'
  },
]

const currentPath = computed(() => '/' + page.value.relativePath.replace(/\.md$/, '').replace(/index$/, ''))

function isActive(item: { activeMatch?: string; link?: string }) {
  if (!item.activeMatch) return false
  if (item.activeMatch === '^/$') {
    return currentPath.value === '/' || currentPath.value === ''
  }
  return currentPath.value.startsWith(item.activeMatch.replace(/\/$/, ''))
}
</script>

<template>
  <nav class="custom-nav">
    <template v-for="(item, index) in navItems" :key="index">
      <span v-if="item.type === 'divider'" class="nav-divider" aria-hidden="true"></span>
      <a
        v-else
        :href="item.link"
        class="nav-link"
        :class="{
          active: isActive(item),
          'home-link': item.isHome
        }"
        :aria-label="item.isHome ? 'ホーム' : item.text"
      >
        <component :is="item.icon" class="nav-icon" :size="item.isHome ? 18 : 15" :stroke-width="item.isHome ? 2 : 1.75" />
        <span v-if="!item.isHome" class="nav-text">{{ item.text }}</span>
      </a>
    </template>
  </nav>
</template>

<style scoped>
.custom-nav {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: 16px;
  padding-left: 16px;
  border-left: 1px solid var(--vp-c-divider);
}

.nav-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition: color 0.2s ease, background-color 0.2s ease;
}

.nav-link:hover {
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-soft);
}

.nav-link.active {
  color: var(--vp-c-brand-1);
}

.nav-link.active:hover {
  background-color: var(--vp-c-brand-soft);
}

/* ホームリンク - アイコンのみ */
.nav-link.home-link {
  padding: 6px 8px;
}

.nav-link.home-link:hover {
  color: var(--vp-c-brand-1);
}

.nav-icon {
  flex-shrink: 0;
}

.nav-text {
  line-height: 1;
}

/* 分割線 */
.nav-divider {
  width: 1px;
  height: 16px;
  background-color: var(--vp-c-divider);
  margin: 0 8px;
}

/* モバイル対応 - ナビを非表示 */
@media (max-width: 768px) {
  .custom-nav {
    display: none;
  }
}
</style>
