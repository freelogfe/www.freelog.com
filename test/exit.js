
const {execSync} = require('child_process')
const ret = execSync(`git branch | grep '*' | sed 's/* //'`)
console.log(ret.toString())
throw new Error('pre push error')