import DefaultTheme from 'vitepress/theme'
import Changelog from './Changelog.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Changelog', Changelog)
  }
}
