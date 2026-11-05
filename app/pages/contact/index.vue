<template>
  <article class="contact-page" @focusin="finishEntranceAnimation">
    <div class="contact-page__particles" aria-hidden="true">
      <span v-for="number in 20" :key="number" class="contact-page__particle" />
    </div>

    <header class="contact-page__header">
      <PageTitle
        :title="t('pages.contact.title')"
        :subtitle="t('pages.contact.subtitle')" />
    </header>

    <figure class="contact-page__artwork">
      <div class="contact-page__frame">
        <Image
          src="/misc/contact.webp"
          sizes="xs:150px, sm:200px, md:250px, lg:300px, xl:400px"
          max-height="37.5rem"
          :title="t('pages.contact.image.title')"
          :alt="t('pages.contact.image.alt')" />
      </div>
      <figcaption class="contact-page__caption">
        {{ t('pages.contact.image.title') }}
      </figcaption>
      <span
        class="contact-page__corner contact-page__corner--top-left"
        aria-hidden="true" />
      <span
        class="contact-page__corner contact-page__corner--top-right"
        aria-hidden="true" />
      <span
        class="contact-page__corner contact-page__corner--bottom-left"
        aria-hidden="true" />
      <span
        class="contact-page__corner contact-page__corner--bottom-right"
        aria-hidden="true" />
    </figure>

    <section
      class="contact-page__connections"
      aria-labelledby="connections-title">
      <h2 id="connections-title" class="contact-page__section-title">
        {{ t('pages.contact.connect_me') }}
      </h2>
      <p id="social-new-tab" class="sr-only">
        {{ t('miscellaneous.opens_new_tab') }}
      </p>
      <ul class="contact-page__social-links" role="list">
        <li v-for="link in socialLinks" :key="link.id">
          <a
            :href="link.href"
            :data-tooltip="link.title"
            aria-describedby="social-new-tab"
            class="contact-page__social-link"
            :class="`contact-page__social-link--${link.id}`"
            target="_blank"
            rel="noopener noreferrer">
            <Icon :name="link.icon" mode="svg" aria-hidden="true" />
            <span>{{ link.label }}</span>
          </a>
        </li>
      </ul>

      <address class="contact-page__details">
        <a :href="mailHref" class="contact-page__detail contact-page__email">
          <Icon name="heroicons:envelope" aria-hidden="true" />
          <span>{{ t('about.mail_address') }}</span>
        </a>
        <p class="contact-page__detail">
          <Icon name="heroicons:map-pin" aria-hidden="true" />
          <span>{{ t('about.location') }}</span>
        </p>
      </address>
    </section>

    <div class="contact-page__separator" aria-hidden="true">
      <span class="contact-page__separator-line" />
      <span class="contact-page__separator-ornament" />
      <span class="contact-page__separator-line" />
    </div>

    <section
      class="contact-page__invitation"
      aria-labelledby="invitation-title">
      <h2 id="invitation-title" class="sr-only">
        {{ t('pages.contact.contact_me_by_mail') }}
      </h2>
      <p class="contact-page__invitation-text">
        {{ t('pages.contact.ready') }}
      </p>
      <a :href="mailHref" class="contact-page__email-action">
        {{ t('pages.contact.contact_me') }}
        <span class="sr-only">— {{ t('pages.contact.by_email') }}</span>
      </a>
    </section>
  </article>
</template>

<script setup lang="ts">
import { externalLinks } from '~/data/site'

const { t } = useI18n()

const mailHref = computed(() => `mailto:${t('about.mail_address')}`)
const socialLinks = computed(() => [
  {
    id: 'facebook',
    href: externalLinks.facebook,
    icon: 'ale-icon:facebook',
    label: t('miscellaneous.facebook'),
    title: t('miscellaneous.follow_on_facebook'),
  },
  {
    id: 'instagram',
    href: externalLinks.instagram,
    icon: 'ale-icon:instagram',
    label: t('miscellaneous.instagram'),
    title: t('miscellaneous.follow_on_instagram'),
  },
])

function finishEntranceAnimation(event: FocusEvent) {
  if (!(event.target instanceof HTMLElement)) {
    return
  }

  const artwork = event.target.closest('.contact-page__artwork')

  for (const animation of artwork?.getAnimations() ?? []) {
    if (
      animation instanceof CSSAnimation &&
      animation.animationName === 'fadeInUpBlock'
    ) {
      animation.finish()
    }
  }
}

useHead(usePageSeo('contact'))
</script>

<style lang="scss" scoped>
@use 'sass:color';

.contact-page {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-width: 0;
  max-width: 65rem;
  isolation: isolate;

  &__particles {
    position: absolute;
    inset: 0;
    z-index: -1;
    pointer-events: none;
  }

  &__particle {
    position: absolute;
    width: $space-4;
    height: $space-4;
    border-radius: 50%;
    background: $gold-color;
    opacity: 0.6;

    &:nth-child(odd) {
      background: $copper-color;
    }

    &:nth-child(3n) {
      width: $space-2;
      height: $space-2;
    }

    @for $i from 1 through 20 {
      &:nth-child(#{$i}) {
        left: ($i * 37 % 97) * 1%;
        top: ($i * 23 % 97) * 1%;
      }
    }
  }

  &__header {
    margin-bottom: $space-25;
  }

  &__artwork {
    position: relative;
    max-width: 100%;
    margin: 0 0 $space-50;
    padding: $space-32 $space-32 $space-16;
    border-radius: $space-4;
    background: var(--color-surface);
    box-shadow:
      0 $space-10 $space-40 $box-shadow-deep,
      inset 0 $border-width 0 var(--color-inset-highlight);
  }

  &__frame {
    border: $focus-width solid $gold-color;
    border-radius: $space-2;
    box-shadow:
      inset 0 0 $space-20 rgba($gold-color, 0.1),
      0 0 0 $border-width rgba($gold-color, 0.3);

    :deep(a) {
      overflow: hidden;
    }

    :deep(img) {
      display: block;
      max-width: 100%;
      height: auto;
      object-fit: contain;
    }
  }

  &__caption {
    contain: inline-size;
    contain-intrinsic-inline-size: 150px;
    margin: $space-8 0 0;
    color: var(--color-muted);
    font-size: 0.9375rem;
    line-height: 1.5;
    font-style: italic;
    text-align: center;
    overflow-wrap: anywhere;
  }

  &__corner {
    position: absolute;
    width: $space-20;
    height: $space-20;
    border: $space-2 solid $gold-color;
    pointer-events: none;

    &--top-left {
      top: $space-10;
      left: $space-10;
      border-right: 0;
      border-bottom: 0;
    }

    &--top-right {
      top: $space-10;
      right: $space-10;
      border-left: 0;
      border-bottom: 0;
    }

    &--bottom-left {
      bottom: $space-10;
      left: $space-10;
      border-right: 0;
      border-top: 0;
    }

    &--bottom-right {
      bottom: $space-10;
      right: $space-10;
      border-left: 0;
      border-top: 0;
    }
  }

  &__connections {
    width: 100%;
    min-width: 0;
    text-align: center;
  }

  &__section-title {
    margin: 0 0 $space-30;
    font-size: 1.5625rem;
    font-weight: 300;
    overflow-wrap: anywhere;
  }

  &__social-links {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: $space-30;
    margin: 0 0 $space-30;
    padding: 0;
    list-style: none;

    li {
      min-width: 0;
      max-width: 100%;
    }
  }

  &__social-link {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: $space-15;
    min-width: 8.75rem;
    min-height: $control-size;
    max-width: 100%;
    padding: $space-16 $space-24;
    border-radius: 3.125rem;
    color: $white-color;
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.5;
    overflow-wrap: anywhere;

    .iconify {
      flex: none;
      width: 2rem;
      height: 2rem;
    }

    &--facebook {
      --contact-hover-background: linear-gradient(135deg, #365899, #2d4373);
      background: linear-gradient(135deg, #4267b2, #365899);
    }

    &--instagram {
      --contact-hover-background: linear-gradient(
        135deg,
        #a32c70,
        #833ab4,
        #bd2445
      );
      background: linear-gradient(135deg, #bd2445, #833ab4, #a32c70);
    }

    &:hover,
    &:focus-visible {
      box-shadow: 0 $space-15 $space-35 rgba(0, 0, 0, 0.2);
    }
  }

  &__social-link,
  &__email-action {
    position: relative;
    isolation: isolate;
    overflow: hidden;

    &::before {
      position: absolute;
      inset: 0;
      z-index: -1;
      background: var(--contact-hover-background);
      transform: translateX(-100%);
      pointer-events: none;
      content: '';
    }

    &:hover::before,
    &:focus-visible::before {
      transform: translateX(0);
    }
  }

  &__details {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $space-15;
    font-style: normal;
  }

  &__detail {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $space-15;
    max-width: 100%;
    margin: 0;
    font-size: 0.9375rem;
    line-height: 1.5;

    span {
      min-width: 0;
      overflow-wrap: anywhere;
    }

    .iconify {
      flex: none;
      width: 1.25rem;
      height: 1.25rem;
      color: var(--color-gold-text);
    }
  }

  &__email {
    min-height: $control-size;
    text-decoration: underline;
    text-underline-offset: 0.2em;
  }

  &__separator {
    display: flex;
    align-items: center;
    width: 100%;
    margin: $space-40 0;
  }

  &__separator-line {
    flex: 1;
    height: $border-width;
    background: linear-gradient(90deg, transparent, $gold-color, transparent);
  }

  &__separator-ornament {
    position: relative;
    width: $space-12;
    height: $space-12;
    margin-inline: $space-30;
    border: $space-2 solid $gold-color;
    border-radius: 50%;

    &::after {
      position: absolute;
      top: 50%;
      left: 50%;
      width: $space-6;
      height: $space-6;
      transform: translate(-50%, -50%) rotate(45deg);
      background: $gold-color;
      content: '';
    }
  }

  &__invitation {
    max-width: 100%;
    text-align: center;
  }

  &__invitation-text {
    margin: 0 0 $space-25;
    font-size: 1rem;
    line-height: 1.6;
    font-style: italic;
    overflow-wrap: anywhere;
  }

  &__email-action {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    min-height: $control-size;
    max-width: 100%;
    padding: $space-16 $space-32;
    border-radius: 3.125rem;
    --contact-hover-background: linear-gradient(
      135deg,
      #{$gold-text-color},
      #{$copper-text-color}
    );
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
    overflow-wrap: anywhere;

    &:hover,
    &:focus-visible {
      box-shadow: 0 $space-8 $space-25 $box-shadow-warm;
    }
  }
}

@media (max-width: $md) {
  .contact-page {
    &__artwork {
      padding: $space-20 $space-20 $space-12;
      margin-bottom: $space-30;
    }

    &__caption {
      font-size: 0.875rem;
    }

    &__social-links {
      flex-direction: column;
      align-items: center;
      gap: $space-15;
    }

    &__social-link {
      width: 11rem;
    }
  }
}

@media (prefers-reduced-motion: no-preference) {
  .contact-page {
    &__artwork {
      animation: fadeInUpBlock 0.8s ease-out both;
    }

    &__frame :deep(img) {
      transition: transform 0.6s ease;
    }

    &__frame :deep(a:focus-visible img) {
      transform: scale(1.02);
    }

    &__social-link:focus-visible {
      transform: translateY(-$space-2) scale(1.05);
    }

    &__email-action:focus-visible {
      transform: translateY(-$space-2);
    }

    &__social-link::before,
    &__email-action::before {
      transition: transform 0.4s ease;
    }

    &__social-link,
    &__email-action {
      transition:
        transform $transition-ui,
        box-shadow $transition-ui;
    }
  }

  @media (hover: hover) and (pointer: fine) {
    .contact-page__frame :deep(a:hover img) {
      transform: scale(1.02);
    }

    .contact-page__social-link:hover {
      transform: translateY(-$space-2) scale(1.05);
    }

    .contact-page__email-action:hover {
      transform: translateY(-$space-2);
    }
  }
}

@media (forced-colors: active) {
  .contact-page__social-link,
  .contact-page__email-action {
    border: $border-width solid LinkText;
  }
}
</style>
