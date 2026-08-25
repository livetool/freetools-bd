const $=id=>document.getElementById(id);

function filterCat(c){
  document.querySelectorAll('.tool').forEach(x=>x.style.display=(c==='all'||x.classList.contains(c))?'block':'none');
  $('search').value='';
}
function filterTools(){
  const q=$('search').value.trim().toLowerCase();
  document.querySelectorAll('.tool').forEach(x=>x.style.display=x.innerText.toLowerCase().includes(q)?'block':'none');
}
function image(id){
  return new Promise((resolve,reject)=>{
    const f=$(id)?.files?.[0];
    if(!f) return reject(new Error('Please choose an image first.'));
    if(!f.type.startsWith('image/')) return reject(new Error('Please select a valid image.'));
    const i=new Image();
    i.onload=()=>{URL.revokeObjectURL(i.src);resolve(i)};
    i.onerror=()=>{URL.revokeObjectURL(i.src);reject(new Error('The selected image could not be read.'))};
    i.src=URL.createObjectURL(f);
  });
}
function save(blob,name){
  if(!blob) return alert('Could not create the file.');
  const url=URL.createObjectURL(blob),a=document.createElement('a');
  a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function dims(id){
  const w=Math.floor(Number($(id+'w').value)),h=Math.floor(Number($(id+'h').value));
  if(!w||!h||w<1||h<1||w>10000||h>10000) throw Error('Enter width and height between 1 and 10,000 pixels.');
  return [w,h];
}
async function resize(){
  try{
    const i=await image('rf'),[w,h]=dims('r'),c=document.createElement('canvas');
    c.width=w;c.height=h;c.getContext('2d').drawImage(i,0,0,w,h);
    c.toBlob(b=>save(b,'livetool-resized.jpg'),'image/jpeg',.92);
  }catch(e){alert(e.message)}
}
async function compress(){
  try{
    const i=await image('cf'),c=document.createElement('canvas');
    c.width=i.width;c.height=i.height;c.getContext('2d').drawImage(i,0,0);
    c.toBlob(b=>save(b,'livetool-compressed.jpg'),'image/jpeg',Number($('q').value)/100);
  }catch(e){alert(e.message)}
}
async function convert(id,t,n){
  try{
    const i=await image(id),c=document.createElement('canvas');
    c.width=i.width;c.height=i.height;c.getContext('2d').drawImage(i,0,0);
    c.toBlob(b=>save(b,n),t==='png'?'image/png':'image/jpeg',.92);
  }catch(e){alert(e.message)}
}
async function crop(){
  try{
    const i=await image('cr'),[w,h]=dims('c'),c=document.createElement('canvas');
    const sw=Math.min(w,i.width),sh=Math.min(h,i.height);
    c.width=sw;c.height=sh;
    c.getContext('2d').drawImage(i,(i.width-sw)/2,(i.height-sh)/2,sw,sh,0,0,sw,sh);
    c.toBlob(b=>save(b,'livetool-cropped.jpg'),'image/jpeg',.92);
  }catch(e){alert(e.message)}
}
$('wc').addEventListener('input',()=>{
  const t=$('wc').value,words=t.trim()?t.trim().split(/\s+/).length:0,lines=t?t.split('\n').length:0;
  $('wr').textContent=`Words: ${words} · Characters: ${t.length} · Lines: ${lines}`;
});
function cas(t){
  let x=$('tx').value;
  if(t==='upper')x=x.toUpperCase();
  if(t==='lower')x=x.toLowerCase();
  if(t==='title')x=x.toLowerCase().replace(/\b\w/g,c=>c.toUpperCase());
  $('tx').value=x;
}
function dupe(){$('du').value=[...new Set($('du').value.split('\n'))].join('\n')}
function sorter(r){let a=$('so').value.split('\n').filter(x=>x.trim()).sort((a,b)=>a.localeCompare(b));if(r)a.reverse();$('so').value=a.join('\n')}
function numbers(){$('nr').textContent=$('nu').value.match(/-?\d+(?:\.\d+)?/g)?.join(', ')||'No numbers found.'}
function age(){
  const d=new Date($('dob').value+'T00:00:00'),n=new Date();
  if(isNaN(d.getTime()))return $('ar').textContent='Choose a date.';
  if(d>n)return $('ar').textContent='Birth date cannot be in the future.';
  let y=n.getFullYear()-d.getFullYear(),m=n.getMonth()-d.getMonth();
  if(m<0||(m===0&&n.getDate()<d.getDate()))y--;
  $('ar').textContent=`Age: ${y} years`;
}
function pct(){let a=Number($('pa').value),b=Number($('pb').value);$('pr').textContent=Number.isFinite(a)&&Number.isFinite(b)?`Result: ${(a*b/100).toFixed(2)}`:'Enter valid numbers.'}
function discount(){let p=Number($('price').value),d=Number($('disc').value);if(!Number.isFinite(p)||!Number.isFinite(d))return $('dr').textContent='Enter valid numbers.';let s=p*d/100;$('dr').textContent=`Save: ${s.toFixed(2)} · Sale: ${(p-s).toFixed(2)}`}
function bmi(){let h=Number($('ht').value)/100,w=Number($('wt').value);if(!(h>0&&w>0))return $('br').textContent='Enter valid height and weight.';$('br').textContent=`BMI: ${(w/(h*h)).toFixed(1)}`}
function basic(o){let a=Number($('ca').value),b=Number($('cb').value);if(!Number.isFinite(a)||!Number.isFinite(b))return $('bas').textContent='Enter two numbers.';if(o==='/'&&b===0)return $('bas').textContent='Cannot divide by zero.';let r=o==='+'?a+b:o==='-'?a-b:o==='*'?a*b:a/b;$('bas').textContent='Result: '+r}
function unit(){let v=Number($('uv').value);if(!Number.isFinite(v))return $('ur').textContent='Enter a value.';let f=$('uf').value,t=$('ut').value,b=f==='m'?v:f==='km'?v*1000:v*1609.344,r=t==='m'?b:t==='km'?b/1000:b/1609.344;$('ur').textContent='Result: '+r}
function interest(){let p=Number($('sp').value),r=Number($('sr').value),t=Number($('st').value);if(![p,r,t].every(Number.isFinite))return $('ir').textContent='Enter valid values.';let i=p*r*t/100;$('ir').textContent=`Interest: ${i.toFixed(2)} · Total: ${(p+i).toFixed(2)}`}
function average(){let a=$('av').value.split(',').map(Number).filter(Number.isFinite);$('avr').textContent=a.length?'Average: '+(a.reduce((x,y)=>x+y,0)/a.length).toFixed(2):'Enter numbers separated by commas.'}
function vat(add){let p=Number($('vp').value),r=Number($('vv').value);if(!Number.isFinite(p)||!Number.isFinite(r))return $('vr').textContent='Enter valid values.';$('vr').textContent='Result: '+(add?p*(1+r/100):p/(1+r/100)).toFixed(2)}
