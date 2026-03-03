#!/bin/bash
git config --global user.name "${GIT_USER_NAME}"
git config --global user.email "${GIT_USER_EMAIL}"
git config --global --add safe.directory /app

yarn install
yarn start --host 0.0.0.0 --no-open &
exec code-server --bind-addr 0.0.0.0:8080 --auth password .
