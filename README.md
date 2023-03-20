# Pokemon selector

Made with vite/react. Requires a local cors proxy to use pokemon API.

# Dev

```
$ npm i
$ npm run dev
```

# Proxy

Install:

```
npm install -g local-cors-proxy
```

Run:

```
lcp --proxyUrl https://pokeapi.co
```

Use the proxy URL for api in app. This can be added as the `API_URL` in `.env`

Ex:

```
VITE_API_URL="http://localhost:8010/proxy"
```
