const express = require("express");
const cors = require("cors");


const app = express();
const PORT =5000;


app.use(cors());
app.use(express.json());

//sample Api
app.post("/api/onboard", (req, res) => {
  const formData = req.body;
  console.log("✅ Received form data:", formData);

  if (!formData.fullName || !formData.email) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  res.status(201).json({
    message: "Form submitted successfully!",
    data: formData,
  });
});


app.listen(PORT,()=>
{
    console.log(`🚀 Backend running on port ${PORT}`);
})


