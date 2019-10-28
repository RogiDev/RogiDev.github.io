new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: []
  },
  methods: {
    startGame: function() {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
    },
    attack: function() {
      let dmg = this.calculateDmg(2, 10);
      this.turns.unshift({isPlayer: true, text: `You Hit The Monster With ${dmg} Damage`});
      this.monsterHealth -= dmg;
      this.monsterAttack();
      this.checkIfWon();

    },
    spacialAttack: function() {
      let dmg = this.calculateDmg(5, 15);
      this.turns.unshift({isPlayer: true, text: `You Hit The Monster Hard With ${dmg} Damage`});
      this.monsterHealth -= dmg;
      this.monsterAttack();
      this.checkIfWon();

    },
    heal: function() {
      let elixer = this.calculateDmg(1, 10);
      this.playerHealth += elixer;
      this.turns.unshift({isPlayer: true, text: `You Heal Yourself With ${elixer} HP`});
      if (this.playerHealth >= 100) {
        this.playerHealth = 100;
      }
      this.monsterAttack();
      this.checkIfWon();
    },
    giveUp: function() {
      if (confirm('Do You Want To Give Up?')) {
        this.gameIsRunning = false;
        this.playerHealth = 100;
        this.monsterHealth = 100;
        this.turns = [];
      } else {
        this.gameIsRunning = true;
      }
      return;
    },

    calculateDmg: function(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },

    checkIfWon: function() {
      if (this.monsterHealth < 1) {
        alert('You Won The Monster');
        this.gameIsRunning = false;
        this.playerHealth = 100;
        this.monsterHealth = 100;
        this.turns = [];
        return;
      } else if (this.playerHealth < 1) {
        alert('You Have Been Defeated');
        this.gameIsRunning = false;
        this.playerHealth = 100;
        this.monsterHealth = 100;
        this.turns = [];
        return;
      }
    },
    monsterAttack: function() {
      let dmg = this.calculateDmg(4, 12);
      this.playerHealth -= dmg;
      this.turns.unshift({
        isPlayer: false,
         text: `Monster Hit You With ${dmg} Damage`
       });

    }

  }
});
