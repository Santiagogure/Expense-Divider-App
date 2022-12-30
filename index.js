const participants = document.getElementById("participants");
const amount = document.getElementById("monto");
const nextButton = document.getElementById("next-button");
const resetButton = document.getElementById("boton_reset");
const peopleContainer = document.getElementById("people-container");
const inputName = document.getElementsByClassName("inputNombres");
const inputAmount = document.getElementsByClassName("inputMonto");
const calculateButton = document.getElementById("buttonCalculate");

const result = document.getElementById("resultados");
const hasToReciveContainer = document.getElementById(
  "container-tiene-que-recibir"
);
const hasToPayContainer = document.getElementById("container-tiene-que-poner");

const resultsContainer = document.getElementById("container-resultados");
const cardDivider = document.getElementById("card-divider");
const bigContainer = document.getElementById("big-container");

const add_button = document.getElementById("add_button");
const substract_button = document.getElementById("substractButton");
const botonResetMobile = document.getElementById("boton_reset_mobile");

const peopleCuantity = [];

nextButton.addEventListener("click", numberOfParticipants);
calculateButton.addEventListener("click", divisionAccounts);
resetButton.addEventListener("click", resetAll);

add_button.addEventListener("click", addCount);
substract_button.addEventListener("click", substractCount);

function addCount() {
  if ((add_button.clicked = true && participants.value < 8)) {
    participants.value++;
  }
}

function substractCount() {
  if ((substract_button.clicked = true && participants.value > 0)) {
    participants.value--;
  }
}

calculateButton.disabled = true;

function numberOfParticipants(e) {
  e.preventDefault();
  if (participants.value <= 0 || participants.value > 8) {
    alert("Choose a number between 1 and 8");
  } else {
    for (let i = 1; i <= participants.value; i++) {
      peopleCuantity.push({ name: "Person " + i });
      const inputName = document.createElement("input");
      inputName.placeholder = "Person " + i;
      inputName.className = "inputNombres";

      const inputAmount = document.createElement("input");
      inputAmount.type = "number";
      inputAmount.className = "inputMonto";
      inputAmount.min = 0;
      inputAmount.placeholder = "$0";

      const personExpenseContainer = document.createElement("div");
      personExpenseContainer.className = "containerPersonaGasto";
      personExpenseContainer.appendChild(inputName);
      personExpenseContainer.appendChild(inputAmount);

      peopleContainer.appendChild(personExpenseContainer);
    }

    add_button.disabled = true;
    substract_button.disabled = true;
    calculateButton.disabled = false;
  }
}

function divisionAccounts() {
  calculateButton.classList.toggle("activado");
  resultsContainer.classList.toggle("activado");
  cardDivider.classList.toggle("activado");
  bigContainer.classList.toggle("activado");
  result.classList.toggle("activado");
  hasToPayContainer.classList.toggle("activado");
  hasToReciveContainer.classList.toggle("activado");

  // Asignamos el nombre
  for (let i = 0; i < peopleCuantity.length; i++) {
    if (inputName[i].value == "") {
      peopleCuantity[(i.name = "Persona" + i)];
    } else {
      peopleCuantity[i].name = inputName[i].value;
    }
  }

  //Asignamos el monto correspondiente de cada persona
  for (let i = 0; i < inputAmount.length; i++) {
    peopleCuantity[i].amount = inputAmount[i].value;
  }

  //Convertimos el monto en numero
  const amountArray = peopleCuantity.map(function (peopleCuantity) {
    return peopleCuantity.amount;
  });
  const amountNumberArray = amountArray.map((i) => Number(i));

  totalAmount = 0;

  // A la variable totalAmount le asignamos el monto total
  for (let i = 0; i < amountNumberArray.length; i++) {
    totalAmount += amountNumberArray[i];
  }

  const div = document.createElement("div");
  const total = document.createElement("h4");
  const price = document.createElement("b");
  price.innerText = "$" + totalAmount;
  total.innerText = "The total cost was ";
  total.className = "total";
  div.className = "mini-containers-div-resultados";

  div.appendChild(total);
  div.appendChild(price);
  result.appendChild(div);

  division();

  function division() {
    //Realizamos la cuenta logica para ver cuanto da/recibe cada uno depediendo lo que puso

    let difference = [];

    const eachOnePut = totalAmount / peopleCuantity.length;

    for (let i = 0; i < peopleCuantity.length; i++) {
      difference.push(eachOnePut - amountNumberArray[i]);

      //En caso de que la diferencia sea negativa, debe recibir
      if (difference[i] < 0) {
        const spanName = document.createElement("span");
        spanName.innerText = peopleCuantity[i].name;

        const div = document.createElement("div");
        const tagHasToRecieve = document.createElement("h4");
        const price = document.createElement("b");
        tagHasToRecieve.innerText = "has to recieve";
        tagHasToRecieve.className = "tieneQueRecibir";
        price.innerText = "$" + difference[i].toFixed(2) * -1;
        div.className = "mini-containers-div-resultados";
        spanName.className = "span-recibir";
        div.appendChild(spanName);
        div.appendChild(tagHasToRecieve);
        div.appendChild(price);
        hasToReciveContainer.appendChild(div);
      }
      // En caso de que la diferencia sea positiva debe pagar
      else {
        const div = document.createElement("div");
        const spanName = document.createElement("span");
        const price = document.createElement("b");
        const tagHasToPay = document.createElement("h4");
        price.innerText = "$" + difference[i].toFixed(2) * 1;
        tagHasToPay.innerText = "has to pay";
        tagHasToPay.className = "tieneQuePoner";
        spanName.innerText = peopleCuantity[i].name;
        div.className = "mini-containers-div-resultados";
        spanName.className = "span-poner";
        div.appendChild(spanName);
        div.appendChild(tagHasToPay);
        div.appendChild(price);
        hasToPayContainer.appendChild(div);
      }
    }

    if (hasToReciveContainer.children.length === 0) {
      const secondDiv = document.createElement("div");
      secondDiv.className = "mini-containers-div-resultados";
      const spanText = document.createElement("h4");
      spanText.innerText = "Nobody needs to receive money";
      spanText.className = "span-recibir";
      secondDiv.appendChild(spanText);
      hasToReciveContainer.appendChild(secondDiv);
    }
    if (hasToPayContainer.children.length === 0) {
    }
  }
  nextButton.disabled = true;
  buttonCalculate.disabled = false;
}

function resetAll() {
  window.location.reload();
}
