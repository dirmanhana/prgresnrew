const fs = require('fs');
const path = require('path');

const categories = ["Nasional", "Daerah", "Ekonomi", "Bola", "Sport", "Lifestyle", "Religi", "Teknologi", "Otomotif", "Video"];
const authors = ["Tim Redaksi", "Admin Progres", "Jurnalis Muda", "Budi Santoso", "Siti Aminah"];

const titles = {
    "Nasional": ["Kebijakan Baru Pemerintah Berlaku Mulai Hari Ini", "Update Terkini Pembangunan Ibu Kota Nusantara", "DPR Sahkan RUU Perlindungan Konsumen Digital", "Kenaikan Harga Bahan Pokok Menjadi Sorotan", "Presiden Tinjau Proyek Strategis Nasional di Kalimantan"],
    "Daerah": ["Festival Budaya Jawa Barat Dimulai Besok", "Pemerintah Jatim Fokus Pada Pengembangan UMKM", "Sumatera Utara Siap Sambut Wisatawan Mancanegara", "Proyek Jalan Tol Trans-Sulawesi Capai 80%", "Bali Kembali Menjadi Destinasi Terpopuler Dunia"],
    "Ekonomi": ["Pasar Saham Hijau Menjelang Akhir Pekan", "Suku Bunga BI Tetap, Ekonom Berikan Analisis", "Pertumbuhan Ekonomi Indonesia Lampaui Target", "Nilai Tukar Rupiah Terhadap Dollar Menguat", "Sektor Manufaktur Terus Mengalami Ekspansi"],
    "Bola": ["Jelang Derby London, Pelatih Berikan Komentar", "Bursa Transfer: Striker Haus Gol Merapat ke Liga Italia", "Kemenangan Dramatis di Menit Terakhir Pertandingan", "Klub Besar Layangkan Penawaran Untuk Pemain Muda", "Analisis Taktik Formasi Terbaru Tim Papan Atas"],
    "Sport": ["Atlet Badminton Indonesia Raih Gelar di Internasional", "Persiapan MotoGP Mandalika Terus Dikebut", "Tim Basket Nasional Menang di Kejuaraan Asia", "Rekor Baru Tercipta di Cabang Renang", "Fokus Atlet Menjelang Olimpiade Musim Depan"],
    "Lifestyle": ["Tren Fashion Minimalis Kembali Digemari", "Tips Menjaga Kesehatan Mental di Lingkungan Kerja", "Resep Masakan Sehat Untuk Keluarga Bahagia", "Review Tempat Wisata Tersembunyi di Indonesia", "Cara Memilih Skincare Sesuai Jenis Kulit"],
    "Religi": ["Makna Toleransi Dalam Kehidupan Beragama", "Update Persiapan Ibadah Haji Tahun Ini", "Kisah Inspiratif Perjalanan Religi Tokoh Bangsa", "Tips Menjalankan Ibadah Puasa Bagi Pekerja", "Peran Agama Dalam Membangun Karakter Bangsa"],
    "Teknologi": ["Perkembangan AI Dalam Dunia Medis Sangat Pesat", "Smartphone Terbaru Dengan Kamera 200MP Muncul", "Analisis Keamanan Siber di Era Digital", "Startup Lokal Dapatkan Pendanaan Seri B", "Inovasi Energi Terbarukan Mulai Diterapkan"],
    "Otomotif": ["Review Mobil Listrik Terbaru Jarak Tempuh 500KM", "Tips Merawat Mesin Mobil Agar Tetap Prima", "Tren Modifikasi Motor Ala Cafe Racer", "Layanan Purna Jual Jadi Fokus Produsen Otomotif", "Spesifikasi Motor Sport Kelas Menengah"],
    "Video": ["Highlight Pertandingan Semalam", "Wawancara Eksklusif Bersama Tokoh Nasional", "Behind the Scene Pembuatan Film Terlaris", "Review Produk Gadget Dalam Video Durasi Singkat", "Liputan Khusus Wisata Kuliner Nusantara"]
};

const postsDir = path.join(__dirname, 'src/posts');

if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true });
}

for (let i = 1; i <= 40; i++) {
    const category = categories[i % categories.length];
    const categoryTitles = titles[category];
    const baseTitle = categoryTitles[i % categoryTitles.length];
    const title = `${baseTitle} - Berita ${i}`;

    // Create random date within the last 30 days
    const date = new Date();
    date.setDate(date.getDate() - (i % 30));
    const dateStr = date.toISOString();

    const author = authors[i % authors.length];
    const slug = title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s-]+/g, '-');
    const filename = `${slug}.md`;

    const content = `---
title: "${title}"
date: ${dateStr}
author: "${author}"
category: "${category}"
tags:
  - post
  - "${category.toLowerCase()}"
  - berita
  - update
image: https://picsum.photos/seed/${slug}/1200/675
description: "Informasi terbaru mengenai ${title}. Simak ulasan lengkapnya hanya di Progres News."
layout: layouts/post.njk
---

<p><strong>tvOnenews.com</strong> - ${title}. Berita terkini mengenai perkembangan topik ini di lapangan dilaporkan secara langsung oleh tim kami.</p>

<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

<div class="baca-juga">
<span class="baca-juga-label">Baca Juga:</span>
<a href="#" class="baca-juga-link">Analisis Mendalam Mengenai Dampak Sektor Terkait</a>
</div>

<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>

<p>Kami akan terus memperbarui informasi ini seiring dengan perkembangan data terbaru yang masuk ke meja redaksi kami. Pastikan Anda tetap terhubung melalui berbagai kanal media sosial Progres News.</p>
`;

    fs.writeFileSync(path.join(postsDir, filename), content);
}

console.log("Successfully generated 40 dummy articles.");
