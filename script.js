console.log('Add validation!');

//Define all field elements as constants

const form = document.querySelector('#parking-form')
const daysField = document.querySelector('#days-field')
const days = document.querySelector('#days')
const make = document.querySelector('#car-make')
const totalField = document.querySelector('#total')
const submitButton = document.querySelector('#submit-button')
const carYear = document.querySelector('#car-year')
const cvv = document.querySelector('#cvv')
const creditCardNum = document.querySelector('#credit-card')


//set RegExp checks for car year >1900 (need to add that into RegExp)
//sets days to be 1-30
//sets cvv to be a three digit value

var reCvv = new RegExp("^[0-9]{3}$")
// var reDays = new RegExp("^[0-9]{1,2}$")

var reDays = new RegExp("^([1-9]|[12][0-9]|30)$")
//Looked up above from following tutorial: 
//https://www.regextutorial.org/regex-for-numbers-and-ranges.php

var reCarYear = new RegExp("^(19[0-9][1-9]|20[0-2][0-9])$")
var reCarYear = new RegExp("^(19[0-9][1-9]|200[0-9]|201[0-9]|202[01])$")

cvv.addEventListener("input", function(event) {
    if (reCvv.test(cvv.value)===false) {
        cvv.setCustomValidity("3-digit code required")
    }
    else {
        cvv.setCustomValidity("")
    }
})

carYear.addEventListener("input", function (event) {
    if (reCarYear.test(carYear.value)===false) {
        carYear.setCustomValidity("Year must be greater than 1900 and less than 2022.")
    } else {
        carYear.setCustomValidity("")
    }
})

days.addEventListener("input", function(event) {
    if (reDays.test(days.value)===false) {
        days.setCustomValidity("Must be between 1 and 30 days.")
    } else {
        days.setCustomValidity("")
    }
})

form.addEventListener('submit', function (event) {
  event.preventDefault()
  let total=days.value*5
  console.log(total)
  totalField.innerHTML = "Total for all of your days is: $" + total
//   form.classList.add('hideme')  -- use this as a way to shift content of the page.
//    could add a varname.classList.remove('hideme') to whatever was in background
})


// function validate () {
//   // validate password match
//   // validate credit card number
//   let creditCardNum = document.querySelector('#credit-card').value
//   validateCardNumber(creditCardNum)
// }

function validateCardNumber (number) {
  var regex = new RegExp('^[0-9]{16}$')
  if (!regex.test(number)) return false
  return luhnCheck(number)
}
function luhnCheck (val) {
  var sum = 0
  for (var i = 0; i < val.length; i++) {
    var intVal = parseInt(val.substr(i, 1))
    if (i % 2 == 0) {
      intVal *= 2
      if (intVal > 9) {
        intVal = 1 + (intVal % 10)
      }
    }
    sum += intVal
  }
  return sum % 10 == 0
}

creditCardNum.addEventListener("input", function(event) {
    // validateCardNumber(creditCardNum.value)
    if (validateCardNumber(creditCardNum.value)===false) {
        creditCardNum.setCustomValidity("Please enter a valid credit card number.")
    } else {
        creditCardNum.setCustomValidity("")
    }
})
