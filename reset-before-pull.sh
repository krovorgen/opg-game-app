#!/bin/bash

git reset --hard HEAD
git clean -f

docker system prune --volumes -f
# shellcheck disable=SC2046
docker rmi -f $(docker images -aq)
git pull
