<template>
  <div class="card border-0" :style="!isSearch ? { height: '444px' } : { height: '680px' }">
    <div>
      <ListHeader :header="header" @sort="sortList" @input="filterList"/>
      <div class="overflow-scroll overflow-scroll" :style="!isSearch ? { height: '332px' } : { height: '555px' }">
        <div class="listItemFont list-group rounded-0">
          <a v-for="(item, index) in listItems" 
          :key="index" 
          @click="selectStop(item.stop)" :disable="props.type !== 'line'" 
          class="list-group-item list-group-item-action py-3 border-start-0 border-end-0 listItemField"
          :class="typeof item !== 'string' && item.stop === activeItem ? 'text-primary' : ''">
            {{ isTimeShedule ? item : `${item.stop} ${item.order}` }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed, ref } from 'vue'
import ListHeader from './ListHeader.vue'

const props = defineProps({ line: Number, stop: String, list: Array, type: String })
const emit = defineEmits(['stopSelected'])

const activeItem = ref(null)
const sort = ref(false)

const listData = computed(() => props.list)
const filteredList = ref([...listData.value])
const listItems = computed(() => {
  let adaptedListItems = []
  const getUniqueStops = (stops) => {
    const stopsSet = new Set()
    const uniqueStops = stops.filter(({ stop, order }) => {
      const uniqueKey = `${stop}-${order}`
        if (!stopsSet.has(uniqueKey)) {
          stopsSet.add(uniqueKey)
          return true
        }
    return false
})

    return uniqueStops
  }
  if (isTimeShedule.value) adaptedListItems = listData.value
  else if (isLineStops.value) {
  const stopsWithinLine = getUniqueStops(listData.value)
  
  sort.value
    ? adaptedListItems = stopsWithinLine.sort((prev, next) => prev.order - next.order)
    : adaptedListItems = stopsWithinLine.sort((prev, next) => prev.stop.localeCompare(next.stop))
  } else {
    sort.value
      ? adaptedListItems = getUniqueStops(filteredList.value).sort((prev, next) => prev.order - next.order)
      : adaptedListItems = getUniqueStops(filteredList.value).sort((prev, next) => prev.stop.localeCompare(next.stop))
  }

  return adaptedListItems
})

const isTimeShedule = computed(() => props.type === 'shedule')
const isLineStops = computed(() => props.type === 'line')
const isSearch = computed(() => props.type === 'search')

const header = computed(() => isTimeShedule.value
  ? `Bus Stop: ${props.stop}`
  : isSearch.value
    ? 'Bus Stops'
    : `Bus Line: ${props.line}`
)

function selectStop(name) {
  activeItem.value = name
  emit('stopSelected', name)
}

function sortList (s) {
  sort.value = s
}

function filterList(phrase) {
  if (!phrase) filteredList.value =  [...listData.value]
  else {
    filteredList.value = [...listData.value
      .filter(item => Object.values(item)
        .some(value => value.toString().toLowerCase().includes(phrase.toLowerCase())))]
  }
}
</script>

<style>
.listItemField{
  padding: 20px 0px 19px 12px;
  gap: 16px;
  opacity: 0px;
}

.active{
  color: #1952E1;
}
</style>