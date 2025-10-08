# Guia de Deploy no Vercel

## 🚀 Configuração Inicial do Vercel

### 1. Criar conta e projeto no Vercel

1. **Acesse https://vercel.com/** e faça login com GitHub
2. **Conecte o repositório:**
   - Clique em "New Project"
   - Selecione o repositório `Shophere-Full`
   - Configure as seguintes opções:

```
Project Name: shophere-production
Framework Preset: Other
Root Directory: ./
Build Command: cd frontend && npm run build
Output Directory: frontend/dist
Install Command: npm install && cd frontend && npm install && cd ../backend && npm install
```

### 2. Configurar Variáveis de Ambiente

#### Produção (Main Branch):
```env
NODE_ENV=production

# Database (PlanetScale Production)
DB_HOST=aws.connect.psdb.cloud
DB_USER=seu_usuario_planetscale
DB_PASSWORD=sua_senha_planetscale
DB_NAME=shophere-db

# JWT
JWT_SECRET=seu_jwt_secret_super_seguro

# CORS
CORS_ORIGIN=https://shophere-production.vercel.app
```

#### Staging (Develop Branch) - Criar projeto separado:
```
Project Name: shophere-staging
```

```env
NODE_ENV=staging

# Database (PlanetScale Develop Branch)
DB_HOST_STAGING=aws.connect.psdb.cloud
DB_USER_STAGING=seu_usuario_planetscale_staging
DB_PASSWORD_STAGING=sua_senha_planetscale_staging
DB_NAME_STAGING=shophere-db-staging

# JWT
JWT_SECRET=seu_jwt_secret_staging

# CORS
CORS_ORIGIN=https://shophere-staging.vercel.app
```

### 3. Configurar GitHub Secrets

Vá em `Settings → Secrets and Variables → Actions` do seu repositório GitHub e adicione:

```
VERCEL_TOKEN=seu_vercel_token
VERCEL_ORG_ID=seu_org_id
VERCEL_PROJECT_ID=id_do_projeto_producao
VERCEL_PROJECT_ID_STAGING=id_do_projeto_staging
```

#### Como obter os valores:

1. **VERCEL_TOKEN:**
   - Vá em https://vercel.com/account/tokens
   - Crie um novo token
   - Copie o valor

2. **VERCEL_ORG_ID:**
   - Execute `vercel` no terminal
   - Ou vá em Settings do projeto → General → Project ID

3. **VERCEL_PROJECT_ID:**
   - Vá em Settings do projeto de produção → General
   - Copie o Project ID

4. **VERCEL_PROJECT_ID_STAGING:**
   - Vá em Settings do projeto de staging → General
   - Copie o Project ID

### 4. Configurar Domínios (Opcional)

#### Produção:
- Domínio: `shophere.com.br` (exemplo)
- Branch: `main`

#### Staging:
- Domínio: `staging.shophere.com.br` (exemplo)
- Branch: `develop`

### 5. Configurações Avançadas

#### Em vercel.json (já configurado):
- Timeout de funções: 30s
- Redirecionamentos de API
- Servir arquivos estáticos

#### Branch Settings:
- **Production:** Só deploys da branch `main`
- **Preview:** Deploys da branch `develop` e PRs

## 🎯 Fluxo de Deploy

### Desenvolvimento:
1. Fazer mudanças em branch feature
2. Abrir PR para `develop`
3. GitHub Actions roda testes
4. Merge para `develop` → Deploy automático no staging

### Produção:
1. Abrir PR de `develop` para `main`
2. Review e aprovação
3. Merge para `main` → Deploy automático na produção

## 🔧 Troubleshooting

### Problemas comuns:

1. **Build falha:**
   - Verificar se todas as dependências estão no package.json
   - Verificar variáveis de ambiente

2. **API não funciona:**
   - Verificar configuração do banco de dados
   - Verificar roteamento no vercel.json

3. **CORS Error:**
   - Verificar CORS_ORIGIN nas variáveis de ambiente
   - Verificar configuração no backend

### Logs úteis:
```bash
# Ver logs do Vercel
vercel logs [deployment-url]

# Testar build localmente
npm run build
```

## ✅ Checklist Final

- [ ] Repositório GitHub configurado
- [ ] Banco de dados PlanetScale criado
- [ ] Variáveis de ambiente configuradas
- [ ] GitHub Secrets adicionados
- [ ] Projetos Vercel criados (produção e staging)
- [ ] Primeiro deploy funcionando
- [ ] Domínios configurados (opcional)
- [ ] Monitoramento configurado (opcional)