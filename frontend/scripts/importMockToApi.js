const fs = require('fs');
const path = require('path');

const MOCK_FILE = path.join(__dirname, '..', 'src', 'data', 'mockData.js');
const API_BASE = process.env.API_BASE || 'http://localhost:8080/api';

function extractArray(content, varName) {
  const startToken = `const ${varName} = [`;
  const start = content.indexOf(startToken);
  if (start === -1) return null;
  const sub = content.substring(start + (`const ${varName} =`).length);
  // find the matching closing '];' for the array
  const endIdx = sub.indexOf('];');
  if (endIdx === -1) return null;
  const arrayText = sub.substring(sub.indexOf('['), endIdx + 1);
  return arrayText;
}

function jsObjectToJson(js) {
  // replace single quotes with double, property names 'nombre' etc to '"nombre"' handled by JSON.parse after minor tweaks
  let s = js;
  // Remove block comments
  s = s.replace(/\/\*[\s\S]*?\*\//g, '');
  // Remove line comments
  s = s.replace(/\/\/.*$/gm, '');
  // Replace single quotes with double quotes
  s = s.replace(/'/g, '"');
  // Replace unquoted property names with quoted ones (naive but works for this file)
  s = s.replace(/([\s,{\[])([a-zA-Z_\$][a-zA-Z0-9_\$]*)\s*:/g, '$1"$2":');
  // Remove trailing commas before closing braces/brackets
  s = s.replace(/,\s*([}\]])/g, '$1');
  return s;
}

async function main() {
  const content = fs.readFileSync(MOCK_FILE, 'utf8');
  const productsJs = extractArray(content, 'defaultProducts');
  const categoriesJs = extractArray(content, 'defaultCategories');
  if (!productsJs || !categoriesJs) {
    console.error('Could not find defaultProducts or defaultCategories in mockData.js');
    process.exit(1);
  }
  const productsJsonText = jsObjectToJson(productsJs);
  const categoriesJsonText = jsObjectToJson(categoriesJs);
  let products, categories;
  try {
    products = JSON.parse(productsJsonText);
    categories = JSON.parse(categoriesJsonText);
  } catch (err) {
    console.error('Error parsing extracted JSON:', err.message);
    process.exit(1);
  }

  console.log(`Found ${categories.length} categories and ${products.length} products in mockData`);

  // Ensure categories exist in API; map name->id
  const catMap = new Map();
  // fetch existing categories
  const resCats = await fetch(`${API_BASE}/categories`).then(r => r.json()).catch(e=>{console.error('Error fetching categories',e); process.exit(1)});
  for (const c of resCats) catMap.set(c.name.toLowerCase(), c.id);

  for (const cat of categories) {
    const name = cat.nombre || cat.name || cat.nombre;
    if (!catMap.has(name.toLowerCase())) {
      console.log('Creating category:', name);
      const resp = await fetch(`${API_BASE}/categories`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ name }) });
      if (!resp.ok) {
        console.error('Failed creating category', name, resp.statusText);
        const text = await resp.text(); console.error(text); continue;
      }
      const created = await resp.json();
      catMap.set(created.name.toLowerCase(), created.id);
    } else {
      console.log('Category exists:', name);
    }
  }

  // Now create products
  const resProds = await fetch(`${API_BASE}/products`).then(r=>r.json()).catch(e=>{console.error('Error fetching products',e); process.exit(1)});
  const existingNames = new Set(resProds.map(p=>p.name.toLowerCase()));

  for (const p of products) {
    const name = p.nombre || p.name;
    if (existingNames.has(name.toLowerCase())) {
      console.log('Product already exists, skipping:', name);
      continue;
    }
    const categoryKey = (p.categoria || p.categoria || '').toString().toLowerCase();
    let categoryId = catMap.get(categoryKey) || catMap.get((p.categoria||'').toLowerCase());
    if (!categoryId) {
      // try to match by known names mapping
      for (const [k,v] of catMap.entries()){
        if (k.includes(categoryKey) || categoryKey.includes(k)) { categoryId = v; break; }
      }
    }
    if (!categoryId) {
      // fallback to first category
      categoryId = Array.from(catMap.values())[0];
    }

    const payload = {
      name: name,
      description: p.descripcion || p.description || '',
      // keep the price as-is from mockData (no automatic division)
      price: (p.precio !== undefined ? p.precio : (p.price || 0)),
      imageUrl: p.imagen || p.imageUrl || '/images/products/default.jpg',
      categoryId: categoryId
    };

    console.log('Creating product:', payload.name, 'price:', payload.price, 'categoryId:', payload.categoryId);
    const resp = await fetch(`${API_BASE}/products`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload)});
    if (!resp.ok) {
      console.error('Failed creating product', payload.name, resp.status, await resp.text());
    } else {
      const created = await resp.json();
      console.log('Created product id', created.id);
    }
  }

  console.log('Done');
}

main().catch(e=>{console.error(e); process.exit(1);});
