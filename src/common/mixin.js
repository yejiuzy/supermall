import {debounce} from "@/common/utils";
import BackTop from "@/components/common/backTop/BackTop";
import {BACK_POSITION} from "@/common/const";
import {POP, NEW, SELL} from "./const";

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      refresh: null
    }

  },
  mounted() {
    this.refresh = debounce(this.$refs.scroll.refresh, 100);

    // 保存监听事件
    this.itemImgListener = () => {
      this.refresh()
    }

    this.$bus.$on('itemImageLoad', this.itemImgListener)
  }
}

export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    listenShowBackTop(position) {
      this.isShowBackTop = -position.y > BACK_POSITION
    }
  },
  components: {
    BackTop
  }
}

export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      console.log(this.currentType);
    }
  }
}
