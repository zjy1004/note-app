<template>
   <div class="index">
      <treasure
      v-if="showPages === 1"
       />
      <waybill
       v-if="showPages === 2"
       />
      <mine
       v-if="showPages === 3"
        />
   </div>
</template>

<script type="text/ecmascript-6">
import NoteIndex from '../NoteIndex/NoteIndex'
import SelfNote from '../SelfNote/SelfNote'
import Mine from '../Mine/Mine'
export default {
  name: 'Index',
  components: { NoteIndex, SelfNote, Mine },
  data () {
    return {
      showPages: 2
    }
  },
  created () {
  },
  watch: {
    '$route.name': function (newVal, oldVal) {
      if (newVal === 'NoteIndex') {
        this.showPages = 1
      }
      if (newVal === 'SelfNote') {
        this.showPages = 2
      }
      if (newVal === 'Mine') {
        this.showPages = 3
      }
    }
  }
}
</script>

<style scoped lang="less">
.index {
  height: 100%;
  width: 100%;
}
</style>
