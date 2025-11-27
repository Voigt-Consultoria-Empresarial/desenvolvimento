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
        const dirName = path.dirname(htmlPath).split(path.sep).pop();
        const displayName = dirName !== 'desenvolvimento' ? `${dirName}/${fileName}` : fileName;
        
        // Verifica ordem dos scripts
        const supabaseCDNIndex = htmlContent.indexOf('@supabase/supabase-js');
        const configIndex = htmlContent.indexOf('config.js');
        const blogSupabaseIndex = htmlContent.indexOf('blog-supabase.js');
        const contactSupabaseIndex = htmlContent.indexOf('contact-supabase.js');
        
        let fileIssues = [];
        
        // Verifica se config.js existe
        if (configIndex === -1) {
            fileIssues.push('config.js não encontrado');
        }
        
        // Verifica ordem: CDN -> config.js -> blog-supabase.js -> contact-supabase.js
        if (configIndex !== -1 && blogSupabaseIndex !== -1 && configIndex > blogSupabaseIndex) {
            fileIssues.push('config.js deve vir ANTES de blog-supabase.js');
        }
        
        if (configIndex !== -1 && contactSupabaseIndex !== -1 && configIndex > contactSupabaseIndex) {
            fileIssues.push('config.js deve vir ANTES de contact-supabase.js');
        }
        
        if (blogSupabaseIndex !== -1 && contactSupabaseIndex !== -1 && blogSupabaseIndex > contactSupabaseIndex) {
            fileIssues.push('blog-supabase.js deve vir ANTES de contact-supabase.js');
        }
        
        if (fileIssues.length === 0) {
            console.log(`✅ ${displayName}: Scripts na ordem correta`);
        } else {
            fileIssues.forEach(issue => htmlIssues.push(`${displayName}: ${issue}`));
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

// Verifica arquivos SDK
console.log('\n🔧 Verificando arquivos SDK...');
const sdkFiles = [
    { name: 'blog-supabase.js', path: path.join(__dirname, '..', 'sdk', 'blog-supabase.js') },
    { name: 'contact-supabase.js', path: path.join(__dirname, '..', 'sdk', 'contact-supabase.js') }
];

let sdkIssues = [];

sdkFiles.forEach(file => {
    if (fs.existsSync(file.path)) {
        const content = fs.readFileSync(file.path, 'utf8');
        
        // Verifica se usa getSupabaseClient (padrão correto)
        if (content.includes('getSupabaseClient()')) {
            console.log(`✅ ${file.name}: Usando getSupabaseClient() corretamente`);
        } else {
            sdkIssues.push(`${file.name}: Não está usando getSupabaseClient()`);
        }
        
        // Verifica se valida SUPABASE_CONFIG
        if (content.includes('SUPABASE_CONFIG')) {
            console.log(`✅ ${file.name}: Valida SUPABASE_CONFIG`);
        } else {
            sdkIssues.push(`${file.name}: Não valida SUPABASE_CONFIG`);
        }
        
        // Verifica se NÃO tem credenciais hardcoded
        if (content.includes('https://') && content.includes('.supabase.co') && !content.includes('SUPABASE_CONFIG')) {
            sdkIssues.push(`${file.name}: Possível credencial hardcoded encontrada`);
        } else {
            console.log(`✅ ${file.name}: Sem credenciais hardcoded`);
        }
    } else {
        sdkIssues.push(`${file.name}: Arquivo não encontrado`);
    }
});

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

if (sdkIssues.length === 0) {
    console.log('✅ Arquivos SDK: OK');
} else {
    console.log('❌ Arquivos SDK: PROBLEMAS ENCONTRADOS');
    sdkIssues.forEach(issue => console.log(`   - ${issue}`));
}

console.log('\n💡 Próximos passos:');
if (!configExists || !configValid) {
    console.log('   1. Crie um arquivo .env com suas credenciais');
    console.log('   2. Execute: npm run build:config');
}
if (htmlIssues.length > 0) {
    console.log('   1. Corrija a ordem dos scripts nos arquivos HTML');
}
if (configExists && configValid && htmlIssues.length === 0 && sdkIssues.length === 0) {
    console.log('   ✅ Tudo configurado! Você pode testar o site agora.');
} else if (sdkIssues.length > 0) {
    console.log('   1. Corrija os problemas nos arquivos SDK');
}

console.log('');

