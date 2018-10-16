var expect = require('chai').expect
const puppeteer = require('puppeteer')

describe('Test API: window.Freelog.QI.***', async function (){
  var browser, page

  before(async () => {
    browser = await puppeteer.launch({
      executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      headless: true
    })

    page = await browser.newPage()
    // page.on('console', msg => console.log(msg.text()))

    return new Promise(async (resolve) => {
      page.once('load', async () => {
        resolve()
      })
      await page.goto('http://local.testfreelog.com')
    })
  })

  after(async () => {
    await browser.close()
  })

  it('window.Freelog.QI.fetchPresentablesList is OK', async function (){
    return new Promise(async (resolve, reject) => {
      var pLResponse = await page.evaluate(async () => {
        var res = await window.FreelogApp.QI.fetchPresentablesList()
        return res
      })

      try{
        expect(pLResponse, 'response is invalid!').to.be.an('Object').that.have.property('ret')
        expect(pLResponse.ret).to.equal(0, `msg:${pLResponse.msg}`)
      }catch(e){
        return reject(e)
      }

      resolve()
    })
  })

})

