<template>
  <article class="cv-page">
    <header class="cv-page__header">
      <PageHeaderOrnament />
      <PageTitle
        :title="t('pages.cv.title')"
        :subtitle="t('pages.cv.subtitle')" />
    </header>

    <section class="cv-page__document" aria-labelledby="cv-document-title">
      <h2 id="cv-document-title" class="sr-only">
        {{ t('pages.cv.document_title') }}
      </h2>
      <div id="cv-document-description" class="cv-page__notice">
        <p>{{ t('pages.cv.document_language') }}</p>
        <p>{{ t('pages.cv.document_description') }}</p>
      </div>
      <div class="cv-page__viewer">
        <iframe
          v-if="!isTouchDevice"
          :src="`${pdfPath}#view=FitH&toolbar=1`"
          :title="t('pages.cv.pdf_title')"
          aria-describedby="cv-document-description"
          class="cv-page__iframe" />
        <div v-else class="cv-page__previews">
          <ImagePreviewButton
            v-for="(image, index) in previewImages"
            :key="image.src"
            class="cv-page__preview"
            :image="image"
            loading="eager"
            @select="openViewer(index, $event)" />
        </div>
      </div>

      <div class="cv-page__actions">
        <a
          :href="pdfPath"
          :download="t('pages.cv.download_filename')"
          class="cv-page__download">
          <Icon name="lucide:download" aria-hidden="true" />
          {{ t('pages.cv.download_button') }}
          <span class="sr-only">— PDF</span>
        </a>
        <a
          :href="pdfPath"
          target="_blank"
          rel="noopener noreferrer"
          class="cv-page__open">
          {{ t('pages.cv.open_pdf') }}
          <span class="sr-only">— {{ t('miscellaneous.opens_new_tab') }}</span>
        </a>
      </div>
    </section>
    <ImagePreviewModal
      v-if="viewerImage"
      :image="viewerImage"
      :images="previewImages"
      :visible="viewerVisible"
      :opener="viewerOpener"
      @select="selectImage"
      @close="closeViewer" />

    <section class="cv-page__text-version" aria-labelledby="cv-text-title">
      <h2 id="cv-text-title" class="sr-only">
        {{ t('pages.cv.text_version') }}
      </h2>
      <details class="cv-page__transcript">
        <summary class="cv-page__transcript-toggle">
          {{ t('pages.cv.read_text') }}
        </summary>
        <div class="cv-page__transcript-content">
          <h3 class="cv-page__transcript-title">
            {{ t('pages.cv.text.role') }}
          </h3>
          <p>{{ t('about.author') }}</p>
          <p>{{ t('pages.cv.text.introduction') }}</p>
          <p>
            <strong>{{ t('pages.cv.text.motto') }}</strong>
          </p>
          <p>{{ t('pages.cv.text.process') }}</p>
          <p>
            <strong>{{ t('pages.cv.text.invitation') }}</strong>
          </p>
          <p class="cv-page__transcript-contacts">
            <a :href="`tel:${t('pages.cv.text.phone_uri')}`">
              {{ t('pages.cv.text.phone') }}
            </a>
            <a :href="`mailto:${t('about.mail_address')}`">
              {{ t('about.mail_address') }}
            </a>
          </p>
          <section
            v-for="section in transcriptSections"
            :key="section.id"
            :aria-labelledby="`cv-${section.id}-title`">
            <h3
              :id="`cv-${section.id}-title`"
              class="cv-page__transcript-title">
              {{ section.title }}
            </h3>
            <ul class="cv-page__entries">
              <li v-for="(entry, index) in section.entries" :key="index">
                {{ entry }}
              </li>
            </ul>
          </section>
        </div>
      </details>
    </section>
  </article>
</template>

<script setup lang="ts">
import type { ImageSource } from '~/types/image'

const { t } = useI18n()

const pdfPath = '/documents/CV_Berthier_Véronique.pdf'

const isTouchDevice = ref(false)

const previewImages = computed<ImageSource[]>(() =>
  [1, 2].map(number => ({
    src: `/cv/page_${number}.webp`,
    title: t(`pages.cv.page_${number}_title`),
    alt: t(`pages.cv.page_${number}_alt`),
  }))
)

const {
  viewerImage,
  viewerVisible,
  viewerOpener,
  openViewer,
  selectImage,
  closeViewer,
} = useImagePreview(() => previewImages.value)

const transcriptGroups = [
  { id: 'experience', count: 7 },
  { id: 'training', count: 8 },
  { id: 'exhibitions', count: 9 },
] as const

const transcriptSections = computed(() =>
  transcriptGroups.map(group => ({
    id: group.id,
    title: t(`pages.cv.text.${group.id}.title`),
    entries: Array.from({ length: group.count }, (_, index) =>
      t(`pages.cv.text.${group.id}.entries.${index}`)
    ),
  }))
)

onMounted(() => {
  isTouchDevice.value = 'ontouchstart' in window || navigator.maxTouchPoints > 0
})

useHead(usePageSeo('about_cv'))
</script>

<style lang="scss" scoped>
@use 'sass:color';

.cv-page {
  width: 100%;
  min-width: 0;
  max-width: 60rem;
  overflow-wrap: anywhere;

  &__header {
    margin-bottom: $space-50;
  }

  &__notice {
    margin: 0 0 $space-20;
    color: var(--color-muted);
    line-height: 1.6;
    text-align: center;

    p {
      margin: 0;
    }
  }

  &__viewer {
    min-width: 0;
    margin-bottom: $space-30;
    padding: $space-20;
    border-radius: $radius-panel;
    background: var(--color-surface);
    box-shadow: 0 $space-8 $space-32 $box-shadow-color;
  }

  & &__iframe {
    display: block;
    width: 100%;
    height: clamp(20rem, 70svh, 60rem);
    border: 0;
    border-radius: $radius-panel;
    pointer-events: auto; // Override Lenis's iframe pointer suppression during smooth scrolling
  }

  &__previews {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: $space-20;
    min-width: 0;

    :deep(img) {
      display: block;
      width: 100%;
      max-width: 100%;
      height: auto;
      margin-inline: auto;
      object-fit: contain;
    }
  }

  &__preview {
    width: 300px;
    margin-inline: auto;
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: $space-15 $space-30;
  }

  &__download {
    position: relative;
    isolation: isolate;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: $space-10;
    min-height: $control-size;
    max-width: 100%;
    padding: $space-12 $space-30;
    border-radius: 3.125rem;
    overflow: hidden;
    background: linear-gradient(
      135deg,
      color.adjust($gold-text-color, $lightness: 1.5%),
      color.adjust($copper-text-color, $lightness: 1.5%)
    );
    color: $white-color;
    box-shadow: 0 $space-4 $space-15 $box-shadow-warm;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.5;
    text-align: center;

    &::before {
      position: absolute;
      inset: 0;
      z-index: -1;
      background: linear-gradient(135deg, $gold-text-color, $copper-text-color);
      transform: translateX(-100%);
      pointer-events: none;
      content: '';
    }

    .iconify {
      flex: none;
      width: 1.25rem;
      height: 1.25rem;
    }

    &:hover,
    &:focus-visible {
      box-shadow: 0 $space-8 $space-25 $box-shadow-warm;

      &::before {
        transform: translateX(0);
      }
    }
  }

  &__open {
    display: inline-flex;
    align-items: center;
    min-height: $control-size;
    max-width: 100%;
    text-decoration: underline;
    text-underline-offset: 0.2em;
  }

  &__text-version {
    margin-top: $space-30;
  }

  &__transcript {
    padding: $space-16 $space-20;
    border: $border-width solid var(--color-navigation-muted);
    border-radius: $radius-panel;
    background: var(--color-surface);
    line-height: 1.7;
  }

  &__transcript-toggle {
    min-height: $control-size;
    padding-block: $space-8;
    cursor: pointer;
    font-weight: 600;
  }

  &__transcript-content {
    max-width: 75ch;
    margin-inline: auto;
  }

  &__transcript-title {
    margin: $space-30 0 $space-15;
    font-size: 1.25rem;
  }

  &__transcript-contacts {
    display: flex;
    flex-wrap: wrap;
    gap: $space-15;

    a {
      display: inline-flex;
      align-items: center;
      min-height: $control-size;
      text-decoration: underline;
      text-underline-offset: 0.2em;
    }
  }

  &__entries {
    margin: 0;
    padding-inline-start: $space-24;

    li + li {
      margin-top: $space-15;
    }
  }
}

@media (min-width: $md) {
  .cv-page__preview {
    width: 450px;
  }
}

@media (min-width: $lg) {
  .cv-page__preview {
    width: 600px;
  }
}

@media (max-width: $md) {
  .cv-page__viewer {
    padding: $space-10;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .cv-page__download {
    transition:
      transform $transition-ui,
      box-shadow $transition-ui;

    &::before {
      transition: transform 0.4s ease;
    }

    &:focus-visible {
      transform: translateY(-$space-2);
    }
  }

  @media (hover: hover) and (pointer: fine) {
    .cv-page__download:hover {
      transform: translateY(-$space-2);
    }
  }
}

@media (forced-colors: active) {
  .cv-page__download {
    border: $border-width solid LinkText;
  }
}
</style>
