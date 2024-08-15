const fs = require('fs').promises;

const readDataFromFile = async (filePath) => {
    try {
        const data = await fs.readFile(filePath, 'utf8')
        console.log("response data:", data);
        return data;
    } catch (error) {
        throw new Error("Unable to read file:", error.message);
    }
}

module.exports = {
    readDataFromFile,
}