<template>
  <div class="pagination">
    <button
      :disabled="currentPageNo === 1"
      @click="$emit('changePageNo', currentPageNo - 1)"
    >
      上一页
    </button>
    <button v-if="startEnd.start > 1" @click="$emit('changePageNo', 1)">
      1
    </button>
    <button v-if="startEnd.start > 2">···</button>

    <!-- vfor通常是用来遍历数组的，但是也可以遍历一个数字
    vfor和vif可以同时使用（面试题）
    vfor优先级比vif要高-->
    <!-- 连续页码 -->
    <button
      :class="{ active: currentPageNo === page }"
      v-for="page in startEnd.end"
      :key="page"
      v-if="page >= startEnd.start"
      @click="$emit('changePageNo', page)"
    >
      {{ page }}
    </button>

    <button v-if="startEnd.end < totalPageNo - 1">···</button>
    <button
      v-if="startEnd.end < totalPageNo"
      @click="$emit('changePageNo', totalPageNo)"
    >
      {{ totalPageNo }}
    </button>
    <button
      :disabled="currentPageNo === totalPageNo"
      @click="$emit('changePageNo', currentPageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  // :currentPageNo="searchParams.pageNo"
  // :continueNo="5"
  // :total="goodsListInfo.total"
  // :pageSize="searchParams.pageSize"
  props: {
    currentPageNo: {
      type: Number,
      default: 1,
    },
    continueNo: Number,
    total: {
      type: Number,
      default: 0,
    },
    pageSize: Number,
  },

  computed: {
    totalPageNo() {
      // 计算总页码
      return Math.ceil(this.total / this.pageSize);
    },

    startEnd() {
      //计算连续页面的起始位置和结束位置
      let { currentPageNo, totalPageNo, continueNo } = this;
      let start, end;
      if (totalPageNo <= continueNo) {
        //总页码比连续数还小
        start = 1;
        end = totalPageNo;
      } else {
        // 首先使用通用的算法去计算start和end 不关心当前页是在前面还是后面还是中间
        start = currentPageNo - Math.floor(continueNo / 2);
        end = currentPageNo + Math.floor(continueNo / 2);

        if (start < 1) {
          //代表当前页在左侧
          start = 1;
          end = continueNo;
        }

        if (end > totalPageNo) {
          end = totalPageNo;
          start = totalPageNo - continueNo + 1;
        }
      }
      return { start, end };
    },
    // pageArr(){
    //   let {startEnd} = this
    //   let arr = []
    //   for(let i = startEnd.start; i <= startEnd.end; i++){
    //     arr.push(i)
    //   }
    //   return arr
    // }
  },
};
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
