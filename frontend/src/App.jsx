import  { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const App = () => {
  const [users, setUsers] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [newDocument, setNewDocument] = useState({ name: '', status: '', userId: '' });

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      setUsers(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  const fetchDocumentsByUser = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/documents/user/${userId}`);
      setDocuments(response.data);
    } catch (error) {
      console.error('Erro ao buscar documentos:', error);
    }
  };

  const createUser = async () => {
    try {
      const response = await axios.post(`${API_URL}/users`, newUser);
      setUsers([...users, response.data]);
      setNewUser({ name: '', email: '' });
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
    }
  };

  const updateUser = async (userId) => {
    try {
      const updatedUser = { name: 'Novo Nome', email: 'novoemail@example.com' };
      const response = await axios.put(`${API_URL}/users/${userId}`, updatedUser);
      setUsers(users.map((user) => (user.id === userId ? response.data : user)));
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`${API_URL}/users/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    }
  };

  const createDocument = async () => {
    try {
      const response = await axios.post(`${API_URL}/documents`, newDocument);
      setDocuments([...documents, response.data]);
      setNewDocument({ name: '', status: '', userId: '' });
    } catch (error) {
      console.error('Erro ao criar documento:', error);
    }
  };

  const updateDocument = async (docId) => {
    try {
      const updatedDocument = { name: 'Novo Documento', status: 'inativo' };
      const response = await axios.put(`${API_URL}/documents/${docId}`, updatedDocument);
      setDocuments(documents.map((doc) => (doc.id === docId ? response.data : doc)));
    } catch (error) {
      console.error('Erro ao atualizar documento:', error);
    }
  };

  const deleteDocument = async (docId) => {
    try {
      await axios.delete(`${API_URL}/documents/${docId}`);
      setDocuments(documents.filter((doc) => doc.id !== docId));
    } catch (error) {
      console.error('Erro ao deletar documento:', error);
    }
  };

  const handleUserSelect = (userId) => {
    setSelectedUserId(userId);
    fetchDocumentsByUser(userId);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>CRUD de Usuários</h1>
      <input
        type="text"
        placeholder="Nome"
        value={newUser.name}
        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={newUser.email}
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
      />
      <button onClick={createUser}>Criar Usuário</button>

      {users.length === 0 ? (
        <p>Carregando usuários...</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email}
              <button onClick={() => handleUserSelect(user.id)}>Ver Documentos</button>
              <button onClick={() => updateUser(user.id)}>Atualizar</button>
              <button onClick={() => deleteUser(user.id)}>Deletar</button>
            </li>
          ))}
        </ul>
      )}

      {selectedUserId && (
        <div>
          <h2>Documentos do Usuário {selectedUserId}</h2>
          <input
            type="text"
            placeholder="Nome do Documento"
            value={newDocument.name}
            onChange={(e) => setNewDocument({ ...newDocument, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Status"
            value={newDocument.status}
            onChange={(e) => setNewDocument({ ...newDocument, status: e.target.value })}
          />
          <button onClick={createDocument}>Criar Documento</button>
          {documents.length === 0 ? (
            <p>Nenhum documento encontrado para este usuário.</p>
          ) : (
            <ul>
              {documents.map((doc) => (
                <li key={doc.id}>
                  {doc.name} - {doc.status}
                  <button onClick={() => updateDocument(doc.id)}>Atualizar</button>
                  <button onClick={() => deleteDocument(doc.id)}>Deletar</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
