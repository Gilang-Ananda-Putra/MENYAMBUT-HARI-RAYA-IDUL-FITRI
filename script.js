document.addEventListener('DOMContentLoaded', () => {
    // Definisi Elemen
    const sectionAwal = document.getElementById('section-awal');
    const sectionUcapan = document.getElementById('section-ucapan');
    
    const inputNama = document.getElementById('nama-input');
    const alertNama = document.getElementById('alert-nama');
    const tombolBuka = document.getElementById('tombol-buka');
    const namaTujuan = document.getElementById('nama-tujuan');
    
    const amplop = document.getElementById('amplop');
    const segel = document.getElementById('segel');
    const kotakUcapan = document.getElementById('kotak-ucapan');
    const konfetiContainer = document.getElementById('konfeti-container');

    // --- LOGIKA KLIK TOMBOL AWAL ---
    tombolBuka.addEventListener('click', () => {
        const nama = inputNama.value.trim();

        if (nama === "") {
            alertNama.classList.remove('hide');
            inputNama.focus();
            return;
        }

        // Lanjut ke halaman ucapan
        alertNama.classList.add('hide');
        namaTujuan.innerText = nama; // Menulis nama yang diinput

        // BUKA OVERLAY UCAPAN (Section awal TIDAK DI HIDE agar terlihat transparan di belakangnya)
        sectionUcapan.classList.remove('hide');
    });

    // --- LOGIKA KLIK SEGEL LILIN ---
    segel.addEventListener('click', () => {
        // Trigger animasi buka amplop di CSS
        amplop.classList.add('buka-amplop');

        // Tunggu 1.5 detik sampai amplop terbuka, lalu hilangkan amplop & munculkan teks
        setTimeout(() => {
            amplop.classList.add('hide');
            kotakUcapan.classList.remove('hide');
            
            // Trigger class .muncul-teks untuk animasi teks & ketupat samping
            kotakUcapan.classList.add('muncul-teks');
            
            // Jalankan tembakan kertas
            buatKonfeti(70);
        }, 1500);
    });

    // --- FUNGSI SEMBURAN KERTAS (KONFETI) ---
    function buatKonfeti(jumlah) {
        const warnaWarni = ['#FFD700', '#FFE066', '#ff4d4d', '#33cc33', '#33D1FF', '#FF33A8', '#ffffff'];
        konfetiContainer.innerHTML = ''; 

        for (let i = 0; i < jumlah; i++) {
            const kertas = document.createElement('div');
            kertas.classList.add('potongan-kertas');
            
            // Warna acak
            kertas.style.backgroundColor = warnaWarni[Math.floor(Math.random() * warnaWarni.length)];
            
            // Lebar jatuh acak dari kiri ke kanan (0vw - 100vw)
            kertas.style.left = Math.random() * 100 + 'vw';
            
            // Delay dan durasi acak agar tidak jatuh bersamaan
            kertas.style.animationDelay = Math.random() * 2 + 's';
            kertas.style.animationDuration = Math.random() * 2 + 2.5 + 's'; 
            
            // Ukuran kertas (persegi / persegi panjang acak)
            const lebar = Math.random() * 8 + 6 + 'px';
            const tinggi = Math.random() * 15 + 10 + 'px';
            kertas.style.width = lebar;
            kertas.style.height = tinggi;
            
            konfetiContainer.appendChild(kertas);
        }
    }
});