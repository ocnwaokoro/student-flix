npm create-next-app app-name --typescript --eslint

go to tailwind css docs for setup tutorial
use Tailwind CSS IntelliSense for autocompletion

static files must be written in the format /images/hero.png to be resolved!!

Auto Import => helpful extension !

Common error if mongoose not used correctly
```
OverwriteModelError: Cannot overwrite `User` model once compiled.
    at Mongoose.model (/Users/ocnwaokoro/Documents/GitHub/student-flix/student-flix/node_modules/mongoose/lib/index.js:565:13)
    at eval (webpack-internal:///(api)/./data/db.js:42:62)
    at (api)/./data/db.js (/Users/ocnwaokoro/Documents/GitHub/student-flix/student-flix/.next/server/pages/api/register.js:42:1)
    at __webpack_require__ (/Users/ocnwaokoro/Documents/GitHub/student-flix/student-flix/.next/server/webpack-api-runtime.js:33:42)
    at eval (webpack-internal:///(api)/./pages/api/register.ts:7:69)
    at (api)/./pages/api/register.ts (/Users/ocnwaokoro/Documents/GitHub/student-flix/student-flix/.next/server/pages/api/register.js:52:1)
    at __webpack_require__ (/Users/ocnwaokoro/Documents/GitHub/student-flix/student-flix/.next/server/webpack-api-runtime.js:33:42)
    at __webpack_exec__ (/Users/ocnwaokoro/Documents/GitHub/student-flix/student-flix/.next/server/pages/api/register.js:62:39)
    at /Users/ocnwaokoro/Documents/GitHub/student-flix/student-flix/.next/server/pages/api/register.js:63:28
    at Object.<anonymous> (/Users/ocnwaokoro/Documents/GitHub/student-flix/student-flix/.next/server/pages/api/register.js:66:3)
    at Module._compile (node:internal/modules/cjs/loader:1246:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1300:10)
    at Module.load (node:internal/modules/cjs/loader:1103:32)
    at Module._load (node:internal/modules/cjs/loader:942:12)
    at Module.require (node:internal/modules/cjs/loader:1127:19)
    at require (node:internal/modules/helpers:112:18)
    at DevServer.runApi (/Users/ocnwaokoro/Documents/GitHub/student-flix/student-flix/node_modules/next/dist/server/next-server.js:507:34)
    at DevServer.handleApiRequest (/Users/ocnwaokoro/Documents/GitHub/student-flix/student-flix/node_modules/next/dist/server/next-server.js:878:21)
    at Object.fn (/Users/ocnwaokoro/Documents/GitHub/student-flix/student-flix/node_modules/next/dist/server/next-server.js:828:46)
    at async Router.execute (/Users/ocnwaokoro/Documents/GitHub/student-flix/student-flix/node_modules/next/dist/server/router.js:243:32)
    at async DevServer.runImpl (/Users/ocnwaokoro/Documents/GitHub/student-flix/student-flix/node_modules/next/dist/server/base-server.js:432:29)
    at async DevServer.run (/Users/ocnwaokoro/Documents/GitHub/student-flix/student-flix/node_modules/next/dist/server/dev/next-dev-server.js:831:20)
    at async DevServer.handleRequestImpl (/Users/ocnwaokoro/Documents/GitHub/student-flix/student-flix/node_modules/next/dist/server/base-server.js:375:20)
    at async /Users/ocnwaokoro/Documents/GitHub/student-flix/student-flix/node_modules/next/dist/server/base-server.js:157:99
```

https://www.npmjs.com/package/node-cache

similar to argo app?

big help: https://www.youtube.com/watch?v=mqUN4N2q4qY&list=TLPQMzAwMzIwMjNb_XB_8bC8AQ&index=2&ab_channel=CodeWithAntonio


Be sure to include https:// before every link to ensure that the page is always secure