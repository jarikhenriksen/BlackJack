function BlackJack() { }
    
BlackJack.prototype = {
    suit: ['spades', 'clubs', 'diamonds', 'hearts'],
    value: ['ace','jack','queen', 'king',1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    usedCardList: [],
    getCard: function() { //this functions generates a random card, and adds it to a used card list.
        
        let newCardSuit = this.suit[Math.floor(Math.random()*this.suit.length)]
        let newCardValue = this.value[Math.floor(Math.random()*this.value.length)]
        let usedCard = newCardValue + newCardSuit
        this.usedCardList.push(usedCard)//card is added to use card list, used to check for repeat cards
        //this.usedCardCheck()
        return {
            
            newCardSuit,
            newCardValue,
            usedCard,
            
        }
    },

    usedCardCheck: function() { //TO DO make usedCardCheck work, does not remove used card from list,
        let UsedcardInfo = this.getCard
        if (this.usedCardList.includes(UsedcardInfo.usedCard)) {
            this.usedCardList.pop()
        }
    },

    acesHighorLow: function() { //determines whether aces are worth 1 or 11, sets their value as such
      let trueFalse = [true, false]
      let value = trueFalse[Math.floor(Math.random()*trueFalse.length)]
      if(value === true) {
          document.getElementById('acesHighOrLow').innerHTML = 'Aces High'
          return true
      }
      else {
          document.getElementById('acesHighOrLow').innerHTML = 'Aces Low'
          return false
      }
  }

}

let game = new BlackJack
let yourHand
let highLow
let yourHandValue = []
let dealerHandValue = []

let dealerCheck = function(yourArr, dealerArr) { //compares value of your hand to dealer
    let yourSum = yourArr.reduce((a, b) => a + b, 0)  
    let dealerSum = dealerArr.reduce((a, b) => a + b, 0 ) //adds value of both your hand and dealer hand on every new card 
    
    if((dealerSum > 21) && (yourSum > 21)) {
        alert('Tie')
        return
    }
    else if((dealerSum > 21) && (yourSum <= 21)) {
        alert('Win')
        return
    }
    else if((dealerSum <= 21) && (yourSum > 21)) {
        alert('Loss')
        return
    }
}

let getYourCard = function() { 
  highLow = game.acesHighorLow() 
  yourHandValue.pop() //removes first value in yourHandValue, if you press get your card multiple times, will become redundant in future. 
  let currentCards = game.getCard() 
  getDealerCard(highLow)
  yourHand = document.getElementById('card').innerHTML = `your hand is ${currentCards.newCardValue} of ${currentCards.newCardSuit}`

  if ((currentCards.newCardValue === 'jack') || (currentCards.newCardValue === 'queen') || (currentCards.newCardValue === 'king')) { //converts royal values into numerical
        yourHandValue.push(10)
  }

  else if ((currentCards.newCardValue === 'ace') && (highLow === true)) {
    yourHandValue.push(11)
  }

  else if ((currentCards.newCardValue === 'ace') && (highLow === false)) {
    yourHandValue.push(1)
  }
  
  else {
  yourHandValue.push(currentCards.newCardValue)
  }

  document.getElementById("totalValue").innerHTML = yourHandValue

}

let getDealerCard = function(highLow) { 
    
    dealerHandValue.pop()
    let currentCards = game.getCard()
    
     
    dealerHand = document.getElementById('dealerCard').innerHTML = `dealer hand is ${currentCards.newCardValue} of ${currentCards.newCardSuit}`

    if ((currentCards.newCardValue === 'jack') || (currentCards.newCardValue === 'queen') || (currentCards.newCardValue === 'king')) { //converts royal values into numerical
          dealerHandValue.push(10)
    }
  
    else if ((currentCards.newCardValue === 'ace') && (highLow === true)) {
      dealerHandValue.push(11)
    }
  
    else if ((currentCards.newCardValue === 'ace') && (highLow === false)) {
      dealerHandValue.push(1)
    }
    
    else {
    dealerHandValue.push(currentCards.newCardValue)
    }
  
    document.getElementById("dealerValue").innerHTML = dealerHandValue
  }
  

let anotherCard = function() {

    let currentCards = game.getCard()
    anotherDealerCard()

    yourHand += `, and the ${currentCards.newCardValue} of ${currentCards.newCardSuit}` //adds new value to the document
    document.getElementById('card').innerHTML = yourHand //updates on screen display depicting what your hand is
    
    if ((currentCards.newCardValue === 'jack') || (currentCards.newCardValue === 'queen') || (currentCards.newCardValue === 'king')) { //converts royal values into numerical 
            yourHandValue.push(10)
    }

    else if ((currentCards.newCardValue === 'ace') && (highLow === true)) {
        yourHandValue.push(11)
      }
    
    else if ((currentCards.newCardValue === 'ace') && (highLow === false)) {
        yourHandValue.push(1)
      }
    else {
    yourHandValue.push(currentCards.newCardValue)
    }

    document.getElementById("totalValue").innerHTML = yourHandValue
    
    dealerCheck(yourHandValue, dealerHandValue)

    return {yourHandValue, dealerHandValue}
}

let anotherDealerCard = function() {

    let currentCards = game.getCard()
    dealerHand += `, and the ${currentCards.newCardValue} of ${currentCards.newCardSuit}` //adds new value to the document
    document.getElementById('dealerCard').innerHTML = dealerHand //updates on screen display depicting what dealer hand is
    
    if ((currentCards.newCardValue === 'jack') || (currentCards.newCardValue === 'queen') || (currentCards.newCardValue === 'king')) { //converts royal values into numerical 
            dealerHandValue.push(10)
    }

    else if ((currentCards.newCardValue === 'ace') && (highLow === true)) {
        dealerHandValue.push(11)
      }
    
    else if ((currentCards.newCardValue === 'ace') && (highLow === false)) {
        dealerHandValue.push(1)
      }
    else {
   dealerHandValue.push(currentCards.newCardValue)
    }

    document.getElementById("dealerValue").innerHTML = dealerHandValue
    
}

let allDone = function() {
    dealerCheck()

}

//TO DO make all done WORK, supposed to check if pressing no more cards (standing) results in win or loss, possibly add more cards to dealers hand.