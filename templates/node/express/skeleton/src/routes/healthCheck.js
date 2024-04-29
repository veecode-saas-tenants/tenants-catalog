const express = require('express');
const router = express.Router();
const os = require('os');
const packageJson = require('../../package.json');

{%- if values.use_database === "custom" %}
const database = require("../database.js")
{%- endif %}

router.get("/", async (_,res)=>{
    const healthcheck = {
        uptime: process.uptime(),
        message: "OK",
        timestamp: Date.now(),
        cpuUsage: process.cpuUsage(),
        memoryUsage: process.memoryUsage(),
        version: packageJson.version,
        {%- if values.use_database === "custom" %}
        database: await database.validateDatabase()
        {%- endif %}
    };

    res.send(healthcheck)
});

module.exports = router;