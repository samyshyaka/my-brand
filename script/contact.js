//Validating Log in form
const contactForm = document.getElementById('contact-form');
const messageFullName = document.getElementById('message-full-name');
const messageEmail = document.getElementById('message-email');
const message = document.getElementById('message')

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    checkcontactInputs();
})

function checkcontactInputs() {
    //get values from the inputs
    const messageFullNameValue = messageFullName.value.trim();
    const messageEmailValue = messageEmail.value.trim();
    const messageValue = message.value.trim();

    if(messageFullNameValue === '') {
        setcontactErrorFor(messageFullName, 'Username cannot be blank');
    }

    if(messageEmailValue === '') {
        setcontactErrorFor(messageEmail, 'Password cannot be blank');
    }

    if(messageValue === '') {
        setcontactErrorFor(message, 'Password cannot be blank');
    }
    
}

function setcontactErrorFor(input, message) {
    const contactFormControl = input.parentElement;
    const contactSmall = contactFormControl.querySelector('small');

    //add error class
    contactFormControl.className = "form-control error";

    //add error message inside small
   contactSmall.innerText = message;
}