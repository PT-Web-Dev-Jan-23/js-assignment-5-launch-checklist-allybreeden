// Write your JavaScript code here!

// const { pickPlanet } = require("./scriptHelper");

// const { addDestinationInfo } = require("./scriptHelper");

// const { formSubmission } = require("./scriptHelper");

window.addEventListener("load", function() {

   let listedPlanets;
   // Set listedPlanetsResponse equal to the value returned by calling myFetch()
   let listedPlanetsResponse = myFetch();
   listedPlanetsResponse.then(function (result) {
       listedPlanets = result;
       console.log(listedPlanets);
   }).then(function () {
       console.log(listedPlanets);
       // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
       let selectedPlanet = pickPlanet(listedPlanets);
       addDestinationInfo(window.document, selectedPlanet.name, selectedPlanet.diameter, selectedPlanet.star, selectedPlanet.distance, selectedPlanet.moons, selectedPlanet.image);
   });

   let form = document.querySelector("form");
   let list = document.getElementById("faultyItems");
   list.style.visibility = "hidden";

    
   form.addEventListener("submit", function(event) {
     
     let pilotInput = document.querySelector("input[name=pilotName]");
     let pilot = pilotInput.value;

     let copilotInput = document.querySelector("input[name=copilotName]");
     let copilot = copilotInput.value;

     let fuelInput = document.querySelector("input[name=fuelLevel]");
     let fuelLevel = fuelInput.value;

     let cargoInput = document.querySelector("input[name=cargoMass]");
     let cargoLevel = cargoInput.value;

     event.preventDefault();
     formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel);
   });
});