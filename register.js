document.querySelector("form").addEventListener("submit", async (e) => {

    e.preventDefault();

    const data = {
        full_name: document.getElementById("full_name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };

    const response = await fetch("http://localhost:3000/register", {

        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const result = await response.text();

    alert(result);

    if (result === "User Registered Successfully") {
    window.location.href = "index.html";
}
});