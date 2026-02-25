<template>
  <div class="menu" data-lenis-prevent>
    <div
      v-show="!device.isMobile.value"
      class="menu-desktop"
      @mouseleave="hideContent()"
      @touchtart:passive="hideContent()">
      <div
        v-for="(section, index) in sections"
        :key="index"
        class="menu-section"
        @mouseenter="showContent(index)"
        @touchstart:passive="showContent(index)">
        <div
          class="menu-title"
          :class="{ 'menu-selected': activeIndex === index }"
          tabindex="0"
          @focus="showContent(index)">
          {{ section.title }}
        </div>
        <div v-if="activeIndex === index" class="menu-content">
          <div
            v-for="(subSection, subIndex) in section.subSections"
            :key="subIndex"
            class="menu-column">
            <div class="sub-section-title">{{ subSection.title }}</div>
            <ul class="links-container">
              <li
                v-for="(link, linkIndex) in subSection.links"
                :key="linkIndex"
                class="links">
                <NuxtLink
                  :to="localePath(link.url)"
                  class="link"
                  @click="hideContent()">
                  {{ link.text }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <NuxtLink
        :to="localePath('contact')"
        class="specific-section"
        @click="hideContent()">
        {{ contactTitle }}
      </NuxtLink>
    </div>
    <div v-show="device.isMobile.value" class="menu-mobile">
      <div class="menu-icon-container">
        <Icon
          name="ale-icon:menu-icon"
          color="black"
          size="25px"
          mode="svg"
          :aria-label="openMenuLabel"
          class="menu-icon"
          @click="toggleMobileMenu" />
      </div>
      <Transition name="menu-opening-mobile">
        <div v-if="isMenuOpen" class="menu-container">
          <div class="close-icon-container" @click="toggleMobileMenu">
            <Icon
              name="ale-icon:close"
              color="white"
              size="25px"
              mode="svg"
              :aria-label="closeMenuLabel" />
          </div>
          <div class="sections-container">
            <div
              v-for="(section, index) in sections"
              :key="index"
              class="sections">
              <div
                class="section-title"
                :class="{ 'menu-selected': section.showContent }"
                @click="toggleMobileSection(index)">
                {{ section.title }}
              </div>
              <div v-if="section.showContent" class="sub-section-container">
                <div
                  v-for="(subSection, subIndex) in section.subSections"
                  :key="subIndex"
                  class="sub-sections">
                  <div class="sub-section-title">{{ subSection.title }}</div>
                  <ul class="links-container">
                    <li
                      v-for="(link, linkIndex) in subSection.links"
                      :key="linkIndex"
                      class="links">
                      <NuxtLink
                        :to="localePath(link.url)"
                        class="link"
                        @click="toggleMobileMenu">
                        {{ link.text }}
                      </NuxtLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="specific-section">
              <NuxtLink :to="localePath('contact')" @click="toggleMobileMenu">
                {{ contactTitle }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const device = useScreenSize()

const contactTitle = computed(() => t('pages.contact.tab_name'))
const openMenuLabel = computed(() => t('components.menu.open'))
const closeMenuLabel = computed(() => t('components.menu.close'))

const isMenuOpen = ref(false)

// TODO: Update links
const sections = ref([
  {
    title: computed(() => t('miscellaneous.painting')),
    showContent: false,
    subSections: [
      {
        title: computed(() => t('miscellaneous.acrylic')),
        links: [
          {
            text: computed(() => t('miscellaneous.abstracts')),
            url: '/painting/acrylic/abstracts',
          },
          { text: computed(() => t('miscellaneous.faces')), url: '/wip' },
          { text: computed(() => t('miscellaneous.nature')), url: '/wip' },
          {
            text: computed(() => t('miscellaneous.miscellaneous')),
            url: '/wip',
          },
        ],
      },
      {
        title: computed(() => t('miscellaneous.oil_painting')),
        links: [
          {
            text: computed(() => t('miscellaneous.abstracts')),
            url: '/painting/oil/abstracts',
          },
          { text: computed(() => t('miscellaneous.faces')), url: '/wip' },
          { text: computed(() => t('miscellaneous.nudes')), url: '/wip' },
          { text: computed(() => t('miscellaneous.nature')), url: '/wip' },
          {
            text: computed(() => t('miscellaneous.miscellaneous')),
            url: '/wip',
          },
        ],
      },
      {
        title: computed(() => t('miscellaneous.inks')),
        links: [
          { text: computed(() => t('miscellaneous.abstracts')), url: '/wip' },
          { text: computed(() => t('miscellaneous.faces')), url: '/wip' },
          { text: computed(() => t('miscellaneous.nudes')), url: '/wip' },
          {
            text: computed(() => t('miscellaneous.nature')),
            url: '/painting/inks/nature',
          },
          {
            text: computed(() => t('miscellaneous.miscellaneous')),
            url: '/wip',
          },
        ],
      },
      {
        title: computed(() => t('miscellaneous.charcoal')),
        links: [
          { text: computed(() => t('miscellaneous.faces')), url: '/wip' },
          { text: computed(() => t('miscellaneous.nudes')), url: '/wip' },
          {
            text: computed(() => t('miscellaneous.miscellaneous')),
            url: '/wip',
          },
        ],
      },
      {
        title: computed(() => t('miscellaneous.pastel')),
        links: [
          { text: computed(() => t('miscellaneous.abstracts')), url: '/wip' },
          { text: computed(() => t('miscellaneous.faces')), url: '/wip' },
          { text: computed(() => t('miscellaneous.nudes')), url: '/wip' },
          { text: computed(() => t('miscellaneous.nature')), url: '/wip' },
          {
            text: computed(() => t('miscellaneous.miscellaneous')),
            url: '/wip',
          },
        ],
      },
      {
        title: computed(() => t('miscellaneous.mixed_technique')),
        links: [
          { text: computed(() => t('miscellaneous.abstracts')), url: '/wip' },
          { text: computed(() => t('miscellaneous.faces')), url: '/wip' },
          { text: computed(() => t('miscellaneous.nudes')), url: '/wip' },
          { text: computed(() => t('miscellaneous.nature')), url: '/wip' },
          {
            text: computed(() => t('miscellaneous.miscellaneous')),
            url: '/wip',
          },
        ],
      },
      {
        title: computed(() => t('miscellaneous.miscellaneous')),
        links: [
          { text: computed(() => t('miscellaneous.felt_pen')), url: '/wip' },
          { text: computed(() => t('miscellaneous.quick_work')), url: '/wip' },
          { text: computed(() => t('miscellaneous.christmas')), url: '/wip' },
        ],
      },
    ],
  },
  {
    title: computed(() => t('miscellaneous.ceramic')),
    showContent: false,
    subSections: [
      {
        title: computed(() => t('miscellaneous.electric_kiln')),
        links: [
          { text: computed(() => t('miscellaneous.nature')), url: '/wip' },
          { text: computed(() => t('miscellaneous.animals')), url: '/wip' },
          { text: computed(() => t('miscellaneous.person')), url: '/wip' },
          {
            text: computed(() => t('miscellaneous.vases_and_pots')),
            url: '/wip',
          },
          {
            text: computed(() => t('miscellaneous.various_objects')),
            url: '/wip',
          },
          { text: computed(() => t('miscellaneous.easter')), url: '/wip' },
          { text: computed(() => t('miscellaneous.christmas')), url: '/wip' },
        ],
      },
      {
        title: computed(() => t('miscellaneous.raku_and_smouldering')),
        links: [
          {
            text: computed(() => t('miscellaneous.nature')),
            url: '/ceramic/raku-smouldering/nature',
          },
          { text: computed(() => t('miscellaneous.animals')), url: '/wip' },
          { text: computed(() => t('miscellaneous.person')), url: '/wip' },
          {
            text: computed(() => t('miscellaneous.vases_and_pots')),
            url: '/wip',
          },
          {
            text: computed(() => t('miscellaneous.various_objects')),
            url: '/wip',
          },
          { text: computed(() => t('miscellaneous.easter')), url: '/wip' },
          { text: computed(() => t('miscellaneous.christmas')), url: '/wip' },
        ],
      },
      {
        title: computed(() => t('miscellaneous.porcelain')),
        links: [
          {
            text: computed(() => t('miscellaneous.flowers')),
            url: '/wip',
          },
          {
            text: computed(() => t('miscellaneous.candle_holder')),
            url: '/wip',
          },
          {
            text: computed(() => t('miscellaneous.miscellaneous')),
            url: '/wip',
          },
        ],
      },
      {
        title: computed(() => t('miscellaneous.miscellaneous')),
        links: [
          {
            text: computed(() => t('miscellaneous.before_after')),
            url: '/wip',
          },
          {
            text: computed(() => t('miscellaneous.ceramics_in_context')),
            url: '/wip',
          },
        ],
      },
      {
        title: computed(() => t('miscellaneous.wheel_pottery')),
        links: [
          {
            text: computed(() => t('miscellaneous.first_creations')),
            url: '/wip',
          },
        ],
      },
    ],
  },
  {
    title: computed(() => t('miscellaneous.events')),
    showContent: false,
    subSections: [
      {
        title: computed(() => t('miscellaneous.exhibitions')),
        links: [
          {
            text: computed(() => t('miscellaneous.2011_2019')),
            url: '/wip',
          },
          {
            text: computed(() => t('miscellaneous.2020_2022')),
            url: '/wip',
          },
          {
            text: computed(() => t('miscellaneous.2023_2025')),
            url: '/wip',
          },
        ],
      },
      {
        title: computed(() => t('miscellaneous.performances')),
        links: [
          {
            text: computed(() => t('miscellaneous.life_is_love')),
            url: '/wip',
          },
        ],
      },
      {
        title: computed(() => t('miscellaneous.miscellaneous_projects')),
        links: [
          {
            text: computed(() => t('miscellaneous.painting_while_dancing')),
            url: '/wip',
          },
          {
            text: computed(() => t('miscellaneous.collective_work')),
            url: '/wip',
          },
          {
            text: computed(() => t('miscellaneous.ceramic_courses')),
            url: '/wip',
          },
        ],
      },
    ],
  },
  {
    title: computed(() => t('miscellaneous.the_artist')),
    showContent: false,
    subSections: [
      {
        title: computed(() => t('miscellaneous.about_myself')),
        links: [
          {
            text: computed(() => t('miscellaneous.my_career')),
            url: '/about/development',
          },
          {
            text: computed(() => t('miscellaneous.my_artistic_approach')),
            url: '/about',
          },
          {
            text: computed(() => t('miscellaneous.my_cv')),
            url: '/about/cv',
          },
        ],
      },
      {
        title: computed(() => t('miscellaneous.in_action')),
        links: [
          {
            text: computed(() => t('miscellaneous.painting')),
            url: '/wip',
          },
          {
            text: computed(() => t('miscellaneous.ceramic')),
            url: '/wip',
          },
        ],
      },
    ],
  },
])

const activeIndex = ref<number | null>(null)

const showContent = (index: number) => {
  activeIndex.value = index
  document.body.classList.add('no-scroll')
}

const hideContent = () => {
  activeIndex.value = null
  document.body.classList.remove('no-scroll')
}

const toggleMobileMenu = () => {
  isMenuOpen.value = !isMenuOpen.value

  if (isMenuOpen.value) {
    document.body.classList.add('no-scroll')
  } else {
    document.body.classList.remove('no-scroll')
  }
}

const toggleMobileSection = (index: number) => {
  sections.value[index]!.showContent = !sections.value[index]!.showContent
}
</script>

<style lang="scss" scoped>
.menu {
  width: 100%;

  .menu-desktop {
    display: flex;
    justify-content: space-around;
    position: relative;

    .menu-section {
      padding: 10px 0;

      .menu-title {
        font-size: 20px;
        color: $grey-color;
        transition:
          color 0.3s ease,
          transform 0.2s ease;

        &:hover {
          color: $primary-text-color;
          transform: scale(1.05);
        }
      }

      .menu-selected {
        color: $primary-text-color;
        font-weight: bold;
      }

      .menu-content {
        display: flex;
        position: absolute;
        top: 100%;
        left: 3%;
        width: 75%;
        z-index: $menu-z-index;
        background-color: $white-background-color;
        box-shadow: 0 8px 16px $box-shadow-color;
        border-top: 2px solid $primary-text-color;
        gap: 15px 40px;
        overflow-y: auto;
        overscroll-behavior: contain;

        .menu-column {
          .sub-section-title {
            margin-bottom: 12px;
            font-weight: bold;
            color: $primary-text-color;
            text-transform: uppercase;
            letter-spacing: 1px;
          }

          .links-container {
            .links {
              color: $grey-color;

              .link {
                display: block;
                margin-bottom: 8px;
                transition: color 0.3s ease;

                &:hover {
                  color: $primary-text-color;
                }
              }
            }
          }
        }
      }

      @media (min-height: $md) {
        .menu-content {
          flex-wrap: wrap;
          max-height: 550px;
          padding: 20px 0;
          padding-left: 50px;

          .menu-column {
            min-width: 250px;
            max-width: 300px;
            padding-top: 15px;
          }
        }
      }

      @media (max-height: $md) {
        .menu-content {
          flex-wrap: nowrap;
          max-height: 200px;
          padding: 10px 20px;

          .menu-column {
            min-width: 150px;
            max-width: 200px;
            padding-top: 0px;
          }
        }
      }
    }

    .specific-section {
      padding: 10px 0;
      font-size: 20px;
      color: $grey-color;
      transition:
        color 0.3s ease,
        transform 0.2s ease;
      cursor: pointer;

      &:hover {
        color: $primary-text-color;
        font-weight: bold;
        transform: scale(1.05);
      }
    }
  }

  .menu-mobile {
    .menu-icon-container {
      display: flex;
      justify-content: flex-start;

      .menu-icon {
        cursor: pointer;
      }
    }

    .menu-container {
      height: 100%;
      z-index: $menu-z-index;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      padding: 15px;
      background-color: $mobile-menu-background-color;
      overflow-y: auto;
      overscroll-behavior: contain;

      .close-icon-container {
        display: flex;
        justify-content: right;
        position: sticky;
        top: 15px;
        cursor: pointer;
      }

      .sections-container {
        .sections {
          margin-bottom: 10px;
          border-bottom: 1px solid $mobile-menu-border-color;
          padding-bottom: 10px;

          .section-title {
            padding: 10px 0;
            font-size: 20px;
            font-weight: bold;
            color: $white-color;
            transition: color 0.3s ease;
            cursor: pointer;

            &.menu-selected {
              color: $light-blue-color;
            }
          }

          .sub-section-container {
            margin-bottom: 10px;
            margin-top: 5px;
            margin-left: 30px;
            padding-left: 25px;

            .sub-sections {
              margin-bottom: 10px;

              .sub-section-title {
                margin-bottom: 5px;
                font-size: 15px;
                font-weight: bold;
                color: $white-color;
                text-transform: uppercase;
                letter-spacing: 1px;
              }

              .links-container {
                margin-bottom: 10px;
                margin-left: 15px;

                .links {
                  .link {
                    display: block;
                    padding: 4px 8px;
                    border-radius: 4px;
                    color: $light-grey-color;
                    font-size: 15px;
                    transition:
                      background-color 0.3s ease,
                      color 0.3s ease;

                    &:hover {
                      background-color: $dark-grey-color;
                      color: $white-color;
                    }
                  }
                }
              }
            }
          }
        }

        .specific-section {
          margin-bottom: 10px;
          padding-top: 10px;
          padding-bottom: 20px;
          border-bottom: 1px solid $mobile-menu-border-color;
          font-size: 20px;
          font-weight: bold;
          color: $white-color;
          transition: color 0.3s ease;
          cursor: pointer;
        }
      }

      .sections:last-child,
      .sub-section-container:last-child,
      .sub-sections:last-child,
      .links-container:last-child {
        margin-bottom: 0;
      }
    }

    .menu-opening-mobile-enter-active {
      transition:
        transform 0.3s ease-out,
        opacity 0.3s ease-out;
    }

    .menu-opening-mobile-leave-active {
      transition:
        transform 0.3s ease-in,
        opacity 0.3s ease-in;
    }

    .menu-opening-mobile-enter-from,
    .menu-opening-mobile-leave-to {
      transform: translateX(-100%);
      opacity: 0;
    }

    .menu-opening-mobile-enter-to,
    .menu-opening-mobile-leave-from {
      transform: translateX(0);
      opacity: 1;
    }
  }
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
