let turn = 'x'
let continueGame = true

function initializeOne() {
  turn = 'x'
  continueGame = true
  setupOne()
  playGameOne()
}

function initializeTwo() {
  turn = 'x'
  continueGame = true
  setupTwo()
  playGameTwo()
}

function playGameOne() {
  let title = document.getElementById('title')
  let output = document.getElementById('output')
  title.innerHTML = '<h1>Single player</h1>'
  if (turn === 'x') {
    output.innerHTML = '<p>Ready Player X</p>'
  } else {
    computerTurn()
  }
}

function playGameTwo() {
  let title = document.getElementById('title')
  let output = document.getElementById('output')
  title.innerHTML = '<h1>Two player</h1>'
  if (turn === 'x') {
    output.innerHTML = '<p>Ready Player X</p>'
  } else {
    output.innerHTML = '<p>Ready Player O</p>'
  }
}

function checkForWinOne() {
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
    playGameOne()
  } else {
    output.innerHTML += "<p>Game over!</p>"
  }
}

function checkForWinTwo() {
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
    playGameTwo()
  } else {
    output.innerHTML += "<p>Game over!</p>"
    continueGame = false
  }
}

function setupOne() {
  let wrapper = document.getElementById('wrapper')
  wrapper.innerHTML = "<div id='top'><span id='1' class='box' onclick='handleClickOne(1);'>1</span>|<span id='2' class='box' onclick='handleClickOne(2);'>2</span>|<span id='3' class='box' onclick='handleClickOne(3);'>3</span></div><div><span class='barrier'>---</span><span class='barrier'>---</span><span class='barrier'>---</span></div><div id='middle'><span id='4' class='box' onclick='handleClickOne(4);'>4</span>|<span id='5' class='box' onclick='handleClickOne(5);'>5</span>|<span id='6' class='box' onclick='handleClickOne(6);'>6</span></div><div><span class='barrier'>---</span><span class='barrier'>---</span><span class='barrier'>---</span></div><div id='bottom'><span id='7' class='box' onclick='handleClickOne(7);'>7</span>|<span id='8' class='box' onclick='handleClickOne(8);'>8</span>|<span id='9' class='box' onclick='handleClickOne(9);'>9</span></div><div id='output'></div>"
}

function setupTwo() {
  let wrapper = document.getElementById('wrapper')
  wrapper.innerHTML = "<div id='top'><span id='1' class='box' onclick='handleClickTwo(1);'>1</span>|<span id='2' class='box' onclick='handleClickTwo(2);'>2</span>|<span id='3' class='box' onclick='handleClickTwo(3);'>3</span></div><div><span class='barrier'>---</span><span class='barrier'>---</span><span class='barrier'>---</span></div><div id='middle'><span id='4' class='box' onclick='handleClickTwo(4);'>4</span>|<span id='5' class='box' onclick='handleClickTwo(5);'>5</span>|<span id='6' class='box' onclick='handleClickTwo(6);'>6</span></div><div><span class='barrier'>---</span><span class='barrier'>---</span><span class='barrier'>---</span></div><div id='bottom'><span id='7' class='box' onclick='handleClickTwo(7);'>7</span>|<span id='8' class='box' onclick='handleClickTwo(8);'>8</span>|<span id='9' class='box' onclick='handleClickTwo(9);'>9</span></div><div id='output'></div>"
}

function handleClickOne(squareNum) {
  if (continueGame) {
    let square = document.getElementById(squareNum)
    placeSymbolOne(square)
  }
}

function handleClickTwo(squareNum) {
  if (continueGame) {
    let square = document.getElementById(squareNum)
    placeSymbolTwo(square)
  }
}

function placeSymbolOne(square) {
  let output = document.getElementById('output')
  if (square.innerHTML === 'x' || square.innerHTML === 'o') {
    output.innerHTML = '<p>Square already taken!</p>'
  } else {
    if (turn === 'x') {
      square.innerHTML = 'x'
    } else {
      square.innerHTML = 'o'
    }
    checkForWinOne()
  }
}

function placeSymbolTwo(square) {
  let output = document.getElementById('output')
  if (square.innerHTML === 'x' || square.innerHTML === 'o') {
    output.innerHTML = '<p>Square already taken!</p>'
  } else {
    if (turn === 'x') {
      square.innerHTML = 'x'
    } else {
      square.innerHTML = 'o'
    }
    checkForWinTwo()
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
      handleClickOne(5)
    } else if (turn === 'o' && five === 'x' && one === '1') {
      handleClickOne(1)
    } else if (turn === 'o' && five === 'x' && nine === 'x') {
      handleClickOne(7)
    } else if (turn === 'o' && two === '2') {
      handleClickOne(2)
    } else if (turn === 'o' && four === '4') {
      handleClickOne(4)
    } else if (turn === 'o' && six === '6') {
      handleClickOne(6)
    } else if (turn === 'o' && eight === '8') {
      handleClickOne(8)
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
    handleClickOne(1)
  } else if (([one, two].join('') === symbol || [seven, five].join('') === symbol || [nine, six].join('') === symbol) && three === '3') {
    handleClickOne(3)
  } else if (([one, four].join('') === symbol || [three, five].join('') === symbol || [nine, eight].join('') === symbol) && seven === '7') {
    handleClickOne(7)
  } else if (([one, five].join('') === symbol || [three, six].join('') === symbol || [seven, eight].join('') === symbol) && nine === '9') {
    handleClickOne(9)
  } else if (([one, three].join('') === symbol || [eight, five].join('') === symbol) && two === '2') {
    handleClickOne(2)
  } else if (([five, six].join('') === symbol || [one, seven].join('') === symbol) && four === '4') {
    handleClickOne(4)
  } else if (([three, nine].join('') === symbol || [four, five].join('') === symbol) && six === '6') {
    handleClickOne(6)
  } else if (([seven, nine].join('') === symbol || [two, five].join('') === symbol) && eight === '8') {
    handleClickOne(8)
  }
}