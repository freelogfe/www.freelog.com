const puppeteer = require('puppeteer')
const assert = require('assert')
const co = require('co')


function isAsyncFunction(fn) {
  return fn.constructor.name === 'AsyncFunction'
}

class PageWindow {
  constructor(url) {
    assert(url, 'require url parameter')
    this.url = url
    co(async () => {
      await this.init()
    })
  }


  async load(url) {
    if (this.browser) {
      await this.browser.close();
    }

    this.url = url
    co(async () => {
      await this.init()
    })
  }

  async init() {
    this.isLoaded = false
    this.handles = []

    const browser = await puppeteer.launch({
      // executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      headless: true
    });
    const page = await browser.newPage();
    await page.goto(this.url);

    page.once('load', async () => {
      this.isLoaded = true
      var handle

      while ((handle = this.handles.shift())) {
        await handle(this.browser, this.page)  //async function?
      }
    });

    this.browser = browser
    this.page = page
  }

  onPageLoaded(fn) {
    if (this.isLoaded) {
      fn(this.browser, this.page)
    } else {
      this.handles.push(fn)
    }
  }

  async close() {
    await this.browser.close();
  }
}


module.exports = PageWindow