#!/usr/bin/env bash

docker-compose build

docker-compose up -d --force-recreate --remove-orphans
docker-compose logs -f
