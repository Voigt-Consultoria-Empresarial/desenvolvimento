// sdk/blog-supabase.js

// 1. Configuração do Cliente Supabase
// As credenciais são carregadas do arquivo config.js que deve ser incluído antes deste script

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

// 2. Funo para Buscar Posts do Blog com Categoria
async function getBlogPosts() {
    try {
        const supabase = window.getSupabaseClient();
        let { data: posts, error } = await supabase
            .from('blog_posts')
            // Seleciona todas as colunas de blog_posts e o nome da categoria da tabela relacionada
            .select('*, categoria:blog_categorias(nome)');

        if (error) {
            console.error('Erro ao buscar posts com categorias:', error);
            return [];
        }

        return posts;
    } catch (error) {
        console.error('Erro na requisição:', error);
        return [];
    }
}

// 4. Função para Buscar um ÚNICO Post pelo SLUG com Categoria
async function getBlogPostBySlug(slug) {
    try {
        const supabase = window.getSupabaseClient();
        let { data, error } = await supabase
            .from('blog_posts')
            // Seleciona todas as colunas de blog_posts e o nome da categoria da tabela relacionada
            .select('*, categoria:blog_categorias(nome)')
            .eq('slug', slug)
            .single(); // .single() para retornar um único objeto em vez de um array

        if (error) {
            console.error('Erro ao buscar o post pelo slug:', error);
            return null;
        }

        return data;
    } catch (error) {
        console.error('Erro na requisição do post:', error);
        return null;
    }
}

// 5. Exportar as funções para uso externo
window.blogAPI = {
    getBlogPosts,
    getBlogPostBySlug
};
