// ==========================================================================
// AURORA STUDIO — SOBRE NOSOTROS (Componentes Modulares & Animaciones GPU)
// Arquitectura:
//   AboutHero · BrandStory · BrandTimeline
//   BrandStatistics · BrandCommunity · AboutCTA
// Construcción DOM segura (XSS-safe con textContent, cero librerías externas)
// ==========================================================================

(function () {
    'use strict';

    const ARROW_SVG = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7"/><path d="M8 7h9v9"/></svg>';

    function el(tag, className, text) {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (text !== undefined) node.textContent = text;
        return node;
    }

    function createImg(imgData, className, sizes) {
        const img = document.createElement('img');
        img.src = imgData.src;
        img.alt = imgData.alt || 'AURORA Studio';
        img.width = imgData.width || 800;
        img.height = imgData.height || 1071;
        img.loading = 'lazy';
        img.decoding = 'async';
        if (sizes || imgData.sizes) img.sizes = sizes || imgData.sizes;
        if (className) img.className = className;
        img.onerror = () => {
            img.src = 'https://placehold.co/800x1000/18181B/FFD700?text=AURORA+Studio';
        };
        return img;
    }

    function createArrowButton(tag, label, extraClass) {
        const btn = el(tag, `au-btn${extraClass ? ' ' + extraClass : ''}`);
        const textSpan = el('span', '', label);
        const circle = el('span', 'au-btn-circle');
        circle.setAttribute('aria-hidden', 'true');
        circle.innerHTML = ARROW_SVG;
        btn.appendChild(textSpan);
        btn.appendChild(circle);
        return btn;
    }

    function applyWordReveal(node, text) {
        node.classList.add('au-text-reveal');
        node.setAttribute('aria-label', text);
        const words = text.trim().split(/\s+/);
        const frag = document.createDocumentFragment();
        words.forEach((word, i) => {
            const mask = el('span', 'au-word-mask');
            mask.setAttribute('aria-hidden', 'true');
            const inner = el('span', 'au-word-item', word);
            inner.style.setProperty('--au-w-i', String(i));
            mask.appendChild(inner);
            frag.appendChild(mask);
            if (i < words.length - 1) frag.appendChild(document.createTextNode(' '));
        });
        node.appendChild(frag);
    }

    function createEyebrow(text, isLight) {
        const p = el('span', `au-eyebrow${isLight ? ' au-eyebrow-light' : ''}`);
        const dot = el('span', 'au-dot');
        dot.setAttribute('aria-hidden', 'true');
        p.appendChild(dot);
        p.appendChild(document.createTextNode(text));
        return p;
    }

    // ======================================================================
    // SECTION 01 — AboutHero
    // ======================================================================
    function renderAboutHero(data) {
        const section = el('div', 'au-hero');

        const media = el('div', 'au-hero-media');
        const img = createImg(data.image, 'au-hero-img', '(max-width: 768px) 100vw, 100vw');
        img.dataset.auParallax = '0.12';
        media.appendChild(img);
        section.appendChild(media);

        const overlay = el('div', 'au-hero-overlay');
        overlay.setAttribute('aria-hidden', 'true');
        section.appendChild(overlay);

        const content = el('div', 'au-hero-content');
        const container = el('div', 'au-container');

        container.appendChild(createEyebrow(data.eyebrow, true));

        const brand = el('p', 'au-hero-brand', data.brand);
        container.appendChild(brand);

        const h2 = el('h2', 'au-hero-title');
        h2.id = 'nosotros-title';
        const leadSpan = el('span');
        applyWordReveal(leadSpan, data.titleLead);
        h2.appendChild(leadSpan);
        h2.appendChild(document.createElement('br'));
        const hiSpan = el('span', 'au-highlight');
        applyWordReveal(hiSpan, data.titleHighlight);
        h2.appendChild(hiSpan);
        container.appendChild(h2);

        const sub = el('p', 'au-hero-sub au-fade-up', data.subtitle);
        container.appendChild(sub);

        const actions = el('div', 'au-hero-actions au-fade-up');
        const cta = createArrowButton('a', data.ctaLabel);
        cta.href = data.ctaTarget;
        actions.appendChild(cta);
        container.appendChild(actions);

        content.appendChild(container);
        section.appendChild(content);
        return section;
    }

    // ======================================================================
    // SECTION 02 — BrandStory
    // ======================================================================
    function renderBrandStory(data) {
        const section = el('div', 'au-story');
        section.id = 'au-story';

        const container = el('div', 'au-container');
        const grid = el('div', 'au-story-grid');

        // Columna de imágenes + año de fundación
        const mediaCol = el('div', 'au-story-media-col');

        const primaryWrap = el('figure', 'au-story-photo-primary au-img-reveal');
        primaryWrap.style.margin = '0';
        const pImg = createImg(data.primaryImage, '', '(max-width: 768px) 94vw, 48vw');
        primaryWrap.appendChild(pImg);
        if (data.primaryImage.caption) {
            primaryWrap.appendChild(el('figcaption', 'au-story-caption', data.primaryImage.caption));
        }
        mediaCol.appendChild(primaryWrap);

        const subrow = el('div', 'au-story-subrow');
        const foundedCard = el('div', 'au-story-founded-card au-fade-up');
        foundedCard.appendChild(el('span', 'au-story-founded-label', data.foundedLabel || 'Fundada en'));
        foundedCard.appendChild(el('span', 'au-story-founded-year', data.foundedYear));
        foundedCard.appendChild(el('span', 'au-story-founded-loc', data.foundedLocation));
        subrow.appendChild(foundedCard);

        const secWrap = el('div', 'au-story-photo-secondary au-img-reveal');
        secWrap.appendChild(createImg(data.secondaryImage, '', '(max-width: 768px) 46vw, 24vw'));
        subrow.appendChild(secWrap);

        mediaCol.appendChild(subrow);
        grid.appendChild(mediaCol);

        // Columna de narrativa editorial
        const textCol = el('div', 'au-story-text-col');
        textCol.appendChild(createEyebrow(data.eyebrow, false));

        const title = el('h3', 'au-title');
        applyWordReveal(title, data.title);
        textCol.appendChild(title);

        const lead = el('p', 'au-lead au-fade-up');
        lead.appendChild(document.createTextNode(data.leadPrefix));
        lead.appendChild(el('strong', 'au-highlight', data.leadBrand));
        lead.appendChild(document.createTextNode(data.leadSuffix));
        textCol.appendChild(lead);

        textCol.appendChild(el('p', 'au-copy au-fade-up', data.body));

        const quote = el('blockquote', 'au-story-quote au-fade-up', data.editorialQuote);
        textCol.appendChild(quote);

        grid.appendChild(textCol);
        container.appendChild(grid);
        section.appendChild(container);
        return section;
    }

    // ======================================================================
    // SECTION 03 — BrandTimeline (Vertical Mobile / Horizontal Interactivo Desktop)
    // ======================================================================
    function renderBrandTimeline(data) {
        const section = el('div', 'au-journey');
        const container = el('div', 'au-container');

        const head = el('div', 'au-section-head');
        head.appendChild(createEyebrow(data.eyebrow, false));
        const h3 = el('h3', 'au-title');
        const lSpan = el('span');
        applyWordReveal(lSpan, data.titleLead);
        h3.appendChild(lSpan);
        h3.appendChild(document.createTextNode(' '));
        const hiSpan = el('span', 'au-highlight');
        applyWordReveal(hiSpan, data.titleHighlight);
        h3.appendChild(hiSpan);
        head.appendChild(h3);
        if (data.demoNotice) {
            head.appendChild(el('span', 'au-demo-note', data.demoNotice));
        }
        container.appendChild(head);

        // Mobile vertical timeline
        const mobileList = el('div', 'au-timeline-mobile');
        data.stages.forEach(stage => {
            const card = el('article', 'au-tm-step au-fade-up');
            const media = el('div', 'au-tm-media au-img-reveal');
            media.appendChild(createImg(stage.image, '', '90vw'));
            card.appendChild(media);

            const body = el('div', 'au-tm-body');
            body.appendChild(el('span', 'au-tm-year', stage.year));
            body.appendChild(el('h4', 'au-tm-title', stage.title));
            body.appendChild(el('p', 'au-copy', stage.description));
            card.appendChild(body);
            mobileList.appendChild(card);
        });
        container.appendChild(mobileList);

        // Desktop interactive horizontal timeline
        const desktopWrap = el('div', 'au-timeline-desktop au-fade-up');
        const rail = el('div', 'au-td-rail');
        rail.setAttribute('role', 'tablist');
        rail.setAttribute('aria-label', 'Línea de tiempo de la marca');

        const progressLine = el('div', 'au-td-progress');
        progressLine.setAttribute('aria-hidden', 'true');
        rail.appendChild(progressLine);

        const stagePanel = el('div', 'au-td-stage');
        stagePanel.setAttribute('role', 'tabpanel');

        const stageMedia = el('div', 'au-td-stage-media');
        const stageImg = createImg(data.stages[0].image, '', '42vw');
        stageMedia.appendChild(stageImg);

        const stageContent = el('div', 'au-td-stage-content');
        const stageYear = el('p', 'au-td-stage-year', data.stages[0].year);
        const stageTitle = el('h4', 'au-td-stage-title', data.stages[0].title);
        const stageDesc = el('p', 'au-copy', data.stages[0].description);

        const navRow = el('div', 'au-td-nav');
        const prevBtn = el('button', 'au-td-nav-btn');
        prevBtn.type = 'button';
        prevBtn.setAttribute('aria-label', 'Etapa anterior');
        prevBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>';

        const nextBtn = el('button', 'au-td-nav-btn');
        nextBtn.type = 'button';
        nextBtn.setAttribute('aria-label', 'Etapa siguiente');
        nextBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>';

        navRow.appendChild(prevBtn);
        navRow.appendChild(nextBtn);

        stageContent.appendChild(stageYear);
        stageContent.appendChild(stageTitle);
        stageContent.appendChild(stageDesc);
        stageContent.appendChild(navRow);

        stagePanel.appendChild(stageMedia);
        stagePanel.appendChild(stageContent);

        let activeIdx = 0;
        const tabs = [];

        function setStage(idx) {
            const safeIdx = (idx + data.stages.length) % data.stages.length;
            if (safeIdx === activeIdx && tabs.length > 0) return;
            activeIdx = safeIdx;
            const st = data.stages[activeIdx];

            tabs.forEach((t, i) => {
                t.setAttribute('aria-selected', i === activeIdx ? 'true' : 'false');
                t.tabIndex = i === activeIdx ? 0 : -1;
            });
            progressLine.style.transform = `translate3d(${activeIdx * 100}%, 0, 0)`;

            stagePanel.classList.add('is-switching');
            setTimeout(() => {
                stageImg.src = st.image.src;
                stageImg.alt = st.image.alt;
                stageYear.textContent = st.year;
                stageTitle.textContent = st.title;
                stageDesc.textContent = st.description;
                stagePanel.classList.remove('is-switching');
            }, 170);
        }

        data.stages.forEach((stage, idx) => {
            const tab = el('button', 'au-td-tab');
            tab.type = 'button';
            tab.setAttribute('role', 'tab');
            tab.setAttribute('aria-selected', idx === 0 ? 'true' : 'false');
            tab.tabIndex = idx === 0 ? 0 : -1;

            tab.appendChild(el('span', 'au-td-tab-year', stage.year));
            tab.appendChild(el('span', 'au-td-tab-label', stage.title));

            tab.addEventListener('click', () => setStage(idx));
            tab.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowRight') { e.preventDefault(); setStage(idx + 1); tabs[(idx + 1) % tabs.length].focus(); }
                if (e.key === 'ArrowLeft') { e.preventDefault(); setStage(idx - 1); tabs[(idx - 1 + tabs.length) % tabs.length].focus(); }
            });

            tabs.push(tab);
            rail.appendChild(tab);
        });

        prevBtn.addEventListener('click', () => setStage(activeIdx - 1));
        nextBtn.addEventListener('click', () => setStage(activeIdx + 1));

        desktopWrap.appendChild(rail);
        desktopWrap.appendChild(stagePanel);
        container.appendChild(desktopWrap);

        section.appendChild(container);
        return section;
    }

    // ======================================================================
    // SECCIÓN 04 — BrandStatistics
    // ======================================================================
    function renderBrandStatistics(data) {
        const section = el('div', 'au-stats');
        const container = el('div', 'au-container');

        const head = el('div', 'au-section-head');
        head.appendChild(createEyebrow(data.eyebrow, true));
        const h3 = el('h3', 'au-title');
        const lSpan = el('span');
        applyWordReveal(lSpan, data.titleLead);
        h3.appendChild(lSpan);
        h3.appendChild(document.createTextNode(' '));
        const hiSpan = el('span', 'au-highlight');
        applyWordReveal(hiSpan, data.titleHighlight);
        h3.appendChild(hiSpan);
        head.appendChild(h3);
        if (data.demoNotice) {
            head.appendChild(el('span', 'au-demo-note', data.demoNotice));
        }
        container.appendChild(head);

        const grid = el('div', 'au-stats-grid');
        data.items.forEach(item => {
            const box = el('div', 'au-stat-item au-fade-up');
            const val = el('span', 'au-stat-value', `${item.prefix}0${item.suffix}`);
            val.dataset.auCountTarget = String(item.value);
            val.dataset.auCountPrefix = item.prefix || '';
            val.dataset.auCountSuffix = item.suffix || '';
            box.appendChild(val);
            box.appendChild(el('span', 'au-stat-label', item.label));
            grid.appendChild(box);
        });

        container.appendChild(grid);
        section.appendChild(container);
        return section;
    }

    // ======================================================================
    // SECTION 07 — BrandCommunity
    // ======================================================================
    function renderBrandCommunity(data) {
        const section = el('div', 'au-community');
        const container = el('div', 'au-container');

        const header = el('div', 'au-comm-header');
        const left = el('div');
        left.style.maxWidth = '36rem';
        left.appendChild(createEyebrow(data.eyebrow, false));
        const h3 = el('h3', 'au-title');
        applyWordReveal(h3, data.title);
        left.appendChild(h3);
        const desc = el('p', 'au-copy au-fade-up', data.description);
        desc.style.marginTop = '0.75rem';
        left.appendChild(desc);
        left.appendChild(el('span', 'au-comm-hashtag', `${data.hashtag} · ${data.handle}`));
        header.appendChild(left);

        const followBtn = createArrowButton('a', data.ctaLabel, 'au-btn-dark au-fade-up');
        followBtn.href = data.ctaHref;
        followBtn.target = '_blank';
        followBtn.rel = 'noopener noreferrer';
        header.appendChild(followBtn);

        container.appendChild(header);

        const grid = el('div', 'au-comm-grid');
        data.posts.forEach(post => {
            const link = el('a', 'au-comm-card au-fade-up');
            link.href = data.ctaHref;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.setAttribute('aria-label', `${post.handle} usando ${post.look}`);

            link.appendChild(createImg(post, '', '(max-width: 768px) 47vw, (max-width: 1279px) 31vw, 16vw'));
            const overlay = el('span', 'au-comm-overlay');
            overlay.appendChild(el('span', 'au-comm-handle', post.handle));
            overlay.appendChild(el('span', 'au-comm-look', post.look));
            link.appendChild(overlay);
            grid.appendChild(link);
        });

        container.appendChild(grid);
        section.appendChild(container);
        return section;
    }

    // ======================================================================
    // SECTION 08 — AboutCTA (Puente al catálogo existente)
    // ======================================================================
    function renderAboutCTA(data) {
        const section = el('div', 'au-cta');

        const media = el('div', 'au-cta-media');
        const img = createImg(data.image, '', '100vw');
        img.dataset.auParallax = '0.1';
        media.appendChild(img);
        section.appendChild(media);

        const overlay = el('div', 'au-cta-overlay');
        overlay.setAttribute('aria-hidden', 'true');
        section.appendChild(overlay);

        const content = el('div', 'au-cta-content');
        const container = el('div', 'au-container');

        container.appendChild(createEyebrow(data.eyebrow, true));

        const phrase = el('h3', 'au-cta-phrase');
        data.phraseLines.forEach((line, idx) => {
            const lineEl = el('span', idx === data.highlightIndex ? 'au-highlight' : '');
            applyWordReveal(lineEl, line);
            phrase.appendChild(lineEl);
        });
        container.appendChild(phrase);

        const ctaBtn = createArrowButton('button', data.buttonLabel, 'au-fade-up');
        ctaBtn.type = 'button';
        ctaBtn.addEventListener('click', () => {
            if (typeof window.openCatalogModal === 'function') {
                window.openCatalogModal('ALL');
            } else {
                const cat = document.getElementById('categorias');
                if (cat) cat.scrollIntoView({ behavior: 'smooth' });
            }
        });
        container.appendChild(ctaBtn);

        content.appendChild(container);
        section.appendChild(content);
        return section;
    }

    // ======================================================================
    // ANIMACIONES & MICROINTERACCIONES (IntersectionObserver + Contadores + Parallax Desktop)
    // ======================================================================
    function initAboutMotion(root) {
        const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const revealNodes = root.querySelectorAll('.au-fade-up, .au-text-reveal, .au-img-reveal');
        const counterNodes = root.querySelectorAll('[data-au-count-target]');

        const animateCounter = (node) => {
            const target = Number(node.dataset.auCountTarget) || 0;
            const prefix = node.dataset.auCountPrefix || '';
            const suffix = node.dataset.auCountSuffix || '';

            if (prefersReduced) {
                node.textContent = `${prefix}${target}${suffix}`;
                return;
            }
            const duration = 1200;
            const start = performance.now();
            const step = (now) => {
                const t = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - t, 3);
                node.textContent = `${prefix}${Math.round(target * eased)}${suffix}`;
                if (t < 1) requestAnimationFrame(step);
                else node.textContent = `${prefix}${target}${suffix}`;
            };
            requestAnimationFrame(step);
        };

        if (prefersReduced || !('IntersectionObserver' in window)) {
            revealNodes.forEach(n => n.classList.add('is-in'));
            counterNodes.forEach(animateCounter);
            return;
        }

        const revealObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-in');
                    obs.unobserve(entry.target);
                }
            });
        }, { rootMargin: '0px 0px -36px 0px', threshold: 0.12 });

        revealNodes.forEach(node => revealObserver.observe(node));

        const counterObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.35 });

        counterNodes.forEach(node => counterObserver.observe(node));

        // Parallax muy sutil exclusivamente en desktop (>= 1024px) y solo cuando está en viewport
        const desktopMQ = window.matchMedia('(min-width: 1024px)');
        const parallaxNodes = Array.from(root.querySelectorAll('[data-au-parallax]'));
        if (parallaxNodes.length > 0 && desktopMQ.matches) {
            const visibleSet = new Set();
            const pObs = new IntersectionObserver((entries) => {
                entries.forEach(e => {
                    if (e.isIntersecting) visibleSet.add(e.target);
                    else visibleSet.delete(e.target);
                });
            }, { rootMargin: '120px 0px' });
            parallaxNodes.forEach(n => pObs.observe(n));

            let ticking = false;
            window.addEventListener('scroll', () => {
                if (ticking || visibleSet.size === 0 || !desktopMQ.matches) return;
                ticking = true;
                requestAnimationFrame(() => {
                    const vh = window.innerHeight || 800;
                    visibleSet.forEach(img => {
                        const rect = img.parentElement.getBoundingClientRect();
                        const progress = ((rect.top + rect.height / 2) - vh / 2) / vh;
                        const speed = parseFloat(img.dataset.auParallax) || 0.1;
                        const shift = Math.max(-28, Math.min(28, progress * -120 * speed));
                        img.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0) scale3d(1.06, 1.06, 1)`;
                    });
                    ticking = false;
                });
            }, { passive: true });
        }
    }

    // ======================================================================
    // MONTAJE EN #nosotros
    // ======================================================================
    function mountAboutUs() {
        const root = document.getElementById('nosotros');
        const data = window.ABOUT_US_DATA;
        if (!root || !data) return;

        root.innerHTML = '';
        const frag = document.createDocumentFragment();
        frag.appendChild(renderAboutHero(data.hero));
        frag.appendChild(renderBrandStory(data.story));
        frag.appendChild(renderBrandTimeline(data.journey));
        frag.appendChild(renderBrandStatistics(data.statistics));
        frag.appendChild(renderBrandCommunity(data.community));
        frag.appendChild(renderAboutCTA(data.cta));
        root.appendChild(frag);

        initAboutMotion(root);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mountAboutUs);
    } else {
        mountAboutUs();
    }
})();
