{"source":"webpackJsonp([2],{\"6UCX\":function(t,e,n){\"use strict\";var a=n(\"G3VR\"),o=n(\"HkHh\"),r=n(\"NYxO\"),s={data:function(){return{}},mounted:function(){this.user&&this.user.userId||this.$vuex.dispatch(\"checkUserSession\").then(function(t){})},computed:Object(r.b)({user:\"session\"}),components:{NavTopBar:o.a},methods:{}},c={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n(\"div\",[n(\"nav-top-bar\"),t._v(\" \"),n(\"el-container\",{staticClass:\"app-container is-vertical\"},[t.user?n(\"el-header\",{staticClass:\"header\"},[n(\"div\",{staticClass:\"banner-portrait inline\"},[n(\"a\",{attrs:{href:\"/pages/user/index.html\"}},[n(\"img\",{staticClass:\"portrait-img\",attrs:{src:\"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb_dez7L9rZGrxliWIWRzbH6H0u0BMePCrTB6wVbLtcfrAMKII\",alt:\"\"}})])]),t._v(\" \"),n(\"div\",{staticClass:\"banner-main  inline\"},[n(\"div\",{staticClass:\"banner-main-hello\"},[n(\"p\",{staticClass:\"user-name\"},[t._v(t._s(t.user.nickname))])]),t._v(\" \"),n(\"div\",{staticClass:\"banner-main-detail\"},[n(\"div\",{staticClass:\"user-account inline\"},[n(\"label\",[t._v(\"账户： \")]),t._v(t._s(t.user.mobile||t.user.email))])])])]):t._e(),t._v(\" \"),n(\"el-main\",{staticStyle:{background:\"white\"}},[n(\"div\",{attrs:{id:\"main-app\"}})])],1)],1)},staticRenderFns:[]},i=n(\"VU/8\")(s,c,!1,function(t){n(\"V3kp\")},\"data-v-596552b8\",null).exports,l=n(\"IcnI\");new a.a({el:\"#app\",store:l.a,render:function(t){return t(i)}});e.a=a.a},\"7xrK\":function(t,e,n){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});var a=n(\"6UCX\"),o=n(\"IcnI\"),r=n(\"HkHh\"),s=n(\"aIHY\"),c={name:\"clip-board\",data:function(){return{}},props:{value:String},mounted:function(){console.log(this.value)},methods:{copyHandler:function(){console.log(\"copy\");this.$refs.copyText.select();try{var t=document.execCommand(\"copy\");this.$emit(\"copyDone\",t)}catch(t){this.$emit(\"copyDone\",!1)}}}},i={render:function(){var t=this.$createElement,e=this._self._c||t;return e(\"div\",{on:{click:this.copyHandler}},[e(\"textarea\",{ref:\"copyText\",staticClass:\"clip-text\",domProps:{value:this.value}}),this._v(\" \"),this._t(\"default\")],2)},staticRenderFns:[]},l={name:\"account-list\",data:function(){return{cardStyle:{padding:\"5px\",\"min-height\":\"150px\",display:\"flex\",\"justify-content\":\"center\",\"align-items\":\"center\",\"flex-wrap\":\"wrap\"},accounts:[]}},components:{ClipBoard:n(\"VU/8\")(c,i,!1,function(t){n(\"Vvxu\")},\"data-v-eaf1796a\",null).exports},mounted:function(){var t=this;this.loadAssets().then(this.formatAssets.bind(this)).then(function(e){t.accounts=e})},methods:{handleCommand:function(t){switch(t.type){case\"detail\":this.viewAccountDetail(t.data);break;case\"download\":this.downloadKeyStore(t.data.cardNo);break;case\"clear\":this.clearKeyStore(t.data.cardNo);break;case\"pay\":this.gotoPayHandler(t.data)}},viewAccountDetail:function(t){location.href=\"/pages/account/detail.html?accountId=\"+t.accountId},gotoPayHandler:function(t){location.href=\"/pages/transfer.html?fromAccountId=\"+t.accountId},downloadFile:function(t,e){var n=document.createElement(\"a\"),a=new Blob([e]);n.download=t,n.href=URL.createObjectURL(a),document.body.appendChild(n),n.click(),n.remove()},downloadKeyStore:function(t){var e=this;return this.$axios.get(\"/v1/pay/accounts/downLoadKeyStore\",{params:{address:t}}).then(function(n){try{var a=new Blob([JSON.stringify(n.data,null,2)],{type:\"application/json\"});e.downloadFile(t,a)}catch(t){e.$message.error(t)}}).catch(function(t){console.log(t)})},clearKeyStore:function(t){var e=this;this.$confirm(\"确定清除服务器上的keystore文件？\").then(function(n){return e.$axios.get(\"/v1/pay/accounts/clearKeyStore\",{params:{address:t}}).then(function(t){console.log(t.data);var n=t.data;0===n.ret&&0===n.errcode?e.$message.success(\"成功清除\"):e.$message.error(n.msg)}).catch(function(t){console.log(t)})}).catch(function(t){})},formatAssets:function(t){return console.log(t),t.forEach(function(t){t.showDetail=s.a[t.accountType]}),t},copyDoneHandler:function(t){t?this.$message.success(\"复制成功\"):this.$message.error(\"复制失败\")},loadAssets:function(){return this.$axios.get(\"/v1/pay/accounts\").then(function(t){return t.data.data}).catch(function(t){console.log(t)})}}},d={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n(\"div\",{staticClass:\"assets-wrap\"},[n(\"el-row\",[t._l(t.accounts,function(e,a){return n(\"el-col\",{key:a,attrs:{span:6}},[n(\"el-card\",{staticClass:\"account-card\",attrs:{\"body-style\":t.cardStyle}},[n(\"p\",{staticClass:\"account-card-info\"},[n(\"label\",[t._v(\"币种\")]),t._v(\"\\n          \"+t._s(e.showDetail.name))]),t._v(\" \"),n(\"p\",{staticClass:\"account-card-info\"},[n(\"label\",[t._v(\"账户地址\")]),t._v(\" \"),e.accountId?n(\"el-tooltip\",{staticClass:\"item\",attrs:{effect:\"dark\",content:e.accountId,placement:\"top\"}},[n(\"clip-board\",{on:{copyDone:t.copyDoneHandler},model:{value:e.accountId,callback:function(n){t.$set(e,\"accountId\",n)},expression:\"account.accountId\"}},[n(\"a\",{attrs:{href:\"javascript:;\"}},[n(\"i\",{staticClass:\"el-icon-fa-clipboard\"})])])],1):n(\"span\",[t._v(\"账户不存在\")])],1),t._v(\" \"),n(\"p\",{staticClass:\"account-card-info\"},[n(\"label\",[t._v(\"账户余额\")]),n(\"span\",[t._v(t._s(t._f(\"humanizeCurrency\")(e.balance))+\" \"+t._s(e.showDetail.abbr))])]),t._v(\" \"),1===e.status?n(\"p\",{staticClass:\"account-card-info\"},[n(\"el-dropdown\",{on:{command:t.handleCommand}},[n(\"span\",{staticClass:\"el-dropdown-link\"},[t._v(\"\\n                                          账户操作\"),n(\"i\",{staticClass:\"el-icon-arrow-down el-icon--right\"})]),t._v(\" \"),n(\"el-dropdown-menu\",{attrs:{slot:\"dropdown\"},slot:\"dropdown\"},[n(\"el-dropdown-item\",{attrs:{command:{type:\"detail\",data:e}}},[t._v(\"\\n                详情\\n              \")]),t._v(\" \"),n(\"el-dropdown-item\",{attrs:{command:{type:\"pay\",data:e}}},[t._v(\"\\n                去转账\\n              \")]),t._v(\" \"),n(\"el-dropdown-item\",{attrs:{command:{type:\"download\",data:e}}},[t._v(\"下载keystore\\n              \")]),t._v(\" \"),n(\"el-dropdown-item\",{attrs:{command:{type:\"clear\",data:e}}},[t._v(\"清除下载keystore\\n              \")])],1)],1)],1):t._e()])],1)}),t._v(\" \"),n(\"el-col\",{attrs:{span:6}},[n(\"el-card\",{staticClass:\"account-card\",attrs:{\"body-style\":t.cardStyle}},[n(\"a\",{staticClass:\"add-account-btn\",attrs:{href:\"/pages/account/create.html\"}},[n(\"p\",[n(\"i\",{staticClass:\"el-icon-plus\"})]),t._v(\" \"),n(\"p\",[t._v(\"添加账户\")])])])],1)],2)],1)},staticRenderFns:[]},u=n(\"VU/8\")(l,d,!1,function(t){n(\"o6gi\")},\"data-v-5ca7da02\",null).exports,f=n(\"kIFb\"),p=n(\"NYxO\"),v={name:\"contract-list\",data:function(){return{contracts:[]}},mounted:function(){var t=this,e=this.user;e&&e.userId&&this.loadContracts(e.userId).then(this.loadResourcesDetail.bind(this)).then(this.format.bind(this)).then(function(e){t.contracts=e})},computed:Object(p.b)({user:\"session\"}),methods:{format:function(t){var e=[];return t.forEach(function(t){t.resourceDetail&&(t._statusInfo=f.b[t.status],e.push(t))}),e},viewDetailHandler:function(t){location.href=\"/pages/trade/detail.html?contractId=\"+t.contractId},loadResource:function(t){var e=this;return new Promise(function(n){e.$axios.get(\"/v1/resources/\"+t).then(function(t){n(0===t.data.errcode?t.data.data:null)}).catch(function(){n(null)})})},loadResourcesDetail:function(t){var e=this,n=[];return t.forEach(function(t){n.push(e.loadResource(t.resourceId))}),Promise.all(n).then(function(e){var n={};return e.forEach(function(t){t&&(n[t.resourceId]=t)}),t.forEach(function(t){t.resourceDetail=n[t.resourceId]||null}),t})},loadContracts:function(t){return this.$axios.get(\"/v1/contracts\",{params:{contractType:3,partyTwo:t}}).then(function(t){if(0===t.data.errcode){var e=t.data.data;return e&&e.dataList||[]}throw new Error(t.data.msg)}).catch(function(t){console.log(t)})}}},h={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n(\"div\",{staticClass:\"contracts-wrap\"},[n(\"el-table\",{staticStyle:{width:\"100%\"},attrs:{data:t.contracts}},[n(\"el-table-column\",{attrs:{label:\"日期\"},scopedSlots:t._u([{key:\"default\",fn:function(e){return[n(\"a\",[t._v(t._s(t._f(\"fmtDate\")(e.row.createDate)))])]}}])}),t._v(\" \"),n(\"el-table-column\",{attrs:{prop:\"resourceDetail.resourceName\",label:\"资源名\"}}),t._v(\" \"),n(\"el-table-column\",{attrs:{prop:\"resourceDetail.resourceType\",label:\"资源类型\"}}),t._v(\" \"),n(\"el-table-column\",{attrs:{prop:\"address\",label:\"合同状态\"},scopedSlots:t._u([{key:\"default\",fn:function(e){return[n(\"el-tag\",{attrs:{type:e.row._statusInfo.type}},[t._v(t._s(e.row._statusInfo.desc))])]}}])}),t._v(\" \"),n(\"el-table-column\",{scopedSlots:t._u([{key:\"default\",fn:function(e){return[n(\"el-dropdown\",{attrs:{\"split-button\":\"\",type:\"primary\"},on:{click:function(n){t.viewDetailHandler(e.row)}}},[t._v(\"\\n          详情\\n          \"),n(\"el-dropdown-menu\",{attrs:{slot:\"dropdown\"},slot:\"dropdown\"},[n(\"el-dropdown-item\",[t._v(\"操作1\")]),t._v(\" \"),n(\"el-dropdown-item\",[t._v(\"操作2\")]),t._v(\" \"),n(\"el-dropdown-item\",[t._v(\"操作3\")])],1)],1)]}}])})],1)],1)},staticRenderFns:[]},m=n(\"VU/8\")(v,h,!1,function(t){n(\"Nt86\")},\"data-v-06c578c1\",null).exports,_=n(\"nOLo\"),b={name:\"user-order-list\",data:function(){return{orders:[]}},mounted:function(){var t=this;this.loadOrders().then(this.loadOrderDetail.bind(this)).then(this.format.bind(this)).then(function(e){t.orders=e||[]})},methods:{format:function(t){var e=[];return t&&t.forEach(function(t){t._statusInfo=_.a[t.status],e.push(t)}),e},loadResources:function(t){var e=this,n={},a=t.map(function(t){return n[t.resourceId]=t,e.$axios.get(\"/v1/resources/\"+t.resourceId).then(function(t){return t.data.data})});return Promise.all(a).then(function(t){return t.forEach(function(t){n[t.resourceId]&&Object.assign(n[t.resourceId],t)}),Object.values(n)})},mergeResinOrder:function(t,e){var n={};return e.forEach(function(t){n[t.targetId]=t}),t.forEach(function(t){n[t.contractId]&&(n[t.contractId].contractDetail=t)}),Object.values(n)},loadOrderDetail:function(t){var e=this;return new Promise(function(n){var a=t.map(function(t){return t.targetId});e.$axios.get(\"/v1/contracts/contractRecords\",{params:{contractIds:a.join(\",\")}}).then(function(a){if(0===a.data.errcode)return e.loadResources(a.data.data).then(function(n){return e.mergeResinOrder(n,t)}).then(n);n(null)}).catch(function(t){console.error(t),n(null)})})},viewDetailHandler:function(t){location.href=\"/pages/order/detail.html?orderId=\"+t.orderId},loadResource:function(t){var e=this;return new Promise(function(n){e.$axios.get(\"/v1/resources/\"+t).then(function(t){n(0===t.data.errcode?t.data.data:null)}).catch(function(){n(null)})})},loadOrders:function(){return this.$axios.get(\"/v1/pay\").then(function(t){if(0===t.data.errcode){var e=t.data.data;return e&&e.dataList||[]}throw new Error(t.data.msg)}).catch(function(t){console.log(t)})}}},w={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n(\"div\",{staticClass:\"contracts-wrap\"},[n(\"el-table\",{staticStyle:{width:\"100%\"},attrs:{data:t.orders}},[n(\"el-table-column\",{attrs:{label:\"日期\"},scopedSlots:t._u([{key:\"default\",fn:function(e){return[n(\"a\",[t._v(t._s(t._f(\"fmtDate\")(e.row.createDate)))])]}}])}),t._v(\" \"),n(\"el-table-column\",{attrs:{prop:\"contractDetail.resourceName\",label:\"资源名\"}}),t._v(\" \"),n(\"el-table-column\",{attrs:{prop:\"contractDetail.resourceType\",label:\"资源类型\"}}),t._v(\" \"),n(\"el-table-column\",{attrs:{prop:\"orderId\",width:\"210\",label:\"订单号\"}}),t._v(\" \"),n(\"el-table-column\",{attrs:{prop:\"address\",label:\"订单状态\"},scopedSlots:t._u([{key:\"default\",fn:function(e){return[t._v(\"\\n        \"+t._s(e.row._statusInfo.desc)+\"\\n      \")]}}])}),t._v(\" \"),n(\"el-table-column\",{scopedSlots:t._u([{key:\"default\",fn:function(e){return[n(\"el-dropdown\",{attrs:{\"split-button\":\"\",type:\"primary\"},on:{click:function(n){t.viewDetailHandler(e.row)}}},[t._v(\"\\n          详情\\n          \"),n(\"el-dropdown-menu\",{attrs:{slot:\"dropdown\"},slot:\"dropdown\"},[n(\"el-dropdown-item\",[t._v(\"操作1\")]),t._v(\" \"),n(\"el-dropdown-item\",[t._v(\"操作2\")]),t._v(\" \"),n(\"el-dropdown-item\",[t._v(\"操作3\")])],1)],1)]}}])})],1)],1)},staticRenderFns:[]},y=n(\"VU/8\")(b,w,!1,function(t){n(\"Dl1y\")},\"data-v-a8f0571a\",null).exports,g={data:function(){return{activeTabName:\"trade\"}},mounted:function(){},components:{NavTopBar:r.a,AccountList:u,ContractList:m,UserOrderList:y},methods:{}},C={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n(\"div\",{attrs:{id:\"app\"}},[n(\"div\",{staticClass:\"main-content\"},[n(\"el-main\",[n(\"account-list\"),t._v(\" \"),n(\"div\",{staticClass:\"main-content\"},[n(\"el-tabs\",{model:{value:t.activeTabName,callback:function(e){t.activeTabName=e},expression:\"activeTabName\"}},[n(\"el-tab-pane\",{attrs:{label:\"已购买资源\",name:\"trade\"}},[n(\"contract-list\")],1),t._v(\" \"),n(\"el-tab-pane\",{attrs:{label:\"支付订单\",name:\"orders\"}},[n(\"user-order-list\")],1)],1)],1)],1)],1)])},staticRenderFns:[]},I=n(\"VU/8\")(g,C,!1,function(t){n(\"laAO\")},\"data-v-971c64cc\",null).exports;!function(t){new a.a(Object.assign({el:\"#main-app\",store:o.a},t))}({render:function(t){return t(I)}})},Dl1y:function(t,e,n){},H4bk:function(t,e,n){},HkHh:function(t,e,n){\"use strict\";var a=n(\"NYxO\"),o={name:\"nav-top-bar\",data:function(){return{}},computed:Object(a.b)({userInfo:\"session\"}),mounted:function(){this.checkLoginStatus()},methods:{checkLoginStatus:function(){this.user&&this.user.userId||this.$vuex.dispatch(\"checkUserSession\").then(function(t){})},logoutHandler:function(){var t=this;this.$axios.get(\"/v1/passport/logout\").then(function(){t.$vuex.dispatch(\"logout\")})},handleNavTopCommand:function(t){switch(t){case\"gotoAccountSetting\":location.href=\"/pages/account/security.html\"}}}},r={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n(\"div\",{staticClass:\"nav-top-wrapper\"},[t.userInfo?n(\"div\",{staticClass:\"nav-top-container\"},[n(\"ul\",{staticClass:\"nav-top-right\"},[n(\"li\",{staticClass:\"nav-top-item\"},[n(\"el-dropdown\",{on:{command:t.handleNavTopCommand}},[n(\"span\",{staticClass:\"el-dropdown-link\"},[t._v(\"\\n                      \"+t._s(t.userInfo.nickname)),n(\"i\",{staticClass:\"el-icon-arrow-down el-icon--right\"})]),t._v(\" \"),n(\"el-dropdown-menu\",{attrs:{slot:\"dropdown\"},slot:\"dropdown\"},[n(\"el-dropdown-item\",{attrs:{command:\"gotoAccountSetting\"}},[t._v(\"账户设置\")])],1)],1)],1),t._v(\" \"),n(\"li\",{staticClass:\"nav-top-item\",on:{click:t.logoutHandler}},[t._v(\"退出\")]),t._v(\" \"),t._m(0)])]):t._e()])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e(\"li\",{staticClass:\"nav-top-item\"},[e(\"a\",{attrs:{href:\"/pages/user/index.html\"}},[this._v(\"我的feth\")])])}]},s=n(\"VU/8\")(o,r,!1,function(t){n(\"H4bk\")},\"data-v-3c0b87cc\",null);e.a=s.exports},Nt86:function(t,e,n){},V3kp:function(t,e,n){},Vvxu:function(t,e,n){},kIFb:function(t,e,n){\"use strict\";n.d(e,\"a\",function(){return a}),n.d(e,\"b\",function(){return o});var a={uncreated:-1,initial:1,running:2,activated:3,userTerminated:4,sysTerminated:5,terminated:6,invalid:0},o={\"-1\":{type:\"danger\",desc:\"未创建合同\"},1:{type:\"warning\",desc:\"未开始执行\"},2:{type:\"warning\",desc:\"执行中\"},3:{type:\"success\",desc:\"生效中\"},4:{type:\"info\",desc:\"用户终止\"},5:{type:\"info\",desc:\"系统终止\"},6:{type:\"info\",desc:\"合同已终止\"}}},laAO:function(t,e,n){},nOLo:function(t,e,n){\"use strict\";e.a={1:{value:1,desc:\"支付进行中\"},2:{value:2,desc:\"已支付成功\"},3:{value:3,desc:\"支付失败\"}}},o6gi:function(t,e,n){}},[\"7xrK\"]);"}