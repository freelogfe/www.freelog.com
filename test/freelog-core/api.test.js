var expect = require('chai').expect
const puppeteer = require('puppeteer')

describe('Test API: window.Freelog.QI.***', async function (){
  it('window.Freelog.QI.fetchPresentablesList is OK', async function (){
    const browser = await puppeteer.launch({
      executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      headless: true
    })

    const page = await browser.newPage()

    page.on('console', msg => console.log(msg.text()))

    page.once('load', async () => {
      await page.evaluate(async () => {
        var res = await window.FreelogApp.QI.fetchPresentablesList()
      })
      await new Promise((resolve) => {
        expect(0).to.equal(1)
        resolve()
      })
      await browser.close()
    })

    await page.goto('http://local.testfreelog.com')
  })
})

