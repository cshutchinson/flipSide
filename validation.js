var form  = document.getElementsByTagName('form')[0];
var email = document.getElementById('mail');
var error = document.querySelector('.error');

if (localStorage.getItem('email')!== null){
  email.defaultValue = localStorage.getItem('email');
}

email.addEventListener("keyup", function (event) {
  // Each time the user types something, we check if the
  // email field is valid.
  if (email.validity.valid) {
    // In case there is an error message visible, if the field
    // is valid, we remove the error message.
    error.innerHTML = ""; // Reset the content of the message
    error.className = "error"; // Reset the visual state of the message
  }
}, false);
form.addEventListener("submit", function (event) {
  // Each time the user tries to send the data, we check
  // if the email field is valid.
  if (!email.validity.valid) {

    // If the field is not valid, we display a custom
    // error message.
    error.innerHTML = "Please check your email address!";
    error.className = "error active";
    // And we prevent the form to be sent by canceling the event
    event.preventDefault();
  } else {
    localStorage.setItem('email', email.value);
    // console.log(email.value);
  }
}, false);
