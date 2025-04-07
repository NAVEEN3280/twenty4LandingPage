const navItems = document.querySelectorAll(".nav-item");
const formOverlay = document.getElementById("formOverlay");
const formContainer = document.getElementById("formContainer");
const formTitle = document.getElementById("formTitle");
const form = document.getElementById("userForm");
const thankYouMessage = document.getElementById("thankYouMessage");
const formContentText = document.getElementById("formContentText");

// Jewelry image entrance animation
gsap.fromTo(
  ".image img",
  {
    x: 300,
    scale: 2.5,
    opacity: 0,
  },
  {
    x: 0,
    scale: 1,
    opacity: 1,
    duration: 3,
    ease: "power4.out",
  }
);

// Custom content for each nav item
const formContent = {
  Manufacturer:
    "Join us as a manufacturer and showcase your elegant creations to the world through our premium jewelry platform.",
  Retailer:
    "Become a retail partner and offer your customers timeless designs and brilliant craftsmanship.",
  "Channel Partner":
    "Collaborate as a channel partner and help us reach new markets while earning exciting rewards.",
};

navItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();

    const type = item.dataset.type;
    formTitle.textContent = `${type} Registration`;

    // Update and animate content text
    const contentText = formContent[type];
    formContentText.textContent = contentText;
    formContentText.style.display = "block";
    gsap.fromTo(
      formContentText,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );

    // Animate other nav items
    navItems.forEach((el) => {
      if (el !== item) {
        gsap.to(el, { x: -100, opacity: 0, duration: 0.5 });
      }
    });

    gsap.to(".image img", { scale: 1.15, duration: 1, ease: "power1.out" });

    formOverlay.style.display = "flex";
    gsap.to(formContainer, {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      ease: "back.out(1.7)",
      onComplete: () => {
        gsap.fromTo(
          "#formTitle",
          { x: -100, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
        );
      },
    });
  });
});

formOverlay.addEventListener("click", (e) => {
  if (e.target === formOverlay) {
    gsap.to(formContainer, {
      scale: 0.8,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        formOverlay.style.display = "none";
      },
    });

    gsap.to(formContentText, {
      opacity: 0,
      y: 20,
      duration: 0.4,
      onComplete: () => {
        formContentText.style.display = "none";
      },
    });

    navItems.forEach((el) => {
      gsap.to(el, { x: 0, opacity: 1, duration: 0.5, delay: 0.2 });
    });

    gsap.to(".image img", { scale: 1, duration: 0.4, ease: "power1.out" });
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const userNameInput = document.getElementById("userName").value;
  const userNameDisplay = document.getElementById("userNameDisplay");
  userNameDisplay.textContent = userNameInput;

  gsap.to(formContainer, {
    scale: 0.8,
    opacity: 0,
    duration: 0.4,
    onComplete: () => {
      formContainer.style.display = "none";

      gsap.to(formContentText, {
        opacity: 0,
        y: 20,
        duration: 0.4,
        onComplete: () => {
          formContentText.style.display = "none";
        },
      });

      thankYouMessage.style.display = "block";
      gsap.fromTo(
        thankYouMessage,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }
      );

      setTimeout(() => {
        gsap.to(formOverlay, {
          opacity: 0,
          duration: 0.4,
          onComplete: () => {
            formOverlay.style.display = "none";
            formOverlay.style.opacity = "1";
            thankYouMessage.style.display = "none";
            formContainer.style.display = "block";
            form.reset();

            navItems.forEach((el) => {
              gsap.to(el, { x: 0, opacity: 1, duration: 0.5, delay: 0.2 });
            });

            gsap.to(".image img", { scale: 1, duration: 0.4 });
          },
        });
      }, 5000);
    },
  });
});
