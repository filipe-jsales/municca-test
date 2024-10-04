const express = require('express');
const router = express.Router();
const {
    createDocument,
    getDocuments,
    getDocumentsByUserId,
    updateDocument,
    deleteDocument
} = require('../controllers/documentController');
router.get('/', getDocuments);
router.post('/', createDocument);
router.get('/user/:userId', getDocumentsByUserId);
router.put('/:id', updateDocument);
router.delete('/:id', deleteDocument);

module.exports = router;
