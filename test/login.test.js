const puppeteer = require('puppeteer')
const PageWindown = require('./pageWindow')
var expect = require('chai').expect

describe('test login', () => {
  it('should have the right redirect url and logined success', async () => {
    var pw = new PageWindown('http://www.testfreelog.com')
    pw.onPageLoaded(async (browser, page) => {
      expect(page.url()).to.equal('http://console.testfreelog.com/user/login?redirect=http%3A%2F%2Fwww.testfreelog.com%2Faccounts', '跳转登录页成功')
      const username = 'src@freelog.com'
      const password = '123456'
      await page.type('input[name="username"]', username)
      await  page.type('input[name="password"]', password)
      await page.click('.js-login-btn')
      await page.waitForNavigation();
      expect(page.url()).to.equal('http://www.testfreelog.com/accounts', '跳转个人中心成功')
      await page.waitFor('.user-name');
      const loginName = await page.$eval('.user-name', el => el.textContent)
      expect(loginName).to.be.a('string', '获取用户名成功')
      await browser.close();
    })
  })
})