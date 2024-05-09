class Player {
  constructor() {
    this.choice
  }

  chooseMove(e) {
    if (e.target.tagName === 'BUTTON') {
      const playerChoice = e.target.value
      this.choice = playerChoice
    }
  }
}

class Computer {
  constructor() {
    this.choice
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
    let currentScore = parseInt(displayPoint.textContent)
    const choice = `${this.player.choice}-${this.computer.choice}`

    if (this.player.choice === this.result[choice]) {
      currentScore += 1
      displayPoint.textContent = currentScore
    }
    playerChoice.removeEventListener('click', handleClick)
  }
}

class Renderer {
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

  removeChildrenEl(parentElement) {
    while (parentElement.firstChild) {
      parentElement.removeChild(parentElement.firstChild)
    }
  }

  setCustomCss(element, customClass) {
    element.classList.add(customClass)
  }

  recreateChoiceButton(defaultClass, customClass, property) {
    customClass.forEach((customClassEl, index) => {
      const buttonEl = document.createElement('button')
      buttonEl.classList.add(defaultClass)
      buttonEl.classList.add(customClassEl)
      buttonEl.setAttribute('value', property[index])
      playerChoice.appendChild(buttonEl)
    })
  }

  createComputerChoice(defaultClass, choice) {
    const computerChoiceDisplay = document.createElement('button')
    computerChoiceDisplay.classList.add(defaultClass)
    computerChoiceDisplay.classList.add(choice)
    this.setCustomCss(computerChoiceDisplay, 'computer-choice')
    mainContainer.appendChild(computerChoiceDisplay)
  }

  createResultsDisplay(elements) {
    const choice = `${this.player.choice}-${this.computer.choice}`

    elements.forEach(element => {
      const display = document.createElement(element)
      result.appendChild(display)

      if(element === 'p'){
        if (this.player.choice === this.result[choice]) {
          display.textContent = 'You Win'
        } else if (this.player.choice === this.computer.choice) {
          display.textContent = 'Tied'
        } else {
          display.textContent = 'You Lose'
        }
      } 
      
      if(element === 'button'){
        display.textContent = 'Play Again'
      }
    })
  }

  reinitializeResults() {
    this.createComputerChoice('game-choice__option', `choice-${this.computer.choice}`)
    this.createResultsDisplay(['p','button'])
  }

  initializeGameBoard() {
    this.removeChildrenEl(playerChoice)
    this.removeChildrenEl(result)

    this.setCustomCss(mainContainer, 'recreate')
    this.setCustomCss(triangleIcon, 'recreate')

    this.recreateChoiceButton('game-choice__option', ['choice-scissors', 'choice-paper', 'choice-rock'], ['scissors', 'paper', 'rock'])

    playerChoice.addEventListener('click', handleClick)
  }
}

let player = new Player()
let computer = new Computer()
let game = new Game(player, computer)
let render = new Renderer(player, computer)


const mainContainer = document.querySelector('.game-choice__main-container')
const triangleIcon = document.querySelector('.game-choice__triangle-container')

const displayPoint = document.querySelector('.point__container > p:nth-of-type(2)')

const result = document.querySelector('.game__result-container')//Handles Delegation

const playerChoice = document.querySelector('.game-choice__option-container')//Handles Delegation


const handleClick = (e) => {
  if (e.target.tagName === 'BUTTON') {
    const childEl = Array.from(playerChoice.children)
    const siblingEl = childEl.filter(x => x != e.target)

    siblingEl.forEach((x, i) => {
      x.style.cssText = 'animation:moveOpponentChoice 1s forwards ease-in-out'
      setTimeout(() => {
        x.remove()
      }, 2000)
    })
    mainContainer.classList.add('adjust-height-animation')
    triangleIcon.classList.add('hide')
    e.target.classList.add('movePlayerChoice')


    setTimeout(() => {
      result.style.cssText = 'display:flex;animation:show 1.5s forwards ease-in-out'
      game.announceWinner()
      render.reinitializeResults()

    }, 1500)

    player.chooseMove(e)
    computer.randomMove()
  }
}
playerChoice.addEventListener('click', handleClick)

result.addEventListener('click', (e) => {
  render.initializeGameBoard()
})





