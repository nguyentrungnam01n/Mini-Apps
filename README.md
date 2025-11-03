# 🎉 Farcaster Mini App Demo

Mini App demo sử dụng Farcaster Frame SDK và Wagmi để kết nối ví và ký message.

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
│   └── .well-known/
│       └── farcaster.json  # Cấu hình Mini App
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
3. Nhập URL của bạn (localhost hoặc public URL)
4. Click **Preview**

## 🌐 Deploy

```bash
# Build production
npm run build

# Preview build locally
npm run preview
```

Deploy folder `dist/` lên hosting service (Vercel, Netlify, v.v.)

## `farcaster.json`

File `/.well-known/farcaster.json` được serve từ thư mục [public](https://vite.dev/guide/assets) và có thể chỉnh sửa tại `./public/.well-known/farcaster.json`.

Bạn có thể dùng thư mục `public` để serve ảnh static cho `splashBackgroundImageUrl`.

## Frame Embed

Thêm `fc:frame` vào `index.html` để URL app có thể share trong feed:

```html
<head>
  <!--- other tags --->
  <meta name="fc:frame" content='{"version":"next","imageUrl":"https://placehold.co/900x600.png?text=Frame%20Image","button":{"title":"Open","action":{"type":"launch_frame","name":"App Name","url":"https://app.com"}}}' /> 
</head>
```

## 📚 Tài liệu

- [Farcaster Mini Apps Documentation](https://miniapps.farcaster.xyz/docs/getting-started)
- [Wagmi Documentation](https://wagmi.sh)
- [Vite Documentation](https://vitejs.dev)

## 📄 License

MIT

