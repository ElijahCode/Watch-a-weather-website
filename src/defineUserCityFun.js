export async function defineUserCity() {
  try {
    const URL = "https://get.geojs.io/v1/ip/geo.json";

    const response = await fetch(URL);
    const jsonData = await response.json();

    return jsonData.city;
  } catch (err) {
    return console.log("Can not downoload data about your city!");
  }
}
