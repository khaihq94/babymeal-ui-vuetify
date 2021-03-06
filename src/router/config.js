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
      public: true,
      disableIfLoggedIn: true,
    },
    redirect: '/admin/auth/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        meta: {
          title: 'Login',
          public: true,
          disableIfLoggedIn: true,
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
      public: true,
    },
    component: () => import('@/views/error/NotFound.vue'),
  },

  {
    path: '/admin/500',
    name: '500',
    meta: {
      title: 'Server Error',
      public: true,
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
      {
        path: '/admin/babymeal',
        component: RouteWrapper,
        meta: {
          title: 'babymeal.title',
          icon: 'mdi-silverware-fork-knife',
        },
        redirect: '/admin/babymeal/recipes',
        children: [
          //Recipe
          {
            path: '/admin/babymeal/recipes',
            name: 'recipes',
            meta: {
              title: 'babymeal.recipe',
              icon: 'mdi-noodles',
            },
            name: 'Recipe',
            component: () => import('@/views/Recipes.vue'),
          },
          {
            path: '/admin/babymeal/recipes',
            component: RouteWrapper,
            meta: {
              title: 'babymeal.recipe',
              hidden: true,
            },
            children: [
              {
                path: '/admin/babymeal/recipes/create',
                name: 'recipe-create',
                meta: {
                  title: 'create',
                },
                component: () => import('@/views/form/RecipeForm.vue'),
              },
              {
                path: '/admin/babymeal/recipes/:id',
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
            path: '/admin/babymeal/ages',
            name: 'ages',
            meta: {
              title: 'babymeal.age',
              icon: 'mdi-baby',
            },
            component: () => import('@/views/age/list.vue'),
          },
          {
            path: '/admin/babymeal/ages',
            component: RouteWrapper,
            meta: {
              title: 'babymeal.age',
              hidden: true,
            },
            children: [
              {
                path: '/admin/babymeal/ages/create',
                name: 'age-create',
                meta: {
                  title: 'create',
                },
                component: () => import('@/views/age/update.vue'),
              },
              {
                path: '/admin/babymeal/ages/:id',
                name: 'age-edit',
                meta: {
                  title: 'edit',
                },
                component: () => import('@/views/age/update.vue'),
              },
            ],
          },
          //Dish
          {
            path: '/admin/babymeal/dishes',
            name: 'dishes',
            meta: {
              title: 'babymeal.dish',
              icon: 'mdi-silverware-fork-knife',
            },
            component: () => import('@/views/dish/list.vue'),
          },
          {
            path: '/admin/babymeal/dishes',
            component: RouteWrapper,
            meta: {
              title: 'babymeal.dish',
              hidden: true,
            },
            children: [
              {
                path: '/admin/babymeal/dishes/create',
                name: 'dish-create',
                meta: {
                  title: 'create',
                },
                component: () => import('@/views/dish/update.vue'),
              },
              {
                path: '/admin/babymeal/dishes/:id',
                name: 'dish-edit',
                meta: {
                  title: 'edit',
                },
                component: () => import('@/views/dish/update.vue'),
              },
            ],
          },
          //Ingredient
          {
            path: '/admin/babymeal/ingredients',
            name: 'ingredients',
            meta: {
              title: 'babymeal.ingredient',
              icon: 'mdi-corn',
            },
            component: () => import('@/views/ingredient/list.vue'),
          },
          {
            path: '/admin/babymeal/ingredients',
            component: RouteWrapper,
            meta: {
              title: 'babymeal.ingredient',
              hidden: true,
            },
            children: [
              {
                path: '/admin/babymeal/ingredients/create',
                name: 'ingredient-create',
                meta: {
                  title: 'create',
                },
                component: () => import('@/views/ingredient/update.vue'),
              },
              {
                path: '/admin/babymeal/ingredients/:id',
                name: 'ingredient-edit',
                meta: {
                  title: 'edit',
                },
                component: () => import('@/views/ingredient/update.vue'),
              },
            ],
          },
          //Unit
          {
            path: '/admin/babymeal/units',
            name: 'units',
            meta: {
              title: 'babymeal.unit',
              icon: 'mdi-ruler',
            },
            component: () => import('@/views/unit/list.vue'),
          },
          {
            path: '/admin/babymeal/units',
            component: RouteWrapper,
            meta: {
              title: 'babymeal.unit',
              hidden: true,
            },
            children: [
              {
                path: '/admin/babymeal/units/create',
                name: 'unit-create',
                meta: {
                  title: 'create',
                },
                component: () => import('@/views/unit/update.vue'),
              },
              {
                path: '/admin/babymeal/units/:id',
                name: 'unit-edit',
                meta: {
                  title: 'edit',
                },
                component: () => import('@/views/unit/update.vue'),
              },
            ],
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
      //Kanboard
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
