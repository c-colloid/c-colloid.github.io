# 詳細

## 設定のカスタマイズ

フォントの候補は、コードまたはエディタUIから変更できます。既定では日本語優先の候補で解決します。

### 既定の候補

| 項目 | 既定値 |
|-----|-------|
| CJK UIフォント | Yu Gothic UI → Yu Gothic → Meiryo UI → Meiryo → Noto Sans CJK JP → MS UI Gothic |
| モノスペース | エディタ同梱のRobotoMono → OSのモノスペース（Consolas・Menlo・DejaVu Sans Mono・Courier New） |
| 候補名 | OSの**英語のファミリー名**で指定 |

### コードで設定する

`FontFixSettings` に代入します。値が実際に変わったときだけキャッシュが無効化され、null を代入すると既定値に戻ります。

```csharp
using Colloid.UitkFontFix;
using UnityEditor;

public static class MyProjectFontConfig
{
    [InitializeOnLoadMethod]
    private static void Configure()
    {
        // 簡体字中国語優先の例
        FontFixSettings.CjkUiFontNames = new[]
        {
            "Microsoft YaHei UI", "Microsoft YaHei",
            "Microsoft JhengHei UI", "Microsoft JhengHei",
            "Noto Sans CJK SC",
            "Yu Gothic UI"
        };
    }
}
```

| プロパティ | 説明 |
|-----------|------|
| `CjkUiFontNames` | Latin+CJK のファミリー名（優先順に試行）。空配列でCJK解決を無効化 |
| `CjkUiStyleName` | 作成するフェイスのスタイル名（既定 `"Regular"`） |
| `CjkUiBoldStyleName` | Boldに配線するフェイス名（既定 `"Bold"`）。`""` で無効化 |
| `EditorMonoFontPaths` | 同梱モノスペースTTFの探索パス |
| `OsMonoFontNames` | OSモノスペースのファミリー名 |
| `ResetToDefaults()` | すべて既定に戻す |

### Project Settingsで設定する

**Edit** → **Project Settings** → **UITK Font Fix** で、コードなしで設定できます。候補は1行に1ファミリー名で編集します。

| ボタン | 動作 |
|-------|------|
| **Apply (this session)** | 現在のエディタセッションに反映 |
| **Save to project** | 加えて `ProjectSettings/Packages/jp.colloid.uitk-font-fix/settings.json` に保存。バージョン管理でチームに共有 |
| **Use package defaults** | すべて既定に戻し、保存ファイルを削除 |

保存したファイルはドメインロードごとに1回適用されます。コードから `FontFixSettings` に代入した値があれば、そちらが優先されます。

::: info
適用の順序は Unity の慣例に基づくもので、保証された仕様ではありません。実効値が保存ファイルとずれていないかは、診断レポートの「Project settings file」セクションで確認できます。
:::

## 診断ウィンドウ

**Window** → **UITK Font Fix** → **Diagnostics** で開きます。読み取り専用のレポートで、次の内容を確認できます。

- どの候補がどの段で解決されたか
- CJKアトラスの状態
- このマシンで候補フォントが存在するか
- 既知の罠のチェックリスト
- Project settings file の有無とずれ

| ボタン | 動作 |
|-------|------|
| **Re-probe** | キャッシュを捨てて再解決 |
| **Copy report** | レポートをコピー（バグ報告への添付用） |

**Edit configuration** の折りたたみから、Project Settings と同じフォームで設定を編集できます。編集、Apply、Re-probe、結果の確認を1画面で行えます。

解決結果のソース欄の接頭辞は次のとおりです。

| 接頭辞 | 意味 |
|-------|------|
| `editor:` | エディタ同梱のTTF |
| `os:` | フェイス検証を通過したOSフォント |
| `label` | エディタ既定のラベルフォント（最終手段） |
| `osasset:` | インストール済みファミリーから作ったFontAsset |
| `(none)` | 何も解決できなかった（適用ヘルパは何もしません） |

## 設定変更後の再適用

`FontFixSettings` の変更や `FontFix.ResetCaches()` で、解決済みのフォントが破棄・交替されることがあります。要素はインラインスタイルにフォントを保持しているため、その場合は再適用が必要です。`FontFix.CachesInvalidated` イベントを購読し、`ApplyCjkUi` / `ApplyMono` を呼び直してください。

- 購読はドメインリロードで失われるので、`CreateGUI` / `OnEnable` で購読し、`OnDisable` で解除します
- OSフォント由来のフォントがプレイモードの切り替えやシーンのロードで壊れた場合は、パッケージが同じインスタンスのまま修復します。この場合はイベントは発火せず、再適用も不要です

## 既知の制約

::: warning
- `<mark>` タグは使わないでください。DynamicOSのFontAssetと相性が悪く、まだら太字やかすれ、不透明なmarkでは文字の消失が起こります
- USSではOSフォントを名前で指定できません（Unity側の制約）。フォントはC#から適用します
- 本物のBoldは合成ボールドと字送りが違うため、アップグレード後に太字ラベルの折り返し位置が少し変わることがあります
- 開きっぱなしのウィンドウに設定変更を反映するには、再構築か再オープンが必要です
- 検証は主にWindowsで行われています。候補フォントが入っていない環境では、CJK解決が「未解決」になります
:::

## トラブルシューティング

### フォントが適用されない

- `ApplyCjkUi` は、フォントが解決できないと何もしません。診断ウィンドウで解決結果を確認してください
- 同じ要素に `ApplyCjkUi` と `ApplyMono` を両方呼んでいないか確認してください

### 豆腐や警告が出る

- 動的なテキストは `SanitizeDisplayText` を通してください
- 固定の文字列は、`SafeGlyphs` の範囲に収めてください。[使い方](./usage) のグリフ監査も参照してください

## 関連リンク

- [GitHub](https://github.com/c-colloid/UITKFontFix)
- [日本語README（全API・検証済みの挙動）](https://github.com/c-colloid/UITKFontFix/blob/main/jp.colloid.uitk-font-fix/README.ja.md)
