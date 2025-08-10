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

/* =====================================================
   Generic Modal open/close function
===================================================== */
const allCardsWithModals = document.querySelectorAll(".card-with-modal");
allCardsWithModals.forEach((cardWithModal) => {
   const card = cardWithModal.querySelector(".service-card, .keyprojects-card");
   const backdrop = cardWithModal.querySelector(".service-modal-backdrop, .keyprojects-modal-backdrop");
   const modal = cardWithModal.querySelector(".service-modal, .keyprojects-modal");
   const closeBtn = cardWithModal.querySelector(".modal-close-btn");

   if (card && backdrop && modal && closeBtn) {
       const openModal = () => {
           backdrop.style.display = "flex";
           setTimeout(() => {
               backdrop.classList.add("active");
               modal.classList.add("active");
           }, 20);
       };
       const closeModal = () => {
           backdrop.classList.remove("active");
           modal.classList.remove("active");
           setTimeout(() => { backdrop.style.display = "none"; }, 500);
       };
       card.addEventListener("click", openModal);
       closeBtn.addEventListener("click", closeModal);
       backdrop.addEventListener("click", (event) => {
           if (event.target === backdrop) {
               closeModal();
           }
       });
   }
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
   emailjs.init({
     publicKey: "Dutvo2lKGBT0Q7wQr",
   });
})();
const maxContactForm = document.getElementById("max-contact-form");
const maxContactFormAlert = document.querySelector(".contact-form-alert");
if (maxContactForm) {
    maxContactForm.addEventListener('submit', function(event) {
       event.preventDefault();
       emailjs.sendForm('service_x6gqeyr', 'template_xmtrqlg', '#max-contact-form')
           .then(() => {
             maxContactFormAlert.innerHTML = "<span>Your message sent successfully!</span> <i class='ri-checkbox-circle-fill'></i>";
             maxContactForm.reset();
             setTimeout(() => {
                maxContactFormAlert.innerHTML = "";
             }, 5000);
           }, (error) => {
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
    const sueHeader = document.querySelector(".sue-header");
    if(sueHeader) sueHeader.classList.toggle("shrink", scrollY > 0);
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
    if (bottomNav) {
        if (scrollY > 10) {
            if(menuHideBtn) menuHideBtn.classList.add("active");
            clearTimeout(navTimeout);
            navTimeout = setTimeout(() => {
                bottomNav.classList.remove("active");
                if (menuShowBtn) menuShowBtn.classList.add("active");
            }, 2500);
        } else {
            bottomNav.classList.add("active");
            if(menuHideBtn) menuHideBtn.classList.remove("active");
            if(menuShowBtn) menuShowBtn.classList.remove("active");
        }
        const navMenuSections = document.querySelectorAll(".nav-menu-section");
        const navLinks = document.querySelectorAll(".bottom-nav .menu li a");
        let currentSectionId = "";
        navMenuSections.forEach(section => {
            const sectionTop = section.offsetTop - 70;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove("current");
            if (link.getAttribute("href") === "#" + currentSectionId) {
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
    Blog Page - Proverb Rotator (Final Fix)
===================================================== */
document.addEventListener("DOMContentLoaded", () => {
    const rolodexCard = document.querySelector(".rolodex-card");
    if (rolodexCard) {
        const proverbs = [
            { text: "A single bracelet does not jingle.", origin: "Susu Proverb" },
            { text: "The one who asks questions does not lose his way.", origin: "African Proverb" },
            { text: "A patient person will eat ripe fruit.", origin: "Guinean Proverb" },
            { text: "To go fast, go alone. To go far, go together.", origin: "African Proverb" }
        ];

        let currentIndex = 0;
        const proverbTextElem = rolodexCard.querySelector(".proverb-text");
        const proverbOriginElem = rolodexCard.querySelector(".proverb-origin");

        setInterval(() => {
            rolodexCard.classList.toggle("flip");

            // Update the text halfway through the flip so it appears on the new face
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % proverbs.length;
                proverbTextElem.textContent = `"${proverbs[currentIndex].text}"`;
                proverbOriginElem.textContent = `- ${proverbs[currentIndex].origin}`;
            }, 400); // 400ms is half of the 0.8s CSS transition

        }, 15000); // Changes every 15 seconds
    }
});

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
