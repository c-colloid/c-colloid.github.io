<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import CustomNav from './CustomNav.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #nav-bar-content-before>
      <CustomNav />
    </template>
  </Layout>
</template>
