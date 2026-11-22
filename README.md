# Seduh Pelan

Website dan REST API untuk kafe Seduh Pelan. Dibuat untuk UTS Pemrograman Web 1.

- Nama: Jelita Rhuslieta
- NPM: 24552011371
- Kelas: TIF RP 24B CID
- Dosen: Nova Agustina, S.T., M.Kom.

## Project 1 (Website)

Buka `index.html` dengan Live Server. Framework CSS: Bootstrap 5.

Halaman: Utama (kumpulan informasi perusahaan), Detail Informasi, Login, Registrasi, dan Menu Utama (setelah login).
Akun uji: `admin@seduhpelan.id` / `admin123`.

### Screenshot

### Halaman Utama
![Halaman Utama](screenshots/home.png)
![Halaman Utama](screenshots/home-1.png)
![Halaman Utama](screenshots/home-2.png)
![Halaman Utama](screenshots/home-3.png)
![Halaman Utama](screenshots/home-4.png)
![Halaman Utama](screenshots/home-5.png)

### Detail Informasi
![Detail Informasi](screenshots/detail.png)
![Detail Informasi](screenshots/detail-1.png)
![Detail Informasi](screenshots/detail-2.png)
![Detail Informasi](screenshots/detail-3.png)
![Detail Informasi](screenshots/detail-4.png)

### Login
![Login](screenshots/login.png)

### Registrasi
![Registrasi](screenshots/register.png)

### Menu Utama
![Menu Utama](screenshots/menu.png)
![Menu Utama](screenshots/menu-1.png)

## Project 2 (CRUD API)

```
cd api
npm install
npm start
```

Data dummy sama dengan `js/data.js` (Project 1). Data disimpan di memori, jadi kembali ke awal saat server dimatikan.

| Resource | Endpoint |
|---|---|
| Informasi perusahaan | GET/POST `/api/informasi`, GET/PUT/DELETE `/api/informasi/:id` |
| Menu kafe | GET/POST `/api/menu`, GET/PUT/DELETE `/api/menu/:id` |
| User (login dan registrasi) | GET/POST `/api/users`, GET/PUT/DELETE `/api/users/:id` |

Contoh body `POST /api/users`:

```json
{ "nama": "admin", "email": "admin@seduhpelan.id", "password": "admin123" }
```

### Hasil uji Postman

![GET](screenshots/api-get.png)
![POST](screenshots/api-post.png)
![PUT](screenshots/api-put.png)
![DELETE](screenshots/api-delete.png)
