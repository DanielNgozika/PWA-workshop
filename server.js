// import http from "http";
// import express from "express";
// const app = express();

// app.use((req, res, next) => {
//     res.status(200).json({
//         message: "it works!"
//     })
// })

// const port = process.env.PORT || 4000;

// const server = http.createServer(app);

// server.listen(port);

const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "public")));

app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(process.env.PORT || 8080);
console.log("port running");
