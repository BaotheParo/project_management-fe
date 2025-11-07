import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { CalendarBlank, Info, Car, Gear, Warning, Camera, Headphones } from 'phosphor-react'
import { useWarrantyClaims } from '../../../../api/useWarrantyClaims'
import { useSCStaffClaims } from '../../../../api/useSCStaffClaims'
import { useAuth } from '../../../../app/AuthProvider'
import Loader from '../../../../components/Loader'
import { SuccessNotification } from '../../../../components/Notification'

const InfoCard = ({ icon: Icon, title, children }) => {
  const IconComponent = Icon
  return (
    <div className="border-[3px] border-[#EBEBEB] rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <IconComponent size={29} className="text-[#626AE7]" />
        <h3 className="text-lg font-semibold text-[#686262]">{title}</h3>
      </div>
      <div className="space-y-6">
        {children}
      </div>
    </div>
  )
}

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

const RadioOption = ({ label, checked, onChange }) => {
  const handleClick = () => {
    if (onChange) onChange()
  }
  
  return (
    <label className="flex items-center gap-3 cursor-pointer" onClick={handleClick}>
      <div className="relative">
        <div className={`w-5 h-5 rounded-full border-2 ${checked ? 'border-[#626AE7] bg-[#626AE7]' : 'border-[#6B7280] bg-white'}`} />
        {checked && <div className="w-3 h-3 rounded-full bg-white absolute top-1 left-1" />}
      </div>
      <span className="text-lg font-medium text-[#686262]">{label}</span>
    </label>
  )
}

export default function WarrantyRequestDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [selectedRequest, setSelectedRequest] = useState('replacement')
  const [notification, setNotification] = useState(null)

  // ALL HOOKS MUST BE AT THE TOP - before any early returns
  // Get stats from SC Staff claims hook
  const { stats } = useSCStaffClaims(user?.serviceCenterId)
  
  // Fetch claim details using the hook - don't pass userId to avoid auto-fetching list
  const { row: claimData, loading, error, fetchClaimById } = useWarrantyClaims()

  // Fetch claim when component mounts or id changes
  useEffect(() => {
    console.log('🔍 WarrantyRequestDetail - Fetching claim with ID:', id)
    if (id) {
      fetchClaimById(id)
    }
  }, [id, fetchClaimById])

  // Log claim data when it changes
  useEffect(() => {
    console.log('📊 WarrantyRequestDetail - Claim data:', claimData)
  }, [claimData])

  // Handler for accepting request - just navigate to assign worker
  // Note: Work orders are created by EVM Staff or backend automatically
  // SC Staff only assigns technicians to existing work orders
  const handleAcceptRequest = () => {
    console.log('Accepted claim:', claimData.claimId)
    
    // Show success notification
    setNotification({
      type: 'success',
      message: 'Claim accepted successfully!',
      subText: 'Redirecting to assign worker page...'
    })
    
    // Navigate after a short delay
    setTimeout(() => {
      navigate('/sc-staff/assign-worker')
    }, 1500)
  }

  // Handler for rejecting request - simplified: just show message and go back
  const handleRejectRequest = () => {
    if (!confirm('Are you sure you want to reject this claim?')) {
      return
    }
    
    // Show success notification
    setNotification({
      type: 'success',
      message: 'Claim rejected.',
      subText: 'Returning to dashboard...'
    })
    
    // Navigate after a short delay
    setTimeout(() => {
      navigate('/sc-staff/dashboard')
    }, 1500)
  }

  // Handler for parts request (forward)
  const handlePartsRequest = () => {
    // Show success notification
    setNotification({
      type: 'success',
      message: 'Parts request sent successfully!',
      subText: 'Returning to dashboard...'
    })
    
    // Navigate after a short delay
    setTimeout(() => {
      navigate('/sc-staff/dashboard')
    }, 1500)
  }

  // NOW we can have early returns - AFTER all hooks are called
  // Show loader while fetching
  if (loading) {
    return (
      <div className="p-12 w-full flex justify-center items-center min-h-[400px]">
        <Loader />
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="p-12 w-full">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 font-medium">Error loading claim details</p>
          <p className="text-red-500 text-sm mt-2">{error.message || 'Please try again later'}</p>
          <button 
            onClick={() => navigate('/sc-staff/dashboard')}
            className="mt-4 px-6 py-2 bg-[#626AE7] text-white rounded-lg hover:bg-[#5159c9] transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  // Show not found if no claim data (only after loading is done and no error)
  if (!loading && !error && !claimData) {
    return (
      <div className="p-12 w-full">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
          <p className="text-gray-600 font-medium">Claim not found</p>
          <p className="text-gray-500 text-sm mt-2">The claim you're looking for doesn't exist</p>
          <button 
            onClick={() => navigate('/sc-staff/dashboard')}
            className="mt-4 px-6 py-2 bg-[#626AE7] text-white rounded-lg hover:bg-[#5159c9] transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  // If still no data, show loading (shouldn't happen but safety check)
  if (!claimData) {
    return (
      <div className="p-12 w-full flex justify-center items-center min-h-[400px]">
        <Loader />
      </div>
    )
  }

  return (
    <div className="p-12 w-full">
      {/* Success Notification */}
      {notification && notification.type === 'success' && (
        <SuccessNotification
          message={notification.message}
          subText={notification.subText}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-[30px] font-semibold text-black mb-1">Hello, SC Staff</h1>
          <p className="text-xl font-semibold text-[#929594]">An overview of your works.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-[17px] font-semibold text-[#393C3B]">{new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
          <div className="w-[45px] h-[45px] rounded-full bg-[#F1F3F4] flex items-center justify-center">
            <CalendarBlank size={25} className="text-black" />
          </div>
        </div>
      </div>

      <div className="flex gap-4 mb-8 flex-wrap">
        <StatBadge label="Total Claim:" value={stats?.totalClaims?.toString().padStart(2, '0') || '00'} />
        <StatBadge label="Accepted:" value={stats?.acceptedClaims?.toString().padStart(2, '0') || '00'} color="text-[#54C020]" />
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-[25px] font-semibold text-black mb-2">Warranty Request Detail</h2>
          <p className="text-base text-[#4B5563]">View detailed information about this warranty claim request.</p>
        </div>
        <button 
          onClick={() => navigate('/sc-staff/dashboard')}
          className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
        >
          ← Back to Dashboard
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <InfoCard icon={Info} title="Basic Information">
          <div className="grid grid-cols-2 gap-6">
            <InfoField label="Claim ID" value={claimData.claimId || 'N/A'} />
            <InfoField label="Claim Date" value={claimData.claimDate || 'N/A'} />
            <InfoField label="Status" value={claimData.claimStatus || 'N/A'} />
            <InfoField label="Policy Name" value={claimData.policyName || 'N/A'} />
            <div className="col-span-2">
              <InfoField label="Service Center" value={claimData.serviceCenterName || 'N/A'} />
            </div>
            <div className="col-span-2">
              <InfoField label="Technician" value={claimData.technicianName || 'Not Assigned'} />
            </div>
          </div>
        </InfoCard>

        <InfoCard icon={Car} title="Vehicle Information">
          <div className="grid grid-cols-2 gap-6">
            <InfoField label="VIN Code" value={claimData.vin || 'N/A'} />
            <InfoField label="Vehicle Name" value={claimData.vehicleName || 'Unknown'} />
            <InfoField label="Current Mileage (km)" value={claimData.mileAge?.toLocaleString() || 'N/A'} />
            <InfoField label="Purchase Date" value={claimData.purchaseDate || 'N/A'} />
          </div>
        </InfoCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <InfoCard icon={Gear} title="Parts Information">
          <div className="space-y-4">
            {claimData.parts && Array.isArray(claimData.parts) && claimData.parts.length > 0 ? (
              claimData.parts.filter(part => part != null).map((part, index) => (
                <div key={index} className="border-[2px] border-[#F4F4F4] rounded-xl p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <InfoField label="Part Name" value={part?.partName || 'N/A'} />
                    <InfoField label="Part Code" value={part?.partCode || 'N/A'} />
                    <InfoField label="Quantity" value={part?.quantity?.toString() || '0'} />
                    <InfoField label="Cost" value={`$${part?.cost?.toLocaleString() || '0'}`} />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-500 text-center py-4">No parts information available</div>
            )}
            {claimData.totalCost != null && claimData.totalCost > 0 && (
              <div className="border-t-2 border-[#EBEBEB] pt-4 mt-4">
                <InfoField label="Total Cost" value={`$${claimData.totalCost?.toLocaleString() || '0'}`} />
              </div>
            )}
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
            <p className="text-xl font-medium text-black leading-relaxed">
              {claimData.issueDescription || 'No description provided'}
            </p>
          </div>
        </InfoCard>

        <div className="border-[3px] border-[#EBEBEB] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-lg font-semibold text-[#686262]">Actions</div>
          </div>
          <div className="space-y-3">
            <button 
              onClick={handleAcceptRequest}
              className="w-full py-3 bg-[#626AE7] rounded-2xl text-sm font-semibold text-white hover:bg-[#5159c9] transition-colors"
            >
              Accept Request
            </button>
            <button 
              onClick={handleRejectRequest}
              className="w-full py-3 bg-[#F1F3F4] rounded-2xl text-sm font-semibold text-black hover:bg-[#e5e7e9] transition-colors"
            >
              Reject Request
            </button>
            <button 
              onClick={handlePartsRequest}
              className="w-full py-3 bg-[#F1F3F4] rounded-2xl text-sm font-semibold text-black hover:bg-[#e5e7e9] transition-colors"
            >
              Parts request
            </button>
          </div>
        </div>
      </div>

      {/* Evidence section - Note: API doesn't provide images yet */}
      <div className="mb-8">
        <InfoCard icon={Camera} title="Evidence Upload">
          <div className="border-[3px] border-dashed border-[#EBEBEB] rounded-2xl p-6 bg-white">
            <div className="text-center py-8 text-gray-500">
              <Camera size={48} className="mx-auto mb-3 text-gray-400" />
              <p className="text-base">No evidence images available</p>
              <p className="text-sm text-gray-400 mt-1">Images will be displayed here when uploaded</p>
            </div>
          </div>
        </InfoCard>
      </div>
    </div>
  )
}
