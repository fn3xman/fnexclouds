const elements ={
    form: document.querySelector("form"),
    fullName: document.getElementById("name"),
    email: document.getElementById("email"),
    phone: document.getElementById("phone"),
    subject: document.getElementById("subject"),
    msg: document.getElementById("message")
};

function sendEmail() {
    const bodyMessage = `Full Name: ${elements.fullName.value}<br>
    Email Address: ${elements.email.value}<br>
    Phone Number: ${elements.phone.value}<br>
    Message: ${elements.msg.value}`;

    Email.send({
        Host: "smtp.elasticemail.com",
        Username: "oliverfrankeljuelgg2@gmail.com",
        Password: "BE5D7ABECFEE521C7EBE222CE1CD7FDC8FC2",
        To: 'oliverfrankeljuelgg2@gmail.com',
        From: "oliverfrankeljuelgg2@gmail.com",
        Subject: elements.subject.value,
        Body: bodyMessage
    }).then(
        message => {
            if (message === "OK") {
                Swal.fire({
                    title: "Success!",
                    text: "Email successfully sent!",
                    icon: "success"
                });
            }
        }
    );
}

function checkInputs() {
    const items = document.querySelectorAll(".item");

    items.forEach(item => {
        if (item.value === "") {
            item.classList.add("error");
            item.parentElement.classList.add("error");
        }

        if (item.id === "email" && item.value !== "") {
            checkEmail();
        }

        item.addEventListener("keyup", () => {
            if (item.value !== "") {
                item.classList.remove("error");
                item.parentElement.classList.remove("error");
            } else {
                item.classList.add("error");
                item.parentElement.classList.add("error");
            }
        });
    });
}

function checkEmail() {
    const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;

    if (!elements.email.value.match(emailRegex)) {
        elements.email.classList.add("error");
        elements.email.parentElement.classList.add("error");
    } else {
        elements.email.classList.remove("error");
        elements.email.parentElement.classList.remove("error");
    }
}

elements.form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkInputs();

    if (!Object.values(elements).some(element => element.classList.contains("error"))) {
        sendEmail();
        elements.form.reset();
    }
});