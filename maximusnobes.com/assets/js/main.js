/* =====================================================
   Resume section tabs and tab contents
===================================================== */
const resumeTabs = document.querySelector(".resume-tabs");
if (resumeTabs) {
    const resumekeyprojectsTabBtns = resumeTabs.querySelectorAll(".tab-btn");
    const resumeTabContents = document.querySelectorAll(".resume-tab-content");

    var resumeTabNav = function(resumeTabClick){
       resumeTabContents.forEach((resumeTabContent) => {
          resumeTabContent.style.display = "none";
          resumeTabContent.classList.remove("active");
       });

       resumekeyprojectsTabBtns.forEach((resumekeyprojectsTabBtn) => {
          resumekeyprojectsTabBtn.classList.remove("active");
       });

       resumeTabContents[resumeTabClick].style.display = "flex";

       setTimeout(() => {
          resumeTabContents[resumeTabClick].classList.add("active");
       }, 100);

       resumekeyprojectsTabBtns[resumeTabClick].classList.add("active");
    }

    resumekeyprojectsTabBtns.forEach((resumekeyprojectsTabBtn, i) => {
       resumekeyprojectsTabBtn.addEventListener("click", () => {
          resumeTabNav(i);
       });
    });
}


/* =====================================================
   Service modal open/close function
===================================================== */
const serviceCardWithModals = document.querySelectorAll(".service-container .card-with-modal");

serviceCardWithModals.forEach((serviceCardWithModal) => {
   const serviceCard = serviceCardWithModal.querySelector(".service-card");
   const serviceBackDrop = serviceCardWithModal.querySelector(".service-modal-backdrop");
   const serviceModal = serviceCardWithModal.querySelector(".service-modal");
   const modalCloseBtn = serviceCardWithModal.querySelector(".modal-close-btn");

   serviceCard.addEventListener("click", () => {
      serviceBackDrop.style.display = "flex";
      setTimeout(() => { serviceBackDrop.classList.add("active"); }, 100);
      setTimeout(() => { serviceModal.classList.add("active"); }, 300);
   });

   modalCloseBtn.addEventListener("click", () => {
      setTimeout(() => { serviceBackDrop.style.display = "none"; }, 500);
      setTimeout(() => {
         serviceBackDrop.classList.remove("active");
         serviceModal.classList.remove("active");
      }, 100);
   });
});

/* =====================================================
   Key Projects modals, tabs and cards
===================================================== */
document.addEventListener("DOMContentLoaded", () => {
   const keyprojectsTabs = document.querySelector(".keyprojects-tabs");
   if (!keyprojectsTabs) return;
   const keyprojectsTabBtns = keyprojectsTabs.querySelectorAll(".tab-btn");
   const cardsWithModals = document.querySelectorAll(".keyprojects-container .card-with-modal");

   keyprojectsTabBtns.forEach((tabBtn) => {
      tabBtn.addEventListener("click", () => {
         const filter = tabBtn.getAttribute("data-filter");
         cardsWithModals.forEach((cardWithModal) => {
            if(filter === "all" || cardWithModal.classList.contains(filter)){
               cardWithModal.classList.remove("hidden");
               setTimeout(() => {
                  cardWithModal.style.opacity = "1";
                  cardWithModal.style.transition = ".5s ease";
               }, 1);
            } else {
               cardWithModal.classList.add("hidden");
               setTimeout(() => {
                  cardWithModal.style.opacity = "0";
                  cardWithModal.style.transition = ".5s ease";
               }, 1);
            }
         });
         keyprojectsTabBtns.forEach((btn) => btn.classList.remove("active"));
         tabBtn.classList.add("active");
      });
   });
});

const keyprojectsCardsWithModals = document.querySelectorAll(".keyprojects-container .card-with-modal");
keyprojectsCardsWithModals.forEach((keyprojectsCardWithModal) => {
   const keyprojectsCard = keyprojectsCardWithModal.querySelector(".keyprojects-card");
   const keyprojectsBackdrop = keyprojectsCardWithModal.querySelector(".keyprojects-modal-backdrop");
   const keyprojectsModal = keyprojectsCardWithModal.querySelector(".keyprojects-modal");
   const modalCloseBtn = keyprojectsCardWithModal.querySelector(".modal-close-btn");

   const closeModal = () => {
      keyprojectsBackdrop.classList.remove("active");
      keyprojectsModal.classList.remove("active");
      setTimeout(() => { keyprojectsBackdrop.style.display = "none"; }, 500);
   }

   keyprojectsCard.addEventListener("click", () => {
      keyprojectsBackdrop.style.display = "flex";
      setTimeout(() => {
         keyprojectsBackdrop.classList.add("active");
         keyprojectsModal.classList.add("active");
      }, 20);
   });

   modalCloseBtn.addEventListener("click", closeModal);
   keyprojectsBackdrop.addEventListener("click", (event) => {
      if (event.target === keyprojectsBackdrop) {
         closeModal();
      }
   });
});

/* =====================================================
   Testimonial Swiper
===================================================== */
const testimonialSwiper = document.querySelector(".sue-client-swiper");
if (testimonialSwiper) {
    var swiper = new Swiper(testimonialSwiper, {
       slidesPerView: 1,
       spaceBetween: 30,
       loop: true,
       pagination: {
         el: ".swiper-pagination",
         clickable: true,
       },
       navigation: {
         nextEl: ".swiper-button-next",
         prevEl: ".swiper-button-prev",
       },
    });
}

/* =====================================================
   Send/Receive emails from contact form - EmailJS
===================================================== */
(function() {
   // https://dashboard.emailjs.com/admin/account
   emailjs.init({
     publicKey: "Dutvo2lKGBT0Q7wQr",
   });
})();

const maxContactForm = document.getElementById("max-contact-form");
const maxContactFormAlert = document.querySelector(".contact-form-alert");

if (maxContactForm) {
    maxContactForm.addEventListener('submit', function(event) {
       event.preventDefault();
       // these IDs from the previous steps
       emailjs.sendForm('service_x6gqeyr', 'template_xmtrqlg', '#max-contact-form')
           .then(() => {
             //   console.log('SUCCESS!');
             maxContactFormAlert.innerHTML = "<span>Your message sent successfully!</span> <i class='ri-checkbox-circle-fill'></i>";
             maxContactForm.reset();
    
             setTimeout(() => {
                maxContactFormAlert.innerHTML = "";
             }, 5000);
           }, (error) => {
             //   console.log('FAILED...', error);
             maxContactFormAlert.innerHTML = "<span>Message not sent</span> <i class='ri-error-warning-fill'></i>";
             maxContactFormAlert.title = error;
           });
    });
}


/* =====================================================
   SCROLL EVENT LISTENER (Consolidated)
===================================================== */
const bottomNav = document.querySelector(".bottom-nav");
const menuHideBtn = document.querySelector(".menu-hide-btn");
const menuShowBtn = document.querySelector(".menu-show-btn");
var navTimeout;

window.addEventListener("scroll", () => {
    const scrollY = window.pageYOffset;

    // --- 1. Header shrink logic ---
    const sueHeader = document.querySelector(".sue-header");
    if(sueHeader) sueHeader.classList.toggle("shrink", scrollY > 0);

    // --- 2. To-top-button and scroll indicator logic ---
    const toTopBtn = document.querySelector(".to-top-btn");
    if (toTopBtn) {
        toTopBtn.classList.toggle("active", scrollY > 0);
        const scrollIndicatorBar = toTopBtn.querySelector(".scroll-indicator-bar");
        if(scrollIndicatorBar){
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollValue = (height > 0) ? (scrollY / height) * 100 : 0;
            scrollIndicatorBar.style.height = scrollValue + "%";
        }
    }

    // --- 3. Bottom navigation menu logic ---
    if (bottomNav) {
        // Visibility Logic
        bottomNav.classList.add("active");
        if(menuShowBtn) menuShowBtn.classList.remove("active");

        if (scrollY < 10) {
            if(menuHideBtn) menuHideBtn.classList.remove("active");
        } else {
            if(menuHideBtn) menuHideBtn.classList.add("active");
        }

        const scrollStopped = () => {
            if (scrollY > 10) {
                bottomNav.classList.remove("active");
                if (menuShowBtn) menuShowBtn.classList.add("active");
            }
        };
        clearTimeout(navTimeout);
        navTimeout = setTimeout(scrollStopped, 2500);

        // Highlighting Logic (NEW REVERSE LOOP METHOD)
        const navMenuSections = document.querySelectorAll(".nav-menu-section");
        const navLinks = document.querySelectorAll(".bottom-nav .menu li a");
        let currentSectionId = "home"; // Default to 'home'

        // Iterate backwards from the last section to the first
        for (let i = navMenuSections.length - 1; i >= 0; i--) {
            const current = navMenuSections[i];
            const sectionTop = current.offsetTop - 60; // 60px offset to trigger highlight sooner

            if (scrollY >= sectionTop) {
                currentSectionId = current.getAttribute("id");
                break; // Exit loop once the current section is found
            }
        }
        
        // Update the 'current' class on the navigation links
        navLinks.forEach(link => {
            link.classList.remove("current");
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add("current");
            }
        });
    }
});


/* =====================================================
   Bottom Nav Buttons & Initial State
===================================================== */
window.addEventListener("DOMContentLoaded", () => {
   if (window.scrollY < 10 && bottomNav) {
      bottomNav.classList.add("active");
   }
});

if (menuHideBtn) {
    menuHideBtn.addEventListener("click", () => {
        bottomNav.classList.remove("active");
        menuHideBtn.classList.remove("active");
        menuShowBtn.classList.add("active");
    });
}

if (menuShowBtn) {
    menuShowBtn.addEventListener("click", () => {
        bottomNav.classList.add("active");
        menuHideBtn.classList.add("active");
        menuShowBtn.classList.remove("active");
    });
}

/* =====================================================
   Customized cursor on mousemove
===================================================== */
const cursor = document.querySelector(".cursor");
if (cursor) {
    const cursorDot = cursor.querySelector(".cursor-dot");
    const cursorCircle = cursor.querySelector(".cursor-circle");
    document.addEventListener("mousemove", (e) => {
       let x = e.clientX;
       let y = e.clientY;
       cursorDot.style.top = y + "px";
       cursorDot.style.left = x + "px";
       cursorCircle.style.top = y + "px";
       cursorCircle.style.left = x + "px";
    });

    const cursorHoverlinks = document.querySelectorAll("body a, .theme-btn, .sue-main-btn, .keyprojects-card, .swiper-button-next, .swiper-button-prev, .swiper-pagination-bullet, .service-card, .contact-social-links li, .contact-form .submit-btn, .menu-show-btn, .menu-hide-btn");
    cursorHoverlinks.forEach((cursorHoverlink) => {
       cursorHoverlink.addEventListener("mouseover", () => {
          cursorDot.classList.add("large");
          cursorCircle.style.display = "none";
       });
       cursorHoverlink.addEventListener("mouseout", () => {
          cursorDot.classList.remove("large");
          cursorCircle.style.display = "block";
       });
    });
}

/* =====================================================
   Website dark/light theme
===================================================== */
const themeBtn = document.querySelector(".theme-btn");
if (themeBtn) {
    themeBtn.addEventListener("click", () => {
       themeBtn.classList.toggle("active-sun-icon");
       document.body.classList.toggle("light-theme");
       const getCurrentIcon = () => themeBtn.classList.contains("active-sun-icon") ? "sun" : "moon";
       const getCurrentTheme = () => document.body.classList.contains("light-theme") ? "light" : "dark";
       localStorage.setItem("sue-saved-icon", getCurrentIcon());
       localStorage.setItem("sue-saved-theme", getCurrentTheme());
    });

    document.addEventListener("DOMContentLoaded", () => {
        const savedIcon = localStorage.getItem("sue-saved-icon");
        const savedTheme = localStorage.getItem("sue-saved-theme");
        if (savedIcon) {
            themeBtn.classList[savedIcon === "sun" ? "add" : "remove"]("active-sun-icon");
        }
        if (savedTheme) {
            document.body.classList[savedTheme === "light" ? "add" : "remove"]("light-theme");
        }
    });
}

/* =====================================================
   ScrollReveal JS animations
===================================================== */
if (typeof ScrollReveal !== 'undefined') {
    ScrollReveal({
       distance: '60px',
       duration: 2500,
       delay: 400
    });

    ScrollReveal().reveal('.avatar-img', { delay: 100, origin: 'top' });
    ScrollReveal().reveal('.avatar-info, .section-title', { delay: 300, origin: 'top' });
    ScrollReveal().reveal('.home-social, .home-scroll-btn, .copy-right', { delay: 600, origin: 'bottom' });
    ScrollReveal().reveal('.about-img', { delay: 700, origin: 'top' });
    ScrollReveal().reveal('.about-info, .sue-footer .sue-logo', { delay: 300, origin: 'bottom' });
    ScrollReveal().reveal('.pro-card, .about-buttons .sue-main-btn, .resume-tabs .tab-btn, .keyprojects-tabs .tab-btn', { delay: 500, origin: 'right', interval: 200 });
    ScrollReveal().reveal('#resume .section-content', { delay: 700, origin: 'bottom' });
    ScrollReveal().reveal('.service-card, .keyprojects-card, .contact-item, .contact-social-links li, .footer-menu .menu-item', { delay: 300, origin: 'bottom', interval: 300 });
    ScrollReveal().reveal('.sue-client-swiper, .contact-form-body', { delay: 700, origin: 'right' });
    ScrollReveal().reveal('.contact-info h3', { delay: 100, origin: 'bottom', interval: 300 });
}
