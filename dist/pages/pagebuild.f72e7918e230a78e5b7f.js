webpackJsonp([2],{"6NG4":function(t,e,a){},GQ7r:function(t,e,a){},OOtv:function(t,e,a){},XTzU:function(t,e,a){"use strict";function n(t){a("6NG4")}function r(t){function e(){f.attr("d",function(t){var e=t.target.x-t.source.x,a=t.target.y-t.source.y,n=Math.sqrt(e*e+a*a),r=e/n,s=a/n,o=t.left?17:12,i=t.right?17:12;return"M"+(t.source.x+o*r)+","+(t.source.y+o*s)+"L"+(t.target.x-i*r)+","+(t.target.y-i*s)}),h.attr("transform",function(t){return"translate("+t.x+","+t.y+")"})}function a(){f=f.data(d),f.style("marker-start",function(t){return t.left?"url(#start-arrow)":""}).style("marker-end",function(t){return t.right?"url(#end-arrow)":""}),f.enter().append("svg:path").attr("class",function(t){return t.target.data.stateClass+" link"}).style("marker-start",function(t){return t.left?"url(#start-arrow)":""}).style("marker-end",function(t){return t.right?"url(#end-arrow)":""}).on("click",function(t){var e=t.source,a=t.target,n=d3.mouse(this);l.style.opacity=1,l.style.top=n[1]+"px",l.style.left=n[0]+"px",i._opts.overlayHandler?i._opts.overlayHandler(t,l):l.innerHTML=JSON.stringify({source:e.data.state,target:a.data.state})}),f.exit().remove(),h=h.data(u,function(t){return t.id}),h.selectAll("circle").classed("reflexive",function(t){return t.reflexive});var t=h.enter().append("svg:g");t.append("svg:circle").attr("class",function(t){return"node "+(t.data.stateClass||"")}).attr("r",o).on("click",function(t){l.style.opacity=1,l.style.top=t.y-o+"px",l.style.left=t.x+1.5*o+"px",i._opts.overlayHandler?i._opts.overlayHandler(t.data,l):l.innerHTML=JSON.stringify(t.data)}),t.append("svg:text").attr("x",0).attr("y",4).attr("class","id").text(function(t){return t.id}),h.exit().remove(),p.start()}t=t||{};var n,r=t.width||960,s=t.height||500,o=(d3.scale.category10(),t.radius||20),i=this,c="string"==typeof t.container?document.querySelector(t.container):t.container;this._opts=t,n=t.container?d3.select(t.container):d3.select("body").append("svg"),n.attr("width",r).attr("height",s);var l=c.parentNode.querySelector(".js-svg-tip");l||(l=document.createElement("div"),l.classList.add("tip"),c.parentNode.appendChild(l));var u=[],d=[],p=d3.layout.force().size([r,s]).linkDistance(150).charge(-500).on("tick",e);n.append("svg:defs").append("svg:marker").attr("id","end-arrow").attr("viewBox","0 -5 10 10").attr("refX",6).attr("markerWidth",3).attr("markerHeight",3).attr("orient","auto").append("svg:path").attr("d","M0,-5L10,0L0,5").attr("fill","#000"),n.append("svg:defs").append("svg:marker").attr("id","start-arrow").attr("viewBox","0 -5 10 10").attr("refX",4).attr("markerWidth",3).attr("markerHeight",3).attr("orient","auto").append("svg:path").attr("d","M10,-5L0,0L10,5").attr("fill","#000");var f=n.append("svg:g").selectAll("path"),h=n.append("svg:g").selectAll("g");return t.nodes.forEach(function(t){u.push(t),a()}),t.links.forEach(function(t){d.push(t),a()}),this}function s(t,e){var a={id:++k,reflexive:!1,data:e};return Object.assign(a,t),a}function o(t){var e=[],a=[],n={};return t.forEach(function(t,a){t.forEach(function(t){t.stateClass=c(t);var a=s(t.pos,t);n[t.state]=a,e.push(a)})}),e.forEach(function(t){t.data.nextStates.forEach(function(e){a.push({source:t,target:n[e.state],left:!1,right:!0})})}),{nodes:e,links:a}}function i(t){var e={name:t.state,children:[]};return t.nextStates.forEach(function(t){e.children.push(i(t))}),e}function c(t){var e="is-disabled";return t.isProcess?e="is-process":t.isFinish?e="is-finish":t.isWaiting&&(e="is-wait"),t.isActive&&(e+=" is-active"),e}function l(t,e){var a=i(t.stateTreeRoot),n=e.height,r=e.width;d3.layout.tree().size([n,r]).nodes(a).forEach(function(e){var a=["depth","x","y"],n=t.stateMap[e.name];if(n){n.pos={},a.forEach(function(t){n.pos[t]=e[t]});var r=n.pos.x;n.pos.x=n.pos.y,n.pos.y=r}})}function u(t){function e(t){return{nextStates:[],targetEvents:[],state:t,isActive:i.includes(t),isProcess:t===r,deep:0}}function a(t){u[t.deep]||(u[t.deep]=[]),u[t.deep].push(t),t.nextStates.length&&t.nextStates.forEach(function(e){var n=l[e.state];n.deep=t.deep+1,(t.isProcess||t.isWaiting)&&(n.isWaiting=!0),n.isProcess&&(t.isFinish=!0),n.targetEvents.length&&n.targetEvents.forEach(function(e){l[e.nextState]&&e.nextState!==t.state&&n.nextStates.push(l[e.nextState])}),a(n),n.isFinish&&(t.isFinish=!0)})}var n,r=t.fsmState,s=t.policySegment,o=s.fsmDescription,i=s.activatedStates,c=s.initialState,l={},u=[];return o.forEach(function(t){var a=l[t.currentState]||e(t.currentState),n=l[t.nextState];a.targetEvents.push(t),n||(n=e(t.nextState),l[t.nextState]=n),t.currentState===c&&a.nextStates.push(n),l[t.currentState]=a}),n=l[c],a(n),console.log(n),{stateTreeRoot:n,stateMap:l,nodeList:u}}function d(t){a("GQ7r")}function p(t){return new Promise(function(e,a){var n=document.createElement("link");n.onload=e,n.onerror=a,n.rel="import",n.href=t,document.head.appendChild(n)})}function f(t){a("OOtv")}Object.defineProperty(e,"__esModule",{value:!0});var h=a("rA12"),v={name:"tool-bar",data:function(){return{}},mounted:function(){},methods:{showAuthDialog:function(){var t=new CustomEvent("freelogService",{detail:{action:"showAuthDialog"}});window.dispatchEvent(t)}}},g=v,m=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ul",{staticClass:"tool-bar-wrap"},[t._m(0,!1,!1),t._v(" "),a("li",{staticClass:"contract-tab",attrs:{title:"合同管理"},on:{click:t.showAuthDialog}},[a("i",{staticClass:"el-icon-document"})])])},w=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("li",{staticClass:"user-tab",attrs:{title:"个人中心"}},[a("a",{attrs:{href:"/pages/user/index.html",target:"_blank"}},[a("i",{staticClass:"el-icon-fa-user",attrs:{"aria-hidden":"true"}})])])}],_={render:m,staticRenderFns:w},y=_,b=a("VU/8"),S=n,x=b(g,y,!1,S,"data-v-e3ced89c",null),D=x.exports,I=r,k=-1,E={name:"contract-state",props:{contract:{type:Object,default:function(){return null}}},data:function(){var t=this;return{data:null,popData:{},opts:{radius:12,width:400,height:200,container:null,overlayHandler:function(e){var a=Object.assign({},e);if(console.log(e),e.source){a.type="path",a.disabled=e.target.data.stateClass.indexOf("is-disabled")>-1;var n=e.source.data.targetEvents.filter(function(t){return t.nextState===e.target.data.state});a.event=n[0]&&n[0].event||{}}else a.type="node";a.disabled||(t.popData=a,t.$refs.popover.showPopper=!0)}}}},mounted:function(){var t=getComputedStyle(this.$refs.wrapper);this.opts.container=this.$refs.stateTree,this.opts.width=parseInt(.8*parseInt(t.width)),console.log(this.contract),this.draw()},methods:{updateContractState:function(t){t.isProcess=!0,t.isActivated=!0},triggerLicense:function(t){return window.QI.fetch("//api.freelog.com/v1/contracts/signingLicenses",{method:"POST",data:t}).then(function(t){return t.json()})},triggerContractState:function(t){return window.QI.fetch("//api.freelog.com/v1/contracts/test",{method:"POST",data:t}).then(function(t){return t.json()})},activateContractHandler:function(t){function e(t){var e;e="signing"===t.type?a.triggerLicense({contractId:r,eventId:t.eventId,licenseIds:t.params}):a.triggerContractState({contractId:r,eventId:t.eventId}),Promise.resolve(e).then(function(t){0===t.ret&&0===t.errcode?(a.$message.success("操作成功"),a.updateContractState(n,i)):a.$message.error(t.msg)})}var a=this,n=a.contract,r=n.contractId,s=t.source.data,o=t.target.data,i=o.state,c=s.targetEvents.filter(function(t){return t.nextState===i});if(0===c.length)return a.$message.error("没有可触发的事件");c.forEach(function(t){"compoundEvents"===t.event.type?t.event.params.forEach(function(t){e(t)}):e(t.event)})},hidePopover:function(t){["circle","path"].includes(t.target.nodeName)||this.$refs.popover.$el.contains(t.target)?t.stopPropagation():this.$refs.popover.showPopper=!1},draw:function(){if(this.contract.contractId){var t=u(this.contract);l(t,this.opts);var e=o(t.nodeList);Object.assign(this.opts,e),new I(this.opts)}},update:function(t){this.contract=t,this.draw()}}},C=E,P=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{ref:"wrapper",staticClass:"contract-state-wrap",on:{click:t.hidePopover}},[a("el-popover",{ref:"popover",attrs:{"popper-class":"tip js-svg-tip",placement:"top",trigger:"click",width:"250"}},[a("div",[a("div",{directives:[{name:"show",rawName:"v-show",value:"node"==t.popData.type,expression:"popData.type == 'node'"}]},[a("h3",[t._v("state:"+t._s(t.popData.state))]),t._v(" "),a("ul",[a("li",[t._v("isActiveState: "+t._s(t.popData.isActive))]),t._v(" "),a("li",[t._v("isProcess: "+t._s(t.popData.isProcess))]),t._v(" "),a("li",[t._v("isFinish: "+t._s(void 0===t.popData.isFinish?"false":t.popData.isFinish))])])]),t._v(" "),"path"==t.popData.type&&t.popData.source?a("div",[a("p",[t._v("event name: "+t._s(t.popData.event.eventName))]),t._v(" "),a("p",[t._v("from "+t._s(t.popData.source.data.state)+" to "+t._s(t.popData.target.data.state))]),t._v(" "),a("el-button",{attrs:{size:"mini"},on:{click:function(e){t.activateContractHandler(t.popData)}}},[t._v("trigger")])],1):t._e()])]),t._v(" "),a("svg",{ref:"stateTree"})],1)},$=[],A={render:P,staticRenderFns:$},H=A,T=a("VU/8"),j=d,N=T(C,H,!1,j,null,null),O=N.exports,L={data:function(){return{policies:[],contracts:[],policyData:null,contractData:null,shouldShowAuthDialog:!0,contractStateData:{}}},components:{ToolBar:D,ContractState:O},mounted:function(){var t=this,e=window.__auth_info__,a=e.__auth_error_info__||{};window.addEventListener("freelogService",t.serviceDispatchHandler.bind(t),!1),this.checkAuthHandler(a.data||{}).then(function(){t.$widgets=t.getWidgets(),t.loadWidgets()})},methods:{debugHandler:function(){},showAuthDialog:function(){this.shouldShowAuthDialog=!0},serviceDispatchHandler:function(t){var e=t.detail,a=e.data,n=e.action;if(this[n])this[n](e);else switch(n){case"authService":this.checkAuthHandler(a.data,a.msg);break;default:console.warn("没有定义的服务")}},showPolicyDetailHandler:function(t,e){this.$refs.policyTable.toggleRowExpansion(t,!0)},showContractDetailHandler:function(t,e){t.expanded=!0,this.$refs.contractTable.toggleRowExpansion(t,!0)},signPolicyHandler:function(t,e){var a=this;if(!t.selectedSegmentId)return this.$message.warning("没有选择策略");var n="presentable name: "+t.name+", resource name: "+t.tagInfo.resourceInfo.resourceName;this.$confirm("合同详情："+n+"。确定签约合同？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",dangerouslyUseHTMLString:!0,type:"warning"}).then(function(){window.QI.fetch("//api.freelog.com/v1/contracts",{method:"POST",data:{contractType:3,targetId:t.presentableId,segmentId:t.selectedSegmentId,serialNumber:t.serialNumber,partyTwo:window.__auth_info__.__auth_user_id__}}).then(function(t){return t.json()}).then(function(t){0===t.ret&&0===t.errcode?(a.policies.splice(e,1),a.$message.success("签约成功"),a.resolveContract({contract:t.data})):a.$message.error(t.msg)})}).catch(function(){})},getWidgets:function(){return document.querySelector("#js-page-container").querySelectorAll(".js-wc-widget")},loadResourceDetail:function(t){return window.QI.fetch("//api.freelog.com/v1/resources/"+t).then(function(t){return 200===t.status?t.json():Promise.reject(t)}).then(function(t){return 0===t.ret&&0===t.errcode?t.data:Promise.reject(t)})},loadContractDetail:function(t){var e=this,a=t.contract;this.loadResourceDetail(a.resourceId).then(function(t){a.resourceDetail=t,e.contracts.push(a)})},checkAuthHandler:function(t,e){var a=this,n=this;return new Promise(function(r,s){if(t&&t.authResult)switch(n.showAuthDialog(),t.authResult.authErrorCode){case 70080104:a.loadContractDetail(t.data);break;case 70080101:a.loadPolicyDetail(t.data);break;case 70080202:console.log(e,t.data),n.$message.warning(e);break;default:r()}else r()})},loadPolicyDetail:function(t){var e=this,a=t.presentableId,n="//api.freelog.com/v1/presentables/"+a;window.QI.fetch(n).then(function(t){return t.json()}).then(function(t){var n=e.parsePolicy(t.data,a);n.presentableId=a,e.policies.push(n)})},parsePolicy:function(t){var e=t,a=e;return Object.assign(a,{segments:[],selectedSegmentId:""}),e.policy.forEach(function(t){var e={detail:t,states:t.fsmDescription,selected:!1};a.segments.push(e)}),a},loadWidgets:function(){var t=this,e=this.$widgets,a="//api.freelog.com/v1/nodes/"+window.__auth_info__.__auth_node_id__+"/presentables/";Array.from(e).forEach(function(e){var n=e.getAttribute("data-widget-presentable-id");n&&window.QI.fetchPresentable(n+".data").then(function(t){return t.text()}).then(function(e){try{var r=JSON.parse(e);t.checkAuthHandler(r.data,r.msg)}catch(t){var s=a+(n+".data");p(s)}})})}}},R=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("tool-bar"),t._v(" "),a("el-dialog",{attrs:{"close-on-click-modal":!1,title:"签约",visible:t.shouldShowAuthDialog,fullscreen:!1,"custom-class":"auth-dialog",width:"50%",center:""},on:{"update:visible":function(e){t.shouldShowAuthDialog=e}}},[a("el-tabs",{attrs:{type:"border-card",value:"contract"}},[a("el-tab-pane",{attrs:{label:"签约合同"}},[a("el-table",{ref:"policyTable",staticStyle:{width:"100%"},attrs:{data:t.policies,stripe:""}},[a("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("ul",t._l(e.row.segments,function(n){return a("li",{staticClass:"segment-row"},[a("span",{staticClass:"segment-detail"},[t._v("合同ID "+t._s(n.detail.segmentId))]),t._v(" "),a("el-radio",{staticClass:"select-btn",attrs:{label:n.detail.segmentId},model:{value:e.row.selectedSegmentId,callback:function(a){t.$set(e.row,"selectedSegmentId",a)},expression:"scope.row.selectedSegmentId"}},[t._v("选择\n                                    ")])],1)}))]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"合同名称",prop:"name"}}),t._v(" "),a("el-table-column",{attrs:{label:"资源名称",prop:"tagInfo.resourceInfo.resourceName"}}),t._v(" "),a("el-table-column",{attrs:{label:"资源类型",prop:"tagInfo.resourceInfo.resourceType",width:"120px"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center",width:"120px"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{directives:[{name:"show",rawName:"v-show",value:!!e.row.selectedSegmentId,expression:"!!scope.row.selectedSegmentId"}],attrs:{size:"mini"},on:{click:function(a){t.signPolicyHandler(e.row,e.$index)}}},[t._v("\n                                签约\n                            ")]),t._v(" "),a("el-button",{directives:[{name:"show",rawName:"v-show",value:!e.row.selectedSegmentId,expression:"!scope.row.selectedSegmentId"}],attrs:{size:"mini"},on:{click:function(a){t.showPolicyDetailHandler(e.row,e.$index)}}},[t._v("\n                                查看合同\n                            ")])]}}])})],1)],1),t._v(" "),a("el-tab-pane",{attrs:{label:"合同管理",name:"contract"}},[a("el-table",{ref:"contractTable",staticStyle:{width:"100%"},attrs:{stripe:"",data:t.contracts}},[a("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("h3",{staticClass:"contract-title"},[t._v("合同流程")]),t._v(" "),a("contract-state",{staticClass:"contract-state-chart",attrs:{contract:e.row}})]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"合同ID",prop:"contractId",width:"240px"}}),t._v(" "),a("el-table-column",{attrs:{label:"资源名称",prop:"resourceDetail.resourceName"}}),t._v(" "),a("el-table-column",{attrs:{label:"资源类型",prop:"resourceDetail.resourceType",width:"120px"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center",width:"150px"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){t.showContractDetailHandler(e.row,e.$index)}}},[t._v("\n                                查看合同流程\n                            ")])]}}])})],1)],1)],1)],1)],1)},F=[],M={render:R,staticRenderFns:F},Q=M,W=a("VU/8"),z=f,q=W(L,Q,!1,z,"data-v-679d58a3",null),U=q.exports;window.QI=document.querySelector(".js-lib-qi"),new h.a({el:"#app",render:function(t){return t(U)}})}},["XTzU"]);
//# sourceMappingURL=pagebuild.f72e7918e230a78e5b7f.js.map