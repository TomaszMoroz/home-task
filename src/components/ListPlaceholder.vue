<template>
  <div class="list-placeholder" style="height: 444px">
    <p class="text-secondary">Please select the bus line first</p>
  </div>
</template>

<style>
.list-placeholder{
  /* Auto layout */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 21px;

  /* Main_Colors/Main/White */
  background: #FFFFFF;
  /* Main_Colors/Main_Universal/Main_Lighten_3 */
  border: 2px dashed #9A9DA4;
  border-radius: 4px;

  /* Inside auto layout */
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 1;
}
</style>