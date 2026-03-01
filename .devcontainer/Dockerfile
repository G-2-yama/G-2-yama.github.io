FROM node:lts-bookworm

# Code-Serverとツール類のインストール
RUN curl -fsSL https://code-server.dev/install.sh | sh

# 必要なパッケージのインストール
RUN apt-get update && apt-get install -y \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

# ユーザー設定 (securityのためrootを使わない)
USER node

# 拡張機能の自動インストール (Front Matter CMSなど)
# コンテナビルド時に焼き込んでおくことで起動時の待ち時間を減らします
RUN code-server --install-extension eliostruyf.vscode-front-matter \
    && code-server --install-extension esbenp.prettier-vscode
