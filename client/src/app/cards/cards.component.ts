import { Component } from '@angular/core';
import { AuthenticationService, UserDetails } from '../authentication.service';

@Component({
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent {
  details: UserDetails;
  cards: any[];
  cardsOrdered: any[];
  // cardsOrdered: [number];
  showRestartBtn: boolean = false;
  isNewGame: boolean = true;
  numberToCardDetail: object = {
    0: {
      'type': 0,
      'typeDescriptive': 'Spade',
      'name': 'A'
    },
    1: {
      'type': 0,
      'typeDescriptive': 'Spade',
      'name': 2
    },
    2: {
      'type': 0,
      'typeDescriptive': 'Spade',
      'name': 3
    },
    3: {
      'type': 0,
      'typeDescriptive': 'Spade',
      'name': 4
    },
    4: {
      'type': 0,
      'typeDescriptive': 'Spade',
      'name': 5
    },
    5: {
      'type': 0,
      'typeDescriptive': 'Spade',
      'name': 6
    },
    6: {
      'type': 0,
      'typeDescriptive': 'Spade',
      'name': 7
    },
    7: {
      'type': 0,
      'typeDescriptive': 'Spade',
      'name': 8
    },
    8: {
      'type': 0,
      'typeDescriptive': 'Spade',
      'name': 9
    },
    9: {
      'type': 0,
      'typeDescriptive': 'Spade',
      'name': 10
    },
    10: {
      'type': 0,
      'typeDescriptive': 'Spade',
      'name': 'Joker'
    },
    11: {
      'type': 0,
      'typeDescriptive': 'Spade',
      'name': 'Queen'
    },
    12: {
      'type': 0,
      'typeDescriptive': 'Spade',
      'name': 'King'
    },
    13: {
      'type': 1,
      'typeDescriptive': 'Heart',
      'name': 'A'
    },
    14: {
      'type': 1,
      'typeDescriptive': 'Heart',
      'name': 2
    },
    15: {
      'type': 1,
      'typeDescriptive': 'Heart',
      'name': 3
    },
    16: {
      'type': 1,
      'typeDescriptive': 'Heart',
      'name': 4
    },
    17: {
      'type': 1,
      'typeDescriptive': 'Heart',
      'name': 5
    },
    18: {
      'type': 1,
      'typeDescriptive': 'Heart',
      'name': 6
    },
    19: {
      'type': 1,
      'typeDescriptive': 'Heart',
      'name': 7
    },
    20: {
      'type': 1,
      'typeDescriptive': 'Heart',
      'name': 8
    },
    21: {
      'type': 1,
      'typeDescriptive': 'Heart',
      'name': 9
    },
    22: {
      'type': 1,
      'typeDescriptive': 'Heart',
      'name': 10
    },
    23: {
      'type': 1,
      'typeDescriptive': 'Heart',
      'name': 'Joker'
    },
    24: {
      'type': 1,
      'typeDescriptive': 'Heart',
      'name': 'Queen'
    },
    25: {
      'type': 1,
      'typeDescriptive': 'Heart',
      'name': 'King'
    },
    26: {
      'type': 2,
      'typeDescriptive': 'Diamond',
      'name': 'A'
    },
    27: {
      'type': 2,
      'typeDescriptive': 'Diamond',
      'name': 2
    },
    28: {
      'type': 2,
      'typeDescriptive': 'Diamond',
      'name': 3
    },
    29: {
      'type': 2,
      'typeDescriptive': 'Diamond',
      'name': 4
    },
    30: {
      'type': 2,
      'typeDescriptive': 'Diamond',
      'name': 4
    },
    31: {
      'type': 2,
      'typeDescriptive': 'Diamond',
      'name': 6
    },
    32: {
      'type': 2,
      'typeDescriptive': 'Diamond',
      'name': 7
    },
    33: {
      'type': 2,
      'typeDescriptive': 'Diamond',
      'name': 8
    },
    34: {
      'type': 2,
      'typeDescriptive': 'Diamond',
      'name': 9
    },
    35: {
      'type': 2,
      'typeDescriptive': 'Diamond',
      'name': 10
    },
    36: {
      'type': 2,
      'typeDescriptive': 'Diamond',
      'name': 'Joker'
    },
    37: {
      'type': 2,
      'typeDescriptive': 'Diamond',
      'name': 'Queen'
    },
    38: {
      'type': 2,
      'typeDescriptive': 'Diamond',
      'name': 'King'
    },
    39: {
      'type': 3,
      'typeDescriptive': 'Club',
      'name': 'A'
    },
    40: {
      'type': 3,
      'typeDescriptive': 'Club',
      'name': 2
    },
    41: {
      'type': 3,
      'typeDescriptive': 'Club',
      'name': 3
    },
    42: {
      'type': 3,
      'typeDescriptive': 'Club',
      'name': 4
    },
    43: {
      'type': 3,
      'typeDescriptive': 'Club',
      'name': 5
    },
    44: {
      'type': 3,
      'typeDescriptive': 'Club',
      'name': 6
    },
    45: {
      'type': 3,
      'typeDescriptive': 'Club',
      'name': 7
    },
    46: {
      'type': 3,
      'typeDescriptive': 'Club',
      'name': 8
    },
    47: {
      'type': 3,
      'typeDescriptive': 'Club',
      'name': 9
    },
    48: {
      'type': 3,
      'typeDescriptive': 'Club',
      'name': 10
    },
    49: {
      'type': 3,
      'typeDescriptive': 'Club',
      'name': 'Joker'
    },
    50: {
      'type': 3,
      'typeDescriptive': 'Club',
      'name': 'Queen'
    },
    51: {
      'type': 3,
      'typeDescriptive': 'Club',
      'name': 'King'
    }
  }

  showError: boolean = false;
  correctDrops : number = 0;

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    this.auth.profile().subscribe(user => {
      this.details = user;
      console.log(this.details)

      if ('' == this.details.cards) { //is new game
        this.cards = Array.apply(null, { length: 52 }).map(Number.call, Number);
        console.log(this.cards)
        this.cards.sort(() => Math.random() - 0.5); //shuffle the cards, 
        //this.cardsOrdered = this.cards
        this.cardsOrdered = this.cards.slice();
        
        
      }
      else {
        this.isNewGame = false;
        this.cards = this.details.cards.split(",");
        this.cardsOrdered = this.cards.slice();
      }

    }, (err) => {
      console.error(err);
    });
  }


  allowDrop(ev) {
    ev.preventDefault();
  }

  drag(ev) {
    this.showError = false
    ev.dataTransfer.setData("text", ev.target.id);
  }

  drop(ev, binNumber) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    let cardNumber = data.substring(4).trim();
    let cardType = this.numberToCardDetail[cardNumber].type//id % 13
    if (cardType == binNumber) {
      // alert('if')
      // alert(data)
      // this.showError = false
      ev.target.appendChild(document.getElementById(data));

      if (this.isNewGame) {
        cardNumber = Number(cardNumber)
      }

      let index = this.cardsOrdered.indexOf(cardNumber)
      if (index > -1) {
        this.correctDrops += 1
        //this.cards.splice(Number(cardNumber), 1); //remove this card
        this.cardsOrdered.splice(index, 1)
        if (this.cardsOrdered.length == 0) { // if all finished
        //if(this.correctDrops == 52){
          this.showRestartBtn = true;
        }
      }
      // alert(this.correctDrops)
      console.log(this.cards)
      // alert(this.cardsOrdered.length)
      this.auth.updateCards(this.cardsOrdered);
    }
    else {
      // alert('if else')
      this.showError = true
    }
  }

  //restart game logic
  restartGame() {
    this.cards = Array.apply(null, { length: 52 }).map(Number.call, Number);
    this.cards.sort(() => Math.random() - 0.5);
    this.cardsOrdered = this.cards.slice();
    this.showRestartBtn = false;
    this.isNewGame = true;
  }

}
