import React from 'react'
import { User, IdentificationBadge, Key } from '@phosphor-icons/react'
import avatar from '../../../../assets/Profile/avatar.png'

export default function Profile() {
  return (
    
    <div className="w-full">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-gray-400 mt-1">Manage and track warranty claim requests</p>
        </div>




      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <div className="flex items-center justify-between gap-6 mb-6">
          <div className="flex items-center gap-6">
            <img src={avatar} alt="avatar" className="w-24 h-24 rounded-full object-cover" />
            <div>
              <div className="text-2xl font-semibold">Jso</div>
              <div className="text-sm text-gray-500">Senior Technican | ID: J123</div>
              <div className="flex items-center gap-2 mt-3">
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">Engineer Repair</span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">Diagnostic</span>
              </div>
            </div>
            <div className="ml-200">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md">Change Password</button>
            </div>
          </div>




          </div>

          <div className="space-y-8 max-w-2xl">
            <div>
              <label className="text-sm text-gray-600 block mb-2">Email</label>
              <input className="w-2/3 p-4 border rounded-md text-lg" defaultValue="sme@gmail.com" />
            </div>

            <div>
              <label className="text-sm text-gray-600 block mb-2">Phone Number</label>
              <input className="w-2/3 p-4 border rounded-md text-lg" defaultValue="09223447364" />
            </div>
          </div>
        </div>

        {/* right column removed per design - change password button remains at top-right */}
      </div>
    </div>
  )
}