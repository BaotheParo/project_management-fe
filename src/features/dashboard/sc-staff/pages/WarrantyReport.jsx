import React, { useState, useMemo } from 'react'

const StatusCard = ({ count, label, description, color }) => (
  <div className="flex-1 min-w-[245px] border-[3px] border-[#EBEBEB] rounded-2xl p-6">
    <div className="flex items-center gap-3 mb-4">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M17.8125 3.75V16.25C17.8125 16.6644 17.6478 17.0618 17.3548 17.3549C17.0618 17.6479 16.6644 17.8125 16.25 17.8125H10.9375C10.6888 17.8125 10.4504 17.7137 10.2746 17.5379C10.0987 17.3621 9.99997 17.1236 9.99997 16.875C9.99997 16.6264 10.0987 16.3879 10.2746 16.2121C10.4504 16.0363 10.6888 15.9375 10.9375 15.9375H15.9375V4.0625H4.06247V10.9375C4.06247 11.1861 3.96369 11.4246 3.78788 11.6004C3.61206 11.7762 3.37361 11.875 3.12497 11.875C2.87633 11.875 2.63787 11.7762 2.46205 11.6004C2.28624 11.4246 2.18747 11.1861 2.18747 10.9375V3.75C2.18747 3.3356 2.35209 2.93817 2.64511 2.64515C2.93814 2.35212 3.33557 2.1875 3.74997 2.1875H16.25C16.6644 2.1875 17.0618 2.35212 17.3548 2.64515C17.6478 2.93817 17.8125 3.3356 17.8125 3.75ZM10.0382 11.8367C9.95115 11.7493 9.84766 11.68 9.7337 11.6327C9.61975 11.5853 9.49757 11.561 9.37418 11.561C9.2508 11.561 9.12862 11.5853 9.01467 11.6327C8.90071 11.68 8.79722 11.7493 8.71012 11.8367L4.99997 15.5469L3.78825 14.3367C3.70104 14.2495 3.59751 14.1803 3.48357 14.1331C3.36963 14.0859 3.24751 14.0617 3.12418 14.0617C3.00086 14.0617 2.87874 14.0859 2.7648 14.1331C2.65086 14.1803 2.54733 14.2495 2.46012 14.3367C2.37292 14.4239 2.30374 14.5275 2.25655 14.6414C2.20935 14.7553 2.18506 14.8775 2.18506 15.0008C2.18506 15.1241 2.20935 15.2462 2.25655 15.3602C2.30374 15.4741 2.37292 15.5776 2.46012 15.6648L4.33512 17.5398C4.42222 17.6272 4.52571 17.6966 4.63967 17.7439C4.75362 17.7912 4.8758 17.8156 4.99918 17.8156C5.12257 17.8156 5.24475 17.7912 5.3587 17.7439C5.47266 17.6966 5.57615 17.6272 5.66325 17.5398L10.0382 13.1648C10.1256 13.0777 10.195 12.9743 10.2423 12.8603C10.2896 12.7463 10.314 12.6242 10.314 12.5008C10.314 12.3774 10.2896 12.2552 10.2423 12.1413C10.195 12.0273 10.1256 11.9238 10.0382 11.8367Z" fill="currentColor" className={color}/>
      </svg>
      <span className={`text-base font-medium ${color}`}>{label}</span>
    </div>
    <div className="text-[30px] font-semibold text-black mb-2">{count}</div>
    <div className="text-base font-medium text-[#686262]">{description}</div>
  </div>
)

const WorkReportCard = ({ report }) => {
  const statusColors = {
    Pending: 'text-[#CDD0D7] bg-[#CDD0D7]',
    'In Progress': 'text-[#EBB80F] bg-[#EBB80F]',
    Completed: 'text-[#54C020] bg-[#54C020]',
  }

  const priorityColors = {
    HIGH: 'bg-[#FFE4E4] text-[#FF3232]',
    MEDIUM: 'bg-[#FFF1C9] text-[#E29A00]',
    LOW: 'bg-[#EFEFEF] text-[#717171]',
  }

  return (
    <div className="bg-white border border-[#DEE1E6] rounded-2xl shadow-[0_4px_16px_3px_rgba(173,173,173,0.12)] overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-[#E1E3FF] flex items-center justify-center flex-shrink-0">
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.0469 10.5469H20.8008L16.6826 6.43165C16.5017 6.24966 16.2866 6.10537 16.0495 6.00714C15.8125 5.90891 15.5583 5.85869 15.3018 5.85938H4.71485C4.39329 5.85944 4.07672 5.93889 3.79324 6.09068C3.50977 6.24247 3.26815 6.4619 3.08985 6.7295L0.195315 11.0684C0.0674461 11.2611 -0.000511898 11.4874 2.90329e-06 11.7188V16.4063C2.90329e-06 16.9243 0.205778 17.421 0.57206 17.7873C0.938342 18.1536 1.43513 18.3594 1.95313 18.3594H3.27149C3.48013 19.0383 3.90098 19.6325 4.47224 20.0545C5.0435 20.4766 5.73505 20.7044 6.44532 20.7044C7.15558 20.7044 7.84713 20.4766 8.41839 20.0545C8.98965 19.6325 9.4105 19.0383 9.61914 18.3594H15.3809C15.5895 19.0383 16.0104 19.6325 16.5816 20.0545C17.1529 20.4766 17.8444 20.7044 18.5547 20.7044C19.265 20.7044 19.9565 20.4766 20.5278 20.0545C21.099 19.6325 21.5199 19.0383 21.7285 18.3594H23.0469C23.5649 18.3594 24.0617 18.1536 24.4279 17.7873C24.7942 17.421 25 16.9243 25 16.4063V12.5C25 11.982 24.7942 11.4852 24.4279 11.1189C24.0617 10.7527 23.5649 10.5469 23.0469 10.5469Z" fill="#626AE7"/>
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="text-base font-semibold text-black">{report.id}</h3>
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-1.5">
                  <div className={`w-2.5 h-2.5 rounded-full ${statusColors[report.status]}`}></div>
                  <span className="text-xs text-black">{report.status}</span>
                </div>
                {report.priority && (
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium ${priorityColors[report.priority]}`}>
                    {report.priority}
                  </span>
                )}
              </div>
            </div>
            <div className="text-xs text-[#929594]">{report.vehicle}</div>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-xs text-[#65758B]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M8.09375 5.90625C8.09375 5.7322 8.16289 5.56528 8.28596 5.44221C8.40903 5.31914 8.57595 5.25 8.75 5.25H10.2812C10.4553 5.25 10.6222 5.31914 10.7453 5.44221C10.8684 5.56528 10.9375 5.7322 10.9375 5.90625C10.9375 6.0803 10.8684 6.24722 10.7453 6.37029C10.6222 6.49336 10.4553 6.5625 10.2812 6.5625H8.75C8.57595 6.5625 8.40903 6.49336 8.28596 6.37029C8.16289 6.24722 8.09375 6.0803 8.09375 5.90625ZM10.2812 7.4375H9.1875C9.01345 7.4375 8.84653 7.50664 8.72346 7.62971C8.60039 7.75278 8.53125 7.9197 8.53125 8.09375C8.53125 8.2678 8.60039 8.43472 8.72346 8.55779C8.84653 8.68086 9.01345 8.75 9.1875 8.75H10.2812C10.4553 8.75 10.6222 8.68086 10.7453 8.55779C10.8684 8.43472 10.9375 8.2678 10.9375 8.09375C10.9375 7.9197 10.8684 7.75278 10.7453 7.62971C10.6222 7.50664 10.4553 7.4375 10.2812 7.4375ZM12.9062 3.0625V10.9375C12.9062 11.2276 12.791 11.5058 12.5859 11.7109C12.3808 11.916 12.1026 12.0312 11.8125 12.0312H2.1875C1.89742 12.0312 1.61922 11.916 1.4141 11.7109C1.20898 11.5058 1.09375 11.2276 1.09375 10.9375V3.0625C1.09375 2.77242 1.20898 2.49422 1.4141 2.2891C1.61922 2.08398 1.89742 1.96875 2.1875 1.96875H11.8125C12.1026 1.96875 12.3808 2.08398 12.5859 2.2891C12.791 2.49422 12.9062 2.77242 12.9062 3.0625ZM11.5938 3.28125H2.40625V10.7188H11.5938V3.28125Z" fill="#65758B"/>
            </svg>
            <span>{report.vin}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#65758B]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M12.8178 11.4841C12.068 10.1681 10.8972 9.14276 9.49388 8.57305C10.1917 8.04965 10.7072 7.31995 10.9673 6.48731C11.2274 5.65466 11.2189 4.76128 10.9431 3.93373C10.6672 3.10617 10.138 2.38638 9.43033 1.87632C8.72267 1.36626 7.87246 1.0918 7.00013 1.0918C6.12781 1.0918 5.2776 1.36626 4.56993 1.87632C3.86226 2.38638 3.33302 3.10617 3.05717 3.93373C2.78131 4.76128 2.77284 5.65466 3.03293 6.48731C3.29303 7.31995 3.80852 8.04965 4.50638 8.57305C3.10306 9.14276 1.93226 10.1681 1.18247 11.4841C1.13602 11.5588 1.10505 11.6421 1.09142 11.729C1.07779 11.8159 1.08177 11.9046 1.10313 11.99C1.1245 12.0753 1.1628 12.1555 1.21576 12.2257C1.26873 12.296 1.33527 12.3549 1.41145 12.3989C1.48762 12.4429 1.57187 12.4711 1.65917 12.4819C1.74648 12.4927 1.83507 12.4859 1.91967 12.4617C2.00427 12.4376 2.08316 12.3967 2.15165 12.3415C2.22014 12.2863 2.27682 12.2179 2.31833 12.1403C3.30927 10.4275 5.05927 9.40594 7.00013 9.40594C8.94099 9.40594 10.691 10.428 11.6819 12.1403C11.7719 12.285 11.9146 12.389 12.0799 12.4304C12.2451 12.4717 12.42 12.4472 12.5675 12.362C12.715 12.2767 12.8236 12.1375 12.8703 11.9737C12.917 11.8098 12.8982 11.6343 12.8178 11.4841ZM4.15638 5.24969C4.15638 4.68725 4.32316 4.13744 4.63564 3.66978C4.94811 3.20213 5.39225 2.83764 5.91188 2.62241C6.4315 2.40717 7.00329 2.35085 7.55492 2.46058C8.10655 2.57031 8.61326 2.84115 9.01097 3.23885C9.40867 3.63656 9.67951 4.14327 9.78924 4.6949C9.89897 5.24653 9.84265 5.81832 9.62741 6.33794C9.41218 6.85757 9.04769 7.3017 8.58003 7.61418C8.11238 7.92665 7.56257 8.09344 7.00013 8.09344C6.24619 8.09257 5.52337 7.79268 4.99026 7.25956C4.45714 6.72644 4.15725 6.00363 4.15638 5.24969Z" fill="#65758B"/>
            </svg>
            <span>{report.assignee}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#65758B]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M11.375 1.53125H10.2812V1.3125C10.2812 1.13845 10.2121 0.971532 10.089 0.848461C9.96597 0.72539 9.79905 0.65625 9.625 0.65625C9.45095 0.65625 9.28403 0.72539 9.16096 0.848461C9.03789 0.971532 8.96875 1.13845 8.96875 1.3125V1.53125H5.03125V1.3125C5.03125 1.13845 4.96211 0.971532 4.83904 0.848461C4.71597 0.72539 4.54905 0.65625 4.375 0.65625C4.20095 0.65625 4.03403 0.72539 3.91096 0.848461C3.78789 0.971532 3.71875 1.13845 3.71875 1.3125V1.53125H2.625C2.33492 1.53125 2.05672 1.64648 1.8516 1.8516C1.64648 2.05672 1.53125 2.33492 1.53125 2.625V11.375C1.53125 11.6651 1.64648 11.9433 1.8516 12.1484C2.05672 12.3535 2.33492 12.4688 2.625 12.4688H11.375C11.6651 12.4688 11.9433 12.3535 12.1484 12.1484C12.3535 11.9433 12.4688 11.6651 12.4688 11.375V2.625C12.4688 2.33492 12.3535 2.05672 12.1484 1.8516C11.9433 1.64648 11.6651 1.53125 11.375 1.53125ZM3.71875 2.84375C3.71875 3.0178 3.78789 3.18472 3.91096 3.30779C4.03403 3.43086 4.20095 3.5 4.375 3.5C4.54905 3.5 4.71597 3.43086 4.83904 3.30779C4.96211 3.18472 5.03125 3.0178 5.03125 2.84375H8.96875C8.96875 3.0178 9.03789 3.18472 9.16096 3.30779C9.28403 3.43086 9.45095 3.5 9.625 3.5C9.79905 3.5 9.96597 3.43086 10.089 3.30779C10.2121 3.18472 10.2812 3.0178 10.2812 2.84375H11.1562V4.15625H2.84375V2.84375H3.71875ZM2.84375 11.1562V5.46875H11.1562V11.1562H2.84375Z" fill="#65758B"/>
            </svg>
            <span>{report.date}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#65758B]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 0C5.61553 0 4.26216 0.410543 3.11101 1.17971C1.95987 1.94888 1.06266 3.04213 0.532846 4.32122C0.00303299 5.6003 -0.13559 7.00776 0.134506 8.36563C0.404603 9.7235 1.07129 10.9708 2.05026 11.9497C3.02922 12.9287 4.2765 13.5954 5.63437 13.8655C6.99224 14.1356 8.3997 13.997 9.67879 13.4672C10.9579 12.9373 12.0511 12.0401 12.8203 10.889C13.5895 9.73784 14 8.38447 14 7C13.998 5.14413 13.2599 3.36489 11.9475 2.05247C10.6351 0.740055 8.85587 0.00204047 7 0ZM7 12.6875C5.86414 12.6875 4.75665 12.3502 3.82076 11.7185C2.88487 11.0867 2.16184 10.189 1.73851 9.13814C1.31517 8.08726 1.21241 6.93063 1.44314 5.81633C1.67386 4.70202 2.22761 3.68265 3.03379 2.87647C3.83998 2.07028 4.85935 1.51653 5.97365 1.28581C7.08795 1.05508 8.24459 1.15784 9.29546 1.58118C10.3463 2.00451 11.2441 2.72754 11.8758 3.66343C12.5075 4.59932 12.8448 5.70681 12.8448 6.84267C12.8433 8.36845 12.236 9.83126 11.1546 10.9127C10.0731 11.9942 8.61027 12.6015 7.08448 12.603L7 12.6875ZM10.2812 7.1875H7C6.86739 7.1875 6.74021 7.13484 6.64645 7.04107C6.55268 6.94731 6.5 6.82013 6.5 6.6875V3.40625C6.5 3.27364 6.55268 3.14646 6.64645 3.0527C6.74021 2.95893 6.86739 2.90625 7 2.90625C7.13261 2.90625 7.25979 2.95893 7.35355 3.0527C7.44732 3.14646 7.5 3.27364 7.5 3.40625V6.1875H10.2812C10.4138 6.1875 10.541 6.24018 10.6348 6.33395C10.7286 6.42771 10.7812 6.55489 10.7812 6.6875C10.7812 6.82011 10.7286 6.94729 10.6348 7.04105C10.541 7.13482 10.4138 7.1875 10.2812 7.1875Z" fill="#65758B"/>
            </svg>
            <span>{report.time}</span>
          </div>
        </div>

        {/* Issue Overview */}
        <div className="bg-[#F1F3F4] rounded-2xl p-4">
          <div className="text-xs font-semibold text-black mb-2">Issue Overview:</div>
          <p className="text-[11px] text-[#929594] leading-relaxed">{report.issue}</p>
        </div>
      </div>
    </div>
  )
}

export default function WarrantyReport() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  const [reports] = useState([
    {
      id: 'RO-002',
      vehicle: 'VinFast VF-3',
      status: 'Pending',
      priority: 'HIGH',
      vin: 'LSV1E7AL0MC123456',
      assignee: 'Andrew',
      date: 'July 21, 2025',
      time: '10:30 AM',
      issue: 'Battery thermal management system showing error codes. Customer reports reduced range and charging speed.',
    },
    {
      id: 'RO-002',
      vehicle: 'VinFast VF-3',
      status: 'Completed',
      priority: 'MEDIUM',
      vin: 'LSV1E7AL0MC123456',
      assignee: 'Andrew',
      date: 'July 21, 2025',
      time: '11:00 AM',
      issue: 'Battery thermal management system showing error codes. Customer reports reduced range and charging speed.',
    },
    {
      id: 'RO-002',
      vehicle: 'VinFast VF-3',
      status: 'In Progress',
      priority: 'LOW',
      vin: 'LSV1E7AL0MC123456',
      assignee: 'Andrew',
      date: 'July 21, 2025',
      time: '09:15 AM',
      issue: 'Battery thermal management system showing error codes. Customer reports reduced range and charging speed.',
    },
    {
      id: 'RO-002',
      vehicle: 'VinFast VF-3',
      status: 'Pending',
      priority: 'HIGH',
      vin: 'LSV1E7AL0MC123456',
      assignee: 'Jso',
      date: 'Jan 23, 2025',
      time: '08:00 AM',
      issue: 'Battery thermal management system showing error codes. Customer reports reduced range and charging speed.',
    },
    {
      id: 'RO-002',
      vehicle: 'VinFast VF-3',
      status: 'In Progress',
      priority: 'HIGH',
      vin: 'LSV1E7AL0MC123456',
      assignee: 'Jso',
      date: 'July 21, 2025',
      time: '02:30 PM',
      issue: 'Battery thermal management system showing error codes. Customer reports reduced range and charging speed.',
    },
    {
      id: 'RO-002',
      vehicle: 'VinFast VF-3',
      status: 'In Progress',
      priority: 'HIGH',
      vin: 'LSV1E7AL0MC123456',
      assignee: 'Jso',
      date: 'July 21, 2025',
      time: '03:45 PM',
      issue: 'Battery thermal management system showing error codes. Customer reports reduced range and charging speed.',
    },
  ])

  // Calculate stats from reports
  const pendingCount = reports.filter(r => r.status === 'Pending').length
  const inProgressCount = reports.filter(r => r.status === 'In Progress').length
  const completedCount = reports.filter(r => r.status === 'Completed').length

  const stats = [
    { count: pendingCount.toString(), label: 'Pending', description: 'Awaiting work', color: 'text-[#979AA3]' },
    { count: inProgressCount.toString(), label: 'In Progress', description: 'Being worked on', color: 'text-[#EBB80F]' },
    { count: completedCount.toString(), label: 'Completed', description: 'Finished today', color: 'text-[#54C020]' },
  ]

  const filters = ['All', 'Pending', 'In Progress', 'Completed', 'Overdue']

  // Filter reports based on active filter and search term
  const filteredReports = useMemo(() => {
    return reports.filter(report => {
      const matchesFilter = activeFilter === 'All' || report.status === activeFilter
      const matchesSearch = searchTerm === '' || 
        report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.assignee.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesFilter && matchesSearch
    })
  }, [reports, activeFilter, searchTerm])

  return (
    <div className="min-h-screen bg-white p-6 md:p-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-[30px] font-semibold mb-1">Hello, SC Staff!</h1>
          <p className="text-xl text-[#929594] font-semibold">An overview of your works.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[17px] font-semibold text-[#393C3B]">18 May, 2025</span>
          <div className="w-[45px] h-[45px] rounded-full bg-[#F1F3F4] flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M16.25 2.5H14.375V1.875C14.375 1.70924 14.3092 1.55027 14.1919 1.43306C14.0747 1.31585 13.9158 1.25 13.75 1.25C13.5842 1.25 13.4253 1.31585 13.3081 1.43306C13.1908 1.55027 13.125 1.70924 13.125 1.875V2.5H6.875V1.875C6.875 1.70924 6.80915 1.55027 6.69194 1.43306C6.57473 1.31585 6.41576 1.25 6.25 1.25C6.08424 1.25 5.92527 1.31585 5.80806 1.43306C5.69085 1.55027 5.625 1.70924 5.625 1.875V2.5H3.75C3.41848 2.5 3.10054 2.6317 2.86612 2.86612C2.6317 3.10054 2.5 3.41848 2.5 3.75V16.25C2.5 16.5815 2.6317 16.8995 2.86612 17.1339C3.10054 17.3683 3.41848 17.5 3.75 17.5H16.25C16.5815 17.5 16.8995 17.3683 17.1339 17.1339C17.3683 16.8995 17.5 16.5815 17.5 16.25V3.75C17.5 3.41848 17.3683 3.10054 17.1339 2.86612C16.8995 2.6317 16.5815 2.5 16.25 2.5ZM5.625 3.75C5.625 3.91576 5.69085 4.07473 5.80806 4.19194C5.92527 4.30915 6.08424 4.375 6.25 4.375C6.41576 4.375 6.57473 4.30915 6.69194 4.19194C6.80915 4.07473 6.875 3.91576 6.875 3.75H13.125C13.125 3.91576 13.1908 4.07473 13.3081 4.19194C13.4253 4.30915 13.5842 4.375 13.75 4.375C13.9158 4.375 14.0747 4.30915 14.1919 4.19194C14.3092 4.07473 14.375 3.91576 14.375 3.75H16.25V6.25H3.75V3.75H5.625ZM3.75 16.25V7.5H16.25V16.25H3.75Z" fill="black"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="flex flex-wrap gap-4 mb-8">
        {stats.map((stat, index) => (
          <StatusCard key={index} {...stat} />
        ))}
      </div>

      {/* Work Reports Section */}
      <div className="mb-6">
        <h2 className="text-[25px] font-semibold mb-6">Work Reports (8)</h2>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          {/* Filter Tabs */}
          <div className="flex items-center gap-2 bg-[#F1F3F4] rounded-xl px-2 py-2 overflow-x-auto">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1.5 rounded-md text-sm font-semibold whitespace-nowrap transition-colors ${
                  activeFilter === filter
                    ? 'bg-[#626AE7] text-white'
                    : 'bg-transparent text-black hover:bg-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Priority Filter */}
          <div className="flex items-center gap-2 bg-[#F1F3F4] rounded-xl px-4 py-2 min-w-[113px]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M13.5306 6.53025L8.5306 11.5302C8.46092 11.6002 8.37813 11.6556 8.28696 11.6935C8.1958 11.7314 8.09806 11.7508 7.99935 11.7508C7.90064 11.7508 7.8029 11.7314 7.71173 11.6935C7.62057 11.6556 7.53778 11.6002 7.4681 11.5302L2.4681 6.53025C2.3272 6.38935 2.24805 6.19825 2.24805 5.999C2.24805 5.79974 2.3272 5.60864 2.4681 5.46775C2.60899 5.32685 2.80009 5.2477 2.99935 5.2477C3.19861 5.2477 3.3897 5.32685 3.5306 5.46775L7.99997 9.93712L12.4693 5.46712C12.6102 5.32623 12.8013 5.24707 13.0006 5.24707C13.1999 5.24707 13.391 5.32623 13.5318 5.46712C13.6727 5.60802 13.7519 5.79911 13.7519 5.99837C13.7519 6.19763 13.6727 6.38873 13.5318 6.52962L13.5306 6.53025Z" fill="#929594"/>
            </svg>
            <span className="text-sm font-semibold text-[#929594]">All Priority</span>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 bg-[#F1F3F4] rounded-xl px-4 py-2 flex-1 max-w-[220px]">
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

        {/* Work Report Cards Grid or Empty State */}
        {filteredReports.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReports.map((report, index) => (
              <WorkReportCard 
                key={index} 
                report={report}
              />
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
            <h3 className="text-xl font-semibold text-black mb-2">No Report Found</h3>
            <p className="text-sm text-[#929594]">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
