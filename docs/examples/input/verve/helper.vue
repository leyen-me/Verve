<template>
  <el-form
    label-position="top"
    label-width="auto"
    size="large"
    verce
    :model="form"
  >
    <el-form-item label="Input with helper text" prop="email">
      <el-input v-model="form.email" placeholder="Email" style="width: 288px" />
      <template #description>
        <div style="margin: 0; padding: 0">
          We won‘t share your email with anyone
        </div>
      </template>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormRules } from 'element-plus'

const form = ref({
  email: '',
})
</script>
