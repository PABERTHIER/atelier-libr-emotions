<template>
  <div class="text-block" :class="blockClass">
    <div class="block-content">
      <div v-if="type === 'axis' && axisNumber" class="axis-number">
        {{ axisNumber }}
      </div>

      <div
        v-if="type === 'objective' || type === 'personal-objective'"
        class="objective-number">
        <span v-if="objectiveNumber">{{ objectiveNumber }}</span>
      </div>

      <h3 v-if="title" class="block-title">{{ title }}</h3>
      <p class="block-text">{{ textContent }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  textContent: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: false,
    default: '',
  },
  type: {
    type: String,
    required: false,
    default: 'default',
    validator: (value: string): boolean =>
      [
        'default',
        'highlight',
        'emphasis',
        'quote',
        'master-word',
        'axis',
        'objective',
        'personal-objective',
      ].includes(value),
  },
  axisNumber: {
    type: Number,
    required: false,
    default: 0,
  },
  objectiveNumber: {
    type: Number,
    required: false,
    default: 0,
  },
})

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
  .block-content {
    position: relative;
    padding: 30px;
    border-radius: 12px;
    background: $white-color;
    box-shadow: 0 6px 24px $box-shadow-color;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
    }

    .block-title {
      margin-bottom: 15px;
      color: $primary-text-color;
      font-size: 20px;
    }

    .block-text {
      margin: 0;
      text-align: justify;
      color: $primary-text-color;
      font-size: 17px;
      line-height: 1.6;
    }

    .axis-number,
    .objective-number {
      width: 35px;
      height: 35px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: -15px;
      left: 20px;
      border-radius: 50%;
      color: $white-color;
      font-weight: 700;
      font-size: 16px;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
    }
  }

  @media (max-width: $md) {
    .block-content {
      padding: 20px;

      .block-title {
        font-size: 17px;
      }

      .block-text {
        text-align: left;
        font-size: 15px;
      }
    }
  }

  &.block-default .block-content {
    border-left: 4px solid $grey-blue-color;
  }

  &.block-highlight .block-content {
    padding-top: 20px;
    border-left: 4px solid $gold-color;
    border-top: 2px solid rgba(212, 175, 55, 0.3);
    background: linear-gradient(
      135deg,
      $light-creativity-orange 0%,
      $white-color 100%
    );

    .block-title {
      color: $gold-color;
    }
  }

  &.block-emphasis .block-content {
    border-left: 4px solid $creativity-orange;
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
    padding: 50px;
    text-align: center;
    border-left: 4px solid $inspiration-purple;
    border-radius: 20px;
    background: linear-gradient(
      135deg,
      $light-inspiration-purple 0%,
      $white-color 100%
    );

    &::before,
    &::after {
      position: absolute;
      color: $inspiration-purple;
      font-size: 50px;
      opacity: 0.3;
      content: '"';
    }

    &::before {
      top: 10px;
      left: 20px;
    }

    &::after {
      bottom: 10px;
      right: 20px;
      transform: rotate(180deg);
    }

    .block-text {
      font-style: italic;
      font-size: 16px;
    }
  }

  &.block-master-word .block-content {
    margin-bottom: 35px;
    padding-top: 10px;
    border-left: 4px solid $dark-red-color;

    .block-title {
      text-align: center;
      font-size: 27px;
      color: $dark-red-color;

      &::after {
        width: 80%;
        height: 3px;
        position: absolute;
        bottom: -8px;
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
      font-size: 16px;
      line-height: 1.7;
    }
  }

  @media (max-width: $md) {
    &.block-master-word .block-content {
      margin-bottom: 30px;
      padding-top: 1px;

      .block-title {
        font-size: 22px;
      }

      .block-text {
        font-size: 14px;
      }
    }
  }

  &.block-axis .block-content {
    padding-top: 35px;
    border-left: 5px solid;

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
  &.block-personal-objective .block-content {
    padding-top: 35px;
    border-left: 3px solid;
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

  &.block-personal-objective .block-content {
    border-left-color: $dark-red-color;

    .objective-number {
      background: linear-gradient(
        135deg,
        $dark-red-color,
        color.adjust($dark-red-color, $lightness: 15%)
      );

      &::before {
        content: '♥';
        font-size: 20px;
      }
    }
  }
}
</style>
