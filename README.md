# 🎉 Farcaster Mini App Demo

Mini App demo sử dụng Farcaster Frame SDK và Wagmi để kết nối ví và ký message.

🌐 **Live Demo:** https://ggdwg.com

## ✨ Tính năng

- 👤 **Hiển thị thông tin user** từ Farcaster (username, display name, FID)
- 🔗 **Kết nối ví** sử dụng Wagmi
- ✍️ **Ký message** với ví đã kết nối
- 🎨 **UI responsive** với styling inline

## 🚀 Cài đặt

```bash
# Clone hoặc tạo project
cd demo

# Cài đặt dependencies
npm install

# Chạy dev server
npm run dev
```

## 📦 Dependencies chính

- `@farcaster/frame-sdk` - SDK để tương tác với Farcaster
- `wagmi` - Hooks React để làm việc với Ethereum
- `vite` - Build tool nhanh cho React
- `typescript` - Type safety

## 🔧 Cấu trúc project

```
demo/
├── src/
│   ├── App.tsx          # Component chính với logic Mini App
│   ├── main.tsx         # Entry point
│   ├── wagmi.ts         # Cấu hình Wagmi
│   └── index.css        # Global styles
├── public/
│   ├── .well-known/
│   │   └── farcaster.json  # Cấu hình Mini App
│   ├── icon.png         # App icon (512x512px)
│   └── splash.png       # Splash screen (1200x630px)
└── index.html           # HTML template
```

## 📝 Cách hoạt động

### 1. Load Farcaster Context
```tsx
useEffect(() => {
  const load = async () => {
    const userContext = await sdk.context;
    setContext(userContext);
    setIsSDKLoaded(true);
    sdk.actions.ready(); // Ẩn splash screen
  };
  load();
}, []);
```

### 2. Kết nối ví với Wagmi
```tsx
const { isConnected, address } = useAccount();
const { connect, connectors } = useConnect();
```

### 3. Ký message
```tsx
const { signMessage, isPending, data, error } = useSignMessage();
signMessage({ message: "hello world" });
```

## 🧪 Preview trong Warpcast

1. Chạy dev server: `npm run dev`
2. Mở [Mini App Debug Tool](https://farcaster.xyz/~/developers/mini-apps/debug)
3. Nhập URL: `ggdwg.com` (production) hoặc localhost URL
4. Click **Preview**

## 🌐 Deploy lên Vercel

```bash
# Build production
npm run build

# Preview build locally
npm run preview
```

### Setup Custom Domain

1. **Trong Vercel Dashboard:**
   - Settings → Domains
   - Add domain: `ggdwg.com`
   - Follow DNS setup instructions

2. **Cấu hình DNS (tại nhà cung cấp domain):**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME  
   Name: www
   Value: cname.vercel-dns.com
   ```

3. **Đợi DNS propagate** (5-30 phút)

### Generate Farcaster Signature

1. Mở [Mini App Manifest Tools](https://farcaster.xyz/~/developers/mini-apps)
2. Nhập domain: `ggdwg.com`
3. Click **Generate Signature**
4. Copy `accountAssociation` object vào `public/.well-known/farcaster.json`
5. Re-deploy

## 📄 `farcaster.json`

File `/.well-known/farcaster.json` được serve từ thư mục [public](https://vite.dev/guide/assets):

```json
{
  "accountAssociation": {
    "header": "...",
    "payload": "...",
    "signature": "..."
  },
  "frame": {
    "version": "next",
    "name": "Mini App Demo",
    "iconUrl": "https://ggdwg.com/icon.png",
    "homeUrl": "https://ggdwg.com",
    "splashImageUrl": "https://ggdwg.com/splash.png",
    "splashBackgroundColor": "#1976d2"
  },
  "domain": "ggdwg.com"
}
```

**Lưu ý:** Cần thêm file `icon.png` và `splash.png` vào folder `public/`

## 🖼️ Frame Embed

Thêm `fc:frame` vào `index.html` để URL app có thể share trong feed:

```html
<head>
  <!--- other tags --->
  <meta name="fc:frame" content='{"version":"next","imageUrl":"https://ggdwg.com/splash.png","button":{"title":"Open App","action":{"type":"launch_frame","name":"Mini App Demo","url":"https://ggdwg.com"}}}' /> 
</head>
```

## 📚 Tài liệu

- [Farcaster Mini Apps Documentation](https://miniapps.farcaster.xyz/docs/getting-started)
- [Wagmi Documentation](https://wagmi.sh)
- [Vite Documentation](https://vitejs.dev)
- [Mini App Debug Tool](https://farcaster.xyz/~/developers/mini-apps/debug)
- [Mini App Manifest Tools](https://farcaster.xyz/~/developers/mini-apps)

## 📄 License

MIT

