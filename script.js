// ===============================
// Life Hack Agency – script.js
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  setCurrentYear();
  enableSmoothScroll();
  initContactForm();
  initProjectTypeHelper();
  handleHeaderOnScroll();
});

// ---------- Helper: Current Year in Footer ----------
function setCurrentYear() {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

// ---------- Smooth Scroll for Internal Links ----------
function enableSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      event.preventDefault();
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });
}

// ---------- Contact Form Logic ----------
function initContactForm() {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  const nameInput = form.querySelector("#name");
  const businessInput = form.querySelector("#business");
  const phoneInput = form.querySelector("#phone");
  const projectSelect = form.querySelector("#project-type");
  const messageInput = form.querySelector("#message");

  // Create a small alert area at the bottom of the form
  const alertBox = document.createElement("div");
  alertBox.className = "form-alert"; // You can style .form-alert in CSS later
  alertBox.style.marginTop = "0.75rem";
  alertBox.style.fontSize = "0.8rem";
  form.appendChild(alertBox);

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Clear previous alert
    alertBox.textContent = "";
    alertBox.style.color = "";
    alertBox.style.display = "none";

    const errors = [];

    if (!nameInput.value.trim()) {
      errors.push("Please enter your name.");
    }
    if (!phoneInput.value.trim()) {
      errors.push("Please enter the best cell phone number.");
    }
    if (!projectSelect.value) {
      errors.push("Please choose what you need built.");
    }
    if (!messageInput.value.trim()) {
      errors.push("Tell us a little bit about your project.");
    }

    if (errors.length > 0) {
      alertBox.textContent = errors.join(" ");
      alertBox.style.color = "#fca5a5"; // light red
      alertBox.style.display = "block";
      return;
    }

    // Fake "send" (front-end only)
    // Here is where you'd hook in your backend or email service later.
    alertBox.textContent =
      "Thanks! Your project details have been received. We’ll follow up with a simple game plan.";
    alertBox.style.color = "#bbf7d0"; // light green
    alertBox.style.display = "block";

    // Reset form after a short delay for nicer UX
    setTimeout(() => {
      form.reset();
      projectTypeHelperText("");
    }, 800);
  });
}

// ---------- Project Type Helper / Smart Copy ----------
function initProjectTypeHelper() {
  const projectSelect = document.querySelector("#project-type");
  if (!projectSelect) return;

  projectSelect.addEventListener("change", () => {
    projectTypeHelperText(projectSelect.value);
  });
}

function projectTypeHelperText(value) {
  // This will update the button text based on selected project
  const submitButton = document.querySelector(".contact-form button[type='submit']");
  if (!submitButton) return;

  switch (value) {
    case "full-site":
      submitButton.textContent = "Start my $999.99 website build";
      break;
    case "landing-page":
      submitButton.textContent = "Start my $499.99 landing page";
      break;
    case "app-layout":
      submitButton.textContent = "Start my app-style layout";
      break;
    case "other":
      submitButton.textContent = "Send my project details";
      break;
    default:
      submitButton.textContent = "Send my project details";
  }
}

// ---------- Header Style on Scroll (subtle upgrade) ----------
function handleHeaderOnScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const toggleScrolledClass = () => {
    if (window.scrollY > 10) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  };

  // Run once on load
  toggleScrolledClass();

  window.addEventListener("scroll", toggleScrolledClass);
}

/*
 UPGRADE NOTE FOR THE REAL PNG LOGO (CENTERED):

 1) In your index.html, inside the hero section, you can add your big PNG logo:
    <img
      src="assets/life-hack-agency-logo.png"
      alt="Life Hack Agency thumbs-up logo"
      class="hero-logo-center"
    />

 2) The CSS in style.css already has .hero-logo-center to make it big and centered:
    - Dead center above your headline
    - Nice drop shadow
    - Scales on mobile and desktop

 3) When you drop your real PNG into /assets with that filename, it will show automatically.
*/
