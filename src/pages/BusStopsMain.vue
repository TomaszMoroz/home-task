<template>
  <div class="row mb-4">
    <LinePicker :lines="linesNumbers" @done="displayLineDetails"/>
  </div>
  <div class="row d-flex justify-content-between">
    <div class="px-0" style="width: 49.3%">
      <ListPlaceholder v-if="!currentLineNumber"/>
      <DisplayDetails v-else :line="currentLineNumber" :list="currentLineDetails" type="line" @stopSelected="displayStopDetails"/>
    </div>
    <div class="px-0" style="width: 49.3%">
      <ListPlaceholder v-if="!currentStopName"/>
      <DisplayDetails v-else :stop="currentStopName" :list="currentStopTimeShedule" type="shedule" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps } from 'vue'
import LinePicker from '@/components/LinePicker.vue'
import DisplayDetails from '@/components/DisplayDetails.vue'
import ListPlaceholder from '@/components/ListPlaceholder.vue'

// Define props
const props = defineProps({
  initialData: {
    type: Array,
    required: true
  }
})

// Your existing logic
const currentLineNumber = ref(null)
const currentStopName = ref(null)

const linesNumbers = computed(() => {
  const allLines = props.initialData.map(s => s.line)
  return getUniqueValues(allLines).sort()
})

const detailsByLine = computed(() => {
  return linesNumbers.value && Object.groupBy(props.initialData, ({ line }) => line)
})

const currentLineDetails = computed(() => currentLineNumber.value && detailsByLine.value[currentLineNumber.value])

const currentStopTimeShedule = computed(() => {
  const allLineStops = currentLineDetails.value
  const selectedStops = allLineStops
    .filter(line => line.stop === currentStopName.value)
    .map(s => {
      const formatedTimeString = s.time.replace(':', '.')
      return parseFloat(formatedTimeString)
    })
    .sort((prev, next) => prev - next)
    .map(t => {
      const [integer, decimal] = t.toString().split('.')
      return `${integer.padStart(2, '0')}:${decimal.padStart(2, '0')}`
    })

  return selectedStops
})

function displayLineDetails(number) {
  currentStopName.value = null
  currentLineNumber.value = number
}

function displayStopDetails(name) {
  currentStopName.value = name
}

const getUniqueValues = (array) => (
  array.reduce((accumulator, currentValue) => (
    accumulator.includes(currentValue) ? accumulator : [...accumulator, currentValue]
  ), [])
)
</script>

