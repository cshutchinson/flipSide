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

  elmiminateDuplicateArrayElements: function(array){
    array.filter(function(elem, pos, self){
      return self.indexOf(elem) === pos;
    });
    return array;
  }
};
