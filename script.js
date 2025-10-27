// Struktur Proyek: Folder Utama Foot Locker > images, index.html, style.css, script.js

document.addEventListener('DOMContentLoaded', function() {
    // 1. Toggling Navigasi Menu Mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    // Karena di CSS mobile, 'nav' di-display: none, kita bisa toggle class untuk menampilkannya
    // Catatan: Anda perlu menambahkan CSS tambahan untuk membuat navigasi mobile (misalnya, menjadi overlay/sidebar)

    menuToggle.addEventListener('click', function() {
        // Contoh sederhana: Mengubah display. Untuk implementasi sidebar, butuh CSS dan JS yang lebih kompleks.
        // Untuk saat ini, kita akan ubah menjadi display block jika kecil.
        if (window.innerWidth <= 768) {
             if (nav.style.display === 'flex') {
                nav.style.display = 'none';
            } else {
                // Di mobile, kita asumsikan menu akan tampil vertikal
                nav.style.display = 'flex';
                nav.style.flexDirection = 'column';
                nav.style.position = 'absolute';
                nav.style.top = '70px'; // Sesuaikan dengan tinggi header
                nav.style.left = '0';
                nav.style.width = '100%';
                nav.style.backgroundColor = '#111'; // Warna latar belakang menu
                nav.style.padding = '20px 0';
                nav.style.textAlign = 'center';
                nav.style.boxShadow = '0 5px 10px rgba(0,0,0,0.5)';
            }
        }
    });

    // 2. Event Listener untuk Tombol "Tambah ke Keranjang"
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Dapatkan nama produk dari elemen terdekat
            const productName = this.closest('.product-card').querySelector('h3').textContent;
            
            // Tampilkan notifikasi yang lebih menarik
            showNotification(`"${productName}" berhasil ditambahkan ke keranjang! 🎉`);

            // Logika keranjang yang sebenarnya (misalnya, AJAX call, update storage) akan ditambahkan di sini
            console.log(`${productName} ditambahkan ke keranjang.`);
        });
    });

    // 3. Fungsi untuk menampilkan notifikasi kustom
    function showNotification(message) {
        // Buat elemen notifikasi
        let notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: var(--secondary-color); /* Merah */
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            font-size: 1.1em;
            font-weight: bold;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.5s, transform 0.5s;
            transform: translateY(-50px);
        `;
        document.body.appendChild(notification);

        // Animasi masuk
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);

        // Animasi keluar dan hapus setelah 3 detik
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-50px)';
            // Hapus elemen setelah transisi selesai
            notification.addEventListener('transitionend', () => notification.remove());
        }, 3000);
    }

    // 4. Lazy Load Gambar (Opsional, untuk performa)
    // Ide: Muat gambar asli hanya ketika card masuk viewport.
    const productImages = document.querySelectorAll('.product-card img');
    
    // Fallback untuk browser yang tidak mendukung IntersectionObserver
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    // Ambil URL gambar dari data-placeholder atau atribut lain
                    const imageUrl = img.getAttribute('data-placeholder'); 
                    if (imageUrl) {
                        img.src = imageUrl; // Ganti src dengan gambar asli
                        img.removeAttribute('data-placeholder'); // Hapus atribut
                        observer.unobserve(img); // Berhenti mengamati
                    }
                }
            });
        }, {
            rootMargin: '0px 0px 100px 0px', // Memuat gambar 100px sebelum masuk viewport
        });

        productImages.forEach(img => {
            observer.observe(img);
        });
    }

});