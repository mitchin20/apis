const { readDataFromFile } = require('../services/readDataFromFile');

const readData = async (req, res) => {
    const filePath = './mockData/input.txt';
    try {
        const data = await readDataFromFile(filePath);
        res.json({
            success: true,
            data: data,
            error: null,
            message: "Successfully reading data from file"
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            data: null,
            error: error.message,
            message: "Failed to read data from file"
        })
    }
}

module.exports = {
    readData
}