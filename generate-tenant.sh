#!/bin/bash

TENANT=$1
DOMAIN=$2
VAULT_TOKEN=$3
VAULT_ADDR=$4

if [ -z "$TENANT" ] || [ -z "$DOMAIN" ]; then
  echo "Usage: $0 <tenant-name> <domain>"
  exit 1
fi

echo "Creating tenant: $TENANT with domain $DOMAIN"

# Percorsi
TENANT_DIR="tenants/$TENANT"
FRONTEND_ENV_TEMPLATE=".env.template.frontend"
CMS_ENV_TEMPLATE=".env.template.cms"

export VAULT_ADDR="$VAULT_ADDR"
export VAULT_TOKEN="$3"

SECRET_PATH="kv/$TENANT"
APP_KEYS=$(vault kv get -format=json $SECRET_PATH | grep '"APP_KEYS"' | awk -F '"' '{print $4}')
API_TOKEN_SALT=$(vault kv get -format=json $SECRET_PATH | grep '"API_TOKEN_SALT"' | awk -F '"' '{print $4}')
ADMIN_JWT_SECRET=$(vault kv get -format=json $SECRET_PATH | grep '"ADMIN_JWT_SECRET"' | awk -F '"' '{print $4}')
TRANSFER_TOKEN_SALT=$(vault kv get -format=json $SECRET_PATH | grep '"TRANSFER_TOKEN_SALT"' | awk -F '"' '{print $4}')

if [ -z "$APP_KEYS" ] || [ -z "$API_TOKEN_SALT" ] || [ -z "$ADMIN_JWT_SECRET" ] || [ -z "$TRANSFER_TOKEN_SALT" ]; then
  # Generate secrets
  APP_KEYS=$(openssl rand -base64 16),$(openssl rand -base64 16),$(openssl rand -base64 16)
  API_TOKEN_SALT=$(openssl rand -base64 16)
  ADMIN_JWT_SECRET=$(openssl rand -base64 16)
  TRANSFER_TOKEN_SALT=$(openssl rand -base64 16)
  # Save secrets to key vault
  vault kv put "$SECRET_PATH" APP_KEYS="$APP_KEYS" API_TOKEN_SALT="$API_TOKEN_SALT" ADMIN_JWT_SECRET="$ADMIN_JWT_SECRET" TRANSFER_TOKEN_SALT="$TRANSFER_TOKEN_SALT"
fi

if [ $? -eq 0 ]; then
  echo "Secret written successfully."
else
  echo "Failed to write secret."
  exit 1
fi

# Verifica file .env template
if [ ! -f "$FRONTEND_ENV_TEMPLATE" ] || [ ! -f "$CMS_ENV_TEMPLATE" ]; then
  echo "Errore: assicurati che esistano i file $FRONTEND_ENV_TEMPLATE e $CMS_ENV_TEMPLATE"
  exit 1
fi

# Crea cartelle tenant
mkdir -p "$TENANT_DIR"
cp -r base-nextjs "$TENANT_DIR/frontend"
cp -r base-strapi "$TENANT_DIR/cms"

# Copia e personalizza .env
cp "$FRONTEND_ENV_TEMPLATE" "$TENANT_DIR/frontend/.env"
cp "$CMS_ENV_TEMPLATE" "$TENANT_DIR/cms/.env"

cat <<EOF >>"$TENANT_DIR/cms/.env"

APP_KEYS=${APP_KEYS}
API_TOKEN_SALT=${API_TOKEN_SALT}
ADMIN_JWT_SECRET=${ADMIN_JWT_SECRET}
TRANSFER_TOKEN_SALT=${TRANSFER_TOKEN_SALT}
EOF

# Sostituisci variabili nei file .env
sed -i "s/{{DOMAIN}}/$DOMAIN/g" "$TENANT_DIR/frontend/.env"
sed -i "s/{{DOMAIN}}/$DOMAIN/g" "$TENANT_DIR/cms/.env"
sed -i "s/{{TENANT}}/$TENANT/g" "$TENANT_DIR/frontend/.env"
sed -i "s/{{TENANT}}/$TENANT/g" "$TENANT_DIR/cms/.env"

# touch "./letsencrypt/$TENANT.json"

# Crea docker-compose.yml
cat <<EOF >"$TENANT_DIR/docker-compose.yml"
services:
  frontend:
    build: ./frontend
    container_name: ${TENANT}_frontend
    restart: always
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.${TENANT}-frontend.rule=Host(\"${DOMAIN}\")"
      - "traefik.http.routers.${TENANT}-frontend.entrypoints=websecure"
      - "traefik.http.routers.${TENANT}-frontend.tls.certresolver=myresolver"
      - "traefik.http.routers.${TENANT}-frontend.tls=true"
      - "traefik.http.routers.${TENANT}-frontend.priority=1"
      - "traefik.http.services.${TENANT}-frontend.loadbalancer.server.port=3000"
    env_file: ./frontend/.env
    environment:
      - NODE_OPTIONS=--max-old-space-size=2048
      # - NODE_TLS_REJECT_UNAUTHORIZED=0
    networks:
      - web

  cms:
    build: ./cms
    container_name: ${TENANT}_cms
    restart: always
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.${TENANT}-cms.rule=Host(\"${DOMAIN}\") && (PathPrefix(\"/admin\") || PathPrefix(\"/api\") || PathPrefix(\"/content-manager\") || PathPrefix(\"/uploads\") || PathPrefix(\"/config\") || PathPrefix(\"/i18n\") || PathPrefix(\"/email\") || PathPrefix(\"/users\") || PathPrefix(\"/roles\"))"
      - "traefik.http.routers.${TENANT}-cms.entrypoints=websecure"
      - "traefik.http.routers.${TENANT}-cms.tls.certresolver=myresolver"
      - "traefik.http.routers.${TENANT}-cms.tls=true"
      - "traefik.http.routers.${TENANT}-cms.priority=2"
      - "traefik.http.services.${TENANT}-cms.loadbalancer.server.port=1337"
    env_file: ./cms/.env
    networks:
      - web

networks:
  web:
    external: true
EOF

# Avvio container
cd "$TENANT_DIR"
docker compose up -d
