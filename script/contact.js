//Validating Log in form
const contactForm = document.getElementById('contact-form');
const messageFullName = document.getElementById('message-full-name');
const messageEmail = document.getElementById('message-email');
const message = document.getElementById('message')

let contact_info_ref = db.ref("contactInfo");

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    checkcontactInputs();
    saveContactInfo(messageFullName.value, messageEmail.value, message.value);
    // sendMessage(messageFullName.value, messageEmail.value, message.value);
    contactForm.reset();
})

function checkcontactInputs() {
    //get values from the inputs
    const messageFullNameValue = messageFullName.value;
    const messageEmailValue = messageEmail.value;
    const messageValue = message.value;

    if(messageFullNameValue === '') {
        setcontactErrorFor(messageFullName, 'Username cannot be blank');
    } else {
        setsuccessErrorFor(messageFullName);
    }

    if(messageEmailValue === '') {
        setcontactErrorFor(messageEmail, 'Password cannot be blank');
    } else {
        setsuccessErrorFor(messageEmail);
    }

    if (!isEmail(messageEmailValue)){
        setcontactErrorFor(messageEmail, 'Invalid email');
    } else {
        setsuccessErrorFor(messageEmail);
    }

    if(messageValue === '') {
        setcontactErrorFor(message, 'Password cannot be blank');
    } else {
        setsuccessErrorFor(message);
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

function setsuccessErrorFor(input) {
    const contactFormControl = input.parentElement;
    contactFormControl.className = "form-control";
}

function saveContactInfo(name, email, message){

    const messageFullNameValue = messageFullName.value;
    const messageEmailValue = messageEmail.value;
    const messageValue = message.value;

    if(messageFullNameValue !== '' && messageEmailValue !==''
    && isEmail(messageEmailValue) && messageValue !== ''){
        contact_info_ref.push().set({
            name:name,
            email: email,
            message:message
        }).then(message => {
            alert("Message sent successfully");
        })
    }
    
    
}

function isEmail(emailAddress) {

    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regEx.test(emailAddress);
  }

// function sendMessage(name, email, message){
//     Email.send({
//         Host : "smtp.gmail.com",
//         Username : "xdukaa@gmail.com",
//         Password : "password",
//         To: "xdukaa@gmail.com",
//         From:"xdukaa@gmail.com",
//         Subject:`${name} sent you a message`,
//         Body:`Name:${name} <br/> Email:${email} <br/> Message:${message}`
//     }).then(message => {
//         alert("Message sent successfully");
//     })
// }