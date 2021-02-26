export function initStorage() {
  if (localStorage.length > 0) {
    return null;
  }

  localStorage.setItem("1", JSON.stringify([]));

  return null;
}

export function addToStorage(data) {
  if (data === "") {
    return null;
  }
  const storage = JSON.parse(localStorage.getItem("1"));
  storage.push(data);
  localStorage.setItem("1", JSON.stringify(storage));

  return null;
}

export function removeFromStorage() {
  const storage = JSON.parse(localStorage.getItem("1"));
  storage.shift();
  localStorage.setItem("1", JSON.stringify(storage));

  return storage;
}

export function readFromStorage() {
  if (localStorage.length === 0) {
    return null;
  }

  return JSON.parse(localStorage.getItem("1"));
}
