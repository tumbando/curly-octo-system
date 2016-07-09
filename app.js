$(document).ready(function(evt){
  $('#field').on('click', function(){
    $('.settingMenu img').addClass('hidden');
    $('#setting1').removeClass('hidden');
  });
  $('#castle').on('click', function(){
    $('.settingMenu img').addClass('hidden');
    $('#setting2').removeClass('hidden');
  });
  $('#volcano').on('click', function(){
    $('.settingMenu img').addClass('hidden');
    $('#setting3').removeClass('hidden');
  });
  $('#wizard').on('click', function(){
    $('.charMenu img').addClass('hidden');
    $('#char1').removeClass('hidden');
  });
  $('#knight').on('click', function(){
    $('.charMenu img').addClass('hidden');
    $('#char2').removeClass('hidden');
  });
  $('#ranger').on('click', function(){
    $('.charMenu img').addClass('hidden');
    $('#char3').removeClass('hidden');
  });
  $('#troll').on('click', function(){
    $('.oppMenu img').addClass('hidden');
    $('#opp1').removeClass('hidden');
  });
  $('#dragon').on('click', function(){
    $('.oppMenu img').addClass('hidden');
    $('#opp2').removeClass('hidden');
  });
  $('#unicorn').on('click', function(){
    $('.oppMenu img').addClass('hidden');
    $('#opp3').removeClass('hidden');
  });
  });

console.log('hi');

var username = '';
var compname = 'Evil Dude';
var player = new Character (username, characterType);
var enemy = new Character (compname, characterType);

function Character (name, characterType) {

    this.username = name;
    this.characterType = characterType;

    if (this.characterType === 'wizard') {
      this.atkPwr = 10;
      this.magicPwr = 40;
      this.hp = 100;
      this.armor = 0;
      this.critChance = 0;
      this.evasion = 20;
    } else if (this.characterType === 'knight') {}
    else if (this.characterType === 'ranger') {}
    else if (this.characterType === 'troll') {}
    else if (this.characterType === 'dragon') {}
    else if (this.characterType === 'unicorn') {}
}

Character.prototype.attack = function (target) {};
Character.prototype.spell = function (target) {};
Character.prototype.taunt = function (target) {};

//arguments will be player.hp and enemy.hp
function gameEnd (playerHp, enemyHp) {

}
