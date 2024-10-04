let documents = [];

const createDocument = (name, status, userId) => {
    const id = documents.length + 1;
    const newDocument = { id, name, status, userId: parseInt(userId) };
    documents.push(newDocument);
    return newDocument;
};


const getDocumentsByUserId = (userId) => {
    const userDocuments = documents.filter(doc => doc.userId === parseInt(userId));
    return userDocuments;
};

const updateDocument = (id, name, status, userId) => {
    const documentIndex = documents.findIndex(doc => doc.id === parseInt(id));
    if (documentIndex !== -1) {
        documents[documentIndex] = { id: parseInt(id), name, status, userId: parseInt(userId) };
        return documents[documentIndex];
    } else {
        return null;
    }
};

const deleteDocument = (id) => {
    const documentIndex = documents.findIndex(doc => doc.id === parseInt(id));
    if (documentIndex !== -1) {
        documents[documentIndex].deletedAt = new Date();
        return true;
    } else {
        return false;
    }
};

const getDocuments = () => {
    return documents;
};

module.exports = {
    createDocument,
    getDocuments,
    getDocumentsByUserId,
    updateDocument,
    deleteDocument,
};