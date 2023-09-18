document.addEventListener("DOMContentLoaded", function() {
    const numberInput1 = document.querySelector('input[name="nm"]');
    const submitButton1 = document.querySelector('input[type="submit"]');
    const resultElement1 = document.querySelector("#result");
  
    // Load saved data on page load
    const savedData = localStorage.getItem('savedData');
    if (savedData) {
      numberInput1.value = savedData;
    }
  
    submitButton1.addEventListener("click", function(event) {
      event.preventDefault();
      const inputValue1 = parseFloat(numberInput1.value);
      if (!isNaN(inputValue1)) {
        // Save data to local storage
        localStorage.setItem('savedData', inputValue1);
  
        resultElement1.textContent = "Der skal krediteres følgende beløb: " + inputValue1;
      }
    });
  });
  