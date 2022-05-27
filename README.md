# Final Year Project - Web-based video conferencing application using WebRTC

To setup the project run
`npm install` in both the webrtc-react and express-server directories.

If you're using the react dev server, you need to run it with HTTPS enabled. To do so, you'll need to generate certificates and create a `.env` file in the root directory of the project. In the `.env` file add the following lines:

```
HTTPS=true
SSL_CRT_FILE={path to crt file}
SSL_KEY_FILE={path to key file}
```

Run `npm start` in the webrtc-react directory to start the server.

To build the project run `npm run build` in the webrtc-react directory and copy the build directory to the express-server directory. (This moving of the build dir could probs be added to the npm script but I'm too lazy)

WebRTC requires HTTPS so you'll need to generate SSL certs for the express server and place them in `express-server/keys/` and then update the paths in `express-server/config.json` to point to the correct files.

You can start the express server with `node .` in the express-server directory.

There are small bugs here and there, oops :)

Log book moved to [here](https://pieloaf.github.io/WebRTC-Project-Logbook/)

