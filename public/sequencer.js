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
var chordThree = new Howl({
  src: ['sounds/chord3.wav']
});
var chordFour = new Howl({
  src: ['sounds/chord4.wav']
});

var rowCreator = function(yCoord, sound){
	for(var x = 35; x < 1235; x+= 75){

		var stepRect = new Path.Rectangle({
			point: [x,yCoord],
			size: [50,80.9],
			fillColor: '#30323D',
			strokeColor: '#E1F2FE',
			toggle: false,
			sound: sound


		})
		stepRect.onClick = function(e){
			if (this.toggle === false){
				this.fillColor = '#ADFCF9';
				this.toggle = true;
				this.sound.play();
			} else {
				this.fillColor = '#30323D';
				this.toggle = false;
			}
		}
	}
}

var kickRow = rowCreator(35, kick);
var clapRow = rowCreator(135, clap);
var hatRow = rowCreator(235, hat);
var chordRow = rowCreator(335, chord);


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
		}
	};
console.log('we out here')