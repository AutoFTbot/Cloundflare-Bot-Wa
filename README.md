# Cloundflare-Bot-Wa

Cloundflare-Bot-Wa adalah bot yang berinteraksi dengan API Cloudflare, memungkinkan Anda untuk mengelola DNS record dengan mudah melalui platform WhatsApp.

## Fitur

- Mendapatkan Zone ID dari domain.
- Membuat DNS record baru.
- Memeriksa keberadaan DNS record berdasarkan IP.
- Mengintegrasikan dengan WhatsApp untuk memudahkan pengelolaan DNS.

## Persyaratan

- Node.js v14 atau lebih baru
- Akun Cloudflare dengan API Key
- Akun WhatsApp yang terdaftar

## Instalasi

1. Clone repository ini:

   ```bash
   git clone https://github.com/AutoFTbot/Cloundflare-Bot-Wa.git
   cd Cloundflare-Bot-Wa
   ```

2. Instal dependensi:

   ```bash
   npm install
   ```

3. Konfigurasi informasi Cloudflare dan WhatsApp di `app.js`:

   ```javascript
   const apiKey = "API_KEY_ANDA"; // Ganti dengan API Key Cloudflare Anda
   const email = "EMAIL_ANDA"; // Ganti dengan email yang terdaftar di Cloudflare
   const domaincf = "example.com"; // Ganti dengan nama domain Anda
   ```

## Penggunaan

1. Jalankan bot:

   ```bash
   node app.js
   ```

2. Gunakan perintah di WhatsApp untuk mengelola DNS, misalnya:

   - `#ip 192.168.1.1` untuk menambahkan DNS record baru.

## API

### `CloudflareAPI(apiKey, email)`

- **apiKey**: String - API Key dari akun Cloudflare Anda.
- **email**: String - Email yang terdaftar di akun Cloudflare Anda.

### `getZoneId(domain)`

Mengambil Zone ID untuk domain yang diberikan.

- **domain**: String - Nama domain yang ingin Anda dapatkan Zone ID-nya.
- **Returns**: Promise<String> - Mengembalikan Zone ID.

### `createDnsRecord(zoneId, domain, ip, proxied)`

Membuat DNS record baru.

- **zoneId**: String - Zone ID dari domain.
- **domain**: String - Nama domain atau subdomain.
- **ip**: String - Alamat IP yang akan dihubungkan dengan domain.
- **proxied**: Boolean - Apakah DNS record akan diproksikan melalui Cloudflare.
- **Returns**: Promise<String> - Mengembalikan ID dari DNS record yang baru dibuat.

### `checkExistingDnsRecord(zoneId, ip)`

Memeriksa apakah ada DNS record yang sudah ada untuk IP tertentu.

- **zoneId**: String - Zone ID dari domain.
- **ip**: String - Alamat IP yang ingin diperiksa.
- **Returns**: Promise<String|null> - Mengembalikan ID dari DNS record jika ada, atau `null` jika tidak ada.

## Kontribusi

Kami menyambut kontribusi dari siapa pun. Jika Anda ingin berkontribusi, silakan buat pull request atau buka issue di repository ini.

## Lisensi

Proyek ini dilisensikan di bawah lisensi MIT. Lihat file [LICENSE](LICENSE) untuk informasi lebih lanjut.

## Kontak

Untuk pertanyaan lebih lanjut, Anda dapat menghubungi saya di [aginazharmhlutpi14@gmail.com](mailto:aginazharmhlutpi14@gmail.com).
