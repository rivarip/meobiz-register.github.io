const webhookURL = process.env.DISCORD_WEBHOOK;

document.getElementById('daftarForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const nama = document.getElementById('nama').value.trim();
  const whatsapp = document.getElementById('whatsapp').value.trim();
  let gametag = document.getElementById('gametag').value.trim();
  const edisi = document.getElementById('edisi').value;
  const password = document.getElementById('password').value;

  const waRegex = /^08[0-9]{8,13}$/;
  if (!waRegex.test(whatsapp)) {
    alert('Nomor WhatsApp tidak valid.');
    return;
  }

  gametag = gametag.replace(/\s+/g, '_');

  if (edisi === 'Bedrock' && !gametag.startsWith('.')) {
    gametag = '.' + gametag;
  }

  const gametagRegex = /^[.a-zA-Z0-9_]+$/;
  if (!gametagRegex.test(gametag)) {
    alert('Gametag hanya boleh berisi huruf, angka, dan tidak boleh ada simbol kecuali titik.');
    return;
  }

  if (password.length < 6 || password.length > 16) {
    alert('Password harus 6–16 karakter.');
    return;
  }

  // Format sesuai template
  const message = 
    `xxR$E$G-gametag-R$E$Gxx${gametag}` +
    `xxR$E$G-wanum-R$E$Gxx${whatsapp}` +
    `xxR$E$G-edition-R$E$Gxx${edisi}` +
    `xxR$E$G-password-R$E$Gxx${password}`;

  // Kirim ke Discord Webhook
  fetch(webhookURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      content: message
    })
  })
  .then(response => {
    if (response.ok) {
      alert('Pendaftaran berhasil dikirim!');
      document.getElementById('daftarForm').reset();
    } else {
      alert('Gagal mengirim pendaftaran.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Terjadi kesalahan saat mengirim pendaftaran.');
  });
});