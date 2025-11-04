
        /* ===== SISTEMA DE TEMA E CORES AUTOMÁTICAS ===== */
        
        // Paletas de cores que mudam automaticamente
        const colorPalettes = [
            {
                name: 'Azul Tecnológico',
                primary: '#3b82f6',
                secondary: '#8b5cf6', 
                accent: '#06d6a0'
            },
            {
                name: 'Roxo Criativo',
                primary: '#8b5cf6',
                secondary: '#ec4899',
                accent: '#f59e0b'
            },
            {
                name: 'Verde Natureza',
                primary: '#10b981',
                secondary: '#3b82f6',
                accent: '#f59e0b'
            },
            {
                name: 'Laranja Energia',
                primary: '#f59e0b',
                secondary: '#ef4444',
                accent: '#8b5cf6'
            },
            {
                name: 'Rosa Moderno',
                primary: '#ec4899',
                secondary: '#06d6a0',
                accent: '#3b82f6'
            }
        ];

        let currentPaletteIndex = 0;
        let colorChangeInterval;

        // Função para mudar cores automaticamente
        function changeColors() {
            const palette = colorPalettes[currentPaletteIndex];
            
            // Aplica as novas cores
            document.documentElement.style.setProperty('--primary-color', palette.primary);
            document.documentElement.style.setProperty('--secondary-color', palette.secondary);
            document.documentElement.style.setProperty('--accent-color', palette.accent);
            
            // Atualiza cores derivadas baseadas no tema atual
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            updateDerivedColors(palette, currentTheme);
            
            // Próxima paleta
            currentPaletteIndex = (currentPaletteIndex + 1) % colorPalettes.length;
            
            console.log(`🎨 Cores alteradas para: ${palette.name}`);
        }

        // Atualiza cores derivadas baseadas no tema
        function updateDerivedColors(palette, theme) {
            if (theme === 'light') {
                // Versões mais escuras para modo claro
                document.documentElement.style.setProperty('--primary-color', darkenColor(palette.primary, 20));
                document.documentElement.style.setProperty('--secondary-color', darkenColor(palette.secondary, 20));
                document.documentElement.style.setProperty('--accent-color', darkenColor(palette.accent, 20));
            }
        }

        // Função para escurecer cor (modo claro)
        function darkenColor(hex, percent) {
            const num = parseInt(hex.replace("#", ""), 16);
            const amt = Math.round(2.55 * percent);
            const R = (num >> 16) - amt;
            const G = (num >> 8 & 0x00FF) - amt;
            const B = (num & 0x0000FF) - amt;
            return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
                (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
                (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
        }

        // Inicia mudança automática de cores a cada 5 minutos
        function startAutoColorChange() {
            // Muda imediatamente
            changeColors();
            
            // Configura intervalo de 5 minutos (300000ms)
            colorChangeInterval = setInterval(changeColors, 300000);
            
            console.log('🚀 Sistema de cores automáticas iniciado! Mudança a cada 5 minutos.');
        }

        // Para a mudança automática
        function stopAutoColorChange() {
            if (colorChangeInterval) {
                clearInterval(colorChangeInterval);
                console.log('⏹️ Sistema de cores automáticas parado.');
            }
        }

        // Função para alternar tema
        function toggleTheme() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            // Aplica o novo tema
            document.documentElement.setAttribute('data-theme', newTheme);
            
            // Atualiza o ícone do botão
            const themeIcon = document.querySelector('.theme-toggle-circle');
            themeIcon.textContent = newTheme === 'light' ? '☀️' : '🌙';
            
            // Atualiza cores derivadas para o novo tema
            const currentPalette = colorPalettes[(currentPaletteIndex - 1 + colorPalettes.length) % colorPalettes.length];
            updateDerivedColors(currentPalette, newTheme);
            
            // Salva a preferência no localStorage
            localStorage.setItem('theme', newTheme);
        }

        // Carrega tema salvo ou usa tema escuro como padrão
        function loadTheme() {
            const savedTheme = localStorage.getItem('theme') || 'dark';
            document.documentElement.setAttribute('data-theme', savedTheme);
            
            const themeIcon = document.querySelector('.theme-toggle-circle');
            if (themeIcon) {
                themeIcon.textContent = savedTheme === 'light' ? '☀️' : '🌙';
            }
        }

        // Configuração padrão
        const defaultConfig = {
            logo_text: "R-dev",
            developer_name: "Rodrigues Manjate",
            typing_words: "Programador, Designer, Desenvolvedor Web, Criativo",
            about_description: "Sou um desenvolvedor web apaixonado por tecnologia e inovação. Com anos de experiência, especializo-me em criar soluções digitais que combinam funcionalidade excepcional com design atraente. Minha missão é transformar suas ideias em realidade digital.",
            phone_number: "+258 84 123 4567",
            email_address: "rodrigues@dev.com",
            location_text: "Maputo, Moçambique",
            /* ===== SISTEMA DE 5 CORES ===== */
            primary_color: "#3b82f6",      // Cor principal - botões e destaques
            secondary_color: "#8b5cf6",    // Cor secundária - elementos de apoio  
            accent_color: "#06d6a0",       // Cor de destaque - elementos especiais
            text_color: "#ffffff",         // Cor do texto principal
            background_color: "#0f0f23",   // Cor de fundo principal
            font_family: "Poppins",        // Fonte elegante
            font_size: 16                  // Tamanho base da fonte
        };

        let config = { ...defaultConfig };

        // Criar estrelas animadas
        function createStars() {
            const starsContainer = document.getElementById('stars');
            const numberOfStars = 100;

            for (let i = 0; i < numberOfStars; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                star.style.left = Math.random() * 100 + '%';
                star.style.top = Math.random() * 100 + '%';
                star.style.animationDelay = Math.random() * 3 + 's';
                starsContainer.appendChild(star);
            }
        }

        // Navegação
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('.section');

        function showSection(sectionId) {
            sections.forEach(section => section.classList.remove('active'));
            navLinks.forEach(link => link.classList.remove('active'));

            const targetSection = document.getElementById(sectionId);
            const targetLink = document.querySelector(`[data-section="${sectionId}"]`);
            
            if (targetSection) targetSection.classList.add('active');
            if (targetLink) targetLink.classList.add('active');

            // Animar skills quando mostrar seção sobre
            if (sectionId === 'about') {
                animateSkills();
            }
        }

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = link.getAttribute('data-section');
                showSection(sectionId);
            });
        });

        // Botões do hero
        document.querySelectorAll('.btn-primary[data-section]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = btn.getAttribute('data-section');
                showSection(sectionId);
            });
        });

        // Menu mobile melhorado
        const menuToggle = document.getElementById('menuToggle');
        const sidebar = document.getElementById('sidebar');
        const sidebarOverlay = document.getElementById('sidebarOverlay');

        function openSidebar() {
            sidebar.classList.add('open');
            sidebarOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Previne scroll do body
        }

        function closeSidebar() {
            sidebar.classList.remove('open');
            sidebarOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Restaura scroll do body
        }

        menuToggle.addEventListener('click', () => {
            if (sidebar.classList.contains('open')) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });

        // Fechar sidebar ao clicar no overlay
        sidebarOverlay.addEventListener('click', closeSidebar);

        // Fechar sidebar ao clicar em um link de navegação (mobile)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    closeSidebar();
                }
            });
        });

        // Fechar sidebar ao redimensionar para desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                closeSidebar();
            }
        });

        // Animação de digitação
        function typeWriter() {
            const words = (config.typing_words || defaultConfig.typing_words).split(', ');
            const typingElement = document.getElementById('typingWord');
            let wordIndex = 0;
            let charIndex = 0;
            let isDeleting = false;

            function type() {
                const currentWord = words[wordIndex];
                
                if (isDeleting) {
                    typingElement.textContent = currentWord.substring(0, charIndex - 1);
                    charIndex--;
                } else {
                    typingElement.textContent = currentWord.substring(0, charIndex + 1);
                    charIndex++;
                }

                let typeSpeed = isDeleting ? 50 : 100;

                if (!isDeleting && charIndex === currentWord.length) {
                    typeSpeed = 2000;
                    isDeleting = true;
                } else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                    typeSpeed = 500;
                }

                setTimeout(type, typeSpeed);
            }

            type();
        }

        // Animar barras de habilidades
        function animateSkills() {
            const skillBars = document.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const percentage = bar.getAttribute('data-skill');
                setTimeout(() => {
                    bar.style.width = percentage + '%';
                }, 300);
            });
        }

        // Sistema de avaliação
        const stars = document.querySelectorAll('.star');
        const ratingText = document.getElementById('ratingText');
        let currentRating = 0;

        stars.forEach(star => {
            star.addEventListener('click', () => {
                currentRating = parseInt(star.getAttribute('data-rating'));
                updateStars();
            });

            star.addEventListener('mouseover', () => {
                const hoverRating = parseInt(star.getAttribute('data-rating'));
                highlightStars(hoverRating);
            });
        });

        document.querySelector('.rating-container').addEventListener('mouseleave', () => {
            updateStars();
        });

        function highlightStars(rating) {
            stars.forEach((star, index) => {
                if (index < rating) {
                    star.classList.add('active');
                } else {
                    star.classList.remove('active');
                }
            });
        }

        function updateStars() {
            highlightStars(currentRating);
            const ratingTexts = ['', 'Ruim', 'Regular', 'Bom', 'Muito Bom', 'Excelente'];
            ratingText.textContent = currentRating > 0 ? ratingTexts[currentRating] : 'Clique para avaliar';
        }

        // Portfolio tabs
        const tabBtns = document.querySelectorAll('.tab-btn');
        const portfolioCards = document.querySelectorAll('.portfolio-card');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.getAttribute('data-tab');
                
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                portfolioCards.forEach(card => {
                    if (category === 'all' || card.getAttribute('data-category') === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });

        // Modais
        function openModal(modalId) {
            document.getElementById(modalId).style.display = 'block';
        }

        function closeModal(modalId) {
            document.getElementById(modalId).style.display = 'none';
        }

        // Upload de logo
        const logoUpload = document.getElementById('logoUpload');
        const logoInput = document.getElementById('logoInput');
        const logoText = document.getElementById('logoText');

        logoUpload.addEventListener('click', () => {
            logoInput.click();
        });

        logoInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    logoUpload.style.backgroundImage = `url(${e.target.result})`;
                    logoUpload.style.backgroundSize = 'cover';
                    logoUpload.style.backgroundPosition = 'center';
                    logoText.style.display = 'none';
                };
                reader.readAsDataURL(file);
            }
        });

        // Formulário de feedback
        document.getElementById('feedbackForm').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = e.target.querySelector('.btn-primary');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<span>Enviando...</span>';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = '<span>Feedback Enviado! ✓</span>';
                submitBtn.style.background = 'var(--gradient-3)';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    e.target.reset();
                    currentRating = 0;
                    updateStars();
                }, 3000);
            }, 2000);
        });

        // Element SDK
        async function onConfigChange(newConfig) {
            // Atualizar textos
            const logoTextEl = document.getElementById('logoText');
            if (logoTextEl) {
                logoTextEl.textContent = newConfig.logo_text || defaultConfig.logo_text;
            }

            const developerNameEl = document.getElementById('developerName');
            if (developerNameEl) {
                developerNameEl.textContent = newConfig.developer_name || defaultConfig.developer_name;
            }

            const aboutDescEl = document.getElementById('aboutDescription');
            if (aboutDescEl) {
                aboutDescEl.textContent = newConfig.about_description || defaultConfig.about_description;
            }

            const phoneEl = document.getElementById('phoneNumber');
            if (phoneEl) {
                phoneEl.textContent = newConfig.phone_number || defaultConfig.phone_number;
            }

            const emailEl = document.getElementById('emailAddress');
            if (emailEl) {
                emailEl.textContent = newConfig.email_address || defaultConfig.email_address;
            }

            const locationEl = document.getElementById('locationText');
            if (locationEl) {
                locationEl.textContent = newConfig.location_text || defaultConfig.location_text;
            }

            // Atualizar cores
            if (newConfig.primary_color) {
                document.documentElement.style.setProperty('--primary-color', newConfig.primary_color);
            }
            if (newConfig.secondary_color) {
                document.documentElement.style.setProperty('--secondary-color', newConfig.secondary_color);
            }
            if (newConfig.accent_color) {
                document.documentElement.style.setProperty('--accent-color', newConfig.accent_color);
            }
            if (newConfig.text_color) {
                document.documentElement.style.setProperty('--text-primary', newConfig.text_color);
            }
            if (newConfig.background_color) {
                document.documentElement.style.setProperty('--bg-primary', newConfig.background_color);
            }

            // Reiniciar animação de digitação se as palavras mudaram
            if (newConfig.typing_words && newConfig.typing_words !== config.typing_words) {
                config.typing_words = newConfig.typing_words;
                typeWriter();
            }
        }

        function mapToCapabilities(config) {
            return {
                recolorables: [
                    {
                        get: () => config.primary_color || defaultConfig.primary_color,
                        set: (value) => {
                            config.primary_color = value;
                            if (window.elementSdk) {
                                window.elementSdk.setConfig({ primary_color: value });
                            }
                        }
                    },
                    {
                        get: () => config.secondary_color || defaultConfig.secondary_color,
                        set: (value) => {
                            config.secondary_color = value;
                            if (window.elementSdk) {
                                window.elementSdk.setConfig({ secondary_color: value });
                            }
                        }
                    },
                    {
                        get: () => config.accent_color || defaultConfig.accent_color,
                        set: (value) => {
                            config.accent_color = value;
                            if (window.elementSdk) {
                                window.elementSdk.setConfig({ accent_color: value });
                            }
                        }
                    },
                    {
                        get: () => config.text_color || defaultConfig.text_color,
                        set: (value) => {
                            config.text_color = value;
                            if (window.elementSdk) {
                                window.elementSdk.setConfig({ text_color: value });
                            }
                        }
                    },
                    {
                        get: () => config.background_color || defaultConfig.background_color,
                        set: (value) => {
                            config.background_color = value;
                            if (window.elementSdk) {
                                window.elementSdk.setConfig({ background_color: value });
                            }
                        }
                    }
                ],
                borderables: [],
                fontEditable: {
                    get: () => config.font_family || defaultConfig.font_family,
                    set: (value) => {
                        config.font_family = value;
                        if (window.elementSdk) {
                            window.elementSdk.setConfig({ font_family: value });
                        }
                    }
                },
                fontSizeable: {
                    get: () => config.font_size || defaultConfig.font_size,
                    set: (value) => {
                        config.font_size = value;
                        if (window.elementSdk) {
                            window.elementSdk.setConfig({ font_size: value });
                        }
                    }
                }
            };
        }

        function mapToEditPanelValues(config) {
            return new Map([
                ["logo_text", config.logo_text || defaultConfig.logo_text],
                ["developer_name", config.developer_name || defaultConfig.developer_name],
                ["typing_words", config.typing_words || defaultConfig.typing_words],
                ["about_description", config.about_description || defaultConfig.about_description],
                ["phone_number", config.phone_number || defaultConfig.phone_number],
                ["email_address", config.email_address || defaultConfig.email_address],
                ["location_text", config.location_text || defaultConfig.location_text]
            ]);
        }

        /* ===== INICIALIZAÇÃO COMPLETA ===== */
        document.addEventListener('DOMContentLoaded', () => {
            // Carrega tema salvo
            loadTheme();
            
            // Adiciona event listener para o botão de tema
            const themeToggle = document.getElementById('themeToggle');
            if (themeToggle) {
                themeToggle.addEventListener('click', toggleTheme);
            }
            
            // Inicializa funcionalidades visuais
            createStars();
            typeWriter();
            
            // 🎨 INICIA SISTEMA DE CORES AUTOMÁTICAS
            startAutoColorChange();
            
            // Inicializar Element SDK
            if (window.elementSdk) {
                window.elementSdk.init({
                    defaultConfig,
                    onConfigChange,
                    mapToCapabilities,
                    mapToEditPanelValues
                });
            }
            
            console.log('✨ Portfolio Rodrigues Dev carregado com sucesso!');
            console.log('📱 Responsivo para iPhone 12 mini e todos os dispositivos');
            console.log('🎨 Sistema de cores automáticas ativo (muda a cada 5 minutos)');
            console.log('🔤 Fonte Poppins aplicada globalmente');
            console.log('⬡ Avatar hexagonal implementado');
        });
    
 
    (function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'99861ea0a5034eb9',t:'MTc2MjExMjU5NC4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();


   

        // ===== CLASSE DO CARROSSEL ===== 
        class ModernCarousel {
            constructor() {
                this.currentSlide = 0;
                this.totalSlides = 3;
                this.isAutoplay = true;
                this.autoplayInterval = null;
                this.autoplayDuration = 5000; // 5 segundos
                this.progressInterval = null;
                
                this.track = document.getElementById('carouselTrack');
                this.indicators = document.querySelectorAll('.indicator');
                this.prevBtn = document.getElementById('prevBtn');
                this.nextBtn = document.getElementById('nextBtn');
                this.progressBar = document.getElementById('progressBar');
                this.autoplayIndicator = document.getElementById('autoplayIndicator');
                
                this.init();
            }

            init() {
                // Event listeners
                this.prevBtn.addEventListener('click', () => this.prevSlide());
                this.nextBtn.addEventListener('click', () => this.nextSlide());
                this.autoplayIndicator.addEventListener('click', () => this.toggleAutoplay());
                
                // Indicadores
                this.indicators.forEach((indicator, index) => {
                    indicator.addEventListener('click', () => this.goToSlide(index));
                });

                // Touch/Swipe support
                this.addTouchSupport();
                
                // Keyboard support
                this.addKeyboardSupport();
                
                // Iniciar autoplay
                this.startAutoplay();
                
                console.log('🎠 Carrossel Moderno inicializado!');
            }

            goToSlide(slideIndex) {
                this.currentSlide = slideIndex;
                const translateX = -slideIndex * 100;
                this.track.style.transform = `translateX(${translateX}%)`;
                
                // Atualizar indicadores
                this.indicators.forEach((indicator, index) => {
                    indicator.classList.toggle('active', index === slideIndex);
                });
                
                // Reiniciar autoplay se estiver ativo
                if (this.isAutoplay) {
                    this.restartAutoplay();
                }
                
                // Animar conteúdo do slide
                this.animateSlideContent();
            }

            nextSlide() {
                const nextIndex = (this.currentSlide + 1) % this.totalSlides;
                this.goToSlide(nextIndex);
            }

            prevSlide() {
                const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
                this.goToSlide(prevIndex);
            }

            startAutoplay() {
                if (!this.isAutoplay) return;
                
                this.startProgressBar();
                
                this.autoplayInterval = setInterval(() => {
                    this.nextSlide();
                }, this.autoplayDuration);
            }

            stopAutoplay() {
                if (this.autoplayInterval) {
                    clearInterval(this.autoplayInterval);
                    this.autoplayInterval = null;
                }
                this.stopProgressBar();
            }

            restartAutoplay() {
                this.stopAutoplay();
                if (this.isAutoplay) {
                    this.startAutoplay();
                }
            }

            toggleAutoplay() {
                this.isAutoplay = !this.isAutoplay;
                
                if (this.isAutoplay) {
                    this.autoplayIndicator.classList.remove('paused');
                    this.startAutoplay();
                } else {
                    this.autoplayIndicator.classList.add('paused');
                    this.stopAutoplay();
                }
            }

            startProgressBar() {
                let progress = 0;
                const increment = 100 / (this.autoplayDuration / 50);
                
                this.progressInterval = setInterval(() => {
                    progress += increment;
                    this.progressBar.style.width = `${progress}%`;
                    
                    if (progress >= 100) {
                        progress = 0;
                    }
                }, 50);
            }

            stopProgressBar() {
                if (this.progressInterval) {
                    clearInterval(this.progressInterval);
                    this.progressInterval = null;
                }
                this.progressBar.style.width = '0%';
            }

            animateSlideContent() {
                const currentSlideElement = this.track.children[this.currentSlide];
                const content = currentSlideElement.querySelector('.slide-content');
                
                // Reset animation
                content.style.animation = 'none';
                content.offsetHeight; // Trigger reflow
                content.style.animation = 'slideContentFade 0.8s ease-out';
            }

            addTouchSupport() {
                let startX = 0;
                let startY = 0;
                let endX = 0;
                let endY = 0;

                this.track.addEventListener('touchstart', (e) => {
                    startX = e.touches[0].clientX;
                    startY = e.touches[0].clientY;
                });

                this.track.addEventListener('touchend', (e) => {
                    endX = e.changedTouches[0].clientX;
                    endY = e.changedTouches[0].clientY;
                    
                    const deltaX = startX - endX;
                    const deltaY = startY - endY;
                    
                    // Verificar se é um swipe horizontal
                    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                        if (deltaX > 0) {
                            this.nextSlide();
                        } else {
                            this.prevSlide();
                        }
                    }
                });
            }

            addKeyboardSupport() {
                document.addEventListener('keydown', (e) => {
                    switch(e.key) {
                        case 'ArrowLeft':
                            this.prevSlide();
                            break;
                        case 'ArrowRight':
                            this.nextSlide();
                            break;
                        case ' ':
                            e.preventDefault();
                            this.toggleAutoplay();
                            break;
                    }
                });
            }
        }

        // ===== ELEMENT SDK FUNCTIONS =====
        async function onConfigChange(newConfig) {
            // Atualizar textos
            const titleEl = document.getElementById('carouselTitle');
            if (titleEl) {
                titleEl.textContent = newConfig.carousel_title || defaultConfig.carousel_title;
            }

            const slide1TitleEl = document.getElementById('slide1Title');
            if (slide1TitleEl) {
                slide1TitleEl.textContent = newConfig.slide1_title || defaultConfig.slide1_title;
            }

            const slide1DescEl = document.getElementById('slide1Description');
            if (slide1DescEl) {
                slide1DescEl.textContent = newConfig.slide1_description || defaultConfig.slide1_description;
            }

            const slide2TitleEl = document.getElementById('slide2Title');
            if (slide2TitleEl) {
                slide2TitleEl.textContent = newConfig.slide2_title || defaultConfig.slide2_title;
            }

            const slide2DescEl = document.getElementById('slide2Description');
            if (slide2DescEl) {
                slide2DescEl.textContent = newConfig.slide2_description || defaultConfig.slide2_description;
            }

            const slide3TitleEl = document.getElementById('slide3Title');
            if (slide3TitleEl) {
                slide3TitleEl.textContent = newConfig.slide3_title || defaultConfig.slide3_title;
            }

            const slide3DescEl = document.getElementById('slide3Description');
            if (slide3DescEl) {
                slide3DescEl.textContent = newConfig.slide3_description || defaultConfig.slide3_description;
            }

            // Atualizar cores
            if (newConfig.primary_color) {
                document.documentElement.style.setProperty('--primary-color', newConfig.primary_color);
            }
            if (newConfig.secondary_color) {
                document.documentElement.style.setProperty('--secondary-color', newConfig.secondary_color);
            }
            if (newConfig.accent_color) {
                document.documentElement.style.setProperty('--accent-color', newConfig.accent_color);
            }
            if (newConfig.text_color) {
                document.documentElement.style.setProperty('--text-color', newConfig.text_color);
            }
            if (newConfig.background_color) {
                document.documentElement.style.setProperty('--background-color', newConfig.background_color);
            }

            // Atualizar fonte
            if (newConfig.font_family) {
                document.documentElement.style.setProperty('--font-family', newConfig.font_family);
            }
            if (newConfig.font_size) {
                document.documentElement.style.setProperty('--font-size', newConfig.font_size);
            }
        }

        function mapToCapabilities(config) {
            return {
                recolorables: [
                    {
                        get: () => config.primary_color || defaultConfig.primary_color,
                        set: (value) => {
                            config.primary_color = value;
                            if (window.elementSdk) {
                                window.elementSdk.setConfig({ primary_color: value });
                            }
                        }
                    },
                    {
                        get: () => config.secondary_color || defaultConfig.secondary_color,
                        set: (value) => {
                            config.secondary_color = value;
                            if (window.elementSdk) {
                                window.elementSdk.setConfig({ secondary_color: value });
                            }
                        }
                    },
                    {
                        get: () => config.accent_color || defaultConfig.accent_color,
                        set: (value) => {
                            config.accent_color = value;
                            if (window.elementSdk) {
                                window.elementSdk.setConfig({ accent_color: value });
                            }
                        }
                    },
                    {
                        get: () => config.text_color || defaultConfig.text_color,
                        set: (value) => {
                            config.text_color = value;
                            if (window.elementSdk) {
                                window.elementSdk.setConfig({ text_color: value });
                            }
                        }
                    },
                    {
                        get: () => config.background_color || defaultConfig.background_color,
                        set: (value) => {
                            config.background_color = value;
                            if (window.elementSdk) {
                                window.elementSdk.setConfig({ background_color: value });
                            }
                        }
                    }
                ],
                borderables: [],
                fontEditable: {
                    get: () => config.font_family || defaultConfig.font_family,
                    set: (value) => {
                        config.font_family = value;
                        if (window.elementSdk) {
                            window.elementSdk.setConfig({ font_family: value });
                        }
                    }
                },
                fontSizeable: {
                    get: () => config.font_size || defaultConfig.font_size,
                    set: (value) => {
                        config.font_size = value;
                        if (window.elementSdk) {
                            window.elementSdk.setConfig({ font_size: value });
                        }
                    }
                }
            };
        }

        function mapToEditPanelValues(config) {
            return new Map([
                ["carousel_title", config.carousel_title || defaultConfig.carousel_title],
                ["slide1_title", config.slide1_title || defaultConfig.slide1_title],
                ["slide1_description", config.slide1_description || defaultConfig.slide1_description],
                ["slide2_title", config.slide2_title || defaultConfig.slide2_title],
                ["slide2_description", config.slide2_description || defaultConfig.slide2_description],
                ["slide3_title", config.slide3_title || defaultConfig.slide3_title],
                ["slide3_description", config.slide3_description || defaultConfig.slide3_description]
            ]);
        }

        // ===== INICIALIZAÇÃO =====
        document.addEventListener('DOMContentLoaded', () => {
            // Inicializar carrossel
            const carousel = new ModernCarousel();
            
            // Inicializar Element SDK
            if (window.elementSdk) {
                window.elementSdk.init({
                    defaultConfig,
                    onConfigChange,
                    mapToCapabilities,
                    mapToEditPanelValues
                });
            }
            
            console.log('🎠 Carrossel Moderno carregado com sucesso!');
            console.log('📱 Totalmente responsivo');
            console.log('👆 Suporte a touch/swipe');
            console.log('⌨️ Controle por teclado (setas e espaço)');
            console.log('🎨 5 cores personalizáveis');
            console.log('⏯️ Autoplay com controle');
        });

 (function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'9986c83c759673de',t:'MTc2MjExOTU0MS4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();