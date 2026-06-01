// Hamburger menu si lo agregas después
console.log("H2O COLOMBIA SAS - Website Activo");

/* ─── SCROLL REVEAL ─── */
function initScrollReveal() {

    // Mapa de selectores → variante de animación
    // grid:true → calcula stagger automático entre hermanos
    const revealMap = [
        { sel: '.section-header',                   cls: '' },
        { sel: '.seccion-header',                   cls: '' },
        { sel: '.intro-text',                       cls: 'reveal-right' },
        { sel: '.intro-image-wrap',                 cls: 'reveal-left' },
        { sel: '.filtros',                          cls: '' },
        { sel: '.servicio-card',                    cls: 'reveal-scale', grid: true },
        { sel: '.pilar-card',                       cls: 'reveal-scale', grid: true },
        { sel: '.valor-card',                       cls: '',             grid: true },
        { sel: '.politica-card',                    cls: 'reveal-scale', grid: true },
        { sel: '.cert-badge',                       cls: '',             grid: true },
        { sel: '.proceso-step',                     cls: '',             grid: true },
        { sel: '.proyecto-card',                    cls: 'reveal-scale', grid: true },
        { sel: '.stat-item',                        cls: '',             grid: true },
        { sel: '.practica-card',                    cls: '',             grid: true },
        { sel: '.tl-item.tl-left  .tl-card',       cls: 'reveal-left'  },
        { sel: '.tl-item.tl-right .tl-card',       cls: 'reveal-right' },
        { sel: '.cita-bloque',                      cls: '' },
        { sel: '.intro-pillar',                     cls: 'reveal-scale', grid: true },
        { sel: '.manifesto-copy',                   cls: 'reveal-left'  },
        { sel: '.manifesto-visual',                 cls: 'reveal-right' },
    ];

    revealMap.forEach(({ sel, cls, grid }) => {
        const elements = [...document.querySelectorAll(sel)];
        if (!elements.length) return;

        if (grid) {
            // Agrupa por padre para calcular el stagger dentro de cada grilla
            const groups = new Map();
            elements.forEach(el => {
                const key = el.parentElement;
                if (!groups.has(key)) groups.set(key, []);
                groups.get(key).push(el);
            });
            groups.forEach(els => {
                els.forEach((el, i) => {
                    el.classList.add('reveal');
                    if (cls) el.classList.add(cls);
                    el.style.transitionDelay = `${i * 0.15}s`;
                });
            });
        } else {
            elements.forEach(el => {
                el.classList.add('reveal');
                if (cls) el.classList.add(cls);
            });
        }
    });

    // Un solo observer para todos los elementos .reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // anima solo una vez
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', initScrollReveal);

/* ─── FILTRO DE PROYECTOS ─── */
function initProyectosFilter() {
    const filtrosContainer = document.querySelector('.filtros');
    const proyectoCards = document.querySelectorAll('.proyecto-card');

    if (!filtrosContainer || !proyectoCards.length) return;

    const botones = filtrosContainer.querySelectorAll('.filtro-btn');

    botones.forEach(btn => {
        btn.addEventListener('click', function() {
            const filtroTexto = this.textContent.trim();

            // Update active button
            botones.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Filter cards
            proyectoCards.forEach(card => {
                const sector = card.querySelector('.proyecto-sector').textContent.toLowerCase();
                const mostrar =
                    filtroTexto === 'Todos' ||
                    sector.includes(filtroTexto.toLowerCase());

                // Fade animation
                card.style.transition = 'opacity 0.3s ease';
                if (mostrar) {
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.display = 'block';
                        setTimeout(() => card.style.opacity = '1', 10);
                    }, 150);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', initProyectosFilter);

// Dropdown personalizado 'QUIÉNES SOMOS'
document.addEventListener('DOMContentLoaded', function() {
	const qsBtn = document.querySelector('.qs-btn');
	const qsMenu = document.querySelector('.qs-menu');

	if (!qsBtn || !qsMenu) return;

	qsBtn.addEventListener('click', function(e) {
		e.stopPropagation();
		qsMenu.classList.toggle('show');
		const expanded = qsMenu.classList.contains('show');
		qsBtn.setAttribute('aria-expanded', expanded);
	});

	// Cerrar al hacer click en una opción
	qsMenu.addEventListener('click', function(e) {
		const item = e.target.closest('.qs-item');
		if (item) {
			qsMenu.classList.remove('show');
			qsBtn.setAttribute('aria-expanded', 'false');
		}
	});

	// Cerrar al hacer click fuera
	document.addEventListener('click', function(e) {
		if (!e.target.closest('.dropdown-custom')) {
			qsMenu.classList.remove('show');
			qsBtn.setAttribute('aria-expanded', 'false');
		}
	});

	// Cerrar con Esc
	document.addEventListener('keydown', function(e) {
		if (e.key === 'Escape') {
			qsMenu.classList.remove('show');
			qsBtn.setAttribute('aria-expanded', 'false');
			qsBtn.focus();
		}
	});

});