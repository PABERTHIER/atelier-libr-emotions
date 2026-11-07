<template>
  <div class="home-page">
    <section class="home-page__hero" aria-labelledby="home-title">
      <div class="home-page__intro">
        <h1 id="home-title" class="home-page__title">
          <span class="home-page__title-line">{{ t('app.name') }}</span>
          <span class="home-page__title-line home-page__title-line--accent">
            {{ t('pages.main.hero_title') }}
          </span>
        </h1>
        <p class="home-page__description">
          {{ t('pages.main.hero_description') }}
        </p>
      </div>

      <Carousel class="home-page__carousel" />

      <div class="home-page__actions">
        <NuxtLink
          :to="localePath('/painting/acrylic/abstracts')"
          class="home-page__action">
          {{ t('pages.main.buttons.view_gallery') }}
        </NuxtLink>
        <NuxtLink :to="localePath('/about')" class="home-page__action">
          {{ t('pages.main.buttons.about') }}
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useHead(usePageSeo('home'))
</script>

<style lang="scss" scoped>
.home-page {
  width: 100%;
  min-width: 0;

  &__hero {
    display: grid;
    grid-template-areas: 'intro' 'carousel' 'actions';
    grid-template-columns: minmax(0, 1fr);
    align-items: center;
    justify-items: center;
    gap: $space-30;
    max-width: 1664px;
    margin-inline: auto;
  }

  &__intro {
    grid-area: intro;
    width: 100%;
    min-width: 0;
    max-width: 45rem;
    text-align: start;
    overflow-wrap: anywhere;
  }

  &__title {
    margin: 0 0 $space-30;
    font-weight: 300;
    line-height: 1.1;
  }

  &__title-line {
    display: block;
    color: var(--color-heading);
    font-size: clamp(3rem, 8vw, 5rem);
    letter-spacing: -0.125rem;

    &--accent {
      background: linear-gradient(
        135deg,
        var(--color-red-text),
        var(--color-hero-accent)
      );
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
      font-size: clamp(3rem, 3vw, 4rem);
      font-weight: 500;
    }
  }

  &__description {
    margin: 0;
    max-width: 31.25rem;
    color: var(--color-muted);
    font-size: 1.125rem;
    line-height: 1.6;
  }

  &__carousel {
    grid-area: carousel;
  }

  &__actions {
    grid-area: actions;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: $space-15 $space-10;
    width: 100%;
    max-width: 31.25rem;
  }

  &__action {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: $control-size;
    max-width: 100%;
    padding: $space-20;
    border-radius: $space-8;
    background: var(--color-control-glass);
    color: inherit;
    font-size: 1.25rem;
    line-height: 1.25;
    text-align: center;
    overflow-wrap: anywhere;
    -webkit-backdrop-filter: blur($space-10);
    backdrop-filter: blur($space-10);

    &::before {
      position: absolute;
      inset: 0;
      padding: $space-2;
      border-radius: inherit;
      background: linear-gradient(
        90deg,
        $light-grey-color-2 0%,
        $light-grey-color-2 25%,
        $grey-blue-color 50%,
        $dark-red-color 75%,
        $grey-blue-color 100%
      );
      background-size: 400% auto;
      -webkit-mask:
        linear-gradient($white-color 0 0) content-box,
        linear-gradient($white-color 0 0);
      mask:
        linear-gradient($white-color 0 0) content-box,
        linear-gradient($white-color 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      pointer-events: none;
      content: '';
    }

    &:hover::before,
    &:focus-visible::before {
      background-position: -50% 0;
    }
  }
}

@media (min-width: calc($lg + $border-width)) {
  .home-page {
    &__hero {
      grid-template-areas: 'intro carousel' 'actions carousel';
      grid-template-columns: min(45rem, 54%) minmax(0, 650px);
      justify-content: space-around;
      gap: $space-50 $space-40;
    }

    &__intro {
      align-self: end;
      justify-self: start;
      max-width: none;
    }

    &__actions {
      align-self: start;
      justify-self: start;
    }
  }
}

@media (max-width: $xl) {
  .home-page {
    &__hero {
      column-gap: $space-20;
    }

    &__title-line {
      font-size: clamp(3rem, 5vw, 4rem);

      &--accent {
        font-size: clamp(2rem, 3vw, 4rem);
      }
    }
  }
}

@media (max-width: $lg) {
  .home-page {
    --home-copy-width: clamp(31.25rem, 60vw, 37.5rem);

    &__intro {
      max-width: var(--home-copy-width);
    }

    &__description {
      max-width: var(--home-copy-width);
    }

    &__title-line {
      font-size: clamp(3rem, 6vw, 4rem);

      &--accent {
        font-size: clamp(2rem, 3vw, 3rem);
      }
    }
  }
}

@media (min-width: calc($lg + $border-width)) and (max-width: $xl) {
  .home-page__hero {
    grid-template-columns: min(40rem, 54%) minmax(0, 500px);
  }
}

@media (min-width: 420px) and (max-width: $lg) {
  .home-page__actions {
    width: max-content;
    max-width: 100%;
    margin-top: -$space-10;
    column-gap: $space-20;
  }

  .home-page__action {
    margin-inline: auto;
  }
}

@media (max-width: $md) {
  .home-page__action {
    padding: $space-10;
  }
}

@media (max-width: $xs) {
  .home-page {
    &__title-line {
      font-size: clamp(2rem, 14vw, 3rem);

      &--accent {
        font-size: 2rem;
      }
    }
  }
}

@media (width < 420px) {
  .home-page__actions {
    justify-content: center;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .home-page {
    &__action::before {
      transition: background-position $transition-ui;
    }
  }
}

@media (forced-colors: active) {
  .home-page__title-line--accent {
    background: none;
    color: CanvasText;
  }

  .home-page__action {
    border: $border-width solid LinkText;

    &::before {
      display: none;
    }
  }
}
</style>
