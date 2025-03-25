
(() => {
    'use strict';

    // Expresiones regulares para la validación
    const namePattern = /^[A-Za-z]+$/;
    const usernamePattern = /^(?=.*[@])(?=.*[a-zA-Z])(?=.{10,})(?!@.*\.com$).*@.*(?<!@)\.com$/;
    ;

    // Validar campo de nombre
    const validateName = (input) => {
        return namePattern.test(input.value);
    };

    // Validar campo de username
    const validateUsername = (input) => {
        return usernamePattern.test(input.value);
    };

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const form = document.querySelector('#registrationForm');
    
    form.addEventListener('submit', event => {
        let isValid = true;

        // Validar First name
        const firstName = document.querySelector('#validationTooltip01');
        if (!validateName(firstName)) {
            isValid = false;
            firstName.classList.add('is-invalid');
        } else {
            firstName.classList.remove('is-invalid');
            firstName.classList.add('is-valid');
        }

        // Validar Last name
        const lastName = document.querySelector('#validationTooltip02');
        if (!validateName(lastName)) {
            isValid = false;
            lastName.classList.add('is-invalid');
        } else {
            lastName.classList.remove('is-invalid');
            lastName.classList.add('is-valid');
        }

        // Validar Username
        const username = document.querySelector('#validationTooltipUsername');
        if (!validateUsername(username)) {
            isValid = false;
            username.classList.add('is-invalid');
        } else {
            username.classList.remove('is-invalid');
            username.classList.add('is-valid');
        }

        if (!isValid) {
            event.preventDefault();
            event.stopPropagation();
        }

        form.classList.add('was-validated');
    }, false);
})();

 
