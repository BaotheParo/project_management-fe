import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { useStatisticsApi } from '../../../../api/useStatisticsApi';
import { useAuth } from '../../../../app/AuthProvider';
import { ROLES } from '../../../../constants/Roles';
import Loader from '../../../../components/Loader';
import Notification from '../../../../components/Notification';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

// Overview Card Component
const OverviewCard = ({ title, value, icon, color = "indigo" }) => {
  const colorClasses = {
    indigo: 'bg-indigo-100 text-indigo-600',
    green: 'bg-green-100 text-green-600',
    blue: 'bg-blue-100 text-blue-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600'
  };

  return (
    <div className="bg-white rounded-2xl p-6 border-2 border-[#EBEBEB] shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        {icon && (
          <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
            {icon}
          </div>
        )}
      </div>
      <p className="text-3xl font-bold text-black">{value}</p>
    </div>
  );
};

// Date Range Presets
const getPresetDates = (preset) => {
  const endDate = new Date();
  const startDate = new Date();

  switch (preset) {
    case '7days':
      startDate.setDate(endDate.getDate() - 7);
      break;
    case '30days':
      startDate.setDate(endDate.getDate() - 30);
      break;
    case 'thisMonth':
      startDate.setDate(1);
      break;
    case 'lastMonth':
      startDate.setMonth(endDate.getMonth() - 1);
      startDate.setDate(1);
      endDate.setDate(0); // Last day of previous month
      break;
    default:
      startDate.setDate(endDate.getDate() - 30);
  }

  return {
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0]
  };
};

const Dashboard = () => {
  const { user } = useAuth();
  const isAdmin = user?.roles === ROLES.ADMIN;

  const { statistics, loading, error, fetchStatistics } = useStatisticsApi();

  const [dateRange, setDateRange] = useState(() => getPresetDates('30days'));
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: 'success' }), 3000);
  };

  useEffect(() => {
    loadStatistics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadStatistics = async () => {
    try {
      await fetchStatistics(dateRange.startDate, dateRange.endDate);
    } catch (error) {
      console.error('Failed to load statistics:', error);
      showNotification('Không thể tải dữ liệu thống kê', 'error');
    }
  };

  const handlePresetClick = (preset) => {
    const dates = getPresetDates(preset);
    setDateRange(dates);
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleApplyFilter = () => {
    loadStatistics();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount || 0);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('vi-VN').format(num || 0);
  };

  // Prepare chart data for Revenue Over Time
  const revenueChartData = {
    labels: statistics?.revenueOverTime?.map(item => item.date) || [],
    datasets: [
      {
        label: 'Doanh thu (VND)',
        data: statistics?.revenueOverTime?.map(item => item.revenue) || [],
        borderColor: 'rgb(79, 70, 229)',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const revenueChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Doanh thu theo thời gian'
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return formatCurrency(context.parsed.y);
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return new Intl.NumberFormat('vi-VN', { notation: 'compact', compactDisplay: 'short' }).format(value);
          }
        }
      }
    }
  };

  // Prepare chart data for Top Performers
  const performersChartData = {
    labels: statistics?.topPerformers?.map(item => item.label) || [],
    datasets: [
      {
        label: 'Doanh thu (VND)',
        data: statistics?.topPerformers?.map(item => item.value) || [],
        backgroundColor: [
          'rgba(79, 70, 229, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)'
        ],
        borderColor: [
          'rgb(79, 70, 229)',
          'rgb(59, 130, 246)',
          'rgb(16, 185, 129)',
          'rgb(245, 158, 11)',
          'rgb(239, 68, 68)'
        ],
        borderWidth: 2
      }
    ]
  };

  const performersChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: isAdmin ? 'Top 5 Nhà xe theo Doanh thu' : 'Top 5 Tuyến xe theo Doanh thu'
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return formatCurrency(context.parsed.y);
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return new Intl.NumberFormat('vi-VN', { notation: 'compact', compactDisplay: 'short' }).format(value);
          }
        }
      }
    }
  };

  if (loading && !statistics) return <Loader />;

  return (
    <div className="p-12 w-full">
      <div className="mb-8">
        <h1 className="text-[30px] font-semibold text-black mb-1">
          {isAdmin ? 'Dashboard Quản Trị' : 'Dashboard Nhà Điều Hành'}
        </h1>
        <p className="text-xl font-semibold text-[#929594]">
          Thống kê và báo cáo doanh thu
        </p>
      </div>

      {/* Filter Area */}
      <div className="bg-white rounded-2xl p-6 mb-6 border-2 border-[#EBEBEB]">
        <h3 className="text-lg font-semibold mb-4">Chọn khoảng thời gian</h3>
        
        {/* Quick Presets */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => handlePresetClick('7days')}
            className="px-4 py-2 bg-gray-100 hover:bg-indigo-100 text-gray-700 hover:text-indigo-700 rounded-lg font-medium transition-colors"
          >
            7 ngày qua
          </button>
          <button
            onClick={() => handlePresetClick('30days')}
            className="px-4 py-2 bg-gray-100 hover:bg-indigo-100 text-gray-700 hover:text-indigo-700 rounded-lg font-medium transition-colors"
          >
            30 ngày qua
          </button>
          <button
            onClick={() => handlePresetClick('thisMonth')}
            className="px-4 py-2 bg-gray-100 hover:bg-indigo-100 text-gray-700 hover:text-indigo-700 rounded-lg font-medium transition-colors"
          >
            Tháng này
          </button>
          <button
            onClick={() => handlePresetClick('lastMonth')}
            className="px-4 py-2 bg-gray-100 hover:bg-indigo-100 text-gray-700 hover:text-indigo-700 rounded-lg font-medium transition-colors"
          >
            Tháng trước
          </button>
        </div>

        {/* Custom Date Range */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Từ ngày</label>
            <input
              type="date"
              name="startDate"
              value={dateRange.startDate}
              onChange={handleDateChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Đến ngày</label>
            <input
              type="date"
              name="endDate"
              value={dateRange.endDate}
              onChange={handleDateChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={handleApplyFilter}
              disabled={loading}
              className="w-full px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Đang tải...' : 'Xem Báo cáo'}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 rounded-lg text-red-800">
          ⚠️ {error}
        </div>
      )}

      {statistics && (
        <>
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <OverviewCard
              title="Tổng Doanh thu"
              value={formatCurrency(statistics.totalRevenue)}
              color="green"
              icon={<span className="text-2xl">💰</span>}
            />
            <OverviewCard
              title="Tổng vé đã bán"
              value={`${formatNumber(statistics.totalTicketsSold)} vé`}
              color="blue"
              icon={<span className="text-2xl">🎫</span>}
            />
            {isAdmin ? (
              <>
                <OverviewCard
                  title="Nhà xe hoạt động"
                  value={`${formatNumber(statistics.totalOperators)} nhà xe`}
                  color="purple"
                  icon={<span className="text-2xl">🚌</span>}
                />
                <OverviewCard
                  title="Khách hàng mới"
                  value={`${formatNumber(statistics.totalNewCustomers)} khách`}
                  color="orange"
                  icon={<span className="text-2xl">👥</span>}
                />
              </>
            ) : (
              <>
                <OverviewCard
                  title="Tổng số chuyến"
                  value={`${formatNumber(statistics.totalTrips)} chuyến`}
                  color="purple"
                  icon={<span className="text-2xl">🚌</span>}
                />
                <OverviewCard
                  title="Tỷ lệ lấp đầy (TB)"
                  value={`${statistics.averageOccupancy?.toFixed(1) || 0}%`}
                  color="orange"
                  icon={<span className="text-2xl">📊</span>}
                />
              </>
            )}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Over Time Chart */}
            <div className="bg-white rounded-2xl p-6 border-2 border-[#EBEBEB]">
              <Line data={revenueChartData} options={revenueChartOptions} />
            </div>

            {/* Top Performers Chart */}
            <div className="bg-white rounded-2xl p-6 border-2 border-[#EBEBEB]">
              <Bar data={performersChartData} options={performersChartOptions} />
            </div>
          </div>
        </>
      )}

      {/* Notification */}
      {notification.show && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ show: false, message: '', type: 'success' })}
        />
      )}
    </div>
  );
};

export default Dashboard;
