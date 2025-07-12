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
var swiper = new Swiper(".sue-client-swiper", {
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
   if (window.scrollY < 10 &&
