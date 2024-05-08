class Player {
  constructor(choice) {
    this.choice = choice
  }

  chooseMove(e) {
    if (e.target.tagName === 'BUTTON') {
      const playerChoice = e.target.value
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

  announceWinner() {
    const choice = `${this.player.choice}-${this.computer.choice}`
    console.log(`Player chooses ${this.player.choice}`)
    console.log(`AI chooses ${this.computer.choice}`)

    const aiChoiceEl = document.createElement('button')
    aiChoiceEl.classList.add('game-choice__option')
    aiChoiceEl.classList.add(`choice-${this.computer.choice}`)
    aiChoiceEl.style.cssText = 'top:0;left:60%'
    btnChoice.appendChild(aiChoiceEl)


    if (this.player.choice === this.result[choice]) {
      displayResult.textContent = 'You Win'
    }else if(this.player.choice === this.computer.choice){
      displayResult.textContent = 'Tied'
    }else{
      displayResult.textContent = 'You Lose'

    }

    if (this.player.choice === this.result[choice]) {
      let currentScore = parseInt(displayPoint.textContent)
      currentScore += 1
      displayPoint.textContent = currentScore
    }


  }

  playAgain() {
    displayPoint.textContent = 0
  }
}
const mainContainer = document.querySelector('.game-choice__container')
const btnChoice = document.querySelector('.game-choice__option-container')
// const buttons = document.querySelectorAll('.game-choice__option-container > .game-choice__option')
const triangle = document.querySelector('.game-choice__triangle-container')
const result = document.querySelector('.game__result-container')

const displayPoint = document.querySelector('.point__container > p:nth-of-type(2)')
const displayResult = document.querySelector('.game__result-container > p:nth-of-type(1)')

let player = new Player()
let computer = new Computer()
let game = new Game(player, computer)

btnChoice.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const childEl = Array.from(btnChoice.children)
    const siblingEl = childEl.filter(x => x != e.target)

    console.log(siblingEl)
  

    siblingEl.forEach((x,i) => {
      x.style.cssText = 'animation:moveOpponentChoice 1s forwards ease-in-out'
      setTimeout(() => {
       x.remove()
      }, 2000)
    })
    mainContainer.style.cssText = 'animation:adjustHeight 1s forwards ease-in-out'
    triangle.style.cssText = 'animation:hide 1s forwards ease-in-out'
    e.target.style.cssText = 'opacity:1; animation:moveChoice 1s forwards'

    setTimeout(() => {
      result.style.cssText = 'display:flex;animation:show 2s forwards ease-in-out'
 
      game.announceWinner()
    }, 2000)

    player.chooseMove(e)
    computer.randomMove()
  }

})





