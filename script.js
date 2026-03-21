document.addEventListener('DOMContentLoaded', () => {
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

    tombolBuka.addEventListener('click', () => {
        const nama = inputNama.value.trim();

        if (nama === "") {
            alertNama.classList.remove('hide');
            inputNama.focus();
            return;
        }

        alertNama.classList.add('hide');
        namaTujuan.innerText = nama; 

        // Munculkan layar transparan
        sectionUcapan.classList.remove('hide');
    });

    segel.addEventListener('click', () => {
        amplop.classList.add('buka-amplop');

        setTimeout(() => {
            amplop.classList.add('hide');
            kotakUcapan.classList.remove('hide');
            kotakUcapan.classList.add('muncul-teks');
            
            buatKonfeti(80);
        }, 1500);
    });

    function buatKonfeti(jumlah) {
        const warnaWarni = ['#FFD700', '#FFE066', '#ff4d4d', '#33cc33', '#33D1FF', '#FF33A8', '#ffffff'];
        konfetiContainer.innerHTML = ''; 

        for (let i = 0; i < jumlah; i++) {
            const kertas = document.createElement('div');
            kertas.classList.add('potongan-kertas');
            kertas.style.backgroundColor = warnaWarni[Math.floor(Math.random() * warnaWarni.length)];
            kertas.style.left = Math.random() * 100 + 'vw';
            kertas.style.animationDelay = Math.random() * 2 + 's';
            kertas.style.animationDuration = Math.random() * 2 + 2.5 + 's'; 
            
            const lebar = Math.random() * 8 + 6 + 'px';
            const tinggi = Math.random() * 15 + 10 + 'px';
            kertas.style.width = lebar;
            kertas.style.height = tinggi;
            
            konfetiContainer.appendChild(kertas);
        }
    }
});
