<template>
  <div class="text-section-container">
    <component
      :is="props.title ? 'section' : 'div'"
      class="text-section"
      tabindex="0"
      :aria-labelledby="props.title ? titleId : undefined">
      <div class="section-marker" aria-hidden="true">
        <div class="marker-dot" :class="props.customDotClass" />
        <div class="marker-line" />
      </div>

      <div
        v-if="props.isHighlightSection"
        class="section-content"
        :class="props.customSectionClass">
        <div class="section-highlight">
          <component
            :is="`h${props.headingLevel}`"
            v-if="props.title"
            :id="titleId"
            class="highlight-title">
            {{ props.title }}
          </component>
          <p class="highlight-text">
            {{ props.textContent }}
          </p>
        </div>
      </div>

      <div v-else class="section-content" :class="props.customSectionClass">
        <component
          :is="`h${props.headingLevel}`"
          v-if="props.title"
          :id="titleId"
          class="title"
          :class="props.customTitleClass">
          {{ props.title }}
        </component>

        <div v-if="props.date" class="milestone-date">{{ props.date }}</div>

        <blockquote
          v-if="props.isHighlightQuotation"
          class="highlight-quotation">
          <div class="quote-mark" aria-hidden="true">"</div>
          <p class="characteristic-text">
            {{ props.textContent }}
          </p>
          <div class="quote-mark closing" aria-hidden="true">"</div>
        </blockquote>

        <p v-else class="text-content" :class="props.customTextClass">
          {{ props.textContent }}
        </p>
      </div>
    </component>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    textContent: string
    title?: string
    headingLevel?: 2 | 3 | 4 | 5 | 6
    date?: string
    customDotClass?: string
    customSectionClass?: string
    customTitleClass?: string
    customTextClass?: string
    isHighlightSection?: boolean
    isHighlightQuotation?: boolean
  }>(),
  {
    headingLevel: 3,
    title: '',
    date: '',
    customDotClass: '',
    customSectionClass: '',
    customTitleClass: '',
    customTextClass: '',
    isHighlightSection: false,
    isHighlightQuotation: false,
  }
)

const titleId = useId()
</script>

<style lang="scss" scoped>
@use 'sass:color';

.text-section-container {
  width: 100%;
  min-width: 0;

  .text-section {
    position: relative;
    display: flex;
    align-items: flex-start;
    margin-bottom: $space-50;
    z-index: 2;

    .section-marker {
      width: $space-60;
      display: flex;
      flex-direction: column;
      align-items: center;
      flex-shrink: 0;
      margin-right: $space-30;

      .marker-dot {
        width: $space-16;
        height: $space-16;
        position: relative;
        z-index: 3;
        background: $white-color;
        border: $focus-width solid $grey-blue-color;
        border-radius: 50%;
        transition:
          border-color $transition-ui,
          background-color $transition-ui;

        &::after {
          position: absolute;
          width: $space-6;
          height: $space-6;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: $grey-blue-color;
          border-radius: 50%;
          transition: background-color $transition-ui;
          content: '';
        }
      }

      .highlight-dot {
        width: $space-20;
        height: $space-20;
        border-color: $gold-color;
        background: $cream-color;
        box-shadow: 0 0 $space-15 $box-shadow-warm;

        &::after {
          width: $space-8;
          height: $space-8;
          background: $gold-color;
        }
      }

      .milestone-dot {
        width: $space-18;
        height: $space-18;
        border-color: $copper-color;
        background: $white-color;
        box-shadow: 0 $space-4 $space-12 rgba($copper-color, 0.3);

        &::after {
          width: $space-7;
          height: $space-7;
          background: $copper-color;
        }
      }

      .final-dot {
        width: $space-22;
        height: $space-22;
        border-color: $dark-red-color;
        background: $cream-color;
        box-shadow: 0 0 $space-20 rgba($dark-red-color, 0.3);

        &::after {
          width: $space-10;
          height: $space-10;
          background: $dark-red-color;
        }
      }

      .marker-line {
        width: $border-width;
        height: $space-40;
        margin-top: $space-8;
        background: transparent;
      }
    }

    @media (max-width: $lg) {
      .section-marker {
        width: $space-30;
      }
    }

    @media (max-width: $md) {
      .section-marker {
        width: $space-20;
        margin-right: $space-15;
      }
    }

    .section-content {
      min-width: 0;
      overflow-wrap: anywhere;
      position: relative;
      padding: $space-30;
      flex: 1;
      border-radius: $radius-panel;
      border-left: $space-4 solid $grey-blue-color;
      background: $white-color;
      box-shadow: 0 $space-8 $space-32 $box-shadow-color;
      transition:
        transform $transition-ui,
        box-shadow $transition-ui;

      &:hover {
        transform: translateY(-$space-2);
        box-shadow: 0 $space-12 $space-40 rgba(0, 0, 0, 0.15);
      }

      &::before {
        position: absolute;
        width: 0;
        height: 0;
        left: -$space-8;
        top: $space-30;
        border-top: $space-8 solid transparent;
        border-bottom: $space-8 solid transparent;
        border-right: $space-8 solid $white-color;
        content: '';
      }

      .title {
        margin-top: 0;
        margin-bottom: $space-15;
        color: $primary-text-color;
        font-size: 1.25rem;
      }

      .text-content {
        margin: 0;
        text-align: start;
        color: $primary-text-color;
        font-size: 1.0625rem;
        line-height: 1.7;
      }

      .milestone-title {
        position: relative;
        display: inline-block;
        color: $copper-text-color;

        &::after {
          position: absolute;
          height: $space-2;
          bottom: -$space-4;
          left: 0;
          right: 0;
          background: linear-gradient(90deg, $copper-color, transparent);
          content: '';
        }
      }

      .milestone-date {
        display: table;
        margin-bottom: $space-12;
        padding: $space-5 $space-15;
        background: $copper-color;
        color: color.adjust($primary-text-color, $lightness: -5%);
        border-radius: $space-15;
        font-size: 0.875rem;
        font-weight: 600;
        box-shadow: 0 $space-2 $space-8 rgba($copper-color, 0.3);
      }
    }

    @media (max-width: $md) {
      .section-content {
        padding: $space-20;

        &::before {
          left: -$space-6;
          border-right-width: $space-6;
          border-top-width: $space-6;
          border-bottom-width: $space-6;
        }

        .title {
          font-size: 1.125rem;
        }

        .text-content {
          text-align: left;
          font-size: 0.9375rem;
        }

        .milestone-date {
          display: inline-block;
        }
      }
    }

    .intro-section {
      border-left-color: $grey-blue-color;
      background: linear-gradient(135deg, $white-color, $cream-color);
    }

    .highlight-section {
      border-left-color: $gold-color;
      background: linear-gradient(135deg, $cream-color, $white-color);

      .highlight-quotation {
        margin: 0;
        position: relative;
        text-align: center;
        padding: $space-15;

        .quote-mark {
          position: absolute;
          top: -$space-15;
          left: 0;
          color: $gold-color;
          font-size: 4rem;
          opacity: 0.6;

          &.closing {
            bottom: -$space-15;
            right: 0;
            top: auto;
            left: auto;
            transform: rotate(180deg);
          }
        }

        .characteristic-text {
          margin: $space-15 0;
          color: $primary-text-color;
          font-size: 1.25rem;
          font-style: italic;
          font-weight: 500;
        }
      }

      .section-highlight {
        text-align: center;

        .highlight-title {
          margin-top: 0;
          margin-bottom: $space-10;
          color: $gold-text-color;
          font-size: 1.375rem;
        }

        .highlight-text {
          color: $copper-text-color;
          font-size: 1.0625rem;
          font-style: italic;
          font-weight: 500;
        }
      }
    }

    .milestone-section {
      border-left-color: $copper-color;
    }

    .final-section {
      border-left-color: $dark-red-color;
      background: linear-gradient(135deg, $white-color, $warm-beige);

      .final-text {
        font-weight: 500;
      }
    }
  }

  @media (max-width: $md) {
    .text-section {
      margin-bottom: $space-25;
    }
  }
}
@media (hover: none), (prefers-reduced-motion: reduce) {
  .text-section-container .text-section .section-content:hover {
    transform: none;
  }
}
</style>
