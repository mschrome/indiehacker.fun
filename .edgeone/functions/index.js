
      let global = globalThis;
      let routeParams = {};
      let pagesFunctionResponse = null;
      async function handleRequest(context){
        const request = context.request;
        const urlInfo = new URL(request.url);

        if (urlInfo.pathname !== '/' && urlInfo.pathname.endsWith('/')) {
          urlInfo.pathname = urlInfo.pathname.slice(0, -1);
        }

        let matchedFunc = false;
        
          if(/^\/api\/(.+?)$/.test(urlInfo.pathname)) {
            routeParams = {"id":"default","mode":2,"left":"/api/"};
            matchedFunc = true;
            "use strict";
(() => {
  // functions/index.js
  function onRequest(context) {
    return new Response("Hello Edge");
  }

        pagesFunctionResponse = onRequest;
      })();
          }
        
          if('/' === urlInfo.pathname) {
            matchedFunc = true;
              "use strict";
(() => {
  // functions/index.js
  function onRequest(context) {
    return new Response("Hello Edge");
  }

        pagesFunctionResponse = onRequest;
      })();
          }
        

        const params = {};
        if (routeParams.id) {
          const value = urlInfo.pathname.replace(routeParams.left, '');
          const splitedValue = value.split('/');
          if (splitedValue.length === 1) {
            params[routeParams.id] = splitedValue[0];
          } else {
            params[routeParams.id] = splitedValue;
          }
        }
        if(!matchedFunc){
          pagesFunctionResponse = function() {
            return new Response(null, {
              status: 404,
              headers: {
                "content-type": "text/html; charset=UTF-8",
                "x-edgefunctions-test": "Welcome to use Pages Functions.",
              },
            });
          }
        }
        return pagesFunctionResponse({request, params, env: {"COLORTERM":"truecolor","COMMAND_MODE":"unix2003","GIT_ASKPASS":"/Applications/Cursor.app/Contents/Resources/app/extensions/git/dist/askpass.sh","HOME":"/Users/xiaodingge","HOMEBREW_CELLAR":"/opt/homebrew/Cellar","HOMEBREW_PREFIX":"/opt/homebrew","HOMEBREW_REPOSITORY":"/opt/homebrew","INFOPATH":"/opt/homebrew/share/info:/opt/homebrew/share/info:","LANG":"zh_CN.UTF-8","LESS":"-R","LOGNAME":"xiaodingge","LSCOLORS":"Gxfxcxdxbxegedabagacad","LS_COLORS":"di=1;36:ln=35:so=32:pi=33:ex=31:bd=34;46:cd=34;43:su=30;41:sg=30;46:tw=30;42:ow=30;43","LaunchInstanceID":"D41D6BA5-280D-44B9-BB5E-F4A50A9865F0","MallocNanoZone":"0","NODE_PATH":"/Users/xiaodingge/.volta/tools/shared:","NVM_BIN":"/Users/xiaodingge/.nvm/versions/node/v16.13.2/bin","NVM_CD_FLAGS":"-q","NVM_DIR":"/Users/xiaodingge/.nvm","NVM_INC":"/Users/xiaodingge/.nvm/versions/node/v16.13.2/include/node","OLDPWD":"/Users/xiaodingge/Documents/MyWorks/indiehacker.fun","ORIGINAL_XDG_CURRENT_DESKTOP":"undefined","PAGER":"less","PATH":"/Users/xiaodingge/.volta/tools/image/npm/10.9.2/bin:/Users/xiaodingge/.volta/tools/image/node/16.20.2/bin:/Users/xiaodingge/.volta/bin:/Users/xiaodingge/.nvm/versions/node/v16.13.2/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/System/Cryptexes/App/usr/bin:/usr/bin:/bin:/usr/sbin:/sbin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/local/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/appleinternal/bin:/Library/Apple/usr/bin:/Users/xiaodingge/.volta/bin:/Users/xiaodingge/.nvm/versions/node/v16.13.2/bin","PWD":"/Users/xiaodingge/Documents/MyWorks/indiehacker.fun","SECURITYSESSIONID":"186b3","SHELL":"/bin/zsh","SHLVL":"1","SSH_AUTH_SOCK":"/private/tmp/com.apple.launchd.pJu2lNLi5l/Listeners","TERM":"xterm-256color","TERM_PROGRAM":"vscode","TERM_PROGRAM_VERSION":"0.43.6","TMPDIR":"/var/folders/p4/05t2sk9x57qbkzv4d0wt5wfm0000gn/T/","USER":"xiaodingge","USER_ZDOTDIR":"/Users/xiaodingge","VOLTA_HOME":"/Users/xiaodingge/.volta","VSCODE_GIT_ASKPASS_EXTRA_ARGS":"","VSCODE_GIT_ASKPASS_MAIN":"/Applications/Cursor.app/Contents/Resources/app/extensions/git/dist/askpass-main.js","VSCODE_GIT_ASKPASS_NODE":"/Applications/Cursor.app/Contents/Frameworks/Cursor Helper (Plugin).app/Contents/MacOS/Cursor Helper (Plugin)","VSCODE_GIT_IPC_HANDLE":"/var/folders/p4/05t2sk9x57qbkzv4d0wt5wfm0000gn/T/vscode-git-579cb95b05.sock","VSCODE_INJECTION":"1","XPC_FLAGS":"0x0","XPC_SERVICE_NAME":"0","ZDOTDIR":"/Users/xiaodingge","ZSH":"/Users/xiaodingge/.oh-my-zsh","_":"/Users/xiaodingge/.volta/bin/edgeone","_VOLTA_TOOL_RECURSION":"1","__CFBundleIdentifier":"com.todesktop.230313mzl4w4u92","__CF_USER_TEXT_ENCODING":"0x1F5:0x19:0x34","AppId":"1251178033"} });
      }addEventListener('fetch',event=>{return event.respondWith(handleRequest({request:event.request,params: {}, env: {"COLORTERM":"truecolor","COMMAND_MODE":"unix2003","GIT_ASKPASS":"/Applications/Cursor.app/Contents/Resources/app/extensions/git/dist/askpass.sh","HOME":"/Users/xiaodingge","HOMEBREW_CELLAR":"/opt/homebrew/Cellar","HOMEBREW_PREFIX":"/opt/homebrew","HOMEBREW_REPOSITORY":"/opt/homebrew","INFOPATH":"/opt/homebrew/share/info:/opt/homebrew/share/info:","LANG":"zh_CN.UTF-8","LESS":"-R","LOGNAME":"xiaodingge","LSCOLORS":"Gxfxcxdxbxegedabagacad","LS_COLORS":"di=1;36:ln=35:so=32:pi=33:ex=31:bd=34;46:cd=34;43:su=30;41:sg=30;46:tw=30;42:ow=30;43","LaunchInstanceID":"D41D6BA5-280D-44B9-BB5E-F4A50A9865F0","MallocNanoZone":"0","NODE_PATH":"/Users/xiaodingge/.volta/tools/shared:","NVM_BIN":"/Users/xiaodingge/.nvm/versions/node/v16.13.2/bin","NVM_CD_FLAGS":"-q","NVM_DIR":"/Users/xiaodingge/.nvm","NVM_INC":"/Users/xiaodingge/.nvm/versions/node/v16.13.2/include/node","OLDPWD":"/Users/xiaodingge/Documents/MyWorks/indiehacker.fun","ORIGINAL_XDG_CURRENT_DESKTOP":"undefined","PAGER":"less","PATH":"/Users/xiaodingge/.volta/tools/image/npm/10.9.2/bin:/Users/xiaodingge/.volta/tools/image/node/16.20.2/bin:/Users/xiaodingge/.volta/bin:/Users/xiaodingge/.nvm/versions/node/v16.13.2/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/System/Cryptexes/App/usr/bin:/usr/bin:/bin:/usr/sbin:/sbin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/local/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/appleinternal/bin:/Library/Apple/usr/bin:/Users/xiaodingge/.volta/bin:/Users/xiaodingge/.nvm/versions/node/v16.13.2/bin","PWD":"/Users/xiaodingge/Documents/MyWorks/indiehacker.fun","SECURITYSESSIONID":"186b3","SHELL":"/bin/zsh","SHLVL":"1","SSH_AUTH_SOCK":"/private/tmp/com.apple.launchd.pJu2lNLi5l/Listeners","TERM":"xterm-256color","TERM_PROGRAM":"vscode","TERM_PROGRAM_VERSION":"0.43.6","TMPDIR":"/var/folders/p4/05t2sk9x57qbkzv4d0wt5wfm0000gn/T/","USER":"xiaodingge","USER_ZDOTDIR":"/Users/xiaodingge","VOLTA_HOME":"/Users/xiaodingge/.volta","VSCODE_GIT_ASKPASS_EXTRA_ARGS":"","VSCODE_GIT_ASKPASS_MAIN":"/Applications/Cursor.app/Contents/Resources/app/extensions/git/dist/askpass-main.js","VSCODE_GIT_ASKPASS_NODE":"/Applications/Cursor.app/Contents/Frameworks/Cursor Helper (Plugin).app/Contents/MacOS/Cursor Helper (Plugin)","VSCODE_GIT_IPC_HANDLE":"/var/folders/p4/05t2sk9x57qbkzv4d0wt5wfm0000gn/T/vscode-git-579cb95b05.sock","VSCODE_INJECTION":"1","XPC_FLAGS":"0x0","XPC_SERVICE_NAME":"0","ZDOTDIR":"/Users/xiaodingge","ZSH":"/Users/xiaodingge/.oh-my-zsh","_":"/Users/xiaodingge/.volta/bin/edgeone","_VOLTA_TOOL_RECURSION":"1","__CFBundleIdentifier":"com.todesktop.230313mzl4w4u92","__CF_USER_TEXT_ENCODING":"0x1F5:0x19:0x34","AppId":"1251178033"} }))});