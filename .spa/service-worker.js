/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  const singleRequire = name => {
    if (name !== 'require') {
      name = name + '.js';
    }
    let promise = Promise.resolve();
    if (!registry[name]) {
      
        promise = new Promise(async resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = name;
            document.head.appendChild(script);
            script.onload = resolve;
          } else {
            importScripts(name);
            resolve();
          }
        });
      
    }
    return promise.then(() => {
      if (!registry[name]) {
        throw new Error(`Module ${name} didn’t register its module`);
      }
      return registry[name];
    });
  };

  const require = (names, resolve) => {
    Promise.all(names.map(singleRequire))
      .then(modules => resolve(modules.length === 1 ? modules[0] : modules));
  };
  
  const registry = {
    require: Promise.resolve(require)
  };

  self.define = (moduleName, depsNames, factory) => {
    if (registry[moduleName]) {
      // Module is already loading or loaded.
      return;
    }
    registry[moduleName] = Promise.resolve().then(() => {
      let exports = {};
      const module = {
        uri: location.origin + moduleName.slice(1)
      };
      return Promise.all(
        depsNames.map(depName => {
          switch(depName) {
            case "exports":
              return exports;
            case "module":
              return module;
            default:
              return singleRequire(depName);
          }
        })
      ).then(deps => {
        const facValue = factory(...deps);
        if(!exports.default) {
          exports.default = facValue;
        }
        return exports;
      });
    });
  };
}
define("./service-worker.js",['./workbox-3b8b670f'], function (workbox) { 'use strict';

  /**
  * Welcome to your Workbox-powered service worker!
  *
  * You'll need to register this file in your web app.
  * See https://goo.gl/nhQhGp
  *
  * The rest of the code is auto-generated. Please don't update this file
  * directly; instead, make changes to your Workbox build configuration
  * and re-run your build process.
  * See https://goo.gl/2aRDsh
  */

  self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
  });
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */

  workbox.precacheAndRoute([{
    "url": "0.da1499d.js",
    "revision": "041186d149b3d0117ec7c2ba4ee76724"
  }, {
    "url": "0.da1499d.js.LICENSE.txt",
    "revision": "29c5753de94a4a2d993c390444e9ea12"
  }, {
    "url": "1.2a6efad553e913841edc.css",
    "revision": "a83c8130b03a26ed294a2f9508419706"
  }, {
    "url": "1.da1499d.js",
    "revision": "e30277d6ffae202a8dfce618d3b59809"
  }, {
    "url": "1.da1499d.js.LICENSE.txt",
    "revision": "f60b6259dfbf65009a9658712a83bdcf"
  }, {
    "url": "10.da1499d.js",
    "revision": "a21ed95a1f6d02abf10cc8613ee2e738"
  }, {
    "url": "10.da1499d.js.LICENSE.txt",
    "revision": "5a043156b28f902ee11d4a7c85b26721"
  }, {
    "url": "11.da1499d.js",
    "revision": "4d7ca6cfeadc2b21aefbf93526c1bc46"
  }, {
    "url": "11.da1499d.js.LICENSE.txt",
    "revision": "feaca3f8462dc36725030cf603bdb648"
  }, {
    "url": "12.da1499d.js",
    "revision": "d998fb7fd96f7e70b652a2efe1eb5e27"
  }, {
    "url": "12.da1499d.js.LICENSE.txt",
    "revision": "96d07beda5d75924f5a931fc4c774981"
  }, {
    "url": "13.da1499d.js",
    "revision": "f3727361864463ba6ccfdc0a71155280"
  }, {
    "url": "13.da1499d.js.LICENSE.txt",
    "revision": "4639f74b097068c7f13f947cdcf0d93e"
  }, {
    "url": "14.da1499d.js",
    "revision": "bf7a78dd4229213de995446775f85440"
  }, {
    "url": "14.da1499d.js.LICENSE.txt",
    "revision": "1d51a7fff4f1f9cd74ff5a1c0103d4da"
  }, {
    "url": "15.da1499d.js",
    "revision": "4c68d010d7fa67de30ec9328132053b3"
  }, {
    "url": "15.da1499d.js.LICENSE.txt",
    "revision": "7e1be9d7e3f10899c735d45e851738db"
  }, {
    "url": "16.da1499d.js",
    "revision": "15a21737910d3b85ab8c6e7c774b5df7"
  }, {
    "url": "16.da1499d.js.LICENSE.txt",
    "revision": "97394ab7025fbaf3a67da46eee12e351"
  }, {
    "url": "17.da1499d.js",
    "revision": "62ebb5e1a6db836cdc3bcbec50f7a41e"
  }, {
    "url": "17.da1499d.js.LICENSE.txt",
    "revision": "e31d4aee126a3c550530886c7ae6a3c9"
  }, {
    "url": "18.da1499d.js",
    "revision": "8bf7a421af394aed34f8329353c496a8"
  }, {
    "url": "18.da1499d.js.LICENSE.txt",
    "revision": "175bfeba2c1760d2e147bdf05f68c196"
  }, {
    "url": "19.da1499d.js",
    "revision": "ca4c0c1124720bcc36b24c689fc855ac"
  }, {
    "url": "19.da1499d.js.LICENSE.txt",
    "revision": "6c7b1e86db688d37143243d839e417f2"
  }, {
    "url": "2.da1499d.js",
    "revision": "18805ba2f7719d2eb43ab40b552866e7"
  }, {
    "url": "2.da1499d.js.LICENSE.txt",
    "revision": "41e9f2e7120cbeec03e554265428e21d"
  }, {
    "url": "20.da1499d.js",
    "revision": "b92256bec3e02e94407b91970bd78d00"
  }, {
    "url": "20.da1499d.js.LICENSE.txt",
    "revision": "b39caaf80864e581301d65b72dc672e9"
  }, {
    "url": "21.da1499d.js",
    "revision": "d174a947c1ff4c066c276a3d4873eee3"
  }, {
    "url": "21.da1499d.js.LICENSE.txt",
    "revision": "13b94015d04852b872dfb58532ecd96c"
  }, {
    "url": "22.da1499d.js",
    "revision": "34d3d0810ca18a8d1439295aff4d4100"
  }, {
    "url": "22.da1499d.js.LICENSE.txt",
    "revision": "a5f73056428eb9ff5efa58fda6697d4d"
  }, {
    "url": "23.da1499d.js",
    "revision": "53b25c973f18029323f5a53559423277"
  }, {
    "url": "23.da1499d.js.LICENSE.txt",
    "revision": "6a6e09fec4cef03c683a58d4d08116fc"
  }, {
    "url": "24.da1499d.js",
    "revision": "5f413cdbb55fb9ec8be66c2ad5a91016"
  }, {
    "url": "24.da1499d.js.LICENSE.txt",
    "revision": "b7231e36cf473a5801ec5a0ef228ed2e"
  }, {
    "url": "25.da1499d.js",
    "revision": "6407c3f39201eed2a84443495bda6ffb"
  }, {
    "url": "25.da1499d.js.LICENSE.txt",
    "revision": "d2abde1fe8c4ce472559208aedb65599"
  }, {
    "url": "26.da1499d.js",
    "revision": "4956a205483a4437a325552ce277fd4c"
  }, {
    "url": "26.da1499d.js.LICENSE.txt",
    "revision": "eb70d5bc2dfc705aa1096c260a57f703"
  }, {
    "url": "27.da1499d.js",
    "revision": "22d997cbf3fa0f3bdd26ebe41ef45499"
  }, {
    "url": "27.da1499d.js.LICENSE.txt",
    "revision": "304d3454a969595b0f062cf5efd056f6"
  }, {
    "url": "28.da1499d.js",
    "revision": "f4c6506cd9f5be554aeacbf886470481"
  }, {
    "url": "28.da1499d.js.LICENSE.txt",
    "revision": "8152c1e2189b17fe69ec41f2aaa121e6"
  }, {
    "url": "29.da1499d.js",
    "revision": "aeaae0290a4b5b966edba0c9c84d11bc"
  }, {
    "url": "29.da1499d.js.LICENSE.txt",
    "revision": "320971f04ab85810c5d52eefea0c9b59"
  }, {
    "url": "3.da1499d.js",
    "revision": "b8a85c8ebc813243c363980de3f249d9"
  }, {
    "url": "3.da1499d.js.LICENSE.txt",
    "revision": "046c218dddc75cbb1252aea5e1bb3954"
  }, {
    "url": "30.da1499d.js",
    "revision": "628e01bd03224f00dc627a89cef118d2"
  }, {
    "url": "30.da1499d.js.LICENSE.txt",
    "revision": "6c14f5ff8efa48335a84d2a605a65471"
  }, {
    "url": "31.da1499d.js",
    "revision": "2029bce92a7ed989531d77ef56e9c81c"
  }, {
    "url": "31.da1499d.js.LICENSE.txt",
    "revision": "219231fef56385e50d9ba6a5a1159e61"
  }, {
    "url": "32.da1499d.js",
    "revision": "6ab80b216b23b6a25fb80fffb8624824"
  }, {
    "url": "32.da1499d.js.LICENSE.txt",
    "revision": "bfc13791e092a271a2842291c9d85868"
  }, {
    "url": "33.da1499d.js",
    "revision": "64091853e4bf25a2fae8f91d2db012fb"
  }, {
    "url": "33.da1499d.js.LICENSE.txt",
    "revision": "1fa40a51d77a9fed7dabbbc976d4b894"
  }, {
    "url": "34.da1499d.js",
    "revision": "5e9e0fa0d72f0630e4c85919f2d79c9c"
  }, {
    "url": "34.da1499d.js.LICENSE.txt",
    "revision": "9d8ee5a35ce141cb621dccebbe4c0b3e"
  }, {
    "url": "35.da1499d.js",
    "revision": "f10764dc4fb2bd9082bc646cba25b4ef"
  }, {
    "url": "35.da1499d.js.LICENSE.txt",
    "revision": "55490747aab4458addb09255007e5acc"
  }, {
    "url": "36.da1499d.js",
    "revision": "65bfe65edbcc8e422ceee8e192e28735"
  }, {
    "url": "36.da1499d.js.LICENSE.txt",
    "revision": "2b3122f63f58a31d601bcd2fe4f05fb8"
  }, {
    "url": "37.da1499d.js",
    "revision": "ddc3b5b0640470bd0526cf0051e33532"
  }, {
    "url": "37.da1499d.js.LICENSE.txt",
    "revision": "dca35adc2644d1b37fc0ad99145b73de"
  }, {
    "url": "38.da1499d.js",
    "revision": "083fa0d5c1cba39d3f0ffd4afcc0182c"
  }, {
    "url": "38.da1499d.js.LICENSE.txt",
    "revision": "03d45984b2d1a7bfd6212bc722036525"
  }, {
    "url": "39.da1499d.js",
    "revision": "aebe1284b43d2390d9ebedd0e2b162f1"
  }, {
    "url": "39.da1499d.js.LICENSE.txt",
    "revision": "e159ad4c996758203dafb9647c5b2fa3"
  }, {
    "url": "4.da1499d.js",
    "revision": "55f0a4762ea4a9847840ed482a240852"
  }, {
    "url": "4.da1499d.js.LICENSE.txt",
    "revision": "f1114257725d3d1fd60543d753f07490"
  }, {
    "url": "40.da1499d.js",
    "revision": "ef0176cb1a91d2cb92dead155414d930"
  }, {
    "url": "40.da1499d.js.LICENSE.txt",
    "revision": "a8dccc88c4792242badc632c35866555"
  }, {
    "url": "41.da1499d.js",
    "revision": "6d6632e40a41d0179336019d53012eb8"
  }, {
    "url": "41.da1499d.js.LICENSE.txt",
    "revision": "4e185b696e1a546c525b8a707d8fd6fc"
  }, {
    "url": "42.da1499d.js",
    "revision": "0b53824d5dc5d8a526202aeb6798b355"
  }, {
    "url": "42.da1499d.js.LICENSE.txt",
    "revision": "fa4791d2daca05056fd399522daca3e8"
  }, {
    "url": "43.da1499d.js",
    "revision": "226975e6830216432027afa4f195c81e"
  }, {
    "url": "43.da1499d.js.LICENSE.txt",
    "revision": "537c2475659226197d5003fdc411bb2b"
  }, {
    "url": "44.da1499d.js",
    "revision": "c1374e82b6d623276e3031d9af948137"
  }, {
    "url": "44.da1499d.js.LICENSE.txt",
    "revision": "bf136738103ed49284358dfc75fa3e52"
  }, {
    "url": "45.da1499d.js",
    "revision": "fb41874ea604ef732545f8016f322125"
  }, {
    "url": "45.da1499d.js.LICENSE.txt",
    "revision": "20c1a74fc2a8cf207dcc940427a6a7ee"
  }, {
    "url": "46.da1499d.js",
    "revision": "f9b21637d74b31469cb2a2bd7a11dae2"
  }, {
    "url": "46.da1499d.js.LICENSE.txt",
    "revision": "5e7e7d794c4417cddfd1aba66b5dd52b"
  }, {
    "url": "47.da1499d.js",
    "revision": "e4fae1707a42b108c8f5b5c6dc2c6860"
  }, {
    "url": "47.da1499d.js.LICENSE.txt",
    "revision": "e83867d8196d4b0264a677c7543c7544"
  }, {
    "url": "48.da1499d.js",
    "revision": "93fd392f0211a503cb8e9e17455b9d4b"
  }, {
    "url": "48.da1499d.js.LICENSE.txt",
    "revision": "3819cc73191bb85a7e89384ffbcb99ae"
  }, {
    "url": "49.da1499d.js",
    "revision": "fbce57b4ce5190c214aa54e4edf4a829"
  }, {
    "url": "49.da1499d.js.LICENSE.txt",
    "revision": "c33b266f5ba6ef13eb1fd73146e92a91"
  }, {
    "url": "5.da1499d.js",
    "revision": "22ede311dd288bcec30a55ff35e64017"
  }, {
    "url": "5.da1499d.js.LICENSE.txt",
    "revision": "823e69f48561b0888f92082b4f14678f"
  }, {
    "url": "50.da1499d.js",
    "revision": "501391e613da636c2515c791f9c8d404"
  }, {
    "url": "50.da1499d.js.LICENSE.txt",
    "revision": "97c9e9096047198d872e191048260c2c"
  }, {
    "url": "51.da1499d.js",
    "revision": "82514934caefa961ec0d2a7856137b37"
  }, {
    "url": "51.da1499d.js.LICENSE.txt",
    "revision": "6c6fce3858bd2defc05be4c0cf9d6dc2"
  }, {
    "url": "52.da1499d.js",
    "revision": "35b8824fc1848716b5ae76be51bf4504"
  }, {
    "url": "52.da1499d.js.LICENSE.txt",
    "revision": "e302fb5732da90786c91a1048c747d12"
  }, {
    "url": "53.da1499d.js",
    "revision": "5f97b645ea06a1b9259289c3ae14eacf"
  }, {
    "url": "53.da1499d.js.LICENSE.txt",
    "revision": "5a6540ad04f821844cab2ca97808577f"
  }, {
    "url": "6.da1499d.js",
    "revision": "64638961a813e59d109442ad86f4b31e"
  }, {
    "url": "6.da1499d.js.LICENSE.txt",
    "revision": "0f1178b9d2720de0f96203b6ebb8590d"
  }, {
    "url": "7.da1499d.js",
    "revision": "11d454deadb7015f7e5af3b9b5789d59"
  }, {
    "url": "7.da1499d.js.LICENSE.txt",
    "revision": "5784eb03a1124679789612f54008f4c7"
  }, {
    "url": "8.da1499d.js",
    "revision": "f843b38aaf28f09cf07910d67d4be5c8"
  }, {
    "url": "8.da1499d.js.LICENSE.txt",
    "revision": "d290e28b48fa42b28ae0a350717f0a96"
  }, {
    "url": "9.da1499d.js",
    "revision": "ff91d6a9272b54dfb3634275135423eb"
  }, {
    "url": "9.da1499d.js.LICENSE.txt",
    "revision": "e58c711c0a43cf0fcf8b1391358821bb"
  }, {
    "url": "assets/ast-1.png?4cd89b98d5a10761d455da212d97cd8f",
    "revision": "4cd89b98d5a10761d455da212d97cd8f"
  }, {
    "url": "assets/dialog-2.png?43c2736b42d6010575fa8e33b959e25f",
    "revision": "43c2736b42d6010575fa8e33b959e25f"
  }, {
    "url": "assets/dialog.png?1753d8eea29d535bde4e22967cdf7f72",
    "revision": "1753d8eea29d535bde4e22967cdf7f72"
  }, {
    "url": "assets/fonts/element-icons.535877f50039c0cb49a6196a5b7517cd.woff",
    "revision": "535877f50039c0cb49a6196a5b7517cd"
  }, {
    "url": "assets/fonts/element-icons.732389ded34cb9c52dd88271f1345af9.ttf",
    "revision": "732389ded34cb9c52dd88271f1345af9"
  }, {
    "url": "assets/icon120.png",
    "revision": "1bdfbd9d66fad7aa7a164713f0507a0b"
  }, {
    "url": "assets/icon128.png",
    "revision": "59d17857617e23b70b0936116d6afd00"
  }, {
    "url": "assets/icon144.png",
    "revision": "dcb777104ca70bb2104d1b786be34a58"
  }, {
    "url": "assets/icon152.png",
    "revision": "895bdbcd5c0b7d40d0c7c4b89bb614d9"
  }, {
    "url": "assets/icon180.png",
    "revision": "4794c28c055ba85a10dc8368c4125798"
  }, {
    "url": "assets/icon192.png",
    "revision": "70744b29ddce7f83f755b234dee84ceb"
  }, {
    "url": "assets/icon384.png",
    "revision": "15cd1e4e3af35596238542f8b4c457b3"
  }, {
    "url": "assets/icon512.png",
    "revision": "27a682ae96edfba1625c8502d7fb5259"
  }, {
    "url": "assets/icon72.png",
    "revision": "ce2c26b28aad6d31d3d09b6c25a3b1a8"
  }, {
    "url": "assets/icon96.png",
    "revision": "c35e80837db2d39f0ea694ae6a5a310a"
  }, {
    "url": "assets/js-read-1.png?6e7793c22d7016f88ff7b9d83b92156e",
    "revision": "6e7793c22d7016f88ff7b9d83b92156e"
  }, {
    "url": "assets/js-read-2.png?b94dee9142c57bf9791b8be843631c36",
    "revision": "b94dee9142c57bf9791b8be843631c36"
  }, {
    "url": "assets/ramiko-1.gif?a234d78095c123fd7adef22dd2861e9e",
    "revision": "a234d78095c123fd7adef22dd2861e9e"
  }, {
    "url": "assets/ramiko-2.png?2c8334e06f5288edbce864c10b70e179",
    "revision": "2c8334e06f5288edbce864c10b70e179"
  }, {
    "url": "assets/ramiko-3.png?da8851bb818730166eae0ccf269958f8",
    "revision": "da8851bb818730166eae0ccf269958f8"
  }, {
    "url": "assets/ramiko-4.png?6762be203e3221c0c4c88533e4683bcb",
    "revision": "6762be203e3221c0c4c88533e4683bcb"
  }, {
    "url": "assets/ramiko-5.png?e1bdc2bb8ba02f3c375443427e9c7f68",
    "revision": "e1bdc2bb8ba02f3c375443427e9c7f68"
  }, {
    "url": "assets/str-unicode.png?310dad42ed1096eae3dea00c56fde0e4",
    "revision": "310dad42ed1096eae3dea00c56fde0e4"
  }, {
    "url": "index.html",
    "revision": "b0b49e4af91064db07bcf10f23b3fd24"
  }, {
    "url": "main.da1499db5b97e0a1b004.js",
    "revision": "e4ec29812d2829174f4b623ed2ae3b4f"
  }, {
    "url": "main.da1499db5b97e0a1b004.js.LICENSE.txt",
    "revision": "d235479a3c829ccc0f6665acdea61e6a"
  }, {
    "url": "main.ed71abb9e7d59063140f.css",
    "revision": "947bec571baa8b55adcef0c188d4fd71"
  }], {});

});
//# sourceMappingURL=service-worker.js.map
