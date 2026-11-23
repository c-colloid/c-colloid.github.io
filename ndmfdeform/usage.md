# 使い方

## 全体の流れ

1. 変形したいメッシュのGameObjectにデフォーマを追加する
2. NDMFプレビューで確認しながら、シーンビューやInspectorで編集する
3. アバターをビルドすると、変形が自動で適用される

シーン上のメッシュは書き換えられません。変形はビルド時とNDMFプレビューでのみ適用されます。

## デフォーマの追加

1. 変形したいメッシュのGameObject（SkinnedMeshRenderer、またはMeshFilterとMeshRendererを持つもの）をHierarchyで右クリック
2. **NDMF Deform** → **Deformers** からデフォーマを選択

```
NDMF Deform
└─ Deformers
   ├─ Lattice
   ├─ Cylindrical Scale
   ├─ Cylindrical Vertex Transform
   ├─ Transform
   ├─ Scale
   └─ Mask
      ├─ UV Island Mask
      ├─ Sphere Mask
      ├─ Box Mask
      ├─ Vertical Gradient Mask
      └─ Vertex Color Mask
```

**Deform Stack** が無い場合は自動で追加されます。デフォーマは子のGameObjectとして作成され、Deform Stackに登録されます。作成後はそのデフォーマが選択されるので、そのままシーンビューで編集できます。

::: warning
レンダラー（SkinnedMeshRenderer、またはMeshFilterとMeshRenderer）を持たないGameObjectには、Deform Stackを追加できません。デフォーマを作る場合も、レンダラーを持つGameObjectかその子孫から作成してください。
:::

### 手動で組む場合

Add Componentメニューの **NDMF Deform** からも追加できます。

1. レンダラーのGameObjectに **Deform Stack** を追加する
2. 子のデフォーマをDeform Stackの一覧に登録する

## Deform Stack

レンダラーに適用するデフォーマを順番に並べるコンポーネントです。1つのGameObjectに1つだけ付けられます。

| 項目 | 説明 |
|-----|------|
| デフォーマ | 適用するデフォーマの一覧。上から順に適用されます。デフォーマやGameObjectをドラッグ、または「＋」で新規作成できます |
| 法線 | ベイク時の法線の扱い。作り込みを保持（既定）／変形後の形状から再計算 |
| シェイプ非線形補正 | 非線形な変形を横切るブレンドシェイプに中間フレームを自動挿入します（既定でオン） |
| シェイプ個別設定 | ブレンドシェイプごとのデルタの扱いを上書きします |

::: tip 法線
既定の「作り込みを保持」では、シームやトゥーン調整のために作り込んだ法線を壊しません。
:::

## デフォーマの種類

### 変形系

| デフォーマ | 内容 |
|-----------|------|
| Lattice | 格子の制御点による自由変形 |
| Cylindrical Scale | 円柱コントローラで範囲をスケール |
| Cylindrical Vertex Transform | 円柱コントローラで頂点を放射状に移動 |
| Transform | ターゲットTransformの位置・回転・スケールへメッシュを補間 |
| Scale | 軸Transformのスケールでメッシュを拡縮 |

### マスク系

マスクは、Deform Stackの中でそれより前にあるデフォーマの変形を、指定した領域で打ち消します。マスクは変形したいデフォーマより下に並べてください。

| デフォーマ | 内容 |
|-----------|------|
| UV Island Mask | 選択したUV島の変形を打ち消す。Invertで島のみに変形を残す |
| Sphere Mask | 球形領域の変形を打ち消す。Invertで外側を打ち消す |
| Box Mask | 直方体領域の変形を打ち消す。Invertで外側を打ち消す |
| Vertical Gradient Mask | 軸方向のグラデーションで変形を打ち消す |
| Vertex Color Mask | 頂点カラーのチャンネルで変形を打ち消す |

## Lattice

格子の制御点をシーンビューで動かして変形します。Inspectorでは次を設定します。

| 項目 | 説明 |
|-----|------|
| Resolution | 格子の分割数。変更しても既存の変形はリサンプリングして引き継がれます |
| Mirror Axis | 編集時のミラー軸（None / X / Y / Z）。対称側の制御点にも選択・移動を反映します |
| 制御点をリセット | 制御点を初期状態に戻します |
| バウンズへフィット | 格子をメッシュのバウンズに合わせます |

### 制御点の操作

Inspectorの「操作ガイド」にも同じ内容があります。

| 操作 | 内容 |
|-----|------|
| クリック | 選択 |
| Shift+クリック | 追加選択 |
| ドラッグ | 矩形選択 |
| Ctrl+ドラッグ | スワイプした方向の軸で行選択 |
| Ctrl+Shift+ドラッグ | スワイプした方向の軸でリング（ループ）選択 |
| 再クリック | 軸を循環 |
| Ctrl+Shift+ダブルクリック | シート全体に拡張 |
| Ctrl+A | 全選択 |
| Esc または空クリック | 選択解除 |

選択中の点には、W / E / R（移動 / 回転 / スケール）ツールが適用されます。奥の点のフェードやスライスの表示設定は、シーンビューの「NDMF Deform Lattice」オーバーレイで切り替えられます。

## UV Island Mask

UV島を選んで、その部分の変形を打ち消します。服の下の素体など、変形を避けたい部分に使います。

| 項目 | 説明 |
|-----|------|
| Factor | マスクの強さ（0〜1） |
| Falloff | 打ち消しを島の外側へUV距離でぼかします |
| Invert | オンにすると、選択した島のみに変形を残します |

### UV島の選択

- **UVマップ上**: 島をクリックで選択・解除。左ドラッグで矩形選択（Ctrl+ドラッグで範囲解除）。ホイールでズーム、中ボタン（またはAlt+左ドラッグ）でパン
- **シーンビュー**: メッシュの面をクリックして選択・解除。選択した島は緑、ホバー中の島は黄色でハイライトされます
- UVが重なった場所や、複数の島に当たった場合は、メニューから島を選べます
- サブメッシュのドロップダウンで、表示とクリックの対象を絞り込めます
- シーンのハイライトとクリック判定は、変形後（プレビュー）の形状に追従します

::: info
UV島の選択は、1つのデフォーマずつ編集してください（複数選択中は表示されません）。
:::

## その他のデフォーマの項目

| デフォーマ | 主な項目 |
|-----------|---------|
| Cylindrical Scale | Factor、Radius（変形先の半径）、Scope（影響範囲の半径）、Top、Bottom、Axis Override |
| Cylindrical Vertex Transform | Factor、Radius（移動先の半径）、Scope（影響範囲の半径）、Top、Bottom、Axis Override |
| Transform | Target、Factor |
| Scale | Axis Override |
| Sphere Mask | Factor、Inner Radius、Outer Radius、Invert、Axis Override |
| Box Mask | Factor、Inner Bounds、Outer Bounds、Invert、Axis Override |
| Vertical Gradient Mask | Factor、Falloff、Invert、Axis Override |
| Vertex Color Mask | Factor、Falloff、Invert、Channel（R / G / B / A） |

デフォーマは軸として使うGameObjectに付けます。変形の基準はそのTransformで、Axis Overrideがある場合は指定したTransformが基準になります。

::: tip 円柱デフォーマ
シーンでは、Radiusがシアンの実線、Scopeがオレンジの点線で表示されます。Scopeの内側の頂点だけが変形されます。
:::

## ビルド時の動作

アバターのビルド時、NDMFのTransformingフェーズで次の処理が行われます。

1. アバター配下のDeform Stackごとに、登録されたデフォーマを順に適用して変形後のメッシュを生成
2. レンダラーに、変形後のメッシュを設定
3. Deform Stackとデフォーマのコンポーネントを削除

- **EditorOnlyタグ**: EditorOnlyタグの付いたオブジェクト配下のDeform Stackは処理されません
- **GameObjectは削除されません**: 削除されるのはNDMFDeformのコンポーネントのみです。アバター外のオブジェクトには触れません
- **バウンズ**: 変形でメッシュが元の範囲を超えた分だけ、SkinnedMeshRendererのバウンズを広げます

## ブレンドシェイプの扱い

ブレンドシェイプを持つメッシュも、変形後に表情やリップシンクが崩れないようベイクされます。

- 各フレームを `Deform(base + delta) − Deform(base)` で再ベイクします
- 非線形な変形を横切るシェイプには、中間フレームを自動挿入します（瞬きの軌道補正）
- 「太さ0」のような絶対的なターゲットを持つシェイプは、**シェイプ個別設定**で「作った形を維持」にできます

::: warning 作った形を維持を使うとき
デフォーマの影響範囲がシェイプの影響範囲からはみ出していると、境界に段差が出ることがあります。
:::

## 注意点

::: warning 既知の制限
- ボーン・バインドポーズの補正は行いません。大きく骨格を動かす用途は対象外です
- シーンビューでのUV島選択などは、バインドポーズから大きく外れたポーズでは判定がずれることがあります
:::

::: info
0.x系のあいだは互換性が変わることがあります。
:::
