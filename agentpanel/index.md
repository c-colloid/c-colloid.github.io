# Agent Panel for Unity

> UnityエディタにドッキングできるClaude Codeのチャットパネル

<div class="tool-links">
  <a href="vcc://vpm/addRepo?url=https://c-colloid.github.io/vpm/index.json" class="tool-link primary">VCCに追加</a>
  <a href="https://github.com/c-colloid/AgentPanelForUnity" class="tool-link" target="_blank">GitHub</a>
</div>

Agent Panel for Unityは、Claude Code CLIを常駐プロセスとしてUnityエディタに組み込む、エディタ専用のパッケージです。エディタにドッキングしたパネルから、コードを書く・ファイルを直す・シーンを操作するといった作業をエージェントに頼めます。ツールを実行する前には許可カードが出て、スクリプトを再コンパイルしても会話は続きます。

![チャット画面](/images/agentpanel/chat.png)

## 主な機能

| 機能 | 説明 |
|-----|------|
| **チャット** | 応答をストリーミング表示。スラッシュコマンドの補完、思考の要約、サブエージェントの進捗カード、質問カードに対応 |
| **許可カード** | ファイル編集やコマンド実行の前に「許可 / このセッション中は許可 / 拒否」を選択。自動承認の範囲は設定で段階的に広げられます |
| **Unityの文脈を渡す** | HierarchyやProjectの選択、Consoleのエラー、ドラッグしたアセット、画像をワンクリックで添付 |
| **Unity操作ツール** | エージェントがC#を書かずにシーン・コンポーネント・アセットを操作。検索やスクリーンショットも可能で、1ターン分はUndo 1回で戻せます |
| **スクリプト検証ゲート** | エージェントが書いたC#は、コンパイルが通ってからAssetsに入ります（Windows） |
| **ドメインリロード耐性** | 再コンパイルやエディタ再起動の後も、同じセッションに自動で再接続 |
| **履歴・モデル切替・パネル内ログイン** | 過去のセッションの復元、モデルの切替、CLIへのログインをパネル内で完結 |
| **多言語UI** | 日本語 / English。OSの言語に追従し、設定で切り替え可能 |

::: info Claude以外のエージェント
Claude Codeを標準の接続先として、CodexやGrok Build、Gemini CLIなどACP対応のCLIにも切り替えられます。このサイトではClaude Codeを前提に説明します。切り替えの詳細は[GitHubのリポジトリ](https://github.com/c-colloid/AgentPanelForUnity)を参照してください。
:::

## 必要な環境

| 項目 | 内容 |
|-----|------|
| Unity | 2022.3 LTS以降（Unity 6系を含む） |
| OS | Windowsで検証しています。macOS / Linuxは動く想定ですが未検証です |
| Claude Code CLI | 最新版を推奨。未導入ならパネルの案内から導入できます |
| Claudeアカウント | サブスクリプションでのログインを推奨（APIキーでも可） |

必須の依存パッケージはありません。

## クイックスタート

### 1. インストール

上の「VCCに追加」ボタンをクリックしてリポジトリを追加し、プロジェクトに **Agent Panel for Unity** を追加

### 2. 起動

**Window** → **Agent Panel** でパネルを開く

### 3. 使用

1. CLIが無い、または未ログインの場合は、パネルのカードの案内に従って導入とログインを済ませる
2. ステータスバーが「待機中」になったら準備完了
3. 入力欄に依頼を書いて **Enter** で送信

::: tip 詳細な手順
[導入方法](./getting-started)で詳しい手順を確認できます
:::

## こんな時に便利

- Unityエディタを離れずにClaude Codeへ作業を頼みたい
- 選択中のオブジェクトやConsoleのエラーをそのままエージェントに渡したい
- シーンの編集（ライトの追加、オブジェクトの配置や色分けなど）をチャットから頼みたい
- スクリプトの再コンパイルで会話が途切れるのを避けたい

## 使用例

Playerに暖色のPointLightを追加し、Crateを1.5倍に拡大するよう依頼した例です。

![Claude Codeへの依頼と結果](/images/agentpanel/claude-common-task-with-request.png)

## ページ一覧

| ページ | 内容 |
|-----|------|
| [導入方法](./getting-started) | CLIとサインイン、インストール、パネルの開き方 |
| [使い方](./usage) | 画面の構成、チャット、許可カード、Unityの文脈の渡し方 |
| [詳細設定](./details) | Unity操作ツール、再コンパイルとの共存、設定、トラブル対処 |
| [Agent Panel Pro](./pro) | 別売の拡張パッケージ |

::: tip より詳しいガイド
操作ガイドや使用例の全文は、[Agent Panelのドキュメントサイト](https://agentpanel.futeikei.com/)で読めます。
:::
