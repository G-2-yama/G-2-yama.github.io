# G^2 組織ページ

## 開発環境

CIで使用するNode.jsのバージョンは`.nvmrc`で管理しています。
2026年10月21日公開のセキュリティ修正を含む26.12.1を指定しています。
開発環境でも同じバージョンの使用を推奨します。

```sh
nvm install
nvm use
yarn install --frozen-lockfile
yarn build
```

nvm-windowsでは`nvm install 26.12.1`、`nvm use 26.12.1`を実行してください。
PowerShellで`yarn.ps1`の実行が制限されている場合は、`yarn.cmd`を使用できます。

Node.jsを更新するときは、公式のセキュリティ情報を確認し、`.nvmrc`と
`package.json`の`engines.node`を更新してビルドを確認してください。
