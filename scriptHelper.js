// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   let div = document.getElementById("missionTarget");
   div.innerHTML =
    // Here is the HTML formatting for our mission target div.
   
                `<h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name} </li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageUrl}">`
   
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
     alert("All fields required!");
   }
   else if (validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number" || validateInput(fuelLevel) === "Not a Number" || validateInput(cargoLevel) === "Not a Number") {
    alert("Make sure to enter valid information for each field! Letters for pilot and copilot. Numbers for fuel level and cargo mass.");
   } else {
    list.style.visibility = 'visible';
    pilotStatus.innerHTML= `Pilot ${pilot} is ready for launch`
    copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`
    let launchStatus = document.getElementById("launchStatus");
    //not enough fuel and cargo low enough
    if (fuelLevel < 10000 && cargoLevel <= 10000) {
        list.style.visibility = "visible";
        fuel.innerHTML = "Fuel level too low for launch";
        cargo.innerHTML = "Cargo mass low enough for launch";
        launchStatus.innerHTML = "Shuttle Not Ready for Launch";
        launchStatus.style.color = "rgb(199, 37, 78)";
    }
    //cargo is too heavy && enough fuel
    else if (fuelLevel >= 10000 && cargoLevel > 10000) {
        list.style.visibility = "visible";
        cargo.innerHTML = "Cargo mass too heavy for launch";
        fuel.innerHTML = "Fuel level high enough for launch";
        launchStatus.innerHTML = "Shuttle Not Ready for Launch";
        launchStatus.style.color = "rgb(199, 37, 78)";

    //not enough fuel and cargo is too heavy
    } else if (fuelLevel < 10000 && cargoLevel > 10000) {
          list.style.visibility = "visible";
          cargo.innerHTML = "Cargo mass too heavy for launch"
          fuel.innerHTML = "Fuel level too low for launch";
          launchStatus.innerHTML = "Shuttle Not Ready for Launch";
          launchStatus.style.color = "rgb(199, 37, 78)";
    //enough fuel and cargo light enough
    } else {
       fuel.innerHTML = "Fuel level high enough for launch";
       cargo.innerHTML = "Cargo mass low enough for launch"; 
       launchStatus.innerHTML = "Shuttle is Ready for Launch";
       launchStatus.style.color = 'rgb(65, 159, 106)';
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
