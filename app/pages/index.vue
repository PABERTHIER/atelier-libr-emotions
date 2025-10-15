<template>
  <div class="homepage">
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">
            <span class="title-line">
              {{ t('app.name') }}
            </span>
            <span class="title-line accent">
              {{ t('pages.main.hero_title') }}
            </span>
          </h1>
          <div class="hero-description">
            {{ t('pages.main.hero_description') }}
          </div>
          <div v-show="device.isComputer.value" class="hero-buttons-desktop">
            <Button
              :name="t('pages.main.buttons.view_gallery')"
              @click="navigateTo(localPath(galleryLink))" />
            <Button
              :name="t('pages.main.buttons.about')"
              @click="navigateTo(localPath(aboutLink))" />
          </div>
        </div>
        <div class="hero-image">
          <div class="floating-artwork">
            <div class="artwork-frame first-picture">
              <Image
                :src="
                  linksConfigFirstPicture[currentFirstPictureIndex]!.filePath
                "
                sizes="xs:100px, sm:150px, md:150px, lg:175px, xl:200px"
                max-height="300px"
                :title="
                  linksConfigFirstPicture[currentFirstPictureIndex]!.title
                "
                :alt="linksConfigFirstPicture[currentFirstPictureIndex]!.alt" />
            </div>
            <div class="artwork-frame second-picture">
              <Image
                :src="
                  linksConfigSecondPicture[currentSecondPictureIndex]!.filePath
                "
                sizes="xs:80px, sm:130px, md:130px, lg:150px, xl:180px"
                max-height="180px"
                :title="
                  linksConfigSecondPicture[currentSecondPictureIndex]!.title
                "
                :alt="
                  linksConfigSecondPicture[currentSecondPictureIndex]!.alt
                " />
            </div>
            <div class="artwork-frame third-picture">
              <Image
                :src="
                  linksConfigThirdPicture[currentThirdPictureIndex]!.filePath
                "
                sizes="xs:80px, sm:100px, md:100px, lg:125px, xl:150px"
                max-height="250px"
                :title="
                  linksConfigThirdPicture[currentThirdPictureIndex]!.title
                "
                :alt="linksConfigThirdPicture[currentThirdPictureIndex]!.alt" />
            </div>
          </div>
        </div>
        <div v-show="!device.isComputer.value" class="hero-buttons-mobile">
          <Button
            :name="t('pages.main.buttons.view_gallery')"
            @click="navigateTo(localPath(galleryLink))" />
          <Button
            :name="t('pages.main.buttons.about')"
            @click="navigateTo(localPath(aboutLink))" />
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

const linksConfigFirstPicture = ref([
  {
    filePath: '/paintings/celestial-collision.webp',
    title: computed(() => t('pictures.paintings.celestial_collision.title')),
    alt: computed(() => t('pictures.paintings.celestial_collision.alt')),
  },
  {
    filePath: '/paintings/entangled-echoes.webp',
    title: computed(() => t('pictures.paintings.entangled_echoes.title')),
    alt: computed(() => t('pictures.paintings.entangled_echoes.alt')),
  },
  {
    filePath: '/paintings/abstract-autumn.webp',
    title: computed(() => t('pictures.paintings.abstract_autumn.title')),
    alt: computed(() => t('pictures.paintings.abstract_autumn.alt')),
  },
])

const linksConfigSecondPicture = ref([
  {
    filePath: '/paintings/entangled-echoes.webp',
    title: computed(() => t('pictures.paintings.entangled_echoes.title')),
    alt: computed(() => t('pictures.paintings.entangled_echoes.alt')),
  },
  {
    filePath: '/paintings/abstract-autumn.webp',
    title: computed(() => t('pictures.paintings.abstract_autumn.title')),
    alt: computed(() => t('pictures.paintings.abstract_autumn.alt')),
  },
  {
    filePath: '/paintings/celestial-collision.webp',
    title: computed(() => t('pictures.paintings.celestial_collision.title')),
    alt: computed(() => t('pictures.paintings.celestial_collision.alt')),
  },
])

const linksConfigThirdPicture = ref([
  {
    filePath: '/paintings/abstract-autumn.webp',
    title: computed(() => t('pictures.paintings.abstract_autumn.title')),
    alt: computed(() => t('pictures.paintings.abstract_autumn.alt')),
  },
  {
    filePath: '/paintings/celestial-collision.webp',
    title: computed(() => t('pictures.paintings.celestial_collision.title')),
    alt: computed(() => t('pictures.paintings.celestial_collision.alt')),
  },
  {
    filePath: '/paintings/entangled-echoes.webp',
    title: computed(() => t('pictures.paintings.entangled_echoes.title')),
    alt: computed(() => t('pictures.paintings.entangled_echoes.alt')),
  },
])

const galleryLink = ref('/painting/inks/nature')
const aboutLink = ref('/about')

const currentFirstPictureIndex = ref(0)
const currentSecondPictureIndex = ref(0)
const currentThirdPictureIndex = ref(0)
const timer = ref<NodeJS.Timeout | undefined>(undefined)

const next = () => {
  currentFirstPictureIndex.value =
    (currentFirstPictureIndex.value + 1) % linksConfigFirstPicture.value.length
  currentSecondPictureIndex.value =
    (currentSecondPictureIndex.value + 1) %
    linksConfigSecondPicture.value.length
  currentThirdPictureIndex.value =
    (currentThirdPictureIndex.value + 1) % linksConfigThirdPicture.value.length
}

onMounted(() => {
  timer.value = setInterval(next, 5000)
})

onBeforeUnmount(() => {
  clearInterval(timer.value)
})
</script>

<style lang="scss" scoped>
.homepage {
  width: 100%;
  height: 100%;

  .hero-section {
    height: 100%;
    width: 100%;

    .hero-content {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;

      @media (max-width: $lg) {
        height: auto;
        display: flex;
        flex-direction: column;
      }

      .hero-text {
        .hero-title {
          margin-bottom: 30px;

          .title-line {
            display: block;
            font-size: clamp(3rem, 8vw, 5rem);
            font-weight: 300;
            line-height: 1.1;
            letter-spacing: -2px;
            color: $dark-grey-blue-color;

            @media (max-width: $xl) {
              font-size: clamp(3rem, 5vw, 4rem);
            }

            @media (max-width: $lg) {
              font-size: clamp(3rem, 6vw, 4rem);
            }

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
              font-size: clamp(3rem, 3vw, 4rem);

              @media (max-width: $xl) {
                font-size: clamp(2rem, 3vw, 4rem);
              }

              @media (max-width: $lg) {
                font-size: clamp(2rem, 3vw, 3rem);
              }
            }
          }
        }

        .hero-description {
          max-width: 500px;
          margin-bottom: 50px;
          font-size: 18px;
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
            padding: 15px;
            background: $white-color;
            border-radius: 12px;
            box-shadow: 0 20px 40px $box-shadow-color;
            transition: transform 0.3s ease;

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
              padding: 10px;

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
              padding: 10px;

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
              padding: 10px;
              border-radius: 5px;

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
              padding: 5px;

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
        gap: 10px;

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
