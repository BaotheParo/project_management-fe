import React, { useState } from 'react'
import avatarImg from '../../../../assets/Profile/avatar.png'

export default function Profile() {
  const [profile] = useState({
    name: 'Jso',
    role: 'Senior Techican',
    id: 'J123',
    skills: ['Engineer Repair', 'Diagnostic'],
    email: 'sme@gmail.com',
    phone: 'sme@gmail.com',
    avatar: avatarImg,
  })

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

      {/* Profile Section */}
      <div className="max-w-6xl">
        {/* Profile Header */}
        <div className="flex items-start justify-between mb-12">
          <div className="flex items-center gap-8">
            {/* Avatar */}
            <div className="w-[120px] h-[120px] rounded-full bg-[#D9D9D9] flex items-center justify-center overflow-hidden flex-shrink-0">
              {profile.avatar ? (
                <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
              ) : (
                <svg width="60" height="60" viewBox="0 0 50 50" fill="none">
                  <path d="M25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50C38.8071 50 50 38.8071 50 25C50 11.1929 38.8071 0 25 0ZM25 12.5C28.4518 12.5 31.25 15.2982 31.25 18.75C31.25 22.2018 28.4518 25 25 25C21.5482 25 18.75 22.2018 18.75 18.75C18.75 15.2982 21.5482 12.5 25 12.5ZM25 43.75C20.3125 43.75 16.1161 41.7411 13.1696 38.5268C13.8125 34.8661 17.1875 32.0893 21.25 32.0893C21.4732 32.0893 21.6964 32.125 21.9107 32.1875C22.8571 32.5 23.8929 32.6786 25 32.6786C26.1071 32.6786 27.1518 32.5 28.0893 32.1875C28.3036 32.125 28.5268 32.0893 28.75 32.0893C32.8125 32.0893 36.1875 34.8661 36.8304 38.5268C33.8839 41.7411 29.6875 43.75 25 43.75Z" fill="#929594"/>
                </svg>
              )}
            </div>

            {/* Name and Info */}
            <div>
              <h2 className="text-3xl font-semibold text-black mb-2">{profile.name}</h2>
              <p className="text-lg text-[#929594] mb-4">
                {profile.role} | ID: {profile.id}
              </p>
              <div className="flex gap-3">
                {profile.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-[#E5E5E5] rounded-lg text-sm font-medium text-black"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Change Password Button */}
          <button className="px-7 py-3.5 bg-[#626AE7] text-white rounded-xl text-base font-semibold hover:bg-[#5158D0] transition-colors">
            Change Password
          </button>
        </div>

        {/* Email Field */}
        <div className="mb-8">
          <label className="block text-base font-medium text-black mb-3">Email</label>
          <input
            type="email"
            value={profile.email}
            readOnly
            className="w-full max-w-md px-5 py-3.5 bg-white border border-[#E5E5E5] rounded-xl text-base text-black outline-none focus:border-[#626AE7] transition-colors"
          />
        </div>

        {/* Phone Number Field */}
        <div>
          <label className="block text-base font-medium text-black mb-3">Phone Number</label>
          <input
            type="text"
            value={profile.phone}
            readOnly
            className="w-full max-w-md px-5 py-3.5 bg-white border border-[#E5E5E5] rounded-xl text-base text-black outline-none focus:border-[#626AE7] transition-colors"
          />
        </div>
      </div>
    </div>
  )
}
