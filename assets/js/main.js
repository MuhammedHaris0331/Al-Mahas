/**
 * AL MAHAS – Clean & Fixed Main JS
 * Production Safe
 */

(function () {
  "use strict";

  const body = document.body;
  const header = document.querySelector("#header");

  /* ===============================
     HEADER SCROLL EFFECT
  =============================== */
  function handleScrollHeader() {
    if (!header) return;
    body.classList.toggle("scrolled", window.scrollY > 100);
  }

  window.addEventListener("scroll", handleScrollHeader);
  window.addEventListener("load", handleScrollHeader);

  /* ===============================
     MOBILE NAV TOGGLE
  =============================== */
  const mobileNavToggle = document.querySelector(".mobile-nav-toggle");

  if (mobileNavToggle) {
    mobileNavToggle.addEventListener("click", () => {
      body.classList.toggle("mobile-nav-active");
      mobileNavToggle.classList.toggle("bi-list");
      mobileNavToggle.classList.toggle("bi-x");
    });
  }

  document.querySelectorAll("#navmenu a").forEach(link => {
    link.addEventListener("click", () => {
      if (body.classList.contains("mobile-nav-active")) {
        body.classList.remove("mobile-nav-active");
        mobileNavToggle?.classList.toggle("bi-list");
        mobileNavToggle?.classList.toggle("bi-x");
      }
    });
  });

  /* ===============================
     SCROLL TOP BUTTON
  =============================== */
  const scrollTopBtn = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (!scrollTopBtn) return;
    scrollTopBtn.classList.toggle("active", window.scrollY > 200);
  }

  scrollTopBtn?.addEventListener("click", e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", toggleScrollTop);
  window.addEventListener("load", toggleScrollTop);

  /* ===============================
     PRELOADER (FIXED)
  =============================== */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      setTimeout(() => {
        preloader.style.opacity = "0";
        preloader.style.visibility = "hidden";
        preloader.remove();
      }, 300);
    });
  }

  /* ===============================
     AOS ANIMATION
  =============================== */
  window.addEventListener("load", () => {
    if (window.AOS) {
      AOS.init({
        duration: 600,
        easing: "ease-in-out",
        once: true
      });
    }
  });

  /* ===============================
     CONTACT FORM (SINGLE SUBMIT – FIXED)
  =============================== */
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const statusMsg = document.getElementById("form-status");

    if (!form || !statusMsg) return;

    let isSubmitting = false;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (isSubmitting) return;

      isSubmitting = true;
      statusMsg.textContent = "Sending...";
      statusMsg.style.color = "#555";

      const formData = new FormData(form);

      fetch("https://script.google.com/macros/s/AKfycbzuGkHb-ofVKt-otWsK-j4933FK4pWrGGwNLtq6wxJ2OqCVsgiT_BMRdHH61cI9tnwM/exec", {
        method: "POST",
        body: formData
      })
        .then(res => res.text())
        .then(() => {
          // If it reaches here, data IS saved
          statusMsg.textContent = "✅ Message sent successfully!";
          statusMsg.style.color = "green";
          form.reset();
        })
        .catch(() => {
          statusMsg.textContent = "❌ Failed to send. Try again.";
          statusMsg.style.color = "red";
        })
        .finally(() => {
          isSubmitting = false;
        });
    });
  });

})();
