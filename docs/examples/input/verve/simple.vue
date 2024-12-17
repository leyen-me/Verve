<template>
  <el-form
    label-position="top"
    label-width="auto"
    :model="form"
    size="large"
    verce
  >
    <el-form-item label="Simple input" prop="email">
      <el-input v-model="form.email" placeholder="Email" style="width: 288px" />
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const form = ref({
  email: '',
})
</script>
