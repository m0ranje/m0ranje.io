const title = document.querySelector('.hero-title');

let pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
let current = { x: 0, y: 0 };
let target = { x: 0, y: 0 };
let scrollPinTimer = null;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function updateTarget(clientX, clientY) {
  pointer.x = clientX;
  pointer.y = clientY;

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  target.x = clamp((pointer.x - centerX) / centerX, -1, 1);
  target.y = clamp((pointer.y - centerY) / centerY, -1, 1);
}

function animateTitle() {
  current.x += (target.x - current.x) * 0.09;
  current.y += (target.y - current.y) * 0.09;

  if (title) {
    title.style.transform = `translateX(-50%) translate3d(${current.x * -9}px, ${current.y * -5}px, 0)`;
  }

  requestAnimationFrame(animateTitle);
}

window.addEventListener('pointermove', (event) => {
  updateTarget(event.clientX, event.clientY);
});

window.addEventListener('touchmove', (event) => {
  if (!event.touches.length) return;
  updateTarget(event.touches[0].clientX, event.touches[0].clientY);
}, { passive: true });

window.addEventListener('pointerleave', () => {
  target.x = 0;
  target.y = 0;
});

const links = document.querySelectorAll('a[href^="#"]');
links.forEach((link) => {
  link.addEventListener('click', (event) => {
    const id = link.getAttribute('href');
    const element = document.querySelector(id);
    if (!element) return;
    event.preventDefault();
    link.blur();

    const targetTop = id === '#home'
      ? 0
      : Math.max(0, window.scrollY + element.getBoundingClientRect().top);

    if (scrollPinTimer) window.clearTimeout(scrollPinTimer);
    window.scrollTo({ top: targetTop, behavior: 'smooth' });
    scrollPinTimer = window.setTimeout(() => {
      const finalTop = id === '#home'
        ? 0
        : Math.max(0, window.scrollY + element.getBoundingClientRect().top);
      window.scrollTo({ top: finalTop, behavior: 'auto' });
      scrollPinTimer = null;
    }, 760);

    if (element.classList.contains('kinetic-section')) {
      element.classList.remove('section-hit');
      window.setTimeout(() => element.classList.add('section-hit'), 380);
    }
  });
});

const kineticSections = document.querySelectorAll('.kinetic-section');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    }
  });
}, {
  threshold: 0.35,
});

kineticSections.forEach((section) => {
  sectionObserver.observe(section);
});

const libraryData = {
  certificates: {
    title: 'Сертификаты и грамоты',
    text: 'Здесь собраны мои сертификаты, грамоты и дипломы. Нажми на карточку, чтобы открыть изображение крупно.',
  },
  projects: {
    title: 'Мои проекты',
    text: 'Здесь собраны мои разработки. Скриншоты и видео можно добавить позже в карточки проектов.',
  },
};

const libraryDocuments = {
  certificates: [
    { title: '1 курс / Грамота 1', src: 'moranje_sertifikaty_gramoty/Курс 1/Грамота 1.png' },
    { title: '1 курс / Грамота 2', src: 'moranje_sertifikaty_gramoty/Курс 1/Грамота 2.png' },
    { title: '1 курс / Грамота 3', src: 'moranje_sertifikaty_gramoty/Курс 1/Грамота 3.png' },
    { title: '1 курс / Грамота 4', src: 'moranje_sertifikaty_gramoty/Курс 1/Грамота 4.jpg' },
    { title: '1 курс / Грамота 5', src: 'moranje_sertifikaty_gramoty/Курс 1/Грамота 5.jpg' },
    { title: '2 курс / Грамота 1', src: 'moranje_sertifikaty_gramoty/Курс 2/Грамота 1.jpg' },
    { title: '2 курс / Грамота 2', src: 'moranje_sertifikaty_gramoty/Курс 2/Грамота 2.jpg' },
    { title: '2 курс / Грамота 3', src: 'moranje_sertifikaty_gramoty/Курс 2/Грамота 3.jpg' },
    { title: '2 курс / Грамота 4', src: 'moranje_sertifikaty_gramoty/Курс 2/Грамота 4.jpg' },
    { title: '2 курс / Грамота 5', src: 'moranje_sertifikaty_gramoty/Курс 2/Грамота 5.jpg' },
    { title: '2 курс / Грамота 6', src: 'moranje_sertifikaty_gramoty/Курс 2/Грамота 6.jpg' },
    { title: '2 курс / Грамота 7', src: 'moranje_sertifikaty_gramoty/Курс 2/Грамота 7.jpg' },
    { title: '3 курс / Грамота 1', src: 'moranje_sertifikaty_gramoty/Курс 3/Грамота 1.png' },
    { title: '3 курс / Грамота 2', src: 'moranje_sertifikaty_gramoty/Курс 3/Грамота 2.png' },
    { title: '3 курс / Грамота 3', src: 'moranje_sertifikaty_gramoty/Курс 3/Грамота 3.png' },
    { title: '3 курс / Грамота 4', src: 'moranje_sertifikaty_gramoty/Курс 3/Грамота 4.png' },
    { title: '3 курс / Грамота 5', src: 'moranje_sertifikaty_gramoty/Курс 3/Грамота 5.png' },
    { title: '3 курс / Грамота 6', src: 'moranje_sertifikaty_gramoty/Курс 3/Грамота 6.jpg' },
    { title: '3 курс / Грамота 7', src: 'moranje_sertifikaty_gramoty/Курс 3/Грамота 7.jpg' },
    { title: '3 курс / Грамота 8', src: 'moranje_sertifikaty_gramoty/Курс 3/Грамота 8.jpg' },
    { title: '4 курс / Грамота 1', src: 'moranje_sertifikaty_gramoty/Курс 4/Грамота 1.png' },
    { title: '4 курс / Грамота 2', src: 'moranje_sertifikaty_gramoty/Курс 4/Грамота 2.png' },
    { title: '4 курс / Грамота 3', src: 'moranje_sertifikaty_gramoty/Курс 4/Грамота 3.png' },
  ],
  projects: [
    {
      title: 'Проекты / Лаунчер для Android-магнитолы',
      description: 'Проект лаунчера для Android-магнитолы.',
      media: [
        { type: 'image', title: 'Скриншот лаунчера', src: 'launcher1.jpg' },
        { type: 'video', title: 'Видео лаунчера', src: 'videolauncher.mp4' },
      ],
    },
    {
      title: 'Проекты / Приложение дистанционной печати',
      description: 'Приложение для дистанционной печати на принтере в одной локальной сети.',
      media: [
        { type: 'image', title: 'Скриншот дистанционной печати', src: 'printscreen.png' },
      ],
    },
    {
      title: 'Проекты / Веб-админ панель для ООО "Амуркооп"',
      description: 'Веб-админ панель для ООО "Амуркооп".',
      media: [
        { type: 'video', title: 'Видео веб-админ панели', src: 'amurkoop video.mp4' },
      ],
    },
    {
      title: 'Проекты / NeoLink',
      description: 'В разработке: приложение для передачи видеоряда и веб-ссылок через веб-интерфейс по QR-code.',
      media: [
        { type: 'image', variant: 'logo', title: 'Логотип NeoLink', src: 'neolink.png' },
      ],
    },
  ],
};

const receiptHotspots = document.querySelectorAll('.receipt-hotspot');
const materialsModal = document.getElementById('materialsModal');
const materialsTitle = document.getElementById('materialsTitle');
const materialsText = document.getElementById('materialsText');
const materialsTabs = document.getElementById('materialsTabs');
const materialsGrid = document.getElementById('materialsGrid');
const materialsClose = document.querySelector('.materials-close');
const imageLightbox = document.getElementById('imageLightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxVideo = document.getElementById('lightboxVideo');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.querySelector('.lightbox-close');
const contactForm = document.getElementById('contactForm');

function openLightbox(documentItem) {
  if (!imageLightbox || !lightboxImage || !lightboxVideo || !lightboxCaption) return;
  lightboxImage.hidden = documentItem.type === 'video';
  lightboxVideo.hidden = documentItem.type !== 'video';

  if (documentItem.type === 'video') {
    lightboxImage.src = '';
    lightboxVideo.src = documentItem.src;
    lightboxVideo.play().catch(() => {});
  } else {
    lightboxVideo.pause();
    lightboxVideo.src = '';
    lightboxImage.src = documentItem.src;
    lightboxImage.alt = documentItem.title;
  }

  lightboxCaption.textContent = documentItem.title;
  imageLightbox.classList.add('is-open');
  imageLightbox.setAttribute('aria-hidden', 'false');
}

function closeLightbox() {
  if (!imageLightbox || !lightboxImage || !lightboxVideo) return;
  imageLightbox.classList.remove('is-open');
  imageLightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
  lightboxVideo.pause();
  lightboxVideo.src = '';
}

function renderMaterials(type, selectedGroup = null) {
  if (!materialsGrid) return;
  const documents = libraryDocuments[type] || [];

  materialsGrid.innerHTML = '';
  if (materialsTabs) {
    materialsTabs.innerHTML = '';
    materialsTabs.hidden = true;
  }

  if (!documents.length) {
    const empty = document.createElement('div');
    empty.className = 'materials-empty';
    empty.textContent = 'Сюда можно добавить скриншоты проектов.';
    materialsGrid.append(empty);
    return;
  }

  const groups = documents.reduce((acc, documentItem) => {
    const [courseName] = documentItem.title.split(' / ');
    const groupName = courseName || 'Материалы';
    if (!acc.has(groupName)) acc.set(groupName, []);
    acc.get(groupName).push(documentItem);
    return acc;
  }, new Map());

  const groupNames = [...groups.keys()];
  const activeGroupName = selectedGroup && groups.has(selectedGroup) ? selectedGroup : groupNames[0];

  if (type === 'certificates' && materialsTabs && groupNames.length > 1) {
    materialsTabs.hidden = false;

    groupNames.forEach((groupName) => {
      const tab = document.createElement('button');
      tab.className = 'materials-tab';
      tab.type = 'button';
      tab.textContent = groupName;
      tab.setAttribute('aria-pressed', groupName === activeGroupName ? 'true' : 'false');
      tab.addEventListener('click', () => renderMaterials(type, groupName));
      materialsTabs.append(tab);
    });
  }

  const groupDocuments = groups.get(activeGroupName) || documents;
  const group = document.createElement('section');
  const heading = document.createElement('h3');
  const list = document.createElement('div');

  group.className = 'materials-course';
  heading.textContent = activeGroupName;
  list.className = 'materials-course-grid';

  groupDocuments.forEach((documentItem) => {
    const card = document.createElement(documentItem.src ? 'button' : 'article');
    const label = document.createElement('span');

    card.className = `library-slot document-card${documentItem.src ? '' : ' project-card'}`;
    if (documentItem.src) card.type = 'button';
    label.textContent = documentItem.title.replace(`${activeGroupName} / `, '');

    if (documentItem.src) {
      const image = document.createElement('img');
      image.src = documentItem.src;
      image.alt = documentItem.title;
      image.loading = 'lazy';
      card.append(image);
      card.addEventListener('click', () => openLightbox(documentItem));
    } else {
      const mediaList = document.createElement('div');
      const description = document.createElement('p');
      mediaList.className = 'project-media-list';
      description.textContent = documentItem.description || '';

      if (!documentItem.media?.length) {
        const placeholder = document.createElement('div');
        placeholder.className = 'project-media project-media-empty';
        placeholder.textContent = 'В разработке';
        mediaList.append(placeholder);
      }

      (documentItem.media || []).forEach((mediaItem) => {
        const mediaButton = document.createElement('button');
        mediaButton.className = `project-media project-media-${mediaItem.type}${mediaItem.variant ? ` project-media-${mediaItem.variant}` : ''}`;
        mediaButton.type = 'button';

        if (mediaItem.type === 'image') {
          const preview = document.createElement('img');
          preview.src = mediaItem.src;
          preview.alt = mediaItem.title;
          preview.loading = 'lazy';
          mediaButton.append(preview);
        }

        const mediaLabel = document.createElement('span');
        mediaLabel.textContent = mediaItem.type === 'video' ? 'Видео' : 'Скриншот';
        mediaButton.append(mediaLabel);
        mediaButton.addEventListener('click', () => openLightbox(mediaItem));
        mediaList.append(mediaButton);
      });

      card.append(label, mediaList, description);
    }

    if (documentItem.src) card.append(label);
    list.append(card);
  });

  group.append(heading, list);
  materialsGrid.append(group);
}

function openMaterials(type) {
  const content = libraryData[type];
  if (!content || !materialsModal) return;

  if (materialsTitle) materialsTitle.textContent = content.title;
  if (materialsText) materialsText.textContent = content.text;
  materialsModal.classList.toggle('is-projects', type === 'projects');
  renderMaterials(type);

  materialsModal.classList.add('is-open');
  materialsModal.setAttribute('aria-hidden', 'false');
}

function closeMaterials() {
  if (!materialsModal) return;
  materialsModal.classList.remove('is-open');
  materialsModal.setAttribute('aria-hidden', 'true');
}

receiptHotspots.forEach((hotspot) => {
  hotspot.addEventListener('click', () => {
    openMaterials(hotspot.dataset.materials);
  });
});

materialsClose?.addEventListener('click', closeMaterials);
materialsModal?.addEventListener('click', (event) => {
  if (event.target === materialsModal) closeMaterials();
});
lightboxClose?.addEventListener('click', closeLightbox);
imageLightbox?.addEventListener('click', (event) => {
  if (event.target === imageLightbox) closeLightbox();
});
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMaterials();
  if (event.key === 'Escape') closeLightbox();
});

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const email = formData.get('email')?.toString().trim() || '';
  const name = formData.get('name')?.toString().trim() || '';
  const question = formData.get('question')?.toString().trim() || '';
  const subject = encodeURIComponent(`Вопрос с сайта от ${name}`);
  const body = encodeURIComponent(`Почта: ${email}\nИмя: ${name}\n\nВопрос:\n${question}`);
  window.location.href = `mailto:nikitanastenko30@gmail.com?subject=${subject}&body=${body}`;
});

animateTitle();
