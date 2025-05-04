
  // Pokupi sve slike iz galerije i spremi ih u niz
  const images = document.querySelectorAll('.gallery img');
  const modal = document.getElementById('mylightbox');
  const modalImage = document.getElementById('modal-image');
  const closeBtn = document.querySelector('.close');
  const nextBtn = document.querySelector('.next');
  const prevBtn = document.querySelector('.prev');

  let currentIndex = 0; // Trenutni index slike

  // Funkcija za otvaranje modala
  function openModal(index) {
    currentIndex = index;
    modal.style.display = 'flex';
    modalImage.src = images[currentIndex].src;
  }

  // Otvaranje na klik slike
  images.forEach((img, index) => {
    img.addEventListener('click', () => {
      openModal(index);
    });
  });

  // Zatvori modal
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Sljedeća slika
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    modalImage.src = images[currentIndex].src;
  });

  // Prethodna slika
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    modalImage.src = images[currentIndex].src;
  });

  // Zatvori modal ako klikneš van slike
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
