/* Header Section */
function Menu(e) {
  let list = document.querySelector('ul');
  e.name === 'menu' ? (e.name = "close", list.classList.add('top-[70px]'), list.classList.add('opacity-100')) : (e.name = "menu", list.classList.remove('top-[70px]'), list.classList.remove('opacity-100'))
}

/* Seat Booking Section */

//Select Seat 

const seatAll = document.querySelectorAll('.seat')
//console.log(seat)
const seatPrice = 550;
let selectedSeats = []

for (let i = 0; i < seatAll.length; i++) {
  const seat = seatAll[i];
  seat.addEventListener("click", () => {
    const seatId = seat.id;
    console.log(seatId)
    const seatName = seat.innerText
    const seatInfo = document.getElementById("seat-info")
    seat.classList.add("selected")

    if (seat.classList.contains('selected') && selectedSeats.length < 4 ) {
      // Create table cells (td) and add them to the row
      if(!selectedSeats.includes(seatId)){
        const newRow = document.createElement("tr");
        const cellA1 = createTableCell(seatName);
        console.log(cellA1)
  
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
        seat.classList.add('bg-green-300');
        selectedSeats.push(seatId);
        console.log(selectedSeats)
      }else{
        alert("You cant select once seat More time")
      }
      
    } else{
      seat.classList.remove('bg-green-300');
      alert("Can't Selected more then 4 seats and can't")
    }

  updateSelectedSeats();


 
  })
/* update Total price */
  function updateSelectedSeats() {
    const totalPriceElement = document.getElementById('totalPrice');
    const totalPrice = selectedSeats.length * seatPrice;
    totalPriceElement.textContent = `BDT: ${totalPrice} TK`;
    console.log(totalPrice)
  }
}