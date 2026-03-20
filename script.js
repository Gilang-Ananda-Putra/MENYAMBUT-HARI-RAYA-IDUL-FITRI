document.addEventListener('DOMContentLoaded', () => {
    // Ambil elemen
    const sectionAwal = document.getElementById('section-awal');
    const sectionUcapan = document.getElementById('section-ucapan');
    const namaInput = document.getElementById('nama-input');
    const inputAlert = document.querySelector('.input-alert');
    const tombolBuka = document.getElementById('tombol-buka');
    const amplopContainer = document.getElementById('amplop-container');
    const segelLilin = document.getElementById('segel-lilin');
    const kontenUcapanContainer = document.getElementById('konten-ucapan-container');
    const namaPenerima = document.getElementById('nama-penerima');
    const konfetiContainer = document.getElementById('konfeti-container');

    // === Fungsi Halaman Awal ke Amplop ===
    tombolBuka.addEventListener('click', () => {
        const namaUser = namaInput.value.trim();

        // Validasi nama
        if (namaUser === "") {
            inputAlert.classList.remove('hide');
            namaInput.focus();
            return;
        }
        
        // Simpan nama
        inputAlert.classList.add('hide');
        namaPenerima.innerText = namaUser; // Set nama di ucapan

        // Animasi transisi
        sectionAwal.classList.remove('active');
        sectionAwal.classList.add('hide');
        
        sectionUcapan.classList.remove('hide');
        sectionUcapan.classList.add('active', 'show-amplop');
        amplopContainer.classList.remove('hide');
    });

    // === Fungsi Buka Segel Amplop ke Ucapan ===
    segelLilin.addEventListener('click', () => {
        // Hapus segel dan mulai animasi buka
        segelLilin.parentNode.classList.add('open');

        // Tunggu animasi amplop terbuka, lalu tunjukkan ucapan
        setTimeout(() => {
            amplopContainer.classList.add('hide'); 
            sectionUcapan.classList.remove('show-amplop');
            sectionUcapan.classList.add('show-ucapan');
            kontenUcapanContainer.classList.remove('hide'); 
            
            // Jalankan konfeti
            mulaKonfeti(60); // Jumlah konfeti diperbanyak sedikit
        }, 1500); 
    });

    // === Fungsi Konfeti (Semburan Kertas Warna-Warni) ===
    function mulaKonfeti(jumlah) {
        const colors = ['#FFD700', '#FFE066', '#ff4d4d', '#33cc33', '#FF5F5F', '#5F5FFF', '#ffffff'];
        konfetiContainer.innerHTML = ''; 

        for (let i = 0; i < jumlah; i++) {
            const konfeti = document.createElement('div');
            konfeti.classList.add('konfeti');
            konfeti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            // Posisi X acak
            konfeti.style.left = Math.random() * 100 + 'vw';
            
            // Animasi jatuh (delay dan durasi acak)
            konfeti.style.animationDelay = Math.random() * 2 + 's';
            konfeti.style.animationDuration = Math.random() * 2 + 2.5 + 's'; 
            
            // Ukuran acak (persegi panjang untuk efek kertas)
            const width = Math.random() * 8 + 5 + 'px';
            const height = Math.random() * 15 + 10 + 'px';
            konfeti.style.width = width;
            konfeti.style.height = height;
            
            konfetiContainer.appendChild(konfeti);
        }
    }
});