console.log('Add validation!')

// Define all field elements as constants

const form = document.querySelector('#parking-form')
const days = document.querySelector('#days')
const totalField = document.querySelector('#total')
const newTotalField = document.querySelector('#new-total')
const carYear = document.querySelector('#car-year')
const cvv = document.querySelector('#cvv')
const creditCardNum = document.querySelector('#credit-card')
const startDate = document.querySelector('#start-date')
const expiration = document.querySelector('#expiration')

const reCvv = /^[0-9]{3}$/
const reDays = /^([1-9]|[12][0-9]|30)$/
// Looked up above from following tutorial:
// https://www.regextutorial.org/regex-for-numbers-and-ranges.php
const reCarYear = /^(19[0-9][1-9]|200[0-9]|201[0-9]|202[01])$/
// above setup will accept any number from 1901-2021 -- update this and make dynamic similar to ExpDate
const reExpDate = /^(0[1-9]\/2[0-9]|1[1-2]\/2[0-9])$/
//  above requires mm/yy format and only accepts if 01/20 or greater up to 12/29 -- current status handled later

function val (field, message) {
  field.setCustomValidity(message)
}

cvv.addEventListener('input', function (event) {
  if (reCvv.test(cvv.value) === false) {
    val(cvv, '3-digit code required')
  } else {
    val(cvv, '')
  }
})

carYear.addEventListener('input', function (event) {
  if (reCarYear.test(carYear.value) === false) {
    val(carYear, 'Year must be greater than 1900 and not in the future.')
  } else {
    val(carYear, '')
  }
})

days.addEventListener('input', function (event) {
  if (reDays.test(days.value) === false) {
    val(days, 'Must be between 1 and 30 days.')
  } else {
    val(days, '')
  }
})

// this section solves for start date being in the future
// practice writing this as an arrow function
function validateStartDate (date) {
  if (new Date(date) <= new Date()) {
    return false
  }
}

startDate.addEventListener('input', function (event) {
  if (validateStartDate(startDate.value + 'T00:00') === false) {
    val(startDate, 'Date must begin tomorrow or later.')
  } else {
    val(startDate, '')
  }
})

expiration.addEventListener('input', function (event) {
  const today = new Date()
  const newExpMonth = (expiration.value).slice(0, 2)
  const parsedMonth = parseInt(newExpMonth)
  const newExpYear = (expiration.value).slice(3, 5)
  const parsedYear = parseInt(newExpYear) + 2000
  if (reExpDate.test(expiration.value) === false) {
    val(expiration, 'Must be in the format MM/YY.')
  } else if ((today.getFullYear() > parsedYear) || (today.getMonth() > (parsedMonth - 1) && today.getFullYear() === parsedYear)) {
    val(expiration, 'Credit card is past expiration.')
  } else {
    val(expiration, '')
  }
})

// This section handles credit card validation for step 6
function validateCardNumber (number) {
  let regex = /^[0-9]{16}$/
  if (!regex.test(number)) return false
  return luhnCheck(number)
}
function luhnCheck (val) {
  let sum = 0
  for (let i = 0; i < val.length; i++) {
    let intVal = parseInt(val.substr(i, 1))
    if (i % 2 === 0) {
      intVal *= 2
      if (intVal > 9) {
        intVal = 1 + (intVal % 10)
      }
    }
    sum += intVal
  }
  return sum % 10 === 0
}
// this section evaluates above credit card validation
creditCardNum.addEventListener('input', function (event) {
  if (validateCardNumber(creditCardNum.value) === false) {
    val(creditCardNum, 'Please enter a valid credit card number.')
  } else {
    val(creditCardNum, '')
  }
})

// This section handles the calculation of total cost for Step 4
form.addEventListener('submit', function (event) {
  event.preventDefault()

  const total = days.value * 5
  console.log(total)
  // set an outer loop with a daysCounter running down from the total number of days to zero.
  // if (current day is Sunday, value is zero >> push zero to the array
  // once go from original start day set currentDate to zero since will continue pushing to array
  // from there.

  let day = new Date(startDate.value + 'T00:00')
  const daysArray = [day.getDay()]
  for (let i = 1; i < days.value; i++) {
    day = new Date(day.setDate(day.getDate() + 1))
    daysArray.push(day.getDay())
  }

  // set up a counting look that counts cheap & pricey days depending on value in index
  // loop over daysArray

  // write a .map() that will assign a value of 5 to a new
  // array if the value is not 0 or 6 and assigns 7 if it is 0 or 6
  const finalArray = daysArray.map(function (day) {
    if (day < 1 || day > 5) {
      return 7
    } else {
      return 5
    }
  })
  // add code here to use .reduce() to total the array finalArray instead of below code

  let cheapDays = 0
  let priceyDays = 0
  for (let i = 0; i < days.value; i++) {
    if (daysArray[i] === 0 || daysArray[i] === 6) {
      priceyDays = priceyDays + 1
    } else {
      cheapDays = cheapDays + 1
    }
  }
  const totalCost = cheapDays * 5 + priceyDays * 7
  totalField.classList.remove('hideme')
  newTotalField.classList.remove('hideme')
  totalField.innerHTML = 'Total for all of your days is: $' + total
  newTotalField.innerHTML = 'Total for all of your days with surge pricing is: $' + totalCost
})
//   form.classList.add('hideme')  -- use this as a way to shift content of the page.
//    could add a varname.classList.remove('hideme') to whatever was in background
