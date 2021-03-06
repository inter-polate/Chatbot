let bot = new RiveScript();

const brains = [
  './substitutions.rive',
  './brain.rive',
  './human-machine.rive',
  './letterpress.rive',
  './punchcard.rive',
  './chip.rive',
  './image-sound.rive',
  './hard-drive.rive',
  './sorry.rive'
];
bot.loadFile(brains).then(botReady).catch(botNotReady);

const message_container = document.querySelector('.messages');
const form = document.querySelector('form');
const input_box = document.querySelector('input');
form.addEventListener('submit', (e) => {
 e.preventDefault();
 selfReply(input_box.value);
 input_box.value = '';
});
function botReply(message){
 message_container.innerHTML += `<div class="bot">${message}</div>`;
 location.href = '#edge';
 input_box.focus();
}
function selfReply(message){
 message_container.innerHTML += `<div class="self">${message}</div>`;
 location.href = '#edge';

 bot.reply("local-user", message).then(function(reply) {
   timeoutAmt = reply.length * 10;
   setTimeout(() => botReply(reply), timeoutAmt);
 });
}
function botReady(){
 bot.sortReplies();
 botReply('Hello');
}
function botNotReady(err){
 console.log("An error has occurred.", err);
}
