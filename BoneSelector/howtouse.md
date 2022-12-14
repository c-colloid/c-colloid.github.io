---
title: 使い方
description: BoneSelectorの使い方
summary: BoneSelectorはエディターのメニューによる操作とボーンについたコンポーネントによる操作に分けられています
permalink: BShowtouse.html
---
## 基本的な使い方

[導入方法・起動方法](start.md)に従ってボーン表示を行うとアーマチュア以下のオブジェクトが全てボーンとして表示されます

非表示にしているオブジェクトは除外されます

表示されているボーンをクリックすることで選択することが出来ます

選択されているボーンは赤色にハイライトされます

ボーンの見た目はエディター上から変更することが出来ます

## エディターの見かた

エディターウィンドウではBoneSelectorの表示をカスタマイズできます

![エディター画像](../Pictures/BoneSelector/HowtoUse01.jpg)

### 1.Avatar
ボーンを表示させたいアバターを選択します

現在、AvatarDiscriptorの付いたアバターのみが対象となっています

### 2.FormType
ボーンの表示形式を変更します

### 3.BoneColor
ボーンの色を変更できます

### 4.InFront
ボーンを最前面に表示するかどうかを変更します

現在WireMesh式では最前面表示しかできません

### 5.HumanoidBone
Rigでヒューマノイドに設定したボーンを表示するかどうかを設定します

### 6.BoneName
ボーンの名前を表示するかどうかを設定します

### 7.Button
ボーンの表示のオンオフをコントロールします

ボーン表示中に動かしたボーンは機能をオフにすると元の位置に戻ります

## コンポーネントの見かた
ボーンを表示中は各ボーンにBoneSettingというコンポーネントが付きます

こちらではボーンの操作をコントロールできます

![コンポーネント画像](../Pictures/BoneSelector/HowtoUse02.jpg)

### 1.DrawBone
選択したボーンを非表示にできます

一時的に表示を消しておきたいボーンはこちらをオフにしてください

### 2.BakePose
オンにするとボーン表示中に動かしたボーンの位置を固定できます