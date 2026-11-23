# 導入方法

## インストール

### VCCでインストール

1. VRChat Creator Companion (VCC) を開く
2. **Settings** → **Packages** → **Add Repository**
3. 以下のURLを入力:
   ```
   https://c-colloid.github.io/vpm/index.json
   ```
4. 「Add」をクリック
5. プロジェクトを開き、「Manage Project」から **UITK Font Fix** を追加

::: info
PBReplacer や NDMFDeform など、このパッケージを利用するツールを追加した場合は、依存パッケージとして自動的に入ります。
:::

### Unityのgit URLでインストール

VCCを使わない場合は、Package Manager から追加できます。

1. **Window** → **Package Manager** を開く
2. **+** → **Add package from git URL...** を選ぶ
3. 以下のURLを入力:
   ```
   https://github.com/c-colloid/UITKFontFix.git?path=jp.colloid.uitk-font-fix
   ```

`jp.colloid.uitk-font-fix` フォルダをプロジェクトの `Packages/` フォルダに置く方法（組み込みパッケージ）でも使えます。

## アセンブリ参照

パッケージには `Colloid.UitkFontFix` と `Colloid.UitkFontFix.Editor` の2つのアセンブリがあり、どちらも自動参照されます。`Assets/` 直下のスクリプトからは、設定なしでそのまま呼べます。

自前の asmdef の中から使う場合は、通常どおりアセンブリ参照を追加してください。

## 自作パッケージから使う場合

自作パッケージの依存として指定する書き方は、このページでは扱いません。自作のasmdefから使う場合は、上記の2つのアセンブリへの参照を追加してください。

## サンプル

Package Manager の **Samples** タブから、2つのサンプルをインポートできます。

| サンプル | 内容 |
|---------|------|
| **Editor Font Setup** | コンテナ/リーフの構成、言語判定、テキストのサニタイズを実演する `EditorWindow`。**Window** → **UITK Font Fix** → **Samples** → **Font Setup Example** で開けます |
| **Glyph Audit Tests** | 自分のプロジェクトのソースにグリフ監査を適用する EditMode テストの雛形 |

::: warning
サンプルは、パッケージのバージョンごとに1つだけインポートしてください。複数バージョンのコピーを同時に置くと、同じクラスが重複してコンパイルエラーになります。
:::
