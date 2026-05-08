import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type AuthUser = {
  id: string;
  username: string;
  email: string;
};

type AuthContextType = {
  user: AuthUser | null;
  masterEncryptionKey: Uint8Array | null;
  login: (user: AuthUser, key: Uint8Array) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [masterEncryptionKey, setMasterEncryptionKey] =
    useState<Uint8Array | null>(null);

  const login = (userData: AuthUser, key: Uint8Array) => {
    setUser(userData);
    setMasterEncryptionKey(key);
  };

  const logout = () => {
    setUser(null);
    setMasterEncryptionKey(null);
  };

  return (
    <AuthContext.Provider value={{ user, masterEncryptionKey, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
