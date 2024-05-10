class Player {
  constructor() {
    this.choice
  }

  chooseMove(e) {
    if (e.target.tagName === 'BUTTON') {
      const playerChoiceContainer = e.target.value
      this.choice = playerChoiceContainer
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
    let currentScore = parseInt(pointDisplay.textContent)
    const choice = `${this.player.choice}-${this.computer.choice}`

    if (this.player.choice === this.result[choice]) {
      currentScore += 1
      pointDisplay.textContent = currentScore
    }
    playerChoiceContainer.removeEventListener('click', handleClick)
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

  recreateChoiceButton(parentClasses,childClasses) {
    parentClasses.forEach((parentClass,index) => {
      const buttonContainer = document.createElement('div');
      buttonContainer.classList.add('btn-container', parentClass);
      playerChoiceContainer.appendChild(buttonContainer);

      const button = document.createElement('button');
      button.classList.add('game-choice__option', `choice-${childClasses[index]}`);
      button.setAttribute('value',`${childClasses[index]}`)
      buttonContainer.appendChild(button)

      const text = document.createElement('p');
      buttonContainer.appendChild(text)
    });

  }

  createComputerChoice(element, classes) {
    const computerChoiceContainer = document.createElement('div')
    computerChoiceContainer.classList.add(`btn-container`, `${this.computer.choice}`)
    this.setCustomCss(computerChoiceContainer, 'computer-choice')

    const buttonChoice = document.createElement('button')
    buttonChoice.classList.add('game-choice__option', `choice-${this.computer.choice}`)
    computerChoiceContainer.appendChild(buttonChoice)

    const text = document.createElement('p')
    text.textContent = 'HOUSE PICKED'
    computerChoiceContainer.appendChild(text)

    playerChoiceContainer.appendChild(computerChoiceContainer)
  }

  createResultsDisplay(elements) {
    const choice = `${this.player.choice}-${this.computer.choice}`
    elements.forEach(element => {
      const display = document.createElement(element)
      gameResultContainer.appendChild(display)

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
    this.removeChildrenEl(playerChoiceContainer)
    this.removeChildrenEl(gameResultContainer)

    this.setCustomCss(gameChoiceContainer, 'recreate')
    this.setCustomCss(gameTriangleIcon, 'recreate')

    this.recreateChoiceButton(['scissor-container', 'paper-container', 'rock-container'],['scissors', 'paper', 'rock'])

    this.removeClass(gameChoiceContainer, 'animate-height')
    this.removeClass(gameTriangleIcon, 'animate-opacity')

    playerChoiceContainer.addEventListener('click', handleClick)
  }
}

let player = new Player()
let computer = new Computer()
let game = new Game(player, computer)
let render = new Renderer(player, computer)


const gameChoiceContainer = document.querySelector('.game-choice__main-container')
const gameTriangleIcon = document.querySelector('.game-choice__triangle-container')
const pointDisplay = document.querySelector('.point__container > p:nth-of-type(2)')
const gameResultContainer = document.querySelector('.game__result-container')
const playerChoiceContainer = document.querySelector('.game-choice__option-container')


const handleClick = e => {
  if (e.target.tagName === 'BUTTON') {
    gameChoiceContainer.classList.add('animate-height')
    gameTriangleIcon.classList.add('animate-opacity')
    e.target.parentElement.classList.add('movePlayerChoice')

    const buttonContainers = Array.from(playerChoiceContainer.children)
    const buttonSiblings = buttonContainers.filter(x => x != e.target.parentElement)

    buttonSiblings.forEach(sibling => {
      sibling.classList.add('moveOpponentChoice')
      e.target.parentElement.querySelector('p').textContent = 'YOU PICKED'
      setTimeout(() => {
        sibling.remove()
      }, 2000)
    })

    setTimeout(() => {
      gameResultContainer.classList.add('show-result')
      game.announceWinner()
      render.reinitializeResults()

    }, 1500)

    player.chooseMove(e)
    computer.randomMove()
  }
}
playerChoiceContainer.addEventListener('click', handleClick)

gameResultContainer.addEventListener('click', (e) => {
  render.initializeGameBoard()
})





