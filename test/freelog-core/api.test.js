var expect = require('chai').expect
const puppeteer = require('puppeteer')

describe('Test API: window.FreelogApp.QI.***', async function (){
  var browser, page

  before(async () => {
    this.timeout(5000)
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

  createFetchApiAssertion('fetchPresentablesList', function (){
    return page.evaluate(async () => {
      var res = await window.FreelogApp.QI.fetchPresentablesList()
      return res
    })
  })

  createFetchApiAssertion('fetchPresentableInfo', function (){
    return page.evaluate(async () => {
      var pListResp = await window.FreelogApp.QI.fetchPresentablesList()
      var pInfoResp = await window.FreelogApp.QI.fetchPresentableInfo(pListResp.data[0].presentableId)
      return pInfoResp
    })
  })

  function createFetchApiAssertion (apiName, evaluateFn){
    describe(apiName, async function (){
      it(`typeof response == 'object', response.ret === 0`, async function (){
        return new Promise(async (resolve, reject) => {
          var response = await evaluateFn()

          try{
            isFreelogResponseValid(response)
          }catch(e){
            return reject(e)
          }

          resolve()
        })
      })
    })
  }

})


function isFreelogResponseValid (response){
  expect(response, 'response is invalid!').to.be.an('Object').that.have.property('ret')
  expect(response.ret).to.equal(0, `msg:${response.msg}`)
}


