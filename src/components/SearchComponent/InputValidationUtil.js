// InputValidationUtil.js

export function validateInput(inputValue) {
    const errors = {};
    console.log("input",inputValue)

    if (inputValue.trim() === "") {
        errors.emptyInput = "Este campo no puede estar vacío.";
    }
    // Cuenta las palabras en el valor de entrada y las imprime en la consola
    const wordCount = inputValue.split(/\s+/).filter(word => word.length > 0).length;
    console.log("Cantidad de palabras:", wordCount);

    return errors;
}
