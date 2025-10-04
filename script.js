// Menu toggle mobile
const menuToggle = document.getElementById('menuToggle');
const navList = document.getElementById('navList');
menuToggle.addEventListener('click', () => {
    navList.classList.toggle('open');
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const href = a.getAttribute('href');
        if (href.length === 1) return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        const offset = document.querySelector('header').offsetHeight + 8;
        const topPos = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({
            top: topPos,
            behavior: 'smooth'
        });
        if (navList.classList.contains('open')) navList.classList.remove('open');
    });
});

// Intersection observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(ent => {
        if (ent.isIntersecting) {
            ent.target.classList.add('in-view');
        }
    });
}, { threshold: 0.15 });

// Observe all elements that need animation
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.tl-item, .feature, .service, .work, .review-card, .web-dev-card').forEach(el => {
        observer.observe(el);
    });
});

// Tab functionality
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Show corresponding content
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Image Modal functionality
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const closeBtn = document.getElementsByClassName('close')[0];

// Make all portfolio images clickable
document.querySelectorAll('.work, .game-image').forEach(item => {
    item.addEventListener('click', event => {
        const imageUrl = item.getAttribute('data-image') || item.querySelector('img').src;
        modal.style.display = 'block';
        modalImg.src = imageUrl;
    });
});

// Close modal when clicking X
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal when clicking outside the image
window.addEventListener('click', event => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Reviews storage & rendering
let reviews = JSON.parse(localStorage.getItem('truwty_reviews') || 'null') || [
    { name:'Anonymous Client', rating:5, text:'Truwty delivered exceptional work on our MILSIM game! Clean & efficient.' },
    { name:'Group Leader', rating:4.5, text:'The Discord bot is a game-changer — delivered early & clean.' },
    { name:'Developer', rating:5, text:'Attention to detail is insane. Join logging systems top quality.' }
];

const reviewsContainer = document.getElementById('reviewsContainer');

function starStr(n) {
    const full = Math.floor(n);
    const half = (n - full) >= 0.5 ? '½' : '';
    return '★'.repeat(full) + half;
}

function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
}

function renderReviews() {
    reviewsContainer.innerHTML = '';
    reviews.slice().reverse().forEach(r => {
        const div = document.createElement('div');
        div.className = 'review-card';
        div.innerHTML = `
            <div class="review-meta">
                <div class="review-avatar">${(r.name? r.name[0].toUpperCase() : 'T')}</div>
                <div>
                    <div style="font-weight:600;">${escapeHtml(r.name || 'Anonymous')}</div>
                    <div style="color: var(--muted); font-size:0.9rem;">${starStr(r.rating)}</div>
                </div>
            </div>
            <div class="review-text">${escapeHtml(r.text)}</div>
        `;
        reviewsContainer.appendChild(div);
        observer.observe(div);
    });
}

renderReviews();

document.getElementById('reviewForm').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim() || 'Anonymous';
    const rating = parseFloat(document.getElementById('rating').value) || 5;
    const text = document.getElementById('reviewText').value.trim();
    if (!text) {
        alert('Please write a review.');
        return;
    }
    reviews.push({ name, rating, text });
    localStorage.setItem('truwty_reviews', JSON.stringify(reviews));
    renderReviews();
    e.target.reset();
    alert('Thanks! Your review has been submitted.');
});

// Working Contact Form
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('nameInput').value;
    const email = document.getElementById('emailInput').value;
    const project = document.getElementById('proj').value;
    const budget = document.getElementById('budg').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (!name || !email || !project || !budget || !message) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Here you would normally send the data to a server
    // For now, we'll just show a success message
    alert('Thank you for your message! I will get back to you as soon as possible.');
    
    // Reset form
    e.target.reset();
});

document.getElementById('yr').textContent = new Date().getFullYear();

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const backToTop = document.getElementById('backToTop');
    
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// Back to top button
document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size and position
        const size = Math.random() * 10 + 5;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 15;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animationDelay = `${delay}s`;
        
        particlesContainer.appendChild(particle);
    }
}

createParticles();
