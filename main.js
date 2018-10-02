let turn = 'x'
let continueGame = true
let numberOfPlayers

function setupGame(players) {
  let gameBoard = document.getElementById('game-board')
  let title = document.getElementById('title')
  turn = 'x'
  continueGame = true
  gameBoard.innerHTML = "<div id='top'><span id='1' class='box' onclick='handleClick(1);'>1</span>|<span id='2' class='box' onclick='handleClick(2);'>2</span>|<span id='3' class='box' onclick='handleClick(3);'>3</span></div><div><span class='barrier'>---</span><span class='barrier'>---</span><span class='barrier'>---</span></div><div id='middle'><span id='4' class='box' onclick='handleClick(4);'>4</span>|<span id='5' class='box' onclick='handleClick(5);'>5</span>|<span id='6' class='box' onclick='handleClick(6);'>6</span></div><div><span class='barrier'>---</span><span class='barrier'>---</span><span class='barrier'>---</span></div><div id='bottom'><span id='7' class='box' onclick='handleClick(7);'>7</span>|<span id='8' class='box' onclick='handleClick(8);'>8</span>|<span id='9' class='box' onclick='handleClick(9);'>9</span></div><div id='output'></div>"
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
  if (turn === 'x') {
    output.innerHTML = '<p>Ready Player X</p>'
  } else {
    if (numberOfPlayers === 'one') {
      computerTurn()
    } else {
      output.innerHTML = '<p>Ready Player O</p>'
    }
  }
}

function handleClick(squareNum) {
  if (continueGame) {
    let square = document.getElementById(squareNum)
    placeSymbol(square)
  }
}

function placeSymbol(square) {
  let output = document.getElementById('output')
  if (square.innerHTML === 'x' || square.innerHTML === 'o') {
    output.innerHTML = '<p>Square already taken!</p>'
  } else {
    if (turn === 'x') {
      square.innerHTML = 'x'
    } else {
      square.innerHTML = 'o'
    }
    checkForWin()
  }
}

function checkForWin() {
  checkBoard('x')
  checkBoard('o')

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

function checkBoard(symbol) {
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
    output.innerHTML = `<p>${symbol.toUpperCase()} wins!</p>`
    continueGame = false
  }
}

function computerTurn() {
  let one = document.getElementById('1').innerHTML
  let two = document.getElementById('2').innerHTML
  let three = document.getElementById('3').innerHTML
  let four = document.getElementById('4').innerHTML
  let five = document.getElementById('5').innerHTML
  let six = document.getElementById('6').innerHTML
  let seven = document.getElementById('7').innerHTML
  let eight = document.getElementById('8').innerHTML
  let nine = document.getElementById('9').innerHTML

  checkConditions('oo')
  checkConditions('xx')
  if (turn === 'o' && five === '5') {
    handleClick(5)
  } else if (turn === 'o' && five === 'x' && one === '1') {
    handleClick(1)
  } else if (turn === 'o' && five === 'x' && nine === 'x') {
    handleClick(7)
  } else if (turn === 'o' && two === '2') {
    handleClick(2)
  } else if (turn === 'o' && four === '4') {
    handleClick(4)
  } else if (turn === 'o' && six === '6') {
    handleClick(6)
  } else if (turn === 'o' && eight === '8') {
    handleClick(8)
  }
}

function checkConditions(symbol) {
  let one = document.getElementById('1').innerHTML
  let two = document.getElementById('2').innerHTML
  let three = document.getElementById('3').innerHTML
  let four = document.getElementById('4').innerHTML
  let five = document.getElementById('5').innerHTML
  let six = document.getElementById('6').innerHTML
  let seven = document.getElementById('7').innerHTML
  let eight = document.getElementById('8').innerHTML
  let nine = document.getElementById('9').innerHTML

  if (([two, three].join('') === symbol || [four, seven].join('') === symbol || [five, nine].join('') === symbol) && one === '1') {
    handleClick(1)
  } else if (([one, two].join('') === symbol || [seven, five].join('') === symbol || [nine, six].join('') === symbol) && three === '3') {
    handleClick(3)
  } else if (([one, four].join('') === symbol || [three, five].join('') === symbol || [nine, eight].join('') === symbol) && seven === '7') {
    handleClick(7)
  } else if (([one, five].join('') === symbol || [three, six].join('') === symbol || [seven, eight].join('') === symbol) && nine === '9') {
    handleClick(9)
  } else if (([one, three].join('') === symbol || [eight, five].join('') === symbol) && two === '2') {
    handleClick(2)
  } else if (([five, six].join('') === symbol || [one, seven].join('') === symbol) && four === '4') {
    handleClick(4)
  } else if (([three, nine].join('') === symbol || [four, five].join('') === symbol) && six === '6') {
    handleClick(6)
  } else if (([seven, nine].join('') === symbol || [two, five].join('') === symbol) && eight === '8') {
    handleClick(8)
  }
}