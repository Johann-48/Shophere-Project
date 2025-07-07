import { createContext, useState } from "react";

export const AuthContext = createContext({
  token: null,
  role: null,
  setToken: () => {},
  setRole: () => {},
});

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));

  // Sempre que você logar, deve fazer:
  // localStorage.setItem("token", novoToken);
  // localStorage.setItem("role", novoRole);
  // setToken(novoToken); setRole(novoRole);

  return (
    <AuthContext.Provider value={{ token, role, setToken, setRole }}>
      {children}
    </AuthContext.Provider>
  );
}
