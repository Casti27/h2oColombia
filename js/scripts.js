// Hamburger menu si lo agregas después
console.log("H2O COLOMBIA SAS - Website Activo");

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


	/* ============================= */
	/* Renderización dinámica de productos (cards + carrusel) */
	/* ============================= */

	const products = [
		{
			id: 'suerox',
			title: 'Suerox',
			desc: 'Bebida isotónica en 5 sabores para hidratación rápida.',
			logo: 'https://res.cloudinary.com/daib0eknj/image/upload/v1771881616/47_tarzzv.png',
			images: [
				{ src: 'https://res.cloudinary.com/daib0eknj/image/upload/v1771880718/Bebida-Hidratante-SUEROX-Mora-Azul-Hierbabuena-630-ml-3641107_a_fpynfs.webp', label: 'Sabor: Mora' },
				{ src: 'https://res.cloudinary.com/daib0eknj/image/upload/v1771880718/Bebida-Hidratante-SUEROX-Mora-Azul-Hierbabuena-630-ml-3641107_a_fpynfs.webp', label: 'Sabor: Limón' },
				{ src: 'https://res.cloudinary.com/daib0eknj/image/upload/v1771880718/Bebida-Hidratante-SUEROX-Mora-Azul-Hierbabuena-630-ml-3641107_a_fpynfs.webp', label: 'Sabor: Naranja' },
				{ src: 'https://res.cloudinary.com/daib0eknj/image/upload/v1771880718/Bebida-Hidratante-SUEROX-Mora-Azul-Hierbabuena-630-ml-3641107_a_fpynfs.webp', label: 'Sabor: Mango' },
				{ src: 'https://res.cloudinary.com/daib0eknj/image/upload/v1771880718/Bebida-Hidratante-SUEROX-Mora-Azul-Hierbabuena-630-ml-3641107_a_fpynfs.webp', label: 'Sabor: Uva' }
			],
			presentations: ['Presentación: 630ml'],
			badge: '5 sabores'
		}
	];

	function renderProducts(list) {
		const grid = document.getElementById('product-grid');
		if (!grid) return;

		grid.innerHTML = '';

		list.forEach(product => {
			const cid = `carousel-${product.id}`;
			const col = document.createElement('div');
				   col.className = 'col-12 col-sm-6 col-md-6 col-lg-4';
			col.className = 'col-12 col-sm-6 col-md-6 col-lg-4';

			// Build carousel items
			let itemsHtml = '';
			product.images.forEach((imgObj, idx) => {
				const src = imgObj.src || imgObj;
				const label = imgObj.label || '';
				itemsHtml += `\n\t\t\t<div class="carousel-item ${idx===0? 'active':''}" data-slide-label="${label}">` +
					`<img src="${src}" class="d-block w-100" alt="${product.title} imagen ${idx+1}">` +
					`</div>`;
			});

			// Indicators (if multiple)
			let indicators = '';
			if (product.images.length > 1) {
				indicators = '<div class="carousel-indicators">';
				product.images.forEach((_, i) => {
					indicators += `<button type="button" data-bs-target="#${cid}" data-bs-slide-to="${i}" class="${i===0? 'active':''}" aria-current="${i===0? 'true':''}" aria-label="Slide ${i+1}"></button>`;
				});
				indicators += '</div>';
			}

			// Build badges markup from presentations (stacked)
			let badgesHtml = '';
			// Initial badges: use first slide label + product presentations
			let initialLabels = [];
			if (product.images && product.images.length) {
				if (product.images[0].label) initialLabels.push(product.images[0].label);
			}
			if (product.presentations && product.presentations.length) initialLabels = initialLabels.concat(product.presentations.slice(0,2));
			if (initialLabels.length) {
				badgesHtml = '<div class="carousel-badges">';
				initialLabels.forEach(p => {
					badgesHtml += `<div class="carousel-badge">${p}</div>`;
				});
				badgesHtml += '</div>';
			} else {
				badgesHtml = '';
			}


			col.innerHTML = `\n\t\t<div class="card product-card">\n\t\t\t<div class="row g-0">\n\t\t\t\t<div class="col-4 col-md-3 product-logo">\n\t\t\t\t\t<img src="${product.logo||product.images[0]}" alt="Logo ${product.title}">\n\t\t\t\t</div>\n\t\t\t\t<div class="col-8 col-md-9 product-info">\n\t\t\t\t\t<div id="${cid}" class="carousel slide product-carousel" data-bs-ride="carousel" data-bs-interval="3500">\n\t\t\t\t\t\t${indicators}\n\t\t\t\t\t\t${badgesHtml}\n\t\t\t\t\t\t<div class="carousel-inner">\n\t\t\t\t\t\t\t${itemsHtml}\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t${product.images.length>1 ? `\n\t\t\t\t\t\t<button class="carousel-control-prev" type="button" data-bs-target="#${cid}" data-bs-slide="prev">\n\t\t\t\t\t\t\t<span class="carousel-control-prev-icon" aria-hidden="true"></span>\n\t\t\t\t\t\t\t<span class="visually-hidden">Anterior</span>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t\t<button class="carousel-control-next" type="button" data-bs-target="#${cid}" data-bs-slide="next">\n\t\t\t\t\t\t\t<span class="carousel-control-next-icon" aria-hidden="true"></span>\n\t\t\t\t\t\t\t<span class="visually-hidden">Siguiente</span>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t\t` : ''}\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="product-body">\n\t\t\t\t\t\t<div class="product-title">${product.title}</div>\n\t\t\t\t\t\t<div class="product-desc">${product.desc}</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>`;
			col.innerHTML = `\n\t\t<div class="card product-card">\n\t\t\t<div class="row g-0">\n\t\t\t\t<div class="col-4 col-md-3 product-logo">\n\t\t\t\t\t<img src="${product.logo||product.images[0]}" alt="Logo ${product.title}">\n\t\t\t\t</div>\n\t\t\t\t<div class="col-8 col-md-9 product-info">\n\t\t\t\t\t<div id="${cid}" class="carousel slide product-carousel" data-bs-ride="carousel" data-bs-interval="3500">\n\t\t\t\t\t\t${indicators}\n\t\t\t\t\t\t<div class="carousel-inner">\n\t\t\t\t\t\t\t${itemsHtml}\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t${product.images.length>1 ? `\n\t\t\t\t\t\t<button class="carousel-control-prev" type="button" data-bs-target="#${cid}" data-bs-slide="prev">\n\t\t\t\t\t\t\t<span class="carousel-control-prev-icon" aria-hidden="true"></span>\n\t\t\t\t\t\t\t<span class="visually-hidden">Anterior</span>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t\t<button class="carousel-control-next" type="button" data-bs-target="#${cid}" data-bs-slide="next">\n\t\t\t\t\t\t\t<span class="carousel-control-next-icon" aria-hidden="true"></span>\n\t\t\t\t\t\t\t<span class="visually-hidden">Siguiente</span>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t\t` : ''}\n\t\t\t\t\t</div>\n\t\t\t\t\t${badgesHtml}\n\t\t\t\t\t<div class="product-body">\n\t\t\t\t\t\t<div class="product-title">${product.title}</div>\n\t\t\t\t\t\t<div class="product-desc">${product.desc}</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>`;

				grid.appendChild(col);

				// After appending, wire up slide change to update badges for this carousel
				const carouselEl = col.querySelector('.carousel');
				if (carouselEl) {
					carouselEl.addEventListener('slid.bs.carousel', function(e) {
						const active = carouselEl.querySelector('.carousel-item.active');
						const label = active ? active.getAttribute('data-slide-label') : '';
						const badgeContainer = col.querySelector('.carousel-badges');
						if (badgeContainer) {
							// remove existing dynamic labels (we keep presentations below)
							badgeContainer.innerHTML = '';
							if (label) {
								const el = document.createElement('div');
								el.className = 'carousel-badge';
								el.textContent = label;
								badgeContainer.appendChild(el);
							}
							// append product presentations (if any)
							if (product.presentations && product.presentations.length) {
								product.presentations.slice(0,2).forEach(p => {
									const el2 = document.createElement('div');
									el2.className = 'carousel-badge';
									el2.textContent = p;
									badgeContainer.appendChild(el2);
								});
							}
						}
					});
				}
		});
	}

	// Render inicial
	renderProducts(products);

	// (Buscador eliminado para versión compacta)
});