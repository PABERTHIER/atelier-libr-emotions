<template>
  <div class="homepage">
    <div class="abstract-autumn-container">
      <!-- <Image src="/paintings/abstract-autumn.jpg" :title="abstractAutumnPaintingTitle" :alt="abstractAutumnPaintingAlt" sizes="sm:200px, md:350px, lg:500px" /> -->
      <Image src="/paintings/abstract-autumn.jpg" :title="abstractAutumnPaintingTitle" :alt="abstractAutumnPaintingAlt" sizes="sm:20px, md:35px, lg:50px" />
      <NuxtImg src="paintings/celestial-collision.jpg" :title="'logo'" :alt="'logo'" sizes="sm:20px, md:30px, lg:40px" />
      <div class="description" v-t="'pages.main.abstract_autumn_painting.description'" />
      <div v-t="'pages.main.abstract_autumn_painting.meta'" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const runtimeConfig = useRuntimeConfig()
const baseUrl = ref(runtimeConfig.public.i18n.baseUrl)
const ogImageEndPath = 'paintings/celestial-collision.jpg'

useHead({
  title: computed(() => t('pages.main.tab_name')),
  meta: [
    { name: 'description', content: computed(() => t('app.meta.description')) },
  ],
})

useSeoMeta({
  ogTitle: '%s %separator %siteName',
  description: computed(() => t('app.meta.description')),
  ogDescription: computed(() => t('app.meta.description')),
  ogImage: `${baseUrl.value}/${ogImageEndPath}`,
  ogImageSecureUrl: `${baseUrl.value}/${ogImageEndPath}`,
  ogImageAlt: computed(() => t('app.meta.description')),
  ogImageType: 'image/jpeg',
  ogImageWidth: '1200',
  ogImageHeight: '600',
  twitterTitle: '%s %separator %siteName',
  twitterDescription: computed(() => t('app.meta.description')),
  twitterImage: `${baseUrl.value}/${ogImageEndPath}`,
  twitterImageAlt: computed(() => t('app.meta.description')),
  twitterImageType: 'image/jpeg',
  appleMobileWebAppTitle: '%s %separator %siteName',
  msapplicationTileImage: `${baseUrl.value}/${ogImageEndPath}`
})

defineOgImageComponent('NuxtSeo', { theme: '#ff0000', colorMode: 'dark' })

const abstractAutumnPaintingTitle = computed(() => t('pages.main.abstract_autumn_painting.title'))
const abstractAutumnPaintingAlt = computed(() => t('pages.main.abstract_autumn_painting.alt'))
</script>

<style lang="scss" scoped>
.homepage {
  .abstract-autumn-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    color: $primary-text-color;

    .description {
      margin: 10px 0px;
    }
  }
}
</style>
