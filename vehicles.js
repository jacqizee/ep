export class Vehicle {    
  constructor(name='Vehicle', speed=0, printable=false, metersMoved=0) {
    this.name = name
    this.speed = speed
    this.printable = printable
    this.metersMoved = metersMoved
    this.started = false
  }

  // Start interval if it hasn't yet started
  start() {
    if (this.started) return
    this.interval = setInterval(() => {
      this.metersMoved += this.speed
    }, 1000)
    this.started = true
  }

  // Stop interval
  stop() {
    clearInterval(this.interval)
    this.started = false
  }
}

export class Car extends Vehicle {
  constructor() {
    super('Car', 50)
  }
}

export class Truck extends Vehicle {
  constructor() {
    super('Truck', 30, true)
    this.cargoLoaded = false
  }

  loading() {
    console.log('Loading!')
    this.cargoLoaded = true
  }

  unloading() {
    console.log('Unloading!')
    this.cargoLoaded = false
  }
}

export class Airplane extends Vehicle {
  constructor() {
    super('Airplane', 200, true)
    this.inAir = false
  }

  rising() {
    console.log('Rising!')
    this.inAir = true
  }

  dropping() {
    console.log('Dropping!')
    this.inAir = false
  }

}