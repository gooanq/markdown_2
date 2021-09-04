const cover = document.querySelector('.cover');
const hideCover = () => {
	cover.classList.remove('cover_visible');
	header.classList.remove('hidden');
	document.body.classList.remove('no-scroll');
}
cover.addEventListener('click', (e) => {
	if (e.target === cover) {
		hideCover();
	}
});

function burger() {
	const burgerContent = document.querySelector('.burger-content');
	const burgerMenu = document.querySelector('.burger-menu');
	const pageHeader = document.querySelector('.header .wrapper');
	const burgerHeader = document.querySelector('.burger-header');
	const logo = document.querySelector('.header .wrapper .logo');

	const toggleMenu = (e) => {
		setTimeout(() => burgerMenu.classList.toggle('burger-menu_active'), 100);
		const flag = burgerContent.classList.contains('burger-content_visible');
		if (flag) {
			pageHeader.append(burgerMenu);
			burgerContent.classList.remove('burger-content_visible');
		} else {
			burgerContent.classList.add('burger-content_visible');
			burgerHeader.append(burgerMenu);
		}
		cover.classList.toggle('cover_visible');
		document.body.classList.toggle('no-scroll');
	}

	const closeMenu = (e) => {
		setTimeout(() => burgerMenu.classList.remove('burger-menu_active'), 100);
		pageHeader.append(burgerMenu);
		burgerContent.classList.remove('burger-content_visible');
	}

	burgerMenu.addEventListener('click', toggleMenu);
	cover.addEventListener('click', closeMenu);

	const activeBurgerLink = document.querySelector('.burger-content-menu-list__link_active');
	const closeOnActiveLink = (e) => {
		e.preventDefault();
		toggleMenu();
		window.scrollTo(0, 0);
	}
	activeBurgerLink.addEventListener('click', closeOnActiveLink);

	const activeLink = document.querySelector('.menu-list__link_active');
	const scrollOnActiveLink = (e) => {
		e.preventDefault();
		window.scrollTo(0, 0);
	}
	activeLink.addEventListener('click', scrollOnActiveLink);
}

burger();

