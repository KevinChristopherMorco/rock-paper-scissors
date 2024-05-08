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
    let currentScore = parseInt(displayPoint.textContent)
    playerChoice.removeEventListener('click', handleClick)

    //recreate button
    const aiChoiceEl = document.createElement('button')
    aiChoiceEl.classList.add('game-choice__option')
    aiChoiceEl.classList.add(`choice-${this.computer.choice}`)
    aiChoiceEl.style.cssText = 'top:0;left:60%'
    playerChoice.appendChild(aiChoiceEl)

    
    const recreateResultText = document.createElement('p')
    result.appendChild(recreateResultText)
    const recreateResultBtn = document.createElement('button')
    recreateResultBtn.textContent = 'Play Again'
    result.appendChild(recreateResultBtn)


    const choice = `${this.player.choice}-${this.computer.choice}`
    console.log(`Player Chooses:${this.player.choice}`)
    console.log(`AI  Chooses:${this.computer.choice}`)

    if (this.player.choice === this.result[choice]) {
      recreateResultText.textContent = 'You Win'
      currentScore += 1
      displayPoint.textContent = currentScore
    } else if (this.player.choice === this.computer.choice) {
      recreateResultText.textContent = 'Tied'
    } else {
      recreateResultText.textContent = 'You Lose'
    }
  }

  playAgain() {
    playerChoice.addEventListener('click', handleClick)

    let childLength = playerChoice.children.length
    for (let i = 0; i < childLength; i++) {
      playerChoice.removeChild(playerChoice.firstElementChild)
    }

    let resultLength = result.children.length
    for (let i = 0; i < resultLength; i++) {
      result.removeChild(result.firstElementChild)
    }

    mainContainer.style.cssText = 'height:55%'
    triangle.style.cssText = 'display:block'
    const reCreatePlayground = (customClass = null, property = null) => {
      // const btnClass = ['choice-scissors','choice-paper','choice-rock']
      const buttonEl = document.createElement('button')
      for(let j=0; j<customClass.length;j++){
        buttonEl.classList.add(customClass[j])
        buttonEl.setAttribute(property[0], property[1])

      }
      playerChoice.appendChild(buttonEl)
    }

    for (let i = 0; i < 3; i++) {
      const btnClass = ['choice-scissors','choice-paper','choice-rock']
      const btnVal = ['scissors','paper','rock']
      reCreatePlayground(['game-choice__option' , btnClass[i]], ['value',btnVal[i]])
    }

  }
}
const mainContainer = document.querySelector('.game-choice__container')
const triangle = document.querySelector('.game-choice__triangle-container')

const displayPoint = document.querySelector('.point__container > p:nth-of-type(2)')

const result = document.querySelector('.game__result-container')

const playerChoice = document.querySelector('.game-choice__option-container')//Handles Delegation


let player = new Player()
let computer = new Computer()
let game = new Game(player, computer)

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
}
playerChoice.addEventListener('click', handleClick)

result.addEventListener('click', (e) => {
  game.playAgain()
})





