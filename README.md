##  Project Description

The backend is an Express.js and MongoDB API that powers the real estate management workflow. It handles authentication, employee and admin management, projects, floors, units, models, folders, recent activity tracking, image uploads to AWS S3, and image proxying for frontend rendering and export flows.

### Backend Highlights

- Built with Node.js, Express 5, MongoDB, and Mongoose.
- Uses JWT access and refresh tokens with cookie-based session refresh.
- Supports AWS S3 image uploads through `multer-s3`.
- Organizes business logic into modules for auth, projects, floors, models, folders, recents, employees, and admins.
- Provides dashboard-style aggregate endpoints for company-level project and admin statistics.

## API Documentation

### Base Information

- Local base URL: `http://localhost:5000` or configured `PORT`
- Health check: `GET /`
- Main route groups:
  - `/auth`
  - `/projects`
  - `/floors`
  - `/models`
  - `/folders`
  - `/recents`
  - `/employees`
  - `/admins`
  - `/image-proxy`

### Authentication

- `POST /auth/signup`
  - Create a user account with optional profile image upload.
- `POST /auth/login`
  - Login for standard users/employees and receive access token plus refresh cookie.
- `POST /auth/superadmin-login`
  - Login for superadmin users.
- `POST /auth/login-company`
  - Login flow for company/admin users.
- `POST /auth/refresh`
  - Refresh the access token from the `refreshToken` cookie.
- `POST /auth/logout`
  - Clear refresh token session.
- `POST /auth/forgot-password`
  - Send OTP for password reset.
- `POST /auth/verify-otp`
  - Verify OTP before password reset.
- `POST /auth/set-new-password`
  - Reset password for a user.
- `POST /auth/admin/set-new-password`
  - Reset password for an admin or superadmin.
- `PATCH /auth/change-password`
  - Change password using current password verification.
- `GET /auth/:userId`
  - Fetch a user profile by ID.
- `PATCH /auth/:userId`
  - Update profile data with optional image upload.
- `GET /auth/totalEmployeeProject/:userId`
  - Get user/company totals for employees and projects.
- `DELETE /auth/:adminId`
  - Delete an admin record.

### Projects

- `POST /projects/`
  - Create a project with optional image upload.
- `POST /projects/createproject/addtoFolder/`
  - Create a project and immediately attach it to a folder.
- `GET /projects/my-projects/:userId`
  - Get paginated projects for a user/company.
- `PATCH /projects/update/projectname/project`
  - Update a project name.
- `GET /projects/:projectId`
  - Get a project with related models, floors, folders, and counts.
- `DELETE /projects/:projectId`
  - Delete a project and related linked data.
- `GET /projects/dashboard/:companyId`
  - Get dashboard metrics and recent projects for a company.

### Floors and Units

- `POST /floors/`
  - Create a floor for a project.
- `GET /floors/project/:projectId`
  - Get all floors for a project.
- `GET /floors/:floorId`
  - Get a single floor.
- `PATCH /floors/:floorId`
  - Update floor name.
- `POST /floors/:floorId/unit`
  - Add a unit to a floor.
- `PATCH /floors/:floorId/:unitId`
  - Update a unit name or status.
- `DELETE /floors/:floorId`
  - Delete a floor.
- `DELETE /floors/:floorId/:unitId`
  - Delete a unit from a floor.

### Models

- `POST /models/`
  - Create a unit model or apartment model for a project.
- `GET /models/company/:userId`
  - Get company-wide models.
- `GET /models/:projectid`
  - Get all models for a project.
- `GET /models/model/:id`
  - Get one model by ID.
- `PATCH /models/:id`
  - Update a model.
- `DELETE /models/:id`
  - Delete a model.

### Folders

- `POST /folders/`
  - Create a folder for organizing projects.
- `PATCH /folders/:folderId/add-project`
  - Add a project to a folder.
- `DELETE /folders/:folderId`
  - Delete a folder.
- `GET /folders/`
  - Get all folders.
- `GET /folders/:folderId`
  - Get folder details.
- `GET /folders/user/:userId`
  - Get folders owned by a user.
- `GET /folders/folder/project/:folderId`
  - Get projects inside a specific folder.

### Recents

- `POST /recents/`
  - Save or update a recently viewed project.
- `GET /recents/user/:userId`
  - Get recent projects for a user.
- `DELETE /recents/:recentId`
  - Delete a recent entry.

### Employees

- `POST /employees/`
  - Create an employee with optional profile image upload.
- `GET /employees/allemployee/:id`
  - Get all employees under a company.
- `GET /employees/allblockedemployee/:id`
  - Get blocked employees under a company.
- `GET /employees/:employeeId`
  - Get one employee by ID.
- `PATCH /employees/:employeeId`
  - Update employee details.
- `DELETE /employees/:employeeId`
  - Delete an employee.

### Admins

- `GET /admins/role`
  - Get all admin-role users.
- `GET /admins/blocked`
  - Get blocked admins or superadmins.
- `GET /admins/:id`
  - Get one admin by ID.
- `PATCH /admins/:id`
  - Update admin data.
- `DELETE /admins/:id`
  - Delete an admin.
- `GET /admins/get/statistics`
  - Get admin statistics summary.
