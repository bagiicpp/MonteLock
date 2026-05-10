import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { argon2id } from "hash-wasm";

type AuthUser = {
  id: string;
  username: string;
  email: string;
  masterPasswordSalt: string;
};

type AuthContextType = {
  user: AuthUser | null;
  masterEncryptionKey: Uint8Array | null;
  isLoadingSession: boolean;
  login: (user: AuthUser, key: Uint8Array) => void;
  logout: () => void;
  unlockVault: (password: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [masterEncryptionKey, setMasterEncryptionKey] =
    useState<Uint8Array | null>(null);
  const [isLoadingSession, setIsLoadingSession] = useState(true);

  // --- RESTORE SESSION ON REFRESH ---
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/auth/session", {
          credentials: "include", // Ensures the HttpOnly cookie is sent
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          // masterEncryptionKey remains null, which triggers the Lock Screen
        }
      } catch (error) {
        console.error("[AUTH] Session restoration failed:", error);
      } finally {
        setIsLoadingSession(false);
      }
    };

    checkSession();
  }, []);

  const login = (userData: AuthUser, key: Uint8Array) => {
    setUser(userData);
    setMasterEncryptionKey(key);
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
    } catch (error) {
      console.error("[AUTH FAULT] Failed to contact server for logout:", error);
    } finally {
      setUser(null);
      setMasterEncryptionKey(null);
    }
  };

  // --- RE-DERIVE KEY FOR LOCK SCREEN ---
  const unlockVault = async (password: string) => {
    if (!user || !user.masterPasswordSalt) {
      throw new Error("Missing user context or salt.");
    }

    try {
      // Decode the hex salt from the DB back into a Uint8Array
      const saltBuffer = new Uint8Array(
        user.masterPasswordSalt
          .match(/.{1,2}/g)!
          .map((byte) => parseInt(byte, 16)),
      );

      // Run Argon2id exactly as you do during login
      const derivedKeyHex = await argon2id({
        password: password,
        salt: saltBuffer,
        parallelism: 1,
        iterations: 3, // Matches Drizzle DB default
        memorySize: 65536, // 64MB
        hashLength: 32, // 256-bit key for AES-GCM
        outputType: "hex",
      });

      // Convert hex output to Uint8Array for Crypto API
      const derivedKeyBuffer = new Uint8Array(
        derivedKeyHex.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16)),
      );

      setMasterEncryptionKey(derivedKeyBuffer);
    } catch (error) {
      console.error("[KDF FAULT] Vault unlock failed:", error);
      throw new Error("Invalid Master Cipherphrase");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        masterEncryptionKey,
        isLoadingSession,
        login,
        logout,
        unlockVault,
      }}
    >
      {!isLoadingSession && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
