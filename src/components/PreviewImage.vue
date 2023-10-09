<template>
    <div>
      <template>
       <viewer>
         <img :src="this.Preview.src" style="width:20%" />
       </viewer>
      </template>
    </div>
</template>

<script>
export default {
  components: {
  },
  name: 'Picture',
  props: ['Preview'],
  data () {
    return {
    }
  }
}
</script>

<style scoped >

</style>
