const documentService = require('../services/documentService');

const createDocument = (req, res) => {
    const { name, userId } = req.body;
    const newDocument = documentService.createDocument(name, userId);
    res.status(201).json(newDocument);
};

const getDocuments = (req, res) => {
    const documents = documentService.getDocuments();
    res.json(documents);
};

const getDocumentsByUserId = (req, res) => {
    const { userId } = req.params;
    const userDocuments = documentService.getDocumentsByUserId(userId);
    if (userDocuments.length > 0) {
        res.json(userDocuments);
    } else {
        res.status(404).json({ message: 'Nenhum documento encontrado para esse usuário' });
    }
};

const updateDocument = (req, res) => {
    const { id } = req.params;
    const { name, status, userId } = req.body;
    const updatedDocument = documentService.updateDocument(id, name, status, userId);
    if (updatedDocument) {
        res.json(updatedDocument);
    } else {
        res.status(404).json({ message: 'Documento não encontrado' });
    }
};

const deleteDocument = (req, res) => {
    const { id } = req.params;
    const success = documentService.deleteDocument(id);
    if (success) {
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Documento não encontrado' });
    }
};

module.exports = {
    createDocument,
    getDocuments,
    getDocumentsByUserId,
    updateDocument,
    deleteDocument,
};
