// Call Geocode
// geocode();

function result() {
  document.getElementById('result').style.display = "block";
}

// Get location formattedAddress
var locationForm = document.getElementById('location-form');

// Listen for submit
locationForm.addEventListener('submit', geocode);

function geocode(e) {

  result();
  //Prevent form action
  e.preventDefault();

  let location = document.getElementById('location-input').value;
  axios
    .get("https://maps.googleapis.com/maps/api/geocode/json", {
      params: {
        address: location,
        key: "AIzaSyDta2lH-SavBf_volPfK4Q0m8IFkNNmIVk"
      }
    })
    .then(function(response) {
      // Log full response
      console.log(response);

      //Formatted Address
      let formattedAddress = response.data.results[0].formatted_address;
      let formattedAddressOutput = `
        <ul class="list-group">
          <li class="list-group-item">${formattedAddress}</li>
        </ul>
      `;

      // Address Components
      let addressComponents = response.data.results[0].address_components;
      let addressComponentsOutput = '<ul class="list-group">';
      for (var i = 0; i < addressComponents.length; i++) {
        addressComponentsOutput += `
          <li class="list-group-item"><strong>${addressComponents[i]
            .types[0]}</strong>: ${addressComponents[i].long_name}</li>
        `;
      }
      addressComponentsOutput += "</ul>";

      // Geometry
      let lat = response.data.results[0].geometry.location.lat;
      let lng = response.data.results[0].geometry.location.lng;
      let geometryOutput = `
        <ul class="list-group">
          <li class="list-group-item"><strong>Latitude</strong>: ${lat}</li>
          <li class="list-group-item"><strong>Longitude</strong>: ${lng}</li>
        </ul>
      `;

      // Output to app
      document.getElementById(
        "formatted-address"
      ).innerHTML = formattedAddressOutput;

      document.getElementById(
        "address-components"
      ).innerHTML = addressComponentsOutput;

      document.getElementById(
        "geometry"
      ).innerHTML = geometryOutput;
    })
    .catch(function(error) {
      console.log(error);
    });
}
