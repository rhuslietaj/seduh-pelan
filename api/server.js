const express = require('express');
const app = express();
app.use(express.json());

// Data dummy: sama persis dengan js/data.js di Project 1
const db = {
  informasi: {
    next: 5,
    rows: [
      {
        id: 1,
        judul: "Profil Kafe",
        ringkas: "Cerita di balik Seduh Pelan.",
        detail: "Seduh Pelan berdiri pada tahun 2024 di Bandung.\n\nKami menyajikan kopi dan pancake yang dibuat dengan sabar, karena rasa terbaik tidak lahir dari proses yang terburu-buru."
      },
      {
        id: 2,
        judul: "Filosofi Kami",
        ringkas: "Alasan di balik setiap cangkir dan piring.",
        detail: "Menjadi ruang jeda yang nyaman di tengah riuhnya kota.\nBagi kami, rasa yang jujur butuh waktu:\n• Menggunakan biji kopi lokal pilihan\n• Memasak setiap pesanan secara segar\n• Melayani setiap tamu dengan ramah"
      },
      {
        id: 3,
        judul: "Jam Operasional",
        ringkas: "Waktu terbaik untuk berkunjung.",
        detail: "Senin – Jumat : 08.00 – 21.00\nSabtu – Minggu : 09.00 – 23.00\n\n*Tetap buka pada hari libur nasional."
      },
      {
        id: 4,
        judul: "Lokasi dan Kontak",
        ringkas: "Temukan dan hubungi kami.",
        detail: "Alamat : Jl. Dipatiukur No. 12, Bandung\nTelepon : 022-1234567\nEmail : halo@seduhpelan.id"
      }
    ],
    required: ['judul', 'detail']
  },
  menu: {
    next: 8,
    rows: [
      { id: 1, nama: "Kopi Susu Pelan", kategori: "Kopi", harga: 22000, ikon: "latte" },
      { id: 2, nama: "Americano", kategori: "Kopi", harga: 18000, ikon: "cupY" },
      { id: 3, nama: "Mocha Frappe", kategori: "Kopi", harga: 28000, ikon: "frappe" },
      { id: 4, nama: "Matcha Latte", kategori: "Non-kopi", harga: 24000, ikon: "matcha" },
      { id: 5, nama: "Croissant Mentega", kategori: "Pastry", harga: 26000, ikon: "croissant" },
      { id: 6, nama: "Fluffy Pancake Butter", kategori: "Pancake", harga: 32000, ikon: "pancake" },
      { id: 7, nama: "Pancake Cokelat Pisang", kategori: "Pancake", harga: 36000, ikon: "pancake2" }
    ],
    required: ['nama', 'kategori', 'harga']
  },
  users: {
    next: 3,
    rows: [
      { id: 1, nama: "Admin", email: "admin@seduhpelan.id", password: "admin123" },
      { id: 2, nama: "Jelita Rhuslieta", email: "rhuslietaj@gmail.com", password: "jj123" }
    ],
    required: ['nama', 'email', 'password']
  }
};

// CRUD untuk tiap resource: /api/informasi, /api/menu, dan /api/users
Object.keys(db).forEach(name => {
  const t = db[name];
  const base = '/api/' + name;
  const find = id => t.rows.find(x => x.id === Number(id));

  app.get(base, (req, res) => res.json(t.rows));                       // Read all
  app.get(base + '/:id', (req, res) => {                               // Read one
    const row = find(req.params.id);
    row ? res.json(row) : res.status(404).json({ message: 'Data tidak ditemukan' });
  });
  app.post(base, (req, res) => {                                       // Create
    const missing = t.required.filter(k => req.body[k] === undefined || req.body[k] === '');
    if (missing.length) return res.status(400).json({ message: 'Wajib diisi: ' + missing.join(', ') });
    const row = { id: t.next++, ...req.body };
    t.rows.push(row);
    res.status(201).json(row);
  });
  app.put(base + '/:id', (req, res) => {                               // Update
    const row = find(req.params.id);
    if (!row) return res.status(404).json({ message: 'Data tidak ditemukan' });
    Object.assign(row, req.body, { id: row.id });
    res.json(row);
  });
  app.delete(base + '/:id', (req, res) => {                            // Delete
    const i = t.rows.findIndex(x => x.id === Number(req.params.id));
    if (i < 0) return res.status(404).json({ message: 'Data tidak ditemukan' });
    t.rows.splice(i, 1);
    res.json({ message: 'Data dihapus' });
  });
});

app.listen(3000, () => console.log('API jalan di http://localhost:3000 (/api/informasi, /api/menu, /api/users)'));
