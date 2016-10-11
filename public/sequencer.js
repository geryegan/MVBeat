var sounds = [];
var currentCol = 0;
var playState = false;
var targetLine = new Path.Line({
    from: [20, 20],
    to: [20, 835],
    strokeColor: '#EB4511',
    strokeWidth: 10
})
var destLine = new Path.Line({
    from: [1228, 20],
    to: [1228, 835],
    strokeColor: '#EB4511',
    strokeWidth: 10
})

var innerPlay;

 setInterval(function(){
				
			for(var i = 0; i < sounds.length; i++){	

				if(sounds[i].rowIndex === currentCol){
						sounds[i].strokeColor= '#EB4511';
					} else {
						sounds[i].strokeColor= '#E1F2FE';
					}
				}
			},10)
console.log(sounds);
var muteRow = function(sound){
	for(var i = 0; i < sounds.length; i++){
		if (sounds[i].sound === sound){
			sounds[i].sound.mute = true;
		}
	}
}
var unmuteRow = function(sound){
	for(var i = 0; i < sounds.length; i++){
		if (sounds[i].sound === sound){
			sounds[i].sound.mute = false;
		}
	}
}
var play = function(){

	
	innerPlay = setInterval(function(){
				
				for(var i = 0; i < sounds.length; i++){	

					if(sounds[i].rowIndex === currentCol){
						sounds[i].strokeColor= '#EB4511';
					}
					else{
						sounds[i].strokeColor= '#E1F2FE';
					}
				
				
					if(sounds[i].rowIndex === currentCol && sounds[i].toggle){
						
						sounds[i].sound.play();
					}
				}
				if (currentCol < 15){
					currentCol++;
				} else {currentCol = 0;}
			}, 125);
		
	}
var stop = function(){
	clearInterval(innerPlay);
}
var kick = new Howl({
  src: ['sounds/bigkik.wav']
});	
var hat = new Howl({
  src: ['sounds/hat.wav']
});	
var clap = new Howl({
  src: ['sounds/clap.wav']
});
var stab = new Howl({
  src: ['sounds/stab.wav']
});
var chord = new Howl({
  src: ['sounds/chord.wav']
});	
var chordTwo = new Howl({
  src: ['sounds/chord2.wav']
});
var bass = new Howl({
  src: ['sounds/bass.wav']
});


var rowCreator = function(yCoord, sound, row){
	var rowIndex = 0;
	for(var x = 35; x < 1235; x+= 75){
		
		var stepRect = new Path.Rectangle({
			point: [x,yCoord],
			size: [50,80.9],
			fillColor: '#30323D',
			strokeColor: '#E1F2FE',
			strokeWidth: 3,
			toggle: false,
			sound: sound,
			current: false,
			rowIndex: rowIndex,
			row: row
		})
		
		sounds.push(stepRect);
		rowIndex++;
		stepRect.onClick = function(e){
			if (this.toggle === false){
				this.fillColor = '#ADFCF9';
				this.toggle = true;
				if(playState === false){
					this.sound.play();
				}
				console.log(this.rowIndex);
			} else {
				this.fillColor = '#30323D';
				this.toggle = false;
			}
		}
	}
}

var kickRow = rowCreator(35, kick,0);
var clapRow = rowCreator(135, clap,1);
var hatRow = rowCreator(235, hat,2);
var chordRow = rowCreator(335, chord,3);
var chordTwoRow = rowCreator(435, chordTwo,4);
var bassRow = rowCreator(535, bass,5);
var stab = rowCreator(635, stab,6);

var muteRect = new Path.Rectangle({
			point: [1245,35],
			size: [50,80.9],
			fillColor: '#31D843',
			strokeColor: '#E1F2FE',
			strokeWidth: 3,
			muteToggle: false,
			sound: kick,
			mute: function(){
					for(var i = 0; i < sounds.length; i++){
						
						if (sounds[i].row === 0){
							sounds[i].sound.mute([true]);
							this.fillColor = '#BCC1BA'
						}
					}
				},
			unmute: function(){
					for(var i = 0; i < sounds.length; i++){
						if (sounds[i].row === 0){
							sounds[i].sound.mute([false]);
							this.fillColor = '#31D843'
						}
					}
				},
		})

muteRect.onClick = function(e){
	if (this.muteToggle){
		this.unmute();
		this.muteToggle = false;
	} else{this.mute();
		this.muteToggle = true;
	}
}

	function onKeyDown(event){

		if (event.key === 'a'){
			kick.play();
		}	
		else if (event.key === 'f'){
			hat.play();
		}
		else if (event.key === 'd'){
			clap.play();
		}
		else if (event.key === 'c'){
			stab.play();
		}
		else if (event.key === 'v'){
			chord.play();
		}		
		else if (event.key === 'b'){
			chordTwo.play();
		}
		else if (event.key === 'm'){
			chordThree.play();
		}		
		else if (event.key === 'n'){
			chordFour.play();
		} else if (event.key === 'p'){
			playState = !playState;

			if(playState){
				play();
			} else {
				stop();
				currentCol = 0;
			}

		}
	};
console.log('we out here')



