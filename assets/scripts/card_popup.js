const popup = document.querySelector('.popup');
const closeBtn = document.querySelector('.popup__close');
const header = document.querySelector('.header');

const closePopup = (e) => {
	cover.classList.remove('cover_visible');
	document.body.classList.remove('no-scroll');
	popup.classList.remove('popup_visible');
	header.classList.remove('hidden');
}
closeBtn.addEventListener('click', closePopup);

cover.addEventListener('mouseover', (e) => {
	if (e.target === cover) {
		closeBtn.classList.add('active');
	}
	else {
		closeBtn.classList.remove('active');
	}
});

cover.addEventListener('mouseout', (e) => {
	closeBtn.classList.remove('active');
});

const addCard = (petData) => {
	const card = document.createElement('div');
	card.classList.add('card');
	card.innerHTML = `
		<img src="${petData.img}" alt="${petData.type}" class="card__image">
		<div class="card__title">${petData.name}</div>
		<button class="card__button">Learn more</button>
	`;

	card.addEventListener('click', (e) => {
		popup.querySelector('.popup__image').src = petData.img;
		popup.querySelector('.popup__image').alt = petData.type;
		popup.querySelector('.popup__title').textContent = petData.name;
		popup.querySelector('.popup__subtitle').textContent = `${petData.type} - ${petData.breed}`;
		popup.querySelector('.popup__description').textContent = petData.description;
		popup.querySelector('.popup-list__age').textContent = petData.age;
		popup.querySelector('.popup-list__inoculations').textContent = petData.inoculations.join(', ');
		popup.querySelector('.popup-list__diseases').textContent = petData.diseases.join(', ');
		popup.querySelector('.popup-list__parasites').textContent = petData.parasites.join(', ');
		cover.classList.add('cover_visible');
		document.body.classList.add('no-scroll');
		popup.classList.add('popup_visible');
		header.classList.add('hidden');
	});


	return card;
}