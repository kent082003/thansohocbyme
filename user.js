import { db } from "./firebase.js";

// -----------------------

import {
    collection,
    addDoc,
    getDocs,
    doc,
    getDoc,
    updateDoc,
    deleteDoc
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Hàm load ý nghĩa từ Firestore
// -----------------------
async function loadMeaning(type, number) {
    const ref = doc(db, "numerology", `${type}_${number}`);
    const snap = await getDoc(ref);
    return snap.exists() ? snap.data().text : "(Chưa có dữ liệu)";
}

// -----------------------
// Hàm reduce chung
// -----------------------
function reduceToSingleDigitGeneral(num) {
  while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
    num = num.toString().split('').map(Number).reduce((a,b)=>a+b,0);
  }
  return num;
}

// -----------------------
// Hàm tính toán các con số
// copy tất cả các hàm bạn đã viết ở trên vào đây
// calculateLifePathNumber, calculateExpressionNumberByWord, calculateDestinyNumber, etc.
// -----------------------
function calculateLifePathNumber(day, month, year) {
  // Convert day, month, and year into individual digits
  const digits = (day + month + year).toString().split('').map(Number);

  // Sum the digits
  let sum = digits.reduce((acc, num) => acc + num, 0);

  // Reduce to a single digit or master number (11, 22, 33)
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum.toString().split('').map(Number).reduce((acc, num) => acc + num, 0);
  }

  return sum;
}
function calculateLifePathNumberNoSum(day, month, year) {
  // Convert day, month, and year into individual digits
    // Reduce day, month, and year to single digits (except for master numbers 11, 22, 33)
  const reducedDay = reduceToSingleDigit(day);
  const reducedMonth = reduceToSingleDigit(month);
  const reducedYear = reduceToSingleDigit(year);

  // Calculate Personal Year Number
  const personalYear = reducedDay + reducedMonth + reducedYear;


  return personalYear;
}
function calculateExpressionNumberByWord(name) {
	console.log("NAME BEFORE ALL CALCULATIONS:", name);

	if (!name) {
    console.warn("Name is empty or undefined!");
    return 0; // or any default number you want
  }
  const letterToNumber = {
    'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9,
    'j': 1, 'k': 2, 'l': 3, 'm': 4, 'n': 5, 'o': 6, 'p': 7, 'q': 8, 'r': 9,
    's': 1, 't': 2, 'u': 3, 'v': 4, 'w': 5, 'x': 6, 'y': 7, 'z': 8
  };

  // Function to reduce a number to a single digit, except for 11, 22, and 33
  function reduceToSingleDigitExeptMaster(number) {
    while (number > 9 && number !== 11 && number !== 22 && number !== 33) {
      number = number.toString().split('').map(Number).reduce((acc, num) => acc + num, 0);
    }
    return number;
  }

  // Split the name into words and process each word
  const nameLower = name.toLowerCase();
  const words = nameLower.split(' '); // Split name by spaces

  const reducedWordNumbers = words.map(word => {
    // Sum the letters of the word
    const sum = word.split('').reduce((acc, char) => {
      if (letterToNumber[char]) {
        return acc + letterToNumber[char];
      }
      return acc;
    }, 0);

    // Reduce the sum to a single digit
    return reduceToSingleDigitExeptMaster(sum);
  });

  // Sum up the final result of the reduced numbers from each word
  const totalSum = reducedWordNumbers.reduce((acc, num) => acc + num, 0);
  
  // Reduce the total sum to a single digit
  const finalResult = reduceToSingleDigitExeptMaster(totalSum);

  return finalResult;
}
function calculateExpressionNumberByWordNoSum(name) {
  const letterToNumber = {
    'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9,
    'j': 1, 'k': 2, 'l': 3, 'm': 4, 'n': 5, 'o': 6, 'p': 7, 'q': 8, 'r': 9,
    's': 1, 't': 2, 'u': 3, 'v': 4, 'w': 5, 'x': 6, 'y': 7, 'z': 8
  };

  // Function to reduce a number to a single digit, except for 11, 22, and 33
  function reduceToSingleDigitExeptMaster(number) {
    while (number > 9 && number !== 11 && number !== 22 && number !== 33) {
      number = number.toString().split('').map(Number).reduce((acc, num) => acc + num, 0);
    }
    return number;
  }

  // Split the name into words and process each word
  const nameLower = name.toLowerCase();
  const words = nameLower.split(' '); // Split name by spaces

  const reducedWordNumbers = words.map(word => {
    // Sum the letters of the word
    const sum = word.split('').reduce((acc, char) => {
      if (letterToNumber[char]) {
        return acc + letterToNumber[char];
      }
      return acc;
    }, 0);

    // Reduce the sum to a single digit
    return reduceToSingleDigitExeptMaster(sum);
  });

  // Sum up the final result of the reduced numbers from each word
  const totalSum = reducedWordNumbers.reduce((acc, num) => acc + num, 0);
  
  // Reduce the total sum to a single digit
  const finalResult = totalSum;

  return finalResult;
}
function calculateDestinyNumber(name) {
  return calculateExpressionNumberByWord(name);
}
function calculateDestinyNumberNoSum(name) {
  return calculateExpressionNumberByWordNoSum(name);
}
function calculatePersonalityNumber(name) {
  const letterToNumber = {
    'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9,
    'j': 1, 'k': 2, 'l': 3, 'm': 4, 'n': 5, 'o': 6, 'p': 7, 'q': 8, 'r': 9,
    's': 1, 't': 2, 'u': 3, 'v': 4, 'w': 5, 'x': 6, 'y': 7, 'z': 8
  };

  const nameLower = name.toLowerCase();
  const sum = nameLower.split('').reduce((acc, char) => {
    if (!'aeiou'.includes(char)) {
      return acc + (letterToNumber[char] || 0);
    }
    return acc;
  }, 0);

  let personalityNumber = sum;
  while (personalityNumber > 9 && personalityNumber !== 11 && personalityNumber !== 22 && personalityNumber !== 33) {
    personalityNumber = personalityNumber.toString().split('').map(Number).reduce((acc, num) => acc + num, 0);
  }
  return personalityNumber;
}

function calculatePersonalityNumberNoSum(name) {
  const letterToNumber = {
    'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9,
    'j': 1, 'k': 2, 'l': 3, 'm': 4, 'n': 5, 'o': 6, 'p': 7, 'q': 8, 'r': 9,
    's': 1, 't': 2, 'u': 3, 'v': 4, 'w': 5, 'x': 6, 'y': 7, 'z': 8
  };

  const nameLower = name.toLowerCase();
  const sum = nameLower.split('').reduce((acc, char) => {
    if (!'aeiou'.includes(char)) {
      return acc + (letterToNumber[char] || 0);
    }
    return acc;
  }, 0);

  let personalityNumber = sum;
 
  return personalityNumber;
}

function calculateSoulUrgeNumber(name) {
	console.log("NAME BEFORE ALL CALCULATIONS:", name);

	
  const letterToNumber = {
    'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9,
    'j': 1, 'k': 2, 'l': 3, 'm': 4, 'n': 5, 'o': 6, 'p': 7, 'q': 8, 'r': 9,
    's': 1, 't': 2, 'u': 3, 'v': 4, 'w': 5, 'x': 6, 'y': 7, 'z': 8 // Y là phụ âm
  };

  const nameLower = name.toLowerCase();
  const sum = nameLower.split('').reduce((acc, char, index, arr) => {
    if ('aeiou'.includes(char)) {
      return acc + (letterToNumber[char] || 0);
    } else if (char === 'y') {
      // Nếu Y đứng giữa một cụm nguyên âm, không cộng số 7
      if (index > 0 && index < arr.length - 1 && 'aeiou'.includes(arr[index - 1]) && 'aeiou'.includes(arr[index + 1])) {
        return acc; // Không cộng gì cả
      }
      return acc + (letterToNumber[char] || 0); // Nếu Y là phụ âm
    }
    return acc;
  }, 0);

  let soulUrgeNumber = sum;
  while (soulUrgeNumber > 9 && soulUrgeNumber !== 11 && soulUrgeNumber !== 22 && soulUrgeNumber !== 33) {
    soulUrgeNumber = soulUrgeNumber.toString().split('').map(Number).reduce((acc, num) => acc + num, 0);
  }
  console.log("calculatePersonalityNumber received:", name);

  return soulUrgeNumber;
}

function calculateSoulUrgeNumberNoSum(name) {
  const letterToNumber = {
    'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9,
    'j': 1, 'k': 2, 'l': 3, 'm': 4, 'n': 5, 'o': 6, 'p': 7, 'q': 8, 'r': 9,
    's': 1, 't': 2, 'u': 3, 'v': 4, 'w': 5, 'x': 6, 'y': 7, 'z': 8 // Y là phụ âm
  };

  const nameLower = name.toLowerCase();
  const sum = nameLower.split('').reduce((acc, char, index, arr) => {
    if ('aeiou'.includes(char)) {
      return acc + (letterToNumber[char] || 0);
    } else if (char === 'y') {
      // Nếu Y đứng giữa một cụm nguyên âm, không cộng số 7
      if (index > 0 && index < arr.length - 1 && 'aeiou'.includes(arr[index - 1]) && 'aeiou'.includes(arr[index + 1])) {
        return acc; // Không cộng gì cả
      }
      return acc + (letterToNumber[char] || 0); // Nếu Y là phụ âm
    }
    return acc;
  }, 0);

  let soulUrgeNumber = sum;

  return soulUrgeNumber;
}


function calculateMaturityNumber(lifePath, expressionNumber) {
  let sum = lifePath + expressionNumber;

  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum.toString().split('').map(Number).reduce((acc, num) => acc + num, 0);
  }

  return sum;
}

function calculateBalanceNumber(name) {
  const letterToNumber = {
    'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9,
    'j': 1, 'k': 2, 'l': 3, 'm': 4, 'n': 5, 'o': 6, 'p': 7, 'q': 8, 'r': 9,
    's': 1, 't': 2, 'u': 3, 'v': 4, 'w': 5, 'x': 6, 'y': 7, 'z': 8
  };

  const nameParts = name.split(' '); // Split the name into parts (first name, last name)
  const firstLetters = nameParts.map(part => part[0].toLowerCase()); // Get the first letter of each part

  const sum = firstLetters.reduce((acc, char) => {
    return acc + (letterToNumber[char] || 0); // Add the numeric value of the first letter
  }, 0);

  let balanceNumber = sum;
  while (balanceNumber > 9 && balanceNumber !== 11 && balanceNumber !== 22 && balanceNumber !== 33) {
    balanceNumber = balanceNumber.toString().split('').map(Number).reduce((acc, num) => acc + num, 0);
  }

  return balanceNumber;
}
function calculateConnectionNumber(lifePath, expressionNumber) {
  const connectionNumber = Math.abs(reduceToSingleDigit(lifePath) - reduceToSingleDigit(expressionNumber));
  
  // Reduce to a single digit or master number (11, 22, 33)
  let result = connectionNumber;
  while (result > 9 && result !== 11 && result !== 22 && result !== 33) {
    result = result.toString().split('').map(Number).reduce((acc, num) => acc + num, 0);
  }

  return result;
}
function calculateBirthDayNumber(day) {
  let sum = day;

  // Reduce to a single digit or master number (11, 22, 33)
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum.toString().split('').map(Number).reduce((acc, num) => acc + num, 0);
  }

  return sum;
}

function calculateSoulPersonalityConnection(soulUrgeNumber, personalityNumber) {
  const connectionNumber = Math.abs(reduceToSingleDigit(soulUrgeNumber) - reduceToSingleDigit(personalityNumber));

  // Reduce to a single digit or master number (11, 22, 33)
  let result = connectionNumber;
  while (result > 9 && result !== 11 && result !== 22 && result !== 33) {
    result = result.toString().split('').map(Number).reduce((acc, num) => acc + num, 0);
  }

  return result;
}
function calculateMissingNumbers(name) {
  const letterToNumber = {
    'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9,
    'j': 1, 'k': 2, 'l': 3, 'm': 4, 'n': 5, 'o': 6, 'p': 7, 'q': 8, 'r': 9,
    's': 1, 't': 2, 'u': 3, 'v': 4, 'w': 5, 'x': 6, 'y': 7, 'z': 8
  };

  const nameLower = name.toLowerCase();
  const presentNumbers = new Set();

  // Add present numbers based on the name
  nameLower.split('').forEach(char => {
    if (letterToNumber[char]) {
      presentNumbers.add(letterToNumber[char]);
    }
  });

  // Find missing numbers (1-9)
  const missingNumbers = [];
  for (let i = 1; i <= 9; i++) {
    if (!presentNumbers.has(i)) {
      missingNumbers.push(i);
    }
  }

  return missingNumbers;
}

function calculatetotalMissingNumbers(name) {
  const letterToNumber = {
    'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9,
    'j': 1, 'k': 2, 'l': 3, 'm': 4, 'n': 5, 'o': 6, 'p': 7, 'q': 8, 'r': 9,
    's': 1, 't': 2, 'u': 3, 'v': 4, 'w': 5, 'x': 6, 'y': 7, 'z': 8
  };

  const nameLower = name.toLowerCase().replace(/\s+/g, '');
  const presentNumbers = new Set();

  nameLower.split('').forEach(char => {
    if (letterToNumber[char]) {
      presentNumbers.add(letterToNumber[char]);
    }
  });

  const allNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const missingNumbers = [];

  allNumbers.forEach(num => {
    if (!presentNumbers.has(num)) {
      missingNumbers.push(num);
    }
  });

  return missingNumbers.length;
}

function calculateSMTT(name) {
  const missingCount = calculatetotalMissingNumbers(name);
  return 9 - missingCount;
}

function calculateIntellectualNumber(name) {
  const letterToNumber = {
    'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9,
    'j': 1, 'k': 2, 'l': 3, 'm': 4, 'n': 5, 'o': 6, 'p': 7, 'q': 8, 'r': 9,
    's': 1, 't': 2, 'u': 3, 'v': 4, 'w': 5, 'x': 6, 'y': 7, 'z': 8
  };

  const nameLower = name.toLowerCase();
  const consonants = nameLower.split('').filter(char => !'aeiou'.includes(char)); // Lọc các phụ âm

  const sum = consonants.reduce((acc, char) => {
    return acc + (letterToNumber[char] || 0);
  }, 0);

  // Reduce the sum to a single digit or master number (11, 22, 33)
  let intellectualNumber = sum;
  while (intellectualNumber > 9 && intellectualNumber !== 11 && intellectualNumber !== 22 && intellectualNumber !== 33) {
    intellectualNumber = intellectualNumber.toString().split('').map(Number).reduce((acc, num) => acc + num, 0);
  }

  return intellectualNumber;
}

function calculatePassionNumbers(name) {
  const letterToNumber = {
    'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9,
    'j': 1, 'k': 2, 'l': 3, 'm': 4, 'n': 5, 'o': 6, 'p': 7, 'q': 8, 'r': 9,
    's': 1, 't': 2, 'u': 3, 'v': 4, 'w': 5, 'x': 6, 'y': 7, 'z': 8
  };

  const nameLower = name.toLowerCase().replace(/\s+/g, ''); // Remove spaces and convert to lowercase
  const letterCount = {};

  // Count the frequency of each letter in the name
  nameLower.split('').forEach(char => {
    if (letterToNumber[char]) {
      letterCount[char] = (letterCount[char] || 0) + 1;
    }
  });

  // Find letters that appear more than 2 times and convert them to numbers
  const frequentNumbers = [];
  for (let char in letterCount) {
    if (letterCount[char] > 2) {
      const number = letterToNumber[char];
      frequentNumbers.push(number);
    }
  }



  return frequentNumbers;
}

function calculateRationalThinkingNumber(fullName, birthDay) {
  const letterToNumber = {
    'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9,
    'j': 1, 'k': 2, 'l': 3, 'm': 4, 'n': 5, 'o': 6, 'p': 7, 'q': 8, 'r': 9,
    's': 1, 't': 2, 'u': 3, 'v': 4, 'w': 5, 'x': 6, 'y': 7, 'z': 8
  };

  // Extract last word from the full name
  const nameArray = fullName.trim().split(" ");
  const lastName = nameArray[nameArray.length - 1];

  // Calculate the numeric value of the last name
  const nameLower = lastName.toLowerCase();
  let nameSum = 0;
  nameLower.split('').forEach(char => {
    if (letterToNumber[char]) {
      nameSum += letterToNumber[char];
    }
  });

 const dayString = String(birthDay); // Cast birthDay to string if it's not
  const daySum = dayString.split('').reduce((sum, digit) => {
    return digit.match(/\d/) ? sum + parseInt(digit) : sum;
  }, 0);

  // Calculate the total sum
  let totalSum = nameSum + daySum;

  // Handle reduction, keeping master numbers
  const reduceToSingleDigitOrMaster = (num) => {
    while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
      num = num
        .toString()
        .split('')
        .reduce((sum, digit) => sum + parseInt(digit), 0);
    }
    return num;
  };

  // Final reduced result
  return reduceToSingleDigitOrMaster(totalSum);
}
function reduceToSingleDigitOrMaster(num) {
  while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
    num = num
      .toString()
      .split('')
      .reduce((sum, digit) => sum + parseInt(digit), 0);
  }
  return num;
}



// Function to calculate the stages based on day, month, and year
function calculateLifeStages(day, month, year) {
  // Reduce day, month, and year to single digits or master numbers
  const reducedDay = reduceToSingleDigitOrMaster(day);
  const reducedMonth = reduceToSingleDigitOrMaster(month);
  const reducedYear = reduceToSingleDigitOrMaster(year);

  // Stage 1: Month + Day
  const stage1 = reduceToSingleDigitOrMaster(reducedMonth + reducedDay);

  // Stage 2: Day + Year (sum digits of the year)
  const yearSum = reducedYear.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
  const stage2 = reduceToSingleDigitOrMaster(reducedDay + yearSum);

  // Stage 3: Stage 1 + Stage 2
  const stage3 = reduceToSingleDigitOrMaster(stage1 + stage2);

  // Stage 4: Month + Year (sum digits of the year)
  const stage4 = reduceToSingleDigitOrMaster(reducedMonth + yearSum);

  // Return the results
  return { stage1, stage2, stage3, stage4 };
}
function reduceToSingleDigit(num) {
 while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
    num = num.toString().split('').map(Number).reduce((a,b)=>a+b,0);
  }
  return num;
   
}


function calculatePersonalYear(day, month, year) {

	 	
  // Reduce day, month, and year to single digits (except for master numbers 11, 22, 33)
  const reducedDay = reduceToSingleDigit(day);
  const reducedMonth = reduceToSingleDigit(month);
  const reducedYear = reduceToSingleDigit(year);

  // Calculate Personal Year Number
  const personalYear = reducedDay + reducedMonth + reducedYear;

  // Final reduction of the Personal Year Number (except for master numbers 11, 22, 33)
  let finalPersonalYear = reduceToSingleDigit(personalYear);
	console.log("finalPersonalYear:", finalPersonalYear);
  return finalPersonalYear;
}

function calculatePersonalMonth(personalYear) {
  // Get the current month (1 for January, 2 for February, etc.)
  const currentMonth = new Date().getMonth() + 1;

  // Calculate the personal month number
  const personalMonth = personalYear + currentMonth;

  // Reduce to a single digit (no exceptions for 11, 22, 33)
  let reducedPersonalMonth = personalMonth;

  // Reduce until the result is a single digit
  while (reducedPersonalMonth >= 10) {
    reducedPersonalMonth = reducedPersonalMonth
      .toString()
      .split('')
      .reduce((sum, digit) => sum + parseInt(digit), 0);
  }

  console.log(reducedPersonalMonth);
  return reducedPersonalMonth;
}


function calculatePersonalDay(personalMonth) {
  // Get the current day of the month
  const currentDay = new Date().getDate();

  // Calculate the personal day number
  const personalDay = personalMonth + currentDay;

  // Reduce the personal day number to a single digit
  let reducedPersonalDay = personalDay;

  while (reducedPersonalDay >= 10) {
    reducedPersonalDay = reducedPersonalDay
      .toString()
      .split('')
      .reduce((sum, digit) => sum + parseInt(digit), 0);
  }

  return reducedPersonalDay;
}

function reduceToPositiveDifference(num1, num2) {
  // Calculate the positive difference between two numbers
  return Math.abs(num1 - num2);
}

function calculateChallengeNumbers(day, month, year) {
  // Reduce day, month, and year to single digits (no exceptions)
  const reducedDay = reduceToSingleDigit(day);
  const reducedMonth = reduceToSingleDigit(month);
  const reducedYear = reduceToSingleDigit(year);

  // Challenge calculations
  const challenge1 = reduceToSingleDigitGeneral(reduceToPositiveDifference(reducedMonth, reducedDay));
  
  const yearSum = year.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
  const reducedYearSum = reduceToSingleDigit(yearSum);
  const challenge2 = reduceToSingleDigitGeneral(reduceToPositiveDifference(reducedDay, reducedYearSum));
  const challenge3 = reduceToSingleDigitGeneral(reduceToPositiveDifference(challenge1, challenge2));
  const challenge4 = reduceToSingleDigitGeneral(reduceToPositiveDifference(reducedMonth, reducedYearSum));
 console.log("challenge2:", challenge2);
  // Return all challenge numbers
  return { challenge1, challenge2, challenge3, challenge4 };
}


let currentTooltip = null;

function toggleTooltip(elementId, spanElement) {
  var tooltip = document.getElementById(elementId);

  // Check if a tooltip is already open
  if (currentTooltip && currentTooltip !== tooltip) {
    // Hide the previous tooltip
    currentTooltip.style.display = 'none';
  }

  // Check if the clicked tooltip is currently hidden
  if (tooltip.style.display === 'none') {
    // Show the tooltip
    tooltip.style.display = 'block';

    // Get the position of the span element
    var rect = spanElement.getBoundingClientRect();

    // Position the tooltip to the right of the span element
    tooltip.style.left = rect.right + 5 + 'px';  // 5px to the right of the number
    tooltip.style.top = rect.top + 'px';  // Align tooltip vertically with the number

    // Update the current tooltip
    currentTooltip = tooltip;
  } else {
    // Hide the tooltip if it's already visible
    tooltip.style.display = 'none';
    currentTooltip = null;
  }
}
function checkForKarmicDebtNumbers(day, month, year, name) {
  const karmicDebtNumbers = [13, 14, 16, 19];

  const lifePathNoSum = calculateLifePathNumberNoSum(day, month, year);
  const expressionNumberNoSum = calculateExpressionNumberByWordNoSum(name);
  const personalityNumberNoSum = calculatePersonalityNumberNoSum(name);
  const soulUrgeNumberNoSum = calculateSoulUrgeNumberNoSum(name);
	   console.log("lifePathNoSum.",lifePathNoSum);
	    console.log("expressionNumberNoSum.",expressionNumberNoSum);
		 console.log("personalityNumberNoSum.",lifePathNoSum);
		  console.log("soulUrgeNumberNoSum.",soulUrgeNumberNoSum);
  const allNumbers = [lifePathNoSum, expressionNumberNoSum, personalityNumberNoSum, soulUrgeNumberNoSum];

  const foundKarmicDebtNumbers = allNumbers.filter(num => karmicDebtNumbers.includes(num));

  if (foundKarmicDebtNumbers.length > 0) {
    console.log(`Karmic debt numbers found: ${foundKarmicDebtNumbers.join(', ')}`);

    // Map số nghiệp sang dạng "13/4", "16/7"…
    const karmicDebtResults = foundKarmicDebtNumbers.map(num => {
      switch(num) {
        case 14: return "14_5";
        case 16: return "16_7";
        case 19: return "19_1";
        case 13: return "13_4";
        default: return num;
      }
    });

    return karmicDebtResults;
  } else {
    console.log("No karmic debt numbers found.");
    return []; // ✅ Trả về array rỗng thay vì ["..."]
  }
}


function Phivatchat(day, month, year, name) {
	
	console.log("NAME BEFORE ALL CALCULATIONS phi vat chat:", name);

  const karmicDebtNumbers = [11,2,6,9,33];

  // Calculate the numbers
  //No nghiep
	const lifePathNoSum = calculateLifePathNumber(day, month, year);  // Updated to take day, month, and year
	const expressionNumberNoSum = calculateExpressionNumberByWord(name);
	const personalityNumberNoSum = calculatePersonalityNumber(name);
	const soulUrgeNumberNoSum = calculateSoulUrgeNumber(name);

  // Combine all numbers into an array
  const allNumbers = [lifePathNoSum, expressionNumberNoSum, personalityNumberNoSum, soulUrgeNumberNoSum];

  // Check if any of the numbers match karmic debt numbers
  const foundKarmicDebtNumbers = allNumbers.filter(num => karmicDebtNumbers.includes(num));

  if (foundKarmicDebtNumbers.length > 0) {
  
    return foundKarmicDebtNumbers;
  } else {
   
   return ["..."];
  }
}
/**
 * Tính phi vật chất (karmic debt) dựa trên ngày sinh và tên
 * Trả về mảng các số phi vật chất
 */
function Phivatchat_v1(day, month, year, name) {
  console.log("NAME BEFORE ALL CALCULATIONS phi vat chat:", name);

  const karmicDebtNumbers = [11, 2, 6, 9, 33];

  // Tính các con số
  const lifePath = calculateLifePathNumber(day, month, year);
  const expression = calculateExpressionNumberByWord(name);
  const personality = calculatePersonalityNumber(name);
  const soulUrge = calculateSoulUrgeNumber(name);

  const allNumbers = [lifePath, expression, personality, soulUrge];

  // Lọc ra các số phi vật chất
  const foundKarmicDebtNumbers = allNumbers.filter(num => karmicDebtNumbers.includes(num));

  return foundKarmicDebtNumbers.length > 0 ? foundKarmicDebtNumbers : [];
}
async function loadMeaningSafe(type, numbers) {
  // Nếu numbers không tồn tại hoặc không phải array, ép về array
  if (!numbers) numbers = [];
  if (!Array.isArray(numbers)) numbers = [numbers];

  // Nếu array rỗng, trả về giá trị mặc định
  if (numbers.length === 0) return ["Không có phi vật chất"];

  const results = [];
  for (const num of numbers) {
    // Chuyển path an toàn (string, không chứa dấu /)
    const safeKey = String(num); // ví dụ "14_5" thay vì "14/5"
    
    // Lấy ý nghĩa từ Firebase
    let meaning = "";
    try {
      meaning = await loadMeaning(type, safeKey);
    } catch (err) {
      console.warn(`Không tìm thấy ý nghĩa cho ${safeKey}:`, err);
      meaning = "Chưa có ý nghĩa";
    }

    // Push dạng hiển thị: "14/5: Ý nghĩa"
    const displayNum = String(num).replace(/_/g, "/"); // hiển thị đẹp với /
    results.push(`${displayNum}: ${meaning}`);
  }

  return results;
}


function Vatchat_v1(day, month, year, name) {
  const karmicDebtNumbers = [4, 7, 22];

  const allNumbers = [
    calculateLifePathNumber(day, month, year),
    calculateExpressionNumberByWord(name),
    calculatePersonalityNumber(name),
    calculateSoulUrgeNumber(name)
  ];

  const foundKarmicDebtNumbers = allNumbers.filter(num => karmicDebtNumbers.includes(num));

  return foundKarmicDebtNumbers.length > 0 ? foundKarmicDebtNumbers : [];
}

function Congcuphuongtien(day, month, year, name) {
  const karmicDebtNumbers = [1, 3, 5, 8];

  const allNumbers = [
    calculateLifePathNumber(day, month, year),
    calculateExpressionNumberByWord(name),
    calculatePersonalityNumber(name),
    calculateSoulUrgeNumber(name)
  ];

  const foundKarmicDebtNumbers = allNumbers.filter(num => karmicDebtNumbers.includes(num));

  return foundKarmicDebtNumbers.length > 0 ? foundKarmicDebtNumbers : [];
}
//ham luu thong tin input


const saveBtn = document.getElementById("saveBtn");

const loadBtn = document.getElementById("loadBtn");
const resultBox = document.getElementById("resultBox");
saveBtn.addEventListener("click", async () => {
    const name = document.getElementById("name").value.trim();
    const day = Number(document.getElementById("day").value);
    const month = Number(document.getElementById("month").value);
    const year = Number(document.getElementById("year").value);

    if (!name || !day || !month || !year) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    try {
        // 1️⃣ Lấy tất cả dữ liệu trong collection
        const querySnapshot = await getDocs(collection(db, "users"));

        // 2️⃣ Kiểm tra trùng
        const exists = querySnapshot.docs.some(docItem => {
            const d = docItem.data();
            return d.name === name && d.day === day && d.month === month && d.year === year;
        });

        if (exists) {
            alert("Dữ liệu này đã tồn tại. Không lưu trùng!");
            return;
        }

        // 3️⃣ Nếu không trùng, lưu mới
        await addDoc(collection(db, "users"), {
            name: name,
            day: day,
            month: month,
            year: year,
            createdAt: new Date()
        });

        alert("Đã lưu thành công vào Firebase!");
    } catch (err) {
        console.error("Lỗi khi lưu:", err);
        alert("Không thể lưu dữ liệu!");
    }
});
// Load danh sách và hiển thị table
loadBtn.addEventListener("click", async () => {
    resultBox.style.display = "block";
    resultBox.innerHTML = "Đang tải dữ liệu...";

    try {
        const querySnapshot = await getDocs(collection(db, "users"));

        if (querySnapshot.empty) {
            resultBox.innerHTML = "Chưa có dữ liệu!";
            return;
        }

        let html = `
        <table>
            <thead>
                <tr>
                    <th>Tên</th>
                    <th>Ngày sinh</th>
                    <th>Thao tác</th>
                </tr>
            </thead>
            <tbody>
        `;

        querySnapshot.forEach(docItem => {
            const data = docItem.data();
            html += `
                <tr data-id="${docItem.id}">
                    <td class="user-info">${data.name}</td>
                    <td>${data.day}/${data.month}/${data.year}</td>
                    <td><button class="delete-btn" data-id="${docItem.id}">Xóa</button></td>
                </tr>
            `;
        });

        html += `</tbody></table>`;
        resultBox.innerHTML = html;

        // Click vào tên để load vào form
        document.querySelectorAll(".user-info").forEach(item => {
            item.addEventListener("click", async () => {
                const id = item.parentElement.dataset.id;
                const docSnap = await getDoc(doc(db, "users", id));
                if (docSnap.exists()) {
                    const d = docSnap.data();
                    document.getElementById("name").value = d.name;
                    document.getElementById("day").value = d.day;
                    document.getElementById("month").value = d.month;
                    document.getElementById("year").value = d.year;
                }
            });
        });

        // Xử lý nút Delete
        document.querySelectorAll(".delete-btn").forEach(btn => {
            btn.addEventListener("click", async () => {
                const id = btn.dataset.id;
                if (confirm("Bạn có chắc muốn xóa dữ liệu này?")) {
                    await deleteDoc(doc(db, "users", id));
                    alert("Đã xóa dữ liệu!");
                    loadBtn.click();
                }
            });
        });

    } catch (err) {
        console.error("Lỗi khi tải dữ liệu:", err);
        resultBox.innerHTML = "Lỗi khi tải dữ liệu!";
    }
	});
// -----------------------
// Hàm hiển thị kết quả
// -----------------------
// -----------------------
// Hàm hiển thị kết quả

// -----------------------

document.addEventListener("DOMContentLoaded", () => {
   
window.generateResults = async function () {


    const name = document.getElementById("name").value;
    const day = parseInt(document.getElementById("day").value);
    const month = parseInt(document.getElementById("month").value);
    const year = parseInt(document.getElementById("year").value);

    if (!name || !day || !month || !year) {
        alert("Bạn phải nhập đầy đủ thông tin!");
        return;
    }

    // --- Tính toán các con số ---
    const lifePath = calculateLifePathNumber(day, month, year);
    const expression = calculateExpressionNumberByWord(name);
    const soulUrge = calculateSoulUrgeNumber(name);
    const personality = calculatePersonalityNumber(name);
    const maturity = calculateMaturityNumber(lifePath, expression);
    const connection = calculateConnectionNumber(soulUrge, personality);
    const birthday = calculateBirthDayNumber(day);
    const balance = calculateBalanceNumber(name);
    const passion = calculatePassionNumbers(name);
  const currentYear = new Date().getFullYear();

    const yearNumber = calculatePersonalYear(day, month, currentYear);
    const monthNumber = calculatePersonalMonth(yearNumber);
    const dayNumber = calculatePersonalDay(monthNumber);
   const Phivatchat = Phivatchat_v1(day, month, year,name);
   const conneclifeandexpression = calculateConnectionNumber(lifePath,expression);
 


     const vatchat = Vatchat_v1(day, month, year,name);

    const tools = Congcuphuongtien(day, month, year,name);
	    const { challenge1, challenge2, challenge3, challenge4 } = calculateChallengeNumbers(day, month, year);

const { stage1, stage2, stage3, stage4 } = calculateLifeStages(day, month, year);
    const debt = checkForKarmicDebtNumbers(day, month, year,name);
    const missingNumbers = calculateMissingNumbers(name);
    const intellectual = calculateRationalThinkingNumber(name,day);
    const subconscious = calculateSMTT(name);
    const soulPersonalityConnection = calculateSoulPersonalityConnection(soulUrge, personality);

    // --- Load ý nghĩa từ Firestore ---
    const meanings = {
        lifePath: await loadMeaning("duong_doi", lifePath),
        expression: await loadMeaning("su_menh", expression),
        soulUrge: await loadMeaning("linh_hon", soulUrge),
        personality: await loadMeaning("nhan_cach", personality),
        maturity: await loadMeaning("truong_thanh", maturity),
        connection: await loadMeaning("ket_noi", connection),
        birthday: await loadMeaning("ngay_sinh", birthday),
        balance: await loadMeaning("can_bang", balance),
        passion: await loadMeaning("dam_me", passion),
     
				

		stage1: await loadMeaning("chang", stage1),
		stage2: await loadMeaning("chang", stage2),
		stage3: await loadMeaning("chang", stage3),
		stage4: await loadMeaning("chang", stage4),
		challenge1: await loadMeaning("thach_thuc", challenge1),
		challenge2: await loadMeaning("thach_thuc", challenge2),
		challenge3: await loadMeaning("thach_thuc", challenge3),
		challenge4: await loadMeaning("thach_thuc", challenge4),

   
        yearNumber: await loadMeaning("nam", yearNumber),
        monthNumber: await loadMeaning("thang", monthNumber),
        dayNumber: await loadMeaning("ngay", dayNumber),
       // Phivatchat: await loadMeaning("phi_vat_chat", Phivatchat),
		Phivatchat: await loadMeaningSafe("phi_vat_chat", Phivatchat),
 vatchat :  await loadMeaningSafe("vat_chat", vatchat),
 tools : await loadMeaningSafe("cong_cu_phuong_tien", tools),
 
        debt: await loadMeaningSafe("no_nghiep", debt),
		  conneclifeandexpression: await loadMeaningSafe("ket_noi_duong_doi_su_menh", conneclifeandexpression),
        missingNumbers: await loadMeaning("so_thieu", missingNumbers),
        intellectual: await loadMeaning("tu_duy_ly_tri", intellectual),
        subconscious: await loadMeaning("suc_manh_tiem_thuc", subconscious),
        soulPersonalityConnection: await loadMeaning("ket_noi_linh_hon_nhan_cach", soulPersonalityConnection)
    };

    // --- Hiển thị kết quả ---
	   //   
	   
	   let showMeaning = true; // trạng thái ban đầu: hiển thị cả value + meaning

document.getElementById('toggleMeaningBtn').addEventListener('click', () => {
    showMeaning = !showMeaning; // đổi trạng thái
    buildTable(); // gọi lại hàm tạo bảng
});


document.getElementById('xuatbando').addEventListener('click', () => {
       buildTable(); // gọi lại hàm tạo bảng
});
const dataRows = [
  {label:"🔢 Đường đời",value:lifePath,meaning:meanings.lifePath},
  {label:"🎯 Sứ mệnh",value:expression,meaning:meanings.expression},
  {label:"🔗 Kết nối Đường đời- Sứ mệnh",value:conneclifeandexpression,meaning:meanings.conneclifeandexpression},
  {label:"💖 Linh hồn",value:soulUrge,meaning:meanings.soulUrge},
  {label:"😎 Nhân cách",value:personality,meaning:meanings.personality},
  {label:"🔗 Kết nối Linh Hồn - Nhân Cách",value:soulPersonalityConnection,meaning:meanings.soulPersonalityConnection},
  {label:"🌟 Trưởng thành",value:maturity,meaning:meanings.maturity},
  {label:"📅 Ngày sinh",value:birthday,meaning:meanings.birthday},
  {label:"⚖️ Số cân bằng",value:balance,meaning:meanings.balance},
  {label:"🔥 Đam mê",value:passion,meaning:meanings.passion},
  {label:"🏁 Chặng",value:`${stage1}, ${stage2}, ${stage3}, ${stage4}`,meaning:`${meanings.stage1}, ${meanings.stage2}, ${meanings.stage3}, ${meanings.stage4}`},
  {label:"💪 Thách thức",value:`${challenge1}, ${challenge2}, ${challenge3}, ${challenge4}`,meaning:`${meanings.challenge1}, ${meanings.challenge2}, ${meanings.challenge3}, ${meanings.challenge4}`},
  {label:"🗓️ Năm",value:yearNumber,meaning:meanings.yearNumber},
  {label:"📆 Tháng",value:monthNumber,meaning:meanings.monthNumber},
  {label:"📅 Ngày",value:dayNumber,meaning:meanings.dayNumber},
  {label:"💎 Phi Vật Chất",value:Phivatchat,meaning:meanings.Phivatchat},
  {label:"🏠 Vật Chất",value:vatchat,meaning:meanings.vatchat},
  {label:"🛠️ Công cụ phương tiện",value:tools,meaning:meanings.tools},
  {label:"⚖️ Nợ Nghiệp",value:debt,meaning:meanings.debt},
  {label:"❌ Số thiếu",value:missingNumbers,meaning:meanings.missingNumbers},
  {label:"🧠 Tư duy lý trí",value:intellectual,meaning:meanings.intellectual},
  {label:"💭 Sức mạnh tiềm thức",value:subconscious,meaning:meanings.subconscious}
];
function buildTable() {
  let tableHtml = '<table style="width:100%;border-collapse:collapse;font-family:Arial;">';

  for (let i = 0; i < dataRows.length; i += 3) {
    tableHtml += '<tr>';

    for (let j = 0; j < 3; j++) {
      const item = dataRows[i + j];

      if (item) {
        tableHtml += `
        <td style="padding:12px;border:1px solid #ddd;vertical-align:top;background:${(i+j)%2===0?'#f0f4ff':'#fff'};width:33%;">
          <div style="font-weight:bold;margin-bottom:4px;">${item.label}</div>
          <div style="font-size:26px;font-weight:700;color:#d60000;margin-bottom:4px;">
            ${item.value ?? '-'}
          </div>
          <div style="font-size:13px;color:#555;line-height:1.4;">
            ${showMeaning ? item.meaning ?? '' : ''}
          </div>
        </td>`;
      } else {
        tableHtml += '<td></td>';
      }
    }

    tableHtml += '</tr>';
  }

  tableHtml += '</table>';

  const resultBox = document.getElementById("resultBox");
  resultBox.style.display = "block";
  resultBox.innerHTML = tableHtml;
}

};


});
