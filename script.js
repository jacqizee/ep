import { Car, Truck, Airplane } from './vehicles.js'

const init = () => {

  // Interval to update Meters Moved Column
  setInterval(updateCells, 500)

  // Adding Vehicle - Handle Selection of Vehicle Type
  function handleAddition() {
    // Hide selection modal
    let toAdd
    addModal.style.display = 'none'

    switch (select.value) {
      case 'Car':
        toAdd = new Car
        break
      case 'Airplane':
        toAdd = new Airplane
        break
      case 'Truck':
        toAdd = new Truck
        break
    }

    // Add New Row
    addedVehicles.push(toAdd)
    const newRow = table.insertRow()
    newRow.id = `${addedVehicles.length}`

    // Add Cells to New Row
    const values = [toAdd.metersMoved, toAdd.speed, toAdd.name, 'No']
    for (let i = 0; i < 4; i++) {
      const currentCell = newRow.insertCell(i)
      currentCell.id=`${newRow.id}-${i}`
      currentCell.innerHTML = values[i]
    }

    // Add Event Listener to Row
    newRow.addEventListener('click', () => {
      if (selectedVehicle != null) {
        tableBody.children[selectedVehicle].style.backgroundColor = 'white'
      }
      selectedVehicle = parseInt(newRow.id)
      newRow.style.backgroundColor = 'lightblue'
      })
  }

  function updateCells() {
    for (let i = 0; i < addedVehicles.length; i++) {
      const speed = document.getElementById(`${i + 1}-0`)
      const status = document.getElementById(`${i + 1}-3`)

      // Update Speed
      speed.innerHTML = addedVehicles[i].metersMoved

      // Update Status
      addedVehicles[i].started == true ? status.innerHTML = 'Yes' : status.innerHTML = 'No'
    }
  }

  function handleStart() {
    if (!selectedVehicle) return
    addedVehicles[selectedVehicle - 1].start()
  }

  function handleStop() {
    if (!selectedVehicle) return 
    addedVehicles[selectedVehicle - 1].stop()
  }

  function handlePrint() {
    const vehicle = addedVehicles[selectedVehicle - 1]
    if (!selectedVehicle || !vehicle.printable) return console.log('nope')
    printDetails.innerHTML = ''

    const fields = {
      'Vehicle Type': vehicle.name,
      'Distance Traveled': vehicle.metersMoved,
      'Speed': `${vehicle.speed} m/s`,
      'Started?': `${vehicle.started ? 'Yes' : 'No'}`,
      ...('inAir' in vehicle && {'In Air?': `${vehicle.inAir ? 'Yes' : 'No'}`}),
      ...('cargoLoaded' in vehicle && {'Holding Cargo?': `${vehicle.cargoLoaded ? 'Yes' : 'No'}`}),
    }

    Object.keys(fields).forEach((key) => {
      const newElement = document.createElement('p')
      newElement.innerHTML = `<b>${key}</b>: ${fields[key]}`
      printDetails.appendChild(newElement)
    })

    printModal.style.display = 'flex'
  }

  // Actively Selected Vehicle
  let selectedVehicle = null

  // Arrays
  const addedVehicles = []

  // Elements
  const addButton = document.getElementById('add')
  const startButton = document.getElementById('start')
  const stopButton = document.getElementById('stop')
  const printButton = document.getElementById('print')
  const table = document.getElementById('transport-table')
  const tableBody = document.querySelector('tbody')
  const addModal = document.querySelector('#add-modal')
  const printModal = document.querySelector('#print-modal')
  const printDetails = document.querySelector('#print-details')
  const select = document.querySelector('select')
  const addVehicleButton = document.querySelector('#add-btn')


  startButton.addEventListener('click', handleStart)
  stopButton.addEventListener('click', handleStop)
  printButton.addEventListener('click', handlePrint)
  addVehicleButton.addEventListener('click', handleAddition)
  addButton.addEventListener('click', () => { addModal.style.display = 'flex' })

  // Hide Modal on Outer Click
  window.addEventListener('click', (e) => { 
    if (e.target == addModal) { addModal.style.display = 'none' }
    if (e.target == printModal) { printModal.style.display = 'none' }
  })

}

window.addEventListener('DOMContentLoaded', init)