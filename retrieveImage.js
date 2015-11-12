var xmlHTTP = new XMLHttpRequest();
xmlHTTP.open('GET','http://lorempixel.com/400/200/sports/',true);

// Must include this line - specifies the response type we want
xmlHTTP.responseType = 'arraybuffer';

xmlHTTP.onload = function(e)
{
    var arr = new Uint8Array(this.response);

    // Convert the int array to a binary string
    // We have to use apply() as we are converting an *array*
    // and String.fromCharCode() takes one or more single values, not
    // an array.
    var raw = String.fromCharCode.apply(null,arr);

    // This works!!!
    var b64=btoa(raw);
    var dataURL="data:image/jpeg;base64,"+b64;
    $('<img>').attr('src', dataURL).appendTo(document.body)
};

xmlHTTP.send();


//refer to http://stackoverflow.com/questions/20035615/
// using-raw-image-data-from-ajax-request-for-data-uri for
// more info on the technique


// http://api.jquery.com/jquery.ajaxtransport/
