<template>
  <div class="homepage">
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">
            <span class="title-line">
              {{ t('pages.main.hero_title.part_1') }}
            </span>
            <span class="title-line accent">
              {{ t('pages.main.hero_title.part_2') }}
            </span>
          </h1>
          <div class="hero-description">
            {{ t('pages.main.hero_description') }}
          </div>
          <div v-show="device.isComputer.value" class="hero-buttons-desktop">
            <Button
              :name="t('pages.main.buttons.view_gallery')"
              @click="navigateTo(localPath('/painting/oil/abstracts'))" />
            <Button
              :name="t('pages.main.buttons.about')"
              @click="navigateTo(localPath('/about'))" />
          </div>
        </div>
        <div class="hero-image">
          <div class="floating-artwork">
            <div class="artwork-frame first-picture">
              <div class="artwork-content">
                <Image
                  src="/paintings/celestial-collision.jpg"
                  sizes="xs:100px, sm:150px, md:150px, lg:175px, xl:200px"
                  max-height="300px"
                  :title="abstractAutumnPaintingTitle"
                  :alt="abstractAutumnPaintingAlt" />
                <div class="artwork-title-left">{{ title }}</div>
              </div>
            </div>
            <div class="artwork-frame second-picture">
              <div class="artwork-content">
                <Image
                  src="/paintings/entangled-echoes.jpg"
                  sizes="xs:80px, sm:130px, md:130px, lg:150px, xl:180px"
                  max-height="180px"
                  :title="abstractAutumnPaintingTitle"
                  :alt="abstractAutumnPaintingAlt" />
                <div class="artwork-title">{{ title }}</div>
              </div>
            </div>
            <div class="artwork-frame third-picture">
              <div class="artwork-content">
                <Image
                  src="/paintings/abstract-autumn.jpg"
                  sizes="xs:80px, sm:100px md:100px, lg:125px, xl:150px"
                  max-height="250px"
                  :title="abstractAutumnPaintingTitle"
                  :alt="abstractAutumnPaintingAlt" />
                <div class="artwork-title">{{ title }}</div>
              </div>
            </div>
          </div>
        </div>
        <div v-show="!device.isComputer.value" class="hero-buttons-mobile">
          <Button
            :name="t('pages.main.buttons.view_gallery')"
            @click="navigateTo(localPath('/painting/oil/abstracts'))" />
          <Button
            :name="t('pages.main.buttons.about')"
            @click="navigateTo(localPath('/about'))" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localPath = useLocalePath()
const runtimeConfig = useRuntimeConfig()
const device = useScreenSize()

const baseUrl = ref(runtimeConfig.public.i18n.baseUrl)
const ogImageEndPath = 'paintings/celestial-collision.jpg'

useHead({
  title: computed(() => t('pages.main.tab_name')),
  meta: [
    { name: 'description', content: computed(() => t('app.meta.description')) },
  ],
})

useSeoMeta({
  ogTitle: '%s %separator %siteName',
  description: computed(() => t('app.meta.description')),
  ogDescription: computed(() => t('app.meta.description')),
  ogImage: `${baseUrl.value}/${ogImageEndPath}`,
  ogImageSecureUrl: `${baseUrl.value}/${ogImageEndPath}`,
  ogImageAlt: computed(() => t('app.meta.description')),
  ogImageType: 'image/jpeg',
  ogImageWidth: '1200',
  ogImageHeight: '600',
  twitterTitle: '%s %separator %siteName',
  twitterDescription: computed(() => t('app.meta.description')),
  twitterImage: `${baseUrl.value}/${ogImageEndPath}`,
  twitterImageAlt: computed(() => t('app.meta.description')),
  twitterImageType: 'image/jpeg',
  appleMobileWebAppTitle: '%s %separator %siteName',
  msapplicationTileImage: `${baseUrl.value}/${ogImageEndPath}`,
})

defineOgImageComponent('NuxtSeo', { theme: '#ff0000', colorMode: 'dark' })

// TODO: Update title for each picture (config instead + move the content from json locales)
// + Add a link for each picture for the page where they are
const abstractAutumnPaintingTitle = computed(() =>
  t('pages.main.abstract_autumn_painting.title')
)
const abstractAutumnPaintingAlt = computed(() =>
  t('pages.main.abstract_autumn_painting.alt')
)

// TODO: Dynamic title in config instead
const title = 'Painting'
</script>

<style lang="scss" scoped>
.homepage {
  height: 100%;
  width: 100%;

  .hero-section {
    height: 100%;
    width: 100%;

    .hero-content {
      height: 90%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;

      @media (max-width: $lg) {
        height: 100%;
        display: flex;
        flex-direction: column;
      }

      @media (max-width: $sm) {
        height: auto;
        display: flex;
        flex-direction: column;
      }

      .hero-text {
        .hero-title {
          margin-bottom: 30px;
          font-size: clamp(3rem, 8vw, 5rem);
          font-weight: 300;
          line-height: 1.1;
          letter-spacing: -2px;

          @media (max-width: $xl) {
            font-size: clamp(3rem, 5vw, 5rem);
          }

          @media (max-width: $lg) {
            font-size: clamp(3rem, 6vw, 5rem);
          }

          .title-line {
            display: block;
            color: $dark-grey-blue-color;

            &.accent {
              background: linear-gradient(
                135deg,
                $dark-red-color,
                $grey-blue-color
              );
              background-clip: text;
              -webkit-background-clip: text;
              font-weight: 500;
              color: transparent;
            }
          }
        }

        .hero-description {
          max-width: 500px;
          margin-bottom: 50px;
          font-size: 1.2rem;
          line-height: 1.6;
          color: $grey-color-2;

          @media (max-width: $xl) {
            max-width: 430px;
          }

          @media (max-width: $lg) {
            max-width: 500px;
            margin-bottom: 30px;
          }
        }

        .hero-buttons-desktop {
          max-width: 475px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }
      }

      .hero-image {
        height: 500px;
        width: 650px;
        position: relative;

        .floating-artwork {
          width: 100%;
          height: 500px;
          position: relative;

          .artwork-frame {
            position: absolute;
            border-radius: 12px;
            box-shadow: 0 20px 40px $box-shadow-color;
            transition: transform 0.3s ease;
            background: $white-color;
            padding: 15px 15px 5px 15px;

            &.first-picture {
              top: 50px;
              left: 50px;
              animation: float 6s ease-in-out infinite;
            }

            &.second-picture {
              top: 150px;
              left: 420px;
              animation: float 6s ease-in-out infinite 2s;
            }

            &.third-picture {
              top: 200px;
              left: 200px;
              animation: float 6s ease-in-out infinite 4s;
            }

            .artwork-content {
              .artwork-title {
                width: 100%;
                text-align: center;
              }

              .artwork-title-left {
                width: 100%;
                text-align: left;
              }
            }

            @keyframes float {
              0%,
              100% {
                transform: translateY(0px);
              }
              50% {
                transform: translateY(-20px);
              }
            }
          }
        }
      }

      @media (max-width: $xl) {
        .hero-image {
          height: 450px;
          width: 500px;

          .floating-artwork {
            height: 450px;

            .artwork-frame {
              padding: 10px 10px 5px 10px;

              &.first-picture {
                top: 80px;
                left: 10px;
                animation: float 8s ease-in-out infinite;
              }

              &.second-picture {
                top: 175px;
                left: 330px;
                animation: float 8s ease-in-out infinite 2s;
              }

              &.third-picture {
                top: 225px;
                left: 140px;
                animation: float 8s ease-in-out infinite 4s;
              }
            }
          }
        }
      }

      @media (max-width: $lg) {
        .hero-image {
          height: 300px;
          width: 400px;

          .floating-artwork {
            height: 300px;

            .artwork-frame {
              padding: 10px 10px 5px 10px;

              &.first-picture {
                top: 0px;
                left: 10px;
                animation: float 8s ease-in-out infinite;
              }

              &.second-picture {
                top: 75px;
                left: 275px;
                animation: float 8s ease-in-out infinite 2s;
              }

              &.third-picture {
                top: 125px;
                left: 125px;
                animation: float 8s ease-in-out infinite 4s;
              }
            }
          }
        }
      }

      @media (max-width: $sm) {
        .hero-image {
          height: 250px;
          width: 300px;

          .floating-artwork {
            height: 250px;

            .artwork-frame {
              padding: 10px 10px 3px 10px;

              &.first-picture {
                top: 0px;
                left: 10px;
                animation: float 10s ease-in-out infinite;
              }

              &.second-picture {
                top: 50px;
                left: 210px;
                animation: float 10s ease-in-out infinite 2s;
              }

              &.third-picture {
                top: 100px;
                left: 90px;
                animation: float 10s ease-in-out infinite 4s;
              }
            }
          }
        }
      }

      @media (max-width: $xs) {
        .hero-image {
          height: 250px;
          width: 250px;
          font-size: 14px;

          .floating-artwork {
            height: 150px;

            .artwork-frame {
              padding: 5px 5px 2px 5px;

              &.first-picture {
                top: 0px;
                left: 0px;
                animation: float 15s ease-in-out infinite;
              }

              &.second-picture {
                top: 50px;
                left: 175px;
                animation: float 15s ease-in-out infinite 2s;
              }

              &.third-picture {
                top: 70px;
                left: 70px;
                animation: float 15s ease-in-out infinite 4s;
              }
            }
          }
        }
      }

      .hero-buttons-mobile {
        width: 100%;
        max-width: 475px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: 30px;

        @media (max-width: '395px') {
          justify-content: center;
        }

        .button-container {
          margin-bottom: 5px;
        }
      }
    }
  }
}
</style>
