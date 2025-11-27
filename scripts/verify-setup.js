/**
 * Script de Verificação da Configuração
 * 
 * Este script verifica se tudo está configurado corretamente:
 * - Verifica se o arquivo config.js existe
 * - Verifica se as credenciais estão presentes
 * - Testa a conexão com o Supabase (opcional)
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando configuração...\n');

// Verifica se o arquivo config.js existe
const configPath = path.join(__dirname, '..', 'sdk', 'config.js');
let configExists = false;
let configValid = false;

if (fs.existsSync(configPath)) {
    configExists = true;
    console.log('✅ Arquivo sdk/config.js encontrado');
    
    // Lê o conteúdo do arquivo
    const configContent = fs.readFileSync(configPath, 'utf8');
    
    // Verifica se contém SUPABASE_CONFIG
    if (configContent.includes('SUPABASE_CONFIG')) {
        console.log('✅ Estrutura SUPABASE_CONFIG encontrada');
        
        // Verifica se contém url e anonKey
        if (configContent.includes('url:') && configContent.includes('anonKey:')) {
            configValid = true;
            console.log('✅ Credenciais encontradas no arquivo');
            
            // Extrai os valores para verificação básica
            const urlMatch = configContent.match(/url:\s*['"]([^'"]+)['"]/);
            const keyMatch = configContent.match(/anonKey:\s*['"]([^'"]+)['"]/);
            
            if (urlMatch && keyMatch) {
                const url = urlMatch[1];
                const key = keyMatch[1];
                
                console.log(`\n📋 Configuração encontrada:`);
                console.log(`   URL: ${url.substring(0, 30)}...`);
                console.log(`   Key: ${key.substring(0, 20)}...`);
                
                // Validação básica
                if (url.includes('supabase.co')) {
                    console.log('✅ URL do Supabase parece válida');
                } else {
                    console.log('⚠️  URL não parece ser do Supabase');
                }
                
                if (key.length > 50) {
                    console.log('✅ Chave parece ter tamanho válido');
                } else {
                    console.log('⚠️  Chave parece muito curta');
                }
            }
        } else {
            console.log('❌ Credenciais não encontradas no arquivo');
        }
    } else {
        console.log('❌ Estrutura SUPABASE_CONFIG não encontrada');
    }
} else {
    console.log('❌ Arquivo sdk/config.js NÃO encontrado');
    console.log('   Execute: npm run build:config');
}

// Verifica arquivos HTML
console.log('\n📄 Verificando arquivos HTML...');

const htmlFiles = [
    path.join(__dirname, '..', 'index.html'),
    path.join(__dirname, '..', 'blog', 'index.html'),
    path.join(__dirname, '..', 'blog-post', 'index.html')
];

let htmlIssues = [];

htmlFiles.forEach(htmlPath => {
    if (fs.existsSync(htmlPath)) {
        const htmlContent = fs.readFileSync(htmlPath, 'utf8');
        const fileName = path.basename(htmlPath);
        
        // Verifica se config.js está antes de blog-supabase.js
        const configIndex = htmlContent.indexOf('config.js');
        const blogSupabaseIndex = htmlContent.indexOf('blog-supabase.js');
        
        if (configIndex === -1) {
            htmlIssues.push(`${fileName}: config.js não encontrado`);
        } else if (blogSupabaseIndex === -1) {
            htmlIssues.push(`${fileName}: blog-supabase.js não encontrado`);
        } else if (configIndex > blogSupabaseIndex) {
            htmlIssues.push(`${fileName}: config.js deve vir ANTES de blog-supabase.js`);
        } else {
            console.log(`✅ ${fileName}: Scripts na ordem correta`);
        }
    }
});

// Verifica arquivo .env
console.log('\n🔐 Verificando arquivo .env...');
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
    console.log('✅ Arquivo .env encontrado');
    const envContent = fs.readFileSync(envPath, 'utf8');
    if (envContent.includes('VITE_SUPABASE_URL') && envContent.includes('VITE_SUPABASE_ANON_KEY')) {
        console.log('✅ Variáveis de ambiente encontradas no .env');
    } else {
        console.log('⚠️  Variáveis de ambiente podem estar incompletas no .env');
    }
} else {
    console.log('ℹ️  Arquivo .env não encontrado (opcional para desenvolvimento)');
}

// Resumo final
console.log('\n' + '='.repeat(50));
console.log('📊 RESUMO DA VERIFICAÇÃO');
console.log('='.repeat(50));

if (configExists && configValid) {
    console.log('✅ Configuração básica: OK');
} else {
    console.log('❌ Configuração básica: FALHOU');
    console.log('   Execute: npm run build:config');
}

if (htmlIssues.length === 0) {
    console.log('✅ Arquivos HTML: OK');
} else {
    console.log('❌ Arquivos HTML: PROBLEMAS ENCONTRADOS');
    htmlIssues.forEach(issue => console.log(`   - ${issue}`));
}

console.log('\n💡 Próximos passos:');
if (!configExists || !configValid) {
    console.log('   1. Crie um arquivo .env com suas credenciais');
    console.log('   2. Execute: npm run build:config');
}
if (htmlIssues.length > 0) {
    console.log('   1. Corrija a ordem dos scripts nos arquivos HTML');
}
if (configExists && configValid && htmlIssues.length === 0) {
    console.log('   ✅ Tudo configurado! Você pode testar o site agora.');
}

console.log('');

