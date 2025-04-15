let html5QrCode;
const qrResult = document.getElementById("qr-result");
const qrReader = document.getElementById("qr-reader");
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");

startBtn.addEventListener("click", () => {
  if (!html5QrCode) {
    html5QrCode = new Html5Qrcode("qr-reader");
  }

  const config = { fps: 10, qrbox: 250 }; // square scan box
  html5QrCode.start(
    { facingMode: "environment" },
    config,
    qrCodeMessage => {
      qrResult.innerText = qrCodeMessage;
    },
    errorMessage => {
      // Ignore scanning errors
    }
  ).catch(err => {
    qrResult.innerText = `Error starting scanner: ${err}`;
  });
});

stopBtn.addEventListener("click", () => {
  if (html5QrCode) {
    html5QrCode.stop().then(() => {
      html5QrCode.clear();
      qrResult.innerText = "Scanner stopped.";
    }).catch(err => {
      qrResult.innerText = `Error stopping scanner: ${err}`;
    });
  }
});
