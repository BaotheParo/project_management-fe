import { useState } from 'react'

export function useDropdown() {
  const [openDropdown, setOpenDropdown] = useState(null)

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index)
  }

  const closeDropdown = () => {
    setOpenDropdown(null)
  }

  const isOpen = (index) => {
    return openDropdown === index
  }

  return {
    openDropdown,
    toggleDropdown,
    closeDropdown,
    isOpen
  }
}