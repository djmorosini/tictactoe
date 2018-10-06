let turn = 'x'
let continueGame = true
let numberOfPlayers
let whichPlayer = 'first'
let firstPlayerSymbol = 'x'
let secondPlayerSymbol = 'o'

let firstCell
let secondCell
let opposite
let xWins = 0
let oWins = 0
let ties = 0
let aiGame = 1

// 🧙 🎃 👻 🧛🏻‍

var delay = (function () {
  var timer = 0;
  return function (callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();

function setupGame(players) {
  let title = document.getElementById('title')
  turn = 'x'
  continueGame = true

  let cells = document.getElementsByClassName('box')
  for (let cell of cells) {
    cell.textContent = ''
  }

  if (players === 'one') {
    numberOfPlayers = players
    title.innerHTML = '<h1>Single player</h1>'
  } else if (players === 'zero') {
    numberOfPlayers = players
    title.innerHTML = '<h1>AI Battle!</h1>'
    console.log('Game ' + aiGame + ':')
    firstCell = getRandomInt(9)
    createSecondCell()
    if (getRandomInt(2) === 1) {
      turn = 'o'
    }
    console.log(turn + ' goes first.')
  } else {
    numberOfPlayers = players
    title.innerHTML = '<h1>Two player</h1>'
  }
  playGame()
}

function createSecondCell() {
  secondCell = getRandomInt(9)
  if (firstCell === secondCell) {
    createSecondCell()
  }
}

function setPlayer(symbol) {
  let playerSymbol = document.getElementById('playerSymbol')
  let nextPlayer = 'second'
  playerSymbol.innerHTML = whichPlayer + ' symbol is ' + symbol
  if (symbol === 'witch') {
    if (whichPlayer === 'first') {
      firstPlayerSymbol = '🧙'
    } else {
      secondPlayerSymbol = '🧙'
    }
  } else if (symbol === 'pumpkin') {
    if (whichPlayer === 'first') {
      firstPlayerSymbol = '🎃'
    } else {
      secondPlayerSymbol = '🎃'
    }
  } else if (symbol === 'ghost') {
    if (whichPlayer === 'first') {
      firstPlayerSymbol = '👻'
    } else {
      secondPlayerSymbol = '👻'
    }
  } else if (symbol === 'vampire') {
    if (whichPlayer === 'first') {
      firstPlayerSymbol = '🧛🏻‍'
    } else {
      secondPlayerSymbol = '🧛🏻‍'
    }
  }
  if (whichPlayer != nextPlayer) {
    whichPlayer = nextPlayer
  } else {
    whichPlayer = 'first'
  }
}

function playGame() {
  let output = document.getElementById('output')
  if (turn === 'x') {
    output.innerHTML = '<p>Ready Player X</p>'
  } else {
    if (numberOfPlayers === 'one') {
      computerTurn()
    } else {
      output.innerHTML = '<p>Ready Player O</p>'
    }
  }
  if (numberOfPlayers === 'zero') {
    delay(function () {
      computerTurn()
    }, 500);
  }
}

function handleClick(cellID) {
  if (continueGame) {
    let square = document.getElementById(cellID)
    console.log('turn: ' + turn + '. Cell ID: ' + cellID)
    placeSymbol(square)
  }
}

function placeSymbol(square) {
  let output = document.getElementById('output')
  if (square.innerHTML != '') {
    output.innerHTML = '<p>Impossible! That cell is already full.</p>'
  } else if (numberOfPlayers === 'zero') {
    if (turn === 'x') {
      square.textContent = 'x'
    } else {
      square.textContent = 'o'
    }
    checkBoard()
  } else {
    if (turn === 'x') {
      square.textContent = firstPlayerSymbol
      if (firstPlayerSymbol === '🧙') {
        let witch = new Audio("sounds/witchCackle.mp3")
        witch.play()
      } else if (firstPlayerSymbol === '🎃') {
        let pumpkin = new Audio("sounds/pumkinLaugh.mp3")
        pumpkin.play()
      } else if (firstPlayerSymbol === '👻') {
        let ghost = new Audio("sounds/ghostSound.mp3")
        ghost.play()
      } else if (firstPlayerSymbol === '🧛🏻‍‍') {
        let vampire = new Audio("sounds/vampireSound.mp3")
        vampire.play()
      }

    } else {
      square.textContent = secondPlayerSymbol
      if (secondPlayerSymbol === '🧙') {
        let witch = new Audio("sounds/witchCackle.mp3")
        witch.play()
      } else if (secondPlayerSymbol === '🎃') {
        let pumpkin = new Audio("sounds/pumkinLaugh.mp3")
        pumpkin.play()
      } else if (secondPlayerSymbol === '👻') {
        let ghost = new Audio("sounds/ghostSound.mp3")
        ghost.play()
      } else if (secondPlayerSymbol === '🧛🏻‍') {
        let vampire = new Audio("sounds/vampireSound.mp3")
        vampire.play()
      }
    }
    checkBoard()
  }
}

function checkBoard() {
  if (numberOfPlayers === 'zero') {
    checkWinConditions('x')
    checkWinConditions('o')
  } else {
    checkWinConditions(firstPlayerSymbol)
    checkWinConditions(secondPlayerSymbol)
  }
  let boxes = document.getElementsByClassName('box')
  let availableMoves = []
  for (let box of boxes) {
    if (box.innerHTML === '') {
      availableMoves.push(box.id)
    }
  }
  if (continueGame && availableMoves.length === 0) {
    output.innerHTML = '<p>Tie game!</p>'
    continueGame = false
    if (numberOfPlayers === 'zero') {
      ties = ties + 1
      console.log('Ties: ' + ties)
      delay(function () {
        aiGame = aiGame + 1
        setupGame('zero')
      }, 1000);
    }
  } else if (continueGame) {
    changeTurn()
    playGame()
  } else {
    output.innerHTML += "<p>Game over!</p>"
    if (numberOfPlayers === 'zero') {
      delay(function () {
        aiGame = aiGame + 1
        setupGame('zero')
      }, 1000);
    }
  }
}

function changeTurn() {
  if (turn === 'x') {
    turn = 'o'
  } else {
    turn = 'x'
  }
}

function checkWinConditions(symbol) {
  let one = document.getElementById('cell-1').innerHTML
  let two = document.getElementById('cell-2').innerHTML
  let three = document.getElementById('cell-3').innerHTML
  let four = document.getElementById('cell-4').innerHTML
  let five = document.getElementById('cell-5').innerHTML
  let six = document.getElementById('cell-6').innerHTML
  let seven = document.getElementById('cell-7').innerHTML
  let eight = document.getElementById('cell-8').innerHTML
  let nine = document.getElementById('cell-9').innerHTML
  let output = document.getElementById('output')

  if (
    [one, two, three].join('') === (symbol.repeat(3)) ||
    [one, four, seven].join('') === (symbol.repeat(3)) ||
    [one, five, nine].join('') === (symbol.repeat(3)) ||
    [two, five, eight].join('') === (symbol.repeat(3)) ||
    [three, five, seven].join('') === (symbol.repeat(3)) ||
    [three, six, nine].join('') === (symbol.repeat(3)) ||
    [four, five, six].join('') === (symbol.repeat(3)) ||
    [seven, eight, nine].join('') === (symbol.repeat(3))
  ) {
    output.innerHTML = `<p>${symbol.toUpperCase()} wins!</p>`
    continueGame = false
    if (numberOfPlayers === 'zero') {
      giveWin(symbol)
    }
  }
}

function giveWin(symbol) {
  if (symbol === 'x') {
    xWins = xWins + 1
    console.log('X wins: ' + xWins)
  } else {
    oWins = oWins + 1
    console.log('O wins:' + oWins)
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max) + 1);
}

function computerTurn() {

  if (turn === 'x') {
    opposite = 'o'
  } else {
    opposite = 'x'
  }

  if (numberOfPlayers === 'zero') {
    lookForBlockOrWin(turn + turn)
    lookForBlockOrWin(opposite + opposite)
  } else {
    lookForBlockOrWin(firstPlayerSymbol + firstPlayerSymbol)
    lookForBlockOrWin(secondPlayerSymbol + secondPlayerSymbol)
  }

  let one = document.getElementById('cell-1').innerHTML
  let two = document.getElementById('cell-2').innerHTML
  let three = document.getElementById('cell-3').innerHTML
  let four = document.getElementById('cell-4').innerHTML
  let five = document.getElementById('cell-5').innerHTML
  let six = document.getElementById('cell-6').innerHTML
  let seven = document.getElementById('cell-7').innerHTML
  let eight = document.getElementById('cell-8').innerHTML
  let nine = document.getElementById('cell-9').innerHTML

  if (numberOfPlayers === 'zero') {
    let firstMove = document.getElementById(`cell-${firstCell}`).innerHTML
    let secondMove = document.getElementById(`cell-${secondCell}`).innerHTML
    if (turn != opposite && firstMove === '') {
      handleClick(`cell-${firstCell}`)
    } else if (turn != opposite && secondMove === '') {
      handleClick(`cell-${secondCell}`)
    } else if (turn != opposite && five === '') {
      handleClick('cell-5')
    } else if (turn != opposite && (five === opposite || five === turn) && one === '') {
      handleClick('cell-1')
    } else if (turn != opposite && (one === opposite && eight === opposite || five === opposite && nine === opposite || four === opposite && eight === opposite) && seven === '') {
      handleClick('cell-7')
    } else if (turn != opposite && (six === opposite && eight === opposite || three === opposite && eight === opposite) && nine === '') {
      handleClick('cell-9')
    } else if (turn != opposite && (two === opposite && four === opposite || two === opposite && six === opposite || six === opposite && eight === opposite) && three === '') {
      handleClick('cell-3')
    } else if (turn != opposite && two === '') {
      handleClick('cell-2')
    } else if (turn != opposite && four === '') {
      handleClick('cell-4')
    } else if (turn != opposite && six === '') {
      handleClick('cell-6')
    } else if (turn != opposite && eight === '') {
      handleClick('cell-8')
    } else if (turn != opposite && nine === '') {
      handleClick('cell-9')
    } else if (turn != opposite && seven === '') {
      handleClick('cell-7')
    }
  } else {

    if (turn === 'o' && five === '') {
      handleClick('cell-5')
    } else if (turn === 'o' && five === 'x' && one === '') {
      handleClick('cell-1')
    } else if (turn === 'o' && (one === 'x' && eight === 'x' || five === 'x' && nine === 'x' || four === 'x' && eight === 'x') && seven === '') {
      handleClick('cell-7')
    } else if (turn === 'o' && (six === 'x' && eight === 'x' || three === 'x' && eight === 'x') && nine === '') {
      handleClick('cell-9')
    } else if (turn === 'o' && (two === 'x' && four === 'x' || two === 'x' && six === 'x' || six === 'x' && eight === 'x') && three === '') {
      handleClick('cell-3')
    } else if (turn === 'o' && two === '') {
      handleClick('cell-2')
    } else if (turn === 'o' && four === '') {
      handleClick('cell-4')
    } else if (turn === 'o' && six === '') {
      handleClick('cell-6')
    } else if (turn === 'o' && eight === '') {
      handleClick('cell-8')
    }
  }
}

function lookForBlockOrWin(symbol) {
  let one = document.getElementById('cell-1').innerHTML
  let two = document.getElementById('cell-2').innerHTML
  let three = document.getElementById('cell-3').innerHTML
  let four = document.getElementById('cell-4').innerHTML
  let five = document.getElementById('cell-5').innerHTML
  let six = document.getElementById('cell-6').innerHTML
  let seven = document.getElementById('cell-7').innerHTML
  let eight = document.getElementById('cell-8').innerHTML
  let nine = document.getElementById('cell-9').innerHTML

  if (turn != opposite && ([two, three].join('') === symbol || [four, seven].join('') === symbol || [five, nine].join('') === symbol) && one === '') {
    handleClick('cell-1')
  } else if (turn != opposite && ([one, two].join('') === symbol || [seven, five].join('') === symbol || [nine, six].join('') === symbol) && three === '') {
    handleClick('cell-3')
  } else if (turn != opposite && ([one, four].join('') === symbol || [three, five].join('') === symbol || [nine, eight].join('') === symbol) && seven === '') {
    handleClick('cell-7')
  } else if (turn != opposite && ([one, five].join('') === symbol || [three, six].join('') === symbol || [seven, eight].join('') === symbol) && nine === '') {
    handleClick('cell-9')
  } else if (turn != opposite && ([one, three].join('') === symbol || [eight, five].join('') === symbol) && two === '') {
    handleClick('cell-2')
  } else if (turn != opposite && ([five, six].join('') === symbol || [one, seven].join('') === symbol) && four === '') {
    handleClick('cell-4')
  } else if (turn != opposite && ([three, nine].join('') === symbol || [four, five].join('') === symbol) && six === '') {
    handleClick('cell-6')
  } else if (turn != opposite && ([seven, nine].join('') === symbol || [two, five].join('') === symbol) && eight === '') {
    handleClick('cell-8')
  }
}