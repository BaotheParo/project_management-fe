import React, { useMemo, useState } from 'react'
import {
  CheckCircleIcon,
  CalendarBlankIcon,
  IdentificationBadgeIcon,
  UserIcon,
  DotsThreeCircleIcon,
  SpinnerIcon,
  MagnifyingGlassIcon,
  InfoIcon,
  CarProfileIcon,
  ClockIcon,
  ListDashesIcon,
  MegaphoneIcon,
} from "@phosphor-icons/react";
import { useCampaignsApi } from '../../../../api/useCampaignsApi';
import Loader from '../../../../components/Loader';
import CampaignStatusDot from '../components/CampaignStatusDot';
import WorkPriority from '../components/WorkPriority';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../app/AuthProvider';
import StatusCard from '../../../../components/StatusCard';

export default function CampaignsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { campaigns, loading, error } = useCampaignsApi(user?.userId);

  const filters = ["All", "Pending", "InProgress", "Completed", "Overdue"];

  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');

  // Filter campaigns based on active filter and search term
  const visibleCampaigns = useMemo(() => {
    console.log("🔍 Filtering campaigns:", campaigns);
    console.log("🔍 Filter:", filter);
    console.log("🔍 Query:", query);
    
    const filtered = campaigns.filter(
      (c) => {
        const matchesFilter = filter === 'All' ? true : c.statusDisplay === filter;
        const matchesSearch = query === '' || 
          c.campaignName.toLowerCase().includes(query.toLowerCase()) ||
          c.campaignId.toLowerCase().includes(query.toLowerCase());
        
        console.log(`Campaign ${c.campaignId}: matchesFilter=${matchesFilter}, matchesSearch=${matchesSearch}`);
        
        return matchesFilter && matchesSearch;
      }
    );
    
    console.log("✅ Filtered results:", filtered);
    return filtered;
  }, [campaigns, filter, query]);

  const totalCampaigns = campaigns.length;
  const pendingCampaigns = campaigns.filter(c => c.statusDisplay === "Pending").length;
  const inProgressCampaigns = campaigns.filter(c => c.statusDisplay === "InProgress").length;
  const completedCampaigns = campaigns.filter(c => c.statusDisplay === "Completed").length;
  const overdueCampaigns = campaigns.filter(c => c.statusDisplay === "Overdue").length;

  if (loading) return <Loader />;
  if (error) {
    // Check if it's a 404 error (endpoint not found)
    const is404 = error.response?.status === 404;
    return (
      <div className="w-full p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-red-600 font-semibold mb-2">Error loading campaigns</p>
          <p className="text-red-500 text-sm mb-2">{error.message}</p>
          {is404 && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-yellow-800 text-sm font-semibold mb-2">⚠️ Backend Endpoint Not Found (404)</p>
              <p className="text-yellow-700 text-xs">
                The API endpoint <code className="bg-yellow-100 px-1 rounded">/campaigns/technician/:userId</code> does not exist yet.
                <br />
                Please check with backend team to confirm the correct endpoint path.
              </p>
              <p className="text-yellow-700 text-xs mt-2">
                <strong>Possible endpoints:</strong>
                <br />• /campaigns/technician/:userId
                <br />• /campaigns/user/:userId  
                <br />• /campaigns (with filtering)
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Campaigns</h1>
          <p className="text-gray-400 mt-1">
            Manage and track campaign assignments
          </p>
        </div>
        <div />
      </div>

      {/* Stats Cards */}
      <div className="flex flex-wrap gap-6 mt-20 mb-12">
        <StatusCard
          title="Total Campaigns"
          titleColor="text-indigo-600"
          count={totalCampaigns}
          description="Currently in your queue"
          icon={MegaphoneIcon}
          iconColor={"#4f39f8"}
        />
        <StatusCard
          title="Pending"
          titleColor="text-gray-500"
          count={pendingCampaigns}
          description="Awaiting start"
          icon={DotsThreeCircleIcon}
          iconColor={"#979AA3"}
        />
        <StatusCard
          title="In-Progress"
          titleColor="text-yellow-500"
          count={inProgressCampaigns}
          description="Being worked on"
          icon={SpinnerIcon}
          iconColor={"#EBB80F"}
        />
        <StatusCard
          title="Completed"
          titleColor="text-green-600"
          count={completedCampaigns}
          description="Finished today"
          icon={CheckCircleIcon}
          iconColor={"#00a63e"}
        />
        <StatusCard
          title="Overdue"
          titleColor="text-red-500"
          count={overdueCampaigns}
          description="Past due date"
          icon={ClockIcon}
          iconColor={"#fb2c36"}
        />
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[25px] font-semibold mb-6">Campaigns ({visibleCampaigns.length})</h2>
      </div>

      <div className="flex gap-5 flex-wrap w-full justify-between mb-4">
        <div className="bg-gray-100 rounded-full inline-flex gap-2 p-2 overflow-auto">
          {filters.map(
            (f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-sm px-3 py-2 rounded-full text-nowrap ${filter === f
                  ? "bg-indigo-600 text-white font-semibold transition-all cursor-pointer"
                  : "text-black font-semibold hover:bg-white transition-all cursor-pointer"
                  }`}
              >
                {f}
              </button>
            )
          )}
        </div>
        <div className="flex items-center gap-2 bg-[#F1F3F4] rounded-full px-4 py-2">
          <MagnifyingGlassIcon size={20} weight="bold" color="#929594" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search campaigns..."
            className="bg-transparent outline-none text-sm font-semibold text-black placeholder-[#929594] flex-1"
          />
        </div>
      </div>

      {visibleCampaigns.length === 0 ? (
        <div className="w-full bg-gray-100 rounded-md p-8 flex items-center justify-center">
          <div className="text-center">
            <InfoIcon size={28} className="mx-auto text-gray-500 mb-3" />
            <div className="font-semibold text-lg mb-1">No Campaign Found</div>
            <div className="text-sm text-gray-500">
              Try adjusting your search or filters
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleCampaigns.map((campaign) => (
            <div
              key={campaign.campaignId}
              className="bg-white border border-[#d8dadf] rounded-2xl shadow-[0_4px_16px_3px_rgba(173,173,173,0.12)] overflow-hidden p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#e1e3ff] flex items-center justify-center text-indigo-600">
                    <MegaphoneIcon size={25} weight="bold" color="#4f39f6" />
                  </div>
                  <div>
                    <div className="font-semibold">{campaign.campaignName}</div>
                    <div className="text-xs text-gray-500">ID: {campaign.campaignId}</div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center">
                    <CampaignStatusDot status={campaign.statusDisplay} />
                    <span className='font-medium text-[13px]'>{campaign.statusDisplay}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <UserIcon size={16} className="text-gray-500" />
                  {campaign.technicianName || "Unassigned"}
                </div>
                <div className="text-right flex items-center justify-end gap-2">
                  <CarProfileIcon size={16} className="text-gray-500" />
                  {campaign.vehicleCount} vehicles
                </div>
                <div className="flex items-center gap-2">
                  <CalendarBlankIcon size={16} className="text-gray-500" />
                  {campaign.startDate}
                </div>
                <div className="text-right flex items-center justify-end gap-2">
                  <ClockIcon size={16} className="text-gray-500" />
                  {campaign.endDate}
                </div>
              </div>

              {campaign.description && (
                <div className="text-sm text-gray-700 mb-4 bg-gray-50 p-3 rounded-md">
                  {campaign.description}
                </div>
              )}

              {campaign.serviceCenterName && (
                <div className="text-xs text-gray-500 mb-4">
                  Service Center: {campaign.serviceCenterName}
                </div>
              )}

              <div className="flex items-center justify-end">
                <button
                  onClick={() => navigate(`/sc-technician/campaigns/view-detail/${campaign.campaignId}`)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 transition-colors text-white rounded-full cursor-pointer"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

