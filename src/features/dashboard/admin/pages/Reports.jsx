import React, { useState } from 'react'
import { CalendarBlank, TrendUp, TrendDown, CaretLeft, CaretRight } from 'phosphor-react'

const StatsCard = ({ title, value, change, trend, icon: Icon }) => (
  <div className="border-[3px] border-[#EBEBEB] rounded-2xl p-6 flex-1">
    <div className="flex items-start justify-between mb-4">
      <div className="flex-1">
        <div className="text-sm font-medium text-[#686262] mb-2">{title}</div>
        <div className="text-[30px] font-semibold text-black mb-2">{value}</div>
        <div className="flex items-center gap-2">
          {trend === 'up' ? (
            <TrendUp size={16} className="text-[#54C020]" weight="bold" />
          ) : (
            <TrendDown size={16} className="text-[#FF3232]" weight="bold" />
          )}
          <span className={`text-xs font-medium ${trend === 'up' ? 'text-[#54C020]' : 'text-[#FF3232]'}`}>
            {change}
          </span>
          <span className="text-xs text-[#686262]">vs last month</span>
        </div>
      </div>
      {Icon && (
        <div className="w-12 h-12 rounded-xl bg-[#E1E3FF] flex items-center justify-center">
          <Icon size={24} className="text-[#626AE7]" weight="bold" />
        </div>
      )}
    </div>
  </div>
)

const ActivityCard = ({ activity }) => (
  <div className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors">
    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
      activity.type === 'user' ? 'bg-[#E1E3FF]' :
      activity.type === 'claim' ? 'bg-[#FFE4E4]' :
      'bg-[#FFF1C9]'
    }`}>
      <span className="text-lg">{activity.icon}</span>
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-sm font-medium text-black mb-1">{activity.title}</div>
      <div className="text-xs text-[#929594]">{activity.description}</div>
      <div className="text-xs text-[#929594] mt-1">{activity.time}</div>
    </div>
  </div>
)

const reportsData = [
  { id: 'RPT-001', type: 'User Activity', generatedBy: 'Admin', date: '2024-10-30', status: 'Completed' },
  { id: 'RPT-002', type: 'Claims Summary', generatedBy: 'SC Staff', date: '2024-10-29', status: 'Completed' },
  { id: 'RPT-003', type: 'Service Centers', generatedBy: 'Admin', date: '2024-10-28', status: 'Pending' },
  { id: 'RPT-004', type: 'Warranty Analysis', generatedBy: 'EVM Staff', date: '2024-10-27', status: 'Completed' },
  { id: 'RPT-005', type: 'Monthly Revenue', generatedBy: 'Admin', date: '2024-10-26', status: 'Completed' },
]

const recentActivities = [
  { type: 'user', icon: '👤', title: 'New user registered', description: 'John Doe joined as SC Staff', time: '5 minutes ago' },
  { type: 'claim', icon: '📋', title: 'Claim completed', description: 'RO-001 marked as completed by Andrew', time: '15 minutes ago' },
  { type: 'policy', icon: '📄', title: 'Policy updated', description: 'EVM Staff updated Policy #12', time: '1 hour ago' },
  { type: 'user', icon: '👤', title: 'User status changed', description: 'Sarah Connor set to inactive', time: '2 hours ago' },
  { type: 'claim', icon: '📋', title: 'New claim submitted', description: 'RO-008 submitted for review', time: '3 hours ago' },
]

export default function Reports() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 2

  return (
    <div className="p-12 w-full">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-[30px] font-semibold text-black mb-1">Reports & Analytics</h1>
          <p className="text-xl font-semibold text-[#929594]">Overview of system performance and activity.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-[17px] font-semibold text-[#393C3B]">31 October, 2025</span>
          <div className="w-[45px] h-[45px] rounded-full bg-[#F1F3F4] flex items-center justify-center">
            <CalendarBlank size={25} className="text-black" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatsCard 
          title="Total Claims" 
          value="2,458" 
          change="+12.5%" 
          trend="up"
          icon={({ size, className }) => (
            <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none">
              <path d="M9 11H7C6.46957 11 5.96086 11.2107 5.58579 11.5858C5.21071 11.9609 5 12.4696 5 13V21C5 21.5304 5.21071 22.0391 5.58579 22.4142C5.96086 22.7893 6.46957 23 7 23H17C17.5304 23 18.0391 22.7893 18.4142 22.4142C18.7893 22.0391 19 21.5304 19 21V13C19 12.4696 18.7893 11.9609 18.4142 11.5858C18.0391 11.2107 17.5304 11 17 11H15M9 11V7C9 5.93913 9.42143 4.92172 10.1716 4.17157C10.9217 3.42143 11.9391 3 13 3H14C15.0609 3 16.0783 3.42143 16.8284 4.17157C17.5786 4.92172 18 5.93913 18 7V11M9 11H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        />
        <StatsCard 
          title="Revenue" 
          value="$45,890" 
          change="+8.2%" 
          trend="up"
          icon={({ size, className }) => (
            <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13.41 18.09V19.5C13.41 20.05 12.96 20.5 12.41 20.5H11.59C11.04 20.5 10.59 20.05 10.59 19.5V18.07C9.07 17.79 7.72 16.92 7.23 15.38C7.08 14.93 7.42 14.5 7.89 14.5H8.64C8.96 14.5 9.24 14.71 9.37 15.01C9.75 15.88 10.47 16.36 11.96 16.36C13.79 16.36 14.27 15.45 14.27 14.87C14.27 14.09 13.79 13.36 11.67 12.91C9.22 12.38 7.63 11.5 7.63 9.46C7.63 7.73 9.02 6.64 10.59 6.31V4.5C10.59 3.95 11.04 3.5 11.59 3.5H12.41C12.96 3.5 13.41 3.95 13.41 4.5V6.33C14.73 6.67 15.78 7.48 16.18 8.79C16.31 9.24 15.97 9.66 15.5 9.66H14.78C14.47 9.66 14.19 9.47 14.05 9.18C13.75 8.54 13.17 8.09 11.96 8.09C10.36 8.09 9.63 8.81 9.63 9.55C9.63 10.31 10.21 10.88 12.36 11.35C14.51 11.82 16.27 12.59 16.27 14.83C16.26 16.53 15.02 17.76 13.41 18.09Z" fill="currentColor"/>
            </svg>
          )}
        />
        <StatsCard 
          title="Active Users" 
          value="1,250" 
          change="+5.7%" 
          trend="up"
          icon={({ size, className }) => (
            <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none">
              <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        />
        <StatsCard 
          title="Completion Rate" 
          value="87.5%" 
          change="-2.3%" 
          trend="down"
          icon={({ size, className }) => (
            <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none">
              <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Generated Reports */}
        <div className="lg:col-span-2">
          <h2 className="text-[25px] font-semibold text-black mb-6">Generated Reports</h2>
          
          <div className="border-[3px] border-[#EBEBEB] rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-[#DEE1E6] bg-[#FAFAFA]">
                  <th className="text-left px-6 py-3 text-sm font-medium text-[#686262]">Report ID</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-[#686262]">Type</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-[#686262]">Generated By</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-[#686262]">Date</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-[#686262]">Status</th>
                </tr>
              </thead>
              <tbody>
                {reportsData.map((report, index) => (
                  <tr key={index} className="border-b-2 border-[#DEE1E6] bg-white hover:bg-gray-50">
                    <td className="px-6 py-3 text-xs font-medium text-black">{report.id}</td>
                    <td className="px-6 py-3 text-xs font-medium text-black">{report.type}</td>
                    <td className="px-6 py-3 text-xs font-medium text-black">{report.generatedBy}</td>
                    <td className="px-6 py-3 text-xs font-medium text-black">{report.date}</td>
                    <td className="px-6 py-3">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-medium ${
                        report.status === 'Completed' 
                          ? 'bg-[#E8F5E9] text-[#54C020]' 
                          : 'bg-[#FFF1C9] text-[#E29A00]'
                      }`}>
                        {report.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="flex items-center justify-between px-6 py-4 bg-white">
              <span className="text-xs font-normal text-black">Showing 1 to 5 of 12 reports</span>
              
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 bg-white text-xs font-semibold text-black hover:text-[#626AE7] disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  <CaretLeft size={10} />
                  Previous
                </button>
                
                <div className="flex items-center gap-2">
                  {[1, 2].map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-7 h-7 rounded-full text-xs font-medium flex items-center justify-center transition-colors ${
                        currentPage === page
                          ? 'bg-[#626AE7] text-white'
                          : 'bg-white text-[#727674] hover:text-black'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                
                <button 
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1 bg-white text-xs font-medium text-black hover:text-[#626AE7] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                  <CaretRight size={10} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-[25px] font-semibold text-black mb-6">Recent Activity</h2>
          <div className="border-[3px] border-[#EBEBEB] rounded-2xl p-4 bg-white max-h-[600px] overflow-y-auto">
            <div className="space-y-2">
              {recentActivities.map((activity, index) => (
                <ActivityCard key={index} activity={activity} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
