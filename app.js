//GAME LOGIC STUFF:
//NEED: Add input functions that will gather arguments to build var player (username, characterType)
//NEED: Add click event handlers that call functions, see below for details
var enemyNameList = ['Zorlon','Glabalko','Schmirzz','Krul\'Nogath','Big-Ugly','Rogmler','Aarthunorax','Vin-Petryl','Clagarathon','Xanthorq'];
var tauntList = ['You will never defeat me, ','I will destroy you, ','You are too weak, ','You smell like a giant rat, ','Everything you have ever known will be crushed!','I could kill you with one hand tied behind my back!','Is that all you\'ve got?','Ha ha ha ha ha ha ha!','Your face looks like a grease fire!','I haven\'t even broken a sweat yet!'];
// Collect this variable below:
// var player = new Character (username, characterType);

// enemy name/type is generated every time
var enemy = new Character (enemyNameGenerator(), enemyTypeGenerator());

function enemyNameGenerator () {
    var randInt = Math.floor(Math.random()*10);
    return enemyNameList[randInt];
}
function enemyTypeGenerator () {
    var randInt = Math.floor(Math.random()*10);
    if (randInt <=4){return 'troll';}
    else if (randInt<=7){return 'dragon';}
    else if (randInt>=8){return 'unicorn';}
}
function Character (name, characterType) {

    this.username = name + ' the ' + characterType;
    this.characterType = characterType;

    if (this.characterType === 'wizard') {
      this.atkPwr = 10;
      this.magicPwr = 12;
      this.hp = 500;
      this.armor = 0;
      this.critChance = 0;
      this.evasion = 40;
    } else if (this.characterType === 'knight') {
      this.atkPwr = 70;
      this.magicPwr = 2;
      this.hp = 700;
      this.armor = 40;
      this.critChance = 5;
      this.evasion = 10;
    }
    else if (this.characterType === 'ranger') {
      this.atkPwr = 50;
      this.magicPwr = 6;
      this.hp = 600;
      this.armor = 20;
      this.critChance = 10;
      this.evasion = 20;
    }
    else if (this.characterType === 'troll') {
      this.atkPwr = 70;
      this.magicPwr = 1;
      this.hp = 1500;
      this.armor = 0;
      this.critChance = 5;
      this.evasion = 0;
    }
    else if (this.characterType === 'dragon') {
      this.atkPwr = 50;
      this.magicPwr = 8;
      this.hp = 1000;
      this.armor = 40;
      this.critChance = 5;
      this.evasion = 0;
    }
    else if (this.characterType === 'unicorn') {
      this.atkPwr = 0;
      this.magicPwr = 24;
      this.hp = 800;
      this.armor = 0;
      this.critChance = 0;
      this.evasion = 50;
    }
}
//This function will have to do more, change the screen or something like that.
function gameEnd (currentHp) {
    if (currentHp <= 0) {
      if (player.hp >= enemy.hp) {
        console.log('You Win!');
      } else {
        console.log('You Died!');
      }
    }
}
Character.prototype.attack = function (target) {
  var miss = Math.ceil(Math.random()*100);
  var crit = Math.ceil(Math.random()*100);
  var damage = 0;
  if (miss <= target.evasion) {
      damage = 0;
      return (this.username + ' missed!');
  } else if (crit <= this.critChance) {
      damage = (this.atkPwr*3 + 50 - target.armor);
      target.hp -= damage;
      return (this.username + ' struck a critical hit for ' + damage + ' damage!');
  } else {
      damage = (this.atkPwr + Math.floor(Math.random()*50)-target.armor);
      if (damage <=0) {damage = 0;}
      target.hp -= damage;
      return (this.username + ' attacked for ' + damage + ' damage!');
  }
};
Character.prototype.spell = function (target) {
    var damage = 0;
    var miss = Math.ceil(Math.random()*100);
    if (miss <= target.evasion) {
        damage = 0;
        return (this.username + ' missed!');
    } else {
          damage = this.magicPwr * Math.ceil(Math.random()*12);
          target.hp -= damage;
          return (this.username + ' cast a spell for ' + damage + ' damage!');
    }
};
//This function calls upon the variable defined up top with a lot of taunt phrases. Some of them use the target name. Feel free to change these if you want!
Character.prototype.taunt = function (target) {
    var randInt = Math.floor(Math.random()*10);
    if (randInt <= 3) {
      return (this.username + ' says: ' + tauntList[randInt] + target.username + '!');
    } else {
      return (this.username + ' says: ' + tauntList[randInt]);
    }
};
Character.prototype.enemyAI = function() {
    var randInt = Math.floor(Math.random()*10);
    if (this.characterType === 'troll') {
      if (randInt <=2 ) {
        return this.taunt(player);
      } else if (randInt <=8 ){
        return this.attack(player);
      } else {
        return this.spell(player);
      }
    } else if (this.characterType === 'dragon') {
      if (randInt <=1 ) {
        return this.taunt(player);
      } else if (randInt <=4 ){
        return this.attack(player);
      } else {
        return this.spell(player);
      }
    } else if (this.characterType === 'unicorn') {
      if (randInt <=3 ) {
        return this.taunt(player);
      } else if (randInt <=4 ){
        return this.attack(player);
      } else {
        return this.spell(player);
      }
    }
};

// SEE BELOW: These are the event listeners I used to test, added in 3 dummy buttons for 3 different actions - attack, spell and taunt.
// See the console.log commands to check out the string texts the functions return - I think it's also a good idea to keep track of hp, whether that's going to be with the health bar or simply informing the user.
// var atk = document.getElementById('#atk');
// var mag = document.getElementById('#mag');
// var tnt = document.getElementById('#tnt');
// atk.addEventListener('click',function(){
//   console.log(player.attack(enemy));
//   console.log(enemy.username + ' has ' + enemy.hp + ' left!');
//   gameEnd(enemy.hp);
//   console.log(enemy.enemyAI(player));
//   console.log(player.username + ' has ' + player.hp + ' left!');
//   gameEnd(player.hp);
// });
// mag.addEventListener('click',function(){
//   console.log(player.spell(enemy));
//   console.log(enemy.username + ' has ' + enemy.hp + ' left!');
//   gameEnd(enemy.hp);
//   console.log(enemy.enemyAI(player));
//   console.log(player.username + ' has ' + player.hp + ' left!');
//   gameEnd(player.hp);
// });
// tnt.addEventListener('click',function(){
//   console.log(player.taunt(enemy));
//   console.log(enemy.username + ' has ' + enemy.hp + ' left!');
//   gameEnd(enemy.hp);
//   console.log(enemy.enemyAI(player));
//   console.log(player.username + ' has ' + player.hp + ' left!');
//   gameEnd(player.hp);
// });
