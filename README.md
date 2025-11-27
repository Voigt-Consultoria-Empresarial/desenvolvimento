# 🏢 Voigt Consultoria Empresarial - Blog

Blog corporativo com integração Supabase para gerenciamento de conteúdo.

## 🔒 Segurança Implementada

Este projeto utiliza **variáveis de ambiente** para armazenar credenciais do Supabase de forma segura, sem hardcoding no código fonte.

### ✅ Características de Segurança

- ✅ Credenciais não ficam hardcoded no código
- ✅ Suporte a variáveis de ambiente para desenvolvimento e produção
- ✅ Configuração automática no Netlify
- ✅ Validação de credenciais antes do uso

## 🚀 Início Rápido

### Desenvolvimento Local

✅ **Já está pronto!** O arquivo `sdk/config.js` já está criado e funcionando.

1. **Abra o site no navegador**
   - Abra `index.html` diretamente ou use um servidor local
   - Tudo já está configurado!

2. **Para mudar credenciais (opcional)**
   
   Se quiser usar credenciais diferentes, crie um arquivo `.env`:
   ```env
   VITE_SUPABASE_URL=https://seu-projeto.supabase.co
   VITE_SUPABASE_ANON_KEY=sua-chave-anon-aqui
   ```
   
   Depois execute:
   ```bash
   npm run build:config
   ```
   
   **Nota:** O script funciona mesmo sem `.env` - ele usa as credenciais do `config.js` existente em desenvolvimento.

### Produção (Netlify)

1. **Configure as variáveis de ambiente no Netlify:**
   - Acesse: Site settings → Environment variables
   - Adicione:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`

2. **Faça o deploy**
   - O Netlify executará automaticamente o build command
   - O arquivo `sdk/config.js` será gerado durante o build

## 📁 Estrutura do Projeto

```
projeto/
├── sdk/
│   ├── config.js          # Configuração gerada (não editar manualmente em produção)
│   └── blog-supabase.js   # SDK do blog
├── scripts/
│   ├── build-config.js    # Script que gera config.js
│   └── verify-setup.js    # Script de verificação
├── blog/                  # Página de listagem do blog
├── blog-post/             # Página de post individual
├── .env                   # Variáveis de ambiente (local, não commitado)
├── ENV-EXAMPLE.txt        # Template de exemplo
├── netlify.toml           # Configuração do Netlify
└── package.json           # Scripts npm
```

## 🛠️ Scripts Disponíveis

```bash
# Gerar arquivo de configuração a partir de variáveis de ambiente
npm run build:config

# Verificar se tudo está configurado corretamente
npm run verify

# Alias para build:config
npm run setup
```

## 📚 Documentação

- **[SETUP.md](./SETUP.md)** - Guia de configuração detalhado
- **[README-SEGURANCA.md](./README-SEGURANCA.md)** - Documentação completa de segurança

## 🔍 Verificação

Execute o script de verificação para garantir que tudo está configurado:

```bash
npm run verify
```

## 🐛 Troubleshooting

### Erro: "SUPABASE_CONFIG não encontrado"

**Solução:** Verifique se `sdk/config.js` está sendo carregado antes de `blog-supabase.js` nos arquivos HTML.

### Erro: "Variáveis de ambiente não encontradas"

**Solução:**
- Em desenvolvimento: Verifique se o arquivo `.env` existe e está correto
- Em produção: Verifique se as variáveis estão configuradas no Netlify

### Erro no Build do Netlify

**Solução:**
1. Verifique se o Node.js está disponível (deve estar automático)
2. Verifique os logs de build no Netlify
3. Certifique-se de que o `netlify.toml` está na raiz do projeto

## 📞 Suporte

Para dúvidas ou problemas, consulte a documentação completa ou entre em contato com a equipe de desenvolvimento.

---

**Desenvolvido por [TOPSTACK](https://topstack.com.br)**

