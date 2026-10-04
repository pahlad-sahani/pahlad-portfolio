// ================= Project Data for Lightbox =================
const projects = {
  project1: {
    mainImage: 'images/stylehub1.png',
    images: [
      'images/stylehub1.png',
      'images/stylehub2.png',
      'images/stylehub3.png',
      'images/stylehub4.png',
      'images/stylehub5.png',
      'images/stylehub6.png',
      'images/stylehub7.png',
      'images/stylehub8.png',
      'images/stylehub9.png',
      'images/stylehub10.png',
      'images/stylehub11.png'

    ]
  },
  project2: {
    mainImage: 'images/speakenglish1.png',
    images: [
      'images/speakenglish1.png',
      'images/speakenglish2.png',
      'images/speakenglish3.png',
      'images/speakenglish4.png',
      'images/speakenglish5.png',
      'images/speakenglish6.png',
      'images/speakenglish7.png',
      'images/speakenglish8.png',
      'images/speakenglish9.png'
    ]
  },
  project3: {
    mainImage: 'images/dwarka1.png',
    images: [
      'images/dwarka1.png',
      'images/dwarka2.png',
      'images/dwarka3.png',
      'images/dwarka4.png',
      'images/dwarka5.png',
      'images/dwarka6.png'
    ]
  }
};

let currentProject = null;
let currentImageIndex = 0;

// ================= Lightbox Functions =================
function openLightbox(projectId) {
  if (!projects[projectId]) return;
  
  currentProject = projectId;
  currentImageIndex = 0;

  const lightbox = document.getElementById('lightbox');
  const mainImg = document.getElementById('lightbox-main-image');
  const gallery = document.getElementById('lightbox-gallery');

  if (!lightbox || !mainImg || !gallery) return;

  mainImg.src = projects[projectId].images[0];
  gallery.innerHTML = '';

  projects[projectId].images.forEach((src, idx) => {
    const thumb = document.createElement('img');
    thumb.src = src;
    thumb.alt = `Thumbnail ${idx + 1}`;
    if (idx === 0) thumb.classList.add('active-thumb');
    
    thumb.addEventListener('click', (e) => {
      e.stopPropagation();
      currentImageIndex = idx;
      updateLightboxImage();
    });

    gallery.appendChild(thumb);
  });

  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

function updateLightboxImage() {
  if (!currentProject || !projects[currentProject]) return;

  const mainImg = document.getElementById('lightbox-main-image');
  if (mainImg) {
    mainImg.src = projects[currentProject].images[currentImageIndex];
  }

  const thumbs = document.querySelectorAll('#lightbox-gallery img');
  thumbs.forEach((thumb, idx) => {
    thumb.classList.toggle('active-thumb', idx === currentImageIndex);
    if (idx === currentImageIndex) {
      thumb.style.border = '2px solid var(--primary)';
      thumb.style.transform = 'scale(1.08)';
    } else {
      thumb.style.border = 'none';
      thumb.style.transform = 'scale(1)';
    }
  });
}

function prevImage() {
  if (!currentProject || !projects[currentProject]) return;
  const list = projects[currentProject].images;
  currentImageIndex = (currentImageIndex - 1 + list.length) % list.length;
  updateLightboxImage();
}

function nextImage() {
  if (!currentProject || !projects[currentProject]) return;
  const list = projects[currentProject].images;
  currentImageIndex = (currentImageIndex + 1) % list.length;
  updateLightboxImage();
}

// Make functions accessible to HTML inline onclick attributes
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.prevImage = prevImage;
window.nextImage = nextImage;

// ================= DOM Ready Handlers =================
document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Mobile Hamburger Menu Toggle
  const hamburger = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu') || document.querySelector('nav');
  const navLinks = document.querySelectorAll('nav a');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.classList.toggle('nav-open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('nav-open');
      });
    });
  }

  // 1b. Highlight active nav link on scroll (mobile + desktop)
  const sections = document.querySelectorAll('main section[id]');
  if (sections.length && navLinks.length) {
    const setActiveLink = () => {
      let currentId = sections[0].id;
      const scrollPos = window.scrollY + 120;
      sections.forEach(sec => {
        if (sec.offsetTop <= scrollPos) currentId = sec.id;
      });
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
      });
    };
    window.addEventListener('scroll', setActiveLink, { passive: true });
    setActiveLink();
  }

  // 2. Animated Typing Effect
  const animatedText = document.querySelector('.animated-text');
  const professions = [
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'YouTuber'
  ];
  let currentProfession = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 120;

  function type() {
    if (!animatedText) return;
    const currentText = professions[currentProfession];

    if (isDeleting) {
      animatedText.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 60;
    } else {
      animatedText.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 120;
    }

    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      typingSpeed = 1800; // Pause at full word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      currentProfession = (currentProfession + 1) % professions.length;
      typingSpeed = 400; // Pause before typing new word
    }

    setTimeout(type, typingSpeed);
  }
  type();

  // 3. Rotating Hero Image
  const heroImage = document.getElementById('rotatingImage');
  const heroImages = [
    'images/pks1.jpeg',
    'images/pks4.jpeg'
    
  ];
  let heroIndex = 0;

  if (heroImage) {
    setInterval(() => {
      heroIndex = (heroIndex + 1) % heroImages.length;
      heroImage.src = heroImages[heroIndex];
    }, 4000);
  }

  // 4. Dynamic Copyright Year
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 5. Fill Skill Bars on Scroll
  const skillBars = document.querySelectorAll('.level-bar');
  const skillsSection = document.querySelector('.skills-section');

  if (skillBars.length > 0) {
    // Save target widths from inline styles or data attributes
    skillBars.forEach(bar => {
      const targetWidth = bar.getAttribute('data-width') || bar.style.width || '80%';
      bar.dataset.targetWidth = targetWidth;
      bar.style.width = '0';
    });

    const animateSkillBars = () => {
      skillBars.forEach(bar => {
        bar.style.width = bar.dataset.targetWidth;
      });
    };

    if (skillsSection && 'IntersectionObserver' in window) {
      const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateSkillBars();
            skillObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      skillObserver.observe(skillsSection);
    } else {
      // Fallback
      animateSkillBars();
    }
  }

  // 6. Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = this.querySelector('.submit-btn');
      const originalHtml = btn.innerHTML;

      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      btn.disabled = true;

      // Simulated network request
      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        btn.style.background = 'linear-gradient(90deg, #00cc00, #66ff66)';

        setTimeout(() => {
          contactForm.reset();
          btn.innerHTML = originalHtml;
          btn.style.background = '';
          btn.disabled = false;
        }, 2000);
      }, 1000);
    });
  }

  // 7. Lightbox Backdrop Click & Keyboard Controls
  const lightbox = document.getElementById('lightbox');
  const lightboxContainer = document.querySelector('.lightbox-container');

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  if (lightboxContainer) {
    lightboxContainer.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
  });
});