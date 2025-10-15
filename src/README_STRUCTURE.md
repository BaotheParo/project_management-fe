Project structure (src)

- api/: API clients and network utils
- assets/: images, svgs, fonts
- components/: shared React components (buttons, inputs, modals)
- hooks/: custom React hooks
- layout/: layout components used by major sections (AdminLayout, SCStaffLayout, SCTechnicianLayout, EVMStaffLayout)
- pages/: top-level pages split by role (admin, sc-staff, sc-technician, evm-staff)
- routes/: route definitions grouped by role
- utils/: shared utility functions

Notes:
- Pages under each role folder contain their own sub-pages.
- Layouts wrap pages for consistent header/sidebar.
- Routes export arrays of route objects that can be consumed by the router.
