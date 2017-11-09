const path = require('path')

var filename = __filename
console.log(path.dirname(path.relative(process.cwd(), filename)))