// utils.js
export function toPascalCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function toCamelCase(str) {
  return str
    .toLowerCase() // Convert the entire string to lowercase
    .split(" ") // Split the string into words by spaces
    .map((word, index) => {
      // For each word, if it's not the first word, capitalize the first letter
      if (index === 0) {
        return word; // Do not capitalize the first word
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(""); // Join the words back together without spaces
}
