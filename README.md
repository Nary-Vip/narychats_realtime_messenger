# Real-Time Messenger Application

This repository contains real-time messenger application that allows users to engage in one-on-one conversations as well as group chats with registered users. The application utilizes various technologies and services to provide a seamless messaging experience.

## Technologies Used

- **Frontend:** The frontend of the application is developed using Next.js, a React framework for server-side rendering. The UI is styled using Tailwind CSS, a utility-first CSS framework.

- **Backend:** The backend is also developed using Next.js, which serves as the server-side rendering framework. It handles APIs using axios, a promise-based HTTP client. 


- **Language:** The whole project is written in TypeScript, a statically-typed superset of JavaScript.

- **Authentication:** The application supports both OAuth and credential-based sign-in methods. Users can sign in using their Google and GitHub accounts. Passwords are securely hashed using bcrypt.

- **Database:** The application utilizes Prisma, an open-source database toolkit, along with MongoDB as the underlying database management system. Prisma provides an intuitive and type-safe way to interact with the database.

- **Authentication Session:** The authentication session is managed by NextAuth, a complete open-source authentication solution for Next.js applications. NextAuth simplifies the process of handling authentication sessions and provides a secure and customizable authentication flow.

- **Real-Time Messaging:** Real-time messaging capabilities are implemented using Pusher, a cloud-based service that enables real-time communication between clients. Pusher allows for instant updates to messages and online statuses.

- **Message Storage:** Text messages are stored in MongoDB, while attachments such as images are stored in Cloudinary, a cloud-based media management platform. This ensures efficient storage and retrieval of messages and attachments.

## Prerequisites

To run this application locally, you will need to have the following installed:

- Node.js
- MongoDB (local or atlas)
- Cloudinary account (for attachment storage)

## Getting Started

Follow the steps below to set up and run the application:

1. Clone this repository to your local machine.
2. Install the project dependencies by running the following command:

   ```
   npm install
   ```

3. Configure the environment variables. Create a `.env` file in the root directory of the project and provide the following information:

   ```
   MONGODB_URI=your_mongodb_uri
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   GOOGLE_ID==your_google_api_id
   GOOGLE_CLIENT_SECRET=your_google_client_id
   GITHUB_ID=your_github_api_id
   GITHUB_CLIENT_SECRET=your_github_client_id
   PUSHER_APP_ID=your_pusher_id
   NEXT_PUBLIC_PUSHER_APP_KEY=your_pusher_app_key
   PUSHER_APP_SECRET=your_pusher_secret_key
   PUSHER_CLUSTER=your_pusher_cluster_id

   ```

4. Start the development server by running the following command:

   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000` to access the application.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute the code as per the terms of the license.

## Acknowledgments

This application was developed using various open-source libraries, frameworks, and services. Special thanks to the creators and contributors of Next.js, Tailwind CSS, Axios, bcrypt, Prisma, MongoDB, NextAuth, Pusher, and Cloudinary for their excellent tools and services.

If you have any questions or need further assistance, please contact me through mail.