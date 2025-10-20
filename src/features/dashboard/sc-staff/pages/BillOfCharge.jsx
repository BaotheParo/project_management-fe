import React, { useState, useMemo, useEffect } from 'react'
import { Cube, Wrench, FileText, CurrencyDollar } from '@phosphor-icons/react'

export default function BillOfCharge() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showWarrantyCostModal, setShowWarrantyCostModal] = useState(false)
  const [selectedWork, setSelectedWork] = useState(null)
  
  const [workHistory] = useState([
    {
      id: 'RO-002',
      vehicle: 'VinFast VF-3',
      status: 'Completed',
      priority: 'HIGH',
      cost: '+3M',
      vin: 'LSV1E7AL0MC123456',
      assignee: 'Andrew Tate',
      date: 'July 21, 2025',
      time: 'Jso',
    },
    {
      id: 'RO-002',
      vehicle: 'VinFast VF-3',
      status: 'Completed',
      priority: 'MEDIUM',
      cost: '+3M',
      vin: 'LSV1E7AL0MC123456',
      assignee: 'Andrew',
      date: 'July 21, 2025',
      time: 'Jso',
    },
    {
      id: 'RO-002',
      vehicle: 'VinFast VF-3',
      status: 'Completed',
      priority: 'LOW',
      cost: '+3M',
      vin: 'LSV1E7AL0MC123456',
      assignee: 'Andrew',
      date: 'July 21, 2025',
      time: 'Jso',
    },
    {
      id: 'RO-002',
      vehicle: 'VinFast VF-3',
      status: 'Completed',
      priority: 'HIGH',
      cost: '+3M',
      vin: 'LSV1E7AL0MC123456',
      assignee: 'Andrew',
      date: 'July 21, 2025',
      time: 'Jso',
    },
    {
      id: 'RO-002',
      vehicle: 'VinFast VF-3',
      status: 'Completed',
      priority: 'HIGH',
      cost: '+3M',
      vin: 'LSV1E7AL0MC123456',
      assignee: 'Andrew',
      date: 'July 21, 2025',
      time: 'Jso',
    },
    {
      id: 'RO-002',
      vehicle: 'VinFast VF-3',
      status: 'Completed',
      priority: 'HIGH',
      cost: '+3M',
      vin: 'LSV1E7AL0MC123456',
      assignee: 'Andrew',
      date: 'July 21, 2025',
      time: 'Jso',
    },
  ])

  const filteredWorkHistory = useMemo(() => {
    return workHistory.filter(work => {
      const matchesSearch = searchTerm === '' || 
        work.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        work.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        work.assignee.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesSearch
    })
  }, [workHistory, searchTerm])

  useEffect(() => {
    const original = document.body.style.overflow
    if (showWarrantyCostModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = original || ''
    }
    return () => { document.body.style.overflow = original || '' }
  }, [showWarrantyCostModal])

  const handleWarrantyCostClick = (work) => {
    setSelectedWork(work)
    setShowWarrantyCostModal(true)
  }

  const mockWarrantyData = {
    parts: [
      { description: 'Battery Cell Module', quantity: 1, unitPrice: 2500.00, total: 2500.00 },
      { description: 'Cooling System Component', quantity: 2, unitPrice: 450.00, total: 450.00 },
      { description: 'Wiring Harness', quantity: 5, unitPrice: 320.00, total: 320.00 },
      { description: 'Something', quantity: 1, unitPrice: 12.00, total: 12.00 },
      { description: 'Something', quantity: 9, unitPrice: 800.00, total: 800.00 },
    ],
    labor: [
      { description: 'Diagnostic Testing', hours: 1, rate: 2500.00, total: 2500.00 },
      { description: 'Battery Module Replacement', hours: 2, rate: 450.00, total: 450.00 },
      { description: 'System Calibration', hours: 5, rate: 320.00, total: 320.00 },
      { description: 'Something', hours: 1, rate: 12.00, total: 12.00 },
      { description: 'Something', hours: 9, rate: 800.00, total: 800.00 },
    ],
    miscellaneous: [
      { description: 'Battery Cell Module', quantity: 1, unitPrice: 2500.00, total: 2500.00 },
      { description: 'Cooling System Component', quantity: 2, unitPrice: 450.00, total: 450.00 },
      { description: 'Wiring Harness', quantity: 5, unitPrice: 320.00, total: 320.00 },
      { description: 'Something', quantity: 1, unitPrice: 12.00, total: 12.00 },
      { description: 'Something', quantity: 9, unitPrice: 800.00, total: 800.00 },
    ],
    partsSubtotal: 3720.00,
    laborSubtotal: 3720.00,
    miscSubtotal: 3720.00,
    partsTotal: 3700.00,
    laborTotal: 1200.00,
    miscTotal: 110.00,
    grandTotal: 5030.00,
    warrantyCoverage: 100
  }

  return (
    <div className="min-h-screen bg-white p-6 md:p-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-[30px] font-semibold mb-1">Hello, SC Staff!</h1>
          <p className="text-xl text-[#929594] font-semibold">An overview of your works.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[17px] font-semibold text-[#393C3B]">16 May, 2025</span>
          <button 
            type="button"
            className="w-[45px] h-[45px] rounded-full bg-[#F1F3F4] flex items-center justify-center hover:bg-[#E5E7EB] active:bg-[#D1D5DB] focus:outline-none focus:ring-0 select-none transition-colors"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.3125 3.125H17.9688V2.34375C17.9688 2.13655 17.8864 1.93784 17.7399 1.79132C17.5934 1.64481 17.3947 1.5625 17.1875 1.5625C16.9803 1.5625 16.7816 1.64481 16.6351 1.79132C16.4886 1.93784 16.4062 2.13655 16.4062 2.34375V3.125H8.59375V2.34375C8.59375 2.13655 8.51144 1.93784 8.36493 1.79132C8.21841 1.64481 8.0197 1.5625 7.8125 1.5625C7.6053 1.5625 7.40659 1.64481 7.26007 1.79132C7.11356 1.93784 7.03125 2.13655 7.03125 2.34375V3.125H4.6875C4.2731 3.125 3.87567 3.28962 3.58265 3.58265C3.28962 3.87567 3.125 4.2731 3.125 4.6875V20.3125C3.125 20.7269 3.28962 21.1243 3.58265 21.4174C3.87567 21.7104 4.2731 21.875 4.6875 21.875H20.3125C20.7269 21.875 21.1243 21.7104 21.4174 21.4174C21.7104 21.1243 21.875 20.7269 21.875 20.3125V4.6875C21.875 4.2731 21.7104 3.87567 21.4174 3.58265C21.1243 3.28962 20.7269 3.125 20.3125 3.125ZM7.03125 4.6875V5.46875C7.03125 5.67595 7.11356 5.87466 7.26007 6.02118C7.40659 6.16769 7.6053 6.25 7.8125 6.25C8.0197 6.25 8.21841 6.16769 8.36493 6.02118C8.51144 5.87466 8.59375 5.67595 8.59375 5.46875V4.6875H16.4062V5.46875C16.4062 5.67595 16.4886 5.87466 16.6351 6.02118C16.7816 6.16769 16.9803 6.25 17.1875 6.25C17.3947 6.25 17.5934 6.16769 17.7399 6.02118C17.8864 5.87466 17.9688 5.67595 17.9688 5.46875V4.6875H20.3125V7.8125H4.6875V4.6875H7.03125ZM20.3125 20.3125H4.6875V9.375H20.3125V20.3125Z" fill="black"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Total Warranty Earned Card */}
      <div className="mb-8 bg-white border border-[#E5E5E5] rounded-2xl p-8 relative">
        <img 
          src="/src/assets/Warranty/Money.png" 
          alt="Currency icons" 
          className="w-full h-auto block"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-base text-[#626AE7] font-semibold mb-2">Total warranty earned</div>
            <div className="text-4xl font-bold text-black mb-1">$12,000,000</div>
            <div className="text-sm text-[#54C020] font-medium">+12% from last year</div>
          </div>
        </div>
      </div>

      {/* Work History Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[25px] font-semibold">Work History & Cost (6)</h2>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-[#F1F3F4] rounded-xl px-4 py-2 min-w-[113px]">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M13.5306 6.53025L8.5306 11.5302C8.46092 11.6002 8.37813 11.6556 8.28696 11.6935C8.1958 11.7314 8.09806 11.7508 7.99935 11.7508C7.90064 11.7508 7.8029 11.7314 7.71173 11.6935C7.62057 11.6556 7.53778 11.6002 7.4681 11.5302L2.4681 6.53025C2.3272 6.38935 2.24805 6.19825 2.24805 5.999C2.24805 5.79974 2.3272 5.60864 2.4681 5.46775C2.60899 5.32685 2.80009 5.2477 2.99935 5.2477C3.19861 5.2477 3.3897 5.32685 3.5306 5.46775L7.99997 9.93712L12.4693 5.46712C12.6102 5.32623 12.8013 5.24707 13.0006 5.24707C13.1999 5.24707 13.391 5.32623 13.5318 5.46712C13.6727 5.60802 13.7519 5.79911 13.7519 5.99837C13.7519 6.19763 13.6727 6.38873 13.5318 6.52962L13.5306 6.53025Z" fill="#929594"/>
              </svg>
              <span className="text-sm font-semibold text-[#929594]">All Priority</span>
            </div>

            <div className="flex items-center gap-2 bg-[#F1F3F4] rounded-xl px-4 py-2 w-[220px]">
              <svg width="23" height="23" viewBox="0 0 23 23" fill="none">
                <path d="M20.8878 19.3618L16.6212 15.0933C17.9004 13.4262 18.4977 11.335 18.2918 9.24372C18.0859 7.15247 17.0922 5.21785 15.5123 3.8323C13.9325 2.44674 11.8847 1.71402 9.7845 1.78275C7.68426 1.85149 5.6888 2.71654 4.20292 4.20243C2.71703 5.68831 1.85198 7.68377 1.78324 9.78401C1.71451 11.8842 2.44723 13.932 3.83278 15.5119C5.21834 17.0917 7.15296 18.0854 9.24421 18.2913C11.3355 18.4972 13.4267 17.9 15.0938 16.6207L19.3641 20.8918C19.4644 20.9921 19.5834 21.0717 19.7145 21.1259C19.8455 21.1802 19.9859 21.2082 20.1278 21.2082C20.2696 21.2082 20.41 21.1802 20.5411 21.1259C20.6721 21.0717 20.7911 20.9921 20.8914 20.8918C20.9917 20.7915 21.0713 20.6725 21.1255 20.5415C21.1798 20.4104 21.2078 20.27 21.2078 20.1282C21.2078 19.9863 21.1798 19.8459 21.1255 19.7149C21.0713 19.5838 20.9917 19.4648 20.8914 19.3645L20.8878 19.3618ZM3.95319 10.0621C3.95319 8.85375 4.31149 7.67257 4.9828 6.66788C5.65411 5.6632 6.60826 4.88015 7.7246 4.41775C8.84095 3.95534 10.0693 3.83436 11.2544 4.07009C12.4395 4.30582 13.5281 4.88768 14.3825 5.74209C15.237 6.5965 15.8188 7.68509 16.0545 8.87019C16.2903 10.0553 16.1693 11.2837 15.7069 12.4C15.2445 13.5164 14.4614 14.4705 13.4567 15.1418C12.4521 15.8131 11.2709 16.1714 10.0626 16.1714C8.44276 16.1698 6.88979 15.5256 5.74442 14.3802C4.59905 13.2348 3.95485 11.6819 3.95319 10.0621Z" fill="#929594"/>
              </svg>
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent outline-none text-sm font-semibold text-[#929594] placeholder-[#929594] flex-1"
              />
            </div>
          </div>
        </div>

        {filteredWorkHistory.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkHistory.map((work, index) => (
            <div key={index} className="bg-white border border-[#DEE1E6] rounded-2xl shadow-[0_4px_16px_3px_rgba(173,173,173,0.12)] overflow-hidden">
              <div className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-[#E1E3FF] flex items-center justify-center flex-shrink-0">
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23.0469 10.5469H20.8008L16.6826 6.43165C16.5017 6.24966 16.2866 6.10537 16.0495 6.00714C15.8125 5.90891 15.5583 5.85869 15.3018 5.85938H4.71485C4.39329 5.85944 4.07672 5.93889 3.79324 6.09068C3.50977 6.24247 3.26815 6.4619 3.08985 6.7295L0.195315 11.0684C0.0674461 11.2611 -0.000511898 11.4874 2.90329e-06 11.7188V16.4063C2.90329e-06 16.9243 0.205778 17.421 0.57206 17.7873C0.938342 18.1536 1.43513 18.3594 1.95313 18.3594H3.27149C3.48013 19.0383 3.90098 19.6325 4.47224 20.0545C5.0435 20.4766 5.73505 20.7044 6.44532 20.7044C7.15558 20.7044 7.84713 20.4766 8.41839 20.0545C8.98965 19.6325 9.4105 19.0383 9.61914 18.3594H15.3809C15.5895 19.0383 16.0104 19.6325 16.5816 20.0545C17.1529 20.4766 17.8444 20.7044 18.5547 20.7044C19.265 20.7044 19.9565 20.4766 20.5278 20.0545C21.099 19.6325 21.5199 19.0383 21.7285 18.3594H23.0469C23.5649 18.3594 24.0617 18.1536 24.4279 17.7873C24.7942 17.421 25 16.9243 25 16.4063V12.5C25 11.982 24.7942 11.4852 24.4279 11.1189C24.0617 10.7527 23.5649 10.5469 23.0469 10.5469Z" fill="#626AE7"/>
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-base font-semibold text-black">{work.id}</h3>
                      <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#54C020]"></div>
                          <span className="text-xs text-black">{work.status}</span>
                        </div>
                        {work.priority && (
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium ${
                            work.priority === 'HIGH' ? 'bg-[#FFE4E4] text-[#FF3232]' : 
                            work.priority === 'MEDIUM' ? 'bg-[#FFF1C9] text-[#E29A00]' : 
                            'bg-[#EFEFEF] text-[#717171]'
                          }`}>
                            {work.priority}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-xs text-[#929594]">{work.vehicle}</div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-xs text-[#65758B]">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M12.8178 11.4841C12.068 10.1681 10.8972 9.14276 9.49388 8.57305C10.1917 8.04965 10.7072 7.31995 10.9673 6.48731C11.2274 5.65466 11.2189 4.76128 10.9431 3.93373C10.6672 3.10617 10.138 2.38638 9.43033 1.87632C8.72267 1.36626 7.87246 1.0918 7.00013 1.0918C6.12781 1.0918 5.2776 1.36626 4.56993 1.87632C3.86226 2.38638 3.33302 3.10617 3.05717 3.93373C2.78131 4.76128 2.77284 5.65466 3.03293 6.48731C3.29303 7.31995 3.80852 8.04965 4.50638 8.57305C3.10306 9.14276 1.93226 10.1681 1.18247 11.4841C1.13602 11.5588 1.10505 11.6421 1.09142 11.729C1.07779 11.8159 1.08177 11.9046 1.10313 11.99C1.1245 12.0753 1.1628 12.1555 1.21576 12.2257C1.26873 12.296 1.33527 12.3549 1.41145 12.3989C1.48762 12.4429 1.57187 12.4711 1.65917 12.4819C1.74648 12.4927 1.83507 12.4859 1.91967 12.4617C2.00427 12.4376 2.08316 12.3967 2.15165 12.3415C2.22014 12.2863 2.27682 12.2179 2.31833 12.1403C3.30927 10.4275 5.05927 9.40594 7.00013 9.40594C8.94099 9.40594 10.691 10.428 11.6819 12.1403C11.7719 12.285 11.9146 12.389 12.0799 12.4304C12.2451 12.4717 12.42 12.4472 12.5675 12.362C12.715 12.2767 12.8236 12.1375 12.8703 11.9737C12.917 11.8098 12.8982 11.6343 12.8178 11.4841ZM4.15638 5.24969C4.15638 4.68725 4.32316 4.13744 4.63564 3.66978C4.94811 3.20213 5.39225 2.83764 5.91188 2.62241C6.4315 2.40717 7.00329 2.35085 7.55492 2.46058C8.10655 2.57031 8.61326 2.84115 9.01097 3.23885C9.40867 3.63656 9.67951 4.14327 9.78924 4.6949C9.89897 5.24653 9.84265 5.81832 9.62741 6.33794C9.41218 6.85757 9.04769 7.30171 8.58004 7.61419C8.11238 7.92666 7.56257 8.09344 7.00013 8.09344C6.24248 8.09344 5.51586 7.79231 4.97929 7.25574C4.44272 6.71917 4.14159 5.99255 4.14159 5.2349L4.15638 5.24969Z" fill="#65758B"/>
                    </svg>
                    <span>{work.vin}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#65758B]">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M12.8178 11.4841C12.068 10.1681 10.8972 9.14276 9.49388 8.57305C10.1917 8.04965 10.7072 7.31995 10.9673 6.48731C11.2274 5.65466 11.2189 4.76128 10.9431 3.93373C10.6672 3.10617 10.138 2.38638 9.43033 1.87632C8.72267 1.36626 7.87246 1.0918 7.00013 1.0918C6.12781 1.0918 5.2776 1.36626 4.56993 1.87632C3.86226 2.38638 3.33302 3.10617 3.05717 3.93373C2.78131 4.76128 2.77284 5.65466 3.03293 6.48731C3.29303 7.31995 3.80852 8.04965 4.50638 8.57305C3.10306 9.14276 1.93226 10.1681 1.18247 11.4841C1.13602 11.5588 1.10505 11.6421 1.09142 11.729C1.07779 11.8159 1.08177 11.9046 1.10313 11.99C1.1245 12.0753 1.1628 12.1555 1.21576 12.2257C1.26873 12.296 1.33527 12.3549 1.41145 12.3989C1.48762 12.4429 1.57187 12.4711 1.65917 12.4819C1.74648 12.4927 1.83507 12.4859 1.91967 12.4617C2.00427 12.4376 2.08316 12.3967 2.15165 12.3415C2.22014 12.2863 2.27682 12.2179 2.31833 12.1403C3.30927 10.4275 5.05927 9.40594 7.00013 9.40594C8.94099 9.40594 10.691 10.428 11.6819 12.1403C11.7719 12.285 11.9146 12.389 12.0799 12.4304C12.2451 12.4717 12.42 12.4472 12.5675 12.362C12.715 12.2767 12.8236 12.1375 12.8703 11.9737C12.917 11.8098 12.8982 11.6343 12.8178 11.4841ZM4.15638 5.24969C4.15638 4.68725 4.32316 4.13744 4.63564 3.66978C4.94811 3.20213 5.39225 2.83764 5.91188 2.62241C6.4315 2.40717 7.00329 2.35085 7.55492 2.46058C8.10655 2.57031 8.61326 2.84115 9.01097 3.23885C9.40867 3.63656 9.67951 4.14327 9.78924 4.6949C9.89897 5.24653 9.84265 5.81832 9.62741 6.33794C9.41218 6.85757 9.04769 7.30171 8.58004 7.61419C8.11238 7.92666 7.56257 8.09344 7.00013 8.09344C6.24248 8.09344 5.51586 7.79231 4.97929 7.25574C4.44272 6.71917 4.14159 5.99255 4.14159 5.2349L4.15638 5.24969Z" fill="#65758B"/>
                    </svg>
                    <span>{work.assignee}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#65758B]">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M11.375 1.53125H10.2812V1.3125C10.2812 1.13845 10.2121 0.971532 10.089 0.848461C9.96597 0.72539 9.79905 0.65625 9.625 0.65625C9.45095 0.65625 9.28403 0.72539 9.16096 0.848461C9.03789 0.971532 8.96875 1.13845 8.96875 1.3125V1.53125H5.03125V1.3125C5.03125 1.13845 4.96211 0.971532 4.83904 0.848461C4.71597 0.72539 4.54905 0.65625 4.375 0.65625C4.20095 0.65625 4.03403 0.72539 3.91096 0.848461C3.78789 0.971532 3.71875 1.13845 3.71875 1.3125V1.53125H2.625C2.33492 1.53125 2.05672 1.64648 1.8516 1.8516C1.64648 2.05672 1.53125 2.33492 1.53125 2.625V11.375C1.53125 11.6651 1.64648 11.9433 1.8516 12.1484C2.05672 12.3535 2.33492 12.4688 2.625 12.4688H11.375C11.6651 12.4688 11.9433 12.3535 12.1484 12.1484C12.3535 11.9433 12.4688 11.6651 12.4688 11.375V2.625C12.4688 2.33492 12.3535 2.05672 12.1484 1.8516C11.9433 1.64648 11.6651 1.53125 11.375 1.53125ZM3.71875 2.84375C3.71875 3.0178 3.78789 3.18472 3.91096 3.30779C4.03403 3.43086 4.20095 3.5 4.375 3.5C4.54905 3.5 4.71597 3.43086 4.83904 3.30779C4.96211 3.18472 5.03125 3.0178 5.03125 2.84375H8.96875C8.96875 3.0178 9.03789 3.18472 9.16096 3.30779C9.28403 3.43086 9.45095 3.5 9.625 3.5C9.79905 3.5 9.96597 3.43086 10.089 3.30779C10.2121 3.18472 10.2812 3.0178 10.2812 2.84375H11.1562V4.15625H2.84375V2.84375H3.71875ZM2.84375 11.1562V5.46875H11.1562V11.1562H2.84375Z" fill="#65758B"/>
                    </svg>
                    <span>{work.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#65758B]">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M12.8178 11.4841C12.068 10.1681 10.8972 9.14276 9.49388 8.57305C10.1917 8.04965 10.7072 7.31995 10.9673 6.48731C11.2274 5.65466 11.2189 4.76128 10.9431 3.93373C10.6672 3.10617 10.138 2.38638 9.43033 1.87632C8.72267 1.36626 7.87246 1.0918 7.00013 1.0918C6.12781 1.0918 5.2776 1.36626 4.56993 1.87632C3.86226 2.38638 3.33302 3.10617 3.05717 3.93373C2.78131 4.76128 2.77284 5.65466 3.03293 6.48731C3.29303 7.31995 3.80852 8.04965 4.50638 8.57305C3.10306 9.14276 1.93226 10.1681 1.18247 11.4841C1.13602 11.5588 1.10505 11.6421 1.09142 11.729C1.07779 11.8159 1.08177 11.9046 1.10313 11.99C1.1245 12.0753 1.1628 12.1555 1.21576 12.2257C1.26873 12.296 1.33527 12.3549 1.41145 12.3989C1.48762 12.4429 1.57187 12.4711 1.65917 12.4819C1.74648 12.4927 1.83507 12.4859 1.91967 12.4617C2.00427 12.4376 2.08316 12.3967 2.15165 12.3415C2.22014 12.2863 2.27682 12.2179 2.31833 12.1403C3.30927 10.4275 5.05927 9.40594 7.00013 9.40594C8.94099 9.40594 10.691 10.428 11.6819 12.1403C11.7719 12.285 11.9146 12.389 12.0799 12.4304C12.2451 12.4717 12.42 12.4472 12.5675 12.362C12.715 12.2767 12.8236 12.1375 12.8703 11.9737C12.917 11.8098 12.8982 11.6343 12.8178 11.4841ZM4.15638 5.24969C4.15638 4.68725 4.32316 4.13744 4.63564 3.66978C4.94811 3.20213 5.39225 2.83764 5.91188 2.62241C6.4315 2.40717 7.00329 2.35085 7.55492 2.46058C8.10655 2.57031 8.61326 2.84115 9.01097 3.23885C9.40867 3.63656 9.67951 4.14327 9.78924 4.6949C9.89897 5.24653 9.84265 5.81832 9.62741 6.33794C9.41218 6.85757 9.04769 7.30171 8.58004 7.61419C8.11238 7.92666 7.56257 8.09344 7.00013 8.09344C6.24248 8.09344 5.51586 7.79231 4.97929 7.25574C4.44272 6.71917 4.14159 5.99255 4.14159 5.2349L4.15638 5.24969Z" fill="#65758B"/>
                    </svg>
                    <span>{work.time}</span>
                  </div>
                </div>

                <button 
                  onClick={() => handleWarrantyCostClick(work)}
                  className="w-full bg-[#626AE7] text-white py-3 rounded-2xl text-sm font-semibold hover:bg-[#5158D0] active:bg-[#4A51C4] focus:outline-none transition-colors"
                >
                  Warranty Cost
                </button>
              </div>
            </div>
          ))}
        </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-[#F8F9FA] rounded-2xl">
            <div className="w-16 h-16 rounded-full bg-[#E5E5E5] flex items-center justify-center mb-4">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="2" fill="#727674"/>
                <circle cx="16" cy="10" r="1.5" fill="#727674"/>
                <circle cx="16" cy="22" r="1.5" fill="#727674"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-black mb-2">No Order Found</h3>
            <p className="text-sm text-[#929594]">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {showWarrantyCostModal && selectedWork && (
        <WarrantyCostModal 
          work={selectedWork}
          warrantyData={mockWarrantyData}
          onClose={() => setShowWarrantyCostModal(false)}
        />
      )}
    </div>
  )
}

function WarrantyCostModal({ work, warrantyData, onClose }) {
  return (
    <div className="fixed inset-y-0 left-64 right-0 bg-black/40 flex items-start justify-center z-50 p-0">
      <div className="bg-white w-full h-full rounded-none overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-[#EBEBEB] p-6 flex items-center justify-between z-10">
          <div>
            <h2 className="text-[30px] font-semibold text-black">Hello, SC Staff!</h2>
            <p className="text-xl text-[#929594] font-semibold">An overview of your works.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[17px] font-semibold text-[#393C3B]">16 May, 2025</span>
            <div className="w-[45px] h-[45px] rounded-full bg-[#F1F3F4] flex items-center justify-center">
              <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
                <path d="M20.3125 3.125H17.9688V2.34375C17.9688 2.13655 17.8864 1.93784 17.7399 1.79132C17.5934 1.64481 17.3947 1.5625 17.1875 1.5625C16.9803 1.5625 16.7816 1.64481 16.6351 1.79132C16.4886 1.93784 16.4062 2.13655 16.4062 2.34375V3.125H8.59375V2.34375C8.59375 2.13655 8.51144 1.93784 8.36493 1.79132C8.21841 1.64481 8.0197 1.5625 7.8125 1.5625C7.6053 1.5625 7.40659 1.64481 7.26007 1.79132C7.11356 1.93784 7.03125 2.13655 7.03125 2.34375V3.125H4.6875C4.2731 3.125 3.87567 3.28962 3.58265 3.58265C3.28962 3.87567 3.125 4.2731 3.125 4.6875V20.3125C3.125 20.7269 3.28962 21.1243 3.58265 21.4174C3.87567 21.7104 4.2731 21.875 4.6875 21.875H20.3125C20.7269 21.875 21.1243 21.7104 21.4174 21.4174C21.7104 21.1243 21.875 20.7269 21.875 20.3125V4.6875C21.875 4.2731 21.7104 3.87567 21.4174 3.58265C21.1243 3.28962 20.7269 3.125 20.3125 3.125Z" fill="black"/>
              </svg>
            </div>
            <button 
              onClick={onClose}
              className="ml-2 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M15 5L5 15M5 5L15 15" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="p-8">
          <div className="border-[3px] border-[#EBEBEB] rounded-2xl p-8 mb-6">
            <h3 className="text-[25px] font-semibold mb-2">Order Overview</h3>
            <p className="text-[15px] text-[#929594] mb-6">Order and customer information</p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <div className="text-[15px] text-[#929594] mb-1">Vehicle</div>
                <div className="text-xl font-medium">{work.vehicle}</div>
              </div>
              <div>
                <div className="text-[15px] text-[#929594] mb-1">VIN</div>
                <div className="text-xl font-medium">{work.vin}</div>
              </div>
              <div>
                <div className="text-[15px] text-[#929594] mb-1">Customer</div>
                <div className="text-xl font-medium">{work.assignee}</div>
              </div>
              <div>
                <div className="text-[15px] text-[#929594] mb-1">Priority</div>
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-medium ${
                  work.priority === 'HIGH' ? 'bg-[#FFE4E4] text-[#FF3232]' : 
                  work.priority === 'MEDIUM' ? 'bg-[#FFF1C9] text-[#E29A00]' : 
                  'bg-[#EFEFEF] text-[#717171]'
                }`}>
                  {work.priority}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="border-[3px] border-[#EBEBEB] rounded-2xl p-6">
              <div className="flex flex-row-reverse items-start justify-between mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
                <span className="text-base font-medium">Parts</span>
              </div>
              <div className="text-xl font-semibold mb-1">${warrantyData.partsTotal.toFixed(2)}</div>
              <div className="text-[13px] text-[#686262]">3 Items</div>
            </div>

            <div className="border-[3px] border-[#EBEBEB] rounded-2xl p-6">
              <div className="flex flex-row-reverse items-start justify-between mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                </svg>
                <span className="text-base font-medium">Labor</span>
              </div>
              <div className="text-xl font-semibold mb-1">${warrantyData.laborTotal.toFixed(2)}</div>
              <div className="text-[13px] text-[#686262]">3 Items</div>
            </div>

            <div className="border-[3px] border-[#EBEBEB] rounded-2xl p-6">
              <div className="flex flex-row-reverse items-start justify-between mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
                <span className="text-base font-medium">Miscellaneous</span>
              </div>
              <div className="text-xl font-semibold mb-1">${warrantyData.miscTotal.toFixed(2)}</div>
              <div className="text-[13px] text-[#686262]">2 Items</div>
            </div>

            <div className="border-[3px] border-[#626AE7] bg-[#EFF0FF] rounded-2xl p-6">
              <div className="flex flex-row-reverse items-start justify-between mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
                <span className="text-base font-medium">Total Cost</span>
              </div>
              <div className="text-xl font-semibold mb-1">${warrantyData.grandTotal.toFixed(2)}</div>
              <div className="text-[13px] text-[#686262]">All costs included</div>
            </div>
          </div>

          <div className="border-[3px] border-[#EBEBEB] rounded-2xl p-8 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#727674" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                <line x1="12" y1="22.08" x2="12" y2="12"/>
              </svg>
              <h3 className="text-[25px] font-semibold">Parts Breakdown</h3>
            </div>
            <p className="text-[15px] text-[#929594] mb-6">Replacement parts and components</p>
            
            <div className="overflow-hidden rounded-[10px] border-[2px] border-[#DEE1E6]">
              <div className="bg-[#FAFAFA] border-b-[2px] border-[#DEE1E6] px-6 py-3 grid grid-cols-12 gap-4">
                <div className="col-span-5 text-base text-[#686262]">Description</div>
                <div className="col-span-2 text-base text-[#686262]">Quantity</div>
                <div className="col-span-2 text-base text-[#686262]">Unit Price</div>
                <div className="col-span-3 text-base text-[#686262] text-right">Total</div>
              </div>
              {warrantyData.parts.map((item, idx) => (
                <div key={idx} className="bg-white border-b-[2px] border-[#DEE1E6] px-6 py-3 grid grid-cols-12 gap-4">
                  <div className="col-span-5 text-[13px] font-medium">{item.description}</div>
                  <div className="col-span-2 text-[13px] font-medium">{item.quantity}</div>
                  <div className="col-span-2 text-[13px] font-medium">${item.unitPrice.toFixed(2)}</div>
                  <div className="col-span-3 text-[13px] font-medium text-right">${item.total.toFixed(2)}</div>
                </div>
              ))}
              <div className="bg-[#FAFAFA] px-6 py-3 grid grid-cols-12 gap-4">
                <div className="col-span-9 text-[13px] font-medium text-right">Parts Subtotal</div>
                <div className="col-span-3 text-[13px] font-medium text-right">${warrantyData.partsSubtotal.toFixed(2)}</div>
              </div>
            </div>
          </div>

          <div className="border-[3px] border-[#EBEBEB] rounded-2xl p-8 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#727674" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
              </svg>
              <h3 className="text-[25px] font-semibold">Labor Breakdown</h3>
            </div>
            <p className="text-[15px] text-[#929594] mb-6">Technician work and services</p>
            
            <div className="overflow-hidden rounded-[10px] border-[2px] border-[#DEE1E6]">
              <div className="bg-[#FAFAFA] border-b-[2px] border-[#DEE1E6] px-6 py-3 grid grid-cols-12 gap-4">
                <div className="col-span-5 text-base text-[#686262]">Description</div>
                <div className="col-span-2 text-base text-[#686262] text-right">Hours</div>
                <div className="col-span-2 text-base text-[#686262] text-right">Rate</div>
                <div className="col-span-3 text-base text-[#686262] text-right">Total</div>
              </div>
              {warrantyData.labor.map((item, idx) => (
                <div key={idx} className="bg-white border-b-[2px] border-[#DEE1E6] px-6 py-3 grid grid-cols-12 gap-4">
                  <div className="col-span-5 text-[13px] font-medium">{item.description}</div>
                  <div className="col-span-2 text-[13px] font-medium text-right">{item.hours}</div>
                  <div className="col-span-2 text-[13px] font-medium text-right">${item.rate.toFixed(2)}</div>
                  <div className="col-span-3 text-[13px] font-medium text-right">${item.total.toFixed(2)}</div>
                </div>
              ))}
              <div className="bg-[#FAFAFA] px-6 py-3 grid grid-cols-12 gap-4">
                <div className="col-span-9 text-[13px] font-medium text-right">Labor Subtotal</div>
                <div className="col-span-3 text-[13px] font-medium text-right">${warrantyData.laborSubtotal.toFixed(2)}</div>
              </div>
            </div>
          </div>

          <div className="border-[3px] border-[#EBEBEB] rounded-2xl p-8 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#727674" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
              <h3 className="text-[25px] font-semibold">Miscellaneous Costs</h3>
            </div>
            <p className="text-[15px] text-[#929594] mb-6">Additional fees and charges</p>
            
            <div className="overflow-hidden rounded-[10px] border-[2px] border-[#DEE1E6]">
              <div className="bg-[#FAFAFA] border-b-[2px] border-[#DEE1E6] px-6 py-3 grid grid-cols-12 gap-4">
                <div className="col-span-5 text-base text-[#686262]">Description</div>
                <div className="col-span-2 text-base text-[#686262] text-right">Quantity</div>
                <div className="col-span-2 text-base text-[#686262] text-right">Unit Price</div>
                <div className="col-span-3 text-base text-[#686262] text-right">Total</div>
              </div>
              {warrantyData.miscellaneous.map((item, idx) => (
                <div key={idx} className="bg-white border-b-[2px] border-[#DEE1E6] px-6 py-3 grid grid-cols-12 gap-4">
                  <div className="col-span-5 text-[13px] font-medium">{item.description}</div>
                  <div className="col-span-2 text-[13px] font-medium text-right">{item.quantity}</div>
                  <div className="col-span-2 text-[13px] font-medium text-right">${item.unitPrice.toFixed(2)}</div>
                  <div className="col-span-3 text-[13px] font-medium text-right">${item.total.toFixed(2)}</div>
                </div>
              ))}
              <div className="bg-[#FAFAFA] px-6 py-3 grid grid-cols-12 gap-4">
                <div className="col-span-9 text-[13px] font-medium text-right">Misc Subtotal</div>
                <div className="col-span-3 text-[13px] font-medium text-right">${warrantyData.miscSubtotal.toFixed(2)}</div>
              </div>
            </div>
          </div>

          <div className="border-[3px] border-[#626AE7] bg-[#EFF0FF] rounded-2xl p-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-[15px] text-[#656565] mb-2">Grand Total</div>
                <div className="text-[30px] font-semibold text-[#626AE7]">${warrantyData.grandTotal.toFixed(2)}</div>
              </div>
              <div className="text-right">
                <div className="text-[15px] text-[#656565] mb-2">Warranty Coverage</div>
                <div className="text-[23px] font-medium text-[#54C020]">{warrantyData.warrantyCoverage}%</div>
              </div>
            </div>

            <div className="w-full h-[1px] bg-[#DEE1E6] my-6"></div>

            <div className="flex items-center gap-4">
              <button className="flex-1 bg-[#626AE7] text-white py-3 rounded-[14px] text-sm font-semibold hover:bg-[#5158D0] transition-colors">
                Approved Cost
              </button>
              <button className="bg-[#F9F9F9] border border-[#DEE1E6] text-black py-3 px-8 rounded-[14px] text-sm font-semibold hover:bg-gray-100 transition-colors">
                Export Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
