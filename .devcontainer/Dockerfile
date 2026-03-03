FROM node:lts-bookworm

# 必要なパッケージのインストール
RUN apt-get update && apt-get install -y \
    git \
    curl \
    bash-completion \
    # github-cli のインストール(公式の手順をdockerfileファイル用に調整)
	&& mkdir -p -m 755 /etc/apt/keyrings /etc/apt/sources.list.d \
	&& curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | tee /etc/apt/keyrings/githubcli-archive-keyring.gpg > /dev/null \
	&& chmod go+r /etc/apt/keyrings/githubcli-archive-keyring.gpg \
	&& echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
	&& apt update && apt install -y gh \
    && rm -rf /var/lib/apt/lists/*

# Code-Serverとgo-taskのインストール
RUN curl -fsSL https://code-server.dev/install.sh | sh \
    && sh -c "$(curl --location https://taskfile.dev/install.sh)" -- -d -b /usr/local/bin

# ユーザー設定 (rootを使わない)
USER node
WORKDIR /app

# ユーザ独自のシェル設定(.bashrc)を更新
RUN echo 'eval "$(task --completion bash)"' >> /home/node/.bashrc

# 拡張機能の自動インストール
RUN code-server --install-extension eliostruyf.vscode-front-matter \
    && code-server --install-extension esbenp.prettier-vscode \
    && code-server --install-extension task.vscode-task

# 起動スクリプトの配置
COPY --chmod=755 .devcontainer/entrypoint.sh /usr/local/bin/entrypoint.sh
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
