# 🔍 HƯỚNG DẪN KIỂM TRA API ĐÃ NỐI THÀNH CÔNG

## Cách 1: Kiểm tra qua Browser Console (Dễ nhất)

### Bước 1: Mở Browser Console
- Nhấn `F12` hoặc `Ctrl + Shift + I` (Windows) / `Cmd + Option + I` (Mac)
- Chọn tab **Console**

### Bước 2: Test Edit Claim
1. Đăng nhập vào hệ thống với tài khoản SC Technician
2. Vào trang **Claim Requests** (`/sc-technician/claims`)
3. Nhấn **Edit** trên một claim bất kỳ
4. Thay đổi một số thông tin (ví dụ: VIN, Vehicle Name, Issue Description)
5. Nhấn **Save Changes**

### Bước 3: Kiểm tra Console Logs

Khi bạn nhấn "Save Changes", bạn sẽ thấy các log sau trong Console:

```
🔵 ===== API UPDATE CLAIM CALL =====
📤 Endpoint: PUT /claims/[claim-id]
📦 Payload: { ... }
🆔 Claim ID: [claim-id]
🚀 [Axios] Sending PUT request to: /claims/[claim-id]
📦 [Axios] Request data: { ... }
🔑 [Axios] Has token: true
✅ [Axios] PUT request successful
📥 [Axios] Response status: 200
📥 [Axios] Response data: { ... }
✅ [useWarrantyClaims] Update response: { ... }
✅ [useWarrantyClaims] Update successful
✅ API call completed in XXX ms
🔵 ===== END API CALL =====
```

**Nếu thấy các log trên** → ✅ API đã được gọi thành công!

**Nếu thấy error logs** → API đã được gọi nhưng có lỗi (có thể do backend chưa sẵn sàng)

---

## Cách 2: Kiểm tra qua Network Tab (Chi tiết nhất)

### Bước 1: Mở Network Tab
- Nhấn `F12` hoặc `Ctrl + Shift + I`
- Chọn tab **Network**
- Đảm bảo có check vào **Preserve log**

### Bước 2: Test Edit Claim
1. Làm tương tự như Cách 1
2. Sau khi nhấn "Save Changes"

### Bước 3: Kiểm tra Network Request

Trong Network tab, bạn sẽ thấy:
- Request có method là **PUT**
- URL: `/api/claims/[claim-id]` hoặc `https://dev-be-wm.fleeforezz.site/api/claims/[claim-id]`
- Status Code:
  - **200** hoặc **204** = ✅ Success
  - **400** = ❌ Bad Request (dữ liệu không hợp lệ)
  - **401** = ❌ Unauthorized (chưa đăng nhập)
  - **404** = ❌ Not Found (claim không tồn tại)
  - **500** = ❌ Server Error (lỗi backend)

### Xem chi tiết Request:
1. Click vào request PUT `/claims/...`
2. Tab **Headers**: Xem request headers, URL, method
3. Tab **Payload** hoặc **Request**: Xem dữ liệu đã gửi lên
4. Tab **Response**: Xem response từ server (nếu có)

---

## Cách 3: Kiểm tra Response (Khi có Backend)

Nếu backend đã sẵn sàng, bạn sẽ thấy:

### Thành công (200 OK):
- Console log: `✅ [Axios] PUT request successful`
- Notification: "Success - Claim updated successfully!"
- Tự động quay về trang claims sau 1.5 giây

### Có lỗi:
- Console log: `❌ [Axios] PUT request failed`
- Notification: "Update Failed - [error message]"
- Console sẽ hiển thị chi tiết lỗi:
  - Status code
  - Error message từ backend
  - Error data

---

## Checklist để xác nhận API đã nối:

- [ ] Console hiển thị log: `🔵 ===== API UPDATE CLAIM CALL =====`
- [ ] Console hiển thị: `🚀 [Axios] Sending PUT request to: /claims/...`
- [ ] Network tab hiển thị request PUT đến `/claims/[id]`
- [ ] Request có đúng payload (VIN, vehicleName, issueDescription, etc.)
- [ ] Request có Authorization header với Bearer token
- [ ] Nếu backend có sẵn: Response status 200/204 và thấy notification success
- [ ] Nếu backend chưa sẵn: Console hiển thị error nhưng request đã được gửi đi

---

## Lưu ý:

1. **Không cần database để kiểm tra** - Chỉ cần xem Console/Network tab là biết API đã được gọi
2. **Error không có nghĩa là API chưa nối** - Nếu thấy error trong console nhưng request đã được gửi đi, nghĩa là API đã nối thành công, chỉ là backend chưa sẵn sàng
3. **Network tab là cách chính xác nhất** - Nó cho bạn thấy request thực tế đã được gửi đến server

---

## Ví dụ Console Logs khi thành công:

```
🔵 ===== API UPDATE CLAIM CALL =====
📤 Endpoint: PUT /claims/e616524d-1234-5678-9012-abcdef123456
📦 Payload: {
  "vin": "LSV1E7AL0MC123456",
  "issueDescription": "Engine problem",
  "vehicleName": "VinFast VF-8",
  "purchaseDate": "2024-01-15T00:00:00.000Z",
  "mileage": 5000,
  "partItems": [...]
}
🆔 Claim ID: e616524d-1234-5678-9012-abcdef123456
🚀 [Axios] Sending PUT request to: /claims/e616524d-1234-5678-9012-abcdef123456
📦 [Axios] Request data: { ... }
🔑 [Axios] Has token: true
✅ [Axios] PUT request successful
📥 [Axios] Response status: 200
✅ [useWarrantyClaims] Update response: { ... }
✅ API call completed in 234 ms
🔵 ===== END API CALL =====
```

