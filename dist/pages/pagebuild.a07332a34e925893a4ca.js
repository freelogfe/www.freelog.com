webpackJsonp([2],{"9xuP":function(t,e,a){},OTtC:function(t,e,a){},XTzU:function(t,e,a){"use strict";function n(t){a("9xuP")}function s(t){return new Promise(function(e,a){var n=document.createElement("link");n.onload=e,n.onerror=a,n.rel="import",n.href=t,document.head.appendChild(n)})}function r(t){a("OTtC")}Object.defineProperty(e,"__esModule",{value:!0});var o=a("rA12"),i={name:"tool-bar",data:function(){return{}},mounted:function(){},methods:{showAuthDialog:function(){var t=new CustomEvent("freelogService",{detail:{action:"showAuthDialog"}});window.dispatchEvent(t)}}},c=i,l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ul",{staticClass:"tool-bar-wrap"},[t._m(0,!1,!1),t._v(" "),a("li",{staticClass:"contract-tab",attrs:{title:"合同管理"},on:{click:t.showAuthDialog}},[a("i",{staticClass:"el-icon-document"})])])},u=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("li",{staticClass:"user-tab",attrs:{title:"个人中心"}},[a("a",{attrs:{href:"/pages/user/index.html",target:"_blank"}},[a("i",{staticClass:"el-icon-fa-user",attrs:{"aria-hidden":"true"}})])])}],d={render:l,staticRenderFns:u},f=d,h=a("VU/8"),p=n,v=h(c,f,!1,p,"data-v-562dac57",null),g=v.exports,m={data:function(){return{policies:[],contracts:[],policyData:null,contractData:null,shouldShowAuthDialog:!0}},components:{ToolBar:g},mounted:function(){var t=this,e=window.__auth_info__,a=e.__auth_error_info__||{};window.addEventListener("freelogService",t.serviceDispatchHandler.bind(t),!1),this.checkAuthHandler(a.data||{}).then(function(){t.$widgets=t.getWidgets(),t.loadWidgets()})},methods:{debugHandler:function(){},showAuthDialog:function(){this.shouldShowAuthDialog=!0},serviceDispatchHandler:function(t){var e=t.detail,a=e.data,n=e.action;if(this[n])this[n](e);else switch(n){case"authService":this.checkAuthHandler(a.data,a.msg);break;default:console.warn("没有定义的服务")}},getStateClass:function(t){var e="is-wait";return t.isProcess?e="is-finish":t.isNext&&(e="is-process"),t.isMore&&(e="is-more"),t.isActiveState&&(e+=" is-active"),e},showPolicyDetailHandler:function(t,e){this.$refs.policyTable.toggleRowExpansion(t,!0)},showContractDetailHandler:function(t,e){t.expanded=!0,this.$refs.contractTable.toggleRowExpansion(t,!0)},signPolicyHandler:function(t,e){var a=this;if(!t.selectedSegmentId)return this.$message.warning("没有选择策略");console.log(t);var n="presentable name: "+t.name+", resource name: "+t.tagInfo.resourceInfo.resourceName;this.$confirm("合同详情："+n+"。确定签约合同？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",dangerouslyUseHTMLString:!0,type:"warning"}).then(function(){window.QI.fetch("//api.freelog.com/v1/contracts",{method:"POST",data:{contractType:3,targetId:t.presentableId,segmentId:t.selectedSegmentId,serialNumber:t.serialNumber,partyTwo:window.__auth_info__.__auth_user_id__}}).then(function(t){return t.json()}).then(function(t){0===t.ret&&0===t.errcode?(a.policies.splice(e,1),a.$message.success("签约成功"),a.resolveContract({contract:t.data})):a.$message.error(t.msg)})}).catch(function(){})},activateContractHandler:function(t,e,a,n){function s(e){var n;n="signing"===e.type?o.triggerLicense({contractId:i,eventId:e.eventId,licenseIds:e.params}):o.triggerContractState({contractId:i,eventId:e.eventId}),Promise.resolve(n).then(function(e){0===e.ret&&0===e.errcode?(o.$message.success("操作成功"),o.updateContractState(t,a)):o.$message.error(e.msg)})}var r,o=this,i=t.contractId;r=a?e.targetEvents[n]:e.targetEvents[0],"compoundEvents"===r.event.type?r.event.params.forEach(function(t){s(t)}):s(r.event)},updateContractState:function(t,e){e.isProcess=!0,e.isActivated=!0},triggerLicense:function(t){return window.QI.fetch("//api.freelog.com/v1/contracts/signingLicenses",{method:"POST",data:t}).then(function(t){return t.json()})},triggerContractState:function(t){return window.QI.fetch("//api.freelog.com/v1/contracts/test",{method:"POST",data:t}).then(function(t){return t.json()})},getWidgets:function(){return document.querySelector("#js-page-container").querySelectorAll(".js-wc-widget")},resolveStateTree:function(t){var e=[];if(e.push(t),t.nextStates.length){var a,n=t.nextStates;if(n.length>1)for(var s=0;s<n.length;s++){var r=n[s];if(r.isProcess){a=r;break}}else a=t.nextStates[0];a?e=e.concat(this.resolveStateTree(a)):n.length>1&&(t.isMore=!0,e.push({isWait:!0,nextStates:n}))}return e},loadResourceDetail:function(t){return window.QI.fetch("//api.freelog.com/v1/resources/"+t).then(function(t){return 200===t.status?t.json():Promise.reject(t)}).then(function(t){return 0===t.ret&&0===t.errcode?t.data:Promise.reject(t)})},resolveContract:function(t){var e=this,a=t.contract;this.loadResourceDetail(a.resourceId).then(function(t){a.statesData=e.parseContract(a),a.resourceDetail=t,e.contracts.push(a)})},parseContract:function(t){function e(t){return{nextStates:[],targetEvents:[],state:t,isActiveState:i.includes(t),isProcess:t===s}}function a(t){t.nextStates.length&&t.nextStates.forEach(function(e){var n=l[e.state];n.targetEvents.length&&n.targetEvents.forEach(function(e){l[e.nextState]&&e.nextState!==t.state&&n.nextStates.push(l[e.nextState])}),a(n)})}var n,s=t.fsmState,r=t.policySegment,o=r.fsmDescription,i=r.activatedStates,c=r.initialState,l={};o.forEach(function(t){var a=l[t.currentState]||e(t.currentState),n=l[t.nextState];a.targetEvents.push(t),n||(n=e(t.nextState),l[t.nextState]=n),t.currentState===c&&a.nextStates.push(n),l[t.currentState]=a}),n=l[c],a(n);var u=this.resolveStateTree(n);return console.log(u),{stateTreeRoot:n,stateMap:l}},checkAuthHandler:function(t,e){var a=this,n=this;return new Promise(function(s,r){if(t.authResult)switch(n.shouldShowAuthDialog=!0,t.authResult.authErrorCode){case 70080104:a.resolveContract(t.data);break;case 70080101:a.loadPolicyDetail(t.data);break;case 70080202:console.log(e,t.data),n.$message.warning(e);break;default:s()}else s()})},loadPolicyDetail:function(t){var e=this,a=t.presentableId,n="//api.freelog.com/v1/presentables/"+a;window.QI.fetch(n).then(function(t){return t.json()}).then(function(t){var n=e.parsePolicy(t.data,a);n.presentableId=a,e.policies.push(n),console.log(n)})},parsePolicy:function(t){var e=t,a=e;return Object.assign(a,{segments:[],selectedSegmentId:""}),e.policy.forEach(function(t){var e={detail:t,states:t.fsmDescription,selected:!1};a.segments.push(e)}),a},loadWidgets:function(){var t=this,e=this.$widgets,a="//api.freelog.com/v1/nodes/"+window.__auth_info__.__auth_node_id__+"/presentables/";Array.from(e).forEach(function(e){var n=e.getAttribute("data-widget-presentable-id");n&&window.QI.fetchPresentable(n+".data").then(function(t){return t.text()}).then(function(e){try{var r=JSON.parse(e);t.checkAuthHandler(r.data,r.msg)}catch(t){var o=a+(n+".data");s(o)}})})}}},w=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("tool-bar"),t._v(" "),a("el-dialog",{attrs:{"close-on-click-modal":!1,title:"签约",visible:t.shouldShowAuthDialog,fullscreen:!1,"custom-class":"auth-dialog",width:"50%",center:""},on:{"update:visible":function(e){t.shouldShowAuthDialog=e}}},[a("el-tabs",{attrs:{type:"border-card",value:"contract"}},[a("el-tab-pane",{attrs:{label:"签约合同"}},[a("el-table",{ref:"policyTable",staticStyle:{width:"100%"},attrs:{data:t.policies,stripe:""}},[a("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("ul",t._l(e.row.segments,function(n){return a("li",{staticClass:"segment-row"},[a("span",{staticClass:"segment-detail"},[t._v("合同ID "+t._s(n.detail.segmentId))]),t._v(" "),a("el-radio",{staticClass:"select-btn",attrs:{label:n.detail.segmentId},model:{value:e.row.selectedSegmentId,callback:function(a){t.$set(e.row,"selectedSegmentId",a)},expression:"scope.row.selectedSegmentId"}},[t._v("选择\n                                    ")])],1)}))]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"合同名称",prop:"name"}}),t._v(" "),a("el-table-column",{attrs:{label:"资源名称",prop:"tagInfo.resourceInfo.resourceName"}}),t._v(" "),a("el-table-column",{attrs:{label:"资源类型",prop:"tagInfo.resourceInfo.resourceType",width:"120px"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center",width:"120px"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{directives:[{name:"show",rawName:"v-show",value:!!e.row.selectedSegmentId,expression:"!!scope.row.selectedSegmentId"}],attrs:{size:"mini"},on:{click:function(a){t.signPolicyHandler(e.row,e.$index)}}},[t._v("\n                                签约\n                            ")]),t._v(" "),a("el-button",{directives:[{name:"show",rawName:"v-show",value:!e.row.selectedSegmentId,expression:"!scope.row.selectedSegmentId"}],attrs:{size:"mini"},on:{click:function(a){t.showPolicyDetailHandler(e.row,e.$index)}}},[t._v("\n                                查看合同\n                            ")])]}}])})],1)],1),t._v(" "),a("el-tab-pane",{attrs:{label:"合同管理",name:"contract"}},[a("el-table",{ref:"contractTable",staticStyle:{width:"100%"},attrs:{stripe:"",data:t.contracts}},[a("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("h3",{staticClass:"contract-title"},[t._v("合同流程")]),t._v(" "),a("ul",{staticClass:"state-steps"},t._l(t.resolveStateTree(e.row.statesData.stateTreeRoot),function(n,s){return a("li",{staticClass:"state-step",class:[t.getStateClass(n)]},[a("div",{staticClass:"state-main"},[a("div",{staticClass:"state-title"},[n.state?a("span",[t._v("\n                                                "+t._s(n.state)+" "),a("i",{staticClass:"dot"})]):n.isWait?a("div",{staticClass:"wait-state"},[a("i",{staticClass:"el-icon-more"})]):t._e()]),t._v(" "),a("div",{staticClass:"state-step-arrow"},[n.isMore?a("el-select",{attrs:{size:"mini",placeholder:"请选择"},model:{value:n.selected,callback:function(e){t.$set(n,"selected",e)},expression:"state.selected"}},t._l(n.nextStates,function(s,r){return a("el-option",{key:"",attrs:{label:s.state,value:s.state}},[a("span",{staticStyle:{float:"left"}},[t._v(t._s(s.state))]),t._v(" "),a("span",{staticStyle:{float:"right",color:"#8492a6","font-size":"13px"},on:{click:function(a){t.activateContractHandler(e.row,n,s,r)}}},[t._v("trigger")])])})):n.isProcess?a("el-button",{attrs:{size:"mini"},on:{click:function(a){t.activateContractHandler(e.row,n)}}},[t._v("trigger"),a("i",{staticClass:"el-icon-arrow-right"})]):t._e(),t._v(" "),a("i",{staticClass:"el-icon-arrow-right"})],1)])])}))]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"合同ID",prop:"contractId",width:"240px"}}),t._v(" "),a("el-table-column",{attrs:{label:"资源名称",prop:"resourceDetail.resourceName"}}),t._v(" "),a("el-table-column",{attrs:{label:"资源类型",prop:"resourceDetail.resourceType",width:"120px"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center",width:"150px"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){t.showContractDetailHandler(e.row,e.$index)}}},[t._v("\n                                查看合同流程\n                            ")])]}}])})],1)],1)],1)],1)],1)},_=[],S={render:w,staticRenderFns:_},b=S,x=a("VU/8"),I=r,C=x(m,b,!1,I,"data-v-2e1372de",null),y=C.exports;window.QI=document.querySelector(".js-lib-qi"),new o.a({el:"#app",render:function(t){return t(y)}})}},["XTzU"]);
//# sourceMappingURL=pagebuild.a07332a34e925893a4ca.js.map