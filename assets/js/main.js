/**
 * RAVI RAJPOOT - PORTFOLIO
 * Main JavaScript File
 */

(function() {
  'use strict';

  // ==================== 
  // UTILITY FUNCTIONS
  // ==================== 
  
  const select = (selector, all = false) => {
    selector = selector.trim();
    return all ? [...document.querySelectorAll(selector)] : document.querySelector(selector);
  };

  const on = (type, selector, listener, all = false) => {
    const elements = select(selector, all);
    if (elements) {
      if (all) {
        elements.forEach(el => el.addEventListener(type, listener));
      } else {
        elements.addEventListener(type, listener);
      }
    }
  };

  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener);
  };

  // ==================== 
  // PRELOADER
  // ==================== 
  
  window.addEventListener('load', () => {
    const preloader = select('#preloader');
    if (preloader) {
      setTimeout(() => {
        preloader.classList.add('loaded');
        setTimeout(() => {
          preloader.remove();
        }, 500);
      }, 500);
    }
  });

  // ==================== 
  // HEADER SCROLL EFFECT
  // ==================== 
  
  const header = select('#header');
  
  const headerScrolled = () => {
    if (window.scrollY > 100) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  };

  window.addEventListener('load', headerScrolled);
  onscroll(document, headerScrolled);

  // ==================== 
  // ACTIVE NAV LINK ON SCROLL
  // ==================== 
  
  const navLinks = select('.navbar-nav .nav-link', true);
  const sections = select('section[id]', true);

  const activateNavLink = () => {
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('load', activateNavLink);
  onscroll(document, activateNavLink);

  // ==================== 
  // SMOOTH SCROLL
  // ==================== 
  
  on('click', '.navbar-nav .nav-link', function(e) {
    const hash = this.getAttribute('href');
    
    if (hash.startsWith('#')) {
      e.preventDefault();
      const target = select(hash);
      
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Close mobile menu if open
        const navbarCollapse = select('.navbar-collapse');
        if (navbarCollapse?.classList.contains('show')) {
          const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
          bsCollapse?.hide();
        }
      }
    }
  }, true);

  // ==================== 
  // SCROLL INDICATOR CLICK
  // ==================== 
  
  on('click', '.scroll-link', function(e) {
    e.preventDefault();
    const target = select('#about');
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });

  // ==================== 
  // BACK TO TOP BUTTON
  // ==================== 
  
  const backToTop = select('#backToTop');

  const toggleBackToTop = () => {
    if (window.scrollY > 300) {
      backToTop?.classList.add('active');
    } else {
      backToTop?.classList.remove('active');
    }
  };

  window.addEventListener('load', toggleBackToTop);
  onscroll(document, toggleBackToTop);

  on('click', '#backToTop', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // ==================== 
  // TYPED.JS INITIALIZATION
  // ==================== 
  
  const initTyped = () => {
    const typedElement = select('.typed');
    if (typedElement) {
      const typedStrings = typedElement.getAttribute('data-typed-items');
      if (typedStrings) {
        new Typed('.typed', {
          strings: typedStrings.split(',').map(s => s.trim()),
          loop: true,
          typeSpeed: 80,
          backSpeed: 40,
          backDelay: 2000,
          startDelay: 500,
          showCursor: true,
          cursorChar: '|'
        });
      }
    }
  };

  window.addEventListener('load', initTyped);

  // ==================== 
  // AOS INITIALIZATION
  // ==================== 
  
  window.addEventListener('load', () => {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        offset: 50
      });
    }
  });

  // ==================== 
  // SKILLS PROGRESS ANIMATION
  // ==================== 
  
  const animateSkills = () => {
    const progressBars = select('.progress-bar', true);
    
    progressBars.forEach(bar => {
      const width = bar.getAttribute('data-width') || bar.style.width;
      bar.style.width = '0';
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              bar.style.width = typeof width === 'string' ? width : `${width}%`;
            }, 200);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      
      observer.observe(bar);
    });
  };

  window.addEventListener('load', animateSkills);

  // ==================== 
  // COUNTER ANIMATION
  // ==================== 
  
  const animateCounters = () => {
    const counters = select('.stat-number', true);
    
    counters.forEach(counter => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const target = parseInt(counter.textContent);
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                counter.textContent = counter.textContent; // Keep original text (with + sign)
                clearInterval(timer);
              } else {
                counter.textContent = Math.floor(current) + '+';
              }
            }, 30);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      
      observer.observe(counter);
    });
  };

  window.addEventListener('load', animateCounters);

  // ==================== 
  // NAVBAR BACKGROUND ON MOBILE
  // ==================== 
  
  const navbarCollapse = select('.navbar-collapse');
  
  if (navbarCollapse) {
    navbarCollapse.addEventListener('show.bs.collapse', () => {
      header?.classList.add('scrolled');
    });
    
    navbarCollapse.addEventListener('hidden.bs.collapse', () => {
      if (window.scrollY <= 100) {
        header?.classList.remove('scrolled');
      }
    });
  }

  // ==================== 
  // IMAGE LAZY LOADING
  // ==================== 
  
  const lazyImages = select('img[data-src]', true);
  
  if (lazyImages.length > 0) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
  }

  // ==================== 
  // FORM VALIDATION (if contact form exists)
  // ==================== 
  
  const contactForm = select('#contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Add your form submission logic here
      console.log('Form submitted');
    });
  }

  // ==================== 
  // KEYBOARD NAVIGATION
  // ==================== 
  
  document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
      const navbarCollapse = select('.navbar-collapse.show');
      if (navbarCollapse) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        bsCollapse?.hide();
      }
    }
  });

  // ==================== 
  // PERFORMANCE OPTIMIZATION
  // ==================== 
  
  // Debounce scroll events
  let scrollTimeout;
  const debouncedScroll = (callback) => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(callback, 10);
  };

  // Optimize scroll listeners
  window.addEventListener('scroll', () => {
    debouncedScroll(() => {
      headerScrolled();
      toggleBackToTop();
      activateNavLink();
    });
  }, { passive: true });

  // ==================== 
  // CONSOLE EASTER EGG
  // ==================== 
  
  console.log('%c👋 Hey there!', 'font-size: 24px; font-weight: bold; color: #0078ff;');
  console.log('%cLooking for a Full-Stack Developer? Let\'s connect!', 'font-size: 14px; color: #333;');
  console.log('%c📧 dev.ravirajput@gmail.com', 'font-size: 12px; color: #666;');

})();