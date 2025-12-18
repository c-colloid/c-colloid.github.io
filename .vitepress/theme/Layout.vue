<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import CustomNav from './CustomNav.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <!-- デフォルトメニューの位置（検索の後）にカスタムナビを配置 -->
    <template #nav-bar-content-after>
      <CustomNav />
    </template>
  </Layout>
</template>
