



function getNeededCookiesFromHeader(cookiesFromHeader) {
    const cookies = cookiesFromHeader.map((item) => item.split(";")[0]);
    return cookies.join(";");
  }
  


async function useCookieToLogIn(browser,savinglocation) {


    const str = await promises.readFile(savinglocation,'utf8');
    const cookiesArr = JSON.parse(str);
    const page = await browser.newPage();
    for (let cookie of cookiesArr) {

        page.setCookie(cookie);

    }

    return browser;

}

async function login(page, obj) {

    await page.goto(obj.loginURL);
    const login = await page.waitForSelector(obj.loginElement);
    const password = await page.waitForSelector(obj.passwordElement);
    const submitButton = await page.waitForSelector(obj.submitElement);
    await typingStuff(page, login, obj.login)
    await typingStuff(page, password, obj.password)
    await submitButton.click();
    return 1;
}

async function saveCookies(page, savinglocation) {

    await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
    const cookie = await page.cookies();
    await promises.writeFile(savinglocation, JSON.stringify(cookie));

}

export default {useCookieToLogIn,login,saveCookies}