#!/bin/bash
set -e

# GitHubユーザIDの取得
GH_USER=$(gh api user --jq .login)
if [ -z "$GH_USER" ]; then
    echo "ERROR: Cannot login to GitHub CLI or cannot get user ID."
    exit 1
fi

BASE_BRANCH="main"
MY_BRANCH="dev/$GH_USER"
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo '')

# 1. ブランチの適切な切り替え
if [ "$CURRENT_BRANCH" = "$BASE_BRANCH" ]; then
    echo "LOG: Switching branch from $BASE_BRANCH to $MY_BRANCH ."
    git switch "$MY_BRANCH" 2>/dev/null || git switch -c "$MY_BRANCH"
    CURRENT_BRANCH="$MY_BRANCH"
fi

# 2. 変更のコミット
git add -A
if git diff --cached --exit-code --quiet; then
    echo "LOG: No changes to commit. Checking if remote sync is needed..."
    # ローカルにコミットすべき差分がなく，かつリモートと差がない場合は終了
    if git rev-parse --verify "origin/$CURRENT_BRANCH" >/dev/null 2>&1; then
        if [ -z "$(git log origin/$CURRENT_BRANCH..HEAD 2>/dev/null)" ]; then
            echo "LOG: No local changes and already synced with remote. Exiting."
            exit 0
        fi
    fi
else
    COMMIT_MSG="add: update articles ($(date '+%Y-%m-%d %H:%M'))"
    echo "LOG: Committing changes with message: $COMMIT_MSG"
    git commit -m "$COMMIT_MSG"
fi

# 3. BASE_BRANCH の更新をマージで取り込む
echo "LOG: Fetching and merging $BASE_BRANCH..."
git fetch origin "$BASE_BRANCH"
if ! git merge "origin/$BASE_BRANCH" --no-edit; then
    echo "ERROR: Conflict with $BASE_BRANCH. Please resolve manually."
    git merge --abort
    exit 1
fi

# 4. 自分のリモートブランチとも同期
if git ls-remote --exit-code --heads origin "$CURRENT_BRANCH" >/dev/null 2>&1; then
    echo "LOG: Pulling and merging from remote '$CURRENT_BRANCH'..."
    if ! git pull origin "$CURRENT_BRANCH" --no-rebase --no-edit; then
        echo "ERROR: Conflict with remote $CURRENT_BRANCH. Please resolve manually."
        exit 1
    fi
fi

# 5. pushを実行
echo "LOG: Pushing changes to origin/$CURRENT_BRANCH..."
if ! git push origin "$CURRENT_BRANCH" --force-with-lease; then
    echo "ERROR: Push failed. Check your network or permissions."
    exit 1
fi

# 6. プルリクの存在確認と作成
echo "LOG: Checking existing Pull Request..."
# 自分のブランチから BASE_BRANCH への PR がすでにあるか確認
PR_EXISTS=$(gh pr list --head "$CURRENT_BRANCH" --base "$BASE_BRANCH" --state open --json number --jq '.[0].number')

if [ -z "$PR_EXISTS" ]; then
    echo "LOG: Creating new Pull Request..."
    gh pr create --fill --base "$BASE_BRANCH" --head "$CURRENT_BRANCH"
else
    echo "LOG: Pull Request #$PR_EXISTS already exists. Skipping creation."
fi

echo "Deployment process completed successfully."

