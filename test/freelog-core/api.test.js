var expect = require('chai').expect
const puppeteer = require('puppeteer')

describe('Test API: window.Freelog.QI.***', async function () {
  this.timeout(6 * 1e3)
  var browser
  var page

  before(async () => {
    browser = await puppeteer.launch({
      executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      headless: true
    })
    page = await browser.newPage()
    return new Promise(async (resolve) => {
      page.once('load', async () => {
        resolve()
      })
      await page.goto('http://local.testfreelog.com')
    })
  })

  after(async()=>{
    await browser.close()
  })

  it('window.Freelog.QI.fetchPresentablesList is OK', async function () {
    var response = await page.evaluate(async () => {
      return await window.FreelogApp.QI.fetchPresentablesList()
    })
    expect(response.errcode).to.equal(0, 'errcode test')
  })
})

