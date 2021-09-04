const openPetsPage = () => {
  document.location.href = '../pets/index.html';
};
const heroContentButton = document.querySelector('.hero-content__button');
const friendsButton = document.querySelector('.friends__button');

friendsButton.addEventListener('click', openPetsPage);
heroContentButton.addEventListener('click', openPetsPage);

getPets().then((data) => {
  const btnRight = document.querySelector('#button-right');
  const btnLeft = document.querySelector('#button-left');
  const cardsInner = document.querySelector('.cards');

  const cards = [];
  let pageSize = 3;
  let cardsPages = [];
  let currentPage = 0;

  const createPages = () => {
    const width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;

    if (width > 1279.9) {
      pageSize = 3;
    } else if (width > 767.9) {
      pageSize = 2;
    } else {
      pageSize = 1;
    }

    cardsPages = [];
    for (let i = 0; i < cards.length; i += pageSize) {
      cardsPages.push(cards.slice(i, i + pageSize));
    }
  };

  const setPage = (pageNumber) => {
    cardsInner.style.opacity = '0';
    cardsPages[currentPage].forEach((item) => (item.style.opacity = '0'));

    let pageNumberCalculated = pageNumber;
    if (pageNumber < 0) {
      pageNumberCalculated = cardsPages.length - 1;
    } else if (pageNumber >= cardsPages.length) {
      pageNumberCalculated = 0;
    }
    currentPage = pageNumberCalculated;

    cardsPages.forEach((items, index) => {
      if (index === currentPage) {
        items.forEach((item) => (item.style.display = 'flex'));
      } else {
        items.forEach((item) => {
          item.style.opacity = '0';
          setTimeout(() => (item.style.display = 'none'), 500);
        });
      }
    });

    setTimeout(() => {
      cardsInner.style.opacity = '1';
      cardsPages[currentPage].forEach((item) => {
        item.style.opacity = '1';
      });
    }, 500);
  };

  window.addEventListener('resize', () => {
    const firstCard = cardsPages[currentPage][0];
    createPages();

    for (let i = 0; i < cardsPages.length; i++) {
      const finded = cardsPages[i].find((item) => item === firstCard);
      if (finded) {
        setPage(i);
        break;
      }
    }
  });

  btnRight.addEventListener('click', (e) => setPage(currentPage - 1));
  btnLeft.addEventListener('click', (e) => setPage(currentPage + 1));

  data.sorted.forEach((i) => {
    const card = addCard(data.PETS[i]);
    cardsInner.append(card);
    cards.push(card);
  });
  createPages();
  setPage(currentPage);
});
