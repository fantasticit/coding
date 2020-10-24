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
    "url": "0.c9c563b.js",
    "revision": "3581858a553794d00efeed7cdd28e95f"
  }, {
    "url": "0.c9c563b.js.LICENSE.txt",
    "revision": "29c5753de94a4a2d993c390444e9ea12"
  }, {
    "url": "1.2a6efad553e913841edc.css",
    "revision": "a83c8130b03a26ed294a2f9508419706"
  }, {
    "url": "1.c9c563b.js",
    "revision": "32068516aa386a6c27505a364b08f591"
  }, {
    "url": "1.c9c563b.js.LICENSE.txt",
    "revision": "f60b6259dfbf65009a9658712a83bdcf"
  }, {
    "url": "10.c9c563b.js",
    "revision": "cc2a1b8ee919957a1c7aaa888df7c8f2"
  }, {
    "url": "10.c9c563b.js.LICENSE.txt",
    "revision": "5a043156b28f902ee11d4a7c85b26721"
  }, {
    "url": "11.c9c563b.js",
    "revision": "40646b85167a6fcc0c349bfc035aa8d1"
  }, {
    "url": "11.c9c563b.js.LICENSE.txt",
    "revision": "feaca3f8462dc36725030cf603bdb648"
  }, {
    "url": "12.c9c563b.js",
    "revision": "f21d72a140c79fee3944120422612ed3"
  }, {
    "url": "12.c9c563b.js.LICENSE.txt",
    "revision": "96d07beda5d75924f5a931fc4c774981"
  }, {
    "url": "13.c9c563b.js",
    "revision": "b20388fe6d94a47f40c0a40377edf240"
  }, {
    "url": "13.c9c563b.js.LICENSE.txt",
    "revision": "4639f74b097068c7f13f947cdcf0d93e"
  }, {
    "url": "14.c9c563b.js",
    "revision": "2f01ec05f6a123ae26760fda4b674ea7"
  }, {
    "url": "14.c9c563b.js.LICENSE.txt",
    "revision": "1d51a7fff4f1f9cd74ff5a1c0103d4da"
  }, {
    "url": "15.c9c563b.js",
    "revision": "218160e75201f44d74143da6953a952b"
  }, {
    "url": "15.c9c563b.js.LICENSE.txt",
    "revision": "7e1be9d7e3f10899c735d45e851738db"
  }, {
    "url": "16.c9c563b.js",
    "revision": "e79966c555f3e1bd13b51276e4806d13"
  }, {
    "url": "16.c9c563b.js.LICENSE.txt",
    "revision": "97394ab7025fbaf3a67da46eee12e351"
  }, {
    "url": "17.c9c563b.js",
    "revision": "72535d5d7b0bff2b22dbc227db10d136"
  }, {
    "url": "17.c9c563b.js.LICENSE.txt",
    "revision": "e31d4aee126a3c550530886c7ae6a3c9"
  }, {
    "url": "18.c9c563b.js",
    "revision": "26963acc0cf03f98e78affcf31ba7442"
  }, {
    "url": "18.c9c563b.js.LICENSE.txt",
    "revision": "175bfeba2c1760d2e147bdf05f68c196"
  }, {
    "url": "19.c9c563b.js",
    "revision": "43eee410b60e03ba6ea6304986dcfea7"
  }, {
    "url": "19.c9c563b.js.LICENSE.txt",
    "revision": "6c7b1e86db688d37143243d839e417f2"
  }, {
    "url": "2.c9c563b.js",
    "revision": "0cefc13a6e03f60f67ad43404ed18011"
  }, {
    "url": "2.c9c563b.js.LICENSE.txt",
    "revision": "41e9f2e7120cbeec03e554265428e21d"
  }, {
    "url": "20.c9c563b.js",
    "revision": "3bb8e1f9c2e2aaabdad76174b5b7bfe5"
  }, {
    "url": "20.c9c563b.js.LICENSE.txt",
    "revision": "b39caaf80864e581301d65b72dc672e9"
  }, {
    "url": "21.c9c563b.js",
    "revision": "0c4eb883f6446cd35a34b18a7a3fabc3"
  }, {
    "url": "21.c9c563b.js.LICENSE.txt",
    "revision": "13b94015d04852b872dfb58532ecd96c"
  }, {
    "url": "22.c9c563b.js",
    "revision": "f9209cad9154cfbbed0d4a88eadfb3ee"
  }, {
    "url": "22.c9c563b.js.LICENSE.txt",
    "revision": "a5f73056428eb9ff5efa58fda6697d4d"
  }, {
    "url": "23.c9c563b.js",
    "revision": "8b63ad6b5142df19c6a5aecf208f05f7"
  }, {
    "url": "23.c9c563b.js.LICENSE.txt",
    "revision": "6a6e09fec4cef03c683a58d4d08116fc"
  }, {
    "url": "24.c9c563b.js",
    "revision": "d546958db574abfa1f536eefd3c3dbeb"
  }, {
    "url": "24.c9c563b.js.LICENSE.txt",
    "revision": "b7231e36cf473a5801ec5a0ef228ed2e"
  }, {
    "url": "25.c9c563b.js",
    "revision": "afd934e6f3bdabdf4cc6616a9fcc4a80"
  }, {
    "url": "25.c9c563b.js.LICENSE.txt",
    "revision": "d2abde1fe8c4ce472559208aedb65599"
  }, {
    "url": "26.c9c563b.js",
    "revision": "c65c8c4ca69ef11736fc56cbdde8d49b"
  }, {
    "url": "26.c9c563b.js.LICENSE.txt",
    "revision": "eb70d5bc2dfc705aa1096c260a57f703"
  }, {
    "url": "27.c9c563b.js",
    "revision": "81b19bb3b11caea6e967e01fe01258b6"
  }, {
    "url": "27.c9c563b.js.LICENSE.txt",
    "revision": "304d3454a969595b0f062cf5efd056f6"
  }, {
    "url": "28.c9c563b.js",
    "revision": "adee2864d4b69b79d0dbed8ab7fd6d92"
  }, {
    "url": "28.c9c563b.js.LICENSE.txt",
    "revision": "8152c1e2189b17fe69ec41f2aaa121e6"
  }, {
    "url": "29.c9c563b.js",
    "revision": "a55eec9a21f97cba778caf21176a3b98"
  }, {
    "url": "29.c9c563b.js.LICENSE.txt",
    "revision": "320971f04ab85810c5d52eefea0c9b59"
  }, {
    "url": "3.c9c563b.js",
    "revision": "ae48db9ea525f8896c2050684d5f4414"
  }, {
    "url": "3.c9c563b.js.LICENSE.txt",
    "revision": "046c218dddc75cbb1252aea5e1bb3954"
  }, {
    "url": "30.c9c563b.js",
    "revision": "7bac5ff5db46a8f52e8eddda42fd48ba"
  }, {
    "url": "30.c9c563b.js.LICENSE.txt",
    "revision": "6c14f5ff8efa48335a84d2a605a65471"
  }, {
    "url": "31.c9c563b.js",
    "revision": "177eda81d96e649ec42cbd9ee5fed374"
  }, {
    "url": "31.c9c563b.js.LICENSE.txt",
    "revision": "219231fef56385e50d9ba6a5a1159e61"
  }, {
    "url": "32.c9c563b.js",
    "revision": "99a9c4d3c10159c3c5d63dda97aab24a"
  }, {
    "url": "32.c9c563b.js.LICENSE.txt",
    "revision": "bfc13791e092a271a2842291c9d85868"
  }, {
    "url": "33.c9c563b.js",
    "revision": "106b093688b1bf6e7e89465b0e2f3bcb"
  }, {
    "url": "33.c9c563b.js.LICENSE.txt",
    "revision": "1fa40a51d77a9fed7dabbbc976d4b894"
  }, {
    "url": "34.c9c563b.js",
    "revision": "4032e03140132003a9c6f3c5caf57cc5"
  }, {
    "url": "34.c9c563b.js.LICENSE.txt",
    "revision": "9d8ee5a35ce141cb621dccebbe4c0b3e"
  }, {
    "url": "35.c9c563b.js",
    "revision": "7d5f07e3f428f6d2f2dbff0bc5d9ba5e"
  }, {
    "url": "35.c9c563b.js.LICENSE.txt",
    "revision": "55490747aab4458addb09255007e5acc"
  }, {
    "url": "36.c9c563b.js",
    "revision": "3b93cd4faac65b7c79070c1280542d91"
  }, {
    "url": "36.c9c563b.js.LICENSE.txt",
    "revision": "2b3122f63f58a31d601bcd2fe4f05fb8"
  }, {
    "url": "37.c9c563b.js",
    "revision": "3bb552835a8b67a8f84cfdeef1dfc9bd"
  }, {
    "url": "37.c9c563b.js.LICENSE.txt",
    "revision": "dca35adc2644d1b37fc0ad99145b73de"
  }, {
    "url": "38.c9c563b.js",
    "revision": "64e62544b3b754e5ac97d4ba9831e630"
  }, {
    "url": "38.c9c563b.js.LICENSE.txt",
    "revision": "03d45984b2d1a7bfd6212bc722036525"
  }, {
    "url": "39.c9c563b.js",
    "revision": "1be719fe7a630a36c764a987fc6b94b2"
  }, {
    "url": "39.c9c563b.js.LICENSE.txt",
    "revision": "e159ad4c996758203dafb9647c5b2fa3"
  }, {
    "url": "4.c9c563b.js",
    "revision": "2926e17dfea83b060e344b42d3ea54ce"
  }, {
    "url": "4.c9c563b.js.LICENSE.txt",
    "revision": "f1114257725d3d1fd60543d753f07490"
  }, {
    "url": "40.c9c563b.js",
    "revision": "afbbe7b5b33916d5f955f71d9a4efd46"
  }, {
    "url": "40.c9c563b.js.LICENSE.txt",
    "revision": "a8dccc88c4792242badc632c35866555"
  }, {
    "url": "41.c9c563b.js",
    "revision": "91eaf27664f1c0979653b1cd55c50b2e"
  }, {
    "url": "41.c9c563b.js.LICENSE.txt",
    "revision": "4e185b696e1a546c525b8a707d8fd6fc"
  }, {
    "url": "42.c9c563b.js",
    "revision": "5337989dfdefad324807827df8a7692c"
  }, {
    "url": "42.c9c563b.js.LICENSE.txt",
    "revision": "fa4791d2daca05056fd399522daca3e8"
  }, {
    "url": "43.c9c563b.js",
    "revision": "bab7c9a8ffb8abfd6f8825dab5b481d1"
  }, {
    "url": "43.c9c563b.js.LICENSE.txt",
    "revision": "537c2475659226197d5003fdc411bb2b"
  }, {
    "url": "44.c9c563b.js",
    "revision": "48690a3127281bb169bfca642455a625"
  }, {
    "url": "44.c9c563b.js.LICENSE.txt",
    "revision": "bf136738103ed49284358dfc75fa3e52"
  }, {
    "url": "45.c9c563b.js",
    "revision": "cff6f434ec9a6cbbcf4e2cec3d8237c8"
  }, {
    "url": "45.c9c563b.js.LICENSE.txt",
    "revision": "20c1a74fc2a8cf207dcc940427a6a7ee"
  }, {
    "url": "46.c9c563b.js",
    "revision": "096e34348b36da3df1985ab38bda85fa"
  }, {
    "url": "46.c9c563b.js.LICENSE.txt",
    "revision": "5e7e7d794c4417cddfd1aba66b5dd52b"
  }, {
    "url": "47.c9c563b.js",
    "revision": "b499f45d7aa2d9949f06c6f7804d9831"
  }, {
    "url": "47.c9c563b.js.LICENSE.txt",
    "revision": "e83867d8196d4b0264a677c7543c7544"
  }, {
    "url": "48.c9c563b.js",
    "revision": "54083da2172eadea52f86d27edb2fcc1"
  }, {
    "url": "48.c9c563b.js.LICENSE.txt",
    "revision": "3819cc73191bb85a7e89384ffbcb99ae"
  }, {
    "url": "49.c9c563b.js",
    "revision": "81b90c3feacc0d327892f2ffaef0caf2"
  }, {
    "url": "49.c9c563b.js.LICENSE.txt",
    "revision": "c33b266f5ba6ef13eb1fd73146e92a91"
  }, {
    "url": "5.c9c563b.js",
    "revision": "bb0205f64dacd63ae1c1d481af18127d"
  }, {
    "url": "5.c9c563b.js.LICENSE.txt",
    "revision": "823e69f48561b0888f92082b4f14678f"
  }, {
    "url": "50.c9c563b.js",
    "revision": "03b51e50c13ed85d299bb658ef2293c4"
  }, {
    "url": "50.c9c563b.js.LICENSE.txt",
    "revision": "97c9e9096047198d872e191048260c2c"
  }, {
    "url": "51.c9c563b.js",
    "revision": "8676254e25b099e839d995b788ae5729"
  }, {
    "url": "51.c9c563b.js.LICENSE.txt",
    "revision": "6c6fce3858bd2defc05be4c0cf9d6dc2"
  }, {
    "url": "52.c9c563b.js",
    "revision": "fc0e4b3c19ea31cf71f5098b0ae748c8"
  }, {
    "url": "52.c9c563b.js.LICENSE.txt",
    "revision": "e302fb5732da90786c91a1048c747d12"
  }, {
    "url": "53.c9c563b.js",
    "revision": "48774d191c52e40d2272d65f418a5576"
  }, {
    "url": "53.c9c563b.js.LICENSE.txt",
    "revision": "5a6540ad04f821844cab2ca97808577f"
  }, {
    "url": "6.c9c563b.js",
    "revision": "6b684d2895d38be1db1e457e93b244aa"
  }, {
    "url": "6.c9c563b.js.LICENSE.txt",
    "revision": "0f1178b9d2720de0f96203b6ebb8590d"
  }, {
    "url": "7.c9c563b.js",
    "revision": "4fbc5a0b6cebaf0001f2a773ed45f4bb"
  }, {
    "url": "7.c9c563b.js.LICENSE.txt",
    "revision": "5784eb03a1124679789612f54008f4c7"
  }, {
    "url": "8.c9c563b.js",
    "revision": "a55ee5df358c8b01590a95fea0dc97de"
  }, {
    "url": "8.c9c563b.js.LICENSE.txt",
    "revision": "d290e28b48fa42b28ae0a350717f0a96"
  }, {
    "url": "9.c9c563b.js",
    "revision": "c230c35bed0c893f93567ac56f671813"
  }, {
    "url": "9.c9c563b.js.LICENSE.txt",
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
    "revision": "5e7ded4de63aa9155e5e4b686dfad70a"
  }, {
    "url": "main.5f968dc27578e387af0e.css",
    "revision": "c661db663bef6a1129a5ce30ea0fc775"
  }, {
    "url": "main.c9c563b6adf7050aed7c.js",
    "revision": "06c923242e37928bba5359f4c0f0e6c9"
  }, {
    "url": "main.c9c563b6adf7050aed7c.js.LICENSE.txt",
    "revision": "5bcfbce49d6b13c1e2ac0f09cc2f0bd2"
  }], {});

});
//# sourceMappingURL=service-worker.js.map
