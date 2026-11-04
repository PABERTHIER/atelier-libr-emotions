<template>
  <article class="development-page" @focusin="finishEntranceAnimation">
    <header class="development-page__header">
      <PageHeaderOrnament />
      <PageTitle
        :title="t('pages.development.title')"
        :subtitle="t('pages.development.subtitle')" />
    </header>

    <section class="development-page__timeline" aria-labelledby="journey-title">
      <h2 id="journey-title" class="sr-only">
        {{ t('miscellaneous.artistic_journey') }}
      </h2>
      <TextSection
        class="development-page__text-section"
        :text-content="t('pages.development.intro')"
        :custom-section-class="'intro-section'" />
      <TextSection
        class="development-page__text-section"
        :text-content="t('pages.development.characteristic')"
        :custom-dot-class="'highlight-dot'"
        :custom-section-class="'highlight-section'"
        :is-highlight-quotation="true" />
      <TextSection
        class="development-page__text-section"
        :title="t('pages.development.early_life_title')"
        :text-content="t('pages.development.early_life')" />
      <TextSection
        class="development-page__text-section"
        :title="t('pages.development.scientific_career_title')"
        :text-content="t('pages.development.scientific_career')" />
      <TextSection
        class="development-page__text-section"
        :title="t('pages.development.artistic_discovery_title')"
        :text-content="t('pages.development.artistic_discovery')"
        :date="t('miscellaneous.2006')"
        :custom-dot-class="'milestone-dot'"
        :custom-section-class="'milestone-section'"
        :custom-title-class="'milestone-title'" />
      <TextSection
        class="development-page__text-section"
        :title="t('pages.development.solo_journey_title')"
        :text-content="t('pages.development.solo_journey')"
        :date="t('miscellaneous.2008')"
        :custom-dot-class="'milestone-dot'"
        :custom-section-class="'milestone-section'"
        :custom-title-class="'milestone-title'" />
      <TextSection
        class="development-page__text-section"
        :title="t('pages.development.learning_title')"
        :text-content="t('pages.development.learning')" />
      <TextSection
        class="development-page__text-section"
        :title="t('pages.development.current_practice_title')"
        :text-content="t('pages.development.current_practice')" />
      <TextSection
        class="development-page__text-section"
        :title="t('pages.development.teaching_title')"
        :text-content="t('pages.development.teaching')" />
      <TextSection
        class="development-page__text-section"
        :title="t('pages.development.workshop_title')"
        :text-content="t('pages.development.workshop_name')"
        :custom-dot-class="'highlight-dot'"
        :custom-section-class="'highlight-section'"
        :is-highlight-section="true" />
      <TextSection
        class="development-page__text-section"
        :title="t('pages.development.ceramics_title')"
        :text-content="t('pages.development.ceramics_journey')"
        :custom-dot-class="'milestone-dot'"
        :custom-section-class="'milestone-section'"
        :custom-title-class="'milestone-title'" />
      <TextSection
        class="development-page__text-section"
        :title="t('pages.development.current_ceramics_title')"
        :text-content="t('pages.development.current_ceramics')"
        :date="t('miscellaneous.2023')"
        :custom-dot-class="'final-dot'"
        :custom-section-class="'final-section'"
        :custom-title-class="'milestone-title'"
        :custom-text-class="'final-text'" />
    </section>
  </article>
</template>

<script setup lang="ts">
const { t } = useI18n()

function finishEntranceAnimation(event: FocusEvent) {
  if (!(event.target instanceof HTMLElement)) {
    return
  }

  const section = event.target.closest('.development-page__text-section')

  for (const animation of section?.getAnimations() ?? []) {
    if (
      animation instanceof CSSAnimation &&
      animation.animationName === 'fadeInUpBlock'
    ) {
      animation.finish()
    }
  }
}

useHead(usePageSeo('about_development'))
</script>

<style lang="scss" scoped>
.development-page {
  position: relative;
  width: 100%;
  min-width: 0;
  max-width: 56.25rem;

  &__header {
    margin-bottom: $space-50;
  }

  &__timeline {
    position: relative;

    &::before {
      width: $space-2;
      position: absolute;
      left: calc(#{$space-30} - #{$border-width});
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
  }

  &__text-section {
    position: relative;
    z-index: 2;
    scroll-margin-block: $space-24;
  }

  @media (max-width: $lg) {
    &__timeline::before {
      left: $space-14;
    }
  }

  @media (max-width: $md) {
    &__timeline::before {
      left: calc(#{$space-10} - #{$border-width});
    }
  }
}

@media (prefers-reduced-motion: no-preference) {
  .development-page__text-section {
    animation: fadeInUpBlock 0.8s ease-out both;
  }
}
</style>
