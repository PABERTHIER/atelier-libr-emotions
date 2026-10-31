<template>
  <div class="text-block" :class="blockClass">
    <div class="block-content">
      <div v-if="type === 'axis' && axisNumber" class="axis-number">
        {{ axisNumber }}
      </div>

      <div
        v-if="
          (type === 'objective' && objectiveNumber) ||
          type === 'professional-objective'
        "
        class="objective-number">
        <span v-if="type === 'professional-objective'" aria-hidden="true">
          ♥
        </span>
        <span v-if="objectiveNumber">{{ objectiveNumber }}</span>
      </div>

      <component :is="`h${headingLevel}`" v-if="title" class="block-title">
        {{ title }}
      </component>
      <blockquote v-if="type === 'quote'" class="block-quotation">
        <span class="quote-mark opening" aria-hidden="true">"</span>
        <p class="block-text">{{ textContent }}</p>
        <span class="quote-mark closing" aria-hidden="true">"</span>
      </blockquote>
      <p v-else class="block-text">{{ textContent }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
type BlockType =
  | 'default'
  | 'highlight'
  | 'emphasis'
  | 'quote'
  | 'master-word'
  | 'axis'
  | 'objective'
  | 'professional-objective'

const props = withDefaults(
  defineProps<{
    textContent: string
    title?: string
    type?: BlockType
    headingLevel?: 2 | 3 | 4 | 5 | 6
    axisNumber?: number
    objectiveNumber?: number
  }>(),
  {
    type: 'default',
    headingLevel: 3,
    title: '',
    axisNumber: 0,
    objectiveNumber: 0,
  }
)

const blockClass = computed(() => {
  const classes = [`block-${props.type}`]

  if (props.type === 'axis' && props.axisNumber) {
    classes.push(`axis-${props.axisNumber}`)
  }

  return classes
})
</script>

<style lang="scss" scoped>
@use 'sass:color';

.text-block {
  min-width: 0;
  overflow-wrap: anywhere;

  .block-content {
    position: relative;
    padding: $space-30;
    border-radius: $radius-panel;
    background: $white-color;
    box-shadow: 0 $space-6 $space-24 $box-shadow-color;
    transition:
      transform $transition-ui,
      box-shadow $transition-ui;

    &:hover {
      transform: translateY(-$space-2);
      box-shadow: 0 $space-8 $space-32 rgba(0, 0, 0, 0.12);
    }

    .block-title {
      margin-top: 0;
      margin-bottom: $space-15;
      color: $primary-text-color;
      font-size: 1.25rem;
    }

    .block-text {
      margin: 0;
      text-align: start;
      color: $primary-text-color;
      font-size: 1.0625rem;
      line-height: 1.6;
    }

    .axis-number,
    .objective-number {
      min-width: $space-35;
      min-height: $space-35;
      padding: $space-4;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: -$space-15;
      left: $space-20;
      border-radius: 50%;
      color: $primary-text-color;
      font-weight: 700;
      font-size: 1rem;
      box-shadow: 0 $focus-width $space-10 rgba(0, 0, 0, 0.2);
    }
  }

  @media (max-width: $md) {
    .block-content {
      padding: $space-20;

      .block-title {
        font-size: 1.0625rem;
      }

      .block-text {
        text-align: left;
        font-size: 0.9375rem;
      }
    }
  }

  &.block-default .block-content {
    border-left: $space-4 solid $grey-blue-color;
  }

  &.block-highlight .block-content {
    padding-top: $space-20;
    border-left: $space-4 solid $gold-color;
    border-top: $space-2 solid rgba($gold-color, 0.3);
    background: linear-gradient(
      135deg,
      $light-creativity-orange 0%,
      $white-color 100%
    );

    .block-title {
      color: $gold-text-color;
    }
  }

  &.block-emphasis .block-content {
    border-left: $space-4 solid $creativity-orange;
    background: linear-gradient(
      135deg,
      $light-creativity-orange 0%,
      $white-color 100%
    );

    .block-text {
      font-weight: 500;
    }
  }

  &.block-quote .block-content {
    position: relative;
    padding: $space-50;
    text-align: center;
    border-left: $space-4 solid $inspiration-purple;
    border-radius: $radius-pill;
    background: linear-gradient(
      135deg,
      $light-inspiration-purple 0%,
      $white-color 100%
    );

    .quote-mark {
      position: absolute;
      color: $inspiration-purple;
      font-size: 3.125rem;
      opacity: 0.3;
    }

    .opening {
      top: $space-10;
      left: $space-20;
    }

    .closing {
      bottom: $space-10;
      right: $space-20;
      transform: rotate(180deg);
    }

    .block-text {
      font-style: italic;
      font-size: 1rem;
    }
  }

  &.block-master-word .block-content {
    margin-bottom: $space-35;
    padding-top: $space-10;
    border-left: $space-4 solid $dark-red-color;

    .block-title {
      position: relative;
      text-align: center;
      font-size: 1.6875rem;
      color: $dark-red-color;

      &::after {
        width: 80%;
        height: $focus-width;
        position: absolute;
        bottom: -$space-8;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(
          90deg,
          transparent,
          $dark-red-color,
          transparent
        );
        opacity: 0.6;
        content: '';
      }
    }

    .block-text {
      font-size: 1rem;
      line-height: 1.7;
    }
  }

  @media (max-width: $md) {
    &.block-master-word .block-content {
      margin-bottom: $space-30;
      padding-top: $border-width;

      .block-title {
        font-size: 1.375rem;
      }

      .block-text {
        font-size: 0.875rem;
      }
    }
  }

  &.block-axis .block-content {
    padding-top: $space-35;
    border-left: $space-5 solid;

    .block-title {
      margin-top: 0;
    }
  }

  &.block-axis.axis-1 .block-content {
    border-left-color: $gold-color;

    .axis-number {
      background: linear-gradient(
        135deg,
        $gold-color,
        color.adjust($gold-color, $lightness: 10%)
      );
    }
  }

  &.block-axis.axis-2 .block-content {
    border-left-color: $creativity-orange;

    .axis-number {
      background: linear-gradient(
        135deg,
        $creativity-orange,
        color.adjust($creativity-orange, $lightness: 10%)
      );
    }
  }

  &.block-axis.axis-3 .block-content {
    border-left-color: $inspiration-purple;

    .axis-number {
      background: linear-gradient(
        135deg,
        $inspiration-purple,
        color.adjust($inspiration-purple, $lightness: 10%)
      );
    }
  }

  &.block-objective .block-content,
  &.block-professional-objective .block-content {
    padding-top: $space-35;
    border-left: $focus-width solid;
  }

  &.block-objective .block-content {
    border-left-color: $grey-blue-color;

    .objective-number {
      background: linear-gradient(
        135deg,
        $grey-blue-color,
        color.adjust($grey-blue-color, $lightness: 15%)
      );
    }
  }

  &.block-professional-objective .block-content {
    border-left-color: $dark-red-color;

    .objective-number {
      color: $white-color;
      background: linear-gradient(
        135deg,
        $dark-red-color,
        color.adjust($dark-red-color, $lightness: 15%)
      );
    }
  }
}

.block-quotation {
  margin: 0;
}

@media (hover: none), (prefers-reduced-motion: reduce) {
  .text-block .block-content:hover {
    transform: none;
  }
}
</style>
