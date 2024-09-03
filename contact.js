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
        Host : "smtp.elasticemail.com",
        Username : "oliverfrankeljuelgg@gmail.com",
        Password : "DE53E148E31D796D8D4050DCED77292A4EFA",
        To : 'oliverfrankeljuelgg@gmail.com',
        From : "oliverfrankeljuelgg@gmail.com",
        Subject : "This is the subject",
        Body : "And this is the body"
    }).then(
      message => alert(message)
    );
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
