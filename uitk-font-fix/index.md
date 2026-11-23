# UITK Font Fix

> Unity UI Toolkit のエディタUI向けフォントユーティリティ

<div class="tool-links">
  <a href="vcc://vpm/addRepo?url=https://c-colloid.github.io/vpm/index.json" class="tool-link primary">VCCに追加</a>
  <a href="https://github.com/c-colloid/UITKFontFix" class="tool-link" target="_blank">GitHub</a>
</div>

UITK Font Fix（`jp.colloid.uitk-font-fix`）は、Unity UI Toolkit で作るエディタUIに、日本語などのCJK文字とコード表示用のモノスペースフォントを正しく表示させるためのパッケージです。依存パッケージはなく、MITライセンスです。

::: info VCCで自動的に入った方へ
PBReplacer や NDMFDeform など、同じ作者のツールはこのパッケージを内部で利用しています。VCCで依存パッケージとして自動的に追加されることがありますが、利用者が設定や操作をする必要はありません。そのままプロジェクトに入れておいてください。
:::

## 何を解決するか

Unity 2022.3 の UI Toolkit エディタUIには、原因の分かりにくいフォントの問題がいくつかあります。

- CJK文字が「まだら太字」になる（標準フォントにCJKグリフがなく、1文字ごとにOSフォントへフォールバックするため）
- OSフォントが無言で何も表示しないことがある
- USSではOSフォントを名前で指定できない
- AIの出力やユーザー入力に含まれる絵文字・異体字セレクタが、豆腐（□）や警告の連発を起こす
- OSフォントから作ったフォントが、プレイモードの切り替えやシーンのロードで壊れる

このパッケージは、これらを自動で回避するか、呼び出しやすいヘルパとテストとして提供します。

## 主な機能

| 機能 | 説明 |
|-----|------|
| **CJK UIフォントの解決** | 日本語などを表示できる Latin+CJK フォントを解決して適用 |
| **モノスペースフォントの解決** | コード表示向けのフォントを確実に表示できる形で解決 |
| **適用ヘルパ** | `ApplyCjkUi`（コンテナのルート）と `ApplyMono`（末端の要素）でスタイル継承と衝突しない適用 |
| **テキストのサニタイズ** | 絵文字や異体字セレクタなど、表示できない不可視文字を除去 |
| **グリフ監査** | ソース中の固定UI文字列に、描画できない文字が混ざっていないかをテストで検出 |
| **診断ウィンドウ** | どのフォントがどう解決されたかを確認 |
| **Project Settings** | コードを書かずにフォント候補を設定し、チームで共有 |

## 対応環境

| 項目 | 内容 |
|-----|------|
| Unity | 2022.3 LTS 以降 |
| 用途 | エディタUI（ランタイム対応は将来版に向けて構造のみ準備済み） |
| 依存パッケージ | なし |
| ライセンス | MIT |

## クイックスタート

ウィンドウのルートにCJKフォントを適用し、コードを表示する要素にはモノスペースを適用します。

```csharp
using Colloid.UitkFontFix;
using UnityEngine;

public void CreateGUI()
{
    if (FontFix.ShouldPreferCjkUi(Application.systemLanguage))
    {
        FontFix.ApplyCjkUi(rootVisualElement);
    }
    // ...
}
```

::: tip 詳細な手順
導入は [導入方法](./getting-started)、コード例は [使い方](./usage) を参照してください。
:::

## こんな時に便利

- エディタ拡張で日本語のラベルが、まだら太字や不揃いなフォントで表示される
- ログやコードをモノスペースで表示したい
- AIの出力やクリップボードのテキストを表示すると、豆腐や警告が出る
- フォントの解決結果を調べたい

## 詳しい情報

全APIや検証内容など網羅的な情報は、[GitHubのREADME](https://github.com/c-colloid/UITKFontFix/blob/main/jp.colloid.uitk-font-fix/README.ja.md) を参照してください。
