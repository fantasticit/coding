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
define("./service-worker.js",['./workbox-0c7afc7d'], function (workbox) { 'use strict';

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

  workbox.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */

  workbox.precacheAndRoute([{
    "url": "0.chunk.bc643ae.js",
    "revision": "19100b2dedc068a8f68a31afd28e5b41"
  }, {
    "url": "0.chunk.bc643ae.js.LICENSE.txt",
    "revision": "29c5753de94a4a2d993c390444e9ea12"
  }, {
    "url": "1.2a6efad553e913841edc.css",
    "revision": "a83c8130b03a26ed294a2f9508419706"
  }, {
    "url": "1.chunk.bc643ae.js",
    "revision": "1bd796683e7d08ee5e1f75f62647e536"
  }, {
    "url": "1.chunk.bc643ae.js.LICENSE.txt",
    "revision": "f60b6259dfbf65009a9658712a83bdcf"
  }, {
    "url": "10.chunk.bc643ae.js",
    "revision": "5dac3a075e0b77b6db27c1e5809123f2"
  }, {
    "url": "10.chunk.bc643ae.js.LICENSE.txt",
    "revision": "5a043156b28f902ee11d4a7c85b26721"
  }, {
    "url": "11.chunk.bc643ae.js",
    "revision": "09b172a41689a9c8e95bcb3b7515aa2f"
  }, {
    "url": "11.chunk.bc643ae.js.LICENSE.txt",
    "revision": "feaca3f8462dc36725030cf603bdb648"
  }, {
    "url": "12.chunk.bc643ae.js",
    "revision": "8bfbcd7132e8faec26770579e416c56f"
  }, {
    "url": "12.chunk.bc643ae.js.LICENSE.txt",
    "revision": "96d07beda5d75924f5a931fc4c774981"
  }, {
    "url": "13.chunk.bc643ae.js",
    "revision": "b79fd6d3fbc647776d70feff7ac7f8b9"
  }, {
    "url": "13.chunk.bc643ae.js.LICENSE.txt",
    "revision": "4639f74b097068c7f13f947cdcf0d93e"
  }, {
    "url": "14.chunk.bc643ae.js",
    "revision": "e1c929f8ad11d52543a8ff111d3afccb"
  }, {
    "url": "14.chunk.bc643ae.js.LICENSE.txt",
    "revision": "1d51a7fff4f1f9cd74ff5a1c0103d4da"
  }, {
    "url": "15.chunk.bc643ae.js",
    "revision": "0060cc9679c8a75f629c4e6b6f3bc656"
  }, {
    "url": "15.chunk.bc643ae.js.LICENSE.txt",
    "revision": "7e1be9d7e3f10899c735d45e851738db"
  }, {
    "url": "16.chunk.bc643ae.js",
    "revision": "c400177183c5de57aa0d62e0ac11937c"
  }, {
    "url": "16.chunk.bc643ae.js.LICENSE.txt",
    "revision": "97394ab7025fbaf3a67da46eee12e351"
  }, {
    "url": "17.chunk.bc643ae.js",
    "revision": "659fe7841e90f6a4fb74198c4c86229b"
  }, {
    "url": "17.chunk.bc643ae.js.LICENSE.txt",
    "revision": "e31d4aee126a3c550530886c7ae6a3c9"
  }, {
    "url": "18.chunk.bc643ae.js",
    "revision": "f4104849b061d5fc8a1a4657d265c29f"
  }, {
    "url": "18.chunk.bc643ae.js.LICENSE.txt",
    "revision": "175bfeba2c1760d2e147bdf05f68c196"
  }, {
    "url": "19.chunk.bc643ae.js",
    "revision": "45f7c09ea9afd3d9d560242ede0a02dd"
  }, {
    "url": "19.chunk.bc643ae.js.LICENSE.txt",
    "revision": "6c7b1e86db688d37143243d839e417f2"
  }, {
    "url": "2.chunk.bc643ae.js",
    "revision": "a093ed5f3d57e6ef2674ee52b97ccd84"
  }, {
    "url": "2.chunk.bc643ae.js.LICENSE.txt",
    "revision": "41e9f2e7120cbeec03e554265428e21d"
  }, {
    "url": "20.chunk.bc643ae.js",
    "revision": "1675a59773167b1f8b447e1b0835b71b"
  }, {
    "url": "20.chunk.bc643ae.js.LICENSE.txt",
    "revision": "b39caaf80864e581301d65b72dc672e9"
  }, {
    "url": "21.chunk.bc643ae.js",
    "revision": "2fcb8a36f5bf2a0f74ca7bb691245c10"
  }, {
    "url": "21.chunk.bc643ae.js.LICENSE.txt",
    "revision": "13b94015d04852b872dfb58532ecd96c"
  }, {
    "url": "22.chunk.bc643ae.js",
    "revision": "c53f3bbaba90e6fd7c6a2a37e62e5de5"
  }, {
    "url": "22.chunk.bc643ae.js.LICENSE.txt",
    "revision": "a5f73056428eb9ff5efa58fda6697d4d"
  }, {
    "url": "23.chunk.bc643ae.js",
    "revision": "ba069e5a212090acf007d826002bd320"
  }, {
    "url": "23.chunk.bc643ae.js.LICENSE.txt",
    "revision": "6a6e09fec4cef03c683a58d4d08116fc"
  }, {
    "url": "24.chunk.bc643ae.js",
    "revision": "81dd0b775816450a372c92042ff48502"
  }, {
    "url": "24.chunk.bc643ae.js.LICENSE.txt",
    "revision": "b7231e36cf473a5801ec5a0ef228ed2e"
  }, {
    "url": "25.chunk.bc643ae.js",
    "revision": "941cc22ea99b037c04b395386ab560d0"
  }, {
    "url": "25.chunk.bc643ae.js.LICENSE.txt",
    "revision": "d2abde1fe8c4ce472559208aedb65599"
  }, {
    "url": "26.chunk.bc643ae.js",
    "revision": "11d7ed4c82866aada3fb962522ac3efa"
  }, {
    "url": "26.chunk.bc643ae.js.LICENSE.txt",
    "revision": "eb70d5bc2dfc705aa1096c260a57f703"
  }, {
    "url": "27.chunk.bc643ae.js",
    "revision": "489d19aa31dd43589e2bf73047e9d658"
  }, {
    "url": "27.chunk.bc643ae.js.LICENSE.txt",
    "revision": "304d3454a969595b0f062cf5efd056f6"
  }, {
    "url": "28.chunk.bc643ae.js",
    "revision": "6965ed7b08e7b543b8acbcce24d2d75f"
  }, {
    "url": "28.chunk.bc643ae.js.LICENSE.txt",
    "revision": "8152c1e2189b17fe69ec41f2aaa121e6"
  }, {
    "url": "29.chunk.bc643ae.js",
    "revision": "05ada04f19fdd774d50200f3b5b31a9c"
  }, {
    "url": "29.chunk.bc643ae.js.LICENSE.txt",
    "revision": "320971f04ab85810c5d52eefea0c9b59"
  }, {
    "url": "3.chunk.bc643ae.js",
    "revision": "3c9ace7aa96c467a765eabaea51d72c8"
  }, {
    "url": "3.chunk.bc643ae.js.LICENSE.txt",
    "revision": "046c218dddc75cbb1252aea5e1bb3954"
  }, {
    "url": "30.chunk.bc643ae.js",
    "revision": "b0920883392d02789f54ad757669e0f3"
  }, {
    "url": "30.chunk.bc643ae.js.LICENSE.txt",
    "revision": "6c14f5ff8efa48335a84d2a605a65471"
  }, {
    "url": "31.chunk.bc643ae.js",
    "revision": "1bbdd55d1dc63e18637af16ea6f42a43"
  }, {
    "url": "31.chunk.bc643ae.js.LICENSE.txt",
    "revision": "219231fef56385e50d9ba6a5a1159e61"
  }, {
    "url": "32.chunk.bc643ae.js",
    "revision": "b1ca4b964695f3c3b09e797ae3030eaa"
  }, {
    "url": "32.chunk.bc643ae.js.LICENSE.txt",
    "revision": "bfc13791e092a271a2842291c9d85868"
  }, {
    "url": "33.chunk.bc643ae.js",
    "revision": "277295bf2c1d5177569ebf50e3ec7973"
  }, {
    "url": "33.chunk.bc643ae.js.LICENSE.txt",
    "revision": "1fa40a51d77a9fed7dabbbc976d4b894"
  }, {
    "url": "34.chunk.bc643ae.js",
    "revision": "d9a0176439ae3a125117eb3228749a4f"
  }, {
    "url": "34.chunk.bc643ae.js.LICENSE.txt",
    "revision": "9d8ee5a35ce141cb621dccebbe4c0b3e"
  }, {
    "url": "35.chunk.bc643ae.js",
    "revision": "e057dc3574d20755130e3d3e8f2e4139"
  }, {
    "url": "35.chunk.bc643ae.js.LICENSE.txt",
    "revision": "55490747aab4458addb09255007e5acc"
  }, {
    "url": "36.chunk.bc643ae.js",
    "revision": "20ef1531ed9af708b88f211507a2f026"
  }, {
    "url": "36.chunk.bc643ae.js.LICENSE.txt",
    "revision": "2b3122f63f58a31d601bcd2fe4f05fb8"
  }, {
    "url": "37.chunk.bc643ae.js",
    "revision": "90af909ed16b2bd7138cdc190f92f121"
  }, {
    "url": "37.chunk.bc643ae.js.LICENSE.txt",
    "revision": "dca35adc2644d1b37fc0ad99145b73de"
  }, {
    "url": "38.chunk.bc643ae.js",
    "revision": "a331f5c0132d1e19e85ee1e39ba8986a"
  }, {
    "url": "38.chunk.bc643ae.js.LICENSE.txt",
    "revision": "03d45984b2d1a7bfd6212bc722036525"
  }, {
    "url": "39.chunk.bc643ae.js",
    "revision": "2b3f9802b3763df070ca8d5f87fcd820"
  }, {
    "url": "39.chunk.bc643ae.js.LICENSE.txt",
    "revision": "e159ad4c996758203dafb9647c5b2fa3"
  }, {
    "url": "4.chunk.bc643ae.js",
    "revision": "652f8b5a78db1b817d57f3cf5208393f"
  }, {
    "url": "4.chunk.bc643ae.js.LICENSE.txt",
    "revision": "f1114257725d3d1fd60543d753f07490"
  }, {
    "url": "40.chunk.bc643ae.js",
    "revision": "cb5f7ba958e5f5744d72a0854fffc549"
  }, {
    "url": "40.chunk.bc643ae.js.LICENSE.txt",
    "revision": "a8dccc88c4792242badc632c35866555"
  }, {
    "url": "41.chunk.bc643ae.js",
    "revision": "10670bf11721e97e0be09ea15ff4ab6b"
  }, {
    "url": "41.chunk.bc643ae.js.LICENSE.txt",
    "revision": "4e185b696e1a546c525b8a707d8fd6fc"
  }, {
    "url": "42.chunk.bc643ae.js",
    "revision": "20905dca0b59a20efd85c6d5045dca18"
  }, {
    "url": "42.chunk.bc643ae.js.LICENSE.txt",
    "revision": "fa4791d2daca05056fd399522daca3e8"
  }, {
    "url": "43.chunk.bc643ae.js",
    "revision": "f3bd204138641cd5927dca2a9f988dea"
  }, {
    "url": "43.chunk.bc643ae.js.LICENSE.txt",
    "revision": "537c2475659226197d5003fdc411bb2b"
  }, {
    "url": "44.chunk.bc643ae.js",
    "revision": "c970acabd46a755e99d35ea63fd59623"
  }, {
    "url": "44.chunk.bc643ae.js.LICENSE.txt",
    "revision": "bf136738103ed49284358dfc75fa3e52"
  }, {
    "url": "45.chunk.bc643ae.js",
    "revision": "58d4c98696a16d91b799067245773367"
  }, {
    "url": "45.chunk.bc643ae.js.LICENSE.txt",
    "revision": "20c1a74fc2a8cf207dcc940427a6a7ee"
  }, {
    "url": "46.chunk.bc643ae.js",
    "revision": "360bf5e2d170c5db940a03d66a10b3f5"
  }, {
    "url": "46.chunk.bc643ae.js.LICENSE.txt",
    "revision": "5e7e7d794c4417cddfd1aba66b5dd52b"
  }, {
    "url": "47.chunk.bc643ae.js",
    "revision": "b26b6d385b477e5361dc0de835529047"
  }, {
    "url": "47.chunk.bc643ae.js.LICENSE.txt",
    "revision": "e83867d8196d4b0264a677c7543c7544"
  }, {
    "url": "48.chunk.bc643ae.js",
    "revision": "42027a5ee549cc344452c2c78aca5988"
  }, {
    "url": "48.chunk.bc643ae.js.LICENSE.txt",
    "revision": "3819cc73191bb85a7e89384ffbcb99ae"
  }, {
    "url": "49.chunk.bc643ae.js",
    "revision": "8638679ff445ada18685cdc1e28aaf45"
  }, {
    "url": "49.chunk.bc643ae.js.LICENSE.txt",
    "revision": "c33b266f5ba6ef13eb1fd73146e92a91"
  }, {
    "url": "5.chunk.bc643ae.js",
    "revision": "ea2e9ce04a5ec038429911f4e11cf62f"
  }, {
    "url": "5.chunk.bc643ae.js.LICENSE.txt",
    "revision": "823e69f48561b0888f92082b4f14678f"
  }, {
    "url": "50.chunk.bc643ae.js",
    "revision": "2e0119139f71064359efdcbd1e82ce3e"
  }, {
    "url": "50.chunk.bc643ae.js.LICENSE.txt",
    "revision": "97c9e9096047198d872e191048260c2c"
  }, {
    "url": "51.chunk.bc643ae.js",
    "revision": "e6c5a7252206acffefdb21b306ae93ff"
  }, {
    "url": "51.chunk.bc643ae.js.LICENSE.txt",
    "revision": "6c6fce3858bd2defc05be4c0cf9d6dc2"
  }, {
    "url": "52.chunk.bc643ae.js",
    "revision": "6242924c263e467fd9eb390c071f8e6c"
  }, {
    "url": "52.chunk.bc643ae.js.LICENSE.txt",
    "revision": "e302fb5732da90786c91a1048c747d12"
  }, {
    "url": "53.chunk.bc643ae.js",
    "revision": "ac9ad2af9da749a089f8c5cf10c7cb98"
  }, {
    "url": "53.chunk.bc643ae.js.LICENSE.txt",
    "revision": "5a6540ad04f821844cab2ca97808577f"
  }, {
    "url": "6.chunk.bc643ae.js",
    "revision": "1e57492d6794ac351d275848a07cad32"
  }, {
    "url": "6.chunk.bc643ae.js.LICENSE.txt",
    "revision": "0f1178b9d2720de0f96203b6ebb8590d"
  }, {
    "url": "7.chunk.bc643ae.js",
    "revision": "044b2d6a90dad742a46b6ca651df8c5a"
  }, {
    "url": "7.chunk.bc643ae.js.LICENSE.txt",
    "revision": "5784eb03a1124679789612f54008f4c7"
  }, {
    "url": "8.chunk.bc643ae.js",
    "revision": "372e83be4d3be74362c99f824926d1c3"
  }, {
    "url": "8.chunk.bc643ae.js.LICENSE.txt",
    "revision": "d290e28b48fa42b28ae0a350717f0a96"
  }, {
    "url": "9.chunk.bc643ae.js",
    "revision": "646054d4437c00ef908dd6e7af8f70d7"
  }, {
    "url": "9.chunk.bc643ae.js.LICENSE.txt",
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
    "url": "main.67dac35258b22e8795cd.css",
    "revision": "cd428cc18e037f39a5eb12454e98ebf4"
  }, {
    "url": "main.bc643aeab47db5d0ae44.js",
    "revision": "49fc70e4e1e6ec9bef2b002fb3d40bbd"
  }, {
    "url": "main.bc643aeab47db5d0ae44.js.LICENSE.txt",
    "revision": "4462aaeaf8e5b6347f45db0e3e53716d"
  }], {});

});
//# sourceMappingURL=service-worker.js.map
