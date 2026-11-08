<template>
  <article class="about-page" @focusin="finishEntranceAnimation">
    <header class="about-page__header">
      <PageHeaderOrnament />
      <PageTitle
        :title="t('pages.about.title')"
        :subtitle="t('pages.about.subtitle')" />
    </header>

    <section class="about-page__section" aria-labelledby="practice-title">
      <h2 id="practice-title" class="sr-only">
        {{ t('pages.about.practice_title') }}
      </h2>
      <TextBlock
        v-for="block in practiceBlocks"
        :key="block.key"
        :title="block.title"
        :text-content="block.text"
        :type="block.type"
        :heading-level="3"
        class="about-page__text-block" />
    </section>

    <section class="about-page__section" aria-labelledby="axes-title">
      <h2 id="axes-title" class="about-page__section-title">
        {{ t('pages.about.activity_axes_title') }}
      </h2>
      <ol class="about-page__list" role="list">
        <li v-for="axis in activityAxes" :key="axis.number">
          <TextBlock
            :title="axis.title"
            :text-content="axis.text"
            :heading-level="3"
            type="axis"
            :axis-number="axis.number"
            class="about-page__text-block" />
        </li>
      </ol>
    </section>

    <section class="about-page__section" aria-labelledby="objectives-title">
      <h2 id="objectives-title" class="about-page__section-title">
        {{ t('pages.about.general_objectives_title') }}
      </h2>
      <ol class="about-page__list" role="list">
        <li v-for="objective in generalObjectives" :key="objective.number">
          <TextBlock
            :text-content="objective.text"
            type="objective"
            :objective-number="objective.number"
            class="about-page__text-block" />
        </li>
      </ol>
    </section>

    <section class="about-page__section" aria-labelledby="professional-title">
      <h2
        id="professional-title"
        class="about-page__section-title about-page__section-title--professional">
        {{ t('pages.about.professional_objectives_title') }}
      </h2>
      <ul class="about-page__list" role="list">
        <li v-for="objective in professionalObjectives" :key="objective.number">
          <TextBlock
            :text-content="objective.text"
            type="professional-objective"
            class="about-page__text-block" />
        </li>
      </ul>
    </section>
  </article>
</template>

<script setup lang="ts">
const { t } = useI18n()

const practiceBlocks = computed(() => [
  {
    key: 'personal_quote',
    title: '',
    text: t('pages.about.personal_quote'),
    type: 'quote' as const,
  },
  {
    key: 'intro',
    title: '',
    text: t('pages.about.intro'),
    type: 'default' as const,
  },
  {
    key: 'intuitive_work',
    title: '',
    text: t('pages.about.intuitive_work'),
    type: 'default' as const,
  },
  {
    key: 'creative_process',
    title: t('pages.about.creative_process_title'),
    text: t('pages.about.creative_process'),
    type: 'highlight' as const,
  },
  {
    key: 'realization',
    title: '',
    text: t('pages.about.realization'),
    type: 'emphasis' as const,
  },
  {
    key: 'evolution',
    title: '',
    text: t('pages.about.evolution'),
    type: 'quote' as const,
  },
  {
    key: 'wellbeing',
    title: '',
    text: t('pages.about.wellbeing'),
    type: 'default' as const,
  },
  {
    key: 'emotional_expression',
    title: '',
    text: t('pages.about.emotional_expression'),
    type: 'default' as const,
  },
  {
    key: 'technique_philosophy',
    title: '',
    text: t('pages.about.technique_philosophy'),
    type: 'emphasis' as const,
  },
  {
    key: 'benefits',
    title: t('pages.about.benefits_title'),
    text: t('pages.about.benefits'),
    type: 'highlight' as const,
  },
  {
    key: 'external_views',
    title: '',
    text: t('pages.about.external_views'),
    type: 'default' as const,
  },
  {
    key: 'master_word',
    title: t('pages.about.dare'),
    text: t('pages.about.master_word'),
    type: 'master-word' as const,
  },
  {
    key: 'workshop_philosophy',
    title: '',
    text: t('pages.about.workshop_philosophy'),
    type: 'emphasis' as const,
  },
  {
    key: 'final_quote',
    title: '',
    text: t('pages.about.final_quote'),
    type: 'quote' as const,
  },
])

const activityAxes = computed(() =>
  Array.from({ length: 3 }, (_, index) => {
    const number = index + 1

    return {
      number,
      title: t(`pages.about.axis_${number}_title`),
      text: t(`pages.about.axis_${number}_content`),
    }
  })
)
const generalObjectives = computed(() =>
  Array.from({ length: 5 }, (_, index) => ({
    number: index + 1,
    text: t(`pages.about.objective_${index + 1}`),
  }))
)
const professionalObjectives = computed(() =>
  Array.from({ length: 2 }, (_, index) => ({
    number: index + 1,
    text: t(`pages.about.professional_objective_${index + 1}`),
  }))
)

function finishEntranceAnimation(event: FocusEvent) {
  if (!(event.target instanceof HTMLElement)) {
    return
  }

  const block = event.target.closest('.about-page__text-block')

  for (const animation of block?.getAnimations() ?? []) {
    if (
      animation instanceof CSSAnimation &&
      animation.animationName === 'fadeInUpBlock'
    ) {
      animation.finish()
    }
  }
}

useHead(usePageSeo('about'))
</script>

<style lang="scss" scoped>
.about-page {
  position: relative;
  width: 100%;
  min-width: 0;
  max-width: 56.25rem;

  &__header {
    margin-bottom: $space-50;
  }

  &__section {
    min-width: 0;
  }

  &__list {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__text-block {
    margin-bottom: $space-30;
    scroll-margin-block: $space-24;
  }

  &__section-title {
    position: relative;
    margin: $space-50 0;
    color: var(--color-text);
    font-size: clamp(1.5rem, 1.25rem + 1vw, 1.875rem);
    font-weight: 600;
    text-align: center;
    overflow-wrap: anywhere;

    &::after {
      position: absolute;
      bottom: -$space-8;
      left: 50%;
      width: $page-title-ornament-width;
      height: $space-2;
      transform: translateX(-50%);
      background: linear-gradient(90deg, transparent, $gold-color, transparent);
      content: '';
    }

    &--professional {
      color: var(--color-red-text);

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

@media (max-width: $breakpoint-tablet) {
  .about-page__text-block {
    margin-bottom: $space-25;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .about-page__text-block {
    animation: fadeInUpBlock 0.8s ease-out both;
  }
}
</style>
