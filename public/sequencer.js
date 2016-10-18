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
var text = new PointText(new Point(1316, 191));
text.content = 'MVBeat';
text.characterStyle = {
   fontSize: 35,
   fontFamily: 'Audiowide',
   fillColor: 'black',
};

var innerPlay;

 // setInterval(function(){
				
	// 		for(var i = 0; i < sounds.length; i++){	

	// 			if(sounds[i].rowIndex === currentCol){
	// 					sounds[i].strokeColor= '#EB4511';
	// 				} else {
	// 					sounds[i].strokeColor= '#E1F2FE';
	// 				}
	// 			}
	// 		},10)
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
			console.log('called interval')
				sounds.forEach(function(sound){
					if(sound.rowIndex === currentCol){
						sound.strokeColor= '#EB4511';
					}
					else{
						sound.strokeColor= '#E1F2FE';
					}
				})
				
				for(var i = 0; i < sounds.length; i++){					
					if(sounds[i].rowIndex === currentCol && sounds[i].toggle){

						sounds[i].sound.play();
					}
				}
				if (currentCol < 15){
					currentCol++;
				} else {currentCol = 0;}

				paper.project._needsUpdate = true;
    			paper.project.view.update();
				
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
var clhat = new Howl({
  src: ['sounds/clhat.wav']
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
		stepRect.onMouseDown = function(e){
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

var muteButtonMaker = function(yCoord, sound, row){
	var muteRect = new Path.Rectangle({
			point: [1245,yCoord],
			size: [50,80.9],
			fillColor: '#31D843',
			strokeColor: '#E1F2FE',
			strokeWidth: 3,
			muteToggle: false,
			sound: sound,
			mute: function(){
					for(var i = 0; i < sounds.length; i++){
						
						if (sounds[i].row === row){
							console.log(sounds[i].sound)
							sounds[i].sound._muted = true;
							this.fillColor = '#BCC1BA';
							if(sounds[i].toggle === true){
								sounds[i].fillColor = '#3066BE';
							} else {
								sounds[i].fillColor = '#BCC1BA';
							}
						}
					}
				},
			unmute: function(){
					for(var i = 0; i < sounds.length; i++){
						if (sounds[i].row === row){
							sounds[i].sound._muted = false;
							this.fillColor = '#31D843'
							if(sounds[i].toggle === true){
								sounds[i].fillColor = '#ADFCF9';
							} else {
								sounds[i].fillColor = '#30323D';
							}							
						}
					}
				},
		})
	muteRect.onMouseDown = function(e){
	if (this.muteToggle){
		this.unmute();
		this.muteToggle = false;
	} else{this.mute();
		this.muteToggle = true;
	}
}

}  


var kickRow = rowCreator(35, kick, 0);
var kickMute = muteButtonMaker(35, kick,  0);

var clapRow = rowCreator(135, clap, 1);
var clapMute = muteButtonMaker(135, clap, 1);

var hatRow = rowCreator(235, hat, 2);
var hatMute = muteButtonMaker(235, hat, 2);

var clHatRow = rowCreator(335, clhat, 3);
var clHatMute = muteButtonMaker(335, hat, 3);

var chordRow = rowCreator(435, chord, 4);
var chordMute = muteButtonMaker(435, chord, 4);

var chordTwoRow = rowCreator(535, chordTwo, 5);
var chordTwoMute = muteButtonMaker(535, chordTwo, 5);

var bassRow = rowCreator(635, bass, 6);
var bassMute = muteButtonMaker(635, bass, 6);

var stab = rowCreator(735, stab, 7);
var stabMute = muteButtonMaker(735, stab, 7);

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
var playButton = new Path.RegularPolygon({
    center: [1395,85],
    sides: 3,
    radius: 40,
	fillColor: '#30323D',
	strokeColor: '#E1F2FE',
	strokeWidth: 3
});

playButton.rotate(90);

playButton.onMouseDown = function(e){
	playState = !playState;
	console.log('clicked')
	if(playState){
		this.fillColor = '#31D843'
		play();
	} else {
		this.fillColor = '#30323D';
		stop();
		currentCol = 0;
	}

}


