const path = require('path')
const shelljs = require('shelljs');
const dirname = __dirname
const from = path.join(dirname,'../dist/public/pages/pagebuild.html')
const to  =  path.join(dirname,'../dist/pagebuild/index.html')

shelljs.exec(`cp ${from} ${to}`)