#!/bin/bash

set -e

echo "🔧 Configurando deploy agro-homepage no GCP..."
echo ""

# ⚠️ EDITE APENAS ESTAS 3 LINHAS COM SEUS DADOS
PROJECT_ID="agrogame"
SERVICE_NAME="agro-homepage"
REGION="us-central1"

# =====================================================

echo "📝 Criando Service Account específico para Frontend (agro-homepage)..."
gcloud iam service-accounts create bitbucket-pipelines-web \
  --display-name="Bitbucket Pipelines Deploy (Frontend - agro-homepage)" \
  --project=$PROJECT_ID 2>/dev/null || echo "✓ Service account já existe"

SA_EMAIL="bitbucket-pipelines-web@${PROJECT_ID}.iam.gserviceaccount.com"
echo "✓ Service Account: $SA_EMAIL"

echo ""
echo "🔑 Concedendo permissões necessárias..."

# Cloud Build - para construir imagens
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$SA_EMAIL" \
  --role="roles/cloudbuild.builds.editor" \
  --quiet 2>/dev/null && echo "✓ Cloud Build Editor"

# Cloud Run - para fazer deploy
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$SA_EMAIL" \
  --role="roles/run.admin" \
  --quiet 2>/dev/null && echo "✓ Cloud Run Admin"

# Artifact Registry - para push de imagens
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$SA_EMAIL" \
  --role="roles/artifactregistry.writer" \
  --quiet 2>/dev/null && echo "✓ Artifact Registry Writer"

# Service Account User - para assumir permissões
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$SA_EMAIL" \
  --role="roles/iam.serviceAccountUser" \
  --quiet 2>/dev/null && echo "✓ Service Account User"

echo ""
echo "🔐 Gerando chave de autenticação..."
gcloud iam service-accounts keys create key.json \
  --iam-account=$SA_EMAIL \
  --project=$PROJECT_ID 2>/dev/null

KEY_B64=$(cat key.json | base64 -w 0)

echo ""
echo "======================================================"
echo "✅ SETUP CONCLUÍDO COM SUCESSO!"
echo "======================================================"
echo ""
echo "📋 COPIE E COLE ESTAS VARIÁVEIS NO BITBUCKET:"
echo ""
echo "Vá em: https://bitbucket.org/seu-workspace/agro-homepage"
echo "→ Repository settings → Pipelines → Environment variables"
echo ""
echo "GCP_PROJECT=$PROJECT_ID"
echo "ARTIFACT_REGISTRY_REPO=$REGION-docker.pkg.dev/$PROJECT_ID/docker-registry"
echo "IMAGE_NAME=$SERVICE_NAME"
echo "CLOUD_RUN_SERVICE=$SERVICE_NAME"
echo "CLOUD_RUN_REGION=$REGION"
echo "CLOUD_RUN_SERVICE_ACCOUNT=$SA_EMAIL"
echo "GCP_KEYFILE_BASE64=$KEY_B64"
echo ""
echo "⚠️  NÃO ESQUEÇA:"
echo "   - Marque GCP_KEYFILE_BASE64 como 'Secured' ✓"
echo "   - Copie a chave EXATAMENTE como mostrado"
echo ""
echo "======================================================"
echo "🔒 LIMPANDO ARQUIVOS SENSÍVEIS..."
rm -f key.json
echo "✓ key.json deletado (nunca compartilhe!)"
echo "======================================================"