const images = Array.from(document.querySelectorAll('.gallery-item img'));
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const caption = document.getElementById('caption');
const closeBtn = document.querySelector('.close');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;

// Open Lightbox
images.forEach((img, index) => {
    img.addEventListener('click', () => {
        currentIndex = index;
        updateLightbox();
        lightbox.style.display = 'flex';
    });
});

function updateLightbox() {
    const img = images[currentIndex];
    lightboxImg.src = img.src;
    caption.innerText = img.alt;
}

function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    updateLightbox();
}

function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateLightbox();
}

// Controls
nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });
prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });
closeBtn.addEventListener('click', () => lightbox.style.display = 'none');

// Keyboard Support
document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') {
        if (e.key === "ArrowRight") showNext();
        if (e.key === "ArrowLeft") showPrev();
        if (e.key === "Escape") lightbox.style.display = 'none';
    }
});

// Swipe Support for Mobile
let touchStartX = 0;
lightbox.addEventListener('touchstart', e => touchStartX = e.changedTouches[0].screenX);
lightbox.addEventListener('touchend', e => {
    let touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) showNext(); // Swipe Left
    if (touchEndX - touchStartX > 50) showPrev(); // Swipe Right
});

// Intersection Observer for the "Magical Reveal"
const revealOptions = {
    threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
        }
    });
}, revealOptions);

document.querySelectorAll('.gallery-item').forEach(item => {
    observer.observe(item);
});
