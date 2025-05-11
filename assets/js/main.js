/*
	Phantom by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch?
		if (browser.mobile)
			$body.addClass('is-touch');

	// Forms.
		var $form = $('form');

		// Auto-resizing textareas.
			$form.find('textarea').each(function() {

				var $this = $(this),
					$wrapper = $('<div class="textarea-wrapper"></div>'),
					$submits = $this.find('input[type="submit"]');

				$this
					.wrap($wrapper)
					.attr('rows', 1)
					.css('overflow', 'hidden')
					.css('resize', 'none')
					.on('keydown', function(event) {

						if (event.keyCode == 13
						&&	event.ctrlKey) {

							event.preventDefault();
							event.stopPropagation();

							$(this).blur();

						}

					})
					.on('blur focus', function() {
						$this.val($.trim($this.val()));
					})
					.on('input blur focus --init', function() {

						$wrapper
							.css('height', $this.height());

						$this
							.css('height', 'auto')
							.css('height', $this.prop('scrollHeight') + 'px');

					})
					.on('keyup', function(event) {

						if (event.keyCode == 9)
							$this
								.select();

					})
					.triggerHandler('--init');

				// Fix.
					if (browser.name == 'ie'
					||	browser.mobile)
						$this
							.css('max-height', '10em')
							.css('overflow-y', 'auto');

			});

	// Menu.
		var $menu = $('#menu');

		$menu.wrapInner('<div class="inner"></div>');

		$menu._locked = false;

		$menu._lock = function() {

			if ($menu._locked)
				return false;

			$menu._locked = true;

			window.setTimeout(function() {
				$menu._locked = false;
			}, 350);

			return true;

		};

		$menu._show = function() {

			if ($menu._lock())
				$body.addClass('is-menu-visible');

		};

		$menu._hide = function() {

			if ($menu._lock())
				$body.removeClass('is-menu-visible');

		};

		$menu._toggle = function() {

			if ($menu._lock())
				$body.toggleClass('is-menu-visible');

		};

		$menu
			.appendTo($body)
			.on('click', function(event) {
				event.stopPropagation();
			})
			.on('click', 'a', function(event) {

				var href = $(this).attr('href');

				event.preventDefault();
				event.stopPropagation();

				// Hide.
					$menu._hide();

				// Redirect.
					if (href == '#menu')
						return;

					window.setTimeout(function() {
						window.location.href = href;
					}, 350);

			})
			.append('<a class="close" href="#menu">Close</a>');

		$body
			.on('click', 'a[href="#menu"]', function(event) {

				event.stopPropagation();
				event.preventDefault();

				// Toggle.
					$menu._toggle();

			})
			.on('click', function(event) {

				// Hide.
					$menu._hide();

			})
			.on('keydown', function(event) {

				// Hide on escape.
					if (event.keyCode == 27)
						$menu._hide();

			});

})(jQuery);


const estrelas = document.querySelectorAll('#avaliacaoEstrelas span');
let notaSelecionada = 0;

estrelas.forEach((estrela, index) => {
    estrela.addEventListener('mouseover', () => {
        limparHover();
        // Marca todas as estrelas até o índice atual
        for (let i = 0; i <= index; i++) {
            estrelas[i].classList.add('hover');
        }
    });

    estrela.addEventListener('mouseout', limparHover);

    estrela.addEventListener('click', () => {
        notaSelecionada = parseInt(estrela.getAttribute('data-valor'));
        atualizarSelecao();
        console.log("Nota escolhida:", notaSelecionada);
    });
});

function limparHover() {
    estrelas.forEach(e => e.classList.remove('hover'));
}

function atualizarSelecao() {
    estrelas.forEach(e => e.classList.remove('selecionada'));
    estrelas.forEach(estrela => {
        const valor = parseInt(estrela.getAttribute('data-valor'));
        if (valor <= notaSelecionada) {
            estrela.classList.add('selecionada');
        }
    });
}


document.addEventListener('DOMContentLoaded', function() {
    const img = document.getElementById('abrir-modal');
    const modal = document.querySelector('.modal');
    const closeBtn = document.querySelector('.close-btn');
    const menuBtn = document.querySelector('.abrir-menu');

    // Configurações do zoom
    const zoomLevel = 2;
    lente.style.backgroundSize = `${img.width * zoomLevel}px ${img.height * zoomLevel}px`;

    img.addEventListener('mousemove', function(e) {
        lente.style.opacity = '1';
        const rect = img.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        x = Math.max(lente.offsetWidth/2, Math.min(x, img.width - lente.offsetWidth/2));
        y = Math.max(lente.offsetHeight/2, Math.min(y, img.height - lente.offsetHeight/2));
        lente.style.left = x + 'px';
        lente.style.top = y + 'px';
        const bgX = (x / img.width) * (img.width * zoomLevel - lente.offsetWidth);
        const bgY = (y / img.height) * (img.height * zoomLevel - lente.offsetHeight);
        lente.style.backgroundImage = `url('${img.src}')`;
        lente.style.backgroundPosition = `-${bgX}px -${bgY}px`;
    });

    img.addEventListener('mouseleave', function() {
        lente.style.opacity = '0';
    });

    // Ao abrir o modal
    img.addEventListener('click', function() {
        modal.style.display = 'flex';
        if (menuBtn) menuBtn.style.display = 'none'; // Esconde o botão do menu
    });

    // Ao fechar o modal
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            if (menuBtn) menuBtn.style.display = 'inline-block'; // Mostra de novo
        });
    }
});


// Trocar a imagem principal ao clicar numa miniatura
const miniaturas = document.querySelectorAll('.miniatura');
const imagemPrincipal = document.getElementById('abrir-modal');

miniaturas.forEach(miniatura => {
miniatura.addEventListener('click', () => {
	const novaSrc = miniatura.getAttribute('data-src');
	imagemPrincipal.setAttribute('src', novaSrc);
});
});

// Abrir overlay
document.addEventListener('DOMContentLoaded', () => {
	const images = document.querySelectorAll('img');
	const overlay = document.getElementById('overlay');
	const overlayImg = document.getElementById('overlay-image');
	const overlayText = document.getElementById('overlay-text');
	const closeBtn = document.querySelector('.close');

	images.forEach(img => {
		img.addEventListener('click', () => {
			overlayImg.src = img.src;
			overlayText.textContent = img.alt || "Imagem ampliada";
			overlay.style.display = 'flex';
		});
	});

	closeBtn.addEventListener('click', () => {
		overlay.style.display = 'none';
	});

	overlay.addEventListener('click', (e) => {
		if (e.target === overlay) overlay.style.display = 'none';
	});
});