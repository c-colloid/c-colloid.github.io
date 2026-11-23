# NDMFDeform

> VRChatアバターのメッシュを非破壊で変形するNDMFプラグイン

<div class="tool-links">
  <a href="vcc://vpm/addRepo?url=https://c-colloid.github.io/vpm/index.json" class="tool-link primary">VCCに追加</a>
  <a href="https://github.com/c-colloid/NDMFDeform" class="tool-link" target="_blank">GitHub</a>
</div>

NDMFDeformは、メッシュ変形ライブラリ [Deform](https://github.com/keenanwoodall/Deform) の変形処理を [NDMF](https://github.com/bdunderscore/ndmf) 上で非破壊に実行するためのプラグインです。シーン上のメッシュには一切触れず、アバターのビルド時とNDMFプレビューでのみ変形を適用します。

## 主な機能

| 機能 | 説明 |
|-----|------|
| **Lattice** | 格子の制御点でメッシュを自由に変形。ミラー編集や、クリック・矩形・行・リング・シートでの選択に対応 |
| **UV Island Mask** | 選択したUV島の変形を打ち消すマスク。反転すると「島だけに変形を残す」ことも可能 |
| **Cylindrical Scale / Cylindrical Vertex Transform** | 円柱コントローラで範囲を指定して変形 |
| **Transform / Scale** | Transformへの補間、軸Transformのスケールによる拡縮 |
| **Sphere / Box / Vertical Gradient / Vertex Color Mask** | 領域・グラデーション・頂点カラーによるマスク |
| **ブレンドシェイプ対応** | 変形後も表情やリップシンクが崩れないようにシェイプを再ベイク |
| **法線の扱いを選択** | 作り込んだ法線を保持するか、変形後に再計算するかを選べる |

エディタUIはUI Toolkitで作られています。[UITK Font Fix](https://github.com/c-colloid/UITKFontFix) を導入していると日本語表示が最適化されます（依存パッケージとして自動で導入されます）。

## 対応環境・依存

| 項目 | 内容 |
|-----|------|
| Unity | 2022.3 |
| NDMF | `nadena.dev.ndmf` 1.6.0 以上 |
| UITK Font Fix | `jp.colloid.uitk-font-fix` 0.4.1 以上 |

NDMFとUITK Font FixはVCCからの導入時に依存として自動で追加されます。

## クイックスタート

### 1. インストール

上の「VCCに追加」ボタンからリポジトリを追加し、プロジェクトに **NDMFDeform** を追加します。

### 2. デフォーマを追加

変形したいメッシュ（SkinnedMeshRendererなど）のGameObjectをHierarchyで右クリックし、**NDMF Deform** → **Deformers** → **Lattice** などを選びます。

### 3. 編集してビルド

NDMFプレビューで確認しながらシーンビューで編集します。アバターのビルド時に変形が自動で適用されます。

::: tip 詳細な手順
[導入方法](./getting-started) と [使い方](./usage) で詳しい手順を確認できます
:::

## こんな時に便利

- 元のメッシュを書き換えずに、アバターの一部の形を調整したい
- 変形したうえで、表情やリップシンクのブレンドシェイプを正しく動かしたい
- 服の下の素体など、特定のUV島だけ変形を打ち消したい

## 旧バージョンからの移行

0.0.x系から更新する場合は、必ず0.1.0を経由してください。手順は [詳細](./details) を参照してください。

## ライセンス

MIT Licenseです。ベイク処理の一部の数式は [Deform](https://github.com/keenanwoodall/Deform)（MIT License）に由来します。
