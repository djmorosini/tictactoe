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
    gameBoard.innerHTML = "<div id='top'><span id='1' class='box' onclick='game.handleClick(\"1\");'></span><span id='2' class='box' onclick='game.handleClick(\"2\");'></span><span id='3' class='box' onclick='game.handleClick(\"3\");'></span></div><div id='middle'><span id='4' class='box' onclick='game.handleClick(\"4\");'></span><span id='5' class='box' onclick='game.handleClick(\"5\");'></span><span id='6' class='box' onclick='game.handleClick(\"6\");'></span></div><div id='bottom'><span id='7' class='box' onclick='game.handleClick(\"7\");'></span><span id='8' class='box' onclick='game.handleClick(\"8\");'></span><span id='9' class='box' onclick='game.handleClick(\"9\");'></span></div>"
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

  handleClick(cellID) {
    if (this.continueGame) {
      let square = document.getElementById(cellID)
      this.placeSymbol(square)
    }
  }

  placeSymbol(square) {
    let output = document.getElementById('output')
    if (square.innerHTML === 'x' || square.innerHTML === 'o') {
      output.innerHTML = '<p>Impossible! That cell is already full.</p>'
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
      output.innerHTML += "<p>Game over!</p>"
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
      output.innerHTML = `<p>Congratulations! Player ${symbol.toUpperCase()} wins!</p>`
      this.continueGame = false
    }
  }

  computerTurn() {
    this.lookForBlockOrWin('oo')
    this.lookForBlockOrWin('xx')

    let one = document.getElementById('1').innerHTML
    let two = document.getElementById('2').innerHTML
    let three = document.getElementById('3').innerHTML
    let four = document.getElementById('4').innerHTML
    let five = document.getElementById('5').innerHTML
    let six = document.getElementById('6').innerHTML
    let seven = document.getElementById('7').innerHTML
    let eight = document.getElementById('8').innerHTML
    let nine = document.getElementById('9').innerHTML
    if (this.turn === 'o' && five === '') {
      this.handleClick('5')
    } else if (this.turn === 'o' && five === 'x' && one === '') {
      this.handleClick('1')
    } else if (this.turn === 'o' && (one === 'x' && eight === 'x' || five === 'x' && nine === 'x' || four === 'x' && eight === 'x') && seven === '') {
      this.handleClick('7')
    } else if (this.turn === 'o' && (six === 'x' && eight === 'x' || three === 'x' && eight === 'x') && nine === '') {
      this.handleClick('9')
    } else if (this.turn === 'o' && (two === 'x' && four === 'x' || two === 'x' && six === 'x' || six === 'x' && eight === 'x') && three === '') {
      this.handleClick('3')
    } else if (this.turn === 'o' && two === '') {
      this.handleClick('2')
    } else if (this.turn === 'o' && four === '') {
      this.handleClick('4')
    } else if (this.turn === 'o' && six === '') {
      this.handleClick('6')
    } else if (this.turn === 'o' && eight === '') {
      this.handleClick('8')
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
  
    if (([two, three].join('') === symbol || [four, seven].join('') === symbol || [five, nine].join('') === symbol) && one === '') {
      this.handleClick('1')
    } else if (([one, two].join('') === symbol || [seven, five].join('') === symbol || [nine, six].join('') === symbol) && three === '') {
      this.handleClick('3')
    } else if (([one, four].join('') === symbol || [three, five].join('') === symbol || [nine, eight].join('') === symbol) && seven === '') {
      this.handleClick('7')
    } else if (([one, five].join('') === symbol || [three, six].join('') === symbol || [seven, eight].join('') === symbol) && nine === '') {
      this.handleClick('9')
    } else if (([one, three].join('') === symbol || [eight, five].join('') === symbol) && two === '') {
      this.handleClick('2')
    } else if (([five, six].join('') === symbol || [one, seven].join('') === symbol) && four === '') {
      this.handleClick('4')
    } else if (([three, nine].join('') === symbol || [four, five].join('') === symbol) && six === '') {
      this.handleClick('6')
    } else if (([seven, nine].join('') === symbol || [two, five].join('') === symbol) && eight === '') {
      this.handleClick('8')
    }
  }
}