# Uptime SSL Monitoring System Frontend  

## Description  
  This frontend system consumes various api endpoints to provide a user friendly interface for monitoring and managing various services, which are monitored on uptime metrics and validity of SSL certificates.  

## System Setup Guidlines  
  Clone the reposisotry.  
### Prerequisites  
  1. You have pnpm installed. (npm can also be used, by first deleting the tsconfig.json)  
### Configuration Files  
#### Setting up the .env file  
  1. Create a .env file.  
  2. Copy the configurations below.  
  3. Edit the variables in the "{}" as needed.  
  ```bash
    VITE_BASE_URL=/api
    VITE_BASE_HOST={absolute_backend_server_host_with_port}

    VITE_CREATE_USER_ENDPOINT=/uam/user
    VITE_LOGIN_ENDPOINT=/uam/auth/login
    VITE_REGISTER_ENDPOINT=/uam/auth/register
    VITE_LOGOUT_ENDPOINT=/uam/auth/logout
    VITE_GET_USERS_ENDPOINT=/uam/users
    VITE_GET_USER_ENDPOINT=/uam/user/
    VITE_DEACTIVATE_USER_ENDPOINT=/uam/user/deactivate
    VITE_UPDATE_USER_ENDPOINT=/uam/user/update
    VITE_GET_GROUPS_ENDPOINT=/contact-groups
    VITE_ADD_GROUP_SERVICE_ENDPOINT=/contact-group/service
    VITE_ADD_GROUP_SERVICES_ENDPOINT=/contact-group/services
    VITE_GET_GROUP_ENDPOINT=/contact-group
    VITE_UPDATE_GROUP_ENDPOINT=/contact-group/update
    VITE_ADD_GROUP_MEMBER_ENDPOINT=/contact-group/member
    VITE_ADD_GROUP_MEMBERS_ENDPOINT=/contact-group/members
    VITE_GET_GROUP_MEMBERS_ENDPOINT=/contact-group/members
    VITE_CREATE_CONTACT_GROUP_ENDPOINT=/contact-group
    VITE_DEACTIVATE_CONTACT_GROUP_ENDPOINT=/contact-group/deactivate
    VITE_GET_GROUP_SERVICES_ENDPOINT=/contact-group/services
    VITE_SSL_HEALTH_CHECK_ENDPOINT=/services/ssl-cert-health-check
    VITE_SVC_HEALTH_CHECK_ENDPOINT=/services/domain-health-check
    VITE_UPDATE_SVC_ENDPOINT=/service/update
    VITE_GET_SERVICES_ENDPOINT=/services
    VITE_REGISTER_SERVICE_ENDPOINT=/service
    VITE_DEREGISTER_SERVICES_ENDPOINT=/service
    VITE_GET_SERVICE_ENDPOINT=/service
    VITE_GET_SERVICE_CHECK_LOGS_ENDPOINT=/services/health-check-logs
    VITE_GET_SERVICE_SSL_CHECK_LOGS_ENDPOINT=/services/ssl-check-logs
  ```

### Run the server  
  1. Open your terminal and cd to the home of the project.  
  2. Run the followinf commands.  
    - For npm:  
      - npm install  
      - npm run dev  
    - For pnpm:  
      - pnpm install  
      - pnpm dev  
  Your server should be running at this point.  
  Have fun.  