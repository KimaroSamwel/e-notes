const mongoose = require('mongoose');

const lectureNoteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    program: { type: String, required: true },
    course: { type: String, required: true },
    file_path: { type: String, required: true },
    upload_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LectureNote', lectureNoteSchema);
