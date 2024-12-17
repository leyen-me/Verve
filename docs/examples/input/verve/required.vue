<template>
  <el-form
    label-position="top"
    label-width="auto"
    size="large"
    status-icon
    verce
    :model="form"
    :rules="rules"
  >
    <el-form-item label="Required input" prop="email">
      <el-input v-model="form.email" placeholder="Email" style="width: 288px" />
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormRules } from 'element-plus'

const form = ref({
  email: '',
})

const rules = reactive<FormRules<typeof form>>({
  email: [{ required: true, message: 'Please input email', trigger: 'blur' }],
})
</script>
