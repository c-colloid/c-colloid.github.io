# PBRemap

`AvatarDynamics` 配下のPhysBone等を、別のアバター・衣装・小物へ、ボーン構成の違いを吸収しながら移植する機能です。

使い方は **PBRemapコンポーネントの付いた `AvatarDynamics` を移植先へドラッグ＆ドロップするだけ** です。再配置そのものについては [使い方](./usage) を参照してください。

## 手順

1. 移植元でPBReplacerの再配置を実行し、`AvatarDynamics` を作る
2. メインウィンドウ右上の ⋮ →「他のアバターへ移植 (PBRemap)...」で `AvatarDynamics` にPB Remapを付ける ①。移植元のボーン参照情報は自動で保存されます
3. `AvatarDynamics` を移植先アバターの子へドラッグ＆ドロップし、Inspectorの **移植 ▶** を押す ②（Ctrl+Zで取り消せます）

![PBRemapの手順](/images/pbreplacer/remap-steps.png)

::: tip PBRemapコンポーネントの追加方法
次のいずれかでも追加できます。

- Add Component → **PBReplacer** → **PB Remap**
- Hierarchyの右クリック → **PBRemapを追加**
:::

移植後はアクションバーが緑の 🔗 になり、以後そのアバターの一部として扱われます。Prefab化して別シーン・別プロジェクトへ持ち出しても、保存済みの参照情報から解決できます。

## Inspectorの見方

![PBRemap Inspectorの見方](/images/pbreplacer/remap-guide.png)

| # | 部位 | 操作 |
|---|---|---|
| ① | ツールバー | ↻ 参照情報の取り直し / 👁 SceneViewに対応線を表示 / ⚙ 詳細設定 |
| ② | アクションバー | 左が移植元、右が移植先（置き場所）。右のノードへHierarchyからアバター/衣装をドロップすると、その配下へ移動 |
| ③ | チップ | ✔ 解決済み / ＋ 自動作成 / ▾ 要選択 / ✖ 未解決 の件数。クリックで対応表の表示を切替 |
| ④ | スケール比 | クリックで 自動 / 手動 / なし に切替。コンポーネントのradiusやheightを補正します |
| ⑤ | 対応表 | 対応付けの一覧。右の欄へボーンをドロップすると手動で対応付け、▾ の一覧は候補から選択 |

![SceneViewの対応線](/images/pbreplacer/remap-scene.png)

SceneViewでは、青の輪（移植元）から緑の点（移植先）へ線で結びます。

## 対応先がないボーン

移植先に同じ名前のボーンが無いと、その参照は ✖（未解決）になります。同じ名前のボーンが2つあるときは ▾（要選択）になります。

::: warning
移植は実行できますが、未解決の参照は移植元を指したまま残ります。
:::

![未解決があるInspector](/images/pbreplacer/remap-fail-inspector.png)

| # | 見え方 | 直し方 |
|---|---|---|
| ① | チップに ✖ の件数 | クリックすると表がその行だけになります |
| ② | 表に赤く（None）表示 | 右の欄へ移植先のボーンをHierarchyからドロップ。▾ の行は ▾ から候補を選択 |

### ボーン対応ツール（SceneView）

SceneViewで 👁 を押すと対応線が出て、未解決のボーンは赤い ✕ で示されます。クリックすると「ボーン対応」ツールが始まり、マウスに追従する点線で「どのボーンと結ぶか」を決められます。

![ボーン対応ツール](/images/pbreplacer/remap-tool-steps.png)

| # | 操作 | 画面 |
|---|---|---|
| ① | 移植元の赤い ✕ をクリック | ツールが始まり、そのボーンから始まる点線がマウスに追従します |
| ② | 移植先のボーンにマウスを重ねる | ボーンに白い点が出ます。重ねたボーンは緑になり名前が表示されます |
| ③ | クリックで確定 | 青い線で結ばれ、次の未解決のボーンへ自動で進みます。Escで終了 |

対応が決まったら、Inspectorの **移植 ▶** を押します。HierarchyのAvatarDynamicsバーには状態アイコンが表示されます（▶ 移植できる / 🔗 接続済み / 参照切れ）。

![Hierarchyの状態アイコン](/images/pbreplacer/remap-hierarchy.png)

## 詳細設定

Inspectorの ⚙ で表示されます。

![PBRemapの詳細設定](/images/pbreplacer/remap-settings.png)

| 項目 | 内容 |
|---|---|
| ドロップ時 | **Confirm**：置いた後にInspectorの ▶ で移植 / **AutoOnDrop**：ドロップした時点で自動で移植（候補が複数ある参照だけ保留） / **BuildOnly**：編集時は何もせず、NDMFビルド時に非破壊で移植 |
| スケール | **Auto**：Hips-Head距離比 → ボーン間距離比 / **Manual**：世界寸法比を手入力 / **None**：補正しない |
| 名前の対応ルール | ボーン名やパスが異なるアバター間で使う対応ルール（双方向に適用）。接頭辞の置換・文字列の置換・正規表現による置換が使えます |
| 手動指定 | 自動検出が正しく動かないときに、移植元/移植先を指定 |
| 参照情報 | 移植元のボーン参照情報 |

## 対応している移植元 / 移植先

- VRCAvatarDescriptor付きアバター（Humanoidボーンで対応付け）
- Modular AvatarのMergeArmature付き衣装（prefix/suffixを考慮）
- Animator/Descriptorの無い小物（SkinnedMeshRendererを持つオブジェクト。パス/名前で対応付け）

::: info 衣装単位の移植
衣装ルート配下に置いた `AvatarDynamics` は **衣装を単位** として扱われ、アバター本体のボーンや本体の `AvatarDynamics` には触れません。
:::

## NDMFとの連携

NDMFが導入されている場合、PBRemapコンポーネントはビルド時（Resolvingフェーズ）に自動で処理され、ビルド後のアバターからは取り除かれます。

「ドロップ時」を **BuildOnly** にすると、編集中のシーンには手を加えず、ビルド時にだけ非破壊で移植します。

## 関連

- [使い方](./usage)
- [困ったとき](./troubleshooting)
