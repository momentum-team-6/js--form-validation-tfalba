console.log('Add validation!');


const form = document.querySelector('#parking-form')
const daysField = document.querySelector('#days-field')
const days = document.querySelector('#days')
const make = document.querySelector('#car-make')
const totalField = document.querySelector('#total')
const submitButton = document.querySelector('#submit-button')
const carYear = document.querySelector('#car-year')
const cvv = document.querySelector('#cvv')

var term = "fs3"
var re = new RegExp("^[0-9]{3}$")

cvv.addEventListener("input", function(event) {
    if (re.test(cvv.value)===false) {
        cvv.setCustomValidity("3-digit code required")
    }
    else {
        cvv.setCustomValidity("")
    }
})

carYear.addEventListener("input", function (event) {
    if (carYear.value<2000) {
        carYear.setCustomValidity("Year must be greater than 2000")
    } else {
        carYear.setCustomValidity("")
    }
})

let daysValue = document.querySelector('#days').value

form.addEventListener('submit', function (event) {
  event.preventDefault()
  let total=days.value*5
  console.log(total)
  totalField.innerHTML = "Total for all of your days is: $" + total 
//   validate()
})


// days.addEventListener("input", function (event) {
//   if (days.validity.typeMismatch) {
//     days.setCustomValidity("I am expecting a number!");
//   } else {
//     days.setCustomValidity("");
//   }
//   let total=days.value*5

//   console.log(total)
//   totalField.innerHTML = "Total for all of your days is: $" + total 
// });


// function validate () {
//   // validate password match
//   // validate credit card number
//   let creditCardNum = document.querySelector('#credit-card').value
//   validateCardNumber(creditCardNum)
//   let carYear = document.querySelector('#car-year').value
// //   let days = document.querySelector('#days-field').value
// }

// function validateCarYear (number) {
//     const = 
// }

// function validateCardNumber (number) {
//   var regex = new RegExp('^[0-9]{16}$')
//   if (!regex.test(number)) return false
//   return luhnCheck(number)
// }
// function luhnCheck (val) {
//   var sum = 0
//   for (var i = 0; i < val.length; i++) {
//     var intVal = parseInt(val.substr(i, 1))
//     if (i % 2 == 0) {
//       intVal *= 2
//       if (intVal > 9) {
//         intVal = 1 + (intVal % 10)
//       }
//     }
//     sum += intVal
//   }
//   return sum % 10 == 0
// }
