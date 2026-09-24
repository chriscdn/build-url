import { buildUrl } from "../src";

// // const url = buildUrl({ path: "hello" });

// const url = buildUrl({
//   returnAbsoluteUrl: true,
//   queryParams: {
//     page: [3, 4],
//   },
//   path: "/aa//aa//",
//   // appendPath: "zzz",
//   hash: "ppp",
// });

const url = buildUrl("http://cnn.com", {
  // returnAbsoluteUrl: true,
  // queryParams: {
  // page: [3, 4],
  // },
  // path: "/aa//aa",
  // appendPath: "zzz//",
  // hash: "ppp",
});

console.log(url);
