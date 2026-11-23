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
5. プロジェクトを開き、「Manage Project」から **LipSyncSetter** を追加

## 起動方法

LipSyncSetterには、使い方の異なる2つのバージョンがあります。

### 非破壊版

Hierarchy上で対象のアバターを右クリックし、**Add LipSyncSetter** を選択します。アバターの子にLipSyncSetterのオブジェクトが追加されます。

::: info
メニューは上部メニューの **GameObject** → **Add LipSyncSetter** にもあります。
:::

### 従来版

```
Tools → LipSyncSetter
```

エディタウィンドウが開きます。

::: tip
どちらを使うかは [使い方](./usage) を参照してください。
:::

## VoiceBoostの追加

Hierarchy上で右クリックし、**Add LSSVoiceBoost** を選択すると、VoiceBoost用のオブジェクトが追加されます。詳しくは [詳細設定](./details#voiceboost) を参照してください。

::: info
NDMF（Non-Destructive Modular Framework）を導入していなくても、従来版は利用できます。
:::
