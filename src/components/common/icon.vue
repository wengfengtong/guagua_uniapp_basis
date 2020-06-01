<template>
  <view @click="hendleClick">
    <i
      v-if="type==='icon'"
      :class="['iconfont','g-icon',name === '' ? '' : 'gua-' + name ]"
      :style="{fontSize:size+'px',color:color?color:''}"
    ></i>
    <image v-else-if="type==='img'" :src="imgSrc" :style="{width:size+'px',height:size+'px'}" />
    <uni-icons v-else-if="type=='uni'" :type="name" :size="size" :color="color"></uni-icons>
  </view>
</template>

<script>
import { uniIcons } from "@dcloudio/uni-ui";
export default {
  name: "icon",
  components: {
    uniIcons
  },
  props: {
    type: {
      type: String,
      default: "icon"
    },
    name: {
      type: String,
      default: ""
    },
    src: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "white"
    },
    size: {
      type: [String, Number],
      default: "28"
    }
  },
  computed: {
    imgSrc() {
      if (this.type != "img") {
        return;
      }
      try {
        if (this.src) {
          return require(this.src);
        }
        return require(`../../static/icons/${this.name}.png`);
      } catch (error) {
        console.error("图片不存在，请检查路径是否正确！");
      }
    }
  },
  created() {
    if (!this.name) {
      console.error("请传入Icon组件的name属性");
    }
  },
  methods: {
    hendleClick() {
      this.$emit("click");
    }
  }
};
</script>

<style lang="scss" scoped>
.g-icon {
  font-family: l-iconfont;
  font-size: 40rpx;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
@font-face {
  font-family: "iconfont"; /* project id 1349974 */
  src: url("https://at.alicdn.com/t/font_1349974_6fvqmyss2ro.eot");
  src: url("https://at.alicdn.com/t/font_1349974_6fvqmyss2ro.eot?#iefix")
      format("embedded-opentype"),
    url("https://at.alicdn.com/t/font_1349974_6fvqmyss2ro.woff2")
      format("woff2"),
    url("https://at.alicdn.com/t/font_1349974_6fvqmyss2ro.woff") format("woff"),
    url("https://at.alicdn.com/t/font_1349974_6fvqmyss2ro.ttf")
      format("truetype"),
    url("https://at.alicdn.com/t/font_1349974_6fvqmyss2ro.svg#iconfont")
      format("svg");
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.gua-aixin:before {
  content: "\e6bb";
}

.gua-biaoqian:before {
  content: "\e6bc";
}

.gua-dingdan:before {
  content: "\e6bd";
}

.gua-dianzan:before {
  content: "\e6be";
}

.gua-deng:before {
  content: "\e6bf";
}

.gua-dingwei:before {
  content: "\e6c0";
}

.gua-dengpao:before {
  content: "\e6c1";
}

.gua-erji:before {
  content: "\e6c2";
}

.gua-erji1:before {
  content: "\e6c3";
}

.gua-fenlei:before {
  content: "\e6c4";
}

.gua-faxian:before {
  content: "\e6c5";
}

.gua-caijian:before {
  content: "\e6c6";
}

.gua-gouwuche:before {
  content: "\e6c7";
}

.gua-gangbi:before {
  content: "\e6c8";
}

.gua-huihua:before {
  content: "\e6c9";
}

.gua-huangguan:before {
  content: "\e6ca";
}

.gua-huojian:before {
  content: "\e6cb";
}

.gua-jiqiren:before {
  content: "\e6cc";
}

.gua-jita:before {
  content: "\e6cd";
}

.gua-lanzi:before {
  content: "\e6ce";
}

.gua-liwu:before {
  content: "\e6cf";
}

.gua-jiaojuan:before {
  content: "\e6d0";
}

.gua-qizhi:before {
  content: "\e6d1";
}

.gua-rili:before {
  content: "\e6d2";
}

.gua-shalou:before {
  content: "\e6d3";
}

.gua-remen:before {
  content: "\e6d4";
}

.gua-shanchu:before {
  content: "\e6d5";
}

.gua-shangchuan:before {
  content: "\e6d6";
}

.gua-shouye:before {
  content: "\e6d7";
}

.gua-shoubiao:before {
  content: "\e6d8";
}

.gua-shipin:before {
  content: "\e6d9";
}

.gua-shu:before {
  content: "\e6da";
}

.gua-shu1:before {
  content: "\e6db";
}

.gua-tongzhi:before {
  content: "\e6dc";
}

.gua-xiazai:before {
  content: "\e6dd";
}

.gua-wode:before {
  content: "\e6de";
}

.gua-xiangce:before {
  content: "\e6df";
}

.gua-wenjianjia:before {
  content: "\e6e0";
}

.gua-xiangji:before {
  content: "\e6e1";
}

.gua-xunzhang:before {
  content: "\e6e2";
}

.gua-zuanshi:before {
  content: "\e6e3";
}

.gua-xiaoxi:before {
  content: "\e6e4";
}
</style>
