import fetch from "node-fetch";

// Function to geocode an address using OpenStreetMap Nominatim API
async function geocodeAddress(address) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURI(address.county)}, ${encodeURI(address.address1)}, ${encodeURI(address.city)}, ${encodeURI(address.state)}, ${encodeURI(address.zip)}`;
  const response = await fetch(url);
  const data = await response.json();
  if (data && data.length > 0) {
    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
    };
  } else {
    throw new Error("Unable to geocode address");
  }
}

// Function to calculate the distance between two points given their latitude and longitude coordinates
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance * 1000; // Convert distance to meters
}

// Function to convert degrees to radians
function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

// Target location coordinates
const targetLocation = {
  lat: 24.3191857,
  lng: 90.1752525,
};

// Provided address
const address = {
  county: "Dorchester",
  address1: "181 Rolling Meadows Dr",
  address2: "",
  city: "Summerville",
  state: "South Carolina",
  zip: "29485",
};

// Compare address with target location
geocodeAddress(address)
  .then((addressLocation) => {
    const distance = getDistance(
      targetLocation.lat,
      targetLocation.lng,
      addressLocation.lat,
      addressLocation.lng,
    );
    console.log(
      "Distance between target location and address:",
      distance,
      "meters",
    );
    if (distance <= 200) {
      console.log("The address is within 200 meters of the target location.");
    } else {
      console.log(
        "The address is more than 200 meters away from the target location.",
      );
    }
  })
  .catch((error) => {
    console.error("Error geocoding address:", error);
  });
