<template>
  <q-btn
    ref="button"
    unelevated
    :dense="dense"
    no-caps
    type="submit"
    :color="props.color"
    :class="props.class"
    :loading="loading"
    :disable="loading"
    style="min-width:100px"
    :rounded="rounded"
    :to="to"
  >
    <div
      class="f-12"
      :class="color===''?'text-primary':''"
    >
      {{ label }}
    </div>
    <template #loading>
      <q-spinner-hourglass
        class="on-left"
        size="18px"
      />
      <span class="f-12"> Loading </span>
    </template>
  </q-btn>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'submit'
  },
  to: {
    type: String,
    default: '/'
  },
  color: {
    type: String,
    default: 'primary'
  },
  class: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: 'Label'
  },
  loading: {
    type: Boolean,
    default: false
  },
  fullwidth: {
    type: Boolean,
    default: false
  },
  rounded: {
    type: Boolean,
    default: false
  },
  dense: {
    type: Boolean,
    default: false
  }

})

const button = ref(null)
console.log(button)
</script>

<style lang="scss" scoped>

</style>
