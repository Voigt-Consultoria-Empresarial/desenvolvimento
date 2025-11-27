// Global error handler for DataCloneError from browser recording tools
window.addEventListener('error', (event) => {
    if (event.message && event.message.includes('DataCloneError')) {
        event.preventDefault();
        console.warn('DataCloneError caught and suppressed (likely from browser recording tool)');
    }
});

window.addEventListener('unhandledrejection', (event) => {
    if (event.reason && event.reason.toString().includes('DataCloneError')) {
        event.preventDefault();
        console.warn('Unhandled DataCloneError caught and suppressed');
    }
});

// NOTE: The mobile navigation logic has been moved to /js/main.js
// to ensure it runs after the header is dynamically loaded.

// Add shadow to nav on scroll
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const nav = document.querySelector('.nav'); // Re-selecting nav here
    
    if (nav) {
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
    
    lastScroll = currentScroll;
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.value-item, .practice-item, .contact-method').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Load dynamic content from dadosficticios.js
document.addEventListener('DOMContentLoaded', () => {
    if (typeof dadosVoigt !== 'undefined') {
        loadServices();
        loadTeam();
        loadBlog();
    }
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
        
        // Formatação automática do telefone
        const telefoneInput = document.getElementById('telefone');
        if (telefoneInput) {
            telefoneInput.addEventListener('input', formatPhoneNumber);
            telefoneInput.addEventListener('keydown', handlePhoneKeydown);
        }
    }
});

// Load Services
function loadServices() {
    const servicesGrid = document.getElementById('servicesGrid');
    if (!servicesGrid || !dadosVoigt.servicos) return;
    
    dadosVoigt.servicos.forEach(servico => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card';
        
        const detailsHTML = servico.detalhes.map(detalhe => 
            `<li>${detalhe}</li>`
        ).join('');
        
        serviceCard.innerHTML = `
            <span class="service-icon">${servico.icone}</span>
            <h3>${servico.titulo}</h3>
            <p class="service-description">${servico.descricao}</p>
            <ul class="service-details">
                ${detailsHTML}
            </ul>
        `;
        
        servicesGrid.appendChild(serviceCard);
    });
}

// Load Team
function loadTeam() {
    const teamGrid = document.getElementById('teamGrid');
    if (!teamGrid || !dadosVoigt.equipe) return;
    
    dadosVoigt.equipe.forEach(membro => {
        const teamMember = document.createElement('div');
        teamMember.className = 'team-member';
        
        const nomeCompleto = membro.apelido ? `${membro.nome} (${membro.apelido})` : membro.nome;
        
        teamMember.innerHTML = `
            <img src="${membro.foto}" alt="${membro.nome}" class="team-photo">
            <div class="team-info">
                <h3 class="team-name">${nomeCompleto}</h3>
                <p class="team-role">${membro.cargo}</p>
                <p class="team-description">${membro.descricao}</p>
                <div class="team-contact" style="display: none;">
                    <a href="mailto:${membro.email}">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="4" width="18" height="16" rx="2"/>
                            <polyline points="3 4 12 13 21 4"/>
                        </svg>
                        E-mail
                    </a>
                    <a href="https://wa.me/${membro.whatsapp}" target="_blank">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        WhatsApp
                    </a>
                </div>
                <div class="team-social">
                    <a href="${membro.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                    </a>
                    <a href="${membro.instagram}" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                    </a>
                </div>
            </div>
        `;
        
        teamGrid.appendChild(teamMember);
    });
}

// Load Blog Posts for Homepage
async function loadBlog() {
    const blogGrid = document.getElementById('blogGrid');
    if (!blogGrid) return;

    let posts = [];
    try {
        // A única fonte de dados agora é a API do Supabase
        posts = await window.blogAPI.getBlogPosts(); 
    } catch (error) {
        console.error("Erro ao buscar posts do blog via API:", error);
        // Exibe uma mensagem de erro no lugar dos posts
        blogGrid.innerHTML = '<p class="error-message">Não foi possível carregar os artigos. Tente novamente mais tarde.</p>';
        return;
    }
    
    // Pega os 3 posts mais recentes
    const recentPosts = Array.isArray(posts) ? posts.slice(0, 3) : []; 
    blogGrid.innerHTML = '';
    
    if (recentPosts.length === 0) {
        blogGrid.innerHTML = '<p>Nenhum artigo publicado recentemente.</p>';
        return;
    }
    
    recentPosts.forEach(post => {
        const blogCard = document.createElement('a'); // Alterado para tag <a>
        blogCard.className = 'blog-card';
        // Corrigindo a URL para o formato com hash, conforme solicitado
        if (post.slug) {
            blogCard.href = `/blog-post/#${post.slug}`;
        }
        
        const tags = post.tags || [];
        const tagsHTML = tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('');
        const formattedDate = new Date(post.data_publicacao).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
        
        let imageUrl = post.imagem_url;
        // Validação da URL da imagem
        if (!imageUrl || (!imageUrl.startsWith('http') && !imageUrl.startsWith('assets'))) {
            imageUrl = null; // Invalida a URL se não for um link externo ou um asset local
        }
        
        const categoryName = post.categoria && post.categoria.nome ? post.categoria.nome : 'Sem Categoria';

        // Usa a URL completa se for externa, ou monta o caminho absoluto se for local
        const imageSrc = imageUrl ? (imageUrl.startsWith('http') ? imageUrl : `/${imageUrl}`) : null;
        const imageHTML = imageSrc ? `<img src="${imageSrc}" alt="${post.titulo}" class="blog-image">` : '<div class="blog-image-placeholder"></div>';
        
        blogCard.innerHTML = `
            ${imageHTML}
            <div class="blog-content">
                <div class="blog-meta">
                    <span class="blog-category">${categoryName}</span>
                    <span>•</span>
                    <span>${formattedDate}</span>
                </div>
                <h3 class="blog-title">${post.titulo}</h3>
                <p class="blog-excerpt">${post.resumo}</p>
                <div class="blog-tags">${tagsHTML}</div>
            </div>`;
        blogGrid.appendChild(blogCard);
    });
}

// Statistics Counter Animation
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Observe stats section for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            });
        }
    });
}, { threshold: 0.5 });

// Observe stats section
const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Função para formatar telefone automaticamente
function formatPhoneNumber(e) {
    let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
    
    // Limita a 11 dígitos (DDD + 9 dígitos para celular)
    if (value.length > 11) {
        value = value.slice(0, 11);
    }
    
    // Formata baseado no tamanho
    let formattedValue = '';
    if (value.length === 0) {
        formattedValue = '';
    } else if (value.length <= 2) {
        // Apenas DDD
        formattedValue = `(${value}`;
    } else if (value.length <= 7) {
        // DDD + início do número (até 5 dígitos após DDD)
        formattedValue = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length <= 10) {
        // Telefone fixo completo: (XX) XXXX-XXXX
        formattedValue = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
    } else {
        // Celular completo: (XX) XXXXX-XXXX
        formattedValue = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    }
    
    e.target.value = formattedValue;
}

// Função para lidar com teclas especiais no campo telefone
function handlePhoneKeydown(e) {
    // Permite backspace, delete, tab, escape, enter
    if ([8, 9, 27, 13, 46].indexOf(e.keyCode) !== -1 ||
        // Permite Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
        (e.keyCode === 65 && e.ctrlKey === true) ||
        (e.keyCode === 67 && e.ctrlKey === true) ||
        (e.keyCode === 86 && e.ctrlKey === true) ||
        (e.keyCode === 88 && e.ctrlKey === true) ||
        // Permite home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
        return;
    }
    // Bloqueia se não for um número
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
}

// Handle form submission
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const formSuccess = document.getElementById('formSuccess');
    const formError = document.getElementById('formError');
    const errorMessage = document.getElementById('errorMessage');
    
    // Esconde mensagens anteriores
    if (formSuccess) formSuccess.classList.remove('active');
    if (formError) formError.classList.remove('active');
    
    // Desabilita o botão durante o envio
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';
    }
    
    try {
        // Coleta os dados do formulário
        // Remove formatação do telefone antes de enviar (apenas números)
        const telefoneValue = document.getElementById('telefone').value.replace(/\D/g, '');
        
        const formData = {
            nome: document.getElementById('nome').value.trim(),
            email: document.getElementById('email').value.trim(),
            telefone: telefoneValue,
            empresa: document.getElementById('empresa').value.trim() || null,
            assunto: document.getElementById('assunto').value.trim(),
            mensagem: document.getElementById('mensagem').value.trim()
        };
        
        // Verifica se a API está disponível
        if (!window.contactAPI || !window.contactAPI.submitContactForm) {
            throw new Error('API de contato não está disponível. Verifique se contact-supabase.js está carregado.');
        }
        
        // Envia os dados via SDK
        await window.contactAPI.submitContactForm(formData);
        
        // Sucesso: mostra mensagem de sucesso
        if (formSuccess && form) {
            form.style.display = 'none';
            formSuccess.classList.add('active');
            
            // Reset form and hide success message after 5 seconds
            setTimeout(() => {
                form.style.display = 'block';
                formSuccess.classList.remove('active');
                form.reset();
            }, 5000);
        }
    } catch (error) {
        console.error('Erro ao enviar formulário:', error);
        
        // Mostra mensagem de erro da aplicação
        if (formError && form && errorMessage) {
            // Mensagem personalizada baseada no tipo de erro
            let errorText = 'Por favor, tente novamente ou entre em contato diretamente pelo telefone/WhatsApp.';
            
            if (error.message && error.message.includes('API de contato')) {
                errorText = 'Erro de configuração. Por favor, recarregue a página e tente novamente.';
            } else if (error.message && error.message.includes('Campos obrigatórios')) {
                errorText = 'Por favor, preencha todos os campos obrigatórios.';
            } else if (error.message && error.message.includes('network') || error.message && error.message.includes('fetch')) {
                errorText = 'Erro de conexão. Verifique sua internet e tente novamente.';
            }
            
            errorMessage.textContent = errorText;
            form.style.display = 'none';
            formError.classList.add('active');
            
            // Esconde mensagem de erro e mostra formulário novamente após 8 segundos
            setTimeout(() => {
                form.style.display = 'block';
                formError.classList.remove('active');
            }, 8000);
        }
        
        // Reabilita o botão
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = 'Enviar mensagem';
        }
    }
}