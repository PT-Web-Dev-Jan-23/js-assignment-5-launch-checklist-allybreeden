// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   /*
                `<h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name} </li>
                    <li>Diameter: ${diameter}} </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${iamgeUrl}">`
   */
}

function validateInput(testInput) {
    if (testInput === "") {
        return "Empty";
    }
    else if (isNaN(testInput)) {
        return "Not a Number";
    }
    else if (!isNaN(testInput)) {
        return "Is a Number";
    } 
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
   let form = document.querySelector("form");
   let pilotStatus = document.getElementById("pilotStatus");
   let copilotStatus = document.getElementById("copilotStatus");
   let fuel = document.getElementById("fuelStatus");
   let cargo = document.getElementById("cargoStatus");

   if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty") {
     alert("Input Required for each Field.");
   }
   else if (validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number" || validateInput(fuelLevel) === "Not a Number" || validateInput(cargoLevel) === "Not a Number") {
    alert("Enter Correct Information for each Field. Letters only for pilot and copilot. Numbers only for fuel level and cargo mass.");
   } else {
    pilotStatus.innerHTML= `Pilot ${pilot} is ready for Launch.`
    copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for Launch.`
    let launchStatus = document.getElementById("launchStatus");
    //not enough fuel and cargo is too heavy
    if (fuelLevel < 10000 && cargoLevel > 10000) {
        list.style.visibility = "visible";
        fuelStatus.innerHTML = "Not enough fuel for Launch.";
        cargoStatus.innerHTML = "Cargo mass too heavy for Launch.";
        launchStatus.innerHTML = "Shuttle not ready for launch";
        launchStatus.style.color = "red";
    }
    //enough fuel and cargo is too heavy
    else if (cargoLevel > 10000 && fuelLevel > 10000) {
        list.style.visibility = "visible";
        cargoStatus.innerHTML = "Cargo mass too heavy for Launch.";
        fuelLevel.innerHTML = "Fuel level sufficient for Launch."
        launchStatus.innerHTML = "Shuttle not ready for Launch";
        launchStatus.style.color = "red";
    //not enough fuel and cargo is the right weigh
    } else if (cargoLevel < 10000 && fuelLevel > 10000) {
          list.style.visibility = "visible";
          cargoStatus.innerHTML = "Cargo is light enough for Launch."
          fuelLevel.innerHTML = "Not enough fuel for Launch.";
          launchStatus.innerHTML = "Shuttle not ready for Launch";
          launchStatus.style.color = "red";
    } else {
       fuel.innerHTML = "Fuel level sufficient for Launch";
       cargo.innerHTML = "Cargo mass clear for launch."; 
       launchStatus.innerHTML = "Shuttle is ready for Launch.";
       launchStatus.color = "green";
    }
  }  
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch('https://handlers.education.launchcode.org/static/planets.json').then( function(response) {
        return response.json();
        });

    return planetsReturned;
}

function pickPlanet(planets) {
    let num = Math.floor(Math.random() * planets.length);
    return planets[num];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
