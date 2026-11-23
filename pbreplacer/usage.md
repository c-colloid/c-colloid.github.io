# 使い方

## 再配置の手順

1. **Tools → PBReplacer**（またはHierarchyの右クリック → **PBReplacer for Selected**）でウィンドウを開く
2. 左のノードにアバターをドロップ ①（クリックして選ぶこともできます）
3. 真ん中の **再配置 n** を押す ②（n は未処理の件数）

![使い方](/images/pbreplacer/usage-steps.png)

再配置が終わるとアクションバーが緑になり、対象表示の ○ が ✔ に変わります。Ctrl+Z または ↶ で元に戻せます。

![再配置の前後](/images/pbreplacer/usage-before-after.png)

再配置後は、アバター直下の `AvatarDynamics` の中に1オブジェクト＝1コンポーネントで並びます。

- 元のコンポーネントのパラメーターはそのまま引き継がれます
- PhysBoneのCollider参照は、再配置後のコンポーネントを指すように付け替えられます
- RootTransformが設定されていないものは自動で補完されます
- 再配置後のオブジェクト名はRootTransformのオブジェクト名になります

::: tip
複数の種類をまとめて再配置しても、1回のCtrl+Zまたは ↶ で戻せます。
:::

## ウィンドウの見方

![ウィンドウの見方](/images/pbreplacer/usage-guide.png)

| # | 部位 | 操作 |
|---|---|---|
| ① | ツールバー | ↻ 再読み込み / ↶ 元に戻す / ⚙ 詳細設定 / ⋮ その他（PBRemapを追加） |
| ② | アクションバー | 背景色が状態を表します。オレンジ = 未処理あり / 緑 = すべて配置済み / 赤 = エラー（Consoleに詳細を表示） |
| ③ | カテゴリ | カテゴリのアイコンと未処理の件数を表示。クリックでカテゴリの表示切替、Alt+クリックでそのカテゴリだけの表示に切替 |
| ④ | 対象表示 | 対象のコンポーネントを表示。○ 未処理 / ✔ 配置済み。選択するとHierarchy上でも選択されます |
| ⑤ | ＋アイコン | Hierarchyのオブジェクトをドラッグ＆ドロップすると、そのカテゴリのコンポーネントを追加 |

カテゴリは **PhysBone / PhysBone Collider / Constraint / Contact** の4つです。

::: info
PhysBoneとPhysBone Colliderは参照を解決するため、常に同時に処理されます。
:::

## 対象の追加と削除

- **追加**：Hierarchyのオブジェクトを各カテゴリの列の ＋ にドロップします
- **削除**：行にマウスを乗せると「Hierarchyで表示」「削除」ボタンが表示されます

::: tip
標準ではArmature配下だけが検索対象です。Armatureの外にあるコンポーネントは、列の ＋ に追加するか、[詳細設定](./details) の検索範囲を変更してください。
:::

## 別のアバターへ移植する

再配置で作った `AvatarDynamics` は、別のアバターや衣装へ移植できます。手順は [PBRemap](./pbremap) を参照してください。

## 関連

- [詳細設定](./details)
- [PBRemap](./pbremap)
- [困ったとき](./troubleshooting)
