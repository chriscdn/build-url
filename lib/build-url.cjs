module.exports=function(e,a){var r,n=!1;try{r=new URL(e)}catch(a){if(n=!0,"string"==typeof e){var t="undefined"==typeof window?"http://example.com":window.location.origin;r=new URL(t+"/"+e.replace(/^\/|\/$/g,""))}else r="undefined"==typeof window?new URL("http://example.com"):new URL(window.location.href)}var o="string"==typeof e?a:e;if(null!=o&&o.queryParams)for(var l in o.queryParams)if(Object.prototype.hasOwnProperty.call(o.queryParams,l)){var h=o.queryParams[l];h?r.searchParams.set(l,h):r.searchParams.delete(l)}return null!=o&&o.path&&(r.pathname=o.path),null===(null==o?void 0:o.path)&&(r.pathname=""),null!=o&&o.hash&&(r.hash=o.hash),!n||null!=o&&o.returnAbsoluteUrl?r.toString():r.pathname+r.search+r.hash};
//# sourceMappingURL=build-url.cjs.map
