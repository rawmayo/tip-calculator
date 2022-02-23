// DOM elements
const billInp = document.getElementById("bill");
const percBtnAll = document.querySelectorAll(".percent-btn");
const numOfPeopleInp = document.getElementById("people");
const resetBtn = document.getElementById("reset");
const customInp = document.getElementById("custom");
const tipHtml = document.getElementById("tip");
const totalHtml = document.getElementById("total");

// Assign values to 0
let billAmt = 0;
let percentage = 0;
let numOfPeople = 0;

// Save the value of the bill from input
billInp.addEventListener("keyup", () => {
  billAmt = parseFloat(billInp.value);
});

// Loop through all the percentage button
percBtnAll.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.add("selected-percent");
    percentage = parseInt(btn.getAttribute("data-value"));
    percBtnAll.forEach((btnClass) => {
      if (`${percentage}%` !== `${btnClass.getAttribute("data-value")}%`) {
        btnClass.classList.remove("selected-percent");
      }
    });
  });
});

// Save the percentage value from the input
customInp.addEventListener("keyup", () => {
  percentage = parseInt(customInp.value);
});

// Call the resetUI function when the reset button is clicked
resetBtn.addEventListener("click", () => resetUI());

// Trigger the calculateTip function when the input
// for number of people is filled
numOfPeopleInp.addEventListener("keyup", () => {
  numOfPeople = parseInt(numOfPeopleInp.value);

  if (isNaN(numOfPeople)) {
    tipHtml.innerText = "$0.00";
    totalHtml.innerText = "$0.00";
    return;
  }

  const [tip, total] = calculateTip();

  const formattedTip = tip.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const formattedTotal = total.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  tipHtml.innerText = `$${formattedTip}`;
  totalHtml.innerText = `$${formattedTotal}`;
});

// Calculate the tip amount and total amount per person
function calculateTip() {
  let tipAmnt = null;
  let totalPerPerson = null;
  let totalTip = null;

  totalTip = parseFloat(billAmt * (percentage / 100));
  tipAmnt = totalTip / numOfPeople;
  totalPerPerson = (parseFloat(billAmt) + totalTip) / numOfPeople;

  return [tipAmnt, totalPerPerson];
}

// Reset the UI, including the variable values
function resetUI() {
  billAmt = 0;
  percentage = 0;
  numOfPeople = 0;

  percBtnAll.forEach((btn) => btn.classList.remove("selected-percent"));

  billInp.value = "";
  numOfPeopleInp.value = "";
  customInp.value = "";

  tipHtml.innerText = "$0.00";
  totalHtml.innerText = "$0.00";
}
