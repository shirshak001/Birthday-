// ============================================
// ROMANTIC ACTIVITIES & POPUPS
// ============================================

const loveQuotes = [
    "You are my sunshine on the cloudiest days ☀️",
    "My love for you grows stronger every single day 💕",
    "You make my heart skip a beat every time I see you 💓",
    "Being with you feels like coming home 🏡",
    "You are the reason I believe in love 💖",
    "Every moment with you is a treasure I cherish 💎",
    "You are my today and all of my tomorrows 🌅",
    "In your eyes, I found my paradise 🌟",
    "You are the best thing that ever happened to me 🎁",
    "My love for you knows no bounds 🌊",
    "You complete me in every way possible 🧩",
    "Forever grateful for your love and presence 🙏",
    "You are my dream come true 💫",
    "With you, I am home 💝",
    "You are the love of my life 💗"
];

const reasonsILoveYou = [
    { icon: "😊", text: "Your beautiful smile that lights up my world" },
    { icon: "💫", text: "The way you make every moment special" },
    { icon: "🌟", text: "Your kindness and caring heart" },
    { icon: "💝", text: "How you always know how to make me laugh" },
    { icon: "🎵", text: "The sound of your laughter - it's my favorite melody" },
    { icon: "✨", text: "Your strength and determination inspire me" },
    { icon: "💕", text: "The way you understand me like no one else" },
    { icon: "🌹", text: "Your unique and beautiful personality" },
    { icon: "💖", text: "How you support my dreams and ambitions" },
    { icon: "🌈", text: "The happiness you bring into my life every day" },
    { icon: "💗", text: "Your gentle touch and warm embrace" },
    { icon: "⭐", text: "The way you believe in us and our future" }
];

const sweetMessages = [
    "Thinking of you right now... like always 💭",
    "You mean the world to me 🌍",
    "Lucky to have you in my life 🍀",
    "You're simply amazing! ✨",
    "Missing you already 💕",
    "Can't stop smiling because of you 😊",
    "You're my favorite person 💖"
];

// Show random love quote popup
function showLoveQuotePopup() {
    const quote = loveQuotes[Math.floor(Math.random() * loveQuotes.length)];
    const popup = document.createElement('div');
    popup.className = 'love-quote-popup';
    popup.innerHTML = `
        <div class="quote-content">
            <div class="quote-heart">💖</div>
            <p>${quote}</p>
            <button class="close-quote" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    document.body.appendChild(popup);
    
    setTimeout(() => popup.classList.add('show'), 100);
    
    // Auto close after 8 seconds
    setTimeout(() => {
        popup.classList.remove('show');
        setTimeout(() => popup.remove(), 500);
    }, 8000);
}

// Heart explosion effect
function createHeartExplosion(x, y) {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#fa709a', '#fee140', '#F8B500', '#A29BFE', '#FF7675', '#FD79A8'];
    const hearts = ['💕', '💖', '💗', '💓', '💝', '❤️', '💛', '💜'];
    
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-particle';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        heart.style.color = colors[Math.floor(Math.random() * colors.length)];
        
        const angle = (Math.PI * 2 * i) / 15;
        const velocity = 100 + Math.random() * 50;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        heart.style.setProperty('--tx', tx + 'px');
        heart.style.setProperty('--ty', ty + 'px');
        
        document.body.appendChild(heart);
        
        setTimeout(() => heart.remove(), 2000);
    }
}

// Floating love notes
function createFloatingNote() {
    const note = sweetMessages[Math.floor(Math.random() * sweetMessages.length)];
    const floatingNote = document.createElement('div');
    floatingNote.className = 'floating-note';
    floatingNote.textContent = note;
    floatingNote.style.left = Math.random() * 80 + 10 + '%';
    
    document.body.appendChild(floatingNote);
    
    setTimeout(() => floatingNote.remove(), 6000);
}

// Show reasons I love you modal
function showReasonsModal() {
    const modal = document.createElement('div');
    modal.className = 'reasons-modal';
    
    let reasonsHTML = reasonsILoveYou.map((reason, index) => `
        <div class="reason-item" style="animation-delay: ${index * 0.1}s">
            <span class="reason-icon">${reason.icon}</span>
            <p class="reason-text">${reason.text}</p>
        </div>
    `).join('');
    
    modal.innerHTML = `
        <div class="reasons-content">
            <button class="close-modal" onclick="this.parentElement.parentElement.remove()">×</button>
            <h2 class="reasons-title">Reasons Why I Love You</h2>
            <div class="reasons-grid">
                ${reasonsHTML}
            </div>
            <div class="modal-footer">
                <p>...and a million more reasons every day 💕</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 100);
}

// Initialize romantic features
function initRomanticFeatures() {
    // Show love quote every 20 seconds
    setInterval(() => {
        if (Math.random() > 0.3) {
            showLoveQuotePopup();
        }
    }, 20000);
    
    // Show first quote after 3 seconds
    setTimeout(() => showLoveQuotePopup(), 3000);
    
    // Floating notes every 15 seconds
    setInterval(() => {
        if (Math.random() > 0.5) {
            createFloatingNote();
        }
    }, 15000);
    
    // Heart explosion on double click anywhere
    document.addEventListener('dblclick', (e) => {
        createHeartExplosion(e.clientX, e.clientY);
        
        // Play a sweet sound if available
        const sounds = ['Aww! 💕', 'Love you! 💖', 'You\'re the best! ✨'];
        console.log(sounds[Math.floor(Math.random() * sounds.length)]);
    });
    
    // Add click effect to specific elements
    document.querySelectorAll('.wish-card, .love-note').forEach(element => {
        element.addEventListener('click', (e) => {
            const rect = element.getBoundingClientRect();
            createHeartExplosion(
                rect.left + rect.width / 2,
                rect.top + rect.height / 2
            );
        });
    });
    
    // Easter egg: Click birthday cake for special message
    const cakeSvg = document.querySelector('.cake-svg');
    if (cakeSvg) {
        cakeSvg.style.cursor = 'pointer';
        cakeSvg.addEventListener('click', () => {
            const specialModal = document.createElement('div');
            specialModal.className = 'reasons-modal show';
            specialModal.innerHTML = `
                <div class="reasons-content" style="max-width: 500px; text-align: center;">
                    <button class="close-modal" onclick="this.parentElement.parentElement.remove()">×</button>
                    <div style="font-size: 5rem; margin: 2rem 0;">🎂</div>
                    <h2 class="reasons-title">You Found The Secret!</h2>
                    <p style="font-size: 1.3rem; color: var(--text-light); margin: 2rem 0; line-height: 1.8;">
                        Just like you discovered this hidden message, 
                        you've also discovered the deepest parts of my heart. 
                        You make every day feel like a celebration! 🎉
                    </p>
                    <div style="font-size: 3rem; margin-top: 2rem;">💝</div>
                </div>
            `;
            document.body.appendChild(specialModal);
        });
    }
    
    // Add sparkle trail on mouse move
    let sparkleTimeout;
    document.addEventListener('mousemove', (e) => {
        clearTimeout(sparkleTimeout);
        sparkleTimeout = setTimeout(() => {
            if (Math.random() > 0.95) {
                createSparkle(e.clientX, e.clientY);
            }
        }, 100);
    });
}

// Create sparkle effect
function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.innerHTML = '✨';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1000);
}

// Export functions
window.showReasonsModal = showReasonsModal;
window.createHeartExplosion = createHeartExplosion;
