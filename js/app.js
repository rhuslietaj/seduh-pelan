function go(p) { location.href = p }
function detailUrl(id) { return 'detail.html?id=' + id }
function getId() { return Number(new URLSearchParams(location.search).get('id')) }
function dec(el) { if (window.decorate) decorate(el) }
const rp = n => 'Rp ' + n.toLocaleString('id-ID');
const ICON = ['loaf', 'catsun', 'cupY', 'catmug'];
function renderList() {
    const el = document.getElementById('list');
    el.innerHTML = informasi.map(i => `<a class="info k${i.id % 4}" href="${detailUrl(i.id)}"><span class="tagc">0${i.id}</span><h3>${i.judul}</h3><p>${i.ringkas}</p><span class="go" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M7 17L17 7M9 7h8v8" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span class="d ic" data-d="${ICON[i.id % 4]}"></span></a>`).join('');
    dec(el);
}
function renderDetail() {
    const i = informasi.find(x => x.id === getId());
    document.getElementById('detail').innerHTML = i ? `<span class="tagc">Detail informasi</span><h1>${i.judul}</h1><p style="white-space: pre-line;">${i.detail}</p>` : `<h1>Tidak ditemukan</h1><p>Pilih salah satu informasi dari halaman utama.</p>`;
}
const TABS = [['Semua', 'catsun'], ['Kopi', 'latte'], ['Non-kopi', 'matcha'], ['Pastry', 'croissant'], ['Pancake', 'pancake']];
function renderTabs() {
    const el = document.getElementById('tabs');
    el.innerHTML = TABS.map(t => `<button class="tab" onclick="renderProducts('${t[0]}')" data-k="${t[0]}"><span class="fl"><span class="d f" data-d="flower"></span><span class="d ico" data-d="${t[1]}"></span></span><em>${t[0]}</em></button>`).join('');
    dec(el); renderProducts('Semua');
}
function renderProducts(k) {
    document.querySelectorAll('.tab').forEach(b => b.classList.toggle('on', b.dataset.k === k));
    const el = document.getElementById('products');
    el.innerHTML = menuKafe.filter(m => k === 'Semua' || m.kategori === k).map(m => `<article class="prod"><span class="tagc">${m.kategori}</span><div class="pic"><span class="d" data-d="${m.ikon}"></span></div><h3>${m.nama}</h3><div class="pr"><b>${rp(m.harga)}</b><a class="btn pill brown sm" href="login.html">Pesan</a></div></article>`).join('');
    dec(el);
}
function showAlert(msg, type) { document.getElementById('alert').innerHTML = `<div class="alert alert-${type}">${msg}</div>` }
function getUsers() { return JSON.parse(localStorage.getItem('sp_users') || JSON.stringify(usersDummy)) }
function doRegister(e) {
    e.preventDefault();
    const nama = document.getElementById('nama').value.trim(), email = document.getElementById('email').value.trim(), pass = document.getElementById('pass').value;
    const users = getUsers();
    if (nama === '' || email === '' || pass === '') { showAlert('Semua kolom wajib diisi.', 'danger') }
    else if (pass.length < 6) { showAlert('Password minimal 6 karakter.', 'danger') }
    else if (users.some(u => u.email === email)) { showAlert('Email sudah terdaftar. Gunakan email lain.', 'danger') }
    else { users.push({ id: users.reduce((m, u) => Math.max(m, u.id || 0), 0) + 1, nama, email, password: pass }); localStorage.setItem('sp_users', JSON.stringify(users)); showAlert('Registrasi berhasil. Mengalihkan ke halaman login...', 'success'); setTimeout(() => go('login.html'), 1200) }
    return false;
}
function doLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value.trim(), pass = document.getElementById('pass').value;
    const user = getUsers().find(u => u.email === email);
    if (email === '' || pass === '') { showAlert('Email dan password wajib diisi.', 'danger') }
    else if (!user) { showAlert('Email belum terdaftar.', 'danger') }
    else if (user.password !== pass) { showAlert('Password salah.', 'danger') }
    else { sessionStorage.setItem('login', JSON.stringify(user)); go('menu.html') }
    return false;
}
function guard() {
    const u = sessionStorage.getItem('login');
    if (!u) { go('login.html'); return }
    document.getElementById('hi').textContent = 'Halo, ' + JSON.parse(u).nama;
}
function logout() { sessionStorage.removeItem('login'); go('login.html') }
let qty = {};
function renderPesan() {
    const el = document.getElementById('pesan');
    el.innerHTML = menuKafe.map(m => `<div class="line"><div class="l-ic"><span class="d" data-d="${m.ikon}"></span></div><div class="l-t"><b>${m.nama}</b><small>${m.kategori} &middot; ${rp(m.harga)}</small></div><div class="step"><button onclick="step(${m.id},-1)" aria-label="Kurangi">-</button><span id="q${m.id}">0</span><button onclick="step(${m.id},1)" aria-label="Tambah">+</button></div></div>`).join('');
    dec(el);
}
function step(id, d) {
    qty[id] = Math.max(0, (qty[id] || 0) + d);
    document.getElementById('q' + id).textContent = qty[id];
    const t = menuKafe.reduce((s, m) => s + (qty[m.id] || 0) * m.harga, 0);
    document.getElementById('total').textContent = rp(t);
}
