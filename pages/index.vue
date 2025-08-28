<template>
  <div class="homepage">
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-image">
          <div class="floating-artwork">
            <div class="artwork-frame first-picture">
              <div class="artwork-content">
                <Image
                  src="/paintings/celestial-collision.jpg"
                  sizes="xs:100px, sm:150px, md:150px, lg:200px"
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
                  sizes="xs:80px, sm:130px, md:130px, lg:180px"
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
                  sizes="xs:80px, sm:100px md:100px, lg:150px"
                  max-height="250px"
                  :title="abstractAutumnPaintingTitle"
                  :alt="abstractAutumnPaintingAlt" />
                <div class="artwork-title">{{ title }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const runtimeConfig = useRuntimeConfig()
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
  .hero-section {
    .hero-content {
      display: grid;
      grid-template-columns: 1fr 1fr;

      .hero-image {
        position: relative;
        height: 500px;
        width: 500px;

        .floating-artwork {
          position: relative;
          width: 100%;
          height: 100%;

          .artwork-frame {
            position: absolute;
            border-radius: 12px;
            box-shadow: 0 20px 40px $box-shadow-color;
            transition: transform 0.3s ease;
            background: $white-color;
            padding: 15px 15px 5px 15px;

            &.first-picture {
              top: 150px;
              left: 50px;
              animation: float 6s ease-in-out infinite;
            }

            &.second-picture {
              top: 250px;
              left: 420px;
              animation: float 6s ease-in-out infinite 2s;
            }

            &.third-picture {
              top: 300px;
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

      @media (max-width: $lg) {
        .hero-image {
          height: 400px;
          width: 400px;

          .floating-artwork {
            .artwork-frame {
              padding: 10px 10px 5px 10px;

              &.first-picture {
                top: 100px;
                left: 10px;
                animation: float 8s ease-in-out infinite;
              }

              &.second-picture {
                top: 175px;
                left: 275px;
                animation: float 8s ease-in-out infinite 2s;
              }

              &.third-picture {
                top: 225px;
                left: 125px;
                animation: float 8s ease-in-out infinite 4s;
              }
            }
          }
        }
      }

      @media (max-width: $sm) {
        .hero-image {
          height: 300px;
          width: 300px;

          .floating-artwork {
            .artwork-frame {
              padding: 10px 10px 3px 10px;

              &.first-picture {
                top: 75px;
                left: 10px;
                animation: float 10s ease-in-out infinite;
              }

              &.second-picture {
                top: 125px;
                left: 210px;
                animation: float 10s ease-in-out infinite 2s;
              }

              &.third-picture {
                top: 150px;
                left: 90px;
                animation: float 10s ease-in-out infinite 4s;
              }
            }
          }
        }
      }

      @media (max-width: $xs) {
        .hero-image {
          height: 150px;
          width: 150px;
          font-size: 14px;

          .floating-artwork {
            .artwork-frame {
              padding: 5px 5px 2px 5px;

              &.first-picture {
                top: 30px;
                left: 0px;
                animation: float 15s ease-in-out infinite;
              }

              &.second-picture {
                top: 80px;
                left: 175px;
                animation: float 15s ease-in-out infinite 2s;
              }

              &.third-picture {
                top: 100px;
                left: 70px;
                animation: float 15s ease-in-out infinite 4s;
              }
            }
          }
        }
      }
    }
  }
}
</style>
