// ========================================
// Es Campur Segar - Landing Page JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initHeader();
    initMobileMenu();
    initMenuTabs();
    initOrderForm();
    initSmoothScroll();
});

// ========================================
// Header Scroll Effect
// ========================================
function initHeader() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ========================================
// Mobile Menu Toggle
// ========================================
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu li a');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ========================================
// Menu Tabs Filter
// ========================================
function initMenuTabs() {
    const tabs = document.querySelectorAll('.menu-tab');
    const menuCards = document.querySelectorAll('.menu-card');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // Filter menu cards
            menuCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    card.classList.remove('hidden');
                    card.classList.add('show');
                } else {
                    card.classList.add('hidden');
                    card.classList.remove('show');
                }
            });
        });
    });
}

// ========================================
// Order Form Handler
// ========================================
function initOrderForm() {
    const orderForm = document.getElementById('orderForm');
    
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const menu = document.getElementById('menu-select').value;
            const quantity = document.getElementById('quantity').value;
            const address = document.getElementById('address').value;
            
            // Build WhatsApp message
            const message = `*PESANAN ES CAMPUR SEGAR*\n\n` +
                `📛 Nama: ${name}\n` +
                `📱 No. WhatsApp: ${phone}\n` +
                `🍧 Menu: ${menu}\n` +
                `📦 Jumlah: ${quantity}\n` +
                `📍 Alamat: ${address}\n\n` +
                `Terima kasih atas pesanan Anda!`;
            
            // Encode message for WhatsApp
            const encodedMessage = encodeURIComponent(message);
            
            // WhatsApp number (replace with actual number)
            const phoneNumber = '6281234567890';
            
            // Open WhatsApp
            window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
        });
    }
}

// ========================================
// Order via WhatsApp (from menu cards)
// ========================================
function orderViaWA(menuName) {
    const message = `*PESANAN ES CAMPUR SEGAR*\n\n` +
        `🍧 Menu: ${menuName}\n` +
        `📦 Jumlah: 1\n\n` +
        `Saya ingin memesan menu ini. Mohon informasikan langkah selanjutnya.`;
    
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = '6281234567890';
    
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
}

// ========================================
// Smooth Scroll
// ========================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// Navbar Active Link on Scroll
// ========================================
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu li a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = sectionId;
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ========================================
// Loading Animation
// ========================================
window.addEventListener('load', function() {
    const loader = document.querySelector('.loader');
    
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// ========================================
// Add to Cart Animation (Optional Enhancement)
// ========================================
function addToCartAnimation(button) {
    const originalText = button.innerHTML;
    
    button.innerHTML = '<i class="fas fa-check"></i> Ditambahkan!';
    button.style.background = '#27ae60';
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.background = '';
    }, 2000);
}

// ========================================
// Parallax Effect for Hero Shapes (Optional)
// ========================================
window.addEventListener('scroll', function() {
    const shapes = document.querySelectorAll('.hero-shape');
    const scrollPosition = window.pageYOffset;
    
    shapes.forEach((shape, index) => {
        const speed = 0.1 + (index * 0.05);
        shape.style.transform = `translateY(${scrollPosition * speed}px)`;
    });
});

// ========================================
// Number Counter Animation for Stats
// ========================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(function() {
        start += increment;
        
        if (start >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start).toLocaleString();
        }
    }, 16);
}

// Initialize counter animation when element is in viewport
const counterElements = document.querySelectorAll('.hero-stats .stat-number');

if (counterElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.textContent.replace(/,/g, ''));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counterElements.forEach(el => observer.observe(el));
}

