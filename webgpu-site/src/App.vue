<template>
  <div>
    <NavBar />
    <div class="view-container">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import NavBar from './components/webgpu/NavBar.vue'
</script>

<style>
.view-container {
  margin: 20px auto;
  padding: 16px;
  max-width: 1000px;
  background-color: #fff;
  border-radius: 16px; 
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
