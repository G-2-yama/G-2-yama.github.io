#!/bin/bash
set -e

git config --global user.name "${GIT_USER_NAME}"
git config --global user.email "${GIT_USER_EMAIL}"
git config --global --add safe.directory /app

if [ ! -d "node_modules" ]; then
    yarn install
fi

yarn start --host 0.0.0.0 --no-open &
exec code-server --bind-addr 0.0.0.0:8080 --auth password .
