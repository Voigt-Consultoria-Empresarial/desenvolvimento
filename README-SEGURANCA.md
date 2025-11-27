# 🔒 Configuração Segura do Supabase

Este documento explica como configurar as credenciais do Supabase de forma segura para desenvolvimento local e produção no Netlify.

## ⚠️ ALERTA CRÍTICO DE SEGURANÇA

**ATENÇÃO:** Se você encontrou este projeto após um commit anterior que continha credenciais expostas:

1. **REGENERE IMEDIATAMENTE** as seguintes credenciais no painel do Supabase:
   - `database_password` (senha do banco de dados)
   - `service_role_secret` (chave de serviço - acesso total)
   - `legacy_jwt_secret` (se ainda estiver em uso)

2. **Revise o histórico do Git** - As credenciais podem ainda estar visíveis em commits antigos

3. **Nunca commite** arquivos na pasta `credenciais/` ou `sdk/config.js` com dados reais

**Status Atual:** ✅ Arquivos sensíveis foram removidos do Git e adicionados ao `.gitignore`

## 📋 Pré-requisitos

- Node.js instalado (para o script de build)
- Credenciais do Supabase (URL e Anon Key)

## 🛠️ Configuração para Desenvolvimento Local

### Opção 1: Usando arquivo .env (Recomendado)

1. **Crie um arquivo `.env` na raiz do projeto:**

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon-aqui
```

2. **Execute o script de build para gerar o config.js:**

```bash
node scripts/build-config.js
```

3. **O arquivo `sdk/config.js` será gerado automaticamente.**

### Opção 2: Edição Manual (Apenas para testes rápidos)

1. **Edite diretamente o arquivo `sdk/config.js`:**
   - Abra `sdk/config.js`
   - Substitua os valores de `url` e `anonKey` com suas credenciais

⚠️ **Nota:** Esta opção não é recomendada para produção, pois as credenciais ficarão no código.

## 🚀 Configuração para Produção (Netlify)

### Passo 1: Configurar Variáveis de Ambiente no Netlify

1. Acesse o painel do Netlify: https://app.netlify.com
2. Vá em **Site settings** → **Environment variables**
3. Adicione as seguintes variáveis:

| Nome | Valor | Descrição |
|------|-------|-----------|
| `VITE_SUPABASE_URL` | `https://seu-projeto.supabase.co` | URL do projeto Supabase |
| `VITE_SUPABASE_ANON_KEY` | `sua-chave-anon-aqui` | Chave pública anônima do Supabase |

### Passo 2: Configurar Build Command

O arquivo `netlify.toml` já está configurado para executar o script de build automaticamente. O Netlify irá:

1. Ler as variáveis de ambiente configuradas
2. Executar `node scripts/build-config.js`
3. Gerar o arquivo `sdk/config.js` com as credenciais
4. Fazer o deploy do site

### Passo 3: Deploy

Após configurar as variáveis de ambiente, faça o deploy normalmente. O Netlify executará o build command automaticamente.

## 📁 Estrutura de Arquivos

```
projeto/
├── .env                    # Variáveis de ambiente (local, não commitado)
├── .env.example           # Template de exemplo (commitado)
├── netlify.toml           # Configuração do Netlify
├── scripts/
│   └── build-config.js    # Script que gera config.js
├── sdk/
│   ├── config.js          # Configuração gerada (não editar manualmente em produção)
│   └── blog-supabase.js   # SDK do blog que usa config.js
└── ...
```

## 🔐 Segurança

### ✅ Boas Práticas Implementadas

- ✅ Credenciais não ficam hardcoded no código fonte
- ✅ Variáveis de ambiente para desenvolvimento e produção
- ✅ Arquivo `.env` não é commitado (deve estar no `.gitignore`)
- ✅ Script de build valida as credenciais antes de gerar o arquivo
- ✅ Configuração separada para desenvolvimento e produção

### ⚠️ Importante

1. **NUNCA** commite o arquivo `.env` no Git
2. **NUNCA** commite o arquivo `sdk/config.js` com credenciais reais
3. **SEMPRE** use variáveis de ambiente em produção
4. **VERIFIQUE** se o `.gitignore` inclui `.env` e `sdk/config.js` (se necessário)

## 🧪 Testando a Configuração

### Teste Local

1. Configure o arquivo `.env`
2. Execute: `node scripts/build-config.js`
3. Abra o site localmente e verifique se os dados do blog carregam corretamente

### Teste no Netlify

1. Configure as variáveis de ambiente no painel do Netlify
2. Faça o deploy
3. Verifique os logs de build para confirmar que o `config.js` foi gerado
4. Teste o site em produção

## 🐛 Troubleshooting

### Erro: "SUPABASE_CONFIG não encontrado"

**Causa:** O arquivo `config.js` não está sendo carregado antes do `blog-supabase.js`.

**Solução:** Verifique se o HTML inclui os scripts na ordem correta:
```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="./sdk/config.js"></script>
<script src="./sdk/blog-supabase.js"></script>
```

### Erro: "Variáveis de ambiente não encontradas"

**Causa:** As variáveis não estão configuradas corretamente.

**Solução:**
- Em desenvolvimento: Verifique se o arquivo `.env` existe e está correto
- Em produção: Verifique se as variáveis estão configuradas no Netlify

### Erro no Build do Netlify

**Causa:** Node.js não está disponível ou o script falhou.

**Solução:**
1. Verifique se o Netlify está usando Node.js (deve estar configurado automaticamente)
2. Verifique os logs de build no Netlify para mais detalhes
3. Certifique-se de que as variáveis de ambiente estão configuradas

## 📞 Suporte

Para dúvidas ou problemas, consulte a documentação do Supabase ou entre em contato com a equipe de desenvolvimento.

