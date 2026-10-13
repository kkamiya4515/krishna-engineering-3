require("dotenv").config();

const express = require("express");
const { createClient } = require("@supabase/supabase-js");

const app = express();
const PORT = 3000;


// ===============================
// SUPABASE CONNECTION
// ===============================

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);


// ===============================
// MIDDLEWARE
// ===============================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ===============================
// SERVE WEBSITE
// ===============================

app.use(express.static(__dirname));


// ===============================
// TEST ROUTE
// ===============================

app.get("/api/test", (req, res) => {

    res.json({
        success: true,
        message: "Krishna Engineering backend is running!"
    });

});


// ===============================
// CUSTOMER ENQUIRY
// ===============================

app.post("/api/enquiries", async (req, res) => {

    try {

        console.log("Received enquiry:");
        console.log(req.body);

        const {
            name,
            phone,
            service,
            message
        } = req.body;


        // ===============================
        // VALIDATION
        // ===============================

        if (!name || !phone || !service) {

            return res.status(400).json({

                success: false,

                message:
                    "Name, phone and service are required."

            });

        }


        // ===============================
        // INSERT INTO SUPABASE
        // ===============================

        const { error } = await supabase
            .from("enquiries")
            .insert([
                {
                    name: name,
                    phone: phone,
                    service: service,
                    message: message || ""
                }
            ]);


        // ===============================
        // SUPABASE ERROR
        // ===============================

        if (error) {

            console.error("SUPABASE ERROR:");
            console.error(error);

            return res.status(500).json({

                success: false,

                message: error.message,

                details: error.details || null,

                hint: error.hint || null,

                code: error.code || null

            });

        }


        // ===============================
        // SUCCESS
        // ===============================

        console.log("Enquiry saved successfully!");

        res.status(201).json({

            success: true,

            message:
                "Your enquiry has been submitted successfully!"

        });


    } catch (error) {

        console.error("SERVER ERROR:");
        console.error(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

});


// ===============================
// START SERVER
// ===============================

// IMPORTANT:
// 0.0.0.0 allows other devices
// on the same Wi-Fi to access the website.

app.listen(PORT, "0.0.0.0", () => {

    console.log(
        `Krishna Engineering server running on port ${PORT}`
    );

});