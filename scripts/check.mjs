import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
const dist=path.resolve('dist');
const data=fs.readFileSync(path.join(dist,'portfolio-data.js'),'utf8');
const app=fs.readFileSync(path.join(dist,'app.js'),'utf8');
let media=0;
for(const route of ['','about/','portfolio/','stories/','pricing/','contact/','stories/light-through-the-trees/','stories/patches-of-sunlight/','stories/finding-my-way-back/']){
 let html='';const element={addEventListener(){},classList:{toggle(){}},setAttribute(){},getAttribute(){}};
 const context={matchMedia:()=>({matches:false}),location:{pathname:'/'+route,search:''},URLSearchParams,Date,document:{body:{classList:{add(){}}},querySelector(s){if(s==='#app')return {set innerHTML(x){html=x}};if(s==='video'||s==='#inquiry'||s==='.illustration-track')return null;return element},querySelectorAll(){return []}}};
 vm.runInNewContext(data+'\n'+app,context);
 if(!/<h1(?:\s|>)/.test(html))throw Error('Missing main heading: '+route);
 for(const [,url] of html.matchAll(/(?:src|poster|href)="(\/[^"#]*)"/g)){
  const target=path.join(dist,decodeURIComponent(url.split('?')[0]));
  if(!fs.existsSync(target))throw Error('Missing resource on '+route+': '+url);
  media++;
 }
}
vm.runInNewContext(data+`;if(new Set(portfolioPhotos.map(p=>p.id)).size!==portfolioPhotos.length)throw Error('Duplicate photo');for(const p of portfolioPhotos){for(const suffix of ['.jpg','-thumb.jpg'])if(!exists(p.id+suffix))throw Error('Missing photo '+p.id);if(!p.width||!p.height||!p.alt)throw Error('Missing media metadata')}`,{exists:name=>fs.existsSync(path.join(dist,'assets',name))});
console.log('Passed: 9 page routes, '+media+' local resource references, unique portfolio entries and full-size/thumbnail pairs.');

vm.runInNewContext(data+`;for(const [category,ids] of Object.entries(portfolioOrders)){const expected=portfolioPhotos.filter(p=>category==='All'||p.category===category).map(p=>p.id);if(new Set(ids).size!==ids.length||ids.length!==expected.length||ids.some(id=>!expected.includes(id)))throw Error('Invalid category order: '+category)}`,{});
console.log('Passed: independent category orders contain every matching photograph exactly once.');
