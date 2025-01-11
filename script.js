// DOM elements
const qrTextInput = document.getElementById('qrText');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const qrcodeContainer = document.getElementById('qrcode');
const formatSelect = document.getElementById('formatSelect');
const qrSizeInput = document.getElementById('qrSize');

// Maximum input length
const MAX_LENGTH = 2000;

// Keep a reference to the QRCode instance
let qrCode = null;

// Helper to correctly encode Cyrillic and other special characters in UTF-8
function toUTF8(str) {
  return unescape(encodeURIComponent(str));
}

// Generate the QR code
function generateQRCode() {
  let text = qrTextInput.value.trim();

  // If empty
  if (text.length === 0) {
    alert('Please enter some text or link.');
    return;
  } else if (text.length > MAX_LENGTH) {
    // In theory, maxlength prevents this, but just in case
    alert(`Text length exceeds ${MAX_LENGTH} characters!`);
    return;
  }

  // Validate size (from 100 to 512)
  let size = parseInt(qrSizeInput.value, 10);
  if (isNaN(size) || size < 100 || size > 512) {
    alert('Invalid QR code size. Please choose a number from 100 to 512.');
    return;
  }

  // Clear previous QR code
  qrcodeContainer.innerHTML = "";

  // Create new QR code
  qrCode = new QRCode(qrcodeContainer, {
    text: toUTF8(text),
    width: size,
    height: size,
    correctLevel: QRCode.CorrectLevel.H
  });
}

// Download the generated QR code
function downloadQRCode() {
  if (!qrCode) {
    alert('Please generate the QR code first.');
    return;
  }

  // Find canvas (QRCodeJS uses canvas by default)
  const canvas = qrcodeContainer.querySelector('canvas');
  if (!canvas) {
    alert('Canvas with QR code not found.');
    return;
  }

  // Determine the chosen format
  const selectedFormat = formatSelect.value; // "png", "jpeg" or "webp"

  // Convert canvas to data URL
  const dataUrl = canvas.toDataURL(`image/${selectedFormat}`);

  // Create download link
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = `qrcode.${selectedFormat}`;
  link.click();
}

// Event listeners
generateBtn.addEventListener('click', generateQRCode);
downloadBtn.addEventListener('click', downloadQRCode);
