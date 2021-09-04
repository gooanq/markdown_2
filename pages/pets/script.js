const logo = document.querySelectorAll('.logo');
const goToMain = () => {
  document.location.href = '../main/index.html';
};
logo.forEach((i) => i.addEventListener('click', goToMain));

getPets().then((data) => {
  const cards = document.querySelector('.cards');
  let loaded = 0;
	
  data.sorted.forEach((i) => {
    const card = addCard(data.PETS[i]);
    cards.append(card);
    card.querySelector('img').addEventListener('load', () => {
      loaded++;

      if (loaded === data.sorted.length) {
        const cards = document.querySelector('.cards');
        const btnBegin = document.querySelector('#btn-begin');
        const btnEnd = document.querySelector('#btn-end');
        const btnRight = document.querySelector('#btn-right');
        const btnLeft = document.querySelector('#btn-left');
        const pageLabel = document.querySelector('.page-number');

        const calcSlide = () => {
          const cardHeight = parseFloat(
            getComputedStyle(cards.children[0]).height
          );
          const rowGap = parseFloat(getComputedStyle(cards).rowGap);
          const screenWidth =
            window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth;

          return screenWidth > 1279.9
            ? (cardHeight + rowGap) * 2
            : (cardHeight + rowGap) * 3;
        };

        let slide = calcSlide();
        let currentPage = 0;
        let maxPages = Math.round(cards.offsetHeight / slide) - 1;

        const goToPage = (pageNumber) => {
          cards.style.transform = `translateY(${-(pageNumber * slide)}px)`;
          pageLabel.textContent = `${currentPage + 1}`;

          if (currentPage === 0) {
            btnLeft.disabled = true;
            btnBegin.disabled = true;
            btnRight.disabled = false;
            btnEnd.disabled = false;
          } else if (currentPage === maxPages) {
            btnRight.disabled = true;
            btnEnd.disabled = true;
            btnLeft.disabled = false;
            btnBegin.disabled = false;
          } else {
            btnLeft.disabled = false;
            btnBegin.disabled = false;
            btnRight.disabled = false;
            btnEnd.disabled = false;
          }
        };

        btnRight.addEventListener('click', () => goToPage(++currentPage));
        btnLeft.addEventListener('click', () => goToPage(--currentPage));

        btnBegin.addEventListener('click', () => {
          currentPage = 0;
          goToPage(0);
        });
        btnEnd.addEventListener('click', () => {
          currentPage = maxPages;
          goToPage(maxPages);
        });

        window.addEventListener('resize', () => {
          slide = calcSlide();
          currentPage = 0;
          maxPages = Math.round(cards.offsetHeight / slide) - 1;
          goToPage(0);
        });
      }
    });
  });
});
