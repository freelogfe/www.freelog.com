<template>
    <transition name="modal-fade" @after-leave="afterLeave">
        <div v-show="visible">
            <div class="fe-modal-wrapper" @click.self="handleWrapperClick">
                <div 
                    class="fe-modal"
                    :class="[customClass]"
                    ref="modal"
                    :style="style"
                >
                    <div class="fe-modal-header">
                        <slot name="title">
                            <h3 class="fe-modal-title" v-html="title"></h3>
                        </slot>
                        <button type="button" class="fe-modal-header-btn"
                            aria-label="Close"
                            v-if="showClose"
                            @click="handleClose">
                            <i class="fe-model-close">X</i>
                        </button>
                    </div>
                    <div class="fe-modal-body" v-if="rendered"><slot></slot></div>
                    <div class="fe-modal-footer" v-if="$slots.footer">
                        <slot name="footer"></slot>
                    </div>
                </div>
            </div>
            <div class="fe-modal-mask"></div>
        </div>
        
    </transition>
</template>


<script>
  export default {
    name: 'fe-modal',
    props: {
      visible: {
        type: Boolean,
        default: false,
      },
      title: {
        type: String,
        default: ''
      },
      closeOnClickModal: {
        type: Boolean,
        default: true
      },
      showClose: {
        type: Boolean,
        default: true
      },
      width: String,
      customClass: {
        type: String,
        default: ''
      },
      top: {
        type: String,
        default: '15vh'
      },
      beforeClose: Function,
      center: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        closed: false,
        rendered: false,
      }
    },
    watch: {
      visible(val) {
        if (val) {
          this.closed = false
          this.$emit('open')
        //   this.$el.addEventListener('scroll', this.updatePopper)
          this.$nextTick(() => {
            this.$refs.modal.scrollTop = 0
          })
        } else {
        //   this.$el.removeEventListener('scroll', this.updatePopper)
          if (!this.closed) this.$emit('close')
        }
      }
    },
    computed: {
      style() {
        let style = {}
        if (!this.fullscreen) {
          style.marginTop = this.top
          if (this.width) {
            style.width = this.width
          }
        }
        return style
      }
    },
    methods: {
      handleWrapperClick() {
        // if (!this.closeOnClickModal) return
        this.handleClose()
      },
      handleClose() {
        if (typeof this.beforeClose === 'function') {
          this.beforeClose(this.hide)
        } else {
          this.hide()
        }
      },
      hide(cancel) {
        if (cancel !== false) {
          this.$emit('update:visible', false)
          this.$emit('close')
          this.closed = true
        }
      },
      afterLeave() {
        this.$emit('closed')
      }
    },
    mounted() {
      if (this.visible) {
        this.rendered = true
      }
    },
    updated (){
      if (this.visible) {
        this.rendered = true
      }
    },
    destroyed() {
        
    }
  }
</script>

<style lang="less" scoped>
.modal-fade-enter-active {
  transition: all .3s ease;
}
.modal-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.modal-fade-enter, .modal-fade-leave-to{
//   transform: translateY(30px);
  opacity: 0;
}

.fe-modal-mask{
    position: fixed; left: 0; top: 0; z-index: 999;
    width: 100%; height: 100%;
    opacity: .5; background: #000;
}
.fe-modal-wrapper{ 
    position: fixed; top: 0; right: 0; bottom: 0; left: 0; z-index: 1000;
    overflow: auto;
}
.fe-modal{
    box-sizing: border-box;
    position: relative;
    margin: 0 auto 50px; border-radius: 2px;
    background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,.3);
}
.fe-modal-header{ 
    padding: 20px; 

    h3{ font-size: 16px; color: #222; }
    .fe-model-close{ color: #999; }
}
.fe-modal-header-btn{ 
    position: absolute; top: 20px; right: 20px; 
    padding: 0; border: none; outline: none;
    background: transparent; cursor: pointer; font-size: 16px;
 }
.fe-modal-body{ padding: 20px; font-size: 14px; color: #606266; }
.fe-modal-footer{ box-sizing: border-box; padding: 20px; padding-top: 10px; text-align: right; }
</style>
