export function initStorage() {
  localStorage.setItem(
    "historyList",
    JSON.stringify({ cities: [{ city: "" }] })
  );
}

export function addToStorage(data) {
  const storage = JSON.parse(localStorage.getItem("historyList"));
  storage.cities.push({ city: data });
  localStorage.setItem("historyList", JSON.stringify(storage));
}

export function removeFirstFromStorage() {
  const storage = JSON.parse(localStorage.getItem("historyList"));
  storage.cities.shift();
  localStorage.setItem("historyList", JSON.stringify(storage));

  return storage;
}

export function readFromStorage() {
  if (localStorage.length === 0) {
    return null;
  }

  return JSON.parse(localStorage.getItem("historyList"));
}
