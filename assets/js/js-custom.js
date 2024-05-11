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
    playerChoiceContainer.removeEventListener('click', handlePlayerClick)
    ruleContainer.removeEventListener('click', handleRuleClick)
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

  removeChildrenEl(elements) {
    elements.forEach(element => {
      while (element.firstChild) {
        element.removeChild(element.firstChild)
      }
    })
  }

  removeClass(elements, className) {
    elements.forEach(element => {
      element.classList.remove(className)
    })
  }

  setCssClass(elements, customClasses) {
    elements.forEach(element => {
      element.classList.add(customClasses)
    })
  }

  recreateChoiceButton(defaultClasses, customClasses, values) {

    for (let i = 0; i < 3; i++) {
      const btnContainerEl = document.createElement('div');
      const btnEl = document.createElement('button');
      const text = document.createElement('p');

      const [btnContainerDefault, btnDefault] = defaultClasses;
      const [btnContainerCustom, btnCustom] = customClasses;

      btnContainerEl.classList.add(btnContainerDefault, btnContainerCustom[i]);
      btnEl.classList.add(btnDefault, btnCustom[i]);
      btnEl.setAttribute('value', `${values[i]}`)

      playerChoiceContainer.appendChild(btnContainerEl);
      btnContainerEl.appendChild(btnEl);
      btnContainerEl.appendChild(text)
    }
  }

  createComputerChoice(defaultClasses) {
    const computerChoiceContainer = document.createElement('div')
    const buttonChoice = document.createElement('button')

    this.setCssClass([computerChoiceContainer,buttonChoice], 'computer-choice')
    
    const [btnContainerDefault, btnDefault] = defaultClasses;
    for(let i=0;i<defaultClasses.length;i++){
      this.setCssClass([computerChoiceContainer], btnContainerDefault[i])
      this.setCssClass([buttonChoice], btnDefault[i])
    }

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
    this.createComputerChoice([['btn-container', `${this.computer.choice}`], ['game-choice__option', `choice-${this.computer.choice}`]])
    this.createResultsDisplay(['p', 'button'])
  }

  initializeGameBoard() {
    this.removeChildrenEl([playerChoiceContainer, gameResultContainer])
    this.setCssClass([gameChoiceContainer, gameTriangleIcon], 'recreate')

    this.recreateChoiceButton([['btn-container'], ['game-choice__option']], [['scissor-container', 'paper-container', 'rock-container'], ['choice-scissors', 'choice-paper', 'choice-rock']], ['scissors', 'paper', 'rock'])

    this.removeClass([gameTriangleIcon, ruleContainer], 'animate-opacity')
    this.removeClass([gameChoiceContainer], 'animate-height')

    playerChoiceContainer.addEventListener('click', handlePlayerClick)
    ruleContainer.addEventListener('click', handleRuleClick)

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
const ruleContainer = document.querySelector('.game__rules-container')
const overlay = document.querySelector('.game-rule__overlay-container')
const overlayClose = document.querySelector('.game-rule__overlay-container .game-rule__icon ')

const handlePlayerClick = e => {
  if (e.target.tagName === 'BUTTON') {
    render.setCssClass([gameTriangleIcon, ruleContainer], 'animate-opacity')
    render.setCssClass([gameChoiceContainer], 'animate-height')
    render.setCssClass([e.target.parentElement], 'movePlayerChoice')

    const buttonContainers = Array.from(playerChoiceContainer.children)
    const buttonSiblings = buttonContainers.filter(x => x != e.target.parentElement)

    buttonSiblings.forEach(sibling => {
      render.setCssClass([sibling], 'moveOpponentChoice')

      e.target.parentElement.querySelector('p').textContent = 'YOU PICKED'
      setTimeout(() => {
        sibling.remove()
      }, 2000)
    })

    setTimeout(() => {
      render.setCssClass([gameResultContainer], 'show-result')
      game.announceWinner()
      render.reinitializeResults()

    }, 1500)

    player.chooseMove(e)
    computer.randomMove()
  }
}
playerChoiceContainer.addEventListener('click', handlePlayerClick)

const handlePlayAgainClick = () => {
  render.initializeGameBoard()
}

gameResultContainer.addEventListener('click', handlePlayAgainClick)

const handleRuleClick = () => {
  overlay.classList.add('show')
}

ruleContainer.addEventListener('click', handleRuleClick)

const handleCloseRule = () => {
  overlay.classList.remove('show')
}

overlayClose.addEventListener('click', handleCloseRule)




