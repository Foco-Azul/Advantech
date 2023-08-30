// InputValidationUtil.js

export function validateInput(inputValue) {
    const errors = {};

    if (/[^\w\s]/.test(inputValue)) {
        errors.specialCharacters = "No se permiten caracteres especiales.";
    }

    if (inputValue.trim() === "") {
        errors.emptyInput = "Este campo no puede estar vacío.";
    }

    return errors;
}
