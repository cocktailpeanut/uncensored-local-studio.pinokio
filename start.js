module.exports = {
  daemon: true,
  run: [
    {
      method: "shell.run",
      params: {
        env: {
          FRONTEND_PORT: "{{port}}"
        },
        path: "app",
        message: "{{platform === 'win32' ? path.join('app', 'tools', 'node-win', 'node.exe') : platform === 'darwin' ? './app/tools/node-mac/bin/node' : './app/tools/node-linux/bin/node'}} scripts/server/serve.cjs",
        on: [{
          event: "/Frontend.*:.*(http:\\/\\/\\S+)/",
          done: true
        }]
      }
    },
    {
      method: "local.set",
      params: {
        url: "{{input.event[1]}}"
      }
    }
  ]
}
