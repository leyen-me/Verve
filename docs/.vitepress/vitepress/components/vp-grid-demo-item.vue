<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue'
import { useClipboard } from '@vueuse/core'
import { CopyDocument } from '@element-plus/icons-vue'
import { useLang } from '../composables/lang'
import demoBlockLocale from '../../i18n/component/demo-block.json'

const props = defineProps<{
  name: string
  description: string
  rawSource: string
}>()

const vm = getCurrentInstance()!
const lang = useLang()
const locale = computed(() => demoBlockLocale[lang.value])

const { copy, isSupported } = useClipboard({
  source: decodeURIComponent(props.rawSource),
  read: false,
})

const copyCode = async () => {
  const { $message } = vm.appContext.config.globalProperties
  if (!isSupported) {
    $message.error(locale.value['copy-error'])
  }
  try {
    await copy()
    $message.success(locale.value['copy-success'])
  } catch (e: any) {
    $message.error(e.message)
  }
}
</script>

<template>
  <li>
    <slot name="source" />
    <el-button
      class="copy-button"
      :icon="CopyDocument"
      circle
      @click="copyCode"
    />
  </li>
</template>

<style lang="scss" scoped>
li {
  list-style: none;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  margin-right: -1px;
  margin-bottom: -1px;
  position: relative;
}

.copy-button {
  position: absolute;
  top: 12px;
  right: 12px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

li:hover .copy-button {
  opacity: 1;
}

@media screen and (max-width: 767px) {
  li {
    border-right: none;
  }

  li:nth-last-child(-n + 1) {
    border-bottom: none;
  }
}

@media screen and (min-width: 768px) {
  li:last-child {
    border-right: none;
  }

  li:nth-last-child(2n + 1) {
    border-right: none;
  }

  li:nth-last-child(-n + 2) {
    border-bottom: none;
  }
}
</style>
