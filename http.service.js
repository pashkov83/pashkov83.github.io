const apiUrl = "products.json";

export function getItemsList() {
  return fetch(apiUrl).then((response) => response.json())
}
