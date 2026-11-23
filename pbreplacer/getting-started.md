# 導入方法

## インストール

### VCCでインストール（推奨）

1. VRChat Creator Companion (VCC) を開く
2. **Settings** → **Packages** → **Add Repository**
3. 以下のURLを入力:
   ```
   https://c-colloid.github.io/vpm/index.json
   ```
4. 「Add」をクリック
5. プロジェクトを開き、「Manage Project」から **PBReplacer** を追加

::: info
ALCOMでも同じVPMリポジトリを追加して導入できます。
:::

### unitypackageでインストール

[GitHub Releases](https://github.com/c-colloid/PBReplacer-VPM/releases) からunitypackageを入手できます。

::: warning
unitypackageで導入した場合、依存パッケージの UITK Font Fix は自動では入りません。日本語表示については [困ったとき](./troubleshooting#日本語が豆腐になる) を参照してください。
:::

## 依存パッケージ

| パッケージ | 備考 |
|-----------|------|
| VRChat Avatars SDK | 必須 |
| [UITK Font Fix](https://github.com/c-colloid/UITKFontFix) | UIの日本語表示に使用。VPMから導入すると自動で入ります |

## 連携する拡張

導入されていれば自動で有効になります。

- **Modular Avatar**：Merge Armature 付きの衣装を、衣装単位で再配置・移植できます
- **NDMF**：PBRemapをビルド時に非破壊で処理します

## 起動方法

PBReplacerはエディターウィンドウとして動作します。次のいずれかで開けます。

### 方法1: メニューバーから

```
Tools → PBReplacer
```

### 方法2: Hierarchyの右クリックメニュー

Hierarchy上でオブジェクトを右クリック → **PBReplacer for Selected**

選択中のオブジェクトを対象にウィンドウが開きます。

## 次のステップ

[使い方](./usage) で再配置の手順を確認してください。
