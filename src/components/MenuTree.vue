<template>
  <div>
    <template v-for="item in this.menuList">
      <el-submenu :disabled="item.disabled" :index="item.id+''" :key="item.id+''" v-if="item.children.length>0">
        <template slot="title">
          <i :class="item.icon"></i>
          <span slot="title">{{ item.menuName }}</span>
        </template>
        <MenuTree :menuList="item.children"></MenuTree>
      </el-submenu>
      <el-menu-item
        v-else
        :disabled="item.disabled"
        :index="item.url+''"
        @click="savePath(item.url)"
        :route="item.url+''"
        :key="item.id+''"
      >
        <i :class="item.icon"></i>
        <span slot="title">{{ item.menuName }}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
import 'font-awesome/css/font-awesome.css'
export default {
  name: 'MenuTree',
  props: ['menuList'],
  methods: {
    // 保存激活路径
    savePath (path) {
      window.sessionStorage.setItem('activePath', path)
      this.activePath = path
    }
  }
}
</script>

<style lang="less" scoped>
  // 实现一个溢出处理
  .el-menu--collapse span,
  .el-menu--collapse i.el-submenu_icon-arrow{
    height: 0;
    width: 0;
    overflow: hidden;
    visibility: hidden;
    display: inline-block;
  }
</style>
