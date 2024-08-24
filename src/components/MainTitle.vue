<template>
  <div class="mb-2" style="height: 40px">
    <div class="titleFont">{{ props.title }}</div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({ title: String })
</script>
