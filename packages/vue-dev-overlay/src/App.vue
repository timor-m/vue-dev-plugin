<template>
  <div>
    <div id="vue-dev-plugin-overlay" v-if="visible" :style="styles" ref="overlayEle">
  </div>
  <div id="vue-dev-plugin-overlay-meta" :class="metaOutOverlay ? '' : 'inner'" v-if="visible" :style="metaStyles" ref="metaEle">
    <div class="item" data-field="PATH">
          {{ meta.filename }}
      </div>
    <div class="item" data-field="SELECTOR">
      {{ meta.selector }}
    </div>
    <div class="item" data-field="SIZE">
      {{ `${size.w} x ${size.h}` }}
    </div>
  </div>
  </div>
</template>

<script>

export default {
  name: 'OverlayContanier',
  data(){
    return {
        style: {
          w: 0,
          h: 0,
          x: 0,
          y: 0
        },
        metaSize:{
          mW: 400,
          mH: 140
        },
        visible: false,
        port: process.env.NODE_ENV === 'development' ? 8081 : '__HTTP_PORT__',
        meta: {
           filename: '',
           selector: '',
        },
        fixStyle: {
           x: 0,
           y: 0
        }
    }
  },
  components: {},
  watch:{
    'style.x': function () {
       this.fixMetaStyle()
    },
    'style.y': function () {
       this.fixMetaStyle()
    },
    'style.w': function () {
       this.fixMetaStyle()
    },
    'style.h': function () {
       this.fixMetaStyle()
    },
  },
  computed: {
    styles (){
      const {x, y, w, h} = this.style
      return {
        width: `${w}px`,
        height: `${h}px`,
        left: `${x}px`,
        top: `${y}px`
      }
    },
    metaOutOverlay () {
        const {mW, mH} = this.metaSize
        return this.visible && (this.style.h < mH || this.style.w < mW)
    },
    metaStyles () {
      const {x, y, h} = this.style
      const { mH:metaH , mW: metaW} = this.metaSize
      let mH = (y + h + 5) + this.fixStyle.y
      let mW = x + this.fixStyle.x
      return {
        left: `${this.metaOutOverlay ? mW : (x +10)}px`,
        top: `${this.metaOutOverlay ? mH : (y + 10)}px`,
        minWidth: `${metaW}px`, 
        minHeight: `${metaH}px`, 
      }
    },
    size () {
      const { w, h} = this.style
      return {
        w: w.toFixed(2).replace('.00',''),
        h: h.toFixed(2).replace('.00','')
      }
    },
  },
  methods: {
     fixMetaStyle () {
      const {x, y} = this.style
       setTimeout(() => {
          if (!this.$refs.metaEle) return false
          const metaW = this.$refs.metaEle.getBoundingClientRect().width
          const diffW = (metaW + x + 10) - window.innerWidth
          this.fixStyle.x = diffW > 0 ? (-diffW) : 0

          const metaH = this.$refs.metaEle.getBoundingClientRect().height
          const diffH = (this.style.h + y + 5 + metaH) - window.innerHeight
          this.fixStyle.y = diffH > 0 ? (-( this.style.h + 10 + metaH )) : 0
        })
    },
    setStyle(styles){
      const { x, y, width, height} = styles
      this.style.x = x
      this.style.y = y
      this.style.w = width
      this.style.h = height
    },
    show (target) {
        this.visible = true
        const style = target.getBoundingClientRect()
        this.setStyle(style)
        const id = target.id ? `#${target.id}` :''
        const className = [...target.classList].filter(item => !item.includes('data-injector')).join('.')
        const nodeName = target.tagName.toLowerCase()
        this.meta.selector = nodeName + id + (className ? `.${className}` : '')
        this.meta.filename = target.dataset.injectorFile
    },
    hide () {
        this.visible = false
    }
  },
  mounted(){
    window.addEventListener('click',(e) => {
        const target = e.target
        if(e.ctrlKey && Reflect.has(target.dataset,'injector')) {
            e.preventDefault()
            const filename = target.dataset.injectorFile;
            const line = target.dataset.injectorLine
            const column = target.dataset.injectorColumn
            const { hostname, protocol} = window.location
            fetch(`${protocol}//${hostname}:${this.port}/launch-editor?file=${filename}&line=${line}&column=${column}`).then(() => {})
        }
    })

    window.addEventListener('keydown', (e) => {
        if(e.ctrlKey) {
            document.body.classList.add('data-injector-used')
        }
    
        window.addEventListener('keyup' , (e) => {
            if(!e.ctrlKey) {
                document.body.classList.remove('data-injector-used')
            }
          })
    })

    window.addEventListener('mousemove', (e) => {
        if(e.ctrlKey) {
            const target = e.target
            this.show(target)
            target.classList.add('data-injector-hover')
            target.addEventListener('mouseout', () => {
                target.classList.remove('data-injector-hover')
           }, { capture: true, once:true})
         } else {
            this.hide()
         }
        window.addEventListener('keyup', (e) => {
          if(!e.ctrlKey) {
            this.hide()
          }
        })
        }, { capture: true})
    }
}
</script>

<style lang="less" scoped>
#vue-dev-plugin-overlay {
  position: fixed;
  z-index: 100000000;
  background-color: rgba(0, 0, 0, .5);
  border-radius: 5px;
  cursor: pointer;
  color: #fff;
  pointer-events: none;
  transition: all 0.35s;
  border: 1px dashed #fff;
  
}

#vue-dev-plugin-overlay-meta {
  position: fixed;
  z-index: 100000000;
  // background-color: rgba(0, 0, 0, .5);
  background-color: #fff;
  border-radius: 5px;
  cursor: pointer;
  color: #555;
  pointer-events: none;
  transition: left 0.35s, top 0.35s, width 0.35s, height 0.35s;
  box-shadow: 0px 2px 10px #999;
  padding: 15px;
  box-sizing: border-box;
  white-space: nowrap;
  &.inner {
    // background: rgba(255, 255, 255, .2);
    box-shadow: none;
  }
  .item {
    position: relative;
    line-height: 26px;
    height: 26px;
    margin-bottom: 10px;
    padding-left: 70px;
    background-color: #f9f9f9;
    &::after {
      content: attr(data-field);
      position: absolute;
      left: -15px;
      top: 0;
      width: 70px;
      height: 26px;
      line-height: 26px;
      text-align: center;
      color: #fff;
      font-size: 12px;
      background: #42b983;
    }
  }
}
</style>
