import fetch from "node-fetch";

const address = {
  county: "Dorchester",
  address1: "181 Rolling Meadows Dr",
  address2: "",
  city: "",
  state: "",
  zip: "",
};

// Function to geocode an address using OpenStreetMap Nominatim API
const geocodeAddress = async (address) => {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURI(address.county)}, ${encodeURI(address.address1)}, ${encodeURI(address.city)}, ${encodeURI(address.state)}, ${encodeURI(address.zip)}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
};

const result = await geocodeAddress(address);
console.log(result);
