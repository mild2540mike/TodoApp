<!-- structure  -->
C:.
|   .env
|   .eslintrc.json
|   .gitattributes
|   .gitignore
|   middleware.ts
|   next-env.d.ts
|   next.config.mjs
|   package-lock.json
|   package.json
|   postcss.config.mjs
|   README.md
|   tailwind.config.ts
|   tsconfig.json
|
+---app
|   |   action.tsx
|   |   favicon.ico
|   |   layout.tsx
|   |   page.tsx
|   |
|   +---api
|   |   \---gateway
|   |       \---todo
|   |           |   route.ts
|   |           |
|   |           +---create
|   |           |       route.ts
|   |           |
|   |           +---delete
|   |           |       route.ts
|   |           |
|   |           +---edit
|   |           |       route.ts
|   |           |
|   |           \---get
|   |                   route.ts
|   |
|   +---home
|   |   |   page.tsx
|   |   |
|   |   +---create
|   |   |       action.tsx
|   |   |       page.tsx
|   |   |
|   |   \---edit
|   |           action.tsx
|   |           page.tsx
|   |
|   +---register
|   |       action.ts
|   |       page.tsx
|   |
|   +---store
|   \---types
|           index.ts
|
+---components
|   +---loading
|   |       loading-page.tsx
|   |       loading.tsx
|   |
|   \---modal
|           modal-alert.tsx
|
+---hooks
|   |   Providers.tsx
|   |
|   \---actions
|           create-todo.ts
|           delete-todo.ts
|           get-todo-by.ts
|           list-todo.ts
|
+---lib
|   |   api-gateway.ts
|   |   api-service-server.ts
|   |   cookie-utils.ts
|   |   encryptedCookieStorage.ts
|   |   encryptedLocalStorage.ts
|   |   encryption-utils.ts
|   |   http-response.ts
|   |
|   \---Providers.tsx
+---public
|       next.svg
|       vercel.svg
|
\---store
        encryptedCookieStorage.ts
        encryptedSessionLocalStorage.ts
        useLoginStore.ts
        useTodoStore.ts