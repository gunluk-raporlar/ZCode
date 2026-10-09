// Yerel gizlilik stub'u (fork yamasi):
// @arms/rum-electron yerine gecer; hicbir metot veri iletmez, hicbir sey baslatmaz.
"use strict";

const noOp = () => undefined;

const armsRum = {
  init: async () => undefined,
  sendCustom: noOp,
  setConfig: noOp,
  getConfig: () => ({ env: "local" }),
  setUser: noOp,
  updateSDKConfig: noOp,
};

// Stub'da tanimli olmayan her yontem cagrisi da sessizce yutulur.
module.exports = new Proxy(armsRum, {
  get(target, prop) {
    if (prop in target) return target[prop];
    return noOp;
  },
});
