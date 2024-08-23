import axios from "axios";
import { useState } from 'react';
import "./App.css";

type GitHubData = {
  name: string;
  bio: string;
  avatar_url: string;
};

function App() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState<string | "Loading...">("Loading...");
  const [bio, setBio] = useState<string | "Loading...">("Loading...");
  const [avatar_url, setAvatarUrl] = useState<string | "Loading...">("Loading...");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = () => {
    if (username.trim() === "") {
      setError("Por favor, insira um nome de usuário.");
      return;
    }

    setLoading(true);
    setError(null);

    axios.get<GitHubData>(`https://api.github.com/users/${username}`)
      .then((response) => {
        setName(response.data.name);
        setBio(response.data.bio);
        setAvatarUrl(response.data.avatar_url);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setError("Usuário não encontrado.");
        } else {
          setError("Ocorreu um erro ao buscar os dados.");
        }      
      })
  };

  return (
    <div className="container-geral">
      <div className="container">
        <header className="header-top">
          Projeto EMIDES2AM
        </header>
        <main>
          <div className="form">
            <h1>Consumindo API do GitHub</h1>
            <input
              type="text"
              placeholder="Digite o usuário"
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />
            <button onClick={handleSearch} disabled={loading}>
              {loading ? "Consultando..." : "Consultar"}
            </button>
            {error && <p className="error-message">{error}</p>}
          </div>
          <div className="conteudo">
            <div>
              <img src={avatar_url} alt="Avatar" />
              <h1>{name}</h1>
              <p>{bio}</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
