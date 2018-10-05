let turn = 'X'
let continueGame = true
let numberOfPlayers

function setupGame(players) {
  let gameBoard = document.getElementById('game-board')
  let title = document.getElementById('title')
  turn = 'X'
  continueGame = true
  gameBoard.innerHTML = "<div id='top'><span id='1' class='box' onclick='handleClick(\"1\");'></span><span id='2' class='box' onclick='handleClick(\"2\");'></span><span id='3' class='box' onclick='handleClick(\"3\");'></span></div><div id='middle'><span id='4' class='box' onclick='handleClick(\"4\");'></span><span id='5' class='box' onclick='handleClick(\"5\");'></span><span id='6' class='box' onclick='handleClick(\"6\");'></span></div><div id='bottom'><span id='7' class='box' onclick='handleClick(\"7\");'></span><span id='8' class='box' onclick='handleClick(\"8\");'></span><span id='9' class='box' onclick='handleClick(\"9\");'></span></div>"
  if (players === 'one') {
    numberOfPlayers = players
    title.innerHTML = '<h1>Single player</h1>'
  } else {
    numberOfPlayers = players
    title.innerHTML = '<h1>Two player</h1>'
  }
  playGame()
}

function playGame() {
  let output = document.getElementById('output')
  if (turn === 'X') {
    output.innerHTML = '<p>Ready Player X</p>'
  } else {
    if (numberOfPlayers === 'one') {
      computerTurn()
    } else {
      output.innerHTML = '<p>Ready Player O</p>'
    }
  }
}

function handleClick(cellID) {
  if (continueGame) {
    let square = document.getElementById(cellID)
    placeSymbol(square)
  }
}

function placeSymbol(square) {
  let output = document.getElementById('output')
  if (square.innerHTML === 'X' || square.innerHTML === 'O') {
    output.innerHTML = '<p>Impossible! That cell is already full.</p>'
  } else {
    if (turn === 'X') {
      square.innerHTML = 'X'
    } else {
      square.innerHTML = 'O'
    }
    checkBoard()
  }
}

function checkBoard() {
  checkWinConditions('X')
  checkWinConditions('O')

  let boxes = document.getElementsByClassName('box')
  let availableMoves = []
  for (let box of boxes) {
    if (box.innerHTML != 'X' && box.innerHTML != 'O') {
      availableMoves.push(box.innerHTML)
    }
  }
  if (continueGame && availableMoves.length === 0) {
    output.innerHTML = '<p>Tie game!</p>'
    continueGame = false
  } else if (continueGame) {
    changeTurn()
    playGame()
  } else {
    output.innerHTML += "<p>Game over!</p>"
  }
}

function changeTurn() {
  if (turn === 'X') {
    turn = 'O'
  } else {
    turn = 'X'
  }
}

function checkWinConditions(symbol) {
  let one = document.getElementById('1').innerHTML
  let two = document.getElementById('2').innerHTML
  let three = document.getElementById('3').innerHTML
  let four = document.getElementById('4').innerHTML
  let five = document.getElementById('5').innerHTML
  let six = document.getElementById('6').innerHTML
  let seven = document.getElementById('7').innerHTML
  let eight = document.getElementById('8').innerHTML
  let nine = document.getElementById('9').innerHTML
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

function computerTurn() {
  lookForBlockOrWin('OO')
  lookForBlockOrWin('XX')

  let one = document.getElementById('1').innerHTML
  let two = document.getElementById('2').innerHTML
  let three = document.getElementById('3').innerHTML
  let four = document.getElementById('4').innerHTML
  let five = document.getElementById('5').innerHTML
  let six = document.getElementById('6').innerHTML
  let seven = document.getElementById('7').innerHTML
  let eight = document.getElementById('8').innerHTML
  let nine = document.getElementById('9').innerHTML
  if (turn === 'O' && five === '') {
    handleClick('5')
  } else if (turn === 'O' && five === 'X' && one === '') {
    handleClick('1')
  } else if (turn === 'O' && (one === 'X' && eight === 'X' || five === 'X' && nine === 'X' || four === 'X' && eight === 'X') && seven === '') {
    handleClick('7')
  } else if (turn === 'O' && (six === 'X' && eight === 'X' || three === 'X' && eight === 'X') && nine === '') {
    handleClick('9')
  } else if (turn === 'O' && (two === 'X' && four === 'X' || two === 'X' && six === 'X' || six === 'X' && eight === 'X') && three === '') {
    handleClick('3')
  } else if (turn === 'O' && two === '') {
    handleClick('2')
  } else if (turn === 'O' && four === '') {
    handleClick('4')
  } else if (turn === 'O' && six === '') {
    handleClick('6')
  } else if (turn === 'O' && eight === '') {
    handleClick('8')
  }
}

function lookForBlockOrWin(symbol) {
  let one = document.getElementById('1').innerHTML
  let two = document.getElementById('2').innerHTML
  let three = document.getElementById('3').innerHTML
  let four = document.getElementById('4').innerHTML
  let five = document.getElementById('5').innerHTML
  let six = document.getElementById('6').innerHTML
  let seven = document.getElementById('7').innerHTML
  let eight = document.getElementById('8').innerHTML
  let nine = document.getElementById('9').innerHTML

  if (([two, three].join('') === symbol || [four, seven].join('') === symbol || [five, nine].join('') === symbol) && one === '') {
    handleClick('1')
  } else if (([one, two].join('') === symbol || [seven, five].join('') === symbol || [nine, six].join('') === symbol) && three === '') {
    handleClick('3')
  } else if (([one, four].join('') === symbol || [three, five].join('') === symbol || [nine, eight].join('') === symbol) && seven === '') {
    handleClick('7')
  } else if (([one, five].join('') === symbol || [three, six].join('') === symbol || [seven, eight].join('') === symbol) && nine === '') {
    handleClick('9')
  } else if (([one, three].join('') === symbol || [eight, five].join('') === symbol) && two === '') {
    handleClick('2')
  } else if (([five, six].join('') === symbol || [one, seven].join('') === symbol) && four === '') {
    handleClick('4')
  } else if (([three, nine].join('') === symbol || [four, five].join('') === symbol) && six === '') {
    handleClick('6')
  } else if (([seven, nine].join('') === symbol || [two, five].join('') === symbol) && eight === '') {
    handleClick('8')
  }
}