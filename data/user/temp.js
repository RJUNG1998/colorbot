const fs = require('fs');

const filePath = fs.readdirSync('.').filter(file => file.endsWith('.json'));

for (const file of filePath) {
    console.log(file);
    const dataPath = fs.readFileSync(`${file}`, "utf-8"); 
    const data = JSON.parse(dataPath);
    data.workcooldown = 0;
    delete data.begcooldown;
    delete data.date;
    data["attendancecooldown"] = "";
    data["voicelevel"] = 1;
    data["messagelevel"] = 1;
    data["voicexp"] = 0;
    data["messagexp"] = 0;
    data.stock = [];
    data.ongame = false;
    data.inventory = {};

    fs.writeFileSync(file, JSON.stringify(data));
}