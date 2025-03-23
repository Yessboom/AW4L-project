const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
    const url = "https://jacklich10.com/bigboard/nfl/";
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    await page.goto(url, { waitUntil: "networkidle2" });

    const players = await page.evaluate(() => {
        const rows = document.querySelectorAll(".rt-tr-group"); // Select each row in the table
        let data = [];

        rows.forEach(row => {
            try {
                const ranking = row.querySelector(".rt-td:nth-child(1) .rt-td-inner")?.innerText.trim();
                const schoolLogo = row.querySelector(".rt-td:nth-child(2) img")?.src;
                const playerImage = row.querySelector(".rt-td:nth-child(3) img")?.src;
                const position = row.querySelector(".rt-td:nth-child(4) span:nth-child(1)")?.innerText.trim();
                const year = row.querySelector(".rt-td:nth-child(4) span:nth-child(2)")?.innerText.trim();
                const firstname = row.querySelector(".rt-td:nth-child(5) div div span:nth-child(1)")?.innerText.trim();
                const lastname = row.querySelector(".rt-td:nth-child(5) div div span:nth-child(2)")?.innerText.trim();

                // Extract school name from logo URL (custom logic, update if needed)
                let school = "Unknown";
                if (schoolLogo) {
                    const parts = schoolLogo.split("/");
                    school = parts[parts.length - 1].replace(".png", "");
                }

                if (firstname && lastname) {
                    data.push({
                        firstname,
                        lastname,
                        ranking: parseInt(ranking, 10),
                        school,
                        position,
                        schoolLogo,
                        playerImage,
                        year,
                    });
                }
            } catch (error) {
                console.log("Error parsing row:", error);
            }
        });

        return data;
    });

    // Save data to JSON file
    fs.writeFileSync("players.json", JSON.stringify(players, null, 2));
    console.log("Scraping completed. Data saved in players.json");

    await browser.close();
})();
