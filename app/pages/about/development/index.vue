<template>
  <div class="development">
    <div class="page-header">
      <PageHeaderOrnament />
      <PageTitle
        :title="t('pages.development.title')"
        :subtitle="t('pages.development.subtitle')" />
    </div>

    <div class="content-container">
      <TextSection
        class="text-section"
        :text-content="t('pages.development.intro')"
        :custom-section-class="'intro-section'" />
      <TextSection
        class="text-section"
        :text-content="t('pages.development.characteristic')"
        :custom-dot-class="'highlight-dot'"
        :custom-section-class="'highlight-section'"
        :is-highlight-quotation="true" />
      <TextSection
        class="text-section"
        :title="t('pages.development.early_life_title')"
        :text-content="t('pages.development.early_life')" />
      <TextSection
        class="text-section"
        :title="t('pages.development.scientific_career_title')"
        :text-content="t('pages.development.scientific_career')" />
      <TextSection
        class="text-section"
        :title="t('pages.development.artistic_discovery_title')"
        :text-content="t('pages.development.artistic_discovery')"
        :date="t('miscellaneous.2006')"
        :custom-dot-class="'milestone-dot'"
        :custom-section-class="'milestone-section'"
        :custom-title-class="'milestone-title'" />
      <TextSection
        class="text-section"
        :title="t('pages.development.solo_journey_title')"
        :text-content="t('pages.development.solo_journey')"
        :date="t('miscellaneous.2008')"
        :custom-dot-class="'milestone-dot'"
        :custom-section-class="'milestone-section'"
        :custom-title-class="'milestone-title'" />
      <TextSection
        class="text-section"
        :title="t('pages.development.learning_title')"
        :text-content="t('pages.development.learning')" />
      <TextSection
        class="text-section"
        :title="t('pages.development.current_practice_title')"
        :text-content="t('pages.development.current_practice')" />
      <TextSection
        class="text-section"
        :title="t('pages.development.teaching_title')"
        :text-content="t('pages.development.teaching')" />
      <TextSection
        class="text-section"
        :title="t('pages.development.workshop_title')"
        :text-content="t('pages.development.workshop_name')"
        :custom-dot-class="'highlight-dot'"
        :custom-section-class="'highlight-section'"
        :is-highlight-section="true" />
      <TextSection
        class="text-section"
        :title="t('pages.development.ceramics_title')"
        :text-content="t('pages.development.ceramics_journey')"
        :custom-dot-class="'milestone-dot'"
        :custom-section-class="'milestone-section'"
        :custom-title-class="'milestone-title'" />
      <TextSection
        class="text-section"
        :title="t('pages.development.current_ceramics_title')"
        :text-content="t('pages.development.current_ceramics')"
        :date="t('miscellaneous.2023')"
        :custom-dot-class="'final-dot'"
        :custom-section-class="'final-section'"
        :custom-title-class="'milestone-title'"
        :custom-text-class="'final-text'" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const runtimeConfig = useRuntimeConfig()
const route = useRoute()

const baseUrl = ref(runtimeConfig.public.i18n.baseUrl)
const urlEndPath = 'about/development'
const ogImageEndPath = 'paintings/celestial-collision.jpg' // TODO: Update ogImage

const canonicalUrl = computed(() => `${baseUrl.value}${route.path}`)

useHead({
  title: computed(() => t('pages.development.tab_name')),
  meta: [
    {
      name: 'description',
      content: computed(() => t('pages.development.meta.content')),
    },
    {
      name: 'keywords',
      content: `${computed(() => t('miscellaneous.art')).value},
        ${computed(() => t('miscellaneous.my_career')).value},
        ${computed(() => t('miscellaneous.development')).value},
        ${computed(() => t('miscellaneous.artistic_journey')).value},
        ${computed(() => t('miscellaneous.artist')).value},
        ${computed(() => t('miscellaneous.painting')).value},
        ${computed(() => t('miscellaneous.painter')).value},
        ${computed(() => t('miscellaneous.ceramic')).value},
        ${computed(() => t('miscellaneous.ceramicist')).value},
        ${computed(() => t('miscellaneous.pottery')).value},
        ${computed(() => t('miscellaneous.emotions')).value},
        ${computed(() => t('about.author')).value},
        ${computed(() => t('app.name')).value},
      `,
    },
  ],
  link: [
    { rel: 'canonical', href: canonicalUrl.value },
    {
      rel: 'alternate',
      href: computed(() => `${baseUrl.value}/en/${urlEndPath}`),
      hreflang: 'en-US',
    },
    {
      rel: 'alternate',
      href: computed(() => `${baseUrl.value}/fr/${urlEndPath}`),
      hreflang: 'fr-FR',
    },
    {
      rel: 'alternate',
      href: computed(() => `${baseUrl.value}/fr/${urlEndPath}`),
      hreflang: 'x-default',
    },
  ],
})

useSeoMeta({
  ogTitle: '%s %separator %siteName',
  description: computed(() => t('pages.development.meta.content')),
  ogDescription: computed(() => t('pages.development.meta.content')),
  ogImage: `${baseUrl.value}/${ogImageEndPath}`,
  ogImageSecureUrl: `${baseUrl.value}/${ogImageEndPath}`,
  ogImageAlt: computed(() => t('pages.development.meta.content')),
  ogImageType: 'image/jpeg',
  ogImageWidth: '1200',
  ogImageHeight: '600',
  ogUrl: canonicalUrl.value,
  twitterTitle: '%s %separator %siteName',
  twitterDescription: computed(() => t('pages.development.meta.content')),
  twitterImage: `${baseUrl.value}/${ogImageEndPath}`,
  twitterImageAlt: computed(() => t('pages.development.meta.content')),
  twitterImageType: 'image/jpeg',
  articleTag: [
    computed(() => t('miscellaneous.my_career')).value,
    computed(() => t('miscellaneous.development')).value,
    computed(() => t('miscellaneous.artistic_journey')).value,
    computed(() => t('miscellaneous.art')).value,
    computed(() => t('miscellaneous.artist')).value,
    computed(() => t('miscellaneous.painting')).value,
    computed(() => t('miscellaneous.painter')).value,
    computed(() => t('miscellaneous.ceramic')).value,
    computed(() => t('miscellaneous.ceramicist')).value,
    computed(() => t('miscellaneous.pottery')).value,
    computed(() => t('miscellaneous.emotions')).value,
    computed(() => t('about.author')).value,
    computed(() => t('app.name')).value,
  ],
  appleMobileWebAppTitle: '%s %separator %siteName',
  msapplicationTileImage: `${baseUrl.value}/${ogImageEndPath}`,
})

// defineOgImageComponent('NuxtSeo', {
//   theme: '#FF0000',
//   colorMode: 'dark',
//   title: computed(() => t('pages.development.tab_name')),
//   description: computed(() => t('pages.development.meta.content')),
// })
</script>

<style lang="scss" scoped>
.development {
  position: relative;

  .page-header {
    margin-bottom: 50px;
  }

  .content-container {
    max-width: 900px;
    position: relative;

    &::before {
      width: 2px;
      position: absolute;
      left: 29px;
      top: 0;
      bottom: 0;
      z-index: 1;
      background: linear-gradient(
        180deg,
        transparent 0%,
        $light-grey-color 10%,
        $grey-blue-color 50%,
        $light-grey-color 90%,
        transparent 100%
      );
      content: '';
    }

    .text-section {
      position: relative;
      z-index: 2;
      animation: fadeInUp 0.8s ease-out;
      animation-fill-mode: both;

      @for $i from 1 through 15 {
        &:nth-child(#{$i}) {
          animation-delay: #{$i * 0.1}s;
        }
      }
    }
  }

  @media (max-width: $lg) {
    .content-container::before {
      left: 14px;
    }
  }

  @media (max-width: $md) {
    .content-container::before {
      left: 9px;
    }
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
