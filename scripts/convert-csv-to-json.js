const axios = require('axios');
const csv = require('csvtojson');

const githubRawUrl =
    'https://raw.githubusercontent.com/developerstew/job-tile-data/main/2019_free_title_data.csv';
const jsonFilePath = 'path/to/your/job_title_data.json'; // Update this path

// Function to convert CSV data from URL to JSON
async function convertCsvToJson() {
    try {
        const response = await axios.get(githubRawUrl);
        const csvData = response.data;

        const jsonObj = await csv().fromString(csvData);
        const cleanedData = jsonObj.map((item) => {
            const topRelatedTitles = [];
            for (let key in item) {
                if (key.startsWith('__') || key === '') {
                    topRelatedTitles.push(item[key].trim());
                }
            }
            return {
                title: item.title,
                pdl_count: parseInt(item['pdl count'], 10),
                top_related_titles: topRelatedTitles,
            };
        });

        require('fs').writeFileSync(
            jsonFilePath,
            JSON.stringify(cleanedData, null, 2)
        );
        console.log('CSV file successfully converted to JSON');
    } catch (error) {
        console.error('Error converting CSV to JSON:', error);
    }
}

convertCsvToJson();
