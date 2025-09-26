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

useHead({
  title: computed(() => t('pages.development.tab_name')),
  meta: [
    {
      name: 'description',
      content: computed(() => t('pages.development.meta.content')),
    },
  ],
})
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
