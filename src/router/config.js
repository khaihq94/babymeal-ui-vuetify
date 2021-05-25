import { LayoutAuth, LayoutDefault, LayoutChat, LayoutMedia, RouteWrapper } from '@/components/layouts'

export const publicRoute = [
  {
    path: '*',
    component: () => import('@/views/error/NotFound.vue'),
  },
  {
    path: '/admin/auth',
    component: LayoutAuth,
    meta: {
      title: 'Login',
    },
    redirect: '/admin/auth/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        meta: {
          title: 'Login',
        },
        component: () => import('@/views/auth/Login.vue'),
      },
    ],
  },

  {
    path: '/admin/404',
    name: '404',
    meta: {
      title: 'Not Found',
    },
    component: () => import('@/views/error/NotFound.vue'),
  },

  {
    path: '/admin/500',
    name: '500',
    meta: {
      title: 'Server Error',
    },
    component: () => import('@/views/error/Error.vue'),
  },
]

export const protectedRoute = [
  {
    path: '/admin',
    component: LayoutDefault,
    meta: {
      title: 'home',
      icon: '',
    },
    redirect: '/admin/dashboard',
    children: [
      {
        path: '/admin/dashboard',
        name: 'dashboard',
        meta: {
          title: 'dashboard',
          icon: 'mdi-view-dashboard',
        },
        component: () => import('@/views/Dashboard.vue'),
      },
      //Recipe
      {
        path: '/admin/recipes',
        meta: {
          title: 'recipe',
          icon: 'mdi-noodles',
        },
        name: 'Recipe',
        component: () => import('@/views/Recipes.vue'),
      },
      {
        path: '/admin/recipes',
        component: RouteWrapper,
        meta: {
          title: 'recipe',
          hidden: true
        },
        children: [
          {
            path: '/admin/recipes/create',
            name: 'recipe-create',
            meta: {
              title: 'create',
            },
            component: () => import('@/views/form/RecipeForm.vue'),
          },
          {
            path: '/admin/recipes/:id',
            name: 'recipe-edit',
            meta: {
              title: 'edit',
            },
            component: () => import('@/views/form/RecipeForm.vue'),
          },
        ],
      },
      //Age
      {
        path: '/admin/ages',
        meta: {
          title: 'age',
          icon: 'mdi-baby',
        },
        component: () => import('@/views/Ages.vue'),
      },
      {
        path: '/admin/ages',
        component: RouteWrapper,
        meta: {
          title: 'age',
          hidden: true
        },
        children: [
          {
            path: '/admin/ages/create',
            name: 'age-create',
            meta: {
              title: 'create',
            },
            component: () => import('@/views/form/TranslationForm.vue'),
          },
          {
            path: '/admin/ages/:id',
            name: 'age-edit',
            meta: {
              title: 'edit',
            },
            component: () => import('@/views/form/TranslationForm.vue'),
          },
        ],
      },
      //Dish
      {
        path: '/admin/dishes',
        meta: {
          title: 'dish',
          icon: 'mdi-silverware-fork-knife',
        },
        component: () => import('@/views/Dishes.vue'),
      },
      {
        path: '/admin/dishes',
        component: RouteWrapper,
        meta: {
          title: 'dish',
          hidden: true
        },
        children: [
          {
            path: '/admin/dishes/create',
            name: 'dish-create',
            meta: {
              title: 'create',
            },
            component: () => import('@/views/form/TranslationForm.vue'),
          },
          {
            path: '/admin/dishes/:id',
            name: 'dish-edit',
            meta: {
              title: 'edit',
            },
            component: () => import('@/views/form/TranslationForm.vue'),
          },
        ],
      },
      //Ingredient
      {
        path: '/admin/ingredients',
        meta: {
          title: 'ingredient',
          icon: 'mdi-corn',
        },
        component: () => import('@/views/Ingredients.vue'),
      },
      {
        path: '/admin/ingredients',
        component: RouteWrapper,
        meta: {
          title: 'ingredient',
          hidden: true
        },
        children: [
          {
            path: '/admin/ingredients/create',
            name: 'ingredient-create',
            meta: {
              title: 'create',
            },
            component: () => import('@/views/form/TranslationForm.vue'),
          },
          {
            path: '/admin/ingredients/:id',
            name: 'ingredient-edit',
            meta: {
              title: 'edit',
            },
            component: () => import('@/views/form/TranslationForm.vue'),
          },
        ],
      },
      //Unit
      {
        path: '/admin/units',
        meta: {
          title: 'unit',
          icon: 'mdi-ruler',
        },
        component: () => import('@/views/Units.vue'),
      },
      {
        path: '/admin/units',
        component: RouteWrapper,
        meta: {
          title: 'unit',
          hidden: true
        },
        children: [
          {
            path: '/admin/units/create',
            name: 'unit-create',
            meta: {
              title: 'create',
            },
            component: () => import('@/views/form/UnitForm.vue'),
          },
          {
            path: '/admin/units/:id',
            name: 'unit-edit',
            meta: {
              title: 'edit',
            },
            component: () => import('@/views/form/UnitForm.vue'),
          },
        ],
      },
      //calendar
      {
        path: '/admin/calendar',
        meta: {
          title: 'calendar',
          icon: 'mdi-calendar-check',
        },
        name: 'calendar',
        props: (route) => ({
          type: route.query.type,
        }),
        component: () => import('@/views/Calendar.vue'),
      },
      //calendar
      {
        path: '/admin/kanboard',
        meta: {
          title: 'kanboard',
          icon: 'mdi-drag-variant',
        },
        name: 'kanboard',
        component: () => import('@/views/task/KanBoard.vue'),
      },
      {
        path: '/admin/chat',
        meta: {
          title: 'chat',
          icon: 'mdi-chat',
          isNew: true,
        },
        redirect: '/admin/chat/messaging',
      },
      {
        path: '/admin/media',
        meta: {
          title: 'media',
          icon: 'mdi-image',
          isNew: true,
        },
        redirect: '/admin/media/file',
      },

      //element
      {
        path: '/admin/element',
        component: RouteWrapper,
        meta: {
          title: 'element',
          icon: 'mdi-dots-square',
        },
        redirect: '/admin/element/cascader',
        children: [
          {
            path: '/admin/element/cascader',
            name: 'element.cascader',
            meta: {
              title: 'cascader',
              icon: 'mdi-alpha-c',
            },
            component: () => import('@/views/element/Cascader.vue'),
          },
        ],
      },
      //task
      {
        path: '/admin/task',
        component: RouteWrapper,
        redirect: '/admin/task/list',
        meta: {
          title: 'task',
          icon: 'mdi-grid',
        },
        children: [
          {
            path: '/admin/task/list',
            name: 'task',
            meta: {
              title: 'task',
              icon: 'mdi-newspaper',
            },
            redirect: '/admin/task/list',
            component: RouteWrapper,
            children: [
              {
                path: '/admin/task/list',
                name: 'task.list',
                meta: {
                  title: 'task_list',
                  icon: 'mdi-calendar-account',
                },
                component: () => import('@/views/task/TaskList.vue'),
              },
            ],
          },
        ],
      },
      //widgets
      {
        path: '/admin/widgets',
        component: RouteWrapper,
        meta: {
          title: 'widget',
          icon: 'mdi-widgets',
        },
        redirect: '/admin/widgets/social',
        children: [
          {
            path: '/admin/widgets/social',
            name: 'SocialWidget',
            meta: {
              title: 'social',
              icon: 'mdi-face-profile',
            },
            component: () => import('@/views/widgets/Social.vue'),
          },
          {
            path: '/admin/widgets/statistic',
            name: 'StatisticWidget',
            meta: {
              title: 'statistic',
              icon: 'mdi-hexagon',
            },
            component: () => import('@/views/widgets/Statistic.vue'),
          },
        ],
      },
      //form
      {
        path: '/admin/forms',
        component: RouteWrapper,
        meta: {
          title: 'form',
          icon: 'mdi-form-textbox',
        },
        redirect: '/admin/forms/basic',
        children: [
          {
            path: '/admin/forms/basic',
            name: 'forms.basic',
            meta: {
              title: 'basic_form',
              icon: 'mdi-alpha-b',
            },
            component: () => import('@/views/form/BasicForm.vue'),
          },
          {
            path: '/admin/forms/stepper',
            name: 'forms.stepper',
            meta: {
              title: 'step_form',
              icon: 'mdi-alpha-s',
            },
            component: () => import('@/views/form/Steppers.vue'),
          },
        ],
      },
      //chart
      {
        path: '/admin/chart',
        component: RouteWrapper,
        meta: {
          title: 'chart',
          icon: 'mdi-chart-line',
        },
        redirect: '/admin/chart/echart',
        children: [
          {
            path: '/admin/chart/echart',
            name: 'echart',
            meta: {
              title: 'echart',
              icon: 'mdi-paw',
            },
            component: () => import('@/views/chart/Echart.vue'),
          },
          {
            path: '/admin/chart/g2',
            name: 'g2',
            meta: {
              title: 'g2',
              icon: 'mdi-alpha-g',
            },
            component: () => import('@/views/chart/G2.vue'),
          },
        ],
      },

      {
        path: '/admin/changelog',
        name: 'changelog',
        meta: {
          title: 'changelog',
          icon: 'mdi-timeline-text',
        },
        component: () => import('@/views/Changelog.vue'),
      },
      {
        path: '/admin/403',
        name: 'Forbidden',
        meta: {
          title: 'access_denied',
          hidden: true,
        },
        component: () => import('@/views/error/Deny.vue'),
      },
    ],
  },
  //media
  {
    path: '/admin/media',
    meta: {
      title: 'media',
      icon: 'mdi-image',
    },
    name: 'media',
    component: LayoutMedia,
    redirect: '/admin/media/file',
    children: [
      {
        path: '/admin/media/file',
        name: 'media.index',
        meta: {
          title: 'media manager',
          icon: 'mdi-view',
        },
        component: () => import('@/views/media/MediaView.vue'),
      },
      {
        path: '/admin/media/:type',
        name: 'media.type',
        meta: {
          title: 'media manager',
          icon: 'mdi-view',
        },
        props: true,
        component: () => import('@/views/media/MediaView.vue'),
      },
    ],
  },
  // chat app
  {
    path: '/admin/chat',
    name: 'Chat',
    component: LayoutChat,
    redirect: {
      path: '/admin/chat/messaging',
    },
    meta: {
      title: 'Chat',
      icon: 'chat_bubble',
    },
    children: [
      {
        path: '/admin/chat/messaging/:uuid?',
        name: 'ChatMessaging',
        props: true,
        component: () => import('@/views/chat/ChatMessaging.vue'),
      },
    ],
  },
]
