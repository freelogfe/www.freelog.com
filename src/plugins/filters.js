import AccountTypes from '@/config/account-types'

export default (Vue, options) => {
  //单位转换+千分位格式化
  var ACCOUNT_MAP = Object.values(AccountTypes).reduce((AccountMap, accountType) => {
    AccountMap[accountType.abbr] = accountType
    return AccountMap
  }, {});

  Vue.filter('fmtDate', function (value, frm) {
    if (!value) return ''
    var date = new Date(value)
    frm = frm || 'yyyy-MM-dd hh:mm'
    var regs = {
      'y+': date.getFullYear(),
      "M+": date.getMonth() + 1,
      "d+": date.getDate(),
      "h+": date.getHours(),
      "m+": date.getMinutes(),
      "s+": date.getSeconds(),
      "S": date.getMilliseconds()
    };

    for (var key in regs) {
      var reg = new RegExp(`(${key})`)
      if (reg.test(frm)) {
        frm = frm.replace(reg, regs[key].toString().padStart(2, '0'))
      }
    }
    return frm
  })

  Vue.filter('humanizeCurrency', function (value, abbr) {
    if (!value) return '0'
    var account = ACCOUNT_MAP[abbr || 'feth']
    var values = (value / account.unit).toString().split('.', 2)
    //123456789->12,3456,789
    return values[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + (values[1] === undefined ? '' : `.${values[1]}`)
  })

  Vue.filter('currencyUnit', function (value) {
    value = value || 'feth'
    return value.substr(0, 4)
  })
}
