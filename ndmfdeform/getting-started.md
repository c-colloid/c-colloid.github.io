# 導入方法

## 前提パッケージ

NDMFDeformは次のパッケージに依存します。VCC経由で導入すると自動で追加されます。

| パッケージ | 必要バージョン |
|-----------|---------------|
| NDMF (`nadena.dev.ndmf`) | 1.6.0 以上 |
| UITK Font Fix (`jp.colloid.uitk-font-fix`) | 0.4.1 以上 |

対応するUnityのバージョンは2022.3です。

## インストール

### VCCでインストール

1. VRChat Creator Companion (VCC) を開く
2. **Settings** → **Packages** → **Add Repository**
3. 以下のURLを入力:
   ```
   https://c-colloid.github.io/vpm/index.json
   ```
4. 「Add」をクリック
5. プロジェクトを開き、「Manage Project」から **NDMFDeform** を追加

::: info
ALCOMでも同じVPMリポジトリを追加して導入できます。
:::

## 導入の確認

導入後、Hierarchy上のGameObjectを右クリックすると **NDMF Deform** のメニューが表示されます。メニューが表示されれば導入は完了です。

次は [使い方](./usage) に進んでください。
