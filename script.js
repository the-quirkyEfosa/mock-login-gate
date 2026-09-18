// data storage
const users = JSON.parse(localStorage.getItem("myProjectUsers")) || [];
const currentUser = JSON.parse(localStorage.getItem("latestUser")) || [];
const currentPage = window.location.pathname.split("/").pop();

// Sign up page.
if (currentPage === "" || currentPage === "index.html") {

    const signUpUsername = document.querySelector("#signUpUsername");
    const signUpPassword = document.querySelector("#signUpPassword");
    const confirmPassword = document.querySelector("#confirmPassword");
    const guide = document.querySelector("#guide");
    const signUpBtn = document.querySelector("#signUpBtn");
    const showPassBtn1 = document.querySelector(".btn1");
    const showPassBtn2 = document.querySelector(".btn2");
    const signUpForm = document.querySelector(".signUpForm");

    // reveal passwords
    showPassBtn1.addEventListener("click", () => {

        if (signUpPassword.type === "password") {
            signUpPassword.type = "text";
            showPassBtn1.textContent = "Hide";
        } else {
            signUpPassword.type = "password";
            showPassBtn1.textContent = "Show";
        };
        
    });

    showPassBtn2.addEventListener("click", () => {

        if (confirmPassword.type === "password") {
            confirmPassword.type = "text";
            showPassBtn2.textContent = "Hide";
        } else {
            confirmPassword.type = "password";
            showPassBtn2.textContent = "Show";
        };
        
    });

    // check if the password matches the confirmation.
    const checkPasswordsMatch = () => {

        if (confirmPassword.value.length > 0 ) {
            
            if (signUpPassword.value === confirmPassword.value) {
                guide.textContent = "Passwords match!";
                guide.style.color = "#8ED7A5";
                signUpBtn.disabled = false;

            } else {
                guide.textContent = "Passwords do not match.";
                guide.style.color = "#F29A9A";
                signUpBtn.disabled = true;

            };
        } else {
                guide.textContent = "";
                return;

            };

    };
    
    signUpPassword.addEventListener("input", checkPasswordsMatch);
    confirmPassword.addEventListener("input", checkPasswordsMatch);


    // authenticate sign up, save users and move pages
    signUpForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const userName = signUpUsername.value.trim();
        const password = signUpPassword.value;

        if (userName === "" || password === "") {
            guide.textContent = "Please fill all input fields (spaces are not allowed).";
            guide.style.color = "#F29A9A";
            setTimeout(() => {
                guide.textContent = "";
            }, 3000);
            return;

        };

        const userExists = users.some(user => user.username === userName);
        if (userExists) {
            guide.textContent = "Username is already taken!";
            guide.style.color = "#F29A9A";
            setTimeout(() => {
                guide.textContent = "";
            }, 3000);
            return;
        } else {
            const newUser = {username: userName, password };
            users.push(newUser);
        };  

        localStorage.setItem("myProjectUsers", JSON.stringify(users));

        guide.textContent = "Sign Up Successful! Proceeding to login...";
        guide.style.color = "#8ED7A5";

        setTimeout(() => {
            window.location.replace("login.html");
        }, 2000);
        
    });

}
// Login page.
else if (currentPage === "login.html") {

    const loginUsername = document.querySelector("#loginUsername");
    const loginPassword = document.querySelector("#loginPassword");
    const loginForm = document.querySelector(".loginForm")
    const showPassBtn3 = document.querySelector(".btn3");
    const guide = document.querySelector("#guide");

    // show password
    showPassBtn3.addEventListener("click", () => {

        if (loginPassword.type === "password") {
            loginPassword.type = "text";
            showPassBtn3.textContent = "Hide";
        } else {
            loginPassword.type = "password";
            showPassBtn3.textContent = "Show";
        };
        
    });

    // authenticate login
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const userName = loginUsername.value.trim();
        const password = loginPassword.value;

        const foundUser = users.some( user => user.username === userName && user.password === password )

        if (foundUser) {
            currentUser.unshift(userName);
        
        } else {
            guide.textContent = "Invalid Username or Password";
            guide.style.color = "#F29A9A";
            setTimeout(() => {
                guide.textContent = "";
            }, 4000);
            return;

        }

        localStorage.setItem("latestUser", JSON.stringify(currentUser));
    
        guide.textContent = "Login Successful! Redirecting...";
        guide.style.color = "#8ED7A5";

        setTimeout(() => {
            window.location.replace("welcome.html");
        }, 2000);

    })

}

// welcome page
else if (currentPage === "welcome.html") {
    const welcomeName = document.querySelector("#welcomeName");
    const latestLoggedInUser = currentUser[0];

    welcomeName.textContent = latestLoggedInUser + ".";
}; 






