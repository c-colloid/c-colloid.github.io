# BoneSelector

> シーン上でアバターのボーンを可視化・選択するUnity拡張

<div class="tool-links">
  <a href="vcc://vpm/addRepo?url=https://c-colloid.github.io/vpm/index.json" class="tool-link primary">VCCに追加</a>
  <a href="https://github.com/c-colloid/BoneSelector-VPM" class="tool-link" target="_blank">GitHub</a>
</div>

BoneSelectorは、Unityエディタ上でVRChatアバターのボーン構造を直感的に確認・操作するためのツールです。PhysBoneの設定確認や、特定ボーンへの素早いアクセスに役立ちます。

## 主な機能

| 機能 | 説明 |
|-----|------|
| **ボーン可視化** | Armature以下のオブジェクトをシーン上に表示 |
| **クリック選択** | シーン上でボーンを直接クリックして選択 |
| **範囲選択** | ドラッグで複数ボーンを一括選択 |
| **表示形式** | Bone / WireMesh / Sphere の3形式 |
| **Playモード** | 再生中も動作、揺れもの確認に対応 |

## クイックスタート

### 1. インストール

上の「VCCに追加」ボタンをクリックしてリポジトリを追加

### 2. 起動

**Tools** → **BoneSelector** でエディタウィンドウを開く

### 3. 使用

1. Avatar欄にアバターをセット
2. ボタンを押してボーン表示開始
3. シーン上でボーンをクリックして選択

::: tip 詳細な手順
[導入方法](./getting-started) で詳しい手順を確認できます
:::

## こんな時に便利

- PhysBoneコンポーネントの設定を確認したい
- 深い階層にあるボーンを素早く選択したい
- ボーンの動きをPlayモードで確認したい
- 複数ボーンを一括で選択して操作したい

## スクリーンショット

![ボーン表示](/images/boneselector/about01.jpg)

![範囲選択](/images/boneselector/about02.jpg)
