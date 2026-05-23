const loginForm = document.getElementById("loginForm");
const errorDiv = document.getElementById("error");

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {

        const response = await fetch("http://localhost:5000/api/auth/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })

        });

        const data = await response.json();

        if(response.ok){

            localStorage.setItem("token", data.token);

            localStorage.setItem("user", JSON.stringify(data.user));

            if(data.user.role === "admin"){

    window.location.href = "admin.html";

} else {

    window.location.href = "dashboard.html";

}

        } else {

            errorDiv.innerText = data.message;

        }

    } catch(error){

        errorDiv.innerText = "Something went wrong";

    }

});