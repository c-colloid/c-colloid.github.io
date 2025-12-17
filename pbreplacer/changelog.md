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
      <p class="custom-block-title">手動管理</p>
      <p>GitHubからの自動取得に失敗したため、手動管理の内容を表示しています。
      最新情報は<a href="https://github.com/c-colloid/PBReplacer-VPM">GitHub</a>をご確認ください。</p>
    </div>
    <h2 id="v1-0-0">v1.0.0</h2>
    <ul>
      <li>初回リリース</li>
      <li>PhysBone一括置換機能</li>
      <li>プレハブ対応</li>
    </ul>
  </template>
</Changelog>
