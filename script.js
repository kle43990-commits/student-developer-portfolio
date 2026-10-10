"use strict";

// ========================================
// Extra 1: Light / Dark mode
// ========================================
const themeToggle = document.getElementById("themeToggle");
const themeLabel = document.querySelector(".theme-label");
const themeIcon = themeToggle.querySelector("i");

function setTheme(isDark) {
  document.body.classList.toggle("dark-theme", isDark);

  themeLabel.textContent = isDark ? "Light mode" : "Dark mode";
  themeIcon.className = isDark ? "bi bi-sun-fill" : "bi bi-moon-stars-fill";

  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Switch to light theme" : "Switch to dark theme",
  );
}

themeToggle.addEventListener("click", function () {
  const isDark = !document.body.classList.contains("dark-theme");
  setTheme(isDark);
});

// ========================================
// Extra 2: Filter projects
// ========================================
const filterButtons = document.querySelectorAll(".filter-btn");
const projectItems = document.querySelectorAll(".project-item");
const filterStatus = document.getElementById("filterStatus");

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const selectedCategory = button.dataset.filter;

    filterButtons.forEach(function (item) {
      const isActive = item === button;

      item.classList.toggle("active", isActive);
      item.classList.toggle("btn-primary", isActive);
      item.classList.toggle("btn-outline-primary", !isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    let visibleCount = 0;

    projectItems.forEach(function (project) {
      const category = project.dataset.category;
      const shouldShow =
        selectedCategory === "all" || category === selectedCategory;

      project.hidden = !shouldShow;

      if (shouldShow) {
        visibleCount++;
      }
    });

    filterStatus.textContent = visibleCount + " project(s) displayed.";
  });
});

// ========================================
// Extra 3: Contact form validation
// ========================================
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const nameInput = document.getElementById("fullName");
  const emailInput = document.getElementById("email");
  const subjectInput = document.getElementById("subject");
  const messageInput = document.getElementById("message");

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const subject = subjectInput.value.trim();
  const message = messageInput.value.trim();

  // Remove whitespace-only values before validation.
  nameInput.setCustomValidity(
    name.length < 2 ? "Please enter at least 2 characters." : "",
  );

  subjectInput.setCustomValidity(
    subject.length === 0 ? "Please enter a subject." : "",
  );

  messageInput.setCustomValidity(
    message.length < 10 ? "Please enter at least 10 characters." : "",
  );

  const isValid = contactForm.checkValidity();

  contactForm.classList.add("was-validated");

  if (!isValid) {
    formStatus.textContent =
      "Please correct the highlighted fields and try again.";
    formStatus.className = "mt-3 text-danger";
    contactForm.reportValidity();
    return;
  }

  formStatus.textContent =
    "Validation successful! This demo does not send your message.";
  formStatus.className = "mt-3 text-success";

  // Reset the demo form after successful validation.
  contactForm.reset();
  contactForm.classList.remove("was-validated");

  nameInput.setCustomValidity("");
  subjectInput.setCustomValidity("");
  messageInput.setCustomValidity("");
});

// ========================================
// Extra 4: Back to top button
// ========================================
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", function () {
  if (window.scrollY > 350) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
});

backToTop.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
  });
});

// ========================================
// Dynamic footer year
// ========================================
document.getElementById("currentYear").textContent = new Date().getFullYear();
