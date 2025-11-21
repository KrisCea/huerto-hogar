const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  // Prefer system Chrome if available to avoid sandbox/network issues with bundled Chromium
  const possibleChrome = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
  ];
  const chromeExecutable = possibleChrome.find(p => fs.existsSync(p));
  const launchOpts = {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  };
  if (chromeExecutable) launchOpts.executablePath = chromeExecutable;
  const browser = await puppeteer.launch(launchOpts);
  const page = await browser.newPage();
  try {
  const ts = new Date().toISOString().replace(/[:.]/g, '');
  const name = `Puppeteer E2E ${ts}`;
  console.log('TEST NAME:', name);

  const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:3000';
  const formUrl = `${BASE_URL}/admin/productos/nuevo`;
  console.log('Navigating to', formUrl);
  await page.goto(formUrl, { waitUntil: 'networkidle2', timeout: 30000 });

    // Wait for category select to be populated
    await page.waitForSelector('select[name="categoriaId"] option', { timeout: 10000 });
    const optionValue = await page.$eval('select[name="categoriaId"] option', el => el.value);

    await page.waitForSelector('input[name="nombre"]');
    await page.type('input[name="nombre"]', name);

    await page.select('select[name="categoriaId"]', optionValue);

    await page.waitForSelector('textarea[name="descripcion"]');
    await page.type('textarea[name="descripcion"]', 'Creado por Puppeteer E2E');

    await page.type('input[name="precio"]', '4.50');
    await page.type('input[name="stock"]', '12');

    // Set image URL
    const imgSel = 'input[name="imagen"]';
    await page.click(imgSel, { clickCount: 3 });
    await page.type(imgSel, 'http://placehold.it/120x120');

    // Submit the form
    // The submit button is type=submit
    await Promise.all([
      page.click('button[type="submit"]'),
      page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 10000 }).catch(() => {})
    ]);

    // Give the app a moment to call the API
    await page.waitForTimeout(1000);

    // Check backend for the created product
    const found = await page.evaluate(async (name) => {
      try {
        const res = await fetch('http://localhost:8080/api/products');
        const data = await res.json();
        return data.find(p => p.name === name) || null;
      } catch (e) {
        return { __error: String(e) };
      }
    }, name);

    if (found && !found.__error) {
      console.log('PRODUCT CREATED:', JSON.stringify(found, null, 2));
      await browser.close();
      process.exit(0);
    }

    if (found && found.__error) {
      console.error('ERROR while querying API from page context:', found.__error);
    } else {
      console.error('Product not found via API after submission');
    }

    await browser.close();
    process.exit(2);
  } catch (err) {
    console.error('E2E script error:', err);
    await browser.close();
    process.exit(3);
  }
})();
