# 🚀 Guia de Configuração Rápida

## ⚡ Setup Rápido (5 minutos)

### 1️⃣ Desenvolvimento Local

✅ **Já está pronto para desenvolvimento!** 

O arquivo `sdk/config.js` já está criado e funcionando com as credenciais. Você pode usar o site diretamente!

#### Opção A: Usar o config.js existente (Já funcionando!)

O arquivo `sdk/config.js` já está criado e funcionando. Basta abrir o site no navegador!

#### Opção B: Usar arquivo .env (Opcional - para mudar credenciais)

Se quiser usar credenciais diferentes ou gerenciar via `.env`:

1. **Crie o arquivo `.env` na raiz do projeto:**

```bash
# Windows PowerShell
Copy-Item ENV-EXAMPLE.txt .env

# Linux/Mac
cp ENV-EXAMPLE.txt .env
```

2. **Edite o arquivo `.env` e adicione suas credenciais:**

```env
VITE_SUPABASE_URL=https://yihgvuqrdxkeyaitcyie.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon-aqui
```

3. **Gere o arquivo de configuração:**

```bash
npm run build:config
```

**Nota:** O script `build-config.js` é inteligente! Se não encontrar o `.env`, ele usa automaticamente as credenciais do `config.js` existente em desenvolvimento.

### 2️⃣ Produção no Netlify

#### Passo 1: Configure as Variáveis de Ambiente

1. Acesse: https://app.netlify.com
2. Selecione seu site
3. Vá em **Site settings** → **Build & deploy** → **Environment variables**
4. Clique em **Add a variable** e adicione:

   **Variável 1:**
   - Key: `VITE_SUPABASE_URL`
   - Value: `https://yihgvuqrdxkeyaitcyie.supabase.co`

   **Variável 2:**
   - Key: `VITE_SUPABASE_ANON_KEY`
   - Value: `sua-chave-anon-aqui`

#### Passo 2: Configure o Build Command

O arquivo `netlify.toml` já está configurado! O Netlify executará automaticamente:

```bash
node scripts/build-config.js
```

#### Passo 3: Faça o Deploy

1. Faça commit das mudanças
2. Faça push para o repositório
3. O Netlify fará o deploy automaticamente
4. O arquivo `sdk/config.js` será gerado durante o build

## ✅ Verificação

### Teste Local

1. Abra o console do navegador (F12)
2. Verifique se não há erros relacionados ao Supabase
3. Teste carregar a página do blog

### Teste no Netlify

1. Verifique os logs de build no Netlify
2. Procure por: `✅ Arquivo config.js gerado com sucesso!`
3. Teste o site em produção

## 🐛 Problemas Comuns

### Erro: "SUPABASE_CONFIG não encontrado"

**Solução:** Verifique se `sdk/config.js` está sendo carregado antes de `blog-supabase.js` no HTML.

### Erro: "Variáveis de ambiente não encontradas"

**Solução:** 
- Em desenvolvimento: Verifique se o arquivo `.env` existe e está correto
- Em produção: Verifique se as variáveis estão configuradas no Netlify

### Erro no Build do Netlify

**Solução:**
1. Verifique se o Node.js está disponível (deve estar automático)
2. Verifique os logs de build para mais detalhes
3. Certifique-se de que o `netlify.toml` está na raiz do projeto

## 📚 Documentação Completa

Para mais detalhes, consulte: `README-SEGURANCA.md`

