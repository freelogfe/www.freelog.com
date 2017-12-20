webpackJsonp([2],{"8Yzw":function(t,e,a){},UHGq:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("rA12"),r=a("lioW"),s=a("qsBO"),o={invalidResponse:"errorResponseHandler"},i=o,c=a("7+uW"),l={loadResourceDetail:function(t){return window.QI.fetch("//api.freelog.com/v1/resources/"+t).then(function(t){return 200===t.status?t.json():Promise.reject(t)}).then(function(t){return 0===t.ret&&0===t.errcode?t.data:Promise.reject(t)})},loadPresentableDetail:function(t){return window.QI.fetch("//api.freelog.com/v1/presentables/"+t).then(function(t){return 200===t.status?t.json():Promise.reject(t)}).then(function(t){return 0===t.ret&&0===t.errcode?t.data:Promise.reject(t)})},loadContractDetail:function(t){var e=t.contract;return this.loadPresentableDetail(e.targetId).then(function(t){return e.resourceDetail=t.tagInfo.resourceInfo,t.contractDetail=e,t.resourceDetail=t.tagInfo.resourceInfo,t})},loadPolicyDetail:function(t){var e=t.presentableId;return this.loadPresentableDetail(e).then(function(t){return t.resourceDetail=t.tagInfo.resourceInfo,t})}},u={name:"errorResponseHandler",handle:function(t,e,a){if(this.appUI=e,"function"==typeof a&&e.$on("close",function(){console.log("error response close")}),t&&t.errcode){var n=t.msg,r=t.data&&t.data.data;switch(t.errcode){case 70080104:l.loadContractDetail(r).then(this.appendDataToUI.bind(this));break;case 70080101:l.loadPolicyDetail(r).then(this.appendDataToUI.bind(this));break;case 70080202:console.log(n,r)}}},appendDataToUI:function(t){this.appUI.appendData(t),this.appUI.showAuthDialog()}},d={errorResponseHandler:u},p={init:function(t){this.appUI=t,this.bus=new c.default,this.bus.$on("freelogSystemService",this.dispatchHandler.bind(this))},dispatchHandler:function(t){var e,a=t.detail,n=a.eventName,r=a.opts;(e=d[n])?e.handle(r.data,this.appUI,r.callback):console.warn("不存在对应的异常处理函数")},trigger:function(t,e){this.bus.$emit("freelogSystemService",{detail:{eventName:t,opts:e}})}},f={isValidResponse:function(t){return t&&0===t.ret&&0===t.errcode},trigger:function(){p.trigger.apply(p,arguments)},EventCode:i};!function(){window.QI=document.querySelector(".js-lib-qi"),new n.a({el:"#app",template:'<app-view @ready="onReady"/>',components:{"app-view":r.a},methods:{onReady:function(t){this.appUI=t,window.FreeLogApp=f,p.init(t),s.a.start(),t.$on("close",function(){console.log("close app ui dialog")})}}})}();e.default=f},aXzh:function(t,e,a){},bKTp:function(t,e,a){"use strict";function n(t){a("brKg")}var r={name:"tool-bar",data:function(){return{}},mounted:function(){},methods:{showAuthDialog:function(){var t=new CustomEvent("freelogService",{detail:{action:"showAuthDialog"}});window.dispatchEvent(t)}}},s=r,o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ul",{staticClass:"tool-bar-wrap"},[t._m(0,!1,!1),t._v(" "),a("li",{staticClass:"contract-tab",attrs:{title:"合同管理"},on:{click:t.showAuthDialog}},[a("i",{staticClass:"el-icon-document"})])])},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("li",{staticClass:"user-tab",attrs:{title:"个人中心"}},[a("a",{attrs:{href:"/pages/user/index.html",target:"_blank"}},[a("i",{staticClass:"el-icon-fa-user",attrs:{"aria-hidden":"true"}})])])}],c={render:o,staticRenderFns:i},l=c,u=a("VU/8"),d=n,p=u(s,l,!1,d,"data-v-562dac57",null);e.a=p.exports},brKg:function(t,e,a){},lioW:function(t,e,a){"use strict";function n(t){function e(){f.attr("d",function(t){var e=t.target.x-t.source.x,a=t.target.y-t.source.y,n=Math.sqrt(e*e+a*a),r=e/n,s=a/n,o=t.left?17:12,i=t.right?17:12;return"M"+(t.source.x+o*r)+","+(t.source.y+o*s)+"L"+(t.target.x-i*r)+","+(t.target.y-i*s)}),h.attr("transform",function(t){return"translate("+t.x+","+t.y+")"})}function a(){f=f.data(d),f.style("marker-start",function(t){return t.left?"url(#start-arrow)":""}).style("marker-end",function(t){return t.right?"url(#end-arrow)":""}),f.enter().append("svg:path").attr("class",function(t){return t.target.data.stateClass+" link"}).style("marker-start",function(t){return t.left?"url(#start-arrow)":""}).style("marker-end",function(t){return t.right?"url(#end-arrow)":""}).on("mouseenter",function(t){var e=t.source,a=t.target,n=d3.mouse(this);l.style.opacity=1,l.style.top=n[1]+"px",l.style.left=n[0]+"px",i._opts.overlayHandler?i._opts.overlayHandler(t,l):l.innerHTML=JSON.stringify({source:e.data.state,target:a.data.state})}),f.exit().remove(),h=h.data(u,function(t){return t.id}),h.selectAll("circle").classed("reflexive",function(t){return t.reflexive});var t=h.enter().append("svg:g");t.append("svg:circle").attr("class",function(t){return"node "+(t.data.stateClass||"")}).attr("r",o).on("mouseenter",function(t){l.style.opacity=1,l.style.top=t.y-o+"px",l.style.left=t.x+1.5*o+"px",i._opts.overlayHandler?i._opts.overlayHandler(t.data,l):l.innerHTML=JSON.stringify(t.data)}),t.append("svg:text").attr("x",0).attr("y",4).attr("class","id").text(function(t){return t.id}),h.exit().remove(),p.start()}t=t||{};var n,r=t.width||960,s=t.height||500,o=(d3.scale.category10(),t.radius||20),i=this,c="string"==typeof t.container?document.querySelector(t.container):t.container;this._opts=t,n=t.container?d3.select(t.container):d3.select("body").append("svg"),n.attr("width",r).attr("height",s);var l=c.parentNode.querySelector(".js-svg-tip");l||(l=document.createElement("div"),l.classList.add("tip"),c.parentNode.appendChild(l));var u=[],d=[],p=d3.layout.force().size([r,s]).linkDistance(150).charge(-500).on("tick",e);n.append("svg:defs").append("svg:marker").attr("id","end-arrow").attr("viewBox","0 -5 10 10").attr("refX",6).attr("markerWidth",3).attr("markerHeight",3).attr("orient","auto").append("svg:path").attr("d","M0,-5L10,0L0,5").attr("fill","#000"),n.append("svg:defs").append("svg:marker").attr("id","start-arrow").attr("viewBox","0 -5 10 10").attr("refX",4).attr("markerWidth",3).attr("markerHeight",3).attr("orient","auto").append("svg:path").attr("d","M10,-5L0,0L10,5").attr("fill","#000");var f=n.append("svg:g").selectAll("path"),h=n.append("svg:g").selectAll("g");return t.nodes.forEach(function(t){u.push(t),a()}),t.links.forEach(function(t){d.push(t),a()}),this}function r(t,e){var a={id:++v,reflexive:!1,data:e};return Object.assign(a,t),a}function s(t){var e=[],a=[],n={};return t.forEach(function(t,a){t.forEach(function(t){t.stateClass=i(t);var a=r(t.pos,t);n[t.state]=a,e.push(a)})}),e.forEach(function(t){t.data.nextStates.forEach(function(e){a.push({source:t,target:n[e.state],left:!1,right:!0})})}),{nodes:e,links:a}}function o(t){var e={name:t.state,children:[]};return t.nextStates.forEach(function(t){e.children.push(o(t))}),e}function i(t){var e="is-disabled";return t.isProcess?e="is-process":t.isFinish?e="is-finish":t.isWaiting&&(e="is-wait"),t.isActive&&(e+=" is-active"),e}function c(t,e){var a=o(t.stateTreeRoot),n=e.height,r=e.width;d3.layout.tree().size([n,r]).nodes(a).forEach(function(e){var a=["depth","x","y"],n=t.stateMap[e.name];if(n){n.pos={},a.forEach(function(t){n.pos[t]=e[t]});var r=n.pos.x;n.pos.x=n.pos.y,n.pos.y=r}})}function l(t){function e(t){return{nextStates:[],targetEvents:[],state:t,isActive:i.includes(t),isProcess:t===r,deep:0}}function a(t){u[t.deep]||(u[t.deep]=[]),u[t.deep].push(t),t.nextStates.length&&t.nextStates.forEach(function(e){var n=l[e.state];n.deep=t.deep+1,(t.isProcess||t.isWaiting)&&(n.isWaiting=!0),n.isProcess&&(t.isFinish=!0),n.targetEvents.length&&n.targetEvents.forEach(function(e){l[e.nextState]&&e.nextState!==t.state&&n.nextStates.push(l[e.nextState])}),a(n),n.isFinish&&(t.isFinish=!0)})}var n,r=t.fsmState,s=t.policySegment,o=s.fsmDescription,i=s.activatedStates,c=s.initialState,l={},u=[];return o.forEach(function(t){var a=l[t.currentState]||e(t.currentState),n=l[t.nextState];a.targetEvents.push(t),n||(n=e(t.nextState),l[t.nextState]=n),t.currentState===c&&a.nextStates.push(n),l[t.currentState]=a}),n=l[c],a(n),{stateTreeRoot:n,stateMap:l,nodeList:u}}function u(t){a("yfD/")}function d(t){a("aXzh")}function p(t){a("8Yzw")}var f=a("bKTp"),h=n,v=-1,g={name:"contract-state",props:{data:{type:Object,default:function(){return null}}},data:function(){var t=this;return{popData:{},opts:{radius:12,width:400,height:200,container:null,overlayHandler:function(e){var a=Object.assign({},e);if(e.source){a.type="path",a.disabled=e.target.data.stateClass.indexOf("is-disabled")>-1;var n=e.source.data.targetEvents.filter(function(t){return t.nextState===e.target.data.state});a.event=n[0]&&n[0].event||{}}else a.type="node";a.disabled||(t.popData=a,t.$refs.popover.showPopper=!0)}}}},mounted:function(){var t=getComputedStyle(this.$refs.wrapper);this.opts.container=this.$refs.stateTree,this.opts.width=parseInt(.8*parseInt(t.width)),this.draw()},methods:{updateContractState:function(t){t.isProcess=!0,t.isActivated=!0},triggerLicense:function(t){return window.QI.fetch("//api.freelog.com/v1/contracts/signingLicenses",{method:"POST",data:t}).then(function(t){return t.json()})},triggerContractState:function(t){return window.QI.fetch("//api.freelog.com/v1/contracts/test",{method:"POST",data:t}).then(function(t){return t.json()})},activateContractHandler:function(t){function e(t){var e;e="signing"===t.type?a.triggerLicense({contractId:r,eventId:t.eventId,licenseIds:t.params}):a.triggerContractState({contractId:r,eventId:t.eventId}),Promise.resolve(e).then(function(t){0===t.ret&&0===t.errcode?(a.$message.success("操作成功"),a.updateContractState(n,i)):a.$message.error(t.msg)})}var a=this,n=a.data,r=n.contractId,s=t.source.data,o=t.target.data,i=o.state,c=s.targetEvents.filter(function(t){return t.nextState===i});if(0===c.length)return a.$message.error("没有可触发的事件");c.forEach(function(t){"compoundEvents"===t.event.type?t.event.params.forEach(function(t){e(t)}):e(t.event)})},hidePopover:function(t){["circle","path"].includes(t.target.nodeName)||this.$refs.popover.$el.contains(t.target)?t.stopPropagation():this.$refs.popover.showPopper=!1},draw:function(){if(this.data.contractId){var t=l(this.data);c(t,this.opts);var e=s(t.nodeList);Object.assign(this.opts,e),new h(this.opts)}},update:function(t){this.data=t,this.draw()}}},m=g,b=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{ref:"wrapper",staticClass:"contract-state-wrap",on:{click:t.hidePopover}},[a("el-popover",{ref:"popover",attrs:{"popper-class":"tip js-svg-tip",placement:"top",trigger:"click",width:"250"}},[a("div",[a("div",{directives:[{name:"show",rawName:"v-show",value:"node"==t.popData.type,expression:"popData.type == 'node'"}]},[a("h3",[t._v("state:"+t._s(t.popData.state))]),t._v(" "),a("ul",[a("li",[t._v("isActiveState: "+t._s(t.popData.isActive))]),t._v(" "),a("li",[t._v("isProcess: "+t._s(t.popData.isProcess))]),t._v(" "),a("li",[t._v("isFinish: "+t._s(void 0===t.popData.isFinish?"false":t.popData.isFinish))])])]),t._v(" "),"path"==t.popData.type&&t.popData.source?a("div",[a("p",[t._v("event name: "+t._s(t.popData.event.eventName))]),t._v(" "),a("p",[t._v("from "+t._s(t.popData.source.data.state)+" to "+t._s(t.popData.target.data.state))]),t._v(" "),a("el-button",{attrs:{size:"mini"},on:{click:function(e){t.activateContractHandler(t.popData)}}},[t._v("trigger")])],1):t._e()])]),t._v(" "),a("svg",{ref:"stateTree"})],1)},_=[],w={render:b,staticRenderFns:_},y=w,S=a("VU/8"),D=u,x=S(m,y,!1,D,null,null),I=x.exports,T={uncreated:-1,initial:1,running:2,activated:3,userTerminated:4,sysTerminated:5,terminated:6},C={"-1":"未创建合同",1:"未开始执行",2:"执行中",3:"生效中",4:"用户终止",5:"系统终止",6:"合同已终止"},P={name:"presentables",data:function(){return{CONTRACT_STATUS:T,CONTRACT_STATUS_ACTION_TIPS:{"-1":"去创建合同",1:"去执行",2:"去执行",3:"生效中",4:"用户终止",5:"系统终止",6:"合同已终止"}}},props:{data:{type:Array,default:function(){return null}}},mounted:function(){this.formatPresentableList(),console.log(this.data)},watch:{data:"formatPresentableList"},methods:{formatPresentableList:function(){var t=this;t.data.forEach(function(e){t.resovlePresentableStatus(e)})},resovlePresentableStatus:function(t){t.contractDetail?t.contractStatus=t.contractDetail.status:t.contractStatus=T.uncreated,t.statusTip=C[t.contractStatus]||"n/a"},tabActionHandler:function(t){var e={content:"contract-manager",data:t,title:"合同管理",name:"tab"+t.presentableId};switch(t.contractStatus){case T.uncreated:Object.assign(e,{title:"创建合同",content:"policy-manager"})}this.$emit("tabChange",e)},showPolicyDetailHandler:function(){}}},E=P,A=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-table",{ref:"tableRef",staticStyle:{width:"100%"},attrs:{data:t.data,stripe:""}},[a("el-table-column",{attrs:{label:"资源名称",prop:"tagInfo.resourceInfo.resourceName"}}),t._v(" "),a("el-table-column",{attrs:{label:"合同名称",prop:"name"}}),t._v(" "),a("el-table-column",{attrs:{label:"资源类型",prop:"tagInfo.resourceInfo.resourceType",width:"120px"}}),t._v(" "),a("el-table-column",{attrs:{label:"状态",prop:"statusTip"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center",width:"120px"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){t.tabActionHandler(e.row,e.$index)}}},[t._v("\n                    "+t._s(t.CONTRACT_STATUS_ACTION_TIPS[e.row.contractStatus])+"\n                ")])]}}])})],1)],1)},k=[],$={render:A,staticRenderFns:k},H=$,N=a("VU/8"),j=N(E,H,!1,null,null,null),L=j.exports,R={name:"contract-manager",data:function(){return{}},components:{ContractState:I},props:{data:{type:Object,default:function(){return null}}},mounted:function(){console.log(this.data)},methods:{showContractDetailHandler:function(){}}},O=R,U=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("ul",[a("li",[t._v("\n            资源名称: "+t._s(t.data.resourceDetail.resourceName)+"\n        ")]),t._v(" "),a("li",[t._v("\n            资源类型: "+t._s(t.data.resourceDetail.resourceType)+"\n        ")]),t._v(" "),a("li",[a("el-button",{attrs:{size:"mini"},on:{click:t.showContractDetailHandler}},[t._v("\n                查看合同流程\n            ")])],1),t._v(" "),a("li",[a("h3",{staticClass:"contract-title"},[t._v("合同流程")]),t._v(" "),a("contract-state",{staticClass:"contract-state-chart",attrs:{data:t.data.contractDetail}})],1)])])},F=[],W={render:U,staticRenderFns:F},q=W,M=a("VU/8"),z=d,B=M(O,q,!1,z,"data-v-bdfded6c",null),Q=B.exports,V={name:"policy-manager",data:function(){return{}},props:{data:{type:Object,default:function(){return null}}},watch:{data:"formatPolicy"},mounted:function(){this.formatPolicy()},methods:{formatPolicy:function(){this.parsePolicy(this.data)},parsePolicy:function(t){var e=[];t.policy.forEach(function(t){var a={detail:t,states:t.fsmDescription,selected:!1};e.push(a)}),this.$set(this.data,"segments",e)},signPolicyHandler:function(t){var e=this;if(!t.selectedSegmentId)return this.$message.warning("没有选择策略");var a="presentable name: "+t.name+", resource name: "+t.resourceDetail.resourceName;this.$confirm("<h3>合同详情</h3><p>"+a+"。</p>确定签约合同？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",dangerouslyUseHTMLString:!0,type:"warning"}).then(function(){window.QI.fetch("//api.freelog.com/v1/contracts",{method:"POST",data:{contractType:3,targetId:t.presentableId,segmentId:t.selectedSegmentId,serialNumber:t.serialNumber,partyTwo:window.__auth_info__.__auth_user_id__}}).then(function(t){return t.json()}).then(function(t){0===t.ret&&0===t.errcode?e.$message.success("签约成功"):e.$message.error(t.msg)})}).catch(function(){})}}},K=V,X=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("ul",[a("el-button",{on:{click:t.signPolicyHandler}},[t._v("创建合同")]),t._v(" "),t._l(t.data.segments,function(e){return a("li",{staticClass:"segment-row"},[a("span",{staticClass:"segment-detail"},[t._v("合同ID "+t._s(e.detail.segmentId))]),t._v(" "),a("el-radio",{staticClass:"select-btn",attrs:{label:e.detail.segmentId},model:{value:t.data.selectedSegmentId,callback:function(e){t.$set(t.data,"selectedSegmentId",e)},expression:"data.selectedSegmentId"}},[t._v("选择\n            ")])],1)})],2)])},J=[],G={render:X,staticRenderFns:J},Y=G,Z=a("VU/8"),tt=Z(K,Y,!1,null,null,null),et=tt.exports,at={data:function(){return{shouldShowAuthDialog:!0,presentables:[],tabs:[],activeTabName:"presentables"}},components:{ToolBar:f.a,ContractState:I,Presentables:L,"contract-manager":Q,"policy-manager":et},mounted:function(){this.$emit("ready",this)},methods:{_tabChange:function(t){console.log(t),this.tabs.some(function(e){return e.name===t.name})||this.tabs.push(t),this.activeTabName=t.name},_removeTab:function(t){var e=this,a=this.activeTabName;a===t&&this.tabs.forEach(function(n,r){if(n.name===t){var s=e.tabs[r+1]||e.tabs[r-1];a=s?s.name:null}}),this.activeTabName=a||"presentables",this.tabs=this.tabs.filter(function(e){return e.name!==t})},_closeDialogHandler:function(){this.$emit("close")},showAuthDialog:function(){this.shouldShowAuthDialog=!0},appendData:function(t){this.presentables.push(t)}}},nt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("tool-bar"),t._v(" "),a("el-dialog",{attrs:{"close-on-click-modal":!1,title:"合约管理列表",visible:t.shouldShowAuthDialog,fullscreen:!1,"custom-class":"auth-dialog",width:"50%",center:""},on:{"update:visible":function(e){t.shouldShowAuthDialog=e},close:t._closeDialogHandler}},[a("el-tabs",{attrs:{type:"border-card"},on:{"tab-remove":t._removeTab},model:{value:t.activeTabName,callback:function(e){t.activeTabName=e},expression:"activeTabName"}},[a("el-tab-pane",{attrs:{label:"presentable list",name:"presentables"}},[a("presentables",{attrs:{data:t.presentables},on:{tabChange:t._tabChange}})],1),t._v(" "),t._l(t.tabs,function(t,e){return a("el-tab-pane",{key:t.name,attrs:{closable:"",label:t.title,name:t.name}},[a(t.content,{tag:"component",attrs:{data:t.data}})],1)})],2)],1)],1)},rt=[],st={render:nt,staticRenderFns:rt},ot=st,it=a("VU/8"),ct=p,lt=it(at,ot,!1,ct,"data-v-c4bdffc0",null);e.a=lt.exports},qsBO:function(t,e,a){"use strict";function n(t){return new Promise(function(e,a){var n=document.createElement("link");n.onload=e,n.onerror=a,n.rel="import",n.href=t,document.head.appendChild(n)})}e.a={start:function(){var t=this,e=window.__auth_info__,a=e.__auth_error_info__;a?window.FreeLogApp.trigger(window.FreeLogApp.ExceptionCode.invalidResponse,a.data||{}):t.loadWidgets()},getWidgets:function(){return document.querySelector("#js-page-container").querySelectorAll(".js-wc-widget")},loadWidgets:function(){var t=this.getWidgets(),e="//api.freelog.com/v1/nodes/"+window.__auth_info__.__auth_node_id__+"/presentables/";Array.from(t).forEach(function(t){var a=t.getAttribute("data-widget-presentable-id");a&&window.QI.fetchPresentable(a+".data").then(function(t){return t.json()}).then(function(t){window.FreeLogApp.trigger(window.FreeLogApp.ExceptionCode.invalidResponse,t)}).catch(function(t){n(""+e+a+".data")})})}}},"yfD/":function(t,e,a){}},["UHGq"]);
//# sourceMappingURL=demo.315234cd3c51880a20e2.js.map