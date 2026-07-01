let isPlaying = false;

function showSurprise() {
    const surprise = document.getElementById('surprise');
    surprise.classList.toggle('hidden');
    if (!surprise.classList.contains('hidden')) {
        createConfetti();
    }
}

function toggleMusic() {
    const audio = document.getElementById('backgroundMusic');
    const btn = document.getElementById('musicBtn');
    
    if (isPlaying) {
        audio.pause();
        btn.classList.remove('playing');
        btn.textContent = '🎵 Müzik Çal';
        isPlaying = false;
    } else {
        audio.muted = false;
        audio.play().catch(err => console.log('Müzik çalma hatası:', err));
        btn.classList.add('playing');
        btn.textContent = '⏸️ Müzik Durdur';
        isPlaying = true;
    }
}

function playMusic() {
    toggleMusic();
}

function playRomanticMelody(audioContext) {
    const notes = [
        { freq: 261.63, duration: 0.5 },
        { freq: 293.66, duration: 0.5 },
        { freq: 329.63, duration: 0.5 },
        { freq: 349.23, duration: 1 },
        { freq: 329.63, duration: 0.5 },
        { freq: 293.66, duration: 0.5 },
        { freq: 261.63, duration: 1 },
    ];

    let currentTime = audioContext.currentTime;
    notes.forEach(note => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.frequency.value = note.freq;
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.3, currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + note.duration);
        oscillator.start(currentTime);
        oscillator.stop(currentTime + note.duration);
        currentTime += note.duration;
    });
}

function createConfetti() {
    const confettiPieces = 50;
    const colors = ['#e91e63', '#c2185b', '#ff69b4', '#ff1493', '#ff69b4'];
    for (let i = 0; i < confettiPieces; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        document.body.appendChild(confetti);
        const duration = Math.random() * 3 + 2;
        const xMove = (Math.random() - 0.5) * 200;
        confetti.animate([
            { transform: 'translateY(0px) translateX(0px) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${window.innerHeight + 10}px) translateX(${xMove}px) rotate(360deg)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        setTimeout(() => { confetti.remove(); }, duration * 1000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const starsContainer = document.querySelector('.stars');
    for (let i = 0; i < 20; i++) {
        const star = document.createElement('div');
        star.style.position = 'absolute';
        star.style.width = '2px';
        star.style.height = '2px';
        star.style.backgroundColor = 'white';
        star.style.borderRadius = '50%';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animation = `twinkle ${Math.random() * 2 + 2}s infinite`;
        starsContainer.appendChild(star);
    }
    document.addEventListener('click', (e) => {
        if (e.target.tagName !== 'BUTTON') {
            createHeartRain(e.clientX, e.clientY);
        }
    });

    // Müzik otomatik olarak çalsın
    const audio = document.getElementById('backgroundMusic');
    const btn = document.getElementById('musicBtn');
    
    if (audio) {
        // Autoplay izni için user interaction'a bekle
        document.addEventListener('click', function enableAudio() {
            if (!isPlaying) {
                audio.muted = false;
                audio.play().then(() => {
                    btn.classList.add('playing');
                    btn.textContent = '⏸️ Müzik Durdur';
                    isPlaying = true;
                    document.removeEventListener('click', enableAudio);
                }).catch(err => {
                    console.log('Müzik çalma başarısız:', err);
                });
            }
        }, { once: true });

        // Sayfa yüklenince muted ile başla
        audio.muted = true;
        audio.play().catch(err => {
            console.log('Muted müzik başlatma hatası:', err);
        });
    }
});

function createHeartRain(x, y) {
    const hearts = ['❤️', '💕', '💖', '💗', '💝'];
    for (let i = 0; i < 5; i++) {
        const heart = document.createElement('div');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.position = 'fixed';
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        heart.style.fontSize = '20px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9999';
        document.body.appendChild(heart);
        const duration = Math.random() * 2 + 1;
        const xMove = (Math.random() - 0.5) * 100;
        const yMove = Math.random() * 200 + 100;
        heart.animate([
            { transform: 'translateY(0px) translateX(0px) scale(1)', opacity: 1 },
            { transform: `translateY(${yMove}px) translateX(${xMove}px) scale(0)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        setTimeout(() => { heart.remove(); }, duration * 1000);
    }
}
