# PBReplacer

> アバターのPhysBone等を整理して再配置・移植するUnity拡張

<div class="tool-links">
  <a href="vcc://vpm/addRepo?url=https://c-colloid.github.io/vpm/index.json" class="tool-link primary">VCCに追加</a>
  <a href="https://github.com/c-colloid/PBReplacer-VPM" class="tool-link" target="_blank">GitHub</a>
</div>

PBReplacerは、アバターに付いているVRC関連コンポーネントを整理するUnity拡張です。元のコンポーネントのパラメーターを保持したまま、**1オブジェクト＝1コンポーネント**に分けて `AvatarDynamics` 配下へ再配置します。

![PBReplacer](/images/pbreplacer/hero.png)

## 再配置できるコンポーネント

- PhysBone / PhysBoneCollider
- VRCContactSender / Receiver
- VRCConstraint 全般

## できること

- **複数コンポーネントの一括編集**：1オブジェクト＝1コンポーネントなので、Hierarchyで複数選択するとまとめて編集できます
- **アニメーションでのオンオフ**：コンポーネントがボーンに付いていないので、好きな場所に移動できます。服の子に置けば、服のオンオフアニメーションでPhysBoneも止まります
- **別のアバターへの移植（PBRemap）**：`AvatarDynamics` を別のアバターや衣装へドラッグ＆ドロップすると、ボーン構成の違いを吸収してPhysBone等を移植します

## 主な機能

| 機能 | 説明 |
|-----|------|
| **再配置** | 対象コンポーネントを `AvatarDynamics` 配下へ1オブジェクト＝1コンポーネントで配置 |
| **参照の引き継ぎ** | パラメーターはそのまま引き継ぎ、PhysBoneのCollider参照は再配置後のコンポーネントに付け替え |
| **Undo** | Ctrl+Z または ↶ で再配置前に戻せる |
| **PBRemap** | 別のアバター・衣装・小物へボーン構成の違いを吸収して移植 |
| **NDMF連携** | NDMF導入時はビルド時に非破壊で移植可能 |

## クイックスタート

### 1. インストール

上の「VCCに追加」ボタンをクリックしてリポジトリを追加

### 2. 起動

**Tools** → **PBReplacer** でエディタウィンドウを開く

### 3. 再配置

1. 左のノードにアバターをドロップ
2. 真ん中の **再配置 n** を押す

::: tip 詳細な手順
[導入方法](./getting-started) と [使い方](./usage) で詳しい手順を確認できます
:::

## ページ一覧

- [導入方法](./getting-started)：インストールと起動方法
- [使い方](./usage)：再配置の手順とウィンドウの見方
- [詳細設定](./details)：⚙ の設定項目と対応アバター
- [PBRemap](./pbremap)：別のアバターへの移植
- [困ったとき](./troubleshooting)：よくある問題と対処
- [更新履歴](./changelog)
