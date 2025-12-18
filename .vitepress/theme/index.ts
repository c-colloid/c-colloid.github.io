import DefaultTheme from 'vitepress/theme'
import Changelog from './Changelog.vue'
import Layout from './Layout.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('Changelog', Changelog)
  }
}
