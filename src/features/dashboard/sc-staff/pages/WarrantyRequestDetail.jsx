import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { CalendarBlank, Info, Car, Gear, Warning, Camera, Headphones } from 'phosphor-react'

const InfoCard = ({ icon: Icon, title, children }) => (
  <div className="border-[3px] border-[#EBEBEB] rounded-2xl p-6">
    <div className="flex items-center gap-3 mb-6">
      <Icon size={29} className="text-[#626AE7]" />
      <h3 className="text-lg font-semibold text-[#686262]">{title}</h3>
    </div>
    <div className="space-y-6">
      {children}
    </div>
  </div>
)

const InfoField = ({ label, value }) => (
  <div>
    <div className="text-base font-medium text-[#6B716F] mb-2">{label}</div>
    <div className="text-xl font-medium text-black">{value}</div>
  </div>
)

const StatBadge = ({ label, value, color = 'text-black' }) => (
  <div className="border-[3px] border-[#EBEBEB] rounded-2xl px-5 py-2 inline-flex items-center gap-2">
    <span className="text-base font-semibold text-[#686262]">{label}</span>
    <span className={`text-base font-semibold ${color}`}>{value}</span>
  </div>
)

const RadioOption = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-3 cursor-pointer">
    <div className="relative">
      <div className={`w-5 h-5 rounded-full border-2 ${checked ? 'border-[#626AE7] bg-[#626AE7]' : 'border-[#6B7280] bg-white'}`} />
      {checked && <div className="w-3 h-3 rounded-full bg-white absolute top-1 left-1" />}
    </div>
    <span className="text-lg font-medium text-[#686262]">{label}</span>
  </label>
)

export default function WarrantyRequestDetail() {
  const { id } = useParams()
  const [selectedRequest, setSelectedRequest] = useState('replacement')
  const [showPartModal, setShowPartModal] = useState(false)

  const claimData = {
    claimId: 'WC-2003-9192332',
    claimDate: '02/12/2025',
    createdBy: 'Jso',
    manufacturer: 'VinFast',
    serviceCenter: 'WC-2003-9192332',
    vinCode: 'LSV1E7AL0MC123458',
    vehicleName: 'VinFast VF-3',
    currentMileage: '8,433',
    purchaseDate: '12/23/2012',
    partName: 'Battery',
    partCode: 'PIN12334SD',
    replacementDate: '05/16/2025',
    issueDescription: 'My car cannot start like normal, when start the engine the sound is noisy as hell.',
    images: [
      'https://api.builder.io/api/v1/image/assets/TEMP/2cbfa0524981f52778587d8578a529c7eddfd946?width=350',
      'https://api.builder.io/api/v1/image/assets/TEMP/0ea44651492d751b9f8920515492f3e9195b19e4?width=644',
      'https://api.builder.io/api/v1/image/assets/TEMP/7659294167319636ceebbe6578953b5598dedc13?width=452'
    ]
  }

  return (
    <div className="p-12 w-full">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-[30px] font-semibold text-black mb-1">Hello, SC Staff</h1>
          <p className="text-xl font-semibold text-[#929594]">An overview of your works.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-[17px] font-semibold text-[#393C3B]">16 May, 2025</span>
          <div className="w-[45px] h-[45px] rounded-full bg-[#F1F3F4] flex items-center justify-center">
            <CalendarBlank size={25} className="text-black" />
          </div>
        </div>
      </div>

      <div className="flex gap-4 mb-8 flex-wrap">
        <StatBadge label="Total Claim:" value="254" />
        <StatBadge label="Pending:" value="200" />
        <StatBadge label="In Progress:" value="50" color="text-[#EBB80F]" />
        <StatBadge label="Completed:" value="03" color="text-[#54C020]" />
        <StatBadge label="Overdue:" value="01" color="text-[#C02020]" />
      </div>

      <div className="mb-8">
        <h2 className="text-[25px] font-semibold text-black mb-2">Warranty Request Detail</h2>
        <p className="text-base text-[#4B5563]">Fill out the form below to submit a new warranty claim request for electric vehicle components.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <InfoCard icon={Info} title="Basic Information">
          <div className="grid grid-cols-2 gap-6">
            <InfoField label="Claim ID" value={claimData.claimId} />
            <InfoField label="Claim Date" value={claimData.claimDate} />
            <InfoField label="Created By" value={claimData.createdBy} />
            <InfoField label="Manufacturer" value={claimData.manufacturer} />
            <div className="col-span-2">
              <InfoField label="Service Center" value={claimData.serviceCenter} />
            </div>
          </div>
        </InfoCard>

        <InfoCard icon={Car} title="Vehicle Information">
          <div className="grid grid-cols-2 gap-6">
            <InfoField label="VIN Code" value={claimData.vinCode} />
            <InfoField label="Vehicle Name" value={claimData.vehicleName} />
            <InfoField label="Current Mileage (km)" value={claimData.currentMileage} />
            <InfoField label="Purchase Date of Vehicle" value={claimData.purchaseDate} />
          </div>
        </InfoCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <InfoCard icon={Gear} title="Part Information">
          <div className="grid grid-cols-2 gap-6">
            <InfoField label="Part Name" value={claimData.partName} />
            <InfoField label="Part Code" value={claimData.partCode} />
            <div className="col-span-2">
              <InfoField label="Replacement Date" value={claimData.replacementDate} />
            </div>
          </div>
        </InfoCard>

        <InfoCard icon={Headphones} title="Service Center Request">
          <div className="space-y-4">
            <RadioOption 
              label="Request replacement part approval" 
              checked={selectedRequest === 'replacement'}
              onChange={() => setSelectedRequest('replacement')}
            />
            <RadioOption 
              label="Request repair approval" 
              checked={selectedRequest === 'repair'}
              onChange={() => setSelectedRequest('repair')}
            />
            <RadioOption 
              label="Request reimbursement (repair completed in advance)" 
              checked={selectedRequest === 'reimbursement'}
              onChange={() => setSelectedRequest('reimbursement')}
            />
          </div>
        </InfoCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <InfoCard icon={Warning} title="Issue Details">
          <div className="border-[3px] border-[#F4F4F4] rounded-2xl p-6 bg-white">
            <div className="text-base font-medium text-[#6B716F] mb-3">Issue Description</div>
            <p className="text-xl font-medium text-black leading-relaxed">{claimData.issueDescription}</p>
          </div>
        </InfoCard>

        <div className="border-[3px] border-[#EBEBEB] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-lg font-semibold text-[#686262]">Actions</div>
          </div>
          <div className="space-y-3">
            <button className="w-full py-3 bg-[#626AE7] rounded-2xl text-sm font-semibold text-white hover:bg-[#5159c9] transition-colors">
              Accept Request
            </button>
            <button className="w-full py-3 bg-[#F1F3F4] rounded-2xl text-sm font-semibold text-black hover:bg-[#e5e7e9] transition-colors">
              Reject Request
            </button>
            <button 
              onClick={() => setShowPartModal(true)}
              className="w-full py-3 bg-[#F1F3F4] rounded-2xl text-sm font-semibold text-black hover:bg-[#e5e7e9] transition-colors"
            >
              Parts request
            </button>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <InfoCard icon={Camera} title="Evidence Upload">
          <div className="border-[3px] border-dashed border-[#EBEBEB] rounded-2xl p-6 bg-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {claimData.images.map((image, index) => (
                <div key={index} className="aspect-[3/2] rounded-xl overflow-hidden">
                  <img 
                    src={image} 
                    alt={`Evidence ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </InfoCard>
      </div>

      {/* Part Request Modal */}
      {showPartModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowPartModal(false)}>
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-medium text-gray-600">Part request for order {id || 'RO-002'}</h3>
              <button 
                onClick={() => setShowPartModal(false)}
                className="w-6 h-6 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M12 4L4 12M4 4L12 12" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Part Information Card */}
            <div className="border-2 border-gray-200 rounded-2xl p-5 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Gear size={24} className="text-[#626AE7]" />
                <h4 className="text-base font-semibold text-gray-700">Part Information</h4>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Part Name</div>
                    <div className="text-base font-semibold text-black">{claimData.partName}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Part Code</div>
                    <div className="text-base font-semibold text-black">{claimData.partCode}</div>
                  </div>
                </div>
                
                <div>
                  <div className="text-xs text-gray-500 mb-1">Replacement Date</div>
                  <div className="text-base font-semibold text-black">{claimData.replacementDate}</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button 
                onClick={() => setShowPartModal(false)}
                className="flex-1 py-2.5 border border-gray-300 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  // Handle request submission
                  console.log('Part request submitted')
                  setShowPartModal(false)
                }}
                className="flex-1 py-2.5 bg-[#626AE7] text-white rounded-xl text-sm font-semibold hover:bg-[#5159d6] transition-colors"
              >
                Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
