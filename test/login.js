const puppeteer = require('puppeteer')
var expect = require('chai').expect

describe('test login', () => {
  it('should have the right redirect url and logined success', async () => {
    const browser = await puppeteer.launch({
      executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      headless: true
    });
    const page = await browser.newPage();
    await page.goto('http://www.testfreelog.com');

    // page.on('console', msg => console.log(msg.text()));
    page.once('load', async () => {
      expect(page.url()).to.equal('http://console.testfreelog.com/user/login?redirect=http%3A%2F%2Fwww.testfreelog.com%2Faccounts', '跳转登录页成功')
      const username = 'src@freelog.com'
      const password = '123456'
      await page.type('input[name="username"]', username)
      await  page.type('input[name="password"]', password)
      await page.click('.js-login-btn')
      await page.waitForNavigation();
      await page.evaluate(async () => {
        // use window.readfile to read contents of a file
        console.log('start', JSON.stringify(window.FreelogApp));
      });
      expect(page.url()).to.equal('http://www.testfreelog.com/accounts', '跳转个人中心成功')
      await page.waitFor('.user-name');
      const loginName = await page.$eval('.user-name', el => el.textContent)
      expect(loginName).to.be.a('string', '获取用户名成功')
      await browser.close();
    });
  })
})