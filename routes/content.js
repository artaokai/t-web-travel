const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

const contentFilePath = path.join(__dirname, '../data/content.json');

const readContent = () => {
    const data = fs.readFileSync(contentFilePath);
    return JSON.parse(data);
};

const writeContent = (content) => {
    fs.writeFileSync(contentFilePath, JSON.stringify(content, null, 2));
};

// Route untuk mengunggah konten baru
router.post('/upload', upload.single('image'), (req, res) => {
    const { title, description } = req.body;
    const imageUrl = `/uploads/${req.file.filename}`;

    const newContent = {
        id: Date.now().toString(),
        title,
        description,
        imageUrl,
    };

    const content = readContent();
    content.push(newContent);
    writeContent(content);

    res.status(201).json(newContent);
});

// Route untuk memperbarui konten
router.put('/update/:id', upload.single('image'), (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

    const content = readContent();
    const contentIndex = content.findIndex(item => item.id === id);
    if (contentIndex === -1) return res.status(404).send('Content not found');

    if (title) content[contentIndex].title = title;
    if (description) content[contentIndex].description = description;
    if (imageUrl) content[contentIndex].imageUrl = imageUrl;

    writeContent(content);

    res.json(content[contentIndex]);
});

module.exports = router;
