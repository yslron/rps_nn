<template>
  <div class="my-8">
    <div class="max-w-5xl mx-auto lg:flex lg:justify-evenly lg:items-start">
    <div class="flex flex-col items-center justify-center text-center lg:mt-10">
 
      <div class="p-4">
        <h1 class="text-3xl font-bold text-primary">{{ $t('title') }}</h1>
        <h2 class="text-base text-secondary">{{ $t('subtitle') }}</h2>
      </div>
      <div class="p-4">
        <h2 class="text-2xl font-semibold text-primary">
          {{ $t('score') }}
        </h2>
        <div class="flex items-center mt-4 items-row justify-evenly">
          <div class="w-1/2 border-r border-secondary">
            <p class="mt-4 text-xl text-secondary font-bold">{{ $t('human') }}</p>
            <p class="text-3xl text-primary">{{ scoreHuman }}</p>
            
            <p class="mt-4 text-secondary font-semibold" >{{ showChosenByHuman }}</p>
          </div>
          <div class="w-1/2">
            <p class="mt-4 text-xl text-secondary font-bold">{{ $t('ai') }}</p>
            <p class="text-3xl text-primary">{{ scoreAI }}</p>
    
            <p class="mt-4 text-secondary font-semibold">{{ showChosenByAI }}</p>
          </div>
        </div>
        <!--Choose what to play-->
        <div class="my-6 text-2xl font-bold">
          <p v-if="this.winner === 'human'" class="text-primary">
            {{ $t('youWin') }}
          </p>
          <p v-else-if="this.winner === 'AI'" class="text-error">
            {{ $t('youLose') }}
          </p>
          <p v-else-if="this.winner === 'draw'" class="text-secondary">
            {{ $t('draw') }}
          </p>
          <p v-else class="text-primary">{{ $t('gameStart') }}</p>
        </div>
        <!--3rd Section-->
        <div class="mt-4">
          <div class="flex flex-row items-center justify-center">
            <!-- Rock -->
            <button
              @click="humanInput(1)"
              class="w-24 px-4 py-2 m-2 text-secondary border-2 border-primary duration-500 bg-white rounded hover:bg-primary hover:text-white "
            >
              {{ $t('rock') }}
            </button>
            <!-- Paper -->
            <button
              @click="humanInput(2)"
              class="w-24 px-4 py-2 m-2 text-secondary border-2 border-primary duration-500 bg-white rounded hover:bg-primary hover:text-white "
            >
              {{ $t('paper') }}
            </button>
            <!-- Scissor -->
            <button
              @click="humanInput(3)"
              class="w-24 px-4 py-2 m-2 text-secondary border-2 border-primary duration-500 bg-white rounded hover:bg-primary hover:text-white "
            >
              {{ $t('scissors') }}
            </button>
          </div>
          <div>
            <button
              @click="resetScore"
              
              class="w-24 px-4 py-2 m-2 text-white bg-primary border rounded"
            >
              {{ $t('reset') }}
            </button>
          </div>
          <div class="mt-8">
            <p>{{ $t('gameCount') }}: {{ gameCount }}</p>
          </div>
        </div>
      </div>
    </div>

  </div>
  </div>
</template>

<script>
export default {
  head: {
    title: 'Rock Paper Scissors with AI',
    script: [{ src: '//unpkg.com/brain.js' }]
  },
  data() {
    return {
      pattern: [],
      scoreHuman: 0,
      scoreAI: 0,
      chosenByHuman: 0,
      chosenByAI: 0,
      winner: '', // human or AI or draw
      gameCount: 0,
      patternLength: 10
    }
  },
  computed: {
    showChosenByHuman() {
      return this.stringOf(this.chosenByHuman)
    },
    showChosenByAI() {
      return this.stringOf(this.chosenByAI)
    }
  },
  methods: {
    async humanInput(rockOrPaperOrScissors) {
      this.chosenByHuman = rockOrPaperOrScissors
      this.gameCount++
      await this.whatShouldAIAnswer()
      this.whoIsTheWinner()
    },
    prepareData() {
      if (this.pattern.length < 1) {
        for (let index = 1; index <= this.patternLength; index++) {
          this.pattern.push(Math.floor(Math.random() * 3) + 1)
        }
      }
    },
    updatePattern() {
      if (this.gameCount !== 0) {
        this.pattern.shift()
        this.pattern.push(this.chosenByHuman)
      }
    },
    async whatShouldAIAnswer() {
      this.prepareData()
      const net = new brain.recurrent.LSTMTimeStep()
      net.train([this.pattern], { iterations: 100, log: true })
      const humanWillChose = net.run(this.pattern)
      console.log(humanWillChose)
      this.updatePattern()

      const roundedHumanWillChose = Math.round(humanWillChose)
      console.log('human will chose: ' + roundedHumanWillChose)
      this.chosenByAI = 1 <= roundedHumanWillChose && roundedHumanWillChose <= 3 ? (roundedHumanWillChose % 3) + 1 : 1
    },
    whoIsTheWinner() {
      if (this.chosenByHuman === this.chosenByAI) {
        this.winner = 'draw'
      } else if (
        (this.chosenByHuman === 1 && this.chosenByAI === 3) ||
        (this.chosenByHuman === 3 && this.chosenByAI === 2) ||
        (this.chosenByHuman === 2 && this.chosenByAI === 1)
      ) {
        this.winner = 'human'
        this.scoreHuman++
      } else {
        this.winner = 'AI'
        this.scoreAI++
      }
    },
    resetScore() {
      this.pattern = []
      this.scoreHuman = 0
      this.scoreAI = 0
      this.chosenByHuman = 0
      this.chosenByAI = 0
      this.winner = ''
      this.gameCount = 0
    },
    stringOf(integer) {
      switch (integer) {
        case 1:
          return this.$t('rock')
        case 2:
          return this.$t('paper')
        case 3:
          return this.$t('scissors')

        default:
          return ''
      }
    }
  }
}
</script>
