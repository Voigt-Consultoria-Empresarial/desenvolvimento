// sdk/contact-supabase.js

// 1. Configuração do Cliente Supabase
// As credenciais são carregadas do arquivo config.js que deve ser incluído antes deste script
// Usa o cliente Supabase compartilhado se já existir, ou cria um novo

// Verifica se a configuração foi carregada
if (!window.SUPABASE_CONFIG) {
    console.error('❌ Erro: SUPABASE_CONFIG não encontrado. Certifique-se de que config.js está sendo carregado antes deste script.');
    throw new Error('SUPABASE_CONFIG não está disponível. Verifique se config.js está incluído no HTML.');
}

// Validação das credenciais
if (!window.SUPABASE_CONFIG.url || !window.SUPABASE_CONFIG.anonKey) {
    console.error('❌ Erro: Credenciais do Supabase incompletas em SUPABASE_CONFIG.');
    throw new Error('Credenciais do Supabase não configuradas corretamente.');
}

// Usa a função global getSupabaseClient definida em config.js

// 2. Função para Enviar Solicitação de Contato
async function submitContactForm(formData) {
    try {
        // Validação dos campos obrigatórios
        if (!formData.nome || !formData.email || !formData.telefone || !formData.assunto || !formData.mensagem) {
            throw new Error('Campos obrigatórios não preenchidos.');
        }

        // Obtém o cliente Supabase compartilhado
        const supabase = window.getSupabaseClient();
        
        // Insere os dados na tabela solicitacoes_contato do schema business
        // Usando RPC porque o schema business não está exposto diretamente via REST API
        // A função RPC 'enviar_contato' está no schema public e insere no schema business
        const { data, error } = await supabase.rpc('enviar_contato', {
            p_nome: formData.nome,
            p_email: formData.email,
            p_telefone: formData.telefone,
            p_empresa: formData.empresa || null,
            p_assunto: formData.assunto,
            p_mensagem: formData.mensagem
        });

        if (error) {
            console.error('Erro ao enviar solicitação de contato:', error);
            throw error;
        }

        return { success: true, data };
    } catch (error) {
        console.error('Erro na requisição de contato:', error);
        throw error;
    }
}

// 3. Exportar a função para uso externo
window.contactAPI = {
    submitContactForm
};

