var characterClassSelect = '';
var characterName = '';
var battleground = '';
var enemyType = '';
var player = {};
var enemy = {};
var enemyNameList = ['Zorlon','Glabalko','Schmirzz','Krul\'Nogath','Big-Ugly','Rogmler','Aarthunorax','Vin-Petryl','Clagarathon','Xanthorq'];
var tauntList = ['You will never defeat me, ','I will destroy you, ','You are too weak, ','You smell like a giant rat, ','Everything you have ever known will be crushed!','I could kill you with one hand tied behind my back!','Is that all you\'ve got?','Ha ha ha ha ha ha ha!','Your face looks like a grease fire!','I haven\'t even broken a sweat yet!'];

// DOM elements
var $startButton = $('.startgame');
var $optionMenu = $(".option-list ul");
var $playerSprite = $(".playerSprite");
var $playerNameTag = $(".playerStat p");
var $playerHealth = $(".playerStat .healthBar .health");
var $enemySprite = $(".enemySprite");
var $enemyNameTag = $(".enemyStat p");
var $enemyHealth = $(".enemyStat .healthBar .health");
var $message = $(".option-list p");
var $options = $(".option");

$(document).ready(function(evt){
// <<<<<<< HEAD
  $('#field').on('click', function(){
    $('.settingMenu img').addClass('hidden');
    $('#setting1').removeClass('hidden');
    battleground = 'images/field.gif';
  });
  $('#castle').on('click', function(){
    $('.settingMenu img').addClass('hidden');
    $('#setting2').removeClass('hidden');
    battleground = 'images/castle.gif';
  });
  $('#volcano').on('click', function(){
    $('.settingMenu img').addClass('hidden');
    $('#setting3').removeClass('hidden');
    battleground = 'images/volcano.gif';
  });
  $('#wizard').on('click', function(){
    $('.charMenu img').addClass('hidden');
    $('#char1').removeClass('hidden');
    characterClassSelect = 'wizard';
  });
  $('#knight').on('click', function(){
    $('.charMenu img').addClass('hidden');
    $('#char2').removeClass('hidden');
    characterClassSelect = 'knight';
  });
  $('#ranger').on('click', function(){
    $('.charMenu img').addClass('hidden');
    $('#char3').removeClass('hidden');
    characterClassSelect = 'ranger';
  });
  $('#troll').on('click', function(){
    $('.oppMenu img').addClass('hidden');
    $('#opp1').removeClass('hidden');
    enemyType = 'troll';
  });
  $('#dragon').on('click', function(){
    $('.oppMenu img').addClass('hidden');
    $('#opp2').removeClass('hidden');
    enemyType = 'dragon';
  });
  $('#unicorn').on('click', function(){
    $('.oppMenu img').addClass('hidden');
    $('#opp3').removeClass('hidden');
    enemyType = 'unicorn';
  });
// =======
  $('#wizard').on('click', function(){
    $('.charMenu img').slideUp();
    $('#char1').slideDown();
  });
  $('#knight').on('click', function(){
    $('.charMenu img').slideUp();
    $('#char2').slideDown();
  });
  $('#ranger').on('click', function(){
    $('.charMenu img').slideUp();
    $('#char3').slideDown('hidden');
  });
  $('#waterfall').on('click', function(){
    $('.settingMenu img').slideUp();
    $('#setting1').slideDown();
  });
  $('#castle').on('click', function(){
    $('.settingMenu img').slideUp();
    $('#setting2').slideDown();
  });
  $('#volcano').on('click', function(){
    $('.settingMenu img').slideUp();
    $('#setting3').slideDown();
  });
  $('#troll').on('click', function(){
    $('.oppMenu img').slideUp();
    $('#opp1').slideDown();
  });
  $('#dragon').on('click', function(){
    $('.oppMenu img').slideUp();
    $('#opp2').slideDown();
  });
  $('#unicorn').on('click', function(){
    $('.oppMenu img').slideUp();
    $('#opp3').slideDown();
// >>>>>>> 934373faa7e4922ea39f6e67f92a0293f0760e1b
  });
});

$startButton.click(function(){
    $('.introScreen').addClass('hidden');
    $('.battle-page').removeClass('hidden');
    var tempName = String($('#enterName')[0].value);
    var enemyTemp = new Character (enemyNameGenerator(), enemyType, $enemySprite, $enemyNameTag, $enemyHealth);
    var playerTemp = new Character (tempName, characterClassSelect, $playerSprite, $playerNameTag, $playerHealth);
    enemy = enemyTemp;
    player = playerTemp;
    $('.battle-page').css("background-image", 'url("' + battleground + '")');
});

// listener for attack/spell/taunt
$options.on("click", function(evt){
  playTurn(evt.target);
});

function playTurn(option){
  $optionMenu.addClass("hidden");
  if (option.textContent === "Attack"){
    $message.text(player.attack(enemy));
  } else if (option.textContent === "Spell") {
    $message.text(player.spell(enemy));
  } else {
    $message.text(player.taunt(enemy));
  }
  // will add a few second animation (maybe target flashes red)
  gameEnd(enemy.hp);
  $message.text(enemy.enemyAI(player));

  // will add a few second animation
  gameEnd(player.hp);

  $optionMenu.removeClass("hidden");
}

function enemyNameGenerator () {
    var randInt = Math.floor(Math.random()*10);
    return enemyNameList[randInt];
}
function Character (name, characterType, spriteElement, nameTag, healthBar) {

    this.username = name + ' the ' + characterType;
    this.characterType = characterType;
    if (this.characterType === 'wizard') {
        this.atkPwr = 10;
        this.magicPwr = 12;
        this.maxHP = 500;
        this.hp = 500;
        this.armor = 0;
        this.critChance = 0;
        this.evasion = 40;
        this.sprite = "images/wizard.gif";
    } else if (this.characterType === 'knight') {
        this.atkPwr = 70;
        this.magicPwr = 2;
        this.maxHP = 700;
        this.hp = 700;
        this.armor = 40;
        this.critChance = 5;
        this.evasion = 10;
        this.sprite = "images/knight.gif";
    } else if (this.characterType === 'ranger') {
        this.atkPwr = 50;
        this.magicPwr = 6;
        this.maxHP = 600;
        this.hp = 600;
        this.armor = 20;
        this.critChance = 10;
        this.evasion = 20;
        this.sprite = "images/archer.gif";
    } else if (this.characterType === 'troll') {
        this.atkPwr = 70;
        this.magicPwr = 1;
        this.maxHP = 1500;
        this.hp = 1500;
        this.armor = 0;
        this.critChance = 5;
        this.evasion = 0;
        this.sprite = "images/troll.png";
      } else if (this.characterType === 'dragon') {
        this.atkPwr = 50;
        this.magicPwr = 8;
        this.maxHP = 1000;
        this.hp = 1000;
        this.armor = 40;
        this.critChance = 5;
        this.evasion = 0;
        this.sprite = "images/dragon.gif";
      } else if (this.characterType === 'unicorn') {
        this.atkPwr = 0;
        this.magicPwr = 24;
        this.maxHP = 800;
        this.hp = 800;
        this.armor = 0;
        this.critChance = 0;
        this.evasion = 50;
        this.sprite = "images/unicorn.gif";
      }

    this.spriteElement = spriteElement;
    this.spriteElement.attr("src", this.sprite);
    this.nameTag = nameTag;
    this.nameTag.text(this.username);
    this.healthBar = healthBar;
    this.healthBar.css("width", Math.ceil(this.hp / this.maxHP * 200));
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
      target.healthBar.css("width", Math.ceil(target.hp / target.maxHP * 200));
      return (this.username + ' struck a critical hit for ' + damage + ' damage!');
  } else {
      damage = (this.atkPwr + Math.floor(Math.random()*50)-target.armor);
      if (damage <=0) {damage = 0;}
      target.hp -= damage;
      target.healthBar.css("width", Math.ceil(target.hp / target.maxHP * 200));
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
          target.healthBar.css("width", Math.ceil(target.hp / target.maxHP * 200));
          return (this.username + ' cast a spell for ' + damage + ' damage!');
    }
};
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
