document.addEventListener("DOMContentLoaded", function() {
    const numberInput = document.querySelector('input[name="number"]');
    const numberStartdato = document.querySelector('input[id="startdato"]');
    const numberSlutdato = document.querySelector('input[id="slutdato"]');
    const submitButton = document.querySelector('input[type="submit"]');
    const hidButton = document.querySelector('#hidButton');
    const result_hidbutton = document.querySelector("#result_hidbutton");
    const resultElement = document.querySelector("#result");

    // Laver HID funktion
    function makeid(length) {
      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      let counter = 0;
      while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
      }
      return result;
  }

    const clearSessionButton = document.querySelector('#clearSession');
    clearSessionButton.addEventListener('click', function() {
        localStorage.removeItem('savedData');
        location.reload(); // Reload the page to clear the input fields
    });
  
    const savedData = localStorage.getItem('savedData');
    if (savedData) {
      const data = JSON.parse(savedData);
      numberInput.value = data.inputValue;
      numberStartdato.value = data.startdato;
      numberSlutdato.value = data.slutdato;
    }
  
    submitButton.addEventListener("click", function(event) {
      event.preventDefault();
  
      const inputValue = parseFloat(numberInput.value);
      const gnmsmonth = 30.42;
      const valueStartdato = new Date(numberStartdato.value);
      const valueSlutdato = new Date(numberSlutdato.value);
      const timeDifference = valueSlutdato - valueStartdato;
      const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const udregning = (inputValue / gnmsmonth) * daysDifference;
  
      console.log("Start Date:", valueStartdato);
      console.log("End Date:", valueSlutdato);
      console.log("Days Difference:", daysDifference);
  
      if (!isNaN(inputValue)) {
        const dataToStore = {
          inputValue: inputValue,
          startdato: valueStartdato.toISOString().split('T')[0],
          slutdato: valueSlutdato.toISOString().split('T')[0]
        };
  
        localStorage.setItem('savedData', JSON.stringify(dataToStore));
        resultElement.textContent = "Der skal krediteres følgende beløb: " + udregning.toFixed(2) + " Udregningen er følgende: (" + inputValue + "/" + gnmsmonth + ") * " + daysDifference + " = " + udregning.toFixed(2);
      }
    });

    hidButton.addEventListener("click", function(event) {
      event.preventDefault();
      console.log("Hej");
      const hidValue = makeid(20);
      result_hidbutton.textContent = hidValue;
      // Set the hidValue into the hidden input field
      document.getElementById("result_hidbutton_input").value = hidValue;
      console.log(hidValue);
    });

  });
  