# my-portfolio

This is the backend for my portfolio website.

## Azure Deployment Troubleshooting

We encountered several issues while deploying this Node.js application to Azure App Service. This summary is intended for future reference.

| Problem | Incorrect Assumption / Root Cause | Solution |
| :--- | :--- | :--- |
| **"Forbidden" Error (403)** on the live website after a successful deployment. | The project was mistakenly treated as a static Vite/React single-page application. The deployment was trying to serve the root of the project, which didn't contain an `index.html`. | Correctly identified the project as a Node.js/Express backend. The deployment process was changed to deploy the application code directly, not a non-existent `dist` folder. |
| **GitHub Actions build failure**: "No files were found with the provided path: dist." | The workflow was configured to look for a `dist` folder created by a `npm run build` command, which is common for frontend projects, but this project is a backend and has no build step. | The GitHub Actions workflow (`main.yml`) was simplified to remove the "build" job entirely. The "deploy" job was updated to just install `npm` dependencies and then deploy the source code. |
| **"Application Error"** on the live website after a successful deployment. | This was the most critical error. Azure App Service on a Windows environment uses IIS as a web server. IIS requires a `web.config` file to know how to execute a Node.js application. This file had been mistakenly deleted. | A `web.config` file was created in the root of the project. This file tells IIS to use `iisnode` to run the `server.js` file and handle incoming requests correctly. |
| **General Deployment Issue**: Azure App was not starting the Node.js server correctly. | A common issue is that the server code does not listen on the correct port. Azure provides the correct port to listen on via an environment variable (`process.env.PORT`). | The `server.js` file was checked to ensure it uses `process.env.PORT || 3000` to listen on the port assigned by Azure, with a fallback for local development. |
