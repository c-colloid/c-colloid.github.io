---
outline: deep
---

# 更新履歴

<script setup>
import { data } from './changelog.data'
</script>

<Changelog :data="data">
  <template #fallback>
    <div class="custom-block info">
      <p class="custom-block-title">取得できませんでした</p>
      <p>GitHubから更新履歴を取得できませんでした。
      最新情報は<a href="https://github.com/c-colloid/PBReplacer-VPM/releases">GitHubのリリース一覧</a>をご確認ください。</p>
    </div>
  </template>
</Changelog>
