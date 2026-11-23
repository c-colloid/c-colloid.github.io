# 導入方法

## 前提条件

- Unity 2022.3 LTS以降（Unity 6系を含む）
- Claude Code CLI（未導入の場合はパネルの案内から導入できます）
- Claudeアカウント（サブスクリプションでのログインを推奨。APIキーでも利用可）

::: info 動作確認の状況
Windowsで検証しています。macOS / Linuxは動く想定ですが未検証です。
:::

## インストール

必須の依存パッケージはありません。VCC / ALCOMを使っている場合は方法1、それ以外は方法2が簡単です。

### VCCでインストール（推奨）

1. VCCの **Settings** → **Packages** → **Add Repository**（ALCOMでは **Resources** → **Repositories** → **Add Repository**）を開く
2. 以下のURLを入力:
   ```
   https://c-colloid.github.io/vpm/index.json
   ```
3. 「Add」をクリック
4. プロジェクトの **Manage Project**（ALCOMでは **Manage**）を開き、**Agent Panel for Unity** の **+** を押す

一覧が長いときは、検索欄に「Agent」と入力すると見つかります。更新は同じ一覧に出る **Update** ボタンから行います。

### Unity Package ManagerでGit URLから追加

Gitがインストールされている必要があります。

1. **Window** → **Package Manager** を開く
2. 左上の **+** から **Add package from git URL...**（Unity 6では **Install package from git URL...**）を選ぶ
3. 以下のURLを貼り付けて **Add**（Unity 6では **Install**）を押す
   ```
   https://github.com/c-colloid/AgentPanelForUnity.git?path=jp.colloid.unity-agent-panel
   ```

### zipでインストール

[GitHubの最新リリース](https://github.com/c-colloid/AgentPanelForUnity/releases/latest)にある `jp.colloid.unity-agent-panel-<バージョン>.zip` を、Unityプロジェクトの `Packages/jp.colloid.unity-agent-panel/` に展開します。`package.json` がそのフォルダ直下に来る形にしてください。更新はzipの差し替えです。

### ベータ版を試す

作業がひとつ終わるごとに `X.Y.Z-beta.N` のベータ版が公開されます。通常の導入では表示されません。

- **VCC / ALCOM**: VCCは **Settings** → **Packages** → **Show Pre-release Packages**、ALCOMは設定の「プレリリース版を表示」をオンにする
- **Git URL**: URLの末尾に `#beta` を付ける
  ```
  https://github.com/c-colloid/AgentPanelForUnity.git?path=jp.colloid.unity-agent-panel#beta
  ```
- **zip**: GitHubのReleasesで **Pre-release** の印が付いたものを使う

## パネルを開く

メニューの **Window** → **Agent Panel** を選びます。パネルは他のエディタウィンドウと同様にドッキングできます。

![Windowメニューのエージェントパネル](/images/agentpanel/upm-window-menu.png)

## Claude Code CLIとサインイン

既定の接続先はClaude Codeです。初回は状態に応じて、チャット欄にセットアップ用のカードが表示されます。

### CLIを導入する

CLIが見つからない場合、チャット欄に「Claude Code CLI が見つかりません」のカードが出ます。

- **Claude Code をインストール**: 押すと実行するコマンドを示した確認ダイアログが出ます。「インストール」で開始します（Windowsでは PowerShell 版のインストーラが表示されます）
- **再検出**: 自分でインストールした場合に押します
- **参照...**: インストール先が標準の場所でない場合に、`claude`（Windowsは `claude.exe`）を直接指定します

同じ操作は、設定（ヘッダーの ⚙）の **接続** → **エージェント** カードからもできます。

### サインインする

CLIが入っていてサインインしていない場合は、「Claude にサインイン」のカードが出ます。

1. **ログイン** を押す。設定の「エージェント」カードが開き、パネルが `claude auth login` を実行します
2. ブラウザが開く。開かない場合は「ブラウザで開く」を押すか、「コピー」したURLをブラウザに貼り付けます
3. ブラウザでClaudeアカウントにログインし、アクセスを許可する
4. ブラウザに表示された **認証コード** をコピーし、カードの「認証コード」欄に貼り付けて **送信** を押す
5. 見出しが「サインイン済み」になれば完了。パネルは自動で再接続します

ターミナルでサインインしたい場合は、カードの「別の方法: ターミナルからサインイン」を開くと実行するコマンドが表示されます。ターミナルで `claude` を起動して `/login` を実行し、終わったらカードの「再確認」を押します。

### サブスクリプションとAPIキー

エディタの環境に環境変数 `ANTHROPIC_API_KEY` があると、CLI自身の判断でそちらが使われ、従量課金のAPI経由になります。実際に使われている方式は、設定の **接続** → **エージェント** に表示されます。

| サインイン方式 | 動作 |
|-----|------|
| **自動（CLIに任せる）**（既定） | `ANTHROPIC_API_KEY` があればそれを使い、無ければサインインしたアカウントを使う |
| **サブスクリプションのみ** | パネルが `ANTHROPIC_API_KEY` をCLIに渡さず、常にサインインしたアカウントを使う |

::: warning APIキーの扱い
APIキーはパネルには保存されません。OSの環境変数か、CLI自身の設定ファイルに置いてください。環境変数を変更した場合は、エディタ（Unity Hubから起動している場合はUnity Hubも）の再起動が必要です。
:::

## 準備完了

ステータスバーが「待機中」になり、入力欄に「Claude に聞く...」と表示されれば準備完了です。入力欄に依頼を書き、**Enter** で送信します。

次は[使い方](./usage)を確認してください。
