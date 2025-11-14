import React, { useState, useEffect, useRef } from 'react';
import { QrCode, Keyboard, CheckCircle, XCircle, Warning } from '@phosphor-icons/react';
import { useValidationApi } from '../../../../api/useValidationApi';
import Loader from '../../../../components/Loader';

// Validation Status Constants
const VALIDATION_STATUS = {
  IDLE: 'IDLE',
  SCANNING: 'SCANNING',
  MANUAL_INPUT: 'MANUAL_INPUT',
  VALID: 'VALID',
  ALREADY_SCANNED: 'ALREADY_SCANNED',
  INVALID: 'INVALID'
};

const TicketValidation = () => {
  const { loading, error, validateTicket, resetValidation } = useValidationApi();
  const [status, setStatus] = useState(VALIDATION_STATUS.IDLE);
  const [manualTicketId, setManualTicketId] = useState('');
  const [resultMessage, setResultMessage] = useState('');
  const timeoutRef = useRef(null);

  const handleReturnToScanning = () => {
    resetValidation();
    setStatus(VALIDATION_STATUS.IDLE);
    setManualTicketId('');
    setResultMessage('');
  };

  // Auto return to scanning after showing result
  useEffect(() => {
    if (status === VALIDATION_STATUS.VALID || 
        status === VALIDATION_STATUS.ALREADY_SCANNED || 
        status === VALIDATION_STATUS.INVALID) {
      
      timeoutRef.current = setTimeout(() => {
        handleReturnToScanning();
      }, 4000); // 4 seconds

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const handleScanQR = () => {
    setStatus(VALIDATION_STATUS.SCANNING);
    // In a real implementation, this would activate the camera
    // For demo purposes, we'll simulate QR scanning after 2 seconds
    setTimeout(() => {
      // Simulate QR code detection (replace with actual QR scanner library)
      const mockQRCode = 'ticket-uuid-from-qr-' + Date.now();
      handleValidation(mockQRCode, 'QR_SCAN');
    }, 2000);
  };

  const handleManualValidation = async () => {
    if (!manualTicketId.trim()) {
      setResultMessage('Vui lòng nhập mã vé');
      return;
    }
    await handleValidation(manualTicketId, 'MANUAL');
  };

  const handleValidation = async (ticketId, method) => {
    try {
      const result = await validateTicket(ticketId, method);
      
      // Determine status based on API response
      if (result.status === 'PURCHASED') {
        setStatus(VALIDATION_STATUS.VALID);
        setResultMessage('Chúc quý khách chuyến đi vui vẻ!');
      } else if (result.status === 'CANCELLED') {
        setStatus(VALIDATION_STATUS.ALREADY_SCANNED);
        setResultMessage('Vé này đã được xác thực trước đó. Vui lòng kiểm tra lại.');
      }
    } catch {
      setStatus(VALIDATION_STATUS.INVALID);
      setResultMessage(error || 'Vé không hợp lệ. Vui lòng kiểm tra lại.');
    }
  };

  // Render different screens based on status
  if (loading) return <Loader />;

  // Screen 3A: Valid Ticket
  if (status === VALIDATION_STATUS.VALID) {
    return (
      <div className="fixed inset-0 bg-green-500 flex flex-col items-center justify-center p-8 z-50">
        <CheckCircle size={180} weight="fill" className="text-white mb-8 animate-pulse" />
        <h1 className="text-6xl font-bold text-white mb-4 text-center">VÉ HỢP LỆ</h1>
        <h3 className="text-3xl font-medium text-white text-center">{resultMessage}</h3>
      </div>
    );
  }

  // Screen 3B: Already Scanned
  if (status === VALIDATION_STATUS.ALREADY_SCANNED) {
    return (
      <div className="fixed inset-0 bg-yellow-500 flex flex-col items-center justify-center p-8 z-50">
        <Warning size={180} weight="fill" className="text-white mb-8 animate-pulse" />
        <h1 className="text-6xl font-bold text-white mb-4 text-center">VÉ ĐÃ ĐƯỢC QUÉT</h1>
        <h3 className="text-3xl font-medium text-white text-center">{resultMessage}</h3>
      </div>
    );
  }

  // Screen 3C: Invalid Ticket
  if (status === VALIDATION_STATUS.INVALID) {
    return (
      <div className="fixed inset-0 bg-red-500 flex flex-col items-center justify-center p-8 z-50">
        <XCircle size={180} weight="fill" className="text-white mb-8 animate-pulse" />
        <h1 className="text-6xl font-bold text-white mb-4 text-center">VÉ KHÔNG HỢP LỆ</h1>
        <h3 className="text-3xl font-medium text-white text-center">{resultMessage}</h3>
      </div>
    );
  }

  // Screen 2: Manual Input
  if (status === VALIDATION_STATUS.MANUAL_INPUT) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex flex-col items-center justify-center p-8">
        <div className="bg-white rounded-3xl shadow-2xl p-12 w-full max-w-2xl">
          <div className="flex items-center justify-center mb-8">
            <Keyboard size={80} weight="duotone" className="text-indigo-600" />
          </div>
          
          <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Nhập Mã Vé Thủ Công</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-xl font-medium text-gray-700 mb-3">ID Vé</label>
              <input
                type="text"
                value={manualTicketId}
                onChange={(e) => setManualTicketId(e.target.value)}
                placeholder="Nhập UUID của vé"
                className="w-full px-6 py-5 text-2xl border-3 border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500"
                autoFocus
              />
            </div>

            <button
              onClick={handleManualValidation}
              disabled={loading}
              className="w-full py-6 bg-green-600 text-white text-3xl font-bold rounded-2xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-3"
            >
              <CheckCircle size={40} weight="bold" />
              XÁC THỰC
            </button>

            <button
              onClick={() => setStatus(VALIDATION_STATUS.IDLE)}
              className="w-full py-4 bg-gray-200 text-gray-700 text-xl font-semibold rounded-2xl hover:bg-gray-300 transition-colors"
            >
              ← Quay lại quét QR
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Screen 1: Ready to Scan (IDLE or SCANNING)
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex flex-col items-center justify-center p-8">
      <div className="bg-white rounded-3xl shadow-2xl p-12 w-full max-w-4xl">
        <h1 className="text-5xl font-bold text-gray-800 mb-8 text-center">Xác Thực Vé</h1>
        
        {/* Camera Viewfinder Simulation */}
        <div className="relative bg-gray-900 rounded-3xl overflow-hidden mb-8" style={{ aspectRatio: '4/3' }}>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {status === VALIDATION_STATUS.SCANNING ? (
              <>
                <div className="w-64 h-64 border-4 border-white rounded-2xl animate-pulse"></div>
                <p className="text-white text-2xl font-semibold mt-6 animate-pulse">Đang quét mã QR...</p>
              </>
            ) : (
              <>
                <QrCode size={120} weight="duotone" className="text-white mb-6" />
                <p className="text-white text-2xl font-semibold text-center px-8">
                  Di chuyển camera đến mã QR trên vé của hành khách
                </p>
              </>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleScanQR}
            disabled={status === VALIDATION_STATUS.SCANNING}
            className="w-full py-6 bg-indigo-600 text-white text-3xl font-bold rounded-2xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-3"
          >
            <QrCode size={40} weight="bold" />
            {status === VALIDATION_STATUS.SCANNING ? 'Đang quét...' : 'Bắt đầu quét QR'}
          </button>

          <button
            onClick={() => setStatus(VALIDATION_STATUS.MANUAL_INPUT)}
            className="w-full py-4 bg-white border-3 border-indigo-300 text-indigo-600 text-xl font-semibold rounded-2xl hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2"
          >
            <Keyboard size={28} weight="bold" />
            Không quét được? Nhập mã thủ công
          </button>
        </div>

        {/* Instructions */}
        <div className="mt-8 p-6 bg-blue-50 rounded-2xl">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">📋 Hướng dẫn sử dụng:</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• Nhấn "Bắt đầu quét QR" để kích hoạt camera</li>
            <li>• Đưa camera đến mã QR trên vé của hành khách</li>
            <li>• Nếu QR bị mờ hoặc hỏng, chọn "Nhập mã thủ công"</li>
            <li>• Kết quả xác thực sẽ hiển thị tự động</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TicketValidation;
