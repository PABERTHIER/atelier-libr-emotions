<template>
  <div class="text-section-container">
    <section class="text-section">
      <div class="section-marker">
        <div class="marker-dot" :class="props.customDotClass" />
        <div class="marker-line" />
      </div>

      <div
        v-if="props.isHighlightSection"
        class="section-content"
        :class="props.customSectionClass">
        <div class="section-highlight">
          <h3 class="highlight-title">
            {{ props.title }}
          </h3>
          <p class="highlight-text">
            {{ props.textContent }}
          </p>
        </div>
      </div>

      <div v-else class="section-content" :class="props.customSectionClass">
        <h3 v-if="props.title" class="title" :class="props.customTitleClass">
          {{ props.title }}
        </h3>

        <div v-if="props.date" class="milestone-date">{{ props.date }}</div>

        <div v-if="props.isHighlightQuotation" class="highlight-quotation">
          <div class="quote-mark">"</div>
          <p class="characteristic-text">
            {{ props.textContent }}
          </p>
          <div class="quote-mark closing">"</div>
        </div>

        <p v-else class="text-content" :class="props.customTextClass">
          {{ props.textContent }}
        </p>
      </div>
    </section>
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
  date: {
    type: String,
    required: false,
    default: '',
  },
  customDotClass: {
    type: String,
    required: false,
    default: '',
  },
  customSectionClass: {
    type: String,
    required: false,
    default: '',
  },
  customTitleClass: {
    type: String,
    required: false,
    default: '',
  },
  customTextClass: {
    type: String,
    required: false,
    default: '',
  },
  isHighlightSection: {
    type: Boolean,
    required: false,
    default: false,
  },
  isHighlightQuotation: {
    type: Boolean,
    required: false,
    default: false,
  },
})
</script>

<style lang="scss" scoped>
.text-section-container {
  width: 100%;
  height: 100%;

  .text-section {
    position: relative;
    display: flex;
    align-items: flex-start;
    margin-bottom: 50px;
    z-index: 2;

    .section-marker {
      width: 60px;
      display: flex;
      flex-direction: column;
      align-items: center;
      flex-shrink: 0;
      margin-right: 30px;

      .marker-dot {
        width: 16px;
        height: 16px;
        position: relative;
        z-index: 3;
        background: $white-color;
        border: 3px solid $grey-blue-color;
        border-radius: 50%;
        transition: all 0.3s ease;

        &::after {
          position: absolute;
          width: 6px;
          height: 6px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: $grey-blue-color;
          border-radius: 50%;
          transition: all 0.3s ease;
          content: '';
        }
      }

      .highlight-dot {
        width: 20px;
        height: 20px;
        border-color: $gold-color;
        background: $cream-color;
        box-shadow: 0 0 15px $box-shadow-warm;

        &::after {
          width: 8px;
          height: 8px;
          background: $gold-color;
        }
      }

      .milestone-dot {
        width: 18px;
        height: 18px;
        border-color: $copper-color;
        background: $white-color;
        box-shadow: 0 4px 12px rgba(184, 115, 51, 0.3);

        &::after {
          width: 7px;
          height: 7px;
          background: $copper-color;
        }
      }

      .final-dot {
        width: 22px;
        height: 22px;
        border-color: $dark-red-color;
        background: $cream-color;
        box-shadow: 0 0 20px rgba(160, 0, 0, 0.3);

        &::after {
          width: 10px;
          height: 10px;
          background: $dark-red-color;
        }
      }

      .marker-line {
        width: 1px;
        height: 40px;
        margin-top: 8px;
        background: transparent;
      }
    }

    @media (max-width: $lg) {
      .section-marker {
        width: 30px;
      }
    }

    @media (max-width: $md) {
      .section-marker {
        width: 20px;
        margin-right: 15px;
      }
    }

    .section-content {
      position: relative;
      padding: 30px;
      flex: 1;
      border-radius: 12px;
      border-left: 4px solid $grey-blue-color;
      background: $white-color;
      box-shadow: 0 8px 32px $box-shadow-color;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
      }

      &::before {
        position: absolute;
        width: 0;
        height: 0;
        left: -8px;
        top: 30px;
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-right: 8px solid $white-color;
        content: '';
      }

      .title {
        margin-bottom: 15px;
        color: $primary-text-color;
        font-size: 20px;
      }

      .text-content {
        margin: 0;
        text-align: justify;
        color: $primary-text-color;
        font-size: 17px;
        line-height: 1.7;
      }

      .milestone-title {
        position: relative;
        display: inline-block;
        color: $copper-color;

        &::after {
          position: absolute;
          height: 2px;
          bottom: -4px;
          left: 0;
          right: 0;
          background: linear-gradient(90deg, $copper-color, transparent);
          content: '';
        }
      }

      .milestone-date {
        position: absolute;
        top: 10px;
        right: 10px;
        padding: 5px 15px;
        background: $copper-color;
        color: $white-color;
        border-radius: 15px;
        font-size: 14px;
        font-weight: 600;
        box-shadow: 0 2px 8px rgba(184, 115, 51, 0.3);
      }
    }

    @media (max-width: $md) {
      .section-content {
        padding: 20px;

        &::before {
          left: -6px;
          border-right-width: 6px;
          border-top-width: 6px;
          border-bottom-width: 6px;
        }

        .title {
          font-size: 18px;
        }

        .text-content {
          text-align: left;
          font-size: 15px;
        }

        .milestone-date {
          position: absolute;
          display: inline-block;
          top: 10px;
          right: 10px;
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
        position: relative;
        text-align: center;
        padding: 15px;

        .quote-mark {
          position: absolute;
          top: -15px;
          left: 0;
          color: $gold-color;
          font-size: 65px;
          opacity: 0.6;

          &.closing {
            bottom: -15px;
            right: 0;
            top: auto;
            left: auto;
            transform: rotate(180deg);
          }
        }

        .characteristic-text {
          margin: 15px 0;
          color: $primary-text-color;
          font-size: 20px;
          font-style: italic;
          font-weight: 500;
        }
      }

      .section-highlight {
        text-align: center;

        .highlight-title {
          margin-bottom: 10px;
          color: $gold-color;
          font-size: 22px;
        }

        .highlight-text {
          color: $copper-color;
          font-size: 17px;
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
      margin-bottom: 25px;
    }
  }
}
</style>
