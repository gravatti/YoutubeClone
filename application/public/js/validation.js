function checkUsername(username) {
    var regex = /^[a-zA-Z][a-zA-Z0-9]{2,}$/;
    return regex.test(username);
  }

  function checkPassword(password) {
    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[/\*\-\+!@#\$%\^&~\[\]]).{8,}$/;
    return regex.test(password);
  }

  function checkEmail(email) {
    var regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
  }
  
  
function validateUsername(username) {
    document.getElementById("username").addEventListener("input", function (ev) {
        let userInput = ev.currentTarget;
        let username = userInput.value;
        if (checkUsername(username)) {
            userInput.classList.add("valid-text")
            userInput.classList.remove("invalid-text")
        } else {
            userInput.classList.add("invalid-text")
            userInput.classList.remove("valid-text")
        }
    });
}
  
function validatePassword(password) {
    document.getElementById("password").addEventListener("input", function (ev) {
        let userInput = ev.currentTarget;
        let password = userInput.value;
        if (checkPassword(password)) {
            userInput.classList.add("valid-text")
            userInput.classList.remove("invalid-text")
        } else {
            userInput.classList.add("invalid-text")
            userInput.classList.remove("valid-text")
        }
    });
}

function confirmPassword(confirmpassword) {
    document.getElementById("confirmpassword").addEventListener("input", function (ev) {
        let userInput = ev.currentTarget;
        let passwordInput = document.getElementById("password");
        let passwordCheck = passwordInput.value;
        let confirmpassword = userInput.value;
        if (confirmpassword == passwordCheck) {
            userInput.classList.add("valid-text")
            userInput.classList.remove("invalid-text")
        } else {
            userInput.classList.add("invalid-text")
            userInput.classList.remove("valid-text")
        }
    });
}

function validateEmail(email) {
    document.getElementById("email").addEventListener("input", function (ev) {
        let userInput = ev.currentTarget;
        let email = userInput.value;
        if (checkEmail(email)) {
            userInput.classList.add("valid-text")
            userInput.classList.remove("invalid-text")
        } else {
            userInput.classList.add("invalid-text")
            userInput.classList.remove("valid-text")
        }
    });
}

function verifyTos(tos) {
    let tosInput = document.getElementById("tos");
    // Check if Terms of Service checkbox is checked
  if (!tosInput.checked) {
    alert("Please accept the Terms of Service");
    return false;
  }
}

function verifyAge(ageVerif) {
    let ageInput = document.getElementById("ageverif");
    // Check if Age Verification checkbox is checked
  if (!ageInput.checked) {
    alert("Please confirm that you are over 18 years of age");
    return false;
  }
}

function validateForm() {
    let emailInput = document.getElementById("email");
    let usernameInput = document.getElementById("username");
    let passwordInput = document.getElementById("password");
    let confirmInput = document.getElementById("confirmpassword");
    
    let email = emailInput.value;
    let username = usernameInput.value;
    let password = passwordInput.value;
    let confirm = confirmInput.value;

    // Check if email is valid
    if (!checkEmail(email)) {
      alert("Please enter a valid email address");
      return false;
    }

    // Check if username is valid
    if (!checkUsername(username)) {
        alert("Please enter a valid username");
        return false;
      }
  
    // Check if password meets requirements
    if (!checkPassword(password)) {
      alert("Password must be 8 or more characters and contain at least one uppercase letter, one number, and one of the following special characters: / * - + ! @ # $ ^ & ~ [ ]");
      return false;
    }
  
    // Check if confirm password matches password
    if (confirm !== password) {
      alert("Passwords do not match");
      return false;
    }
  
    // All criteria have been met, allow form submission
    return true;
}

//Active as soon as page loads
function validateForms() {
    validateUsername();
    validatePassword();
    confirmPassword();
    validateEmail();
}

//Runs on submit
function verifySubmit(){
    let form = document.getElementById("reg-form");
    form.addEventListener("submit", function(event) {
    if (!validateForm()) {
        event.preventDefault();
  }
});
}

//validateForms();
//verifySubmit();

//Test email and password
//jane.doe@example.com
//myPassword123!



  