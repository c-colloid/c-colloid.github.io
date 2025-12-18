<script setup lang="ts">
import { useData } from 'vitepress'
import { House, MousePointerClick, RefreshCcw, Sparkles, AudioLines } from 'lucide-vue-next'
import { computed } from 'vue'

const { page } = useData()

const navItems = [
  {
    text: 'ホーム',
    link: '/',
    icon: House,
    activeMatch: '^/$',
    isHome: true
  },
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

function isActive(item: { activeMatch?: string }) {
  if (!item.activeMatch) return false
  if (item.activeMatch === '^/$') {
    return currentPath.value === '/' || currentPath.value === ''
  }
  return currentPath.value.startsWith(item.activeMatch.replace(/\/$/, ''))
}
</script>

<template>
  <nav class="icon-nav" role="navigation" aria-label="メインナビゲーション">
    <a
      v-for="item in navItems"
      :key="item.link"
      :href="item.link"
      class="icon-nav-link"
      :class="{ active: isActive(item) }"
      :title="item.text"
      :aria-label="item.text"
      :aria-current="isActive(item) ? 'page' : undefined"
    >
      <component
        :is="item.icon"
        class="icon-nav-icon"
        :size="18"
        :stroke-width="1.75"
      />
      <span class="icon-nav-text">{{ item.text }}</span>
    </a>
  </nav>
</template>

<style scoped>
.icon-nav {
  display: flex;
  align-items: center;
  gap: 2px;
  margin-left: 16px;
  padding-left: 16px;
  border-left: 1px solid var(--vp-c-divider);
  height: var(--vp-nav-height);
}

.icon-nav-link {
  display: inline-flex;
  align-items: center;
  height: 36px;
  padding: 0 10px;
  border-radius: 8px;
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition:
    color 0.2s ease,
    background-color 0.2s ease,
    padding 0.25s ease;
  overflow: hidden;
}

.icon-nav-link:hover {
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-default-soft);
  padding: 0 14px 0 10px;
}

.icon-nav-link.active {
  color: var(--vp-c-brand-1);
}

.icon-nav-link.active:hover {
  background-color: var(--vp-c-brand-soft);
}

.icon-nav-icon {
  flex-shrink: 0;
  transition: transform 0.2s ease;
}

.icon-nav-link:hover .icon-nav-icon {
  transform: scale(1.05);
}

.icon-nav-text {
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  max-width: 0;
  opacity: 0;
  overflow: hidden;
  transition:
    max-width 0.25s ease,
    opacity 0.2s ease,
    margin 0.25s ease;
  margin-left: 0;
}

.icon-nav-link:hover .icon-nav-text {
  max-width: 120px;
  opacity: 1;
  margin-left: 8px;
}

/* 959px以下で非表示（VitePressのモバイルメニューを使用） */
@media (max-width: 959px) {
  .icon-nav {
    display: none;
  }
}
</style>
