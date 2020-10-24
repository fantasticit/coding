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
    "url": "0.f5d710a.js",
    "revision": "e3c0923c08951782b6286c6f55792086"
  }, {
    "url": "0.f5d710a.js.LICENSE.txt",
    "revision": "29c5753de94a4a2d993c390444e9ea12"
  }, {
    "url": "1.2a6efad553e913841edc.css",
    "revision": "a83c8130b03a26ed294a2f9508419706"
  }, {
    "url": "1.f5d710a.js",
    "revision": "7ba7ab01a5b44831b915e711327d2826"
  }, {
    "url": "1.f5d710a.js.LICENSE.txt",
    "revision": "f60b6259dfbf65009a9658712a83bdcf"
  }, {
    "url": "10.f5d710a.js",
    "revision": "dbceced85d670d0de948457660a1499e"
  }, {
    "url": "10.f5d710a.js.LICENSE.txt",
    "revision": "5a043156b28f902ee11d4a7c85b26721"
  }, {
    "url": "11.f5d710a.js",
    "revision": "5e02680c50c0a843eb6c123e3f44da8c"
  }, {
    "url": "11.f5d710a.js.LICENSE.txt",
    "revision": "feaca3f8462dc36725030cf603bdb648"
  }, {
    "url": "12.f5d710a.js",
    "revision": "d644ddfdf511491e0df247e23f6b6f6a"
  }, {
    "url": "12.f5d710a.js.LICENSE.txt",
    "revision": "96d07beda5d75924f5a931fc4c774981"
  }, {
    "url": "13.f5d710a.js",
    "revision": "740a9b87900e68c90efd1c5cc87fb853"
  }, {
    "url": "13.f5d710a.js.LICENSE.txt",
    "revision": "4639f74b097068c7f13f947cdcf0d93e"
  }, {
    "url": "14.f5d710a.js",
    "revision": "d6c6bceace488f35247c49650459564e"
  }, {
    "url": "14.f5d710a.js.LICENSE.txt",
    "revision": "1d51a7fff4f1f9cd74ff5a1c0103d4da"
  }, {
    "url": "15.f5d710a.js",
    "revision": "ee5000b9f7888b77f1d24e1a04a344ef"
  }, {
    "url": "15.f5d710a.js.LICENSE.txt",
    "revision": "7e1be9d7e3f10899c735d45e851738db"
  }, {
    "url": "16.f5d710a.js",
    "revision": "889bdac14654284e0a71daf22dc15dc9"
  }, {
    "url": "16.f5d710a.js.LICENSE.txt",
    "revision": "97394ab7025fbaf3a67da46eee12e351"
  }, {
    "url": "17.f5d710a.js",
    "revision": "54f8065bb942d034eb8a5425d9e5e424"
  }, {
    "url": "17.f5d710a.js.LICENSE.txt",
    "revision": "e31d4aee126a3c550530886c7ae6a3c9"
  }, {
    "url": "18.f5d710a.js",
    "revision": "3ead8681116d9afd5153ca3ee4721e2b"
  }, {
    "url": "18.f5d710a.js.LICENSE.txt",
    "revision": "175bfeba2c1760d2e147bdf05f68c196"
  }, {
    "url": "19.f5d710a.js",
    "revision": "a77f9d2e58d7ed725ad37e0c7a5824ba"
  }, {
    "url": "19.f5d710a.js.LICENSE.txt",
    "revision": "6c7b1e86db688d37143243d839e417f2"
  }, {
    "url": "2.f5d710a.js",
    "revision": "70bf8438a6b02ba231c50b3754950bfb"
  }, {
    "url": "2.f5d710a.js.LICENSE.txt",
    "revision": "41e9f2e7120cbeec03e554265428e21d"
  }, {
    "url": "20.f5d710a.js",
    "revision": "d1901f28c3610b9af97daa11406afc8f"
  }, {
    "url": "20.f5d710a.js.LICENSE.txt",
    "revision": "b39caaf80864e581301d65b72dc672e9"
  }, {
    "url": "21.f5d710a.js",
    "revision": "8c09c3686fc49e84157187249615359f"
  }, {
    "url": "21.f5d710a.js.LICENSE.txt",
    "revision": "13b94015d04852b872dfb58532ecd96c"
  }, {
    "url": "22.f5d710a.js",
    "revision": "9696b0729b1ae31c0f5a67bd4adbcaa9"
  }, {
    "url": "22.f5d710a.js.LICENSE.txt",
    "revision": "a5f73056428eb9ff5efa58fda6697d4d"
  }, {
    "url": "23.f5d710a.js",
    "revision": "711324e6c60bc2674ba0b44b0cf0a72b"
  }, {
    "url": "23.f5d710a.js.LICENSE.txt",
    "revision": "6a6e09fec4cef03c683a58d4d08116fc"
  }, {
    "url": "24.f5d710a.js",
    "revision": "1b1eed76f3f2203991aee53fd653af24"
  }, {
    "url": "24.f5d710a.js.LICENSE.txt",
    "revision": "b7231e36cf473a5801ec5a0ef228ed2e"
  }, {
    "url": "25.f5d710a.js",
    "revision": "9fd2c3343e1dc645508b178d217c12f0"
  }, {
    "url": "25.f5d710a.js.LICENSE.txt",
    "revision": "d2abde1fe8c4ce472559208aedb65599"
  }, {
    "url": "26.f5d710a.js",
    "revision": "ae765693da8866e8148cc34e1fb4a77f"
  }, {
    "url": "26.f5d710a.js.LICENSE.txt",
    "revision": "eb70d5bc2dfc705aa1096c260a57f703"
  }, {
    "url": "27.f5d710a.js",
    "revision": "ccf8db383e71af3c701f29defdb1b8c4"
  }, {
    "url": "27.f5d710a.js.LICENSE.txt",
    "revision": "304d3454a969595b0f062cf5efd056f6"
  }, {
    "url": "28.f5d710a.js",
    "revision": "cde06e99f175acbd898f1cfc12d635e9"
  }, {
    "url": "28.f5d710a.js.LICENSE.txt",
    "revision": "8152c1e2189b17fe69ec41f2aaa121e6"
  }, {
    "url": "29.f5d710a.js",
    "revision": "fbea1b741c13405c19b83bce6d882bd4"
  }, {
    "url": "29.f5d710a.js.LICENSE.txt",
    "revision": "320971f04ab85810c5d52eefea0c9b59"
  }, {
    "url": "3.f5d710a.js",
    "revision": "50ac4edc41227d899cdc5fac30556acf"
  }, {
    "url": "3.f5d710a.js.LICENSE.txt",
    "revision": "046c218dddc75cbb1252aea5e1bb3954"
  }, {
    "url": "30.f5d710a.js",
    "revision": "70a73801da0de1995029d2e055ee592f"
  }, {
    "url": "30.f5d710a.js.LICENSE.txt",
    "revision": "6c14f5ff8efa48335a84d2a605a65471"
  }, {
    "url": "31.f5d710a.js",
    "revision": "9644f8d407cc6cca6994e7259ae1d966"
  }, {
    "url": "31.f5d710a.js.LICENSE.txt",
    "revision": "219231fef56385e50d9ba6a5a1159e61"
  }, {
    "url": "32.f5d710a.js",
    "revision": "3824e1b9cc42b62836a7e14d4eb051de"
  }, {
    "url": "32.f5d710a.js.LICENSE.txt",
    "revision": "bfc13791e092a271a2842291c9d85868"
  }, {
    "url": "33.f5d710a.js",
    "revision": "de84096102657a2773a33aaaeddf56a7"
  }, {
    "url": "33.f5d710a.js.LICENSE.txt",
    "revision": "1fa40a51d77a9fed7dabbbc976d4b894"
  }, {
    "url": "34.f5d710a.js",
    "revision": "602cd4b626e750c472bfe88980ea315e"
  }, {
    "url": "34.f5d710a.js.LICENSE.txt",
    "revision": "9d8ee5a35ce141cb621dccebbe4c0b3e"
  }, {
    "url": "35.f5d710a.js",
    "revision": "831fb64762e74408e48747fa9c6ad466"
  }, {
    "url": "35.f5d710a.js.LICENSE.txt",
    "revision": "55490747aab4458addb09255007e5acc"
  }, {
    "url": "36.f5d710a.js",
    "revision": "e2dab2e48fc13e0ed9835830a92512e7"
  }, {
    "url": "36.f5d710a.js.LICENSE.txt",
    "revision": "2b3122f63f58a31d601bcd2fe4f05fb8"
  }, {
    "url": "37.f5d710a.js",
    "revision": "beff09617ef81b21789c5c47216b09c9"
  }, {
    "url": "37.f5d710a.js.LICENSE.txt",
    "revision": "dca35adc2644d1b37fc0ad99145b73de"
  }, {
    "url": "38.f5d710a.js",
    "revision": "2e837cfe66eceb4153b3b336ad690de6"
  }, {
    "url": "38.f5d710a.js.LICENSE.txt",
    "revision": "03d45984b2d1a7bfd6212bc722036525"
  }, {
    "url": "39.f5d710a.js",
    "revision": "07959a2a1b918680b55de0dffa292c16"
  }, {
    "url": "39.f5d710a.js.LICENSE.txt",
    "revision": "e159ad4c996758203dafb9647c5b2fa3"
  }, {
    "url": "4.f5d710a.js",
    "revision": "07d7c7800266d024d77deac88021a01a"
  }, {
    "url": "4.f5d710a.js.LICENSE.txt",
    "revision": "f1114257725d3d1fd60543d753f07490"
  }, {
    "url": "40.f5d710a.js",
    "revision": "dc8e8d5ee285c9de5e49ab28198ae28e"
  }, {
    "url": "40.f5d710a.js.LICENSE.txt",
    "revision": "a8dccc88c4792242badc632c35866555"
  }, {
    "url": "41.f5d710a.js",
    "revision": "a66470749d5c57e92909cb2cbc58a943"
  }, {
    "url": "41.f5d710a.js.LICENSE.txt",
    "revision": "4e185b696e1a546c525b8a707d8fd6fc"
  }, {
    "url": "42.f5d710a.js",
    "revision": "fd735e89d8a23d17aaddd5236e0dde58"
  }, {
    "url": "42.f5d710a.js.LICENSE.txt",
    "revision": "fa4791d2daca05056fd399522daca3e8"
  }, {
    "url": "43.f5d710a.js",
    "revision": "4bb1075dbb5ee9c772603ecda280a6d0"
  }, {
    "url": "43.f5d710a.js.LICENSE.txt",
    "revision": "537c2475659226197d5003fdc411bb2b"
  }, {
    "url": "44.f5d710a.js",
    "revision": "df5cd2423d72a8b7b8b1603e55087bc8"
  }, {
    "url": "44.f5d710a.js.LICENSE.txt",
    "revision": "bf136738103ed49284358dfc75fa3e52"
  }, {
    "url": "45.f5d710a.js",
    "revision": "b074a1e1b2a7fe38ecc2865a029169d5"
  }, {
    "url": "45.f5d710a.js.LICENSE.txt",
    "revision": "20c1a74fc2a8cf207dcc940427a6a7ee"
  }, {
    "url": "46.f5d710a.js",
    "revision": "cf1b6205c1706420a5c23a43bb152b34"
  }, {
    "url": "46.f5d710a.js.LICENSE.txt",
    "revision": "5e7e7d794c4417cddfd1aba66b5dd52b"
  }, {
    "url": "47.f5d710a.js",
    "revision": "457babc70d826165b20f261acaaa989c"
  }, {
    "url": "47.f5d710a.js.LICENSE.txt",
    "revision": "e83867d8196d4b0264a677c7543c7544"
  }, {
    "url": "48.f5d710a.js",
    "revision": "93bf1dc5fde31635106df317000aabb8"
  }, {
    "url": "48.f5d710a.js.LICENSE.txt",
    "revision": "3819cc73191bb85a7e89384ffbcb99ae"
  }, {
    "url": "49.f5d710a.js",
    "revision": "c09159a0ffe04ea29fba4b647f96f114"
  }, {
    "url": "49.f5d710a.js.LICENSE.txt",
    "revision": "c33b266f5ba6ef13eb1fd73146e92a91"
  }, {
    "url": "5.f5d710a.js",
    "revision": "a1515ab47fd9722f2ad13d2a0c40f4d8"
  }, {
    "url": "5.f5d710a.js.LICENSE.txt",
    "revision": "823e69f48561b0888f92082b4f14678f"
  }, {
    "url": "50.f5d710a.js",
    "revision": "e1c7840682177ec8a724c0a74d09122b"
  }, {
    "url": "50.f5d710a.js.LICENSE.txt",
    "revision": "97c9e9096047198d872e191048260c2c"
  }, {
    "url": "51.f5d710a.js",
    "revision": "4101756a405d2d804e2e0837c4d41f13"
  }, {
    "url": "51.f5d710a.js.LICENSE.txt",
    "revision": "6c6fce3858bd2defc05be4c0cf9d6dc2"
  }, {
    "url": "52.f5d710a.js",
    "revision": "62ae106628966e84f96864f5bee47cb2"
  }, {
    "url": "52.f5d710a.js.LICENSE.txt",
    "revision": "e302fb5732da90786c91a1048c747d12"
  }, {
    "url": "53.f5d710a.js",
    "revision": "76487d83e9f2d2701ae6db5336948db8"
  }, {
    "url": "53.f5d710a.js.LICENSE.txt",
    "revision": "5a6540ad04f821844cab2ca97808577f"
  }, {
    "url": "6.f5d710a.js",
    "revision": "1449a7730b0167c11912280eb8952296"
  }, {
    "url": "6.f5d710a.js.LICENSE.txt",
    "revision": "0f1178b9d2720de0f96203b6ebb8590d"
  }, {
    "url": "7.f5d710a.js",
    "revision": "31991caa90ee0cded4ce03cbf63f25a2"
  }, {
    "url": "7.f5d710a.js.LICENSE.txt",
    "revision": "5784eb03a1124679789612f54008f4c7"
  }, {
    "url": "8.f5d710a.js",
    "revision": "17eebed1492b331d6250286d6c8665d3"
  }, {
    "url": "8.f5d710a.js.LICENSE.txt",
    "revision": "d290e28b48fa42b28ae0a350717f0a96"
  }, {
    "url": "9.f5d710a.js",
    "revision": "9b9dae11b239f02c75e19a2f84462628"
  }, {
    "url": "9.f5d710a.js.LICENSE.txt",
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
    "revision": "bdfc45a87a9d7c35c546bb073ba606c6"
  }, {
    "url": "main.814bb5c3846d7cf8ab3b.css",
    "revision": "fe11d9dadbe376990c35c131f70cbf4e"
  }, {
    "url": "main.f5d710a16e932f868810.js",
    "revision": "dcef91b6b75a3a0772ac58d3ff5b0180"
  }, {
    "url": "main.f5d710a16e932f868810.js.LICENSE.txt",
    "revision": "ca8fd44dc2be2b6b7bd551471e3d9d07"
  }], {});

});
//# sourceMappingURL=service-worker.js.map
