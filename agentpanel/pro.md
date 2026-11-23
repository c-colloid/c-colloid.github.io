# Agent Panel Pro

Agent Panel Proは、無料のAgent Panel for Unity（Core）に、Unity操作ツールと同梱プロファイルを追加する別売のパッケージです（パッケージ名は `jp.colloid.agent-panel-pro`）。ツールはすべてCoreのチャット画面からエージェント（Claude Codeなど）が呼び出すもので、スクリプトを書かせずに、プレハブ・アニメーション・ライトマップ・メッシュなどを直接編集させられます。

::: info 購入・価格について
購入方法や価格はこのサイトでは扱いません。入手については、GitHubのリポジトリの案内を確認してください。
:::

## Coreとの違い

| | Core | Pro |
|-----|-----|-----|
| パッケージ | `jp.colloid.unity-agent-panel` | `jp.colloid.agent-panel-pro` |
| ライセンス | MIT | PolyForm Internal Use License 1.0.0 |
| 位置づけ | 単体ですべての基本機能が動く | Coreに追加して使う（別売） |

PolyForm Internal Use License 1.0.0は、内部利用と改変は可、配布は不可というライセンスです。条文と作者からの追加許諾は、Proパッケージ内の `LICENSE.md` / `LICENSE-ADDITIONAL.md` にあります。

## 動作要件

- Unity 2022.3 LTS以降（Unity 6系を含む）
- Agent Panel for Unity（Core）

## 導入と更新

購入時に受け取るレジストリURLと製品キーを、設定の **接続** → **Agent Panel Pro の更新** に入力します。以後は、Package ManagerまたはVCC / ALCOMから導入・更新できます。

## 追加されるモジュール

ツールはモジュール単位で、設定の **Unity連携** → **Unity操作(UapOps)** からオン / オフできます。Pro未導入の間は、該当モジュールのトグルが無効になります。

| モジュール | できること |
|-----|------|
| **プレハブ** | プレハブの作成・変換、オーバーライドの適用と差し戻し、Prefab Modeの操作 |
| **アニメーション** | AnimationClipとAnimatorControllerの作成・編集、BlendTree、AvatarMask、Humanoid設定 |
| **ライトマップ** | Progressive LightmapperとBakeryの非同期ベイク |
| **UI操作** | UI Toolkit製のエディタウィンドウ（SDK独自のウィンドウなど）の自動操作 |
| **プロファイル作成** | 自作の拡張プロファイルとClaude Codeスキルの下書き・検証 |
| **アバター** | アバターの計測、NDMFの手動ベイク、VRChatメニューの編集 |
| **パーティクル** | Particle Systemの全モジュールの読み書きとプリセット |
| **メッシュ・マテリアル** | メッシュの生成・編集・ブーリアン・検証と修復、マテリアル・テクスチャ・シェーダーの生成、glTFの入出力 |
| **非破壊モデリング** | 形状ノードを組み合わせて作る編集可能なモデルと、ゲーム用アセットへの書き出し |
| **一括実行** | 複数のツール呼び出しを許可カード1枚で実行 |
| **テスト実行** | EditMode / PlayModeテストの実行と失敗の報告 |
| **ホットリロード / 一時停止ポイント** | 変更したstaticメソッドの中身をドメインリロードなしで差し替え、指定行でローカル変数を記録して一時停止 |

::: warning ホットリロード / 一時停止ポイント
この2つは既定ではオフのモジュールです。Harmonyで実行中のコードを書き換えるため、Monoスクリプトランタイムでのみ動作します。許可カードは、どの自動承認レベルでも省略されません。
:::

::: tip ツールの名前
ツール名（`uap_*`）はエージェントが呼ぶ名前で、利用者が入力する必要はありません。やりたいことを普通の言葉で依頼してください。
:::

## 同梱プロファイル

対応SDKがプロジェクトに入っていると自動で有効になり、そのSDKの要点をエージェントに教えるプロファイルが同梱されています。対象は次のとおりです。

- VRChat SDK3（共通 / アバター / ワールド）、Udon、UdonSharp
- NDMF、Modular Avatar、AAO: Avatar Optimizer、VRCFury、lilycalInventory、lilToon
- UniVRM、MagicaCloth2、Final IK、Bakery、ProBuilder、RPG Maker Unite
- モデリング作法（メッシュモジュールが有効なときだけ）

Pro未導入のプロジェクトでは、対応SDKが入っていてもこれらのプロファイルは検出されません。一方、プロジェクト独自のプロファイル（`.uap-profiles/*.json`）はCoreだけで使えます。

## 詳細

収録機能の最新の一覧は、GitHubのリポジトリで公開されている収録機能一覧（`docs/PRO-FEATURES.md`）を確認してください。

[GitHub](https://github.com/c-colloid/AgentPanelForUnity)
