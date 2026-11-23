# LipSyncSetter

> リップシンクの設定を補助するUnity拡張

<div class="tool-links">
  <a href="vcc://vpm/addRepo?url=https://c-colloid.github.io/vpm/index.json" class="tool-link primary">VCCに追加</a>
  <a href="https://github.com/c-colloid/LipSyncSetter" class="tool-link" target="_blank">GitHub</a>
</div>

LipSyncSetterは、VRChatアバターのリップシンクをアニメーターに登録するツールです。アバターディスクリプターのリップシンク設定を読み取り、アニメーションとFXレイヤーのレイヤーを自動で作成します。表情アニメーションとリップシンクが干渉する問題への対策として使えます。

## 主な機能

| 機能 | 説明 |
|-----|------|
| **非破壊版** | 右クリックメニューからコンポーネントを追加するだけ。アップロード時に自動で適用 |
| **従来版** | エディタウィンドウから、FXレイヤーへリップシンクを直接書き込み |
| **自動割り当て** | アバターディスクリプターのリップシンク情報とFXレイヤーを自動で取得 |
| **BlendShapeの変更** | 各Visemeに割り当てるBlendShapeをドロップダウンから変更可能 |
| **新規FXレイヤー** | 既存のFXレイヤーに上書きせず、新しいFXレイヤーに統合するオプション（従来版） |
| **VoiceBoost** | VoiceBoostのメニューをExpression Menuに追加（v1.5.0〜） |

## クイックスタート

### 1. インストール

上の「VCCに追加」ボタンをクリックしてリポジトリを追加

### 2. 追加（非破壊版）

Hierarchy上でアバターを右クリックし、**Add LipSyncSetter** を選択

### 3. 設定

1. 追加されたオブジェクトのInspectorで **Face Mesh** に顔のメッシュを設定
2. LipSyncの各項目が目的のBlendShapeになっているか確認
3. そのままアバターをアップロード

::: tip 詳細な手順
[導入方法](./getting-started) と [使い方](./usage) で詳しい手順を確認できます
:::

## こんな時に便利

- 表情アニメーションにリップシンク用のシェイプキーを用意したい
- StateBehaviorでリップシンクを止めた際に、変な表情になるのを避けたい
- 表情に合わせてリップシンクを変えたい
