class TicTacToe {
  constructor() {
    this.turn = 'x'
    this.continueGame = true
    this.numberOfPlayers
  }
  setupGame(players) {
    let gameBoard = document.getElementById('game-board')
    let title = document.getElementById('title')
    this.turn = 'x'
    this.continueGame = true
    gameBoard.innerHTML = "<div id='top'><span id='1' class='box' onclick='game.handleClick(1);'>1</span>|<span id='2' class='box' onclick='game.handleClick(2);'>2</span>|<span id='3' class='box' onclick='game.handleClick(3);'>3</span></div><div><span class='barrier'>---</span><span class='barrier'>---</span><span class='barrier'>---</span></div><div id='middle'><span id='4' class='box' onclick='game.handleClick(4);'>4</span>|<span id='5' class='box' onclick='game.handleClick(5);'>5</span>|<span id='6' class='box' onclick='game.handleClick(6);'>6</span></div><div><span class='barrier'>---</span><span class='barrier'>---</span><span class='barrier'>---</span></div><div id='bottom'><span id='7' class='box' onclick='game.handleClick(7);'>7</span>|<span id='8' class='box' onclick='game.handleClick(8);'>8</span>|<span id='9' class='box' onclick='game.handleClick(9);'>9</span></div><div id='output'></div>"
    if (players === 'one') {
      this.numberOfPlayers = players
      title.innerHTML = '<h1>Single player</h1>'
    } else {
      this.numberOfPlayers = players
      title.innerHTML = '<h1>Two player</h1>'
    }
    this.playGame()
  }

  playGame() {
    let output = document.getElementById('output')
    if (this.turn === 'x') {
      output.innerHTML = '<p>Ready Player X</p>'
    } else {
      if (this.numberOfPlayers === 'one') {
        this.computerTurn()
      } else {
        output.innerHTML = '<p>Ready Player O</p>'
      }
    }
  }

  handleClick(squareNum) {
    if (this.continueGame) {
      let square = document.getElementById(squareNum)
      this.placeSymbol(square)
    }
  }

  placeSymbol(square) {
    let output = document.getElementById('output')
    if (square.innerHTML === 'x' || square.innerHTML === 'o') {
      output.innerHTML = '<p>Square already taken!</p>'
    } else {
      if (this.turn === 'x') {
        square.innerHTML = 'x'
      } else {
        square.innerHTML = 'o'
      }
      this.checkBoard()
    }
  }

  checkBoard() {
    this.checkWinConditions('x')
    this.checkWinConditions('o')

    let boxes = document.getElementsByClassName('box')
    let availableMoves = []
    for (let box of boxes) {
      if (box.innerHTML != 'x' && box.innerHTML != 'o') {
        availableMoves.push(box.innerHTML)
      }
    }
    if (this.continueGame && availableMoves.length === 0) {
      output.innerHTML = '<p>Tie game!</p>'
      this.continueGame = false
    } else if (this.continueGame) {
      this.changeTurn()
      this.playGame()
    } else {
      output.innerHTML += "<p>Game over!</p>"
    }
  }

  changeTurn() {
    if (this.turn === 'x') {
      this.turn = 'o'
    } else {
      this.turn = 'x'
    }
  }

  checkWinConditions(symbol) {
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
      this.continueGame = false
    }
  }

  computerTurn() {
    let one = document.getElementById('1').innerHTML
    let two = document.getElementById('2').innerHTML
    let three = document.getElementById('3').innerHTML
    let four = document.getElementById('4').innerHTML
    let five = document.getElementById('5').innerHTML
    let six = document.getElementById('6').innerHTML
    let seven = document.getElementById('7').innerHTML
    let eight = document.getElementById('8').innerHTML
    let nine = document.getElementById('9').innerHTML

    this.lookForBlockOrWin('oo')
    this.lookForBlockOrWin('xx')
    if (this.turn === 'o' && five === '5') {
      this.handleClick(5)
    } else if (this.turn === 'o' && five === 'x' && one === '1') {
      this.handleClick(1)
    } else if (this.turn === 'o' && five === 'x' && nine === 'x' && seven === '7') {
      this.handleClick(7)
    } else if (this.turn === 'o' && (two === 'x' && four === 'x' || two === 'x' && six === 'x' || six === 'x' && eight === 'x') && three === '3') {
      this.handleClick(3)
    } else if (this.turn === 'o' && (four === 'x' && eight === 'x') && nine === '9') {
      this.handleClick(9)
    } else if (this.turn === 'o' && two === '2') {
      this.handleClick(2)
    } else if (this.turn === 'o' && four === '4') {
      this.handleClick(4)
    } else if (this.turn === 'o' && six === '6') {
      this.handleClick(6)
    } else if (this.turn === 'o' && eight === '8') {
      this.handleClick(8)
    }
  }

  lookForBlockOrWin(symbol) {
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
      this.handleClick(1)
    } else if (([one, two].join('') === symbol || [seven, five].join('') === symbol || [nine, six].join('') === symbol) && three === '3') {
      this.handleClick(3)
    } else if (([one, four].join('') === symbol || [three, five].join('') === symbol || [nine, eight].join('') === symbol) && seven === '7') {
      this.handleClick(7)
    } else if (([one, five].join('') === symbol || [three, six].join('') === symbol || [seven, eight].join('') === symbol) && nine === '9') {
      this.handleClick(9)
    } else if (([one, three].join('') === symbol || [eight, five].join('') === symbol) && two === '2') {
      this.handleClick(2)
    } else if (([five, six].join('') === symbol || [one, seven].join('') === symbol) && four === '4') {
      this.handleClick(4)
    } else if (([three, nine].join('') === symbol || [four, five].join('') === symbol) && six === '6') {
      this.handleClick(6)
    } else if (([seven, nine].join('') === symbol || [two, five].join('') === symbol) && eight === '8') {
      this.handleClick(8)
    }
  }
}