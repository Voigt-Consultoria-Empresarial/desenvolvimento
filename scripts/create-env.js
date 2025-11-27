/**
 * Script auxiliar para criar arquivo .env
 * 
 * Este script ajuda a criar o arquivo .env a partir do template
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

async function createEnvFile() {
    console.log('🔧 Criando arquivo .env\n');
    console.log('Por favor, forneça as informações do Supabase:\n');

    const url = await question('URL do Supabase (ex: https://seu-projeto.supabase.co): ');
    const anonKey = await question('Chave Anônima (Anon Key): ');

    if (!url || !anonKey) {
        console.log('\n❌ Erro: URL e Chave são obrigatórios!');
        rl.close();
        return;
    }

    const envContent = `# Variáveis de Ambiente para Supabase
# Gerado automaticamente em ${new Date().toISOString()}

VITE_SUPABASE_URL=${url}
VITE_SUPABASE_ANON_KEY=${anonKey}
`;

    const envPath = path.join(__dirname, '..', '.env');

    try {
        // Verifica se o arquivo já existe
        if (fs.existsSync(envPath)) {
            const overwrite = await question('\n⚠️  Arquivo .env já existe. Sobrescrever? (s/n): ');
            if (overwrite.toLowerCase() !== 's' && overwrite.toLowerCase() !== 'sim') {
                console.log('Operação cancelada.');
                rl.close();
                return;
            }
        }

        fs.writeFileSync(envPath, envContent, 'utf8');
        console.log('\n✅ Arquivo .env criado com sucesso!');
        console.log(`   Localização: ${envPath}\n`);
        
        const generate = await question('Deseja gerar o arquivo config.js agora? (s/n): ');
        if (generate.toLowerCase() === 's' || generate.toLowerCase() === 'sim') {
            console.log('\n🔄 Gerando config.js...\n');
            require('./build-config.js');
        } else {
            console.log('\n💡 Execute "npm run build:config" quando estiver pronto.');
        }
    } catch (error) {
        console.error('\n❌ Erro ao criar arquivo .env:', error.message);
    }

    rl.close();
}

createEnvFile();

