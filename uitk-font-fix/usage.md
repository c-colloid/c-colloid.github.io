# 使い方

すべて `Colloid.UitkFontFix` 名前空間にあります。ここでは代表的な使い方を紹介します。全APIは [GitHubのREADME](https://github.com/c-colloid/UITKFontFix/blob/main/jp.colloid.uitk-font-fix/README.ja.md) を参照してください。

## 基本の構成

構成のルールは次の2つです。

| API | 適用先 | 説明 |
|-----|--------|------|
| `FontFix.ApplyCjkUi` | **コンテナのルート** | 配下の要素がすべてフォントを継承 |
| `FontFix.ApplyMono` | **末端（リーフ）の要素** | インラインスタイルは継承に勝つため、CJKコンテナ内でもモノスペースのまま |

::: warning
同じ要素に `ApplyCjkUi` と `ApplyMono` の両方を呼ばないでください。どちらもインラインで書き込むため、後に呼んだほうが黙って勝ちます。
:::

## ウィンドウに適用する

```csharp
using Colloid.UitkFontFix;
using UnityEditor;
using UnityEngine;
using UnityEngine.UIElements;

public class FontFixQuickStart : EditorWindow
{
    [MenuItem("Window/Font Fix Quick Start")]
    public static void Open()
    {
        GetWindow<FontFixQuickStart>("Font Fix Quick Start");
    }

    public void CreateGUI()
    {
        if (FontFix.ShouldPreferCjkUi(Application.systemLanguage))
        {
            FontFix.ApplyCjkUi(rootVisualElement);
        }

        rootVisualElement.Add(new Label("Ready")); // ルートのフォントを継承

        var code = new Label("if (x == 0) { return; }");
        FontFix.ApplyMono(code);
        rootVisualElement.Add(code);

        string raw = EditorGUIUtility.systemCopyBuffer;
        rootVisualElement.Add(new Label(FontFix.SanitizeDisplayText(raw)));
    }
}
```

ふつうのラベルには何もする必要がありません。ルートのフォントを継承します。

## テキストをサニタイズする

AIの出力やユーザー入力は、表示前に `SanitizeDisplayText` を通します。

```csharp
target.text = FontFix.SanitizeDisplayText(rawModelText);
```

| オーバーロード | 動作 |
|--------------|------|
| `SanitizeDisplayText(string)` | 無損失。異体字セレクタ（漢字用のIVSを含む）、ゼロ幅文字、BOM、絵文字タグ文字といった不可視の文字だけを除去します。見た目の内容は変わりません |
| `SanitizeDisplayText(string, string)` | 損失あり。上の除去に加えて、BMP外の文字（絵文字など）を指定した文字列に置き換えます |

エディタフォントには絵文字のグリフがありません。2引数のオーバーロードは、豆腐の代わりに見える代替文字を出したい場合に使います。

::: tip
サニタイザは純粋関数です。例外は投げず、変更が不要なら同じインスタンスを返し、null は `string.Empty` になります。
:::

## 言語判定を安全に行う

`Application.systemLanguage` は、シリアライズ中（コンストラクタやフィールド初期化子）に読むと例外を投げます。`OnEnable` 以降で読んでください。

```csharp
using Colloid.UitkFontFix;
using UnityEngine;

public class MyToolState : ScriptableObject
{
    private bool _preferCjk;

    private void OnEnable()
    {
        // OnEnable 以降で読む
        _preferCjk = CjkLanguage.ShouldPreferCjkUi(Application.systemLanguage);
    }

    public bool PreferCjk
    {
        get { return _preferCjk; }
    }
}
```

`CjkLanguage` はランタイムアセンブリにあるため、どのスクリプトからも使えます。エディタコードでは `FontFix.ShouldPreferCjkUi` でも同じ判定ができます。

## Boldと他のフェイス

`-unity-font-style: bold` やリッチテキストの `<b>` は、解決したファミリーに本物のBoldフェイスがあれば、自動でそれを使います。

USSから選べないフェイス（Semibold、Light、Mediumなど）は、末端の要素に `ApplyCjkUiFace` で適用します。

```csharp
var heading = new Label("Release highlights");
FontFix.ApplyCjkUiFace(heading, "Semibold");
rootVisualElement.Add(heading);
```

::: info
フェイス名は、OSが報告するフェイス名と完全一致させる必要があります。見つからない場合は何もせず、ルートから継承したフォントで表示されます。
:::

## 固定UI文字列をテストで守る

ソースに埋め込む固定のUI文字列は、印字可能なASCIIか、`SafeGlyphs` のホワイトリストの範囲に収めると安全です。`GlyphAudit` を使うと、エディタフォントで描けない文字が混ざっていないかをテストで検出できます。

```csharp
using System.Collections.Generic;
using Colloid.UitkFontFix;
using NUnit.Framework;

public class UiGlyphSafetyTests
{
    private static readonly int[] ExtraCodepoints = { 0x2192 };

    [Test]
    public void EditorSources_PassGlyphAudit()
    {
        List<string> offenders = GlyphAudit.AuditSourceDirectory(
            "Assets/Editor", ExtraCodepoints);
        Assert.IsEmpty(offenders, string.Join("\n", offenders));
    }
}
```

違反は「ファイル名: 理由」の形で返ります。テスト用のasmdefから `Colloid.UitkFontFix` と `Colloid.UitkFontFix.Editor` を参照してください。`ExtraCodepoints` に追加するのは、対象のエディタフォントで実際に描画されることを確認した文字だけにします。

## 診断

**Window** → **UITK Font Fix** → **Diagnostics** で、解決結果を確認できます。コードからもレポートを取得できます。

```csharp
Debug.Log(FontFixDiagnostics.BuildReport());
```

詳しくは [詳細](./details) を参照してください。
