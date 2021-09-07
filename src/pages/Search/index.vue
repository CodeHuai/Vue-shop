<template>
  <div>
    Search
    params参数: {{$route.params.keyword}} <br>
    query参数： {{$route.query.keyword1}}

  </div>
</template>

<script>
export default {
  name: 'Search',
}
</script>

<style lang="less" scoped>

</style>
