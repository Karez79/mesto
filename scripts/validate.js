const showInputError = (errorTextElement, validationMessage, activeErrorClass) =>{
errorTextElement.textContent = validationMessage;
errorTextElement.classList.add(activeErrorClass);
}

const hideInputError = (errorTextElement, activeErrorClass) =>{
    errorTextElement.classList.remove(activeErrorClass);
    errorTextElement.textContent = "";
}

const disableButton = (submitButton, validSubmitButtonClass) =>{
submitButton.classList.add( validSubmitButtonClass);
submitButton.disabled = true;
}

const enebleButton = (submitButton, validSubmitButtonClass) =>{
    submitButton.classList.remove(validSubmitButtonClass);
    submitButton.disabled = false;
    }

const checkInputValidity = (input, errorClassTemplate, activeErrorClass) => {
    const errorTextElement = document.querySelector (`${errorClassTemplate}${input.name}`);
if (!input.validity.valid){
    showInputError(errorTextElement, input.validationMessage, activeErrorClass);
    
}
else{
    hideInputError(errorTextElement);
   
    }
}

const toggleButtonState = (submitButton) =>{
 console.log(submitButton);
    if(true){
enebleButton(submitButton, validSubmitButtonClass);
    }else{
disableButton(submitButton,  validSubmitButtonClass);
    }

}

const setEventListeners = (form, inputList, errorClassTemplate, activeErrorClass,submitButton, submitButtonSelector) => {
    form.addEventListener("submit", (e) =>{
        e.preventDefault();
    })

    inputList.forEach((input) => {
        input.addEventListener("input", (e) =>{
           checkInputValidity (input, errorClassTemplate, activeErrorClass);
           toggleButtonState(submitButton,  validSubmitButtonClass);
        })
    });
}


const enableValidation = (config)=>{
    const form = document.querySelector(config.formSelector);
    const inputList = form.querySelectorAll(config.inputSelector);
    const submitButton = form.querySelector(config.submitButtonSelector);

    setEventListeners(form,inputList, config.errorClassTemplate, config.activeErrorClass,  validSubmitButtonClass, submitButton);
}

enableValidation({ 
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    errorClassTemplate: ".popup__input-error_type_",
    activeErrorClass: "popup__input-error",
    validSubmitButtonClass: ".popup__save-button",
    submitButtonSelector: ".popup__save-button_active",
});

