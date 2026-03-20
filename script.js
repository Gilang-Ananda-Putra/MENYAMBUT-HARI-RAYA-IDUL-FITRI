document.addEventListener('DOMContentLoaded', () => {
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
    const starsContainer = document.getElementById('stars-container');

    // --- 1. Generate Static Stars ---
    for (let i = 0; i < 150; i++) {
        let star = document.createElement('div');
        star.classList.add('star');
        star.style.width = `${Math.random() * 2}px`;
        star.style.height = star.style.width;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.animationDuration = `${Math.random() * 3 + 1}s`;
        starsContainer.appendChild(star);
    }

    // --- 2. Animasi Bintang Jatuh (NEW) ---
    function triggerShootingStar() {
        const star = document.createElement('div');
        star.classList.add('shooting-star');
        star.style.left = `${Math.random() * 80 + 10}vw`;
        star.style.top = `${Math.random() * 50 + 10}vh`;
        starsContainer.appendChild(star);

        // Hapus elemen setelah animasi selesai
        setTimeout(() => star.remove(), 1500);
    }
    // Jalankan setiap 4 detik
    setInterval(triggerShootingStar, 4000);

    // --- 3. Loading & Start Logic ---
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 1000);
    }, 2500);

    startBtn.addEventListener('click', () => {
        const name = userNameInput.value.trim() || "Sahabat";
        greetingTo.innerText = `Untuk: ${name}`;
        nameModal.classList.remove('active');
        mainContent.classList.remove('hidden');

        bgMusic.play().catch(() => console.log("Audio blocked"));
        
        // GSAP Entrance
        gsap.from(".fade-in", { duration: 1.5, opacity: 0, y: 20, stagger: 0.3 });
        gsap.from(".slide-up", { duration: 1.5, opacity: 0, y: 50, ease: "back.out" });
    });

    // --- 4. Surprise Logic (Ketupat Jatuh) ---
    surpriseBtn.addEventListener('click', () => {
        surpriseSection.classList.remove('hidden');
        
        // Buat ketupat jatuh (Visual Code)
        for (let i = 0; i < 20; i++) {
            const ketupat = document.createElement('div');
            ketupat.classList.add('ketupat');
            ketupat.style.left = `${Math.random() * 100}vw`;
            ketupat.style.top = `-50px`;
            mainContent.appendChild(ketupat);

            gsap.to(ketupat, {
                duration: 2 + Math.random() * 2,
                top: "120vh",
                opacity: 1,
                rotation: Math.random() * 360,
                ease: "power1.inOut",
                delay: Math.random() * 1,
                onComplete: () => ketupat.remove()
            });
        }
    });
});