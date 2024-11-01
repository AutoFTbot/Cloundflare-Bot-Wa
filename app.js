const {
    Client,
    Events
} = require("@mengkodingan/ckptw");
const {
    S_WHATSAPP_NET
} = require("@whiskeysockets/baileys");
const CloudflareAPI = require('cloundflare-ft');

// Masukkan informasi Cloudflare Anda di sini
const apiKey = "token api"; // Ganti dengan API Key Cloudflare Anda
const domaincf = "domain"; // Ganti dengan nama domain Anda
const iniemail = "email"; // Ganti dengan email yang terdaftar di Cloudflare

let config = {
    bot: {}
};

const usePairingCode = true;
let phoneNumber = "6212345678910"; // Ganti nomor anda

const cloudflare = new CloudflareAPI(apiKey, iniemail);

const bot = new Client({
    prefix: "#",
    phoneNumber: phoneNumber,
    usePairingCode: usePairingCode,
    printQRInTerminal: !usePairingCode,
    WAVersion: [2, 3000, 1015901307],
    selfReply: true
});

bot.ev.once(Events.ClientReady, async (m) => {
    config.bot.number = m.user.id.split(/[:@]/)[0];
    config.bot.id = config.bot.number + S_WHATSAPP_NET;   
    console.log(`[cloundflareFT-bot] Running:${m.user.id}`);
});

bot.command("ip", async (msg) => {
    const messageContent = msg._msg ? msg._msg.content : null;
    if (!messageContent) {
        await msg.reply(`Pesan tidak valid. Silakan coba lagi dengan format: ${bot.prefix}ip 192.168.1.1`);
        return;
    }

    const parts = messageContent.split(' ');
    if (parts.length < 2) {
        await msg.reply(`Silakan masukkan perintah dengan format yang benar, misalnya: ${bot.prefix}ip 192.168.1.1`);
        return;
    }

    const ip = parts[1];

    if (!isValidIP(ip)) {
        await msg.reply("IP tidak valid. Silakan coba lagi.");
        return;
    }

    const domain = `${Math.random().toString(36).substring(2, 7)}.${domaincf}`;
    try {
        const zoneId = await cloudflare.getZoneId(domaincf);
        const existingRecordId = await cloudflare.checkExistingDnsRecord(zoneId, ip);
        if (existingRecordId) {
            await msg.reply(`⚠️ IP sudah terdaftar dengan domain lain.`);
        } else {
            const recordId = await cloudflare.createDnsRecord(zoneId, domain, ip, false);
            if (recordId) {
                await msg.reply(`✅ Pendaftaran Berhasil\nIP VPS: ${ip}\nDomain: ${domain}\nProxied: false\n\nUntuk informasi lebih lanjut, kunjungi repo bot: https://github.com/AutoFTbot/Cloundflare-Bot-Wa`);
            } else {
                await msg.reply('⚠️ Gagal membuat DNS record.');
            }
        }
    } catch (error) {
        await msg.reply('⚠️ Kesalahan saat memproses permintaan Anda.');
    }
});

function isValidIP(ip) {
    const regex = /^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$/;
    return regex.test(ip);
}

bot.launch().catch((error) => console.error("[cloundflareFT-bot] Error:", error));