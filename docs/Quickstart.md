# Quickstart
(Make sure you've completed the steps of the **Installation** doc first before going through this Quickstart.)

This project works best with the Visual Studio Code IDE.

## Running the Backend.

Open a terminal in your Ubuntu server, and cd to the frontend/src folder.
```bash
# cd app_path/frontend/src
```
Run the following php command:
```bash
# php -S 0.0.0.0:4200
```

## Running the Frontend.

### **Step 1.** Set up the IDE Development Environment:
Open a Visual Studio Code terminal, and go to the environments folder and create a new environment file:
```bash
$ cd frontend/src/environments
$ cp environment.ts environment.loc.ts
```

### **Step 2.** Edit the environment.loc.ts file:
```js
...
API_BASE_URL: "http://your-url.loc/api",
...
```
**API_BASE_URL** - the url to your backend server.

Example (use your ubuntu server's actual IP address):
```js
...
API_BASE_URL: "http://192.168.1.1/api",
...
```

### **Step 3.** Return to frontend folder, then run the local server:
```bash
$ cd frontend
$ npm run local
```
The `npm run local` command launches the server, watches your files, and rebuilds the app as you make changes to those files.

After running the local server, you can open your project by visiting http://localhost:4200/.

### **Step 4.** For building your app and placing it into the output path (web/ by default):
```bash
npm run build
```
