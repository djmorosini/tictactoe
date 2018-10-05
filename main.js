let turn = 'x'
let continueGame = true
let numberOfPlayers

let firstCell

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
    firstCell = getRandomInt(9)
  } else {
    numberOfPlayers = players
    title.innerHTML = '<h1>Two player</h1>'
  }
  playGame()
}

function playGame() {
  let output = document.getElementById('output')
  if (turn === 'x') {
    output.innerHTML = '<p>Ready Player X</p>'
    if (numberOfPlayers === 'zero') {
      computerTurn()
    }
  } else {
    if (numberOfPlayers === 'one' || numberOfPlayers === 'zero') {
      computerTurn()
    } else {
      output.innerHTML = '<p>Ready Player O</p>'
    }
  }
}

function handleClick(cellID) {
  if (continueGame) {
    let square = document.getElementById(cellID)
    console.log('turn: '+ turn + '. Cell ID: '+ cellID)
    placeSymbol(square)
  }
}

function placeSymbol(square) {
  let output = document.getElementById('output')
  if (square.innerHTML === 'x' || square.innerHTML === 'o') {
    output.innerHTML = '<p>Impossible! That cell is already full.</p>'
  } else {
    if (turn === 'x') {
      square.innerHTML = 'x'
    } else {
      square.innerHTML = 'o'
    }
    checkBoard()
  }
}

function checkBoard() {
  checkWinConditions('x')
  checkWinConditions('o')

  let boxes = document.getElementsByClassName('box')
  let availableMoves = []
  for (let box of boxes) {
    if (box.innerHTML != 'x' && box.innerHTML != 'o') {
      availableMoves.push(box.innerHTML)
    }
  }

  if (continueGame && availableMoves.length === 0) {
    output.innerHTML = '<p>Tie game!</p>'
    continueGame = false
  } else if (continueGame) {
    console.log("change turn")
    changeTurn()
    playGame()
  } else {
    output.innerHTML += "<p>Game over!</p>"
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
    output.innerHTML = `<p>Congratulations! Player ${symbol.toUpperCase()} wins!</p>`
    continueGame = false
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max) + 1);
}

function computerTurn() {
  lookForBlockOrWin('oo')
  lookForBlockOrWin('xx')

  let one = document.getElementById('cell-1').innerHTML
  let two = document.getElementById('cell-2').innerHTML
  let three = document.getElementById('cell-3').innerHTML
  let four = document.getElementById('cell-4').innerHTML
  let five = document.getElementById('cell-5').innerHTML
  let six = document.getElementById('cell-6').innerHTML
  let seven = document.getElementById('cell-7').innerHTML
  let eight = document.getElementById('cell-8').innerHTML
  let nine = document.getElementById('cell-9').innerHTML
  let firstMove = document.getElementById(`cell-${firstCell}`).innerHTML

  if (turn === 'x') {
    opposite = 'o'
  } else {
    opposite = 'x'
  }

  if (numberOfPlayers === 'zero') {
    if (firstMove === '') {
      handleClick(`cell-${firstCell}`)
    } else if (five === '') {
      handleClick('cell-5')
    } else if (five === opposite && one === '') {
      handleClick('cell-1')
    } else if ((one === opposite && eight === opposite || five === opposite && nine === opposite || four === opposite && eight === opposite) && seven === '') {
      handleClick('cell-7')
    } else if ((six === opposite && eight === opposite || three === opposite && eight === opposite) && nine === '') {
      handleClick('cell-9')
    } else if ((two === opposite && four === opposite || two === opposite && six === opposite || six === opposite && eight === opposite) && three === '') {
      handleClick('cell-3')
    } else if (two === '') {
      handleClick('cell-2')
    } else if (four === '') {
      handleClick('cell-4')
    } else if (six === '') {
      handleClick('cell-6')
    } else if (eight === '') {
      handleClick('cell-8')
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

  if (([two, three].join('') === symbol || [four, seven].join('') === symbol || [five, nine].join('') === symbol) && one === '') {
    handleClick('cell-1')
  } else if (([one, two].join('') === symbol || [seven, five].join('') === symbol || [nine, six].join('') === symbol) && three === '') {
    handleClick('cell-3')
  } else if (([one, four].join('') === symbol || [three, five].join('') === symbol || [nine, eight].join('') === symbol) && seven === '') {
    handleClick('cell-7')
  } else if (([one, five].join('') === symbol || [three, six].join('') === symbol || [seven, eight].join('') === symbol) && nine === '') {
    handleClick('cell-9')
  } else if (([one, three].join('') === symbol || [eight, five].join('') === symbol) && two === '') {
    handleClick('cell-2')
  } else if (([five, six].join('') === symbol || [one, seven].join('') === symbol) && four === '') {
    handleClick('cell-4')
  } else if (([three, nine].join('') === symbol || [four, five].join('') === symbol) && six === '') {
    handleClick('cell-6')
  } else if (([seven, nine].join('') === symbol || [two, five].join('') === symbol) && eight === '') {
    handleClick('cell-8')
  }
}