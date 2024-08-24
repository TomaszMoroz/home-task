<template>
  <div class="container bg" style="width: 1440px; height: 900px; padding: 32px">
    <div class="row">
      <div class="col-12 d-flex flex-column justify-content-between">
        <div style="height: 5%">
          <MainTitle title="Timetable"/>
        </div>
        <div style="height: 8%">
          <NavBar />
        </div>
        <div style="height: 80%; margin-left: 12px; margin-right: 12px;">
          <router-view v-if="!isLoading" :initialData="initialData"/>
          <div v-else class="container-fluid d-flex align-items-center justify-content-center">
            <div class="spinner-border" style="width: 5rem; height: 5rem" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import MainTitle from '@/components/MainTitle.vue'
import NavBar from '@/components/NavBar.vue'

const initialData = ref([])
const isLoading = ref(false)
const isError = ref(false)

onMounted(async () => { 
  try {
    isLoading.value = true

    await axios.get('http://localhost:3000/stops')
      .then(
        function (response) {
        initialData.value = response.data
      }
    )
  } catch (err) { 
    console.error(err)
    isError.value = true
    
  } finally {
    isLoading.value = false
  }
})
</script>

<style>
.bg{
  background-color: #F3F4F9;
}

.nav-tabs {
  border-bottom: none; /* Remove bottom border from the tab container */
}

.nav-tabs .nav-link {
  position: relative;
  padding-bottom: 1rem; 
  color: #9A9DA4; /* non adtive tab color */
  border: none; /* Remove default border */
  border-radius: 0; /* Remove border-radius */
  background-color: transparent; /* Ensure no background color */
  transition: color 0.3s ease; /* Smooth transition for text color */
}

/* Create the underline effect */
.nav-tabs .nav-link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px; /* Thickness of the underline */
  background-color: transparent;
  transition: background-color 0.3s ease;
}

/* Active tab styles */
.nav-tabs .nav-link.active {
  color: #33373C;
; /* Text color for the active tab */
}

.nav-tabs .nav-link.active::after {
  background-color: #0d6efd; /* Bootstrap primary color */
}
</style>
