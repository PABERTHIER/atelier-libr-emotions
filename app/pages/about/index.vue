<template>
  <div class="about">
    <div class="page-header">
      <PageHeaderOrnament />
      <PageTitle
        :title="t('pages.about.title')"
        :subtitle="t('pages.about.subtitle')" />
    </div>

    <div class="content-container">
      <TextBlock :text-content="t('pages.about.intro')" class="text-block" />

      <TextBlock
        :text-content="t('pages.about.intuitive_work')"
        class="text-block" />

      <TextBlock
        :title="t('pages.about.creative_process_title')"
        :text-content="t('pages.about.creative_process')"
        type="highlight"
        class="text-block" />

      <TextBlock
        :text-content="t('pages.about.realization')"
        type="emphasis"
        class="text-block" />

      <TextBlock
        :text-content="t('pages.about.evolution')"
        type="quote"
        class="text-block" />

      <TextBlock
        :text-content="t('pages.about.wellbeing')"
        class="text-block" />

      <TextBlock
        :text-content="t('pages.about.emotional_expression')"
        class="text-block" />

      <TextBlock
        :text-content="t('pages.about.technique_philosophy')"
        type="emphasis"
        class="text-block" />

      <TextBlock
        :title="t('pages.about.benefits_title')"
        :text-content="t('pages.about.benefits')"
        type="highlight"
        class="text-block" />

      <TextBlock
        :text-content="t('pages.about.external_views')"
        class="text-block" />

      <TextBlock
        :title="t('pages.about.dare')"
        :text-content="t('pages.about.master_word')"
        type="master-word"
        class="text-block" />

      <TextBlock
        :text-content="t('pages.about.workshop_philosophy')"
        type="emphasis"
        class="text-block" />

      <TextBlock
        :text-content="t('pages.about.final_quote')"
        type="quote"
        class="text-block" />

      <div class="axes-section">
        <h2 class="section-title">
          {{ t('pages.about.activity_axes_title') }}
        </h2>

        <TextBlock
          :title="t('pages.about.axis_1_title')"
          :text-content="t('pages.about.axis_1_content')"
          type="axis"
          :axis-number="1"
          class="text-block" />

        <TextBlock
          :title="t('pages.about.axis_2_title')"
          :text-content="t('pages.about.axis_2_content')"
          type="axis"
          :axis-number="2"
          class="text-block" />

        <TextBlock
          :title="t('pages.about.axis_3_title')"
          :text-content="t('pages.about.axis_3_content')"
          type="axis"
          :axis-number="3"
          class="text-block" />
      </div>

      <div class="objectives-section">
        <h2 class="section-title">
          {{ t('pages.about.general_objectives_title') }}
        </h2>

        <TextBlock
          :text-content="t('pages.about.objective_1')"
          type="objective"
          :objective-number="1"
          class="text-block" />

        <TextBlock
          :text-content="t('pages.about.objective_2')"
          type="objective"
          :objective-number="2"
          class="text-block" />

        <TextBlock
          :text-content="t('pages.about.objective_3')"
          type="objective"
          :objective-number="3"
          class="text-block" />

        <TextBlock
          :text-content="t('pages.about.objective_4')"
          type="objective"
          :objective-number="4"
          class="text-block" />

        <TextBlock
          :text-content="t('pages.about.objective_5')"
          type="objective"
          :objective-number="5"
          class="text-block" />

        <h2 class="section-title professional-title">
          {{ t('pages.about.professional_objectives_title') }}
        </h2>

        <TextBlock
          :text-content="t('pages.about.professional_objective_1')"
          type="professional-objective"
          class="text-block" />

        <TextBlock
          :text-content="t('pages.about.professional_objective_2')"
          type="professional-objective"
          class="text-block" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const runtimeConfig = useRuntimeConfig()
const route = useRoute()

const baseUrl = ref(runtimeConfig.public.i18n.baseUrl)
const urlEndPath = 'about'
const ogImageEndPath = 'paintings/celestial-collision.jpg' // TODO: Update ogImage

const canonicalUrl = computed(() => `${baseUrl.value}${route.path}`)

useHead({
  title: computed(() => t('pages.about.tab_name')),
  meta: [
    {
      name: 'description',
      content: computed(() => t('pages.about.meta.content')),
    },
    {
      name: 'keywords',
      content: `${computed(() => t('miscellaneous.art')).value},
        ${computed(() => t('miscellaneous.my_artistic_approach')).value},
        ${computed(() => t('miscellaneous.creation')).value},
        ${computed(() => t('miscellaneous.activity_leader')).value},
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
  description: computed(() => t('pages.about.meta.content')),
  ogDescription: computed(() => t('pages.about.meta.content')),
  ogImage: `${baseUrl.value}/${ogImageEndPath}`,
  ogImageSecureUrl: `${baseUrl.value}/${ogImageEndPath}`,
  ogImageAlt: computed(() => t('pages.about.meta.content')),
  ogImageType: 'image/jpeg',
  ogImageWidth: '1200',
  ogImageHeight: '600',
  ogUrl: canonicalUrl.value,
  twitterTitle: '%s %separator %siteName',
  twitterDescription: computed(() => t('pages.about.meta.content')),
  twitterImage: `${baseUrl.value}/${ogImageEndPath}`,
  twitterImageAlt: computed(() => t('pages.about.meta.content')),
  twitterImageType: 'image/jpeg',
  articleTag: [
    computed(() => t('miscellaneous.my_artistic_approach')).value,
    computed(() => t('miscellaneous.creation')).value,
    computed(() => t('miscellaneous.activity_leader')).value,
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
//   title: computed(() => t('pages.about.tab_name')),
//   description: computed(() => t('pages.about.meta.content')),
// })
</script>

<style lang="scss" scoped>
.about {
  position: relative;

  .page-header {
    margin-bottom: 50px;
  }

  .content-container {
    max-width: 900px;

    .text-block {
      margin-bottom: 30px;

      &:last-child {
        margin-bottom: 25px;
      }
    }

    @media (max-width: $md) {
      .text-block {
        margin-bottom: 25px;

        &:last-child {
          margin-bottom: 0px;
        }
      }
    }

    .axes-section,
    .objectives-section {
      .section-title {
        position: relative;
        margin: 50px 0px;
        text-align: center;
        color: $primary-text-color;
        font-size: 30px;
        font-weight: 600;

        &::after {
          width: 80px;
          height: 2px;
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(
            90deg,
            transparent,
            $gold-color,
            transparent
          );
          content: '';
        }

        &.professional-title {
          color: $dark-red-color;

          &::after {
            background: linear-gradient(
              90deg,
              transparent,
              $dark-red-color,
              transparent
            );
          }
        }
      }
    }

    @media (max-width: $md) {
      .axes-section,
      .objectives-section {
        margin: 40px 0px 0px 0px;

        .section-title {
          font-size: 24px;
        }
      }
    }
  }
}
</style>
