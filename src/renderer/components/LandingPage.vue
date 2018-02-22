<template>
    <div class="layout">
        <side-bar-menu></side-bar-menu>
        <router-view></router-view>
    </div>
</template>
<script>
import SideBarMenu from './LandingPage/SideBarMenu'
export default {
    components: { SideBarMenu },
}
</script>
<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
</style>