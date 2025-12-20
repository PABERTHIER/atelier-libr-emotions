<template>
  <div class="cv">
    <div class="page-header">
      <PageHeaderOrnament />
      <PageTitle
        :title="t('pages.cv.title')"
        :subtitle="t('pages.cv.subtitle')" />
    </div>

    <div class="pdf-container">
      <div class="pdf-viewer">
        <iframe
          v-if="!isTouchDevice"
          :src="`${pdfPath}#view=FitH&toolbar=1`"
          :title="t('pages.cv.pdf_title')"
          class="pdf-iframe"
          frameborder="0" />

        <div v-else class="mobile-pdf-viewer">
          <div class="pdf-preview">
            <Image
              src="/cv/page_1.webp"
              sizes="sm:300px, md:450px, lg:600px"
              max-height="1500px"
              :title="pageOneTitle"
              :alt="pageOneAlt" />

            <Image
              src="/cv/page_2.webp"
              sizes="sm:300px, md:450px, lg:600px"
              max-height="1500px"
              :title="pageTwoTitle"
              :alt="pageTwoAlt" />
          </div>
        </div>
      </div>

      <div class="download-section">
        <a
          :href="pdfPath"
          :download="t('pages.cv.download_filename')"
          :aria-label="t('pages.cv.download_label')"
          class="download-button">
          <Icon name="heroicons:arrow-down-tray" size="20px" />
          <span>{{ t('pages.cv.download_button') }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const runtimeConfig = useRuntimeConfig()
const route = useRoute()

const baseUrl = ref(runtimeConfig.public.i18n.baseUrl)
const urlEndPath = 'about/cv'
const ogImageEndPath = 'paintings/celestial-collision.jpg' // TODO: Update ogImage

const canonicalUrl = computed(() => `${baseUrl.value}${route.path}`)

useHead({
  title: computed(() => t('pages.cv.tab_name')),
  meta: [
    {
      name: 'description',
      content: computed(() => t('pages.cv.meta.content')),
    },
    {
      name: 'keywords',
      content: `${computed(() => t('miscellaneous.art')).value},
        ${computed(() => t('miscellaneous.my_cv')).value},
        ${computed(() => t('miscellaneous.cv')).value},
        ${computed(() => t('miscellaneous.exhibitions')).value},
        ${computed(() => t('miscellaneous.events')).value},
        ${computed(() => t('miscellaneous.experiences')).value},
        ${computed(() => t('miscellaneous.performances')).value},
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
  description: computed(() => t('pages.cv.meta.content')),
  ogDescription: computed(() => t('pages.cv.meta.content')),
  ogImage: `${baseUrl.value}/${ogImageEndPath}`,
  ogImageSecureUrl: `${baseUrl.value}/${ogImageEndPath}`,
  ogImageAlt: computed(() => t('pages.cv.meta.content')),
  ogImageType: 'image/jpeg',
  ogImageWidth: '1200',
  ogImageHeight: '600',
  ogUrl: canonicalUrl.value,
  twitterTitle: '%s %separator %siteName',
  twitterDescription: computed(() => t('pages.cv.meta.content')),
  twitterImage: `${baseUrl.value}/${ogImageEndPath}`,
  twitterImageAlt: computed(() => t('pages.cv.meta.content')),
  twitterImageType: 'image/jpeg',
  articleTag: [
    computed(() => t('miscellaneous.my_cv')).value,
    computed(() => t('miscellaneous.cv')).value,
    computed(() => t('miscellaneous.exhibitions')).value,
    computed(() => t('miscellaneous.events')).value,
    computed(() => t('miscellaneous.experiences')).value,
    computed(() => t('miscellaneous.performances')).value,
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
//   title: computed(() => t('pages.cv.tab_name')),
//   description: computed(() => t('pages.cv.meta.content')),
// })

const pdfPath = '/documents/CV_Berthier_Véronique.pdf'

const pageOneTitle = computed(() => t('pages.cv.page_1_title'))
const pageOneAlt = computed(() => t('pages.cv.page_1_alt'))
const pageTwoTitle = computed(() => t('pages.cv.page_2_title'))
const pageTwoAlt = computed(() => t('pages.cv.page_2_alt'))

const isTouchDevice = ref(false)

onMounted(() => {
  isTouchDevice.value = 'ontouchstart' in window || navigator.maxTouchPoints > 0
})
</script>

<style lang="scss" scoped>
.cv {
  .page-header {
    margin-bottom: 50px;
  }

  .pdf-container {
    .pdf-viewer {
      margin-bottom: 30px;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 8px 32px $box-shadow-color;
      background: $white-color;
      animation: fadeInUpBlock 0.8s ease-out;
      animation-fill-mode: both;

      @for $i from 1 through 15 {
        &:nth-child(#{$i}) {
          animation-delay: #{$i * 0.1}s;
        }
      }

      iframe {
        display: block;
      }

      .pdf-iframe {
        width: 60vw;
        height: calc(
          var(--vh, 1vh) * 100 - #{$header-height-desktop} - #{$footer-height} -
            40px
        );
        border-radius: 12px;
      }

      .mobile-pdf-viewer {
        width: 100%;

        .pdf-preview {
          width: 100%;
        }
      }
    }

    @media (max-width: $lg) {
      .pdf-viewer {
        .pdf-iframe {
          width: calc(100vw - 160px);
        }
      }
    }

    @media (max-width: $md) {
      .pdf-viewer {
        padding: 15px;
        border-radius: 10px;

        .pdf-iframe {
          width: calc(100vw - 80px);
          border-radius: 10px;
        }
      }
    }

    @media (max-width: $sm) {
      .pdf-viewer {
        padding: 10px;
        border-radius: 7px;

        .pdf-iframe {
          border-radius: 7px;
        }
      }
    }

    .download-section {
      display: flex;
      justify-content: center;

      .download-button {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 12px 30px;
        border-radius: 50px;
        color: $white-color;
        text-decoration: none;
        font-size: 16px;
        font-weight: 600;
        box-shadow: 0 4px 15px $box-shadow-warm;
        transition: all 0.3s ease;
        background: linear-gradient(135deg, $gold-color, $copper-color);

        &:hover {
          box-shadow: 0 6px 20px $box-shadow-warm;
          transform: translateY(-2px);
        }

        &:active {
          transform: translateY(0);
        }
      }
    }
  }
}
</style>
