// blog/blog.js - Script exclusivo para a página de listagem (blog/index.html)

document.addEventListener('DOMContentLoaded', async () => {
    const blogGrid = document.getElementById('blogGrid');
    if (!blogGrid) return;

    let allPosts = [];
    try {
        // A única fonte de dados agora é a API do Supabase
        allPosts = await window.blogAPI.getBlogPosts();
    } catch (e) {
        console.error("Erro ao buscar posts do blog via API:", e);
        blogGrid.innerHTML = '<p class="error-message">Não foi possível carregar os artigos. Tente novamente mais tarde.</p>';
        return;
    }

    renderPosts(Array.isArray(allPosts) ? allPosts : []);

    function renderPosts(posts) {
        blogGrid.innerHTML = '';
        if (posts.length === 0) {
            blogGrid.innerHTML = '<p>Nenhum artigo encontrado.</p>';
            return;
        }
        posts.forEach(post => {
            blogGrid.appendChild(createPostCard(post));
        });
    }

    function createPostCard(post) {
        const card = document.createElement('a'); // Alterado para tag <a>
        card.className = 'blog-card';
        // Corrigindo a URL para o formato com hash, e o caminho relativo
        if (post.slug) {
            card.href = `../blog-post/#${post.slug}`;
        }

        // Usando o campo correto 'data_publicacao'
        const formattedDate = new Date(post.data_publicacao).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
        
        let imageUrl = post.imagem_url;
        // Validação da URL da imagem
        if (!imageUrl || (!imageUrl.startsWith('http') && !imageUrl.startsWith('assets'))) {
            imageUrl = null;
        }

        const categoryName = post.categoria && post.categoria.nome ? post.categoria.nome : 'Sem Categoria';
        
        // Usa a URL completa se for externa, ou monta o caminho relativo se for local
        const imageSrc = imageUrl ? (imageUrl.startsWith('http') ? imageUrl : `../${imageUrl}`) : null;
        const imageHTML = imageSrc ? `<img src="${imageSrc}" alt="${post.titulo}" class="blog-image">` : '<div class="blog-image-placeholder"></div>';

        card.innerHTML = `
            ${imageHTML}
            <div class="blog-content">
                <div class="blog-meta">
                    <span class="blog-category">${categoryName}</span>
                    <span>•</span>
                    <span>${formattedDate}</span>
                </div>
                <h3 class="blog-title">${post.titulo}</h3>
                <p class="blog-excerpt">${post.resumo}</p>
            </div>`;
        return card;
    }
});
