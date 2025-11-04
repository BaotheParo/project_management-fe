# 🔧 FIX CORS ERROR - Hướng dẫn

## ❌ Lỗi hiện tại:
**CORS Policy Error**: Frontend tại `localhost:5173` không thể gọi API tại `https://dev-be-wm.fleeforezz.site` vì backend chưa cấu hình CORS.

## ✅ Giải pháp đã thêm (Workaround Frontend):

### 1. Vite Proxy (Development only)
Đã thêm proxy trong `vite.config.js` để bypass CORS trong development:
- Frontend gọi `/api/...` 
- Vite proxy tự động forward đến `https://dev-be-wm.fleeforezz.site/api/...`
- Browser không bị CORS vì cùng origin (localhost)

### 2. Auto-detect environment
Đã cập nhật `axiousInstance.js`:
- **Development**: Sử dụng `/api` (qua proxy)
- **Production**: Sử dụng full URL `https://dev-be-wm.fleeforezz.site/api`

## 📝 Cách sử dụng:

1. **Development (local):**
   ```bash
   npm run dev
   ```
   - API calls sẽ tự động qua Vite proxy
   - Không cần thay đổi gì trong code

2. **Production:**
   - Vẫn sử dụng full URL như bình thường
   - Backend cần cấu hình CORS cho domain production

## ⚠️ Lưu ý:

- **Proxy chỉ hoạt động trong development** (khi chạy `npm run dev`)
- **Production build** vẫn cần backend cấu hình CORS đúng
- Đây chỉ là **workaround tạm thời** cho development
- **Giải pháp lâu dài**: Backend cần cấu hình CORS đúng cách

## 🔍 Kiểm tra:

1. Restart dev server: `npm run dev`
2. Thử login lại
3. Nếu vẫn còn lỗi CORS, kiểm tra:
   - Dev server đã restart chưa?
   - Console còn lỗi CORS không?
   - Network tab: Request đi qua `/api/...` (proxy) hay full URL?

## 📌 Báo team backend:

Nếu muốn fix tận gốc, báo team backend:
- **Vấn đề**: Backend chưa cấu hình CORS cho `localhost:5173`
- **Cần thêm**: `Access-Control-Allow-Origin: http://localhost:5173` 
- **Hoặc**: `Access-Control-Allow-Origin: *` (cho development, không nên dùng production)


