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
  /* VitePressの他の要素と同じ高さに揃える */
  height: var(--vp-nav-height);
}

.nav-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 0 12px;
  height: 32px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: color 0.25s, background-color 0.25s;
}

.nav-link:hover {
  color: var(--vp-c-brand-1);
  background-color: var(--vp-c-default-soft);
}

.nav-link.active {
  color: var(--vp-c-brand-1);
}

/* ホームリンク - アイコンのみ */
.nav-link.home-link {
  padding: 0 8px;
}

.nav-icon {
  flex-shrink: 0;
  opacity: 0.85;
}

.nav-link:hover .nav-icon,
.nav-link.active .nav-icon {
  opacity: 1;
}

.nav-text {
  line-height: 32px;
}

/* 分割線 */
.nav-divider {
  width: 1px;
  height: 24px;
  background-color: var(--vp-c-divider);
  margin: 0 8px;
}

/* タブレット以下で非表示（ハンバーガーメニューを使用） */
@media (max-width: 959px) {
  .custom-nav {
    display: none;
  }
}
</style>
