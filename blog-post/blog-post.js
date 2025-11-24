// blog/blog-post.js - Script para a PÁGINA DE POST INDIVIDUAL (blog-post.html)

document.addEventListener('DOMContentLoaded', async () => {
    const postContainer = document.getElementById('blogPost');
    if (!postContainer) return;

    // Lendo o slug a partir do hash da URL (ex: #o-slug-do-post)
    const postSlug = window.location.hash.substring(1);

    if (!postSlug) {
        postContainer.innerHTML = '<p>Post não encontrado. <a href="../blog/">Voltar para o blog</a>.</p>';
        return;
    }

    try {
        const post = await window.blogAPI.getBlogPostBySlug(postSlug);

        if (post) {
            renderSinglePost(post);
        } else {
            postContainer.innerHTML = '<p>Post não encontrado. <a href="../blog/">Voltar para o blog</a>.</p>';
        }
    } catch (error) {
        console.error("Erro ao carregar o post:", error);
        postContainer.innerHTML = '<p>Erro ao carregar o post. <a href="../blog/">Voltar para o blog</a>.</p>';
    }

    function renderSinglePost(post) {
        document.title = `${post.titulo} - Voigt Consultoria`;
        
        // Usando o campo correto 'data_publicacao'
        const formattedDate = new Date(post.data_publicacao).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
        const tags = post.tags || [];
        const tagsHTML = tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('');
        
        let imageUrl = post.imagem_url;
        // Validação da URL da imagem
        if (!imageUrl || (!imageUrl.startsWith('http') && !imageUrl.startsWith('assets'))) {
            imageUrl = null;
        }

        const categoryName = post.categoria && post.categoria.nome ? post.categoria.nome : 'Sem Categoria';

        // Usa a URL completa se for externa, ou monta o caminho relativo se for local
        const imageSrc = imageUrl ? (imageUrl.startsWith('http') ? imageUrl : `../${imageUrl}`) : null;
        const imageHTML = imageSrc ? `<img src="${imageSrc}" alt="${post.titulo}">` : '';

        postContainer.innerHTML = `
            <a href="../blog/" class="back-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                Voltar para o blog
            </a>
            <div class="blog-post-full">
                <div class="post-header">
                    <div class="blog-meta">
                        <span class="blog-category">${categoryName}</span>
                        <span>•</span>
                        <span>${formattedDate}</span>
                        <span>•</span>
                        <span>Por ${post.autor || 'Equipe Voigt'}</span>
                    </div>
                    <h1>${post.titulo}</h1>
                    <div class="blog-tags">${tagsHTML}</div>
                </div>
                ${imageHTML}
                <div class="post-content">
                    <p class="lead">${post.resumo}</p>
                    <div>${post.conteudo}</div>
                </div>
            </div>`;
    }
});
