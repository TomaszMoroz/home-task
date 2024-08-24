<template>
  <div class="card border-0 d-flex flex-column justify-content-end" style="height: 64px;">
    <ul class="flex-row nav nav-tabs nav-row navFont ms-4" id="navTabs" role="tablist">
      <li class="nav-item" role="presentation">
        <router-link to="/" class="nav-link" exact-active-class="active">
          Bus Lines
        </router-link>
      </li>
      <li class="nav-item" role="presentation">
        <router-link to="/stops" class="nav-link" exact-active-class="active">
          Stops
        </router-link>
      </li>
    </ul>
  </div>
</template>
