const { Client } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
require("dotenv").config();

const client = new Client({
  webVersionCache: {
    type: "remote",
    remotePath:
      "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
  },
});

client.on("ready", () => {
  console.log("Client is ready!");

  send();
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.initialize();

function send() {
  const interval = 2 * 60 * 60 * 1000;

  kirimPesan();
  setInterval(kirimPesan, interval);
}

function kirimPesan() {
  const number = process.env.NUMBER_PHONE;
  const text = process.env.TEXT;
  const chatId = number.substring(1) + "@c.us";

  client
    .sendMessage(chatId, text)
    .then(() => {
      console.log("Pesan terkirim!");
    })
    .catch((err) => {
      console.error("Gagal mengirim pesan:", err);
    });
}
