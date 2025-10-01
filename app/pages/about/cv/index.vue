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

useHead({
  title: computed(() => t('pages.cv.tab_name')),
  meta: [
    {
      name: 'description',
      content: computed(() => t('pages.cv.meta.content')),
    },
  ],
})

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
