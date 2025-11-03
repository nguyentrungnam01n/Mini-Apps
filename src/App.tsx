import { sdk } from "@farcaster/frame-sdk";
import { useEffect, useState } from "react";
import { useAccount, useConnect, useSignMessage } from "wagmi";

function App() {
  const [context, setContext] = useState<any>(null);
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);

  useEffect(() => {
    const load = async () => {
      // Lấy thông tin user từ Farcaster
      const userContext = await sdk.context;
      setContext(userContext);
      setIsSDKLoaded(true);
      
      // QUAN TRỌNG: Gọi ready() để ẩn màn hình loading
      sdk.actions.ready();
    };
    load();
  }, []);

  if (!isSDKLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>🎉 Chào mừng đến Mini App của tôi!</h1>
      
      {context?.user && (
        <div style={{ 
          background: "#f0f0f0", 
          padding: "15px", 
          borderRadius: "8px",
          marginBottom: "20px" 
        }}>
          <h2>👤 Thông tin User</h2>
          <p><strong>Username:</strong> {context.user.username}</p>
          <p><strong>Display Name:</strong> {context.user.displayName}</p>
          <p><strong>FID:</strong> {context.user.fid}</p>
        </div>
      )}

      <div style={{ 
        background: "#e3f2fd", 
        padding: "15px", 
        borderRadius: "8px",
        marginBottom: "20px" 
      }}>
        <h2>🔗 Kết nối Ví</h2>
        <ConnectMenu />
      </div>
    </div>
  );
}

function ConnectMenu() {
  const { isConnected, address } = useAccount();
  const { connect, connectors } = useConnect();

  if (isConnected) {
    return (
      <div>
        <p style={{ color: "#4caf50", fontWeight: "bold" }}>
          ✅ Đã kết nối ví
        </p>
        <p style={{ 
          background: "#fff", 
          padding: "10px", 
          borderRadius: "5px",
          wordBreak: "break-all",
          fontSize: "14px"
        }}>
          <strong>Địa chỉ:</strong><br />
          {address}
        </p>
        <SignButton />
      </div>
    );
  }

  return (
    <button 
      type="button" 
      onClick={() => connect({ connector: connectors[0] })}
      style={{
        background: "#1976d2",
        color: "white",
        padding: "12px 24px",
        border: "none",
        borderRadius: "5px",
        fontSize: "16px",
        cursor: "pointer",
        fontWeight: "bold"
      }}
    >
      🔗 Kết nối Ví
    </button>
  );
}

function SignButton() {
  const { signMessage, isPending, data, error } = useSignMessage();

  return (
    <div style={{ marginTop: "15px" }}>
      <button 
        type="button" 
        onClick={() => signMessage({ message: "hello world" })} 
        disabled={isPending}
        style={{
          background: isPending ? "#ccc" : "#4caf50",
          color: "white",
          padding: "12px 24px",
          border: "none",
          borderRadius: "5px",
          fontSize: "16px",
          cursor: isPending ? "not-allowed" : "pointer",
          fontWeight: "bold"
        }}
      >
        {isPending ? "⏳ Đang ký..." : "✍️ Ký Message"}
      </button>
      
      {data && (
        <div style={{ 
          marginTop: "15px",
          background: "#e8f5e9",
          padding: "15px",
          borderRadius: "5px"
        }}>
          <p style={{ fontWeight: "bold", color: "#2e7d32" }}>✅ Chữ ký:</p>
          <p style={{ 
            wordBreak: "break-all", 
            fontSize: "12px",
            background: "#fff",
            padding: "10px",
            borderRadius: "3px"
          }}>
            {data}
          </p>
        </div>
      )}
      
      {error && (
        <div style={{ 
          marginTop: "15px",
          background: "#ffebee",
          padding: "15px",
          borderRadius: "5px"
        }}>
          <p style={{ fontWeight: "bold", color: "#c62828" }}>❌ Lỗi:</p>
          <p style={{ fontSize: "14px" }}>{error.message}</p>
        </div>
      )}
    </div>
  );
}

export default App;
