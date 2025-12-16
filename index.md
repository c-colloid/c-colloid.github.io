---
layout: home

hero:
  name: "FUTEIKEI Tools"
  text: "アバター制作を、もっとシンプルに"
  tagline: VRChat向けUnity拡張ツール
  actions:
    - theme: brand
      text: はじめる
      link: /boneselector/getting-started
    - theme: alt
      text: GitHub
      link: https://github.com/c-colloid

features:
  - icon: 🦴
    title: BoneSelector
    details: シーン上でボーンを可視化・選択。PhysBone設定やボーン操作を効率化
    link: /boneselector/
    linkText: ドキュメント →
  - icon: 🔄
    title: PBReplacer
    details: PhysBoneをアーマチュアから分離。一括編集やQuest対応を簡単に
    link: /pbreplacer/
    linkText: ドキュメント →
  - icon: 🎛️
    title: FXCreator
    details: FXレイヤーの作成を補助。アニメーション設定を効率化
    link: /fxcreator/
    linkText: ドキュメント →
  - icon: 👄
    title: LipSyncSetter
    details: リップシンクの設定を補助。表情設定を簡単に
    link: /lipsyncsetter/
    linkText: ドキュメント →
---

<div class="home-content">

## インストール

VRChat Creator Companion (VCC) にリポジトリを追加してください。

```
https://c-colloid.github.io/vpm/index.json
```

**Settings** → **Packages** → **Add Repository** からURLを追加し、プロジェクトでパッケージを有効化します。

</div>

<style>
.home-content {
  max-width: 688px;
  margin: 0 auto;
  padding: 48px 24px 64px;
}

.home-content h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.home-content p {
  font-size: 0.9375rem;
  color: var(--vp-c-text-2);
  line-height: 1.7;
  margin-bottom: 16px;
}

.home-content pre {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  font-size: 0.875rem;
}

.home-content code {
  color: var(--vp-c-brand-1);
}
</style>
