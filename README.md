# node-remote-deploy

A module to sync files to remote server while you work on device or cloud platform of your choice like Glitch.

#### Example config

```
new exports({
  connection: {
    host: "HOST",
    port: 22,
    username: "root",
    password: "PASSWORD",
    // privateKey: "/path/to/key.pem",
    // passphrase: "passphrase",
    localDir: "./",
    remoteDir: "/mnt/node/REMOTE/"
  },
  options: {
    exclude: [
      "node_modules",
      ".git",
      ".glitch-assets",
      "src/**/*.spec.ts",
      "shrinkwrap.yaml",
      ".bash_history",
      ".config",
      ".data",
      ".nano",
      ".node-gyp",
      ".ssh"
    ],
    excludeMode: 'ignore',
    forceUpload: false
  },
  uploaders: ["HOST_NAME_1", "HOST_NAME_2", function() { return __dirname === "/app"; }]
});
```
