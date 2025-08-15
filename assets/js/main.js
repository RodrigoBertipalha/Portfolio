// main.js - Arquivo JavaScript principal do portfólio

document.addEventListener('DOMContentLoaded', function() {
    // ======= TOGGLE DE TEMA CLARO/ESCURO =======
    const themeToggle = document.getElementById('theme-toggle');
    
    // Função para alternar o tema
    function toggleTheme() {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
        } else {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
        }
    }
    
    // Evento de clique no botão de tema
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // ======= MENU MOBILE =======
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileCloseButton = document.getElementById('mobile-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    // Abrir menu mobile
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.add('flex');
            mobileMenu.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Impedir rolagem
        });
    }
    
    // Fechar menu mobile
    if (mobileCloseButton && mobileMenu) {
        mobileCloseButton.addEventListener('click', function() {
            mobileMenu.classList.remove('flex');
            mobileMenu.classList.add('hidden');
            document.body.style.overflow = ''; // Permitir rolagem
        });
    }
    
    // Fechar menu ao clicar em um link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('flex');
            mobileMenu.classList.add('hidden');
            document.body.style.overflow = '';
        });
    });
    
    // ======= NAVEGAÇÃO ATIVA NO SCROLL =======
    // Função para destacar o link ativo baseado na posição de scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    
    // Usando Intersection Observer para detectar seções visíveis
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -80% 0px', // Ajuste conforme necessário
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                // Atualizar links desktop
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
                
                // Atualizar links mobile
                mobileLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    // Observar todas as seções
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // ======= FORMULÁRIO DE CONTATO =======
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obter dados do formulário
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Simular envio (aqui você poderia integrar com Formspree ou EmailJS)
            console.log('Formulário enviado:', { name, email, message });
            
            // Feedback para o usuário
            alert('Obrigado por entrar em contato! Em um projeto real, esta mensagem seria enviada para o servidor.');
            
            // Limpar formulário
            contactForm.reset();
        });
    }
    
    // ======= CARREGAR PROJETOS DO JSON =======
    // Função para carregar e renderizar projetos
    function loadProjects() {
        // Projetos mock (em um site real, seriam carregados de um arquivo projects.json)
        const projects = [
            {
                id: 1,
                title: "Calculadora de GDU",
                description: "Ferramenta web para cálculo de Graus-Dia de Desenvolvimento (GDU) a partir de arquivos Excel, com limpeza automática de dados e exportação de resultados.",
                image: "https://via.placeholder.com/640x360",
                technologies: ["Vue.js", "Excel.js", "Chart.js"],
                demoUrl: "#",
                githubUrl: "#",
                featured: true
            },
            {
                id: 2,
                title: "Sistema de Quizzes",
                description: "Módulo de quiz interativo desenvolvido com Vue 3 e Pinia, com feedback em tempo real e persistência de progresso do usuário.",
                image: "https://via.placeholder.com/640x360",
                technologies: ["Vue 3", "Pinia", "Tailwind CSS"],
                demoUrl: "#",
                githubUrl: "#",
                featured: true
            },
            {
                id: 3,
                title: "Dashboards Agrícolas",
                description: "Conjunto de painéis analíticos em Power BI para monitoramento de indicadores de produção agrícola, com visualizações por fase e rotação automática em TVs.",
                image: "https://via.placeholder.com/640x360",
                technologies: ["Power BI", "DAX", "Excel"],
                demoUrl: "#",
                githubUrl: "#",
                featured: true
            }
        ];
        
        const projectsContainer = document.getElementById('projects-container');
        
        // Limpar container antes de adicionar os projetos
        if (projectsContainer) {
            projectsContainer.innerHTML = '';
            
            // Renderizar cada projeto
            projects.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.className = "bg-white dark:bg-dark/80 rounded-md shadow-lg overflow-hidden border border-gray-200 dark:border-secondary/30 hover:border-primary dark:hover:border-secondary transition medieval-card";
                
                projectCard.innerHTML = `
                    <div class="p-6">
                        <h3 class="text-xl font-semibold mb-2 font-cinzel text-primary dark:text-secondary">${project.title}</h3>
                        <p class="text-gray-600 dark:text-gray-400 mb-4">
                            ${project.description}
                        </p>
                        <div class="mb-4">
                            <div class="flex flex-wrap gap-2 mb-4">
                                ${project.technologies.map(tech => `
                                    <span class="px-3 py-1 bg-primary/10 dark:bg-dark/80 border border-primary/20 dark:border-secondary/20 text-primary dark:text-secondary rounded-md text-sm">${tech}</span>
                                `).join('')}
                            </div>
                        </div>
                        <div class="flex space-x-3">
                            <a href="${project.demoUrl}" class="px-4 py-2 bg-primary dark:bg-transparent text-white dark:text-secondary border border-primary dark:border-secondary rounded-md hover:bg-primary/90 dark:hover:bg-secondary/10 transition flex items-center gap-2 text-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                Demo
                            </a>
                            <a href="${project.githubUrl}" class="px-4 py-2 border border-gray-300 dark:border-secondary/30 rounded-md hover:bg-gray-100 dark:hover:bg-secondary/10 dark:text-gray-300 transition flex items-center gap-2 text-sm">
                                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"></path>
                                </svg>
                                GitHub
                            </a>
                        </div>
                    </div>
                `;
                
                projectsContainer.appendChild(projectCard);
            });
        }
    }
    
    // Carregar projetos
    loadProjects();
    
    // ======= EFEITO DE PARTÍCULAS/ESTRELAS =======
    // Função para criar efeito de partículas no fundo
    function initParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = particlesContainer.offsetWidth;
        canvas.height = particlesContainer.offsetHeight;
        
        particlesContainer.appendChild(canvas);
        
        // Configurações das partículas
        const particlesCount = Math.min(Math.floor(window.innerWidth / 8), 150);
        const particles = [];
        
        // Classe para as partículas melhoradas
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 0.5;
                this.speedX = Math.random() * 2 - 1;
                this.speedY = Math.random() * 2 - 1;
                this.opacity = Math.random() * 0.6 + 0.1;
                this.pulse = Math.random() * 0.02 + 0.01;
                this.age = 0;
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.age += this.pulse;
                
                // Efeito de pulsação
                this.opacity = (Math.sin(this.age) * 0.3 + 0.4) * 0.7;
                
                // Verificar limites com efeito de rebote suave
                if (this.x > canvas.width || this.x < 0) {
                    this.speedX = -this.speedX * 0.8;
                    this.x = Math.max(0, Math.min(canvas.width, this.x));
                }
                
                if (this.y > canvas.height || this.y < 0) {
                    this.speedY = -this.speedY * 0.8;
                    this.y = Math.max(0, Math.min(canvas.height, this.y));
                }
            }
            
            draw() {
                // Criar gradiente para cada partícula
                const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
                gradient.addColorStop(0, `rgba(212, 175, 55, ${this.opacity})`);
                gradient.addColorStop(0.5, `rgba(212, 175, 55, ${this.opacity * 0.5})`);
                gradient.addColorStop(1, `rgba(212, 175, 55, 0)`);
                
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();
                
                // Adicionar um pequeno brilho central
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * 0.3, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.3})`;
                ctx.fill();
            }
        }
        
        // Criar partículas
        for (let i = 0; i < particlesCount; i++) {
            particles.push(new Particle());
        }
        
        // Animar partículas com efeitos melhorados
        function animate() {
            // Limpar com gradiente sutil para criar rastro
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, 'rgba(26, 26, 26, 0.1)');
            gradient.addColorStop(1, 'rgba(26, 26, 26, 0.05)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
                
                // Conectar partículas próximas com efeito melhorado
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 120) {
                        const opacity = (120 - distance) / 120 * 0.2;
                        const gradient = ctx.createLinearGradient(
                            particles[i].x, particles[i].y,
                            particles[j].x, particles[j].y
                        );
                        gradient.addColorStop(0, `rgba(212, 175, 55, ${opacity})`);
                        gradient.addColorStop(0.5, `rgba(212, 175, 55, ${opacity * 0.5})`);
                        gradient.addColorStop(1, `rgba(212, 175, 55, ${opacity})`);
                        
                        ctx.beginPath();
                        ctx.strokeStyle = gradient;
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            
            requestAnimationFrame(animate);
        }
        
        // Redimensionar canvas quando a janela for redimensionada
        window.addEventListener('resize', function() {
            canvas.width = particlesContainer.offsetWidth;
            canvas.height = particlesContainer.offsetHeight;
        });
        
        // Iniciar animação
        animate();
    }
    
    // Iniciar efeito de partículas
    initParticles();
    
    // ======= RASTREAMENTO DE CLIQUES (ANALYTICS) =======
    // Função para rastrear cliques em botões importantes
    function trackButtonClicks() {
        // Rastrear cliques em botões de contato
        const contactLinks = document.querySelectorAll('a[href^="mailto:"], a[href^="tel:"], a[href*="linkedin.com"], a[href*="github.com"]');
        contactLinks.forEach(link => {
            link.addEventListener('click', function() {
                // TODO: Integrar com Plausible ou outra ferramenta de analytics
                console.log('Clique em contato:', this.href);
            });
        });
        
        // Rastrear cliques no botão de CV
        const cvButton = document.querySelector('a[href$="CV_Rodrigo_Martins.pdf"]');
        if (cvButton) {
            cvButton.addEventListener('click', function() {
                // TODO: Integrar com Plausible ou outra ferramenta de analytics
                console.log('CV baixado');
            });
        }
        
        // Rastrear cliques em projetos
        const projectLinks = document.querySelectorAll('#projects-container a');
        projectLinks.forEach(link => {
            link.addEventListener('click', function() {
                // TODO: Integrar com Plausible ou outra ferramenta de analytics
                console.log('Clique em projeto:', this.href);
            });
        });
    }
    
    // Iniciar rastreamento após os projetos serem carregados
    setTimeout(trackButtonClicks, 1000);
});
