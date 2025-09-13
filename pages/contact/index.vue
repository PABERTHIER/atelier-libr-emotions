<template>
  <div class="contact">
    <div class="particles-container">
      <div v-for="n in 20" :key="n" class="particle" />
    </div>

    <div class="content-wrapper">
      <div class="intro-section">
        <div class="page-title">
          {{ t('pages.contact.title') }}
        </div>
        <div class="subtitle">
          {{ t('pages.contact.subtitle') }}
        </div>
      </div>

      <div class="artwork-container">
        <div class="artwork-frame">
          <div class="frame-inner">
            <Image
              src="/paintings/some-paintings.webp"
              sizes="xs:150px, sm:200px, md:250px, lg:300px, xl:400px"
              max-height="600px"
              class="featured-image"
              :title="somePaintingsTitle"
              :alt="somePaintingsAlt" />
          </div>
          <div class="image-caption">
            <span class="caption-text">{{ somePaintingsTitle }}</span>
          </div>
          <div class="corner corner-tl" />
          <div class="corner corner-tr" />
          <div class="corner corner-bl" />
          <div class="corner corner-br" />
        </div>
      </div>

      <div class="contact-section">
        <h2 class="section-title">
          {{ t('pages.contact.connect_me') }}
        </h2>

        <div class="social-links">
          <NuxtLink
            :to="facebookLink"
            :aria-label="facebook"
            :title="facebookLinkTitle"
            class="social-link facebook"
            target="_blank">
            <div class="link-background" />
            <Icon
              name="ale-icon:facebook"
              size="32px"
              mode="svg"
              class="social-icon"
              aria-hidden="true" />
            <span class="link-text">{{ t('miscellaneous.facebook') }}</span>
            <div class="hover-overlay" />
          </NuxtLink>

          <NuxtLink
            :to="instagramLink"
            :aria-label="instagram"
            :title="instagramLinkTitle"
            class="social-link instagram"
            target="_blank">
            <div class="link-background" />
            <Icon
              name="ale-icon:instagram"
              size="32px"
              mode="svg"
              class="social-icon"
              aria-hidden="true" />
            <span class="link-text">{{ t('miscellaneous.instagram') }}</span>
            <div class="hover-overlay" />
          </NuxtLink>
        </div>

        <div class="contact-info">
          <div class="info-item">
            <Icon name="heroicons:envelope" size="20px" class="info-icon" />
            <span>{{ t('about.mail_address') }}</span>
          </div>
          <div class="info-item">
            <Icon name="heroicons:map-pin" size="20px" class="info-icon" />
            <span>{{ t('about.location') }}</span>
          </div>
        </div>
      </div>

      <div class="separator">
        <div class="separator-line"></div>
        <div class="separator-ornament">
          <div class="ornament-circle"></div>
          <div class="ornament-diamond"></div>
        </div>
        <div class="separator-line"></div>
      </div>

      <div class="cta-section">
        <div class="cta-text">
          {{ t('pages.contact.ready') }}
        </div>
        <a :href="`mailto:${mailAddress}`">
          <button class="cta-button">
            {{ t('pages.contact.contact_me') }}
          </button>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: computed(() => t('pages.contact.tab_name')),
})

const somePaintingsTitle = computed(() => t('pages.contact.image.title'))
const somePaintingsAlt = computed(() => t('pages.contact.image.alt'))
const mailAddress = computed(() => t('about.mail_address'))
const facebook = computed(() => t('miscellaneous.facebook'))
const facebookLinkTitle = computed(() => t('miscellaneous.follow_on_facebook'))
const instagram = computed(() => t('miscellaneous.instagram'))
const instagramLinkTitle = computed(() =>
  t('miscellaneous.follow_on_instagram')
)

const facebookLink =
  'https://www.facebook.com/people/Atelier-LibrEmotions/100063484446329/'
const instagramLink = 'https://www.instagram.com/atelier_libremotions'
</script>

<style lang="scss" scoped>
@use 'sass:math';
@use 'sass:color';

.contact {
  height: 100%;
  width: 100%;
  position: relative;

  .particles-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    z-index: 1;

    .particle {
      position: absolute;
      width: 4px;
      height: 4px;
      background: $gold-color;
      border-radius: 50%;
      opacity: 0.6;
      animation: floatParticle 15s infinite linear;

      &:nth-child(odd) {
        background: $copper-color;
        animation-duration: 20s;
        animation-delay: -5s;
      }

      &:nth-child(3n) {
        width: 2px;
        height: 2px;
        animation-duration: 25s;
        animation-delay: -10s;
      }

      @for $i from 1 through 20 {
        &:nth-child(#{$i}) {
          left: math.random(100) * 1%;
          top: math.random(100) * 1%;
          animation-delay: math.random(20) * -1s;
        }
      }
    }
  }

  .content-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 2;
  }

  .intro-section {
    text-align: center;

    .page-title {
      position: relative;
      margin-bottom: 25px;
      font-size: clamp(2.5rem, 3vw, 4rem);
      font-weight: 300;

      &::after {
        width: 80px;
        height: 2px;
        position: absolute;
        bottom: 0px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(
          90deg,
          transparent,
          $gold-color,
          transparent
        );
        content: '';
      }
    }

    .subtitle {
      max-width: 650px;
      margin-bottom: 25px;
      font-size: 18px;
      color: color.adjust($primary-text-color, $lightness: -10%);
      font-style: italic;
      font-weight: 300;
      line-height: 1.6;
    }
  }

  .artwork-container {
    position: relative;

    .artwork-frame {
      position: relative;
      margin-bottom: 50px;
      padding: 32px 32px 7px 32px;
      background-color: $white-background-color;
      border-radius: 4px;
      box-shadow:
        0 10px 40px $box-shadow-deep,
        inset 0 1px 0 rgba(255, 255, 255, 0.9);

      @media (max-width: $md) {
        padding: 20px 20px 5px 20px;
        margin-bottom: 0;
      }

      .frame-inner {
        position: relative;
        border: 3px solid $gold-color;
        border-radius: 2px;
        overflow: hidden;
        box-shadow:
          inset 0 0 20px rgba(212, 175, 55, 0.1),
          0 0 0 1px rgba(212, 175, 55, 0.3);

        .featured-image {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.6s ease;

          &:hover {
            transform: scale(1.02);
          }
        }
      }

      .image-caption {
        text-align: center;
        margin-top: 7px;

        @media (max-width: $md) {
          margin-top: 0px;
        }

        .caption-text {
          font-size: 15px;
          font-style: italic;
          opacity: 0.8;

          @media (max-width: $md) {
            font-size: 12px;
          }
        }
      }

      .corner {
        position: absolute;
        width: 20px;
        height: 20px;
        border: 2px solid $gold-color;

        &.corner-tl {
          top: 10px;
          left: 10px;
          border-right: none;
          border-bottom: none;
        }

        &.corner-tr {
          top: 10px;
          right: 10px;
          border-left: none;
          border-bottom: none;
        }

        &.corner-bl {
          bottom: 10px;
          left: 10px;
          border-right: none;
          border-top: none;
        }

        &.corner-br {
          bottom: 10px;
          right: 10px;
          border-left: none;
          border-top: none;
        }
      }
    }
  }

  .contact-section {
    width: 100%;
    text-align: center;

    .section-title {
      margin-bottom: 30px;
      font-size: 25px;
      font-weight: 300;
    }

    .social-links {
      display: flex;
      justify-content: center;
      margin-bottom: 30px;

      @media (min-width: $md) {
        gap: 30px;
      }

      @media (max-width: $md) {
        flex-direction: column;
        align-items: center;
        gap: 15px;
      }

      .social-link {
        min-width: 140px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 16px 24px;
        gap: 15px;
        text-decoration: none;
        border-radius: 50px;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        overflow: hidden;

        @media (max-width: $md) {
          width: 175px;
        }

        .link-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
          transition: all 0.4s ease;
        }

        .social-icon,
        .link-text {
          position: relative;
          z-index: 2;
          transition: all 0.4s ease;
        }

        .link-text {
          font-weight: 500;
          font-size: 16px;
        }

        .hover-overlay {
          position: absolute;
          top: 0;
          left: -100%;
          right: 0;
          bottom: 0;
          z-index: 1;
          transition: left 0.4s ease;
        }

        &.facebook {
          .link-background {
            background: linear-gradient(135deg, #4267b2, #365899);
          }

          .social-icon,
          .link-text {
            color: white;
          }

          .hover-overlay {
            background: linear-gradient(135deg, #365899, #2d4373);
          }

          &:hover .hover-overlay {
            left: 0;
          }
        }

        &.instagram {
          .link-background {
            background: linear-gradient(135deg, #e4405f, #833ab4, #c13584);
          }

          .social-icon,
          .link-text {
            color: white;
          }

          .hover-overlay {
            background: linear-gradient(135deg, #c13584, #833ab4, #e4405f);
          }

          &:hover .hover-overlay {
            left: 0;
          }
        }

        &:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
        }
      }
    }

    .contact-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 15px;

      .info-item {
        display: flex;
        align-items: center;
        gap: 15px;
        font-size: 15px;
        opacity: 0.9;

        .info-icon {
          color: $gold-color;
        }
      }
    }
  }

  .separator {
    width: 100%;
    display: flex;
    align-items: center;
    margin: 40px 0;

    .separator-line {
      height: 1px;
      flex: 1;
      background: linear-gradient(90deg, transparent, $gold-color, transparent);
    }

    .separator-ornament {
      position: relative;
      margin: 0 30px;

      .ornament-circle {
        width: 12px;
        height: 12px;
        border: 2px solid $gold-color;
        border-radius: 50%;
      }

      .ornament-diamond {
        width: 6px;
        height: 6px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(45deg);
        background: $gold-color;
      }
    }
  }

  .cta-section {
    text-align: center;

    .cta-text {
      margin-bottom: 25px;
      font-size: 16px;
      font-style: italic;
    }

    .cta-button {
      padding: 16px 32px;
      background: linear-gradient(135deg, $gold-color, $copper-color);
      color: $white-color;
      border: none;
      font-size: 16px;
      font-weight: 500;
      border-radius: 50px;
      cursor: pointer;
      transition: all 0.4s ease;
      box-shadow: 0 4px 15px $box-shadow-warm;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px $box-shadow-warm;
        background: linear-gradient(
          135deg,
          color.adjust($gold-color, $lightness: 5%),
          color.adjust($copper-color, $lightness: 5%)
        );
      }
    }
  }
}

@keyframes floatParticle {
  0% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
    opacity: 1;
  }
  100% {
    transform: translateY(-40px) rotate(360deg);
    opacity: 0;
  }
}
</style>
