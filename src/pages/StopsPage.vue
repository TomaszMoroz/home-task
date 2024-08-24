<template>
  <div class="row">
    <div class="col-12 px-0">
      <DisplayDetails :list="stopsList" type="search"/>
    </div>
  </div>
</template>

<script setup>
import { useAttrs } from 'vue'
import DisplayDetails from '@/components/DisplayDetails.vue';

const attrs = useAttrs()
const stopsList = attrs.initialData.length
  ? attrs.initialData.map(i => {
    const { stop, order } = i
    return { stop, order }
  })
  : []
</script>
