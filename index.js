const express = require("express");

const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

require("dotenv").config();

app.get("/api/*", (req,res)=>{
    res.status(404).json({
        error: "El recurso que quiere consumir no existe, revise los datos de la url"
    })
});

app.listen(8000, () =>{
    console.log(`Servidor levantado y escuchando el puerto 8000`)
} );