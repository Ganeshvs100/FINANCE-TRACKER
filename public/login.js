document.querySelector("form").addEventListener("submit", async (e) => {

    e.preventDefault();

    const data = {

        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };

    try {

        const response = await fetch("http://localhost:3000/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)
        });

        const result = await response.text();

        if (result === "Login Successful") {

            alert(result);

            window.location.href = "dashboard.html";

        } else {

            alert(result);
        }

    } catch (error) {

        console.log(error);
    }
}); 