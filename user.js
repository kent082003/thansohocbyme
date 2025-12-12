import { db } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// -----------------------
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
  const digits = (day + month + year).toString().split('').map(Number);

  // Sum the digits
  let sum = digits.reduce((acc, num) => acc + num, 0);

  // Reduce to a single digit or master number (11, 22, 33) 

  return sum;
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
  const challenge1 = reduceToPositiveDifference(reducedMonth, reducedDay);
  const yearSum = year.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
  const reducedYearSum = reduceToSingleDigit(yearSum);
  const challenge2 = reduceToPositiveDifference(reducedDay, reducedYearSum);
  const challenge3 = reduceToPositiveDifference(challenge1, challenge2);
  const challenge4 = reduceToPositiveDifference(reducedMonth, reducedYearSum);

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

  // Calculate the numbers
  const lifePathNoSum = calculateLifePathNumberNoSum(day, month, year);  // Updated to take day, month, and year
  const expressionNumberNoSum = calculateExpressionNumberByWordNoSum(name);
  const personalityNumberNoSum = calculatePersonalityNumberNoSum(name);
  const soulUrgeNumberNoSum = calculateSoulUrgeNumberNoSum(name);

  // Combine all numbers into an array
  const allNumbers = [lifePathNoSum, expressionNumberNoSum, personalityNumberNoSum, soulUrgeNumberNoSum];

  // Check if any of the numbers match karmic debt numbers
  const foundKarmicDebtNumbers = allNumbers.filter(num => karmicDebtNumbers.includes(num));

  if (foundKarmicDebtNumbers.length > 0) {
    console.log(`Karmic debt numbers found: ${foundKarmicDebtNumbers.join(', ')}`);

    // Create an array of karmic debt numbers with their corresponding values
    const karmicDebtResults = foundKarmicDebtNumbers.map(num => {
      switch(num) {
        case 14:
          return "14/5";
        case 16:
          return "16/7";
        case 19:
          return "19/1";
        case 13:
          return "13/4";
        default:
          return num; // Return the number itself if no match is found
      }
    });

    return karmicDebtResults;
  } else {
    console.log("No karmic debt numbers found.");
    return ["..."];
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
function Vatchat(day, month, year, name) {
  const karmicDebtNumbers = [4,7,22];

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
function Congcuphuongtien(day, month, year, name) {
  const karmicDebtNumbers = [1,3,5,8];

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
// -----------------------
// Hàm hiển thị kết quả
// -----------------------
// -----------------------
// Hàm hiển thị kết quả

// -----------------------

document.addEventListener("DOMContentLoaded", () => {
   
window.generateResults = async function () {
	

    const el = document.getElementById("name");
    console.log("Element:", el);

    if (!el) {
        alert("ERROR: Không tìm thấy input id='name' trong HTML!");
        return;
    }

    const name1 = el.value;
    console.log("Name value:", name1);

    if (!name1.trim()) {
        alert("ERROR: Input name tồn tại nhưng giá trị trống!");
        return;
    }

    alert("Tên lấy được: " + name1);


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
    const connection = calculateConnectionNumber(lifePath, expression);
    const birthday = calculateBirthDayNumber(day);
    const balance = calculateBalanceNumber(name);
    const passion = calculatePassionNumbers(name);
    const stage = calculateLifeStages(day, month, year);
    const challenge = calculateChallengeNumbers(day, month, year);
    const yearNumber = calculatePersonalYear(year);
    const monthNumber = calculatePersonalMonth(month);
    const dayNumber = calculatePersonalDay(day);
   const phivatchat = Phivatchat(day, month, year,name);
     const vatchat = Vatchat(day, month, year,name);

    const tools = Congcuphuongtien(day, month, year,name);
	    const { challenge1, challenge2, challenge3, challenge4 } = calculateChallengeNumbers(day, month, year);

const { stage1, stage2, stage3, stage4 } = calculateLifeStages(day, month, year);
    const debt = checkForKarmicDebtNumbers(day, month, year,name);
    const missingNumbers = calculateMissingNumbers(name);
    const intellectual = calculateIntellectualNumber(name);
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
        stage: await loadMeaning("cham", stage),
        challenge: await loadMeaning("thach_thuc", challenge),
        yearNumber: await loadMeaning("nam", yearNumber),
        monthNumber: await loadMeaning("thang", monthNumber),
        dayNumber: await loadMeaning("ngay", dayNumber),
    //    Phivatchat: await loadMeaning("phi_vat_chat", Phivatchat),
     //   vatchat: await loadMeaning("vat_chat", vatchat),
      //  tools: await loadMeaning("cong_cu_phuong_tien", tools),
     //   debt: await loadMeaning("no_nghiep", debt),
        missingNumbers: await loadMeaning("so_thieu", missingNumbers),
        intellectual: await loadMeaning("tu_duy_ly_tri", intellectual),
        subconscious: await loadMeaning("suc_manh_tiem_thuc", subconscious),
        soulPersonalityConnection: await loadMeaning("ket_noi_linh_hon_nhan_cach", soulPersonalityConnection)
    };

    // --- Hiển thị kết quả ---
    const resultBox = document.getElementById("resultBox");
    resultBox.style.display = "block";
    resultBox.innerHTML = `
        <h3>🔢 Đường đời: ${lifePath}</h3><p>${meanings.lifePath}</p>
        <h3>🎯 Sứ mệnh: ${expression}</h3><p>${meanings.expression}</p>
        <h3>💖 Linh hồn: ${soulUrge}</h3><p>${meanings.soulUrge}</p>
        <h3>😎 Nhân cách: ${personality}</h3><p>${meanings.personality}</p>
        <h3>🌟 Trưởng thành: ${maturity}</h3><p>${meanings.maturity}</p>
        <h3>🔗 Kết nối: ${connection}</h3><p>${meanings.connection}</p>
        <h3>📅 Ngày sinh: ${birthday}</h3><p>${meanings.birthday}</p>
        <h3>⚖️ Số cân bằng: ${balance}</h3><p>${meanings.balance}</p>
        <h3>🔥 Đam mê: ${passion}</h3><p>${meanings.passion}</p>
        <h3>🏁 Chặng: ${stage}</h3><p>${meanings.stage}</p>
        <h3>💪 Thách thức: ${challenge}</h3><p>${meanings.challenge}</p>
        <h3>🗓️ Năm: ${yearNumber}</h3><p>${meanings.yearNumber}</p>
        <h3>📆 Tháng: ${monthNumber}</h3><p>${meanings.monthNumber}</p>
        <h3>📅 Ngày: ${dayNumber}</h3><p>${meanings.dayNumber}</p>
        <h3>💎 Phi Vật Chất: ${phiVatchat}</h3><p>${meanings.phiVatchat}</p>
        <h3>🏠 Vật Chất: ${vatchat}</h3><p>${meanings.vatchat}</p>
        <h3>🛠️ Công cụ phương tiện: ${tools}</h3><p>${meanings.tools}</p>
        <h3>⚖️ Nợ Nghiệp: ${debt}</h3><p>${meanings.debt}</p>
        <h3>❌ Số thiếu: ${missingNumbers}</h3><p>${meanings.missingNumbers}</p>
        <h3>🧠 Tư duy lý trí: ${intellectual}</h3><p>${meanings.intellectual}</p>
        <h3>💭 Sức mạnh tiềm thức: ${subconscious}</h3><p>${meanings.subconscious}</p>
        <h3>🔗 Kết nối Linh Hồn - Nhân Cách: ${soulPersonalityConnection}</h3><p>${meanings.soulPersonalityConnection}</p>
    `;
};


});
