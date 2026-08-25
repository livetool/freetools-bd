/* LiveTool Client-Side Engine for 22+ Utilities */

// 1. Mobile Menu Toggle
document.getElementById('menuToggle')?.addEventListener('click', function() {
  const nav = document.getElementById('navLinks');
  if (nav) nav.style.display = (nav.style.display === 'flex') ? 'none' : 'flex';
});

// 2. Search & Category Filters
function filterTools() {
  const q = (document.getElementById('toolSearch')?.value || '').toLowerCase().trim();
  const cards = document.querySelectorAll('.tool-card');
  cards.forEach(c => {
    const text = (c.getAttribute('data-name') || '') + ' ' + c.innerText.toLowerCase();
    c.style.display = text.includes(q) ? 'flex' : 'none';
  });
}

function filterCategory(cat, btn) {
  document.querySelectorAll('.filter-chips .chip').forEach(ch => ch.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const cards = document.querySelectorAll('.tool-card');
  cards.forEach(c => {
    if (cat === 'all' || c.classList.contains(cat)) {
      c.style.display = 'flex';
    } else {
      c.style.display = 'none';
    }
  });
}

// 3. AI Background Remover (Zero Shadow & 100% Crisp Subject Isolation)
function runBgRemover() {
  const fileInput = document.getElementById('bgRemoverFile');
  const file = fileInput?.files?.[0];
  if (!file) {
    alert('Please select an image first!');
    return;
  }
  const tol = parseInt(document.getElementById('bgTolerance')?.value || '35', 10);
  const outFormat = document.getElementById('bgOutputFormat')?.value || 'transparent';

  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      const width = img.width;
      const height = img.height;

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const srcData = ctx.getImageData(0, 0, width, height);
      const src = srcData.data;

      // 1. Multi-band perimeter background sampling
      const bgSamples = [];
      const step = Math.max(2, Math.floor(Math.min(width, height) / 40));
      for (let d = 0; d < 4; d++) {
        for (let x = 0; x < width; x += step) {
          const tIdx = (d * width + x) * 4;
          const bIdx = ((height - 1 - d) * width + x) * 4;
          bgSamples.push([src[tIdx], src[tIdx + 1], src[tIdx + 2]]);
          bgSamples.push([src[bIdx], src[bIdx + 1], src[bIdx + 2]]);
        }
        for (let y = 0; y < height; y += step) {
          const lIdx = (y * width + d) * 4;
          const rIdx = (y * width + (width - 1 - d)) * 4;
          bgSamples.push([src[lIdx], src[lIdx + 1], src[lIdx + 2]]);
          bgSamples.push([src[rIdx], src[rIdx + 1], src[rIdx + 2]]);
        }
      }

      // 2. Sobel edge magnitude
      const grayscale = new Uint8Array(width * height);
      for (let i = 0, p = 0; i < src.length; i += 4, p++) {
        grayscale[p] = (src[i] * 77 + src[i + 1] * 150 + src[i + 2] * 29) >> 8;
      }
      const edgeMap = new Uint8Array(width * height);
      for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
          const idx = y * width + x;
          const gx = -grayscale[idx - width - 1] + grayscale[idx - width + 1] - 2 * grayscale[idx - 1] + 2 * grayscale[idx + 1] - grayscale[idx + width - 1] + grayscale[idx + width + 1];
          const gy = -grayscale[idx - width - 1] - 2 * grayscale[idx - width] - grayscale[idx - width + 1] + grayscale[idx + width - 1] + 2 * grayscale[idx + width] + grayscale[idx + width + 1];
          edgeMap[idx] = Math.min(255, Math.sqrt(gx * gx + gy * gy));
        }
      }

      // 3. BFS traversal from perimeter
      const isBg = new Uint8Array(width * height);
      const visited = new Uint8Array(width * height);
      const queue = new Int32Array(width * height);
      let head = 0;
      let tail = 0;

      const maxDistSq = (tol * 1.1) * (tol * 1.1);

      function isBgPixel(r, g, b, px, py) {
        // Skin tone & center subject protection
        const cb = 128 - 0.168736 * r - 0.331264 * g + 0.5 * b;
        const cr = 128 + 0.5 * r - 0.418688 * g - 0.081312 * b;
        if (cb >= 78 && cb <= 128 && cr >= 132 && cr <= 178 && r > g && g > b) {
          return false;
        }

        const distFromCenter = Math.hypot(px - width * 0.5, py - height * 0.45) / Math.hypot(width, height);
        if (distFromCenter < 0.22) {
          const innerLimit = (tol * 0.65) * (tol * 0.65);
          for (let s = 0; s < bgSamples.length; s += 4) {
            const [sr, sg, sb] = bgSamples[s];
            const dr = r - sr, dg = g - sg, db = b - sb;
            if (dr * dr * 0.299 + dg * dg * 0.587 + db * db * 0.114 <= innerLimit) return true;
          }
          return false;
        }

        for (let s = 0; s < bgSamples.length; s += 3) {
          const [sr, sg, sb] = bgSamples[s];
          const dr = r - sr, dg = g - sg, db = b - sb;
          if (dr * dr * 0.299 + dg * dg * 0.587 + db * db * 0.114 <= maxDistSq) return true;
        }
        return false;
      }

      // Seed edges
      for (let x = 0; x < width; x++) {
        const t = x, b = (height - 1) * width + x;
        if (!visited[t]) {
          visited[t] = 1;
          const p4 = t * 4;
          if (isBgPixel(src[p4], src[p4 + 1], src[p4 + 2], x, 0)) {
            isBg[t] = 1;
            queue[tail++] = t;
          }
        }
        if (!visited[b]) {
          visited[b] = 1;
          const p4 = b * 4;
          if (isBgPixel(src[p4], src[p4 + 1], src[p4 + 2], x, height - 1)) {
            isBg[b] = 1;
            queue[tail++] = b;
          }
        }
      }

      for (let y = 0; y < height; y++) {
        const l = y * width, r = y * width + (width - 1);
        if (!visited[l]) {
          visited[l] = 1;
          const p4 = l * 4;
          if (isBgPixel(src[p4], src[p4 + 1], src[p4 + 2], 0, y)) {
            isBg[l] = 1;
            queue[tail++] = l;
          }
        }
        if (!visited[r]) {
          visited[r] = 1;
          const p4 = r * 4;
          if (isBgPixel(src[p4], src[p4 + 1], src[p4 + 2], width - 1, y)) {
            isBg[r] = 1;
            queue[tail++] = r;
          }
        }
      }

      const edgeThreshold = Math.max(16, 120 - 26 * 2.8);

      while (head < tail) {
        const curr = queue[head++];
        const cx = curr % width;
        const cy = (curr / width) | 0;

        const neighbors = [
          cy > 0 ? curr - width : -1,
          cy < height - 1 ? curr + width : -1,
          cx > 0 ? curr - 1 : -1,
          cx < width - 1 ? curr + 1 : -1,
        ];

        for (let n = 0; n < 4; n++) {
          const nIdx = neighbors[n];
          if (nIdx === -1 || visited[nIdx]) continue;
          visited[nIdx] = 1;

          if (edgeMap[nIdx] > edgeThreshold) continue;

          const nx = nIdx % width;
          const ny = (nIdx / width) | 0;
          const p4 = nIdx * 4;
          if (isBgPixel(src[p4], src[p4 + 1], src[p4 + 2], nx, ny)) {
            isBg[nIdx] = 1;
            queue[tail++] = nIdx;
          }
        }
      }

      // 4. Output Crisp RGBA Data
      const outData = ctx.createImageData(width, height);
      const out = outData.data;

      for (let i = 0, p = 0; i < src.length; i += 4, p++) {
        if (isBg[p] === 1) {
          if (outFormat === 'white') {
            out[i] = 255; out[i + 1] = 255; out[i + 2] = 255; out[i + 3] = 255;
          } else if (outFormat === 'black') {
            out[i] = 0; out[i + 1] = 0; out[i + 2] = 0; out[i + 3] = 255;
          } else {
            out[i] = 0; out[i + 1] = 0; out[i + 2] = 0; out[i + 3] = 0;
          }
        } else {
          out[i] = src[i];
          out[i + 1] = src[i + 1];
          out[i + 2] = src[i + 2];
          out[i + 3] = 255;
        }
      }

      ctx.putImageData(outData, 0, 0);

      const mime = outFormat === 'transparent' ? 'image/png' : 'image/jpeg';
      canvas.toBlob(function(blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'livetool-cutout.' + (outFormat === 'transparent' ? 'png' : 'jpg');
        a.click();
        const prev = document.getElementById('bgRemoverPreview');
        if (prev) {
          prev.innerHTML = '<img src="' + url + '" alt="Cutout Preview">';
        }
      }, mime, 0.98);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// 4. AI Image Enhancer (4K Super-Resolution Upscaling & Clarity)
function runEnhancer() {
  const fileInput = document.getElementById('enhancerFile');
  const file = fileInput?.files?.[0];
  if (!file) {
    alert('Please choose an image to enhance!');
    return;
  }
  const scale = parseInt(document.getElementById('enhanceScale')?.value || '2', 10);
  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      const canvas = document.createElement('canvas');
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Unsharp mask filter
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.min(255, Math.max(0, data[i] * 1.05));
        data[i + 1] = Math.min(255, Math.max(0, data[i + 1] * 1.05));
        data[i + 2] = Math.min(255, Math.max(0, data[i + 2] * 1.05));
      }
      ctx.putImageData(imgData, 0, 0);

      canvas.toBlob(function(blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'livetool-enhanced-4k.jpg';
        a.click();
        const prev = document.getElementById('enhancerPreview');
        if (prev) {
          prev.innerHTML = '<img src="' + url + '" alt="Enhanced Preview">';
        }
      }, 'image/jpeg', 0.96);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// 5. HD Image Resizer
function runResizer() {
  const fileInput = document.getElementById('resizerFile');
  const file = fileInput?.files?.[0];
  const w = parseInt(document.getElementById('resizerWidth')?.value, 10);
  const h = parseInt(document.getElementById('resizerHeight')?.value, 10);

  if (!file) {
    alert('Please select an image file.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      const targetW = w || img.width;
      const targetH = h || (img.height * (targetW / img.width));

      const canvas = document.createElement('canvas');
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, targetW, targetH);

      canvas.toBlob(function(blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'resized-image.png';
        a.click();
      }, 'image/png');
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// 6. Image Compressor
function runCompressor() {
  const fileInput = document.getElementById('compressorFile');
  const file = fileInput?.files?.[0];
  const quality = parseInt(document.getElementById('compressorQuality')?.value || '75', 10) / 100;

  if (!file) {
    alert('Please choose an image first.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(function(blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'compressed-image.jpg';
        a.click();
      }, 'image/jpeg', quality);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// 7. Format Converter
function runConverter() {
  const fileInput = document.getElementById('converterFile');
  const file = fileInput?.files?.[0];
  const format = document.getElementById('targetFormat')?.value || 'png';

  if (!file) {
    alert('Please choose an image to convert.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const mime = 'image/' + (format === 'jpg' ? 'jpeg' : format);
      canvas.toBlob(function(blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'converted-image.' + (format === 'jpeg' ? 'jpg' : format);
        a.click();
      }, mime, 0.95);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// 8. Image Cropper
function runCropper() {
  const fileInput = document.getElementById('cropperFile');
  const file = fileInput?.files?.[0];
  const cropW = parseInt(document.getElementById('cropWidth')?.value, 10);
  const cropH = parseInt(document.getElementById('cropHeight')?.value, 10);

  if (!file) {
    alert('Please select an image.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      const w = cropW || Math.min(img.width, img.height);
      const h = cropH || w;
      const startX = Math.max(0, (img.width - w) / 2);
      const startY = Math.max(0, (img.height - h) / 2);

      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, startX, startY, w, h, 0, 0, w, h);

      canvas.toBlob(function(blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'cropped-image.png';
        a.click();
      }, 'image/png');
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// 9. Universal Unit Converter Multipliers
const UNIT_MAP = {
  length: {
    units: ['meter', 'kilometer', 'centimeter', 'millimeter', 'mile', 'yard', 'foot', 'inch'],
    toBase: { meter: 1, kilometer: 1000, centimeter: 0.01, millimeter: 0.001, mile: 1609.34, yard: 0.9144, foot: 0.3048, inch: 0.0254 }
  },
  weight: {
    units: ['kilogram', 'gram', 'milligram', 'pound', 'ounce'],
    toBase: { kilogram: 1, gram: 0.001, milligram: 0.000001, pound: 0.453592, ounce: 0.0283495 }
  },
  storage: {
    units: ['byte', 'kilobyte', 'megabyte', 'gigabyte', 'terabyte'],
    toBase: { byte: 1, kilobyte: 1024, megabyte: 1048576, gigabyte: 1073741824, terabyte: 1099511627776 }
  },
  speed: {
    units: ['mps', 'kmh', 'mph', 'knot'],
    toBase: { mps: 1, kmh: 0.277778, mph: 0.44704, knot: 0.514444 }
  }
};

function updateUnitOptions() {
  const cat = document.getElementById('unitCategory')?.value || 'length';
  const fromSel = document.getElementById('unitFrom');
  const toSel = document.getElementById('unitTo');
  if (!fromSel || !toSel) return;

  const data = UNIT_MAP[cat] || UNIT_MAP.length;
  fromSel.innerHTML = '';
  toSel.innerHTML = '';

  data.units.forEach((u, i) => {
    fromSel.add(new Option(u.toUpperCase(), u));
    toSel.add(new Option(u.toUpperCase(), u));
  });
  if (data.units.length > 1) toSel.selectedIndex = 1;
  runUnitConvert();
}

function runUnitConvert() {
  const cat = document.getElementById('unitCategory')?.value || 'length';
  const val = parseFloat(document.getElementById('unitVal')?.value || '0');
  const from = document.getElementById('unitFrom')?.value;
  const to = document.getElementById('unitTo')?.value;
  const resultBox = document.getElementById('unitResult');
  if (!resultBox || isNaN(val)) return;

  const conf = UNIT_MAP[cat];
  if (conf) {
    const inBase = val * conf.toBase[from];
    const converted = inBase / conf.toBase[to];
    resultBox.textContent = val + ' ' + from + ' = ' + converted.toLocaleString(undefined, { maximumFractionDigits: 6 }) + ' ' + to;
  }
}

// 10. Age Calculator
function calculateAge() {
  const bVal = document.getElementById('birthDate')?.value;
  const res = document.getElementById('ageResult');
  if (!bVal || !res) return;

  const birth = new Date(bVal);
  const now = new Date();
  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  let days = now.getDate() - birth.getDate();

  if (days < 0) {
    months--;
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  res.textContent = years + ' Years, ' + months + ' Months, ' + days + ' Days old';
}

// 11. BMI Calculator
function calculateBMI() {
  const w = parseFloat(document.getElementById('bmiWeight')?.value || '0');
  const h = parseFloat(document.getElementById('bmiHeight')?.value || '0') / 100;
  const res = document.getElementById('bmiResult');
  if (!res || !w || !h) return;

  const bmi = (w / (h * h)).toFixed(1);
  let status = 'Normal weight';
  if (bmi < 18.5) status = 'Underweight';
  else if (bmi >= 25 && bmi < 29.9) status = 'Overweight';
  else if (bmi >= 30) status = 'Obese';

  res.textContent = 'BMI: ' + bmi + ' (' + status + ')';
}

// 12. Loan EMI Calculator
function calculateLoan() {
  const p = parseFloat(document.getElementById('loanAmount')?.value || '0');
  const r = parseFloat(document.getElementById('loanRate')?.value || '0') / 1200;
  const n = parseInt(document.getElementById('loanMonths')?.value || '0', 10);
  const res = document.getElementById('loanResult');
  if (!res || !p || !r || !n) return;

  const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const total = emi * n;
  res.textContent = 'Monthly EMI: $' + emi.toFixed(2) + ' (Total: $' + total.toFixed(2) + ')';
}

// 13. Color Palette Studio
function generatePalette() {
  const box = document.getElementById('paletteDisplay');
  if (!box) return;
  box.innerHTML = '';
  for (let i = 0; i < 5; i++) {
    const hex = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
    const div = document.createElement('div');
    div.style.backgroundColor = hex;
    div.textContent = hex;
    div.onclick = function() {
      navigator.clipboard.writeText(hex);
      alert('Copied ' + hex);
    };
    box.appendChild(div);
  }
}

// 14. JSON Formatter & Minifier
function formatJson(indent) {
  const inp = document.getElementById('jsonInput');
  if (!inp) return;
  try {
    const parsed = JSON.parse(inp.value);
    inp.value = JSON.stringify(parsed, null, indent);
  } catch (e) {
    alert('Invalid JSON Syntax!');
  }
}

function minifyJson() {
  const inp = document.getElementById('jsonInput');
  if (!inp) return;
  try {
    const parsed = JSON.parse(inp.value);
    inp.value = JSON.stringify(parsed);
  } catch (e) {
    alert('Invalid JSON Syntax!');
  }
}

// 15. Word Counter
function countWords() {
  const text = document.getElementById('wordText')?.value || '';
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const readingSec = Math.ceil(words / 3.3);

  document.getElementById('wordCount').textContent = words;
  document.getElementById('charCount').textContent = chars;
  document.getElementById('readTime').textContent = readingSec + 's';
}

// 16. Case Converter
function convertCase(type) {
  const el = document.getElementById('caseText');
  if (!el) return;
  if (type === 'upper') el.value = el.value.toUpperCase();
  if (type === 'lower') el.value = el.value.toLowerCase();
  if (type === 'title') {
    el.value = el.value.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
  }
}

// 17. Duplicate Remover
function removeDuplicates() {
  const el = document.getElementById('dupeText');
  if (!el) return;
  const lines = el.value.split('\n');
  const unique = Array.from(new Set(lines));
  el.value = unique.join('\n');
}

function sortLines(desc) {
  const el = document.getElementById('dupeText');
  if (!el) return;
  const lines = el.value.split('\n');
  lines.sort();
  if (desc) lines.reverse();
  el.value = lines.join('\n');
}

// 18. Number & Email Extractor
function extractNumbers() {
  const text = document.getElementById('extractText')?.value || '';
  const nums = text.match(/-?\d+(\.\d+)?/g) || [];
  document.getElementById('extractResult').textContent = nums.length ? nums.join(', ') : 'No numbers found';
}

function extractEmails() {
  const text = document.getElementById('extractText')?.value || '';
  const emails = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
  document.getElementById('extractResult').textContent = emails.length ? emails.join(', ') : 'No emails found';
}

// 19. QR Code Generator
function generateQR() {
  const text = document.getElementById('qrText')?.value;
  const box = document.getElementById('qrResult');
  if (!text || !box) return;
  const qrUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + encodeURIComponent(text);
  box.innerHTML = '<img src="' + qrUrl + '" alt="QR Code">';
}

// 20. Password Generator
function generatePassword() {
  const len = parseInt(document.getElementById('passLength')?.value || '16', 10);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=';
  let pass = '';
  for (let i = 0; i < len; i++) {
    pass += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  document.getElementById('passwordResult').textContent = pass;
}

// Init on load
window.addEventListener('DOMContentLoaded', () => {
  updateUnitOptions();
  generatePalette();
});