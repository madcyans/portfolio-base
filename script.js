// Certificates Carousel Script
const certificateList = [
  { title: "HTML Essential Training", issuer: "LinkedIn Learning", date: "-Feb 09, 2025", pdfLink: "/certificates/HTML-Essential-Training.jpg" },
  { title: "CSS Essential Training", issuer: "LinkedIn Learning", date: "-Feb 26, 2025", pdfLink: "/certificates/CSS-Essential-Training.jpg" },
  { title: "Responsive Web Design", issuer: "freeCodeCamp", date: "-Feb 02, 2025", pdfLink: "/certificates/Certificate-ResponsiveWebDesign.jpg" },
  { title: "Learning JavaScript Language", issuer: "LinkedIn Learning", date: "-Feb 04, 2025", pdfLink: "/certificates/Learning-the-JavaScript-Language.jpg" },
  { title: "JavaScript Algorithms & Data Structures", issuer: "freeCodeCamp", date: "-Mar 2025", pdfLink: "/certificates/Certificate-Javascript.jpg" },
  { title: "Front End Development Libraries", issuer: "freeCodeCamp", date: "-Apr 2025", pdfLink: "/certificates/Certificate-FrontEndDev.jpg" },
  { title: "Back End Development and APIs", issuer: "freeCodeCamp", date: "-May 20, 2025", pdfLink: "/certificates/Certificate-BackEndDev.jpg" },
  { title: "Introduction to PHP", issuer: "Simplilearn", date: "-June 07, 2025", pdfLink: "/certificates/PHP-Introduction.jpg" },
];

let currentIndex = 0;
let autoAdvanceTimer;

function createCard(cert) {
  const card = document.createElement("div");
  card.className = "certificate-card";
  card.innerHTML = `
    <div class="certificate-image">
      <a href="${cert.pdfLink.replace(".jpg",".pdf")}" target="_blank">
        <img src="${cert.pdfLink}" alt="${cert.title}" />
      </a>
    </div>
    <h3>${cert.title}</h3>
    <p>Issued by ${cert.issuer} ${cert.date}</p>
    <a href="${cert.pdfLink.replace(".jpg",".pdf")}" target="_blank" class="view-pdf">View PDF</a>
  `;
  return card;
}

function renderCarousel() {
  const track = document.querySelector(".carousel-track");
  track.innerHTML = "";

  certificateList.forEach(cert => {
    track.appendChild(createCard(cert));
  });

  renderThumbs();
  updateSlide(false);
}

function renderThumbs() {
  const thumbs = document.getElementById("carousel-thumbs");
  thumbs.innerHTML = "";

  certificateList.forEach((cert, i) => {
    const thumb = document.createElement("div");
    thumb.className = "carousel-thumb";
    if (i === currentIndex) thumb.classList.add("active");

    thumb.textContent = cert.title; // show title text only

    thumb.addEventListener("click", () => {
      currentIndex = i;
      updateSlide(true);
      startAutoAdvance(); // reset timer when clicking a thumbnail
    });

    thumbs.appendChild(thumb);
  });
}

function updateSlide(animate = true) {
  const track = document.querySelector(".carousel-track");
  const offset = -(currentIndex * 100);
  track.style.transition = animate ? "transform 0.6s ease-in-out" : "none";
  track.style.transform = `translateX(${offset}%)`;

  // update thumbs
  document.querySelectorAll(".carousel-thumb").forEach((thumb, i) => {
    thumb.classList.toggle("active", i === currentIndex);
  });
}

function slide(direction) {
  if (direction === "next") {
    currentIndex = (currentIndex + 1) % certificateList.length;
  } else {
    currentIndex = (currentIndex - 1 + certificateList.length) % certificateList.length;
  }
  updateSlide(true);
  startAutoAdvance(); // reset timer when using arrows
}

function startAutoAdvance() {
  clearInterval(autoAdvanceTimer);
  autoAdvanceTimer = setInterval(() => slide("next"), 6000);
}

document.getElementById("prev-btn").addEventListener("click", () => {
  slide("prev");
});
document.getElementById("next-btn").addEventListener("click", () => {
  slide("next");
});

// Initialize
renderCarousel();
startAutoAdvance();


// Header behavior on scroll
const header = document.getElementById("main-header");
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  // Show/hide header
  if (currentScrollY === 0 || currentScrollY < lastScrollY) {
    header.style.transform = "translateY(0)";
  } else {
    header.style.transform = "translateY(-100%)";
    mobileMenu.classList.add("hidden");
  }

  // Transparent only at very top
  if (currentScrollY === 0) {
    header.classList.add("transparent");
  } else {
    header.classList.remove("transparent");
  }

  lastScrollY = currentScrollY;
});

// Initial state on load
if (window.scrollY === 0) {
  header.classList.add("transparent");
}


// Toggle mobile menu
menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Smooth scroll for nav links
document.querySelectorAll("a[href^='#']").forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    mobileMenu.classList.add("hidden");
  });
});

// Inspirational Quotes Rotator
const quotes = [
  { text: "Even the greatest was once a beginner. Don’t be afraid to take that first step.", author: "Muhammad Ali" },
  { text: "Be willing to be a beginner every single morning.", author: "Meister Eckhart" },
  { text: "The first step towards getting somewhere is to decide you’re not going to stay where you are.", author: "J.P. Morgan" },
  { text: "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle.", author: "Steve Jobs" },
  { text: "You are never too old to start over. Every day is a chance to make changes to create the life we want.", author: "Karon Waddell" },
  { text: "Find a job you enjoy doing, and you will never have to work a day in your life.", author: "Chinonye J. Chidolue" },
  { text: "Success is the sum of small efforts, repeated day-in and day-out.", author: "Robert Collier" },
];

let unusedQuotes = [...quotes];
let currentQuote = null;

function getRandomQuote() {
  if (unusedQuotes.length === 0) {
    unusedQuotes = [...quotes];
  }
  const randomIndex = Math.floor(Math.random() * unusedQuotes.length);
  const selected = unusedQuotes.splice(randomIndex, 1)[0];
  return selected;
}

function showQuote() {
  const quote = getRandomQuote();
  currentQuote = quote;
  const textEl = document.getElementById("text");
  const authorEl = document.getElementById("author");

  // Fade out
  textEl.style.opacity = 0;
  authorEl.style.opacity = 0;

  setTimeout(() => {
    textEl.textContent = `“${quote.text}”`;
    authorEl.textContent = `- ${quote.author}`;

    // Fade in
    textEl.style.opacity = 1;
    authorEl.style.opacity = 1;
  }, 500);
}

// Initialize
showQuote();
setInterval(showQuote, 5000);

