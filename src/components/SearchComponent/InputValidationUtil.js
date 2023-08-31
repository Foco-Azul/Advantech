// InputValidationUtil.js

export function validateInput(inputValue) {
    const errors = {};


    if (inputValue.trim() === "") {
        errors.emptyInput = "Este campo no puede estar vacío.";
    }

    return errors;
}
