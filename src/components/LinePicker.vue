<template>
  <div class="card border-0" style="height: 216px;">
    <div class="ps-3 pt-3 customH1">Select Bus Line</div>
      <div class="h-75 p-3">
      <button v-for="line in props.lines" 
        :key="line" 
        type="button" 
        class="btn btn-primary me-2 mb-2" 
        :class="activeBtn === line ? 'btn-active' : ''"
        @click="pickLine(line)">
          {{ line }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'
const props = defineProps({ lines: Array })
const emit = defineEmits(['done'])

const activeBtn = ref(null)

function pickLine(line) {
  activeBtn.value = line
  emit('done', line)
}
</script>

<style>
.btn-active {
  background-color: #2E3E6E;
}
</style>