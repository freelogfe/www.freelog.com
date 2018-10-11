<template>
  <div class="contract-detail-content-wrapper" v-html="contractDetail" @click="handlerProxy">

  </div>
</template>

<script>
  import {highlightPolicy} from '@freelog/resource-policy-lang/lib/presentablePolicyHighlight'

  export default {
    name: 'contract-detail',
    props: {
      // contract: {
      //   type: Object,
      //   required: true
      // }
    },
    data() {
      return {
        contract: {
          "_id" : '5b962792d79ae1191c4c0e59',
          "contractClause" : {
            "authorizedObjects" : [

            ],
            "currentFsmState" : "signed",
            "policyText" : "for NODES:\n    escrow account acct\n    exp(a) = 10*a\n    exp2(a,b) = a + (b * 10)\n    custom event acceptor.abcd\n\n    initial:\n        proceed to signed on accepting agreement 0x1234\n    signed:\n        proceed to auth on acct exceed 5+5 feather\n    auth:\n        presentable\n        active\n        proceed to settlement on end of day\n    settlement:\n        proceed to auth on receiving exp(presented_last_cycle) to $abcd1234\n        proceed to refund on acceptor.abcd\n        proceed to confiscation on end of day\n    confiscation:\n        acct.confiscable\n        proceed to finish on acct.confiscated\n    refund:\n        acct.refundable\n        proceed to finish on acct.refunded\n    finish:\n        terminate",
            "fsmDeclarations" : {
              "acct" : {
                "type" : "escrowaccount",
                "declareType" : "contractAccount",
                "currencyType" : 3,
                "accountId" : "feth1196c6c4d1a"
              },
              "exp" : {
                "args" : [
                  "a"
                ],
                "body" : "10*a",
                "declareType" : "contractExpression"
              },
              "exp2" : {
                "args" : [
                  "a",
                  "b"
                ],
                "body" : "a+(b*10)",
                "declareType" : "contractExpression"
              },
              "abcd" : {
                "type" : "acceptor",
                "declareType" : "customEvent"
              }
            },
            "fsmStates" : {
              "initial" : {
                "authorization" : [

                ],
                "transition" : {
                  "signed" : {
                    "code" : "S101",
                    "params" : {
                      "licenseResourceId" : [
                        "0x1234"
                      ]
                    },
                    "eventId" : "3173c3700a6c4b91a36ba40ae9f434d3"
                  }
                }
              },
              "signed" : {
                "authorization" : [

                ],
                "transition" : {
                  "auth" : {
                    "code" : "S210",
                    "params" : {
                      "contractAccountName" : "acct",
                      "amount" : {
                        "type" : "literal",
                        "literal" : "5+5"
                      },
                      "currencyUnit" : "feather"
                    },
                    "eventId" : "25de5b171cbc48ddbb6ac0d8b7c798e5"
                  }
                }
              },
              "auth" : {
                "authorization" : [
                  "presentable",
                  "active"
                ],
                "transition" : {
                  "finish" : {
                    "code" : "S211",
                    "params" : {
                      "contractAccountName" : "acct"
                    },
                    "eventId" : "15c137eb56004c28bf4bee6efe33c685"
                  }
                }
              },
              "settlement" : {
                "authorization" : [

                ],
                "transition" : {
                  "auth" : {
                    "code" : "S201",
                    "params" : {
                      "amount" : {
                        "type" : "invocation",
                        "handle" : "exp",
                        "args" : [
                          "presented_last_cycle"
                        ]
                      },
                      "account" : "$abcd1234"
                    },
                    "eventId" : "2e3870ea1272467bb88306fff8bd386a"
                  },
                  "refund" : null,
                  "confiscation" : {
                    "code" : "A101",
                    "params" : {
                      "TIMEUNIT" : "day"
                    },
                    "eventId" : "18e41c6e50324ce79c894a78e833d004"
                  }
                }
              },
              "confiscation" : {
                "authorization" : [
                  "acct.confiscable"
                ],
                "transition" : {
                  "finish" : {
                    "code" : "S211",
                    "params" : {
                      "contractAccountName" : "acct"
                    },
                    "eventId" : "15c137eb56004c28bf4bee6efe33c685"
                  }
                }
              },
              "refund" : {
                "authorization" : [
                  "acct.refundable"
                ],
                "transition" : {
                  "finish" : {
                    "code" : "S212",
                    "params" : {
                      "contractAccountName" : "acct"
                    },
                    "eventId" : "65c758033d6645de929c53af2f9746aa"
                  }
                }
              },
              "finish" : {
                "authorization" : [

                ],
                "transition" : {
                  "terminate" : null
                }
              }
            }
          },
          "contractName" : "presentableName",
          "remark" : "remark",
          "isTerminate" : 0,
          "status" : 2,
          "segmentId" : "a68379dd361e74a89a37fce7a8b8d989",
          "targetId" : "5b0d1ca255d4055cf84bdb73",
          "partyOne" : "10015",
          "partyTwo" : "10022",
          "partyOneUserId" : 10026,
          "partyTwoUserId" : 10022,
          "resourceId" : "2900eac4e4c8d96649901ac20a245b7bfa68ba8e",
          "contractType" : 3,
          "isDefault" : 1,
          "createDate" : "2018-09-10",
          "updateDate" : "2018-09-25"
        }
      }
    },
    computed: {
      contractId (){
        return this.contract._id
      },
      fsmStates (){
        return this.contract.contractClause.fsmStates
      },
      currentFsmState (){
        return this.contract.contractClause.currentFsmState
      },
      policyText (){
        return this.contract.contractClause.policyText
      },
      contractDetail() {
        // return highlightPolicy(this.policyText)
        return highlightPolicy(`
          for NODES:
            escrow account acct
            exp(a) = 10*a
            exp2(a,b) = a + (b * 10)
            custom event acceptor.abcd

            initial:
                proceed to signed on accepting agreement 0x1234
            signed:
                proceed to auth on acct exceed 5+5 feather
            auth:
                presentable
                active
                proceed to settlement on end of day
            settlement:
                proceed to auth on receiving exp(presented_last_cycle) to $abcd1234
                proceed to refund on acceptor.abcd
                proceed to confiscation on end of day
            confiscation:
                acct.confiscable
                proceed to finish on acct.confiscated
            refund:
                acct.refundable
                proceed to finish on acct.refunded
            finish:
                terminate
        `)
      }
    },
    methods: {
      toggleClass ($dom, className){
        var curClassName = $dom.className
        if(curClassName.indexOf(className) !== -1){
          $dom.className = curClassName.replace(className, '')
        }else{
          $dom.className = `${curClassName} ${className}`
        }
      },
      handlerProxy (event){
        const dataset = event.target.dataset
        const handlerName = dataset.handler
        console.log('handlerName --', handlerName)
        if (this[handlerName]) {
          var transitionData = this.getStateTransitionData(dataset.transition)
          if(transitionData !== null) {
            const { code, params, eventId } = transitionData
            this[handlerName](code, params, eventId)
          }
        }
      },
      getStateTransitionData(transition) {
        if(this.fsmStates[this.currentFsmState]){
          let transitionMap = this.fsmStates[this.currentFsmState].transition
          return transitionMap[transition]
        }else{
          return null
        }
      },
      // 签约协议
      signingEvent(code, params, eventId ) {
        this.$axios.post('/v1/contracts/events/signingLicenses', {
          contractId: this.contractId,
          eventId,
          licenseIds: parmas.licenseResourceId,
          nodeId: window.__auth_info__.__auth_node_id__
        })
          .then(resp => {
            if(resp.status === 200) {
              if(resp.data.errcode === 0) {
                console.log('license sign success!')
              }else {
                console.log(`license sign fail! error: ${resp.data.msg}`)
              }
            }else {
              console.log('/v1/contracts/events/signingLicenses 请求失败！')
            }
          })
      },
      cycleEndEvent(code, params, eventId) {},
      // 交易事件
      transactionEvent(code, params, eventId) {
        // this.$axios.post('',{
        //   contractId: this.contractId,
        //   eventId: params.eventId,
        //   fromAccountId:"feth102dac4f6ab",
        //   amount: params.amount,
        //   "password":"012345"
        // })
      },
      settlementEvent(code, params, eventId) {},
      viewCountEvent(code, params, eventId) {},
      recontractCountEvent(code, params, eventId) {},
      presentCountEvent(code, params, eventId) {},
      escrowExceedAmount(code, params, eventId) {
        console.log('run escrowExceedAmount - code, params, eventId --', code, params, eventId)
      },
      // 保证金没收
      escrowConfiscated(code, params, eventId){
        this.$axios('/v1/contracts/events/escrowConfiscated', {
          contractId: this.contractId,
          eventId,
          toAccountId: params,
        })
          .then(resp => {
            if(resp.status === 200) {
              if(resp.data.errcode === 0) {
                console.log('Escrow has been confiscated success!')
              }else {
                console.log(`Escrow has been confiscated fail! error: ${resp.data.msg}`)
              }
            }else {
              console.log('/v1/contracts/events/escrowConfiscated 请求失败！')
            }
          })
      },
      cycleEndEvent(transition) {},
      customEvent(transition) {},

    },
    mounted() {
      var $targDom = this.$el.querySelector(`.bp-s-${this.currentFsmState}`)
      this.toggleClass($targDom, 'active')
    },
  }
</script>

<style lang="less" type="text/less">

// policy 高亮
.beauty-poliycy-box{
  font-size: 14px; line-height: 1.6;
  color: #999;

  .bp-audience{ }
  .bp-declaration, .bp-state, .bp-s-row:not(:first-child){
    padding-left: 3em;
  }
  .bp-state.active{
    background: #E3F0FF;
    border: 1px solid #B3D7FF; border-radius: 20px;
    color: #222;
  }
  .bp-state.active .bp-s-transition{
    color: #EE6723;
  }

  .bp-state .bp-s-event{
    pointer-events: none;
  }
  .bp-state.active .bp-s-event{
    display: inline-block; cursor: pointer; color: #3e94f3; pointer-events: auto;
  }
}
</style>

