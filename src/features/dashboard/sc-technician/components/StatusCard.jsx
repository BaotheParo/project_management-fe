const StatusCard = ({ count, title, description, titleColor, icon:Icon, iconColor }) => (
    <div className="flex-1 min-w-[245px] border-[3px] border-[#EBEBEB] rounded-2xl p-8">
        <div className="flex items-center justify-between gap-3 mb-4">
        <span className={`text-xl font-semibold ${titleColor}`}>{title}</span>
        {Icon && <Icon size={27} color={iconColor} weight="bold" />}
        </div>
        <div className="text-[30px] font-semibold text-black mb-2">{count}</div>
        <div className="text-base font-medium text-[#686262]">{description}</div>
    </div>
)

export default StatusCard;