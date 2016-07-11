var characterClassSelect = 'knight';
var battleground = 'images/castle.gif';
var enemyType = 'dragon';
var player = {};
var enemy = {};
var enemyNameList = ['Zorlon','Glabalko','Schmirzz','Krul\'Nogath','Big-Ugly','Rogmler','Aarthunorax','Vin-Petryl','Clagarathon','Xanthorq'];
var tauntList = ['You will never defeat me, ','I will destroy you, ','You are too weak, ','You smell like a giant rat, ','Everything you have ever known will be crushed!','I could kill you with one hand tied behind my back!','Is that all you\'ve got?','Ha ha ha ha ha ha ha!','Your face looks like a grease fire!','I haven\'t even broken a sweat yet!'];

// DOM elements/sound effects
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
var hitSound = new Audio("images/hit.wav");
var attackSound = new Audio("images/attack.wav");
var spellSound = new Audio("images/spell.wav");

$(document).ready(function(evt){
  $('#waterfall').on('click', function(){
    $('.settingMenu img').addClass('hidden');
    $('#setting1').removeClass('hidden');
    battleground = 'images/waterfall.gif';

    $('.settingMenu img').slideUp(0);
    $('#setting1').slideDown();
  });
  $('#castle').on('click', function(){
    $('.settingMenu img').addClass('hidden');
    $('#setting2').removeClass('hidden');
    battleground = 'images/castle.gif';

    $('.settingMenu img').slideUp(0);
    $('#setting2').slideDown();
  });
  $('#volcano').on('click', function(){
    $('.settingMenu img').addClass('hidden');
    $('#setting3').removeClass('hidden');
    battleground = 'images/volcano.gif';

    $('.settingMenu img').slideUp(0);
    $('#setting3').slideDown();
  });
  $('#wizard').on('click', function(){
    $('.charMenu img').addClass('hidden');
    $('#char1').removeClass('hidden');
    characterClassSelect = 'wizard';

    $('.charMenu img').slideUp(0);
    $('#char1').slideDown();
  });
  $('#knight').on('click', function(){
    $('.charMenu img').addClass('hidden');
    $('#char2').removeClass('hidden');
    characterClassSelect = 'knight';

    $('.charMenu img').slideUp(0);
    $('#char2').slideDown();
  });
  $('#ranger').on('click', function(){
    $('.charMenu img').addClass('hidden');
    $('#char3').removeClass('hidden');
    characterClassSelect = 'ranger';

    $('.charMenu img').slideUp(0);
    $('#char3').slideDown();
  });
  $('#troll').on('click', function(){
    $('.oppMenu img').addClass('hidden');
    $('#opp1').removeClass('hidden');
    enemyType = 'troll';

    $('.oppMenu img').slideUp(0);
    $('#opp1').slideDown();
  });
  $('#dragon').on('click', function(){
    $('.oppMenu img').addClass('hidden');
    $('#opp2').removeClass('hidden');
    enemyType = 'dragon';

    $('.oppMenu img').slideUp(0);
    $('#opp2').slideDown();
  });
  $('#unicorn').on('click', function(){
    $('.oppMenu img').addClass('hidden');
    $('#opp3').removeClass('hidden');
    enemyType = 'unicorn';

    $('.oppMenu img').slideUp(0);
    $('#opp3').slideDown();
  });
  $('.results button').on("click", function(){
    $(".result-page").addClass("hidden");
    $(".introScreen").removeClass("hidden");
  });
});

$startButton.click(function(){
    $('.introScreen').addClass('hidden');
    $('.battle-page').removeClass('hidden');
    var tempName = String($('#enterName')[0].value) || 'Everyman';
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
  $message.removeClass("hidden");
  if (option.textContent === "Attack"){
    playerAttackAnimation(player.spriteElement[0]);
    $message.text(player.attack(enemy));
  } else if (option.textContent === "Spell") {
    playerAttackAnimation(player.spriteElement[0]);
    $message.text(player.spell(enemy));
  } else {
    $message.text(player.taunt(enemy));
  }
  // will add a few second animation (maybe target flashes red)

  setTimeout(function(){
    gameEnd(enemy.hp);
    $message.text(enemy.enemyAI(player));
  }, 3000);

  // will add a few second animation
  setTimeout(function(){
    gameEnd(player.hp);
    $message.addClass("hidden");
    $optionMenu.removeClass("hidden");
  }, 6000);

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
function gameEnd (currentHp) {
    if (currentHp <= 0) {
      $(".battle-page").addClass("hidden");
      $(".result-page").removeClass("hidden");
      if (player.hp >= enemy.hp) {
        $(".results h1").text("You Win!");
      } else {
        $(".results h1").text("You Lose!");
      }
    }
}
function playerAttackAnimation(element){
  if (element.style.webkitAnimationName !== "playerAttack"){
    element.style.webkitAnimationName = "playerAttack";
    element.style.webkitAnimationDuration = "0.2s";
    setTimeout(function() {
      element.style.webkitAnimationName = "";
    }, 200);
  }
}

function enemyAttackAnimation(element){
  if (element.style.webkitAnimationName !== "enemyAttack"){
    element.style.webkitAnimationName = "enemyAttack";
    element.style.webkitAnimationDuration = "0.2s";
    setTimeout(function() {
      element.style.webkitAnimationName = "";
    }, 200);
  }
}

function flicker(element){
  if (element.style.webkitAnimationName !== "flicker"){
    hitSound.play(); // happens every time a character is hit
    element.style.webkitAnimationName = "flicker";
    element.style.webkitAnimationDuration = "0.5s";
    setTimeout(function() {
      element.style.webkitAnimationName = "";
    }, 500);
  }
}

Character.prototype.attack = function (target) {
  var miss = Math.ceil(Math.random()*100);
  var crit = Math.ceil(Math.random()*100);
  var damage = 0;
  attackSound.play();
  if (miss <= target.evasion) {
      damage = 0;
      return (this.username + ' missed!');
  } else if (crit <= this.critChance) {
      damage = (this.atkPwr*3 + 50 - target.armor);
      target.hp -= damage;
      target.healthBar.css("width", Math.ceil(target.hp / target.maxHP * 200));
      flicker(target.spriteElement[0]);
      return (this.username + ' struck a critical hit for ' + damage + ' damage!');
  } else {
      damage = (this.atkPwr + Math.floor(Math.random()*50)-target.armor);
      if (damage <=0) {damage = 0;}
      target.hp -= damage;
      target.healthBar.css("width", Math.ceil(target.hp / target.maxHP * 200));
      flicker(target.spriteElement[0]);
      return (this.username + ' attacked for ' + damage + ' damage!');
  }
};
Character.prototype.spell = function (target) {
    var damage = 0;
    var miss = Math.ceil(Math.random()*100);
    spellSound.play();
    if (miss <= target.evasion) {
        damage = 0;
        return (this.username + ' missed!');
    } else {
          damage = this.magicPwr * Math.ceil(Math.random()*12);
          target.hp -= damage;
          target.healthBar.css("width", Math.ceil(target.hp / target.maxHP * 200));
          flicker(target.spriteElement[0]);
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
        enemyAttackAnimation(this.spriteElement[0]);
        return this.attack(player);
      } else {
        enemyAttackAnimation(this.spriteElement[0]);
        return this.spell(player);
      }
    } else if (this.characterType === 'dragon') {
      if (randInt <=1 ) {
        return this.taunt(player);
      } else if (randInt <=4 ){
        enemyAttackAnimation(this.spriteElement[0]);
        return this.attack(player);
      } else {
        enemyAttackAnimation(this.spriteElement[0]);
        return this.spell(player);
      }
    } else if (this.characterType === 'unicorn') {
      if (randInt <=3 ) {
        return this.taunt(player);
      } else if (randInt <=4 ){
        enemyAttackAnimation(this.spriteElement[0]);
        return this.attack(player);
      } else {
        enemyAttackAnimation(this.spriteElement[0]);
        return this.spell(player);
      }
    }
};
