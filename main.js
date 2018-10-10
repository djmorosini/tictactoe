let turn = 'x'
let continueGame = false
let numberOfPlayers
let whichPlayer = 'first'
let firstPlayerSymbol = 'x'
let secondPlayerSymbol = 'o'

let firstCell
let secondCell
let oppositeTurn
let xWins = 0
let oWins = 0
let ties = 0
let aiGame = 1

// 🧟 🎃 👻 🧛🏻‍

function setupGame(players) {
  let title = document.getElementById('title')
  let endGameButton = document.getElementById('end-game')
  let winningLine = document.getElementById('winning-line')

  turn = 'x'
  continueGame = true
  winningLine.innerHTML = ''
  endGameButton.disabled = false

  let cells = document.getElementsByClassName('box')
  for (let cell of cells) {
    cell.textContent = ''
  }

  if (players === 'one') {
    numberOfPlayers = players
    title.innerHTML = '<h1>PvE</h1>'
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
    title.innerHTML = '<h1>PvP</h1>'
  }
  playGame()
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max) + 1);
}

function createSecondCell() {
  secondCell = getRandomInt(9)
  if (firstCell === secondCell) {
    createSecondCell()
  }
}

var delay = (function () {
  var timer = 0;
  return function (callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();

function playGame() {
  let output = document.getElementById('output')
  if (turn === 'x') {
    output.innerHTML = `<p>Ready Player ${firstPlayerSymbol.toUpperCase()}</p>`
  } else {
    if (numberOfPlayers === 'one') {
      computerTurn()
    } else {
      output.innerHTML = `<p>Ready Player ${secondPlayerSymbol.toUpperCase()}</p>`
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
    output.innerHTML = '<p>Space full!</p>'
  } else {
    if (turn === 'x') {
      square.textContent = firstPlayerSymbol
      if (firstPlayerSymbol === '🧟' && numberOfPlayers != 'zero') {
        let zombie = new Audio("sounds/zombieSound.mp3")
        zombie.play()
      } else if (firstPlayerSymbol === '🎃' && numberOfPlayers != 'zero') {
        let pumpkin = new Audio("sounds/witchCackle.mp3")
        pumpkin.play()
      } else if (firstPlayerSymbol === '👻' && numberOfPlayers != 'zero') {
        let ghost = new Audio("sounds/ghostSound.mp3")
        ghost.play()
      } else if (firstPlayerSymbol === '🧛🏻‍‍' && numberOfPlayers != 'zero') {
        let vampire = new Audio("sounds/vampireSound.mp3")
        vampire.play()
      }
    } else {
      square.textContent = secondPlayerSymbol
      if (secondPlayerSymbol === '🧟' && numberOfPlayers != 'zero') {
        let zombie = new Audio("sounds/zombieSound.mp3")
        zombie.play()
      } else if (secondPlayerSymbol === '🎃' && numberOfPlayers != 'zero') {
        let pumpkin = new Audio("sounds/witchCackle.mp3")
        pumpkin.play()
      } else if (secondPlayerSymbol === '👻' && numberOfPlayers != 'zero') {
        let ghost = new Audio("sounds/ghostSound.mp3")
        ghost.play()
      } else if (secondPlayerSymbol === '🧛🏻‍' && numberOfPlayers != 'zero') {
        let vampire = new Audio("sounds/vampireSound.mp3")
        vampire.play()
      }
    }
    checkBoard()
  }
}

function checkBoard() {
  checkWinConditions(firstPlayerSymbol)
  checkWinConditions(secondPlayerSymbol)

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
      }, 1500);
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
    let endGameButton = document.getElementById('end-game')
    endGameButton.disabled = true

    let winningLine = document.getElementById('winning-line')
    if ([one, two, three].join('') === (symbol.repeat(3))) {
      winningLine.innerHTML = "<div id='top-row' class='line-div'></div>"
    } else if ([one, four, seven].join('') === (symbol.repeat(3))) {
      winningLine.innerHTML = "<div id='col-one' class='line-div'></div>"
    } else if ([one, five, nine].join('') === (symbol.repeat(3))) {
      winningLine.innerHTML = "<div id='main-diag' class='line-div'></div>"
    } else if ([two, five, eight].join('') === (symbol.repeat(3))) {
      winningLine.innerHTML = "<div id='col-two' class='line-div'></div>"
    } else if ([three, five, seven].join('') === (symbol.repeat(3))) {
      winningLine.innerHTML = "<div id='skew-diag' class='line-div'></div>"
    } else if ([three, six, nine].join('') === (symbol.repeat(3))) {
      winningLine.innerHTML = "<div id='col-three' class='line-div'></div>"
    } else if ([four, five, six].join('') === (symbol.repeat(3))) {
      winningLine.innerHTML = "<div id='mid-row' class='line-div'></div>"
    } else if ([seven, eight, nine].join('') === (symbol.repeat(3))) {
      winningLine.innerHTML = "<div id='bottom-row' class='line-div'></div>"
    }
    if (numberOfPlayers === 'zero') {
      giveWin(symbol)
    }
  }
}

function giveWin(symbol) {
  if (symbol == firstPlayerSymbol) {
    xWins = xWins + 1
    console.log('X wins: ' + xWins)
  } else {
    oWins = oWins + 1
    console.log('O wins:' + oWins)
  }
}

function computerTurn() {
  if (turn === 'x') {
    oppositeTurn = 'o'
    oppositeSymbol = secondPlayerSymbol
    turnSymbol = firstPlayerSymbol
  } else {
    oppositeTurn = 'x'
    oppositeSymbol = firstPlayerSymbol
    turnSymbol = secondPlayerSymbol
  }

  lookForBlockOrWin(turnSymbol + turnSymbol)
  lookForBlockOrWin(oppositeSymbol + oppositeSymbol)

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
    if (turn != oppositeTurn && firstMove === '') {
      handleClick(`cell-${firstCell}`)
    } else if (turn != oppositeTurn && secondMove === '') {
      handleClick(`cell-${secondCell}`)
    } else if (turn != oppositeTurn && five === '') {
      handleClick('cell-5')
    } else if (turn != oppositeTurn && five != '' && one === '') {
      handleClick('cell-1')
    } else if (turn != oppositeTurn && (one === oppositeSymbol && eight === oppositeSymbol || five === oppositeSymbol && nine === oppositeSymbol || four === oppositeSymbol && eight === oppositeSymbol) && seven === '') {
      handleClick('cell-7')
    } else if (turn != oppositeTurn && (six === oppositeSymbol && eight === oppositeSymbol || three === oppositeSymbol && eight === oppositeSymbol) && nine === '') {
      handleClick('cell-9')
    } else if (turn != oppositeTurn && (two === oppositeSymbol && four === oppositeSymbol || two === oppositeSymbol && six === oppositeSymbol || six === oppositeSymbol && eight === oppositeSymbol) && three === '') {
      handleClick('cell-3')
    } else if (turn != oppositeTurn && two === '') {
      handleClick('cell-2')
    } else if (turn != oppositeTurn && four === '') {
      handleClick('cell-4')
    } else if (turn != oppositeTurn && six === '') {
      handleClick('cell-6')
    } else if (turn != oppositeTurn && eight === '') {
      handleClick('cell-8')
    } else if (turn != oppositeTurn && nine === '') {
      handleClick('cell-9')
    } else if (turn != oppositeTurn && seven === '') {
      handleClick('cell-7')
    }
  } else {

    if (turn === 'o' && five === '') {
      handleClick('cell-5')
    } else if (turn === 'o' && five === firstPlayerSymbol && one === '') {
      handleClick('cell-1')
    } else if (turn === 'o' && (one === firstPlayerSymbol && eight === firstPlayerSymbol || five === firstPlayerSymbol && nine === firstPlayerSymbol || four === firstPlayerSymbol && eight === firstPlayerSymbol) && seven === '') {
      handleClick('cell-7')
    } else if (turn === 'o' && (six === firstPlayerSymbol && eight === firstPlayerSymbol || three === firstPlayerSymbol && eight === firstPlayerSymbol) && nine === '') {
      handleClick('cell-9')
    } else if (turn === 'o' && (two === firstPlayerSymbol && four === firstPlayerSymbol || two === firstPlayerSymbol && six === firstPlayerSymbol || six === firstPlayerSymbol && eight === firstPlayerSymbol) && three === '') {
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

  if (turn != oppositeTurn && ([two, three].join('') === symbol || [four, seven].join('') === symbol || [five, nine].join('') === symbol) && one === '') {
    handleClick('cell-1')
  } else if (turn != oppositeTurn && ([one, two].join('') === symbol || [seven, five].join('') === symbol || [nine, six].join('') === symbol) && three === '') {
    handleClick('cell-3')
  } else if (turn != oppositeTurn && ([one, four].join('') === symbol || [three, five].join('') === symbol || [nine, eight].join('') === symbol) && seven === '') {
    handleClick('cell-7')
  } else if (turn != oppositeTurn && ([one, five].join('') === symbol || [three, six].join('') === symbol || [seven, eight].join('') === symbol) && nine === '') {
    handleClick('cell-9')
  } else if (turn != oppositeTurn && ([one, three].join('') === symbol || [eight, five].join('') === symbol) && two === '') {
    handleClick('cell-2')
  } else if (turn != oppositeTurn && ([five, six].join('') === symbol || [one, seven].join('') === symbol) && four === '') {
    handleClick('cell-4')
  } else if (turn != oppositeTurn && ([three, nine].join('') === symbol || [four, five].join('') === symbol) && six === '') {
    handleClick('cell-6')
  } else if (turn != oppositeTurn && ([seven, nine].join('') === symbol || [two, five].join('') === symbol) && eight === '') {
    handleClick('cell-8')
  }
}

function setPlayer(symbol) {
  let playerSymbol = document.getElementById('playerSymbol')
  if (continueGame) {
    playerSymbol.innerHTML = '<p>Game in progress.</p>'
  } else if ((symbol === firstPlayerSymbol && whichPlayer === 'second') || (symbol === secondPlayerSymbol && whichPlayer === 'first')) {
    playerSymbol.innerHTML = '<p>Can\'t be the same.</p>'
  } else {
    chooseSymbol(symbol)
  }
  let symbolInput = document.getElementById('symbolInput')
  symbolInput.value = ''
}

function chooseSymbol(symbol) {
  if (symbol === '🧟') {
    if (whichPlayer === 'first') {
      firstPlayerSymbol = '🧟'
    } else {
      secondPlayerSymbol = '🧟'
    }
  } else if (symbol === '🎃') {
    if (whichPlayer === 'first') {
      firstPlayerSymbol = '🎃'
    } else {
      secondPlayerSymbol = '🎃'
    }
  } else if (symbol === '👻') {
    if (whichPlayer === 'first') {
      firstPlayerSymbol = '👻'
    } else {
      secondPlayerSymbol = '👻'
    }
  } else if (symbol === '🧛🏻‍') {
    if (whichPlayer === 'first') {
      firstPlayerSymbol = '🧛🏻‍'
    } else {
      secondPlayerSymbol = '🧛🏻‍'
    }
  } else {
    let symbolInput = document.getElementById('symbolInput').value
    console.log('Symbol Input: ' + symbolInput.length)
    if (symbolInput.length === 0) {
      if (turn === 'x' && whichPlayer === 'first') {
        symbolInput = 'x'
      } else {
        symbolInput = 'o'
      }
    }
    if (whichPlayer === 'first') {
      firstPlayerSymbol = symbolInput
    } else {
      secondPlayerSymbol = symbolInput
    }
  }
  if (whichPlayer === 'first') {
    playerSymbol.innerHTML = '<p>' + whichPlayer + ' symbol is ' + firstPlayerSymbol + '</p>'
  } else {
    playerSymbol.innerHTML = '<p>' + whichPlayer + ' symbol is ' + secondPlayerSymbol + '</p>'
  }
  if (whichPlayer === 'first') {
    whichPlayer = 'second'
  } else {
    whichPlayer = 'first'
  }
}

function endGame() {
  let output = document.getElementById('output')
  let endGameButton = document.getElementById('end-game')

  continueGame = false;
  endGameButton.disabled = true

  output.innerHTML = '<p>Game Ended!</p>'
}