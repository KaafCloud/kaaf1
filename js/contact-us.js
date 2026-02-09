document.addEventListener("DOMContentLoaded", function () {
  const scrollToTopButton = document.querySelector(".scroll-to-top");

  if (scrollToTopButton) {
    window.addEventListener("scroll", function () {
      const scrollPosition = window.scrollY;
      const windowHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = (scrollPosition / windowHeight) * 100;

      if (scrollPercentage >= 20) {
        scrollToTopButton.classList.add("visible");
      } else {
        scrollToTopButton.classList.remove("visible");
      }
    });

    scrollToTopButton.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
});

// form script

function toggleDropdown() {
  const dd = document.getElementById("serviceDropdown");
  dd.style.display = dd.style.display === "block" ? "none" : "block";
}

// Open submenu downward
document.querySelectorAll(".category").forEach((cat) => {
  cat.addEventListener("click", function (e) {
    if (e.target !== this) return;

    const submenu = this.querySelector(".submenu");

    // close others
    document.querySelectorAll(".submenu").forEach((sm) => {
      if (sm !== submenu) sm.style.display = "none";
    });

    submenu.style.display =
      submenu.style.display === "block" ? "none" : "block";
  });
});

function selectOption(el) {
  const value = el.innerText;
  document.getElementById("selectedText").innerText = value;
  document.getElementById("service").value = value;
  document.getElementById("serviceDropdown").style.display = "none";
}

// Wait for everything to load including EmailJS
window.addEventListener("load", function () {
  // Check if emailjs is available
  if (typeof emailjs === "undefined") {
    return;
  }

  // Initialize EmailJS
  emailjs.init("4YOmXcYwjz10MVCKQ");

  // Form submission
  const form = document.getElementById("contactForm");
  if (!form) {
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const company = document.getElementById("company").value.trim();
    const email = document.getElementById("email").value.trim();
    const service = document.getElementById("service").value.trim();
    const message = document.getElementById("message").value.trim();
    const agreeCheckbox = document.getElementById("agree");

    // Validate
    if (!firstName || !lastName || !company || !email) {
      alert("Please fill all required fields");
      return;
    }

    if (!service) {
      alert("Please select a service");
      return;
    }

    const btn = this.querySelector(".submit-btn");
    btn.disabled = true;
    btn.textContent = "Sending...";

    // Send using EmailJS
    emailjs
      .send("service_dubjmuj", "template_wrvaxas", {
        // to_email: "bilal8087799930@gmail.com",
        to_email: "info@kaafcloud.com",
        from_name: firstName + " " + lastName,
        from_email: email,
        reply_to: email,
        first_name: firstName,
        last_name: lastName,
        company: company,
        service: service,
        message: message || "No message provided",
      })
      .then(function (response) {
        // Show success message
        document.getElementById("successMsg").style.display = "block";

        // Reset form
        form.reset();
        document.getElementById("selectedText").innerText =
          "I'm interested in your solutions";
        document.getElementById("service").value = "";

        btn.disabled = false;
        btn.textContent = "Send and we'll be in touch soon";

        // Scroll to message
        document
          .getElementById("successMsg")
          .scrollIntoView({ behavior: "smooth" });

        // Hide message after 5 seconds
        setTimeout(function () {
          document.getElementById("successMsg").style.display = "none";
        }, 5000);
      })
      .catch(function (error) {
        alert("Error sending email. Please try again.");
        btn.disabled = false;
        btn.textContent = "Send and we'll be in touch soon";
      });
  });
});
