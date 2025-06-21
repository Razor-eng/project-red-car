#!/bin/bash

echo "Propagating base changes..."

for tenant in tenants/*; do
  echo "Updating $tenant..."

  rsync -a --delete base-nextjs/ $tenant/frontend/ --exclude=node_modules --exclude=.next
  rsync -a --delete base-strapi/ $tenant/cms/ --exclude=node_modules --exclude=.tmp

  docker compose -f $tenant/docker-compose.yml build
  docker compose -f $tenant/docker-compose.yml up -d
done
