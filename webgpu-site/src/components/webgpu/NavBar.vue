<template>
  <nav class="navbar">
    <div class="navbar-left">
      <span class="logo">WebGPU Engine</span>
    </div>
    <div class="navbar-right">
      <router-link to="/" class="nav-link">首页</router-link>

      <div class="dropdown">
        <span class="nav-link dropdown-toggle">图元类型 ▾</span>
        <div class="dropdown-menu">
          <router-link to="/points" class="dropdown-item">点</router-link>
          <router-link to="/lines" class="dropdown-item">线</router-link>
          <router-link to="/triangles" class="dropdown-item">面</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  height: 56px;
  background-color: #1e1e1e;
  color: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.logo {
  font-weight: bold;
  font-size: 18px;
}

.navbar-right {
  display: flex;
  gap: 16px;
  align-items: center;
}

/* 普通链接样式 */
.nav-link {
  color: #ddd;
  text-decoration: none;
  font-size: 15px;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: #fff;
  text-decoration: underline;
}

.router-link-active {
  color: #4caf50;
  font-weight: bold;
}

/* 下拉菜单样式 */
.dropdown {
  position: relative;
}

.dropdown-toggle {
  cursor: pointer;
  user-select: none;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #2b2b2b;
  min-width: 120px;
  border-radius: 4px;
  overflow: hidden;
  display: none;
  flex-direction: column;
  z-index: 10;
}

.dropdown:hover .dropdown-menu {
  display: flex;
}

.dropdown-item {
  padding: 8px 12px;
  color: #ccc;
  text-decoration: none;
  font-size: 14px;
  white-space: nowrap;
  transition: background 0.2s;
}

.dropdown-item:hover {
  background-color: #444;
  color: #fff;
}
</style>

