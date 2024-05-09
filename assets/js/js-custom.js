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

  removeClass(element, className) {
    element.classList.remove(className)
  }

  setCustomCss(element, customClass) {
    element.classList.add(customClass)
  }

  recreateChoiceButton(parentClasses) {
    parentClasses.forEach((parentClass, index) => {
      const buttonContainer = document.createElement('div');
      buttonContainer.classList.add('btn-container', parentClass);
      playerChoice.appendChild(buttonContainer);

      const button = document.createElement('button');
      button.classList.add('game-choice__option', `choice-${parentClass}`);
      button.setAttribute('value',`${parentClass}`)
      buttonContainer.appendChild(button)

      const text = document.createElement('p');
      buttonContainer.appendChild(text)
    });

  }

  createComputerChoice(element, classs) {
    const computerChoiceDisplay = document.createElement('div')
    computerChoiceDisplay.classList.add(`btn-container`, `${this.computer.choice}`)
    this.setCustomCss(computerChoiceDisplay, 'computer-choice')


    const btn = document.createElement('button')
    btn.classList.add('game-choice__option', `choice-${this.computer.choice}`)
    computerChoiceDisplay.appendChild(btn)

    const text = document.createElement('p')
    text.textContent = 'HOUSE PICKED'
    computerChoiceDisplay.appendChild(text)

    playerChoice.appendChild(computerChoiceDisplay)
  }

  createResultsDisplay(elements) {
    const choice = `${this.player.choice}-${this.computer.choice}`
    elements.forEach(element => {
      const display = document.createElement(element)
      result.appendChild(display)

      if (element === 'p') {
        if (this.player.choice === this.result[choice]) {
          display.textContent = 'You Win'
        } else if (this.player.choice === this.computer.choice) {
          display.textContent = 'Draw'
        } else {
          display.textContent = 'You Lose'
        }
      }

      if (element === 'button') {
        display.textContent = 'Play Again'
      }
    })
  }

  reinitializeResults() {
    this.createComputerChoice()
    this.createResultsDisplay(['p', 'button'])
  }

  initializeGameBoard() {
    this.removeChildrenEl(playerChoice)
    this.removeChildrenEl(result)

    this.setCustomCss(mainContainer, 'recreate')
    this.setCustomCss(triangleIcon, 'recreate')

    this.recreateChoiceButton(['scissors', 'paper', 'rock'])

    this.removeClass(mainContainer, 'animate-height')
    this.removeClass(triangleIcon, 'animate-opacity')

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
const btnContainer = document.querySelectorAll('.btn-container > p')//Handles Delegation


const handleClick = e => {
  if (e.target.tagName === 'BUTTON') {
    mainContainer.classList.add('animate-height')
    triangleIcon.classList.add('animate-opacity')
    e.target.parentElement.classList.add('movePlayerChoice')

    const childEl = Array.from(playerChoice.children)
    const siblings = childEl.filter(x => x != e.target.parentElement)

    siblings.forEach(sibling => {
      sibling.classList.add('moveOpponentChoice')
      e.target.parentElement.querySelector('p').textContent = 'YOU PICKED'

      setTimeout(() => {
        sibling.remove()
      }, 2000)
    })



    setTimeout(() => {
      result.classList.add('show-result')
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





