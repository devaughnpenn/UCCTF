# Quickstart

Instructions for running and deploying the application. (Make sure you've completed the steps of **Installation** first before going through this Quickstart.)

---

### 1. Run the Backend Server.

cd to the frontend/src folder of the project.
```bash
$ cd frontend/src
```
Run the following php command:
```bash
$ sudo php -S 0.0.0.0:4200
```

### 2. Configure the Frontend Server.

cd to the environments folder of the project:
```bash
$ cd frontend/src/environments
```
Copy the environment file:
```bash
$ sudo cp environment.ts environment.loc.ts
```
Open the environment file in nano.
```bash
$ sudo nano environment.loc.ts
```
Edit the environment file:
```js
...
API_BASE_URL: "http://your-url.loc/api",
...
```
**API_BASE_URL** - the IP address of your Backend server, appended with the port number and /api.

Example (use your ubuntu server's actual IP address):
```js
...
API_BASE_URL: "http://175.132.1.1:4200/api",
...
```
Save your changes and exit nano.

### 3. Run the Frontend Server.

cd to the Frontend folder:
```bash
$ cd frontend
```
run local server via npm command:
```bash
# npm run local
```
The `npm run local` command launches the server, watches your files, and rebuilds the app as you make changes to those files.

After running the local server, you can open your project by visiting http://localhost:4200/. It may automatically open a tab to localhost in your browser.

### 4. For building your app and placing it into the output path (web/ by default):
```bash
# npm run build
```
