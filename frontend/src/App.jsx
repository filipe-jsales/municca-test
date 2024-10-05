import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = 'http://localhost:8080/api';

const App = () => {
  const [users, setUsers] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });
  const [newDocument, setNewDocument] = useState({ name: '', status: '' });
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginResponse, setLoginResponse] = useState(null);
  const [loginError, setLoginError] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      setUsers(response.data);
    } catch (error) {
      toast.error('Erro ao buscar usuários');
    }
  };

  const fetchDocumentsByUser = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/documents/user/${userId}`);
      setDocuments(response.data);
    } catch (error) {
      toast.error('Nenhum documento encontrado para este usuário');
    }
  };

  const createUser = async () => {
    try {
      const response = await axios.post(`${API_URL}/users`, newUser);
      setUsers([...users, response.data]);
      setNewUser({ name: '', email: '', password: '' });
      toast.success('Usuário criado com sucesso!');
    } catch (error) {
      toast.error('Erro ao criar usuário');
    }
  };

  const updateUser = async (userId) => {
    try {
      const updatedUser = { name: 'Novo Nome', email: 'novoemail@example.com' };
      const response = await axios.put(`${API_URL}/users/${userId}`, updatedUser);
      setUsers(users.map((user) => (user.id === userId ? response.data : user)));
      toast.success('Usuário atualizado com sucesso!');
    } catch (error) {
      toast.error('Erro ao atualizar usuário');
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`${API_URL}/users/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
      toast.success('Usuário deletado com sucesso!');
    } catch (error) {
      toast.error('Erro ao deletar usuário');
    }
  };

  const createDocument = async (userId) => {
    const token = localStorage.getItem('token');

    if (!token || !userId) {
      toast.error('Erro: Usuário não autenticado.');
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/documents`,
        { name: newDocument.name, userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDocuments([...documents, response.data]);
      setNewDocument({ name: '', status: '' });
      toast.success('Documento criado com sucesso!');
    } catch (error) {
      toast.error('Erro ao criar documento');
    }
  };

  const deleteDocument = async (docId) => {
    const token = localStorage.getItem('token');

    if (!token) {
      toast.error('Erro: Usuário não autenticado.');
      return;
    }

    try {
      await axios.delete(`${API_URL}/documents/${docId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDocuments(documents.filter((doc) => doc.id !== docId));
      toast.success('Documento deletado com sucesso!');
    } catch (error) {
      toast.error('Erro ao deletar documento');
    }
  };

  const updateDocument = async (docId) => {
    const token = localStorage.getItem('token');

    if (!token) {
      toast.error('Erro: Usuário não autenticado.');
      return;
    }

    try {
      const updatedDocument = { name: 'Novo Documento' };
      const response = await axios.put(`${API_URL}/documents/${docId}`, updatedDocument, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDocuments(documents.map((doc) => (doc.id === docId ? response.data : doc)));
      toast.success('Documento atualizado com sucesso!');
    } catch (error) {
      toast.error('Erro ao atualizar documento');
    }
  };

  const handleUserSelect = (userId) => {
    setSelectedUserId(userId);
    fetchDocumentsByUser(userId);
  };

  const login = async () => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, loginData);
      
      const { token, userId } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
  
      setLoginResponse(response.data);
      setLoginError(''); 
      toast.success('Login realizado com sucesso!');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setLoginError(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        setLoginError('Erro ao fazer login.');
        toast.error('Erro ao fazer login.');
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <ToastContainer />
      <h1>CRUD de Usuários</h1>

      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={loginData.email}
        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Senha"
        value={loginData.password}
        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
      />
      <button onClick={login}>Login</button>

      <h2>Criar Novo Usuário</h2>
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
      <input
        type="password"
        placeholder="Senha"
        value={newUser.password}
        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
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
          <button onClick={() => createDocument(selectedUserId)}>Criar Documento</button>
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
