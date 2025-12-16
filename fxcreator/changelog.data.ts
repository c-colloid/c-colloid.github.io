import { fetchChangelog } from '../.vitepress/utils/changelog'

export default {
  async load() {
    return await fetchChangelog('FXCreator')
  }
}
