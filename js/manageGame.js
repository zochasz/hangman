function Hangman () {
  this.words      = ["IRONHACK", "NODEJS", "JAVASCRIPT", "METEOR", "ANGULAR"];
  this.secretWord = "";
  this.letters     = [];
  this.errorsLeft = 10;

  this.secretWord = this._getWord();
}

Hangman.prototype._getWord = function () {
  var random = Math.floor(Math.random() * this.words.length);
  return this.words[random];
};

Hangman.prototype.askLetter = function (letter) {
  letter = letter.toUpperCase();

  if (this.letters.indexOf(letter) > -1) {
    return;
  }

  this.letters.push(letter);
  var correct = this.secretWord.indexOf(letter) > -1;

  if (!correct) {
    this.errorsLeft -= 1;
  }

  return correct;
};

Hangman.prototype.getWordStatus = function () {
  var that        = this;
  var wordStatus  = [];
  var splitedWord = this.secretWord.split("");

  splitedWord.forEach(function (letter) {
    if (that.letters.indexOf(letter) > -1) {
      wordStatus.push(letter);
    } else {
      wordStatus.push("_");
    }
  });

  return wordStatus;
};

Hangman.prototype._isFinished = function () {
  return this.getWordStatus().indexOf("_") < 0;
};

Hangman.prototype._gameOver = function () {
  return this.errorsLeft === 0;
};

Hangman.prototype.gameStatus = function () {
  if (this._isFinished()) {
    return "You Win";
  } else if (this._gameOver()) {
    return "Game Over";
  }
};
