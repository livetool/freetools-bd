const $=id=>document.getElementById(id);

$('counterText').addEventListener('input',()=>{
  const t=$('counterText').value;
  const words=t.trim()?t.trim().split(/\s+/).length:0;
  const lines=t? t.split(/\n/).length:0;
  $('counterResult').textContent=`Words: ${words} · Characters: ${t.length} · Lines: ${lines}`;
});

function convertCase(type){
  let t=$('caseText').value;
  if(type==='upper') t=t.toUpperCase();
  if(type==='lower') t=t.toLowerCase();
  if(type==='title') t=t.toLowerCase().replace(/\b\w/g,c=>c.toUpperCase());
  $('caseText').value=t;
}

function loadImage(file){
  return new Promise((resolve,reject)=>{
    if(!file) return reject(new Error('Please choose an image.'));
    const img=new Image();
    img.onload=()=>resolve(img);
    img.onerror=()=>reject(new Error('Invalid image.'));
    img.src=URL.createObjectURL(file);
  });
}
function downloadBlob(blob,name){
  const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=name;
  document.body.appendChild(a); a.click(); a.remove();
}
async function resizeImage(){
  try{
    const file=$('resizeFile').files[0], img=await loadImage(file);
    const w=parseInt($('resizeW').value)||img.width, h=parseInt($('resizeH').value)||img.height;
    const c=document.createElement('canvas'); c.width=w;c.height=h;c.getContext('2d').drawImage(img,0,0,w,h);
    c.toBlob(b=>{downloadBlob(b,'resized-image.jpg');$('resizeStatus').textContent='Done — download started.'},'image/jpeg',.9);
  }catch(e){$('resizeStatus').textContent=e.message}
}
async function compressImage(){
  try{
    const file=$('compressFile').files[0], img=await loadImage(file);
    const c=document.createElement('canvas'); c.width=img.width;c.height=img.height;c.getContext('2d').drawImage(img,0,0);
    const q=parseInt($('quality').value)/100;
    c.toBlob(b=>{downloadBlob(b,'compressed-image.jpg');$('compressStatus').textContent=`Done — ${(b.size/1024).toFixed(1)} KB`},'image/jpeg',q);
  }catch(e){$('compressStatus').textContent=e.message}
}
function calcPercent(){
  const a=Number($('percentA').value), b=Number($('percentB').value);
  $('percentResult').textContent=(isFinite(a)&&isFinite(b))?`Result: ${(a*b/100).toFixed(2)}`:'Enter valid numbers.';
}
function calcAge(){
  const d=new Date($('birthDate').value); if(isNaN(d)) return;
  const now=new Date(); let y=now.getFullYear()-d.getFullYear(),m=now.getMonth()-d.getMonth();
  if(m<0||(m===0&&now.getDate()<d.getDate())) y--;
  $('ageResult').textContent=`Your age: ${Math.max(0,y)} years`;
}
