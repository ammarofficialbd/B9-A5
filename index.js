/* Header Section */
function Menu(e) {
  let list = document.querySelector('ul');
  e.name === 'menu' ? (e.name = "close", list.classList.add('top-[70px]'), list.classList.add('opacity-100')) : (e.name = "menu", list.classList.remove('top-[70px]'), list.classList.remove('opacity-100'))
}


/* Seat Booking Section */

//Select All Variables

const seatAll = document.querySelectorAll('.seat')
const totalSeats = document.getElementById('total-seat')
const seatCount = document.getElementById('seat__number')
const grandTotalElement = document.getElementById('grand__total')
const discountPrice = document.getElementById('discountPrice')
const couponInput = document.getElementById('coupon');
const PassengerName = document.getElementById('passengerName');
const phoneNumberInput = document.getElementById('phoneNumber');
const applyButton = document.getElementById('applyButton');
const submitButton = document.getElementById('submitButton');
const inputField = document.getElementById('input_field')

let availableSeats = 40 ; 

const seatPrice = 550;
let selectedSeats = []
const maxSelectedSeats = 4



/* Logic Section */
for (let i = 0; i < seatAll.length; i++) {
  const seat = seatAll[i];
  seat.addEventListener("click", () => {
    const seatId = seat.id;

    const seatName = seat.innerText
    const seatInfo = document.getElementById("seat-info")
    seat.classList.add("selected")

    if (seat.classList.contains('selected') && selectedSeats.length < 4 ) {
      // Create table cells (td) and add them to the row
      if(!selectedSeats.includes(seatId)){
        const newRow = document.createElement("tr");
        const cellA1 = createTableCell(seatName);
      
        const cellEconomy = createTableCell("Economy");
        const cellPrice = createTableCell("550");
  
        newRow.appendChild(cellA1);
        newRow.appendChild(cellEconomy);
        newRow.appendChild(cellPrice);
  
        seatInfo.appendChild(newRow);
  
        // Function to create a table cell
        function createTableCell(content) {
          const cell = document.createElement("td");
          cell.classList.add("text-center");
          cell.classList.add("p-2");
          cell.textContent = content;
          return cell;
        }
        seat.classList.add('bg-green-400');
        selectedSeats.push(seatId);
        availableSeats--;
        updateAvailableSeats()
        updateSeatsCount()
        updateTotalPrice()
      }else{
        alert("You cant select once seat More time")

      }
      
    } else{
      seat.classList.remove('bg-green-400');
      alert("Can't Selected more then 4 seats and can't")
    }

  })

 
/* update Total price */
  function updateTotalPrice() {
    const totalPriceElement = document.getElementById('totalPrice');
    const totalPrice = selectedSeats.length * seatPrice;
    const discount = applyDiscount() ? getDiscount(totalPrice) : 0;
    const grandTotal = totalPrice - discount;
    totalPriceElement.textContent = `BDT: ${totalPrice}`;
    return {grandTotal, discount}
  }
  function updateAvailableSeats() {
    totalSeats.innerText = `${availableSeats}`;
  }
  function updateSeatsCount() {
    seatCount.innerText = `${selectedSeats.length}`;
  }
}
  

function applyDiscount() {
  const couponValue = couponInput.value.trim().toLowerCase();
  return couponValue === 'new 15' || couponValue === 'couple 20' || couponValue === 'new15' || couponValue === 'couple20';
}

function getDiscount(totalPrice) {
  const couponValue = couponInput.value.trim().toLowerCase();
  return couponValue === 'new 15' ? (totalPrice * 15) / 100 : (totalPrice * 20) / 100;
}


/*  Handle coupon Apply Button */
function handleApplyButtonClick(e) {
    e.preventDefault()
    const {discount, grandTotal} = updateTotalPrice()
    if (selectedSeats.length < maxSelectedSeats) {
      alert(`Minimum ${maxSelectedSeats} seats must be selected before applying the coupon.`);
    }
    else if (!applyDiscount()) {
      alert('Invalid coupon. Please enter a valid coupon code.');
    } else {
      updateTotalPrice();

      grandTotalElement.textContent = `BDT: ${grandTotal}`;
      discountPrice.textContent = `
      Discount price : BDT - ${discount} TK`;  
      inputField.classList.add('hidden')
    }
    
}

function handleSubmitButtonClick(e) {
  e.preventDefault()
  if(PassengerName.value && phoneNumberInput.value && selectedSeats.length > 0){
    window.location.href = 'succeed.html';
  }else{
    alert("Plz Provide required Field")
  }
}


/* Event Listener */

  applyButton.addEventListener('click', function (e) {
    handleApplyButtonClick(e);
  });

  submitButton.addEventListener('click', function (e) {
    handleSubmitButtonClick(e);
  });

/* refresh page */
function refreshPage() {
  location.reload(true); 
  const settings = document.getElementById('wheel')
  settings.classList.add('rotate-90')
}