<template>
  <div class="flex items-center">
    <div class="box-20" :style="`background: ${params.value}` "></div>
  </div>
</template>

<script>
export default {
  name: 'CellRendererLink'
}
</script>
<style lang="scss">
.box-20{
  width: 20px;
  height:20px;
  margin-top: 10px;
}
</style>