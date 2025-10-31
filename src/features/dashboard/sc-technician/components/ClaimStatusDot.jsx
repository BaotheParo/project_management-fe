import { getClaimStatusColor } from "../../../../constants/ClaimStatus";


function ClaimStatusDot({ status }) {
  const color = getClaimStatusColor(status);
  return (
    <span 
      className={`inline-block w-2 h-2 rounded-full mr-2 ${color}`} 
      aria-label={`Status: ${status}`}
    />
  ) 
}

export default ClaimStatusDot;
