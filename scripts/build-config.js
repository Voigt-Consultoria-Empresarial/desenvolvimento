const fs = require('fs');
const path = require('path');

// Tenta carregar .env localmente (para desenvolvimento)
try {
    require('dotenv').config();
} catch (e) {
    // Ignora erro se não tiver dotenv (produção)
}

const targetDir = path.join(__dirname, '../sdk');
const targetFile = path.join(targetDir, 'config.js');

// Pega as variáveis (prioridade para variáveis de ambiente do sistema/Netlify)
const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const anonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

if (!url || !anonKey) {
    console.error('❌ Erro: Variáveis de ambiente não encontradas!');
    console.error('Certifique-se de definir VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no Netlify.');
    process.exit(1);
}

// Cria o conteúdo do arquivo JS incluindo a função getSupabaseClient
const fileContent = `/**
 * Configuração do Supabase
 * Gerado automaticamente via scripts/build-config.js
 */

window.SUPABASE_CONFIG = {
    url: '${url}',
    anonKey: '${anonKey}'
};

// Função global para obter o cliente Supabase compartilhado
window.getSupabaseClient = function() {
    if (window.supabaseClient) {
        return window.supabaseClient;
    }
    
    if (!window.SUPABASE_CONFIG || !window.SUPABASE_CONFIG.url || !window.SUPABASE_CONFIG.anonKey) {
        throw new Error('Credenciais do Supabase não configuradas corretamente.');
    }
    
    // Verifica se a lib do supabase foi carregada
    if (!window.supabase || !window.supabase.createClient) {
         console.error('Biblioteca do Supabase não encontrada. Verifique o CDN no index.html');
         throw new Error('Biblioteca Supabase ausente');
    }

    const client = window.supabase.createClient(
        window.SUPABASE_CONFIG.url, 
        window.SUPABASE_CONFIG.anonKey
    );
    
    window.supabaseClient = client;
    return client;
};
`;

// Garante que a pasta existe
if (!fs.existsSync(targetDir)){
    fs.mkdirSync(targetDir, { recursive: true });
}

// Escreve o arquivo
try {
    fs.writeFileSync(targetFile, fileContent);
    console.log('✅ Arquivo config.js gerado com sucesso!');
    console.log('Localização:', targetFile);
} catch (err) {
    console.error('❌ Erro ao escrever arquivo config.js:', err);
    process.exit(1);
}
