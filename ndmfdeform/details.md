# 詳細

## 旧バージョン (0.0.x) からの移行

::: warning 必ず0.1.0を経由してください
0.1.0は移行専用リリースで、旧Deformフォークと新実装、移行ツールを同梱しています。フォークを削除したバージョン（0.2.0以降）へ直接更新すると、旧コンポーネントがMissing Scriptになり、移行できなくなります。
:::

1. パッケージを **0.1.0** に更新します
   - VPMで導入している場合、旧 `Assets\NDMFDeform` フォルダは自動で削除されます
   - 別の場所に展開していた場合は、手動で削除してください
2. メニューの **Tools** → **NDMF Deform** → **旧 Deformable から移行...** を実行します
   - `Deformable` と `LatticeDeformer` が、`DeformStack` と新しい `LatticeDeformer` に変換されます
   - Lattice以外の旧デフォーマ（BendやTwistなど）は移行されず、一覧に報告されます
3. 動作確認後、0.2.0以降（フォーク削除版）へ更新します

## 旧Deformとの互換

次のデフォーマは、旧Deformと同等の機能として提供されています。

- Transform / Scale
- Sphere Mask / Box Mask / Vertical Gradient Mask / Vertex Color Mask

## ライセンス

MIT Licenseです。ベイク処理の一部の数式は [Deform](https://github.com/keenanwoodall/Deform)（Keenan Woodall氏、MIT License）から移植したものです。詳細はGitHubリポジトリの [THIRD-PARTY-NOTICES.md](https://github.com/c-colloid/NDMFDeform) を参照してください。
