<template>
  <div id="category">
    <!--导航栏-->
    <nav-bar class="nav-bar">
      <template v-slot:center>
        <div>商品分类</div>
      </template>
    </nav-bar>
    <div id="content">
          <tab-menu :categories="categories"
                    @selectItem="selectItem"></tab-menu>

          <scroll class="content"
                  ref="scroll"
                  :observe-image="true":data="[categoryData]">
              <tab-content-category :subcategories="showSubcategory"></tab-content-category>
          </scroll>
    </div>
    <div ></div>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import TabControl from "@/components/content/tabControl/TabControl";

import TabMenu from "@/views/category/childComp/TabMenu";
import TabContentCategory from "@/views/category/childComp/TabContentCategory";
import Scroll from "@/components/common/scroll/Scroll";

import {getCategory, getSubcategory, getCategoryDetail} from "@/network/category";
import {POP, SELL, NEW} from "@/common/const";
import {tabControlMixin} from "@/common/mixin";


export default {
  name: "Category",
  components: {
    NavBar,
    TabControl,
    Scroll,
    TabMenu,
    TabContentCategory
  },
  data() {
    return {
      categories: [],
      categoryData: {
      },
      currentIndex: -1
    }
  },
  mixins: [tabControlMixin],
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) return {}
      return this.categoryData[this.currentIndex].subcategories
    },
    showCategoryDetail() {
      if (this.currentIndex === -1) return {}
      return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
    }
  },
  methods: {
    _getCategory() {
      getCategory().then(res => {
        // 1.获取分类数据
        this.categories = res.data.data.category.list
        // 2.初始化每个类别的子数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              'pop': [],
              'new': [],
              'sell': []
            }
          }
        }
        // 3.请求第一个分类的数据
        this._getSubcategories(0)
      })
    },
    _getSubcategories(index) {
      this.currentIndex = index;
      const mailKey = this.categories[index].maitKey;
      getSubcategory(mailKey).then(res => {
        console.log(res);
        this.categoryData[index].subcategories = res.data.data
        this.categoryData = {...this.categoryData}
        this._getCategoryDetail(POP)
        this._getCategoryDetail(SELL)
        this._getCategoryDetail(NEW)
      })
    },
    _getCategoryDetail(type) {
      // 1.获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      // 2.发送请求,传入miniWallkey和type
      getCategoryDetail(miniWallkey, type).then(res => {
        // 3.将获取的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res
        this.categoryData = {...this.categoryData}
      })
    },
    /**
     * 事件响应相关的方法
     */
    selectItem(index) {
      this._getSubcategories(index)
    }
  },
  created() {
    this._getCategory();
  }
}
</script>

<style scoped>
#category {
  height: 100vh;
}

.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
}

#content {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;

  display: flex;
}

.content {
  height: 100%;
  overflow: hidden;
  flex: 1;
}

</style>
