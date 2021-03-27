export function initStorage() {
  localStorage.setItem("historyList", JSON.stringify([]));
}

export function addToStorage(data) {
  const storage = JSON.parse(localStorage.getItem("historyList"));
  storage.push(data);
  localStorage.setItem("historyList", JSON.stringify(storage));
}

export function removeFromStorage() {
  const storage = JSON.parse(localStorage.getItem("historyList"));
  storage.shift();
  localStorage.setItem("historyList", JSON.stringify(storage));

  return storage;
}

export function readFromStorage() {
  if (localStorage.length === 0) {
    return null;
  }

  return JSON.parse(localStorage.getItem("historyList"));
}
