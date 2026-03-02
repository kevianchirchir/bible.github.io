const signUpBtn = document.getElementById("showSignupModal");
const signUpModal = document.getElementById("signUpModal");
const closeModalBtn1 = document.getElementById("closeModalBtn1");
const closeModalBtn2 = document.getElementById("closeModalBtn2");

const signInModal = document.getElementById("signInModal");
const signInBtn = document.getElementById("signInBtn");
const continueBtn1 = document.getElementById("continueSignUp");
const continueBtn2 = document.getElementById("continueSignIn");

function continueCheck() {
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("emailSignUp").value;
    var password = document.getElementById("passwordSignUp").value;
    const filledInputs = email !== "" && firstName !== "" && lastName !== "" && password !== ""
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    console.log({
        firstName,
        lastName,
        email,
        password,
        filledInputs,
        validEmail
    });
    if (!filledInputs || !validEmail) {
        continueBtn1.disabled = true;
        continueBtn1.classList.remove("bg-white");
        continueBtn1.classList.remove("cursor-pointer");
        continueBtn1.classList.add("bg-zinc-700");
    }
    else {
        continueBtn1.disabled = false;
        continueBtn1.classList.add("bg-white");
        continueBtn1.classList.add("cursor-pointer");
        continueBtn1.classList.remove("bg-zinc-700");

    }
}

function continueCheckSignIn() {
    var email = document.getElementById("emailSignIn").value;
    var password = document.getElementById("passwordSignIn").value;
    const filledInputs = email !== "" && password !== "";
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!filledInputs || !validEmail) {
        continueBtn2.disabled = true;
        continueBtn2.classList.remove("bg-white");
        continueBtn2.classList.remove("cursor-pointer");
        continueBtn2.classList.add("bg-zinc-700");
    }
    else {
        continueBtn2.disabled = false;
        continueBtn2.classList.add("bg-white");
        continueBtn2.classList.add("cursor-pointer");
        continueBtn2.classList.remove("bg-zinc-700");

    }
}




/* INCORPORATE BACKEND BRUH */
continueBtn1.addEventListener("click", () => {
    console.log("Registered");
});

continueBtn2.addEventListener("click", () => {
    console.log("welcome");
});

signUpBtn.addEventListener("click", () => {
    signUpModal.showModal();
});



closeModalBtn1.addEventListener("click", () => {
    signUpModal.animate([
        { bottom: 0, opacity: 1 },
        { top: "-300px", opacity: 0 }
    ],
        { duration: 500 }).onfinish = () => { signUpModal.close(); }

});

closeModalBtn2.addEventListener("click", () => {
    signInModal.animate([
        { bottom: 0, opacity: 1 },
        { top: "-300px", opacity: 0 }
    ],
        { duration: 500 }).onfinish = () => { signInModal.close(); }

});


signInBtn.addEventListener("click", () => {
    signInModal.showModal();
});
const inputsSignUp = document.querySelectorAll(
    "#firstName, #lastName, #emailSignUp, #passwordSignUp"
);

inputsSignUp.forEach(input => {
    input.addEventListener("input", continueCheck);
});


const inputsSignIn = document.querySelectorAll("#emailSignIn, #passwordSignIn");

inputsSignIn.forEach(input => {
    input.addEventListener("input", continueCheckSignIn);

});


