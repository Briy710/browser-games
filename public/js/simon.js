let game = { //game object
	level: 1,
	turn: 0,
	difficulty: 1,
	score: 0,
	active: false, //whether a turn is active or not
	handler: false, // whether the click and sound handlers are active
	shape: '.shape', // cached string for the pad class
	randomPads: [], //array containing the generated/randomized pads
	playSequence: [], //array containing the users pad selections

	init: function(){					//initialises the game
		if(this.handler === false){
			this.initPadHandler();
		}
		this.newGame();				//reset the game defaults
	},

	initPadHandler: function(){
		that = this;
		$('.pad').on('mouseup',function() {
			if(that.active===true) {
				let pad = parseInt($(this).data('pad'),10)
				that.flash($(this), 1, 300, pad)
				that.logPlayerSequence(pad)
			}
		})
		this.handler = true
	},

	newGame: function(){			//resets the game and generates/starts a new level
		this.level = 1
		this.score = 0
		this.newLevel()
		this.displayLevel()
		this.displayScore()
	},

	newLevel: function() {
		this.randomPads.length = 0
		this.playSequence.length = 0
		this.pos = 0
		this.turn = 0
		this.active = true

		this.randomizePad(this.level); //randomize pad with the correct amount of numbers for this level
		this.displaySequence(); //show the user the sequence
	},

	flash: function(element, flashes, speed, pad) {
    //function to make the pads appear to flash
		let that = this;

		if(flashes > 0) {							//make sure we are supposed to flash
			that.playSound(pad);				//play the corresponding pad sound
			element.stop().animate({opacity: '1'}, {		//animate the element to appear to flash
				duration: 50,
				complete: function() {
				element.stop().animate({opacity: '0.6'}, 200)
				}
			})

		}

		if (flashes > 0) {
      //call the flash function again until done the correct amount of times
			setTimeout(function () {
				that.flash(element, flashes, speed, pad);
			}, speed);
			flashes -= 1;						//times - 1 for each time it's called
		}
	},

	playSound: function(clip){
    //plays the sound that corresponds to the pad chosen
		let sound = $('.sound' + clip)[0]
		console.log(sound)
		console.log($('.sound' + clip))
		sound.currentTime = 0  //resets audio position to the start of the clip
		sound.play()
	},

	randomizePad: function(passes) {
    //generate random numbers and push them to the generated number array iterations determined by current level
		for(i = 0; i < passes; i++) {
			this.randomPads.push(Math.floor(Math.random() * 4) + 1)
		}
	},

	logPlayerSequence: function(pad) {
    //log the player selected pad to user array and call the checker function
		this.playSequence.push(pad);
		this.checkSequence(pad);
	},

	checkSequence: function(pad) {
    //checker function to test if the pad the user pressed was next in the sequence
		that = this
		if(pad !== this.randomPads[this.turn]) {
				this.incorrectSequence()
			} else {                     //if correct
				this.keepScore()					//update the score
				this.turn++       				//incrememnt the turn
			}

		if(this.turn === this.randomPads.length) {
      //if completed the whole sequence
			this.level++
			this.displayLevel()
			this.active = false
			setTimeout(function() {
				that.newLevel()
			}, 1000)
		}
	},

	displaySequence: function() {
    //display the generated sequence to the user
		let that = this
		$.each(this.randomPads, function(index, val) {
      //iterate over each value in the generated array
			setTimeout(function() {
				that.flash($(that.shape + val), 1, 300, val)
			}, 500 * index * that.difficulty)
  		// multiply timeout by how many items in the array so that they play sequentially and multiply by the difficulty modifier
		})
	},

	displayLevel: function() {
		$('.level h2').text('Level: '+this.level)
	},

	displayScore: function() {
		$('.score h2').text('Score: '+this.score)
	},

	keepScore: function() {
		let multiplier = 0
		switch(this.difficulty)	{
    				//choose points modifier based on difficulty
			case '2':
				multiplier = 1;
				break;
			case '1':
				multiplier = 2;
				break;
			case '0.5':
				multiplier = 3;
				break;
			case '0.25':
				multiplier = 4;
				break;
		}
		this.score += (1 * multiplier)					//work out the score
		this.displayScore()							//display score on screen
	},

	incorrectSequence: function() {		//if user makes a mistake
		let corPad = this.randomPads[this.turn],
    		//cache the pad number that should have been pressed
		  that = this;
			this.active = false
			this.displayLevel()
			this.displayScore()

		setTimeout(function() {
      //flash the pad 4 times that should have been pressed
			that.flash($(that.shape + corPad), 4, 300, corPad)
		}, 500)

		$('.start').show()
		$('.difficulty').show()
	}
}
$(function() {
	$('.start').on('mouseup', function() {	//initialise a game when the start button is clicked
		$(this).hide()
		game.difficulty = $('input[name=difficulty]:checked').val()
		$('.difficulty').hide()
		game.init()
	})
})
