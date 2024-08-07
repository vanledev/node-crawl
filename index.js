import puppeteer from "puppeteer";

console.log("Start opening browser, please wait...");
process.setMaxListeners(Infinity);

const browser = await puppeteer.launch({
  headless: false,
  args: ["--start-maximized"],
});
const page = await browser.newPage();

page.setDefaultNavigationTimeout(120000);
const url = 'https://seller-us.tiktok.com/product/manage?shop_region=US&tab=failed'
await page.goto(url, { waitUntil: "domcontentloaded" });

await page.waitForNavigation({ waitUntil: "domcontentloaded" });

const lastPost = await page.waitForSelector("[id$=hplChiTiet_0]");

const text = await page.evaluate((el) => {
  return el.textContent;
}, lastPost);
const title = await page.evaluate(() => {
  return document.querySelector(".entry h2").textContent;
});

const myFrame = page
  .frames()
  .find((frame) => frame.name().includes(input.frameName));

await myFrame.$eval(
  input.selector,
  (el, content) => {
    el.innerHTML = content;
  },
  input.content
);

await page.setContent(html);

await dialog.dismiss();

await page.click('[id$="TroVe"]');

const fields = contentFn.createFields(postID);
let page = await formFn.sendForm({ browser, url, fields, fileName });
let afterSendFn = whichAfterSendFn(url);
const pageDoneAfterSend = await afterSendFn({ page, fileName, url });
if (pageDoneAfterSend) {
  await pageDoneAfterSend.close();
  console.log(`Sent - ${helpersJs.getHomePage(url)} - ${postTitle}`);
}

await browser.close();
process.exit();
