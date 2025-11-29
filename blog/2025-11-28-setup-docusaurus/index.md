---
authors: [nnna]
tags: []
---

# docusaurusのセットアップ
yarnを使用したdocusaurusのセットアップ手順を記しておく．

<!-- truncate -->

https://www.npmjs.com/package/create-docusaurus
## docusaurusプロジェクトの開始
```bash
yarn create docusaurus G-2-yama.github.io classic --typescript
```

```bash
cd G-2-yama.github.io classic
```

## リモート(GitHub)の追加
```bash
git init
git add .
git commit -m "init"
git remote add origin git@github.com:G-2-yama/G-2-yama.github.io.git
git branch -M main
git push -u origin main
```

## github pages用のリポジトリ作成
```bash
git checkout --orphan gh-pages
git rm -rf .
touch .gitkeep
git add .gitkeep
git commit -m "Initialize gh-pages branch"
git push origin gh-pages

git switch main
```

## 補足
### CSS
docusaurusでは以下が使われている．
https://infima.dev/