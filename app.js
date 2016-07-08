
var username = '';
var compname = 'Evil Dude';
// var player = new Character (username, characterType);
// var enemy = new Character (compname, characterType);
var player = new Character ('duder', 'knight');
var enemy = new Character (enemyNameGenerator(), enemyTypeGenerator());

function enemyNameGenerator () {
    var randInt = Math.floor(Math.random()*10);
    if (randInt === 0){return 'Zorlon';}
    else if (randInt === 1){return 'Glabalko';}
    else if (randInt === 2){return 'Schmirzz';}
    else if (randInt === 3){return 'Krul\'Nogath';}
    else if (randInt === 4){return 'Big Ugly';}
    else if (randInt === 5){return 'Rogmler';}
    else if (randInt === 6){return 'Aarthunorax';}
    else if (randInt === 7){return 'Vin-Petryl';}
    else if (randInt === 8){return 'Clagarathon';}
    else if (randInt === 9){return 'Xanthorq';}
}
function enemyTypeGenerator () {
    var randInt = Math.floor(Math.random()*10);
    if (randInt <=4){return 'troll';}
    else if (randInt<=8){return 'dragon';}
    else if (randInt===9){return 'unicorn';}
}

function Character (name, characterType) {

    this.username = name;
    this.characterType = characterType;

    if (this.characterType === 'wizard') {
      this.atkPwr = 10;
      this.magicPwr = 90;
      this.hp = 500;
      this.armor = 0;
      this.critChance = 0;
      this.evasion = 30;
    } else if (this.characterType === 'knight') {
      this.atkPwr = 70;
      this.magicPwr = 0;
      this.hp = 700;
      this.armor = 20;
      this.critChance = 20;
      this.evasion = 10;
    }
    else if (this.characterType === 'ranger') {
      this.atkPwr = 40;
      this.magicPwr = 40;
      this.hp = 600;
      this.armor = 10;
      this.critChance = 10;
      this.evasion = 20;
    }
    else if (this.characterType === 'troll') {
      this.atkPwr = 50;
      this.magicPwr = 50;
      this.hp = 1500;
      this.armor = 0;
      this.critChance = 0;
      this.evasion = 0;
    }
    else if (this.characterType === 'dragon') {
      this.atkPwr = 10;
      this.magicPwr = 40;
      this.hp = 600;
      this.armor = 30;
      this.critChance = 10;
      this.evasion = 20;
    }
    else if (this.characterType === 'unicorn') {
      this.atkPwr = 100;
      this.magicPwr = 200;
      this.hp = 800;
      this.armor = 30;
      this.critChance = 50;
      this.evasion = 70;
    }
}

Character.prototype.attack = function (target) {
  var miss = Math.ceil(Math.random()*100);
  var crit = Math.ceil(Math.random()*100);
  var damage = 0;
  if (miss <= target.evasion) {
      damage = 0;
      console.log(this.username + ' miss');
  } else if (crit <= this.critChance) {
      damage = (this.atkPwr*3 + 50 - target.armor);
      console.log(this.username + ' crit');
  } else {
      damage = (this.atkPwr + Math.floor(Math.random()*50)-target.armor);
      console.log(this.username + ' hit');
  }
  console.log(damage);
  target.hp -= damage;
  console.log(target.hp);
};
Character.prototype.spell = function (target) {
    var damage = 0;

};
Character.prototype.taunt = function (target) {};

// arguments will be player.hp and enemy.hp
function gameEnd (playerHp, enemyHp) {

}

player.attack(enemy);
enemy.attack(player);
player.attack(enemy);
enemy.attack(player);
player.attack(enemy);
enemy.attack(player);
