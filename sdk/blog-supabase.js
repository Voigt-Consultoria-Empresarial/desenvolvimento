// sdk/blog.js

// 1. Configurao do Cliente Supabase
const SUPABASE_URL = 'https://yihgvuqrdxkeyaitcyie.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpaGd2dXFyZHhrZXlhaXRjeWllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0ODc4NjUsImV4cCI6MjA3NzA2Mzg2NX0.zLRR9tD7depXglKIk0eEG7DfITK3hLLqMbWhctZ3X0U';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 2. Funo para Buscar Posts do Blog com Categoria
async function getBlogPosts() {
    try {
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
