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
    
    // ======= NOTA: PROJETOS AGORA SÃO CODIFICADOS DIRETAMENTE NO HTML =======
    // Os projetos agora são exibidos estaticamente no HTML em vez de serem carregados dinamicamente
    // Isso permite uma melhor organização visual e mais detalhes para cada projeto
    
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
        const cvButton = document.querySelector('a[href$="CV_Rodrigo_Bertipalha.pdf"]');
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
