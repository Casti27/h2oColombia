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

});