 // Configuração padrão
        const defaultConfig = {
            carousel_title: "Meus Projetos Incríveis",
            slide1_title: "Projeto Web Moderno",
            slide1_description: "Site responsivo com design elegante e funcionalidades avançadas para uma experiência única do usuário.",
            slide2_title: "App Mobile Inovador", 
            slide2_description: "Aplicativo mobile com interface intuitiva e performance otimizada para iOS e Android.",
            slide3_title: "Design UI/UX Premium",
            slide3_description: "Interface moderna e funcional com foco na experiência do usuário e usabilidade excepcional.",
            primary_color: "#6366f1",
            secondary_color: "#8b5cf6", 
            accent_color: "#06d6a0",
            text_color: "#ffffff",
            background_color: "#0f172a",
            font_family: "Poppins",
            font_size: 16
        };

        let config = { ...defaultConfig };

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