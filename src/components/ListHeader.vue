<template>
  <div class="pt-3" style="height: 112px">
   <div v-if="isSearch" class="input-group w-25 ms-1">
      <input v-model="searchInput" @update:model-value="v => onInput(v)" type="text" class="form-control rounded" placeholder="Search..." >
        <span class="input-group-text bg-transparent border-0 position-absolute end-0 me-2">
            <i class="bi bi-search"></i>
        </span>
    </div>
    <div class="h-50 d-flex flex-row align-content-center ps-3" :class="isSearch && 'mt-3'">
      <div class="customH1">{{ props.header }}</div>
      <img v-if="isSearch" :src="icon" style="width: 20px; height: 20px" alt="sort list icon" @click="sortList" />
    </div>
    <div v-if="!isSearch" class="d-flex flex-row align-content-center h-50 ps-3">
      <div class="customH2 me-2">{{ subHeader }}</div>
      <img v-if="subHeader === 'Bus Stops'" :src="icon" style="width: 16px; height: 16px" alt="sort list icon" @click="sortList" />
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed, ref } from 'vue'
import icon from '../../public/Sort.png'

const props = defineProps({ header: String })
const emit = defineEmits(['sort', 'input'])

const searchInput = ref('')
const sortToggle = ref(false)
const subHeader = computed(() => props.header.includes('Line') 
  ? 'Bus Stops'
  : 'Time'
)

const isSearch = computed(() => props.header === 'Bus Stops')

function sortList () {
  sortToggle.value = !sortToggle.value
  emit('sort', sortToggle.value)
}

function onInput (v) {
  emit('input', v)
}
</script>