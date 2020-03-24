# Quickstart

(Make sure you've completed the steps of the **Installation** doc first before going through this Quickstart.)

If you just want to run the project, follow the steps in the **For Production** section.

*Developers*: if you want to develop the project in an IDE, follow the steps in the **For Developers** section.

## For Production

### 1. Copy the environment file.
Open a terminal in your Ubuntu vm. cd to the project directory, go to the *environments* folder, and create a new environment file:
```bash
$ cd frontend/src/environments
$ sudo cp environment.ts environment.loc.ts
```

#### 2. Edit the environment.loc.ts file's API_BASE_URL:
```bash
$ sudo nano environment.loc.ts
```

```js
...
API_BASE_URL: "https://cincinnati.of1.weborchestra.org/api",
...
```
Save your changes and exit nano.

#### 3. Return to frontend folder and run the local server:
```bash
$ cd frontend
$ sudo npm run local
```
After running the local server, you can open your project by visiting http://localhost:4200/.

## For Developers

### 1. Run the Backend.

Open a terminal in your Ubuntu server, and cd to the frontend/src folder.
```bash
# cd app_path/frontend/src
```
Run the following php command:
```bash
# php -S 0.0.0.0:4200
```

### 2. Run the Frontend.
(This project works best when using Visual Studio Code.)

Open a Visual Studio Code terminal, cd to the environments folder and create a new environment file:
```bash
> cd frontend/src/environments
> cp environment.ts environment.loc.ts
```

#### 3. Edit the environment.loc.ts file in VSCode:
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

#### 4. Return to frontend folder and run the local server in the VSCode terminal:
```bash
> cd frontend
> npm run local
```
The `npm run local` command launches the server, watches your files, and rebuilds the app as you make changes to those files.

After running the local server, you can open your project by visiting http://localhost:4200/.

#### 5. For building your app and placing it into the output path (web/ by default):
```bash
npm run build
```
