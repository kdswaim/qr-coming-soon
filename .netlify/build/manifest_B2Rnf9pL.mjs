import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import 'devalue';
import 'html-escaper';
import 'clsx';
import { d as decodeKey } from './chunks/astro/server_CHkuB5dE.mjs';
import { compile } from 'path-to-regexp';

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    const path = toPath(sanitizedParams);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"../../Users/krist/AppData/Roaming/npm/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"*{box-sizing:border-box;-moz-box-sizing:border-box;-webkit-tap-highlight-color:transparent;margin:0;padding:0}body{height:100%;width:100%;-webkit-text-size-adjust:100%;background-image:url(src/images/quality_ext1.JPG);background-position:center;background-repeat:no-repeat;background-size:cover;display:flex;flex-direction:column;justify-content:center;align-items:center}html{font-size:16px;height:100%;width:100%}#container[data-astro-cid-j7pv25f6]{display:flex;flex-direction:column;justify-content:center;align-items:center;backdrop-filter:brightness(50%);border-radius:1rem;padding:2rem}.header-subheader[data-astro-cid-j7pv25f6]{display:flex;flex-direction:column;text-align:center;gap:1rem;padding-bottom:2rem}.subhead-text[data-astro-cid-j7pv25f6]{font-size:1.5rem;font-weight:700;color:#fff;max-width:40rem;padding:0 2rem;font-family:IBM Plex Sans}.button-holder[data-astro-cid-j7pv25f6]{display:flex;gap:1rem;object-fit:contain;align-items:baseline}#btn[data-astro-cid-j7pv25f6]{box-shadow:0 4px 8px #0000001a;text-transform:uppercase}.btn-one[data-astro-cid-j7pv25f6]:hover{background-color:#0d4c79!important}.btn-two[data-astro-cid-j7pv25f6]:hover{border:5px solid #0d4c79!important;color:#0d4c79!important}.business-info[data-astro-cid-j7pv25f6]{border:1px solid white;padding:1rem 2rem;margin:0 0 2rem;display:flex;flex-direction:column;border-radius:1rem;background-color:#f5f5f5e6;box-shadow:0 4px 8px #0000001a;backdrop-filter:blur(1px)}.map-container[data-astro-cid-j7pv25f6]{width:30rem;height:20rem}#map[data-astro-cid-j7pv25f6]{border-radius:1rem;box-shadow:0 4px 8px #0000001a}h1[data-astro-cid-j7pv25f6],h2[data-astro-cid-j7pv25f6]{font-family:calistoga;color:#282828}h1[data-astro-cid-j7pv25f6]{font-size:2rem;color:#f5f5f5;text-shadow:0 5rem 5rem 0rem #000000}p[data-astro-cid-j7pv25f6]{margin:0;padding:0;line-height:1.5rem;font-family:IBM Plex Sans;color:#282828}a[data-astro-cid-j7pv25f6],a[data-astro-cid-j7pv25f6]:visited{color:#1898f3;text-decoration:none;font-weight:700}.copyright[data-astro-cid-j7pv25f6]{color:#f5f5f5;font-family:IBM plex sans;text-shadow:0 5rem 5rem 0rem #000000}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/web-projects/qr-coming-soon/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astro-page:../../Users/krist/AppData/Roaming/npm/node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-manifest":"manifest_B2Rnf9pL.mjs","/../../Users/krist/AppData/Roaming/npm/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/generic_uTSGciHZ.mjs","/src/pages/index.astro":"chunks/index_BffIbm2S.mjs","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/qr-favicon.png","/QualityRoofingTransparent - 1.png"],"buildFormat":"directory","checkOrigin":false,"rewritingEnabled":false,"experimentalEnvGetSecretEnabled":false});

export { manifest };
