/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var main = __webpack_require__(1);

	var cardImages = [];
	var promises = [];
	var numCards = 10;

	for (var i=0; i<numCards; i++){
	  promises.push(main.retrieveImage());
	}

	Promise.all(promises).then(function(imageArrays){
	  imageArrays.map(function(elem){
	    cardImages.push(main.handleImage(elem));
	  });
	  main.elmiminateDuplicateArrayElements(cardImages);
	  cardImages = cardImages.concat(cardImages);
	  
	});

	// TODO: get n/2 unique images
	// TODO: concat the array with copy of itself
	// TODO: shuffle the array for randomness
	// TODO: create cards with image on flip slide
	// TODO: add click events to each card
	// TODO: show all images to begin the game
	// TODO: hide all images to start the game
	// TODO: when two images are revealed check to see if they are equal
	// TODO: hide pair of images if they don't match
	// TODO: increment score as needed
	// TODO: end game when all images are revealed


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = {
	  createCard: function(selector){
	    $(selector).append('<div class="container"><div class="card"><div\
	     class="face front">Front</div><div class="face back"></div></div></div>');
	  },

	  insertCards: function(count){
	    for (var i=0; i<count; i=i+1){
	      createCard($('.main'));
	    }
	    return $('.main');
	  },

	  addImageToCard: function(data){
	    $('.back:last').append($('<img>').attr('src', data));
	  },

	  retrieveImage: function(){
	    return new Promise(function(succeed, fail){
	      var req = new XMLHttpRequest();
	      req.responseType = 'arraybuffer';
	      req.open('GET', 'http://lorempixel.com/70/70/', true);
	      req.onload = function(){
	        if (req.status < 400) {
	          succeed(req.response);
	        } else {
	          fail(new Error('Request failed: ' + req.statusText));
	        }
	      };
	      req.addEventListener('error', function(){
	        fail(new Error('Network error'));
	      });
	      req.send(null);
	    });
	  },

	  handleImage: function(text){
	    var arr = new Uint8Array(text);
	    var raw = String.fromCharCode.apply(null, arr);
	    var b64 = btoa(raw);
	    var dataURL='data:image/jpeg;base64,'+b64;
	    return dataURL;
	  },

	  addClickEventListener: function(target, cssClass){
	      // usage addClickEventListener('.card', 'flip')
	      $(target).click(function(){
	        $(this).toggleClass(cssClass);
	      });
	  },

	  elmiminateDuplicateArrayElements: function(arr){
	    var result = [];
	    arr.map(function(elem){
	      if (result.indexOf(elem)===-1) result.push(elem);
	    });
	    return result;
	  },

	  shuffleArrayElements: function(array){
	    for (var i = array.length - 1; i > 0; i--) {
	      var j = Math.floor(Math.random() * (i + 1));
	      var temp = array[i];
	      array[i] = array[j];
	      array[j] = temp;
	    }
	    return array;
	  }
	};


/***/ }
/******/ ]);