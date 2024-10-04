const { Router } = require('express');
const {
  createDocument,
  getDocuments,
  getDocumentsByUserId,
  updateDocument,
  deleteDocument,
} = require('../controllers/documentController');
const authenticateToken = require('../middlewares/authMiddleware');

const router = Router();

router.get('/', getDocuments);
router.get('/user/:userId', getDocumentsByUserId);

router.post('/', authenticateToken, createDocument);
router.delete('/:id', authenticateToken, deleteDocument);
router.put('/:id',authenticateToken, updateDocument);

module.exports = router;

