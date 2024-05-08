class Player {
  constructor(choice) {
    this.choice = choice
  }

  chooseMove(e) {
    if (e.target.tagName === 'BUTTON') {
      const playerChoice = e.target.classList[1]
      this.choice = playerChoice
    }


  }
}

class Computer {
  constructor(choice) {
    this.choice = choice
  }
  randomMove() {
    const moveChoice = ['rock', 'paper', 'scissors']
    let randomIndex = Math.floor(Math.random() * 3)
    this.choice = moveChoice[randomIndex]
  }
}

class Game {
  constructor(player, computer) {
    this.player = player
    this.computer = computer
    this.result =
    {
      "rock-paper": "paper",
      "rock-scissors": "rock",
      "paper-rock": "paper",
      "paper-scissors": "scissors",
      "scissors-rock": "rock",
      "scissors-paper": "scissors",
    }
  }

  incrementPoint() {



    if (this.player.choice === this.computer.choice) {
      return
    }

    const choice = `${this.player.choice}-${this.computer.choice}`

    if (this.player.choice === this.result[choice]) {
      let currentScore = parseInt(point.textContent)
      currentScore += 1
      point.textContent = currentScore
    }

  }

  announceWinner() {
    const choice = `${this.player.choice}-${this.computer.choice}`
    console.log(`Player chooses ${this.player.choice}`)
    console.log(`AI chooses ${this.computer.choice}`)

    if (this.player.choice === this.computer.choice) {
      console.log('Tied')
      return
    }

    if (this.player.choice === this.result[choice]) {
      console.log('You win :D')
    } else {
      console.log('AI win :D')

    }

  }

  playAgain() {
    point.textContent = 0
  }
}
const mainContainer = document.querySelector('.game-choice__container')
const btnChoice = document.querySelector('.game-choice__option-container')
const buttons = document.querySelectorAll('.game-choice__option-container > .game-choice__option')
const triangle = document.querySelector('.game-choice__triangle-container')
const result = document.querySelector('.game__result-contaniner')

const point = document.querySelector('.point__container > p:nth-of-type(2)')

let player = new Player()
let computer = new Computer()
let game = new Game(player, computer)

btnChoice.addEventListener('click', (e) => {

  if (e.target.tagName === 'BUTTON') {
    buttons.forEach(x => {
      x.style.cssText = 'animation:moveOpponentChoice 1s forwards ease-in-out'
    })
    mainContainer.style.cssText = 'animation:adjustHeight 1s forwards ease-in-out'
    triangle.style.cssText = 'animation:hide 1s forwards ease-in-out'
    e.target.style.cssText = 'opacity:1; animation:moveChoice 1s forwards'



    setTimeout(() => {
      result.style.cssText = 'display:flex;animation:show 2s forwards ease-in-out'
    },2000)

    player.chooseMove(e)
    computer.randomMove()
    game.incrementPoint()
    game.announceWinner()
  }

})





