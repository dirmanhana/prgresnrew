const fs = require('fs');
const path = require('path');

const categories = ['nasional', 'daerah', 'ekonomi', 'bola', 'sport', 'lifestyle', 'religi'];
const titles = [
    "Pemerintah Umumkan Kebijakan Baru Ekonomi Digital",
    "Timnas Indonesia Raih Kemenangan Dramatis di Kualifikasi Piala Dunia",
    "Harga Emas Antam Hari Ini Melonjak Tajam",
    "Gempa Berkekuatan 5.4 SR Guncang Wilayah Selatan",
    "Tips Menjaga Kesehatan Mental di Era Digital",
    "Festival Budaya Nusantara Kembali Digelar Meriah",
    "Manchester United Pertimbangkan Rekrut Striker Baru",
    "Startup Lokal Ini Berhasil Tembus Pasar Global",
    "Resep Masakan Tradisional yang Wajib Dicoba",
    "Review Gadget Terbaru: Spesifikasi Gahar Harga Terjangkau",
    "Kemenangan Besar Barcelona di Laga El Clasico",
    "Investasi Saham untuk Pemula: Apa yang Perlu Diketahui?",
    "Pembangunan Infrastruktur di Daerah Terpencil Dipercepat",
    "Tren Fashion Kekinian yang Sedang Hits di Kalangan Gen Z",
    "Kisah Inspiratif Pengusaha Muda Sukses dari Nol",
    "Jadwal Pertandingan Liga Inggris Pekan Ini",
    "Dampak Perubahan Iklim Terhadap Pertanian Nasional",
    "Wisata Alam Tersembunyi yang Wajib Dikunjungi",
    "Perkembangan Teknologi AI dan Dampaknya bagi Pekerjaan",
    "Cara Mengelola Keuangan Pribadi dengan Bijak"
];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateDate() {
    const start = new Date(2025, 0, 1);
    const end = new Date();
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString().split('T')[0];
}

// Generate 60 dummy posts
const targetCount = 60;
for (let i = 0; i < targetCount; i++) {
    // Use a random title from the list or generate a variation
    const baseTitle = titles[getRandomInt(0, titles.length - 1)];
    const title = `${baseTitle} - Update ${i + 1}`;

    const category = categories[getRandomInt(0, categories.length - 1)];
    const date = generateDate();
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const isPopular = Math.random() < 0.2; // 20% chance
    const tags = ["post", category];
    if (isPopular) tags.push("popular");

    const content = `---
title: "${title}"
date: ${date}
author: "Redaksi"
category: "${category.charAt(0).toUpperCase() + category.slice(1)}"
tags: ${JSON.stringify(tags)}
image: "https://picsum.photos/seed/${slug}/800/450"
description: "Ringkasan berita tentang ${title} yang sedang hangat diperbincangkan."
layout: layouts/post.njk
---

<p><strong>tvOnenews.com</strong> - ${title}. Berita ini membahas perkembangan terbaru mengenai topik tersebut.</p>

<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

<div class="baca-juga">
<span class="baca-juga-label">Baca Juga:</span>
<a href="#">Berita Terkait Lainnya yang Tidak Kalah Menarik</a>
</div>

<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
`;

    fs.writeFileSync(path.join(__dirname, 'src/posts', `${slug}.md`), content);
}
console.log(`Generated ${targetCount} dummy posts.`);
