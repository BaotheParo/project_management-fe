export default function StatsCard({ title, count, subtitle, icon: Icon }) {
  return (
    <div className="border-[3px] border-[#EBEBEB] rounded-2xl p-8 min-w-[492px]">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-medium text-[#626AE7]">{title}</h3>
        {Icon && <Icon size={27} className="text-[#686262]" />}
      </div>
      <div className="text-[30px] font-semibold text-black mb-2">{count}</div>
      <div className="text-base font-medium text-[#686262]">{subtitle}</div>
    </div>
  )
}