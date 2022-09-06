export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxtjs/tailwindcss', 'nuxt-webfontloader'],
  /*
   ** Nuxt.js modules
   */
  modules: ['nuxt-i18n'],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  webfontloader: {
    google: {
      families: [
        'Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap'
      ]
    }
  },
  server: {
    port: 8000,
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: {
          welcome: 'Welcome',
          title: 'Rock Paper Scissors',
          subtitle: 'Using Brain.js Library, Artificial Intellegence',

          gameStart: 'Choose what to play',
          youWin: 'You Win',
          youLose: 'You Lose',
          draw: 'Draw',

          score: 'Score',
          human: 'You',
          ai: 'AI',
          rock: 'Rock',
          paper: 'Paper',
          scissors: 'Scissors',
          reset: 'Reset',
          gameCount: 'Game count',

          what: 'What is this?',
          thisIs:
            'This is a paper scissors rock game created using artificial intelligence.',
          thisGame:
            "This game can read the players' patterns to determine the next steps for 'AI' will take in order to win.",
          builtWith: 'Built with Nuxt JS & Tailwind CSS framework.',

          how: 'How to play',
          step1: 'You can start the game by selecting "rock", "scissors" or "paper".',
          step2: 'Choose continuously until you create a pattern.',
          step3: 'Examples of patterns:',
          pattern1: 'Rock, rock, rock, rock, etc.',
          pattern2: 'Rock, scissors, rock, scissors, etc.',
          pattern3: 'Rock, scissors, paper, rock, scissors, paper, etc.',
          pattern4: 'Paper, paper, paper, paper, etc.',
          step4: 'See that you will lose.',

          source: 'Source code',
          brainjs: 'Built with library',
          github: 'Get this code in'
        },
        
      }
    }
  }
}
