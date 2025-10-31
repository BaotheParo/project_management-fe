import { CalendarBlank } from 'phosphor-react'

export default function DashboardHeader({ 
  title = "Hello, SC Staff!", 
  subtitle = "An overview of your works.",
  date = "16 May, 2025"
}) {
  return (
    <div className="flex items-start justify-between mb-8">
      <div>
        <h1 className="text-[30px] font-semibold text-black mb-1">{title}</h1>
        <p className="text-xl font-semibold text-[#929594]">{subtitle}</p>
      </div>
      
      <div className="flex items-center gap-3">
        <span className="text-[17px] font-semibold text-[#393C3B]">{date}</span>
        <div className="w-[45px] h-[45px] rounded-full bg-[#F1F3F4] flex items-center justify-center">
          <CalendarBlank size={25} className="text-black" />
        </div>
      </div>
    </div>
  )
}