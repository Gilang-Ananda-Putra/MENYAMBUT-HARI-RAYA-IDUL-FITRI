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
        namaPenerima.innerText = `[${namaUser}]`; // Set nama di ucapan

        // Animasi transisi
        sectionAwal.classList.remove('active');
        sectionAwal.classList.add('hide');
        sectionUcapan.classList.remove('hide');
        sectionUcapan.classList.add('active', 'show-amplop');
        amplopContainer.classList.remove('hide'); // Pastikan terlihat
    });

    // === Fungsi Buka Segel Amplop ke Ucapan ===
    segelLilin.addEventListener('click', () => {
        // Hapus segel
        segelLilin.parentNode.classList.add('open');

        // Tunggu animasi amplop terbuka, lalu tunjukkan ucapan dan konfeti
        setTimeout(() => {
            amplopContainer.classList.add('hide'); // Sembunyikan amplop
            sectionUcapan.classList.remove('show-amplop');
            sectionUcapan.classList.add('show-ucapan');
            kontenUcapanContainer.classList.remove('hide'); // Pastikan terlihat
            
            // Jalankan konfeti
            mulaKonfeti(40); // Jumlah konfeti
        }, 1500); // Sinkronisasi dengan durasi animasi amplop buka ke samping
    });

    // === Fungsi Konfeti (Semburan Kertas Warna-Warni) ===
    function mulaKonfeti(jumlah) {
        const colors = ['#FFD700', '#FFE066', '#ff4d4d', '#1a523c', '#FF5F5F', '#5F5FFF'];
        konfetiContainer.innerHTML = ''; // Reset wadah

        for (let i = 0; i < jumlah; i++) {
            const konfeti = document.createElement('div');
            konfeti.classList.add('konfeti');
            konfeti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            // Posisi acak di atas layar
            konfeti.style.left = Math.random() * 100 + 'vw';
            
            // Animasi jatuh acak
            konfeti.style.animationDelay = Math.random() * 1.5 + 's';
            konfeti.style.animationDuration = Math.random() * 1.5 + 2 + 's'; // Durasi berbeda
            
            // Ukuran acak
            const size = Math.random() * 5 + 6 + 'px';
            konfeti.style.width = size;
            konfeti.style.height = size;
            
            konfetiContainer.appendChild(konfeti);
        }
    }
});