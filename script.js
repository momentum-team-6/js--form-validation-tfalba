console.log('Add validation!');

//Define all field elements as constants

const form = document.querySelector('#parking-form')
const daysField = document.querySelector('#days-field')
const days = document.querySelector('#days')
const make = document.querySelector('#car-make')
const totalField = document.querySelector('#total')
const newTotalField = document.querySelector('#new-total')
const submitButton = document.querySelector('#submit-button')
const carYear = document.querySelector('#car-year')
const cvv = document.querySelector('#cvv')
const creditCardNum = document.querySelector('#credit-card')
const startDate = document.querySelector('#start-date')
const expiration = document.querySelector('#expiration')


//set RegExp checks for car year >1900 (need to add that into RegExp)
//sets days to be 1-30
//sets cvv to be a three digit value

var reCvv = new RegExp("^[0-9]{3}$")
// var reDays = new RegExp("^[0-9]{1,2}$")

var reDays = new RegExp("^([1-9]|[12][0-9]|30)$")
//Looked up above from following tutorial: 
//https://www.regextutorial.org/regex-for-numbers-and-ranges.php

var reCarYear = new RegExp("^(19[0-9][1-9]|200[0-9]|201[0-9]|202[01])$")
//above setup will accept any number from 1901-2021

var reExpDate = new RegExp("^(0[1-9]/2[1-9]|1[1-2]/2[0-9])$")
//above requires mm/yy format and only accepts if 11/20 or greater up to 12/29
//**can come back and try to have this pull from current month and adjust */

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

expiration.addEventListener("input", function (event) {
    if (reExpDate.test(expiration.value)===false) {
        expiration.setCustomValidity("Must be in the format MM/YY and in the future.")
    } else {
        expiration.setCustomValidity("")
    }
})


// function validate () {
//   // validate password match
//   // validate credit card number
//   let creditCardNum = document.querySelector('#credit-card').value
//   validateCardNumber(creditCardNum)
// }

//This section handles credit card validation for step 6

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
    if (validateCardNumber(creditCardNum.value)===false) {
        creditCardNum.setCustomValidity("Please enter a valid credit card number.")
    } else {
        creditCardNum.setCustomValidity("")
    }
})

//use this as a start on solving step 5 & some of step 7


//this section solves for start date being in the future
function validateStartDate (date) {
    if (new Date(date)<= new Date()) {
        return false
    }
}

startDate.addEventListener("input", function(event) {
    if (validateStartDate(startDate.value+'T00:00')===false) {
        startDate.setCustomValidity("Date must begin tomorrow or later.")
    } else {
        startDate.setCustomValidity("")
    }
})

//This section handles the calculation of total cost for Step 4

form.addEventListener('submit', function (event) {
    event.preventDefault()
    let total=days.value*5
    console.log(total)
    //set an outer loop with a daysCounter running down from the total number of days to zero.
    // if (current day is Sunday, value is zero >> push zero to the array
    //once go from original start day set currentDate to zero since will continue pushing to array
    //from there.
    let date= new Date(startDate.value+'T00:00')
    let daysArray=[]
    let daysCounter=days.value
    currentDate=date.getDay()
    while (daysCounter>0) {
        for (i=currentDate; i<=6 && daysCounter>0; i++) {
            daysArray.push(i)
            daysCounter=daysCounter-1
        }
        currentDate=0
    }
    //set up a counting look that counts cheap & pricey days depending on value in index
    //loop over daysArray
    let cheapDays=0
    let priceyDays=0
    for (i=0; i<days.value; i++) {
        if (daysArray[i]===0 || daysArray[i]===6) {
            priceyDays= priceyDays+1
        }
        else {
            cheapDays=cheapDays+1
        }
    }
    let totalCost=cheapDays*5+priceyDays*7
    console.log(totalCost)
    totalField.classList.remove('hideme') 
    newTotalField.classList.remove('hideme')
    totalField.innerHTML = "Total for all of your days is: $" + total 
    newTotalField.innerHTML = "Total for all of your days with surge pricing is: $" + totalCost
  //   form.classList.add('hideme')  -- use this as a way to shift content of the page.
  //    could add a varname.classList.remove('hideme') to whatever was in background
  })
  