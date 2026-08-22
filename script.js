// =========================================================
// DONUT — Fun Celebrity Page
// Vanilla JavaScript only — no frameworks/libraries
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ======================================================
     0. STICKY NAVBAR
     ====================================================== */
  const navbar = document.getElementById('navbar');

  function updateNavbarState() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  updateNavbarState();
  window.addEventListener('scroll', updateNavbarState);

  /* ======================================================
     1. PHOTO GALLERY DATA
     ====================================================== */
  const photos = [
    { src: 'images/donut2.jpg', caption: 'Donut\'s signature "I am judging you" stare.' },
    { src: 'images/donut1.jpg', caption: 'Curled up next to her emotional support fish toy.' },
    { src: 'images/donut3.jpg', caption: 'Sleeping fully upside down, paws in the air.' },
    { src: 'images/donut9.jpg', caption: 'Calmly tolerating a lint roller on her head.' },
    { src: 'images/donut6.jpg', caption: 'Defying gravity on a very narrow shelf.' },
    { src: 'images/donut7.jpg', caption: 'Mid-yawn (or possibly mid-roar).' },
    { src: 'images/donut4.jpg', caption: 'Loafed up and unbothered on the armchair.' },
    { src: 'images/donut8.jpg', caption: 'Sleepy eyes on a lazy sunny afternoon.' },
    { src: 'images/donut5.jpg', caption: 'Face smushed into the pillow, fully at peace.' },
  ];

  const galleryGrid = document.getElementById('gallery-grid');
  photos.forEach((photo, index) => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.setAttribute('data-index', index);
    item.innerHTML = `<img src="${photo.src}" alt="${photo.caption}" loading="lazy">`;
    item.addEventListener('click', () => openLightbox(index));
    galleryGrid.appendChild(item);
  });

  /* ======================================================
     2. LIGHTBOX
     ====================================================== */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  let currentPhotoIndex = 0;

  function openLightbox(index) {
    currentPhotoIndex = index;
    updateLightboxImage();
    lightbox.classList.add('open');
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
  }

  function updateLightboxImage() {
    const photo = photos[currentPhotoIndex];
    lightboxImg.src = photo.src;
    lightboxImg.alt = photo.caption;
    lightboxCaption.textContent = photo.caption;
  }

  function showNextPhoto() {
    currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
    updateLightboxImage();
  }

  function showPrevPhoto() {
    currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
    updateLightboxImage();
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxNext.addEventListener('click', showNextPhoto);
  lightboxPrev.addEventListener('click', showPrevPhoto);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNextPhoto();
    if (e.key === 'ArrowLeft') showPrevPhoto();
  });

  /* ======================================================
     3. RANDOM FUN FACT GENERATOR
     ====================================================== */
  const funFacts = [
    "Donut is a Scottish Fold — her folded ears are 100% natural, 0% hair accessory.",
    "Donut's favorite toy is a yellow fabric fish that she treats like a pillow.",
    "Donut has mastered the art of sleeping completely upside down, paws in the air.",
    "Donut once let a lint roller cap balance on her head without moving an inch.",
    "Donut has been photographed vertically 'climbing' along a narrow shelf mid-nap.",
    "Donut's resting face reads as pure disappointment, even when she's perfectly happy.",
    "Donut can locate the single sunniest spot in any room within seconds.",
    "Donut communicates displeasure primarily through slow, judgmental blinking.",
    "Donut considers any open lap, blanket, or pillow fort to be her personal property.",
    "Donut's yawns are dramatic enough to be mistaken for tiny roars.",
    "Donut has never once apologized for waking someone up at 5am for breakfast.",
    "Donut's official title, as far as she's concerned, is 'Supervisor of the House'.",
  ];

  let lastFactIndex = -1;
  let discoveredFacts = new Set();

  const factOutput = document.getElementById('fact-output');
  const factBtn = document.getElementById('fact-btn');
  const factCount = document.getElementById('fact-count');
  const factTotal = document.getElementById('fact-total');
  factTotal.textContent = funFacts.length;

  factBtn.addEventListener('click', () => {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * funFacts.length);
    } while (nextIndex === lastFactIndex && funFacts.length > 1);

    lastFactIndex = nextIndex;
    discoveredFacts.add(nextIndex);
    factCount.textContent = discoveredFacts.size;

    factOutput.style.opacity = 0;
    setTimeout(() => {
      factOutput.textContent = funFacts[nextIndex];
      factOutput.style.opacity = 1;
    }, 150);
  });

  /* ======================================================
     4. QUIZ
     ====================================================== */
  const quizQuestions = [
    {
      question: "What breed is Donut?",
      options: ["Sphynx", "Scottish Fold", "Maine Coon", "Bengal"],
      correctIndex: 1,
    },
    {
      question: "What is Donut's favorite toy?",
      options: ["A laser pointer", "A cardboard box", "A yellow fish plushie", "A ball of yarn"],
      correctIndex: 2,
    },
    {
      question: "How does Donut like to sleep?",
      options: ["Standing up", "Upside down, paws in the air", "Only in a shoebox", "Hanging from the ceiling"],
      correctIndex: 1,
    },
    {
      question: "What did Donut calmly let someone balance on her head?",
      options: ["A tiny crown", "Sunglasses", "A lint roller", "A party hat"],
      correctIndex: 2,
    },
    {
      question: "How would you best describe Donut's resting face?",
      options: ["Permanently surprised", "Constantly smiling", "Unbothered and a little grumpy", "Wide-eyed and alert"],
      correctIndex: 2,
    },
  ];

  let currentQuestion = 0;
  let score = 0;

  const quizQuestionEl = document.getElementById('quiz-question');
  const quizOptionsEl = document.getElementById('quiz-options');
  const quizFeedbackEl = document.getElementById('quiz-feedback');
  const quizNextBtn = document.getElementById('quiz-next-btn');
  const quizCurrentNum = document.getElementById('quiz-current-num');
  const quizTotalNum = document.getElementById('quiz-total-num');
  const quizProgressBar = document.getElementById('quiz-progress-bar');
  const quizQuestionArea = document.getElementById('quiz-question-area');
  const quizResultArea = document.getElementById('quiz-result-area');
  const quizResultScore = document.getElementById('quiz-result-score');
  const quizResultMessage = document.getElementById('quiz-result-message');
  const quizRestartBtn = document.getElementById('quiz-restart-btn');

  quizTotalNum.textContent = quizQuestions.length;

  function renderQuestion() {
    const q = quizQuestions[currentQuestion];
    quizQuestionEl.textContent = q.question;
    quizCurrentNum.textContent = currentQuestion + 1;
    quizProgressBar.style.width = `${((currentQuestion) / quizQuestions.length) * 100}%`;
    quizFeedbackEl.textContent = '';
    quizFeedbackEl.className = 'quiz-feedback';
    quizNextBtn.style.display = 'none';

    quizOptionsEl.innerHTML = '';
    q.options.forEach((option, index) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option';
      btn.textContent = option;
      btn.addEventListener('click', () => selectAnswer(index, btn));
      quizOptionsEl.appendChild(btn);
    });
  }

  function selectAnswer(index, btnEl) {
    const q = quizQuestions[currentQuestion];
    const allOptionBtns = quizOptionsEl.querySelectorAll('.quiz-option');

    allOptionBtns.forEach((btn) => (btn.disabled = true));

    if (index === q.correctIndex) {
      btnEl.classList.add('correct');
      quizFeedbackEl.textContent = '✅ Correct! Donut approves.';
      quizFeedbackEl.classList.add('correct-text');
      score++;
    } else {
      btnEl.classList.add('wrong');
      allOptionBtns[q.correctIndex].classList.add('correct');
      quizFeedbackEl.textContent = '❌ Not quite — Donut is judging you silently.';
      quizFeedbackEl.classList.add('wrong-text');
    }

    quizNextBtn.style.display = 'inline-block';
    quizNextBtn.textContent =
      currentQuestion === quizQuestions.length - 1 ? 'See Results →' : 'Next Question →';
  }

  quizNextBtn.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < quizQuestions.length) {
      renderQuestion();
    } else {
      showResults();
    }
  });

  function showResults() {
    quizProgressBar.style.width = '100%';
    quizQuestionArea.style.display = 'none';
    quizResultArea.style.display = 'block';

    quizResultScore.textContent = `${score} / ${quizQuestions.length}`;

    let message;
    let title;
    const pct = score / quizQuestions.length;

    if (pct === 1) {
      title = '🏆 Certified Donut Expert';
      message = "Perfect score! You clearly study Donut's photos as closely as we do.";
    } else if (pct >= 0.6) {
      title = '🍩 Loyal Donut Fan';
      message = 'Solid effort! You know your grumpy feline celebrity pretty well.';
    } else {
      title = '😾 Donut Is Disappointed';
      message = "It's okay — even Donut forgets things sometimes (mostly where she left her fish toy). Give it another go!";
    }

    document.getElementById('quiz-result-title').textContent = title;
    quizResultMessage.textContent = message;
  }

  quizRestartBtn.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    quizResultArea.style.display = 'none';
    quizQuestionArea.style.display = 'block';
    renderQuestion();
  });

  // Initial render
  renderQuestion();

});
