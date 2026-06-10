const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

/* MYSQL CONNECTION */

const db = mysql.createConnection({
    host: "mysql://root:knjIudDBrCdsTXgLjBeBLqWYoOqqHbpV@tramway.proxy.rlwy.net:38352/railway",
    user: "root",
    password: "knjIudDBrCdsTXgLjBeBLqWYoOqqHbpV",
    database: "railway"
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL");
    }
});

/* REGISTER USER */

app.post("/register", (req, res) => {

    const { full_name, email, password } = req.body;

    const sql =
        "INSERT INTO users(full_name,email,password) VALUES(?,?,?)";

    db.query(sql, [full_name, email, password], (err, result) => {

        if (err) {
            res.send(err);
        } else {
            res.send("User Registered Successfully");
        }
    });
});

/* LOGIN USER */

app.post("/login", (req, res) => {

    const { email, password } = req.body;

    const sql =
        "SELECT * FROM users WHERE email = ? AND password = ?";

    db.query(sql, [email, password], (err, result) => {

        if (err) {

            res.send(err);

        } else {

            if (result.length > 0) {

                res.send("Login Successful");

            } else {

                res.send("Invalid Email or Password");
            }
        }
    });
});

/* ADD TRANSACTION */

app.post("/addTransaction", (req, res) => {

    const {
        user_id,
        description,
        amount,
        type,
        category,
        transaction_date
    } = req.body;

    const sql = `
    INSERT INTO transactions
    (user_id,description,amount,type,category,transaction_date)
    VALUES(?,?,?,?,?,?)
    `;

    db.query(sql,
        [user_id, description, amount, type, category, transaction_date],
        (err, result) => {

            if (err) {
                res.send(err);
            } else {
                res.send("Transaction Added");
            }
        });
});

app.get("/transactions", (req, res) => {

    const sql = "SELECT * FROM transactions";

    db.query(sql, (err, result) => {

        if (err) {

            res.send(err);

        } else {

            res.json(result);
        }
    });
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
