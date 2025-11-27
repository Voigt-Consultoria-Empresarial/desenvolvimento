/**
 * Script de Build para gerar config.js a partir de variáveis de ambiente
 * 
 * Este script lê as variáveis de ambiente e gera um arquivo config.js
 * que será usado pela aplicação frontend.
 * 
 * Funciona tanto em desenvolvimento (lendo de .env) quanto em produção
 * (lendo das variáveis injetadas pelo Netlify).
 */

const fs = require('fs');
const path = require('path');

// Carrega variáveis de ambiente do arquivo .env em desenvolvimento
if (process.env.NODE_ENV !== 'production') {
    try {
        const envPath = path.join(__dirname, '..', '.env');
        if (fs.existsSync(envPath)) {
            const envFile = fs.readFileSync(envPath, 'utf8');
            envFile.split('\n').forEach(line => {
                const trimmedLine = line.trim();
                if (trimmedLine && !trimmedLine.startsWith('#')) {
                    const [key, ...valueParts] = trimmedLine.split('=');
                    if (key && valueParts.length > 0) {
                        const value = valueParts.join('=').trim();
                        // Remove aspas se existirem
                        const cleanValue = value.replace(/^["']|["']$/g, '');
                        process.env[key.trim()] = cleanValue;
                    }
                }
            });
        }
    } catch (error) {
        console.warn('Aviso: Não foi possível carregar arquivo .env:', error.message);
    }
}

// Obtém as variáveis de ambiente (com prefixo VITE_ para compatibilidade)
let SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
let SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

// Se não encontrou variáveis de ambiente e está em desenvolvimento, usa valores padrão do config.js existente
if ((!SUPABASE_URL || !SUPABASE_ANON_KEY) && process.env.NODE_ENV !== 'production') {
    const configPath = path.join(__dirname, '..', 'sdk', 'config.js');
    if (fs.existsSync(configPath)) {
        const configContent = fs.readFileSync(configPath, 'utf8');
        const urlMatch = configContent.match(/url:\s*['"]([^'"]+)['"]/);
        const keyMatch = configContent.match(/anonKey:\s*['"]([^'"]+)['"]/);
        
        if (urlMatch && keyMatch) {
            SUPABASE_URL = urlMatch[1];
            SUPABASE_ANON_KEY = keyMatch[1];
            console.log('ℹ️  Usando credenciais do config.js existente (desenvolvimento)');
        }
    }
}

// Validação
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('❌ Erro: Variáveis de ambiente não encontradas!');
    console.error('Certifique-se de definir:');
    console.error('  - VITE_SUPABASE_URL ou SUPABASE_URL');
    console.error('  - VITE_SUPABASE_ANON_KEY ou SUPABASE_ANON_KEY');
    console.error('\nOu crie um arquivo .env na raiz do projeto com essas variáveis.');
    process.exit(1);
}

// Gera o conteúdo do arquivo config.js
const configContent = `/**
 * Configuração do Supabase
 * 
 * Este arquivo é gerado automaticamente durante o build.
 * NÃO edite este arquivo manualmente.
 * 
 * Para configurar as credenciais:
 * - Em desenvolvimento: crie um arquivo .env na raiz do projeto
 * - Em produção: configure as variáveis de ambiente no Netlify
 */

window.SUPABASE_CONFIG = {
    url: '${SUPABASE_URL}',
    anonKey: '${SUPABASE_ANON_KEY}'
};
`;

// Caminho de saída
const outputPath = path.join(__dirname, '..', 'sdk', 'config.js');

// Escreve o arquivo
try {
    fs.writeFileSync(outputPath, configContent, 'utf8');
    console.log('✅ Arquivo config.js gerado com sucesso!');
    console.log(`   Localização: ${outputPath}`);
} catch (error) {
    console.error('❌ Erro ao gerar config.js:', error.message);
    process.exit(1);
}

