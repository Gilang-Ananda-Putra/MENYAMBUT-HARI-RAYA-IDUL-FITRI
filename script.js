document.addEventListener('DOMContentLoaded', () => {
    // --- 1. DOM Elements ---
    const loader = document.getElementById('loader');
    const nameModal = document.getElementById('name-modal');
    const startBtn = document.getElementById('start-btn');
    const userNameInput = document.getElementById('user-name-input');
    const greetingTo = document.getElementById('greeting-to');
    const mainContent = document.getElementById('main-content');
    const audioBtn = document.getElementById('audio-btn');
    const bgMusic = document.getElementById('bg-music');
    const surpriseBtn = document.getElementById('surprise-btn');
    const heroSection = document.getElementById('hero');
    const surpriseSection = document.getElementById('surprise-section');
    const randomQuote = document.getElementById('random-quote');

    // --- 2. Data & Quotes ---
    const quotes = [
        "Semoga Allah menerima amal ibadah kita dan menjadikan kita kembali dalam keadaan suci. Selamat Idul Fitri!",
        "Taqabbalallahu minna wa minkum. Mohon maaf atas segala khilaf dan salah.",
        "Dalam kerendahan hati ada ketinggian budi. Dalam kemiskinan harta ada kekayaan jiwa. Selamat Lebaran!",
        "Meski wajah tak mampu berjumpa, tangan tak bisa saling menjabat, semoga coretan ini mampu menjadi jembatan silaturahmi."
    ];

    // --- 3. Generate Stars Background ---
    const starsContainer = document.getElementById('stars-container');
    for (let i = 0; i < 100; i++) {
        let star = document.createElement('div');
        star.classList.add('star');
        star.style.width = `${Math.random() * 3}px`;
        star.style.height = star.style.width;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.animationDuration = `${Math.random() * 3 + 1}s`;
        starsContainer.appendChild(star);
    }

    // --- 4. Loading Screen Logic ---
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            // Show modal after loader
        }, 1000);
    }, 2000); // 2 seconds loading

    // --- 5. Start Button & Personalization ---
    startBtn.addEventListener('click', () => {
        const name = userNameInput.value.trim() || "Sahabat";
        greetingTo.innerText = `Untuk: ${name}`;
        
        nameModal.classList.remove('active');
        mainContent.classList.remove('hidden');

        // Play audio on first interaction (Browser policy requirement)
        playAudio();

        // GSAP Entrance Animations
        gsap.from(".fade-in", { duration: 1.5, opacity: 0, y: 20, stagger: 0.3, ease: "power2.out" });
        gsap.from(".slide-up", { duration: 1.5, opacity: 0, y: 50, ease: "back.out(1.7)", delay: 0.5 });
        gsap.from(".lantern", { duration: 1, opacity: 0, y: -50, stagger: 0.2, ease: "bounce.out", delay: 1 });
    });

    // --- 6. Audio Control ---
    let isPlaying = false;
    
    function playAudio() {
        bgMusic.play().then(() => {
            isPlaying = true;
            audioBtn.innerText = "🔊 Musik Menyala";
        }).catch(err => console.log("Audio autoplay blocked by browser"));
    }

    audioBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent triggering background click
        if (isPlaying) {
            bgMusic.pause();
            audioBtn.innerText = "🔈 Putar Musik";
        } else {
            bgMusic.play();
            audioBtn.innerText = "🔊 Musik Menyala";
        }
        isPlaying = !isPlaying;
    });

    // --- 7. Interactive Screen Click (Fireworks) ---
    document.body.addEventListener('click', (e) => {
        // Don't fire if clicking inputs or buttons
        if(e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') return;
        
        confetti({
            particleCount: 50,
            spread: 60,
            origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
            colors: ['#FFD700', '#ffffff', '#2c5364']
        });
    });

    // --- 8. Surprise Feature ---
    surpriseBtn.addEventListener('click', (e) => {
        e.stopPropagation();

        // Generate Random Quote
        randomQuote.innerText = quotes[Math.floor(Math.random() * quotes.length)];

        // Confetti Blast
        var duration = 3 * 1000;
        var end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#FFD700', '#ffffff']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#FFD700', '#ffffff']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());

        // GSAP Transition
        gsap.to(heroSection, { duration: 0.5, opacity: 0, scale: 0.8, onComplete: () => {
            heroSection.classList.add('hidden');
            surpriseSection.classList.remove('hidden');
            
            // Animate Card Opening
            gsap.fromTo(surpriseSection, 
                { opacity: 0, scale: 0.5, rotationX: 90 }, 
                { duration: 1.5, opacity: 1, scale: 1, rotationX: 0, ease: "elastic.out(1, 0.5)" }
            );
        }});
    });

    // --- 9. Parallax Effect on Mouse Move (Desktop) ---
    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth - e.pageX * 2) / 90;
        const y = (window.innerHeight - e.pageY * 2) / 90;
        
        gsap.to(".moon", { x: x, y: y, duration: 1, ease: "power1.out" });
        gsap.to(".stars", { x: x * 0.5, y: y * 0.5, duration: 1, ease: "power1.out" });
    });
});