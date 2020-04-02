# Quickstart

Instructions for running and deploying the application. (Make sure you've completed the steps of the **Installation** doc first before going through this Quickstart.)

### 1. Run the Backend.

Open a terminal in your Ubuntu server, and cd to the *frontend/src* folder of the project.
```bash
$ cd frontend/src
```
Run the following php command:
```bash
$ sudo php -S 0.0.0.0:4200
```

### 2. Run the Frontend.

Open another, separate Ubuntu terminal. In it, cd to the *environments* folder of the project. Then, copy the environment.ts file:
```bash
$ cd frontend/src/environments
$ sudo cp environment.ts environment.loc.ts
```

### 3. Edit the environment.loc.ts file in VSCode:
```js
...
API_BASE_URL: "http://your-url.loc/api",
...
```
**API_BASE_URL** - the IP address of your Ubuntu server.

Example (use your ubuntu server's actual IP address):
```js
...
API_BASE_URL: "http://192.168.1.1/api",
...
```

### 4. cd to frontend folder. Then, run the local server:
```bash
$ cd frontend
$ sudo npm run local
```
The `npm run local` command launches the server, watches your files, and rebuilds the app as you make changes to those files.

After running the local server, you can open your project by visiting http://localhost:4200/.

### 5. For building your app and placing it into the output path (web/ by default):
```bash
npm run build
```
