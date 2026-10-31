<template>
  <div class="image">
    <a
      :href="src"
      :aria-label="
        t('components.image.open_original', { title: title || alt })
      ">
      <NuxtImg
        :key="src"
        :src="src"
        :sizes="sizes"
        :title="title"
        :alt="alt"
        densities="x1 x2"
        loading="lazy"
        placeholder
        :style="{ maxHeight }"
        :class="{ 'image-unavailable': imageError }"
        v-on="imageEvents" />
      <span v-if="imageError" role="status" class="image-error">
        {{ t('components.image_preview_modal.image_unavailable') }}
      </span>
    </a>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  sizes: {
    type: String,
    required: true,
  },
  maxHeight: {
    type: String,
    required: false,
    default: '200px',
  },
  title: {
    type: String,
    required: false,
    default: '',
  },
  alt: {
    type: String,
    required: true,
    validator: (value: string) => value.trim().length > 0,
  },
})

const { t } = useI18n()

const imageError = ref(false)

const imageEvents = computed(() => {
  const source = props.src

  return {
    load: () => {
      if (props.src === source) {
        imageError.value = false
      }
    },
    error: () => {
      if (props.src === source) {
        imageError.value = true
      }
    },
  }
})

watch(
  () => props.src,
  () => {
    imageError.value = false
  }
)
</script>

<style lang="scss" scoped>
.image {
  :deep(a) {
    display: block;
    line-height: 0;
  }

  :deep(.image-unavailable) {
    display: none;
  }

  .image-error {
    display: block;
    line-height: 1.5;
    color: $dark-grey-color;
  }
}
</style>
