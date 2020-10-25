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
    "url": "0.7d36fcf.js",
    "revision": "8547d62b53f1b6d4170b6885e1469eaf"
  }, {
    "url": "0.7d36fcf.js.LICENSE.txt",
    "revision": "29c5753de94a4a2d993c390444e9ea12"
  }, {
    "url": "1.2a6efad553e913841edc.css",
    "revision": "a83c8130b03a26ed294a2f9508419706"
  }, {
    "url": "1.7d36fcf.js",
    "revision": "79bae766696c50323767e8dc55cf242c"
  }, {
    "url": "1.7d36fcf.js.LICENSE.txt",
    "revision": "f60b6259dfbf65009a9658712a83bdcf"
  }, {
    "url": "10.7d36fcf.js",
    "revision": "ed0c14295bdc76cb2adb62a46e1b8a4e"
  }, {
    "url": "10.7d36fcf.js.LICENSE.txt",
    "revision": "5a043156b28f902ee11d4a7c85b26721"
  }, {
    "url": "11.7d36fcf.js",
    "revision": "07aaa5e64e915210e9ef63e95e64d41e"
  }, {
    "url": "11.7d36fcf.js.LICENSE.txt",
    "revision": "feaca3f8462dc36725030cf603bdb648"
  }, {
    "url": "12.7d36fcf.js",
    "revision": "fab3aa067c953d5e665872c513242cb8"
  }, {
    "url": "12.7d36fcf.js.LICENSE.txt",
    "revision": "96d07beda5d75924f5a931fc4c774981"
  }, {
    "url": "13.7d36fcf.js",
    "revision": "cd81df8ca8177a53fd6ecad853df52a1"
  }, {
    "url": "13.7d36fcf.js.LICENSE.txt",
    "revision": "4639f74b097068c7f13f947cdcf0d93e"
  }, {
    "url": "14.7d36fcf.js",
    "revision": "71eed0a50009a430edb871a9170a4278"
  }, {
    "url": "14.7d36fcf.js.LICENSE.txt",
    "revision": "1d51a7fff4f1f9cd74ff5a1c0103d4da"
  }, {
    "url": "15.7d36fcf.js",
    "revision": "930021b092873b8445ee6af0b67e6c51"
  }, {
    "url": "15.7d36fcf.js.LICENSE.txt",
    "revision": "7e1be9d7e3f10899c735d45e851738db"
  }, {
    "url": "16.7d36fcf.js",
    "revision": "d3d8bc96bda81656af21e62c92222c94"
  }, {
    "url": "16.7d36fcf.js.LICENSE.txt",
    "revision": "97394ab7025fbaf3a67da46eee12e351"
  }, {
    "url": "17.7d36fcf.js",
    "revision": "c7ca5219d5bb2286f2d3dd97153c581a"
  }, {
    "url": "17.7d36fcf.js.LICENSE.txt",
    "revision": "e31d4aee126a3c550530886c7ae6a3c9"
  }, {
    "url": "18.7d36fcf.js",
    "revision": "c877c647f996c7fff83d0e1519eca642"
  }, {
    "url": "18.7d36fcf.js.LICENSE.txt",
    "revision": "175bfeba2c1760d2e147bdf05f68c196"
  }, {
    "url": "19.7d36fcf.js",
    "revision": "b7b077bec46a8fc9acdc04df8c7f8980"
  }, {
    "url": "19.7d36fcf.js.LICENSE.txt",
    "revision": "6c7b1e86db688d37143243d839e417f2"
  }, {
    "url": "2.7d36fcf.js",
    "revision": "a2a2b0e6c4cc1bad1b9dc59fe883dfad"
  }, {
    "url": "2.7d36fcf.js.LICENSE.txt",
    "revision": "41e9f2e7120cbeec03e554265428e21d"
  }, {
    "url": "20.7d36fcf.js",
    "revision": "ce11ff4120c4ec0ebb219abe7ff94965"
  }, {
    "url": "20.7d36fcf.js.LICENSE.txt",
    "revision": "b39caaf80864e581301d65b72dc672e9"
  }, {
    "url": "21.7d36fcf.js",
    "revision": "c38e1cd01482ec125c11bc8f1fe0a4b0"
  }, {
    "url": "21.7d36fcf.js.LICENSE.txt",
    "revision": "13b94015d04852b872dfb58532ecd96c"
  }, {
    "url": "22.7d36fcf.js",
    "revision": "d35d0037eca528e2d3310e7a545818a2"
  }, {
    "url": "22.7d36fcf.js.LICENSE.txt",
    "revision": "a5f73056428eb9ff5efa58fda6697d4d"
  }, {
    "url": "23.7d36fcf.js",
    "revision": "b16bd13697efa38dfd28b6cf6d0c4047"
  }, {
    "url": "23.7d36fcf.js.LICENSE.txt",
    "revision": "6a6e09fec4cef03c683a58d4d08116fc"
  }, {
    "url": "24.7d36fcf.js",
    "revision": "fa34585264b6931938e117c89eca3bce"
  }, {
    "url": "24.7d36fcf.js.LICENSE.txt",
    "revision": "b7231e36cf473a5801ec5a0ef228ed2e"
  }, {
    "url": "25.7d36fcf.js",
    "revision": "1367ff00479515504ea6f285668d26a6"
  }, {
    "url": "25.7d36fcf.js.LICENSE.txt",
    "revision": "d2abde1fe8c4ce472559208aedb65599"
  }, {
    "url": "26.7d36fcf.js",
    "revision": "262c6a61ceb8824e6a4c47c7466cf6c9"
  }, {
    "url": "26.7d36fcf.js.LICENSE.txt",
    "revision": "eb70d5bc2dfc705aa1096c260a57f703"
  }, {
    "url": "27.7d36fcf.js",
    "revision": "2e47051c9d8117c3d396a6daffff0877"
  }, {
    "url": "27.7d36fcf.js.LICENSE.txt",
    "revision": "304d3454a969595b0f062cf5efd056f6"
  }, {
    "url": "28.7d36fcf.js",
    "revision": "c5ee0744b27fbc21e863a6a967c70010"
  }, {
    "url": "28.7d36fcf.js.LICENSE.txt",
    "revision": "8152c1e2189b17fe69ec41f2aaa121e6"
  }, {
    "url": "29.7d36fcf.js",
    "revision": "ee58caab96dc1404609339f77472b3a8"
  }, {
    "url": "29.7d36fcf.js.LICENSE.txt",
    "revision": "320971f04ab85810c5d52eefea0c9b59"
  }, {
    "url": "3.7d36fcf.js",
    "revision": "5d51aac83cfe4249ec02f6a075ed12a8"
  }, {
    "url": "3.7d36fcf.js.LICENSE.txt",
    "revision": "046c218dddc75cbb1252aea5e1bb3954"
  }, {
    "url": "30.7d36fcf.js",
    "revision": "39b45ac1c675317c5162d0543ffcaac1"
  }, {
    "url": "30.7d36fcf.js.LICENSE.txt",
    "revision": "6c14f5ff8efa48335a84d2a605a65471"
  }, {
    "url": "31.7d36fcf.js",
    "revision": "0adcde56dbc7670c641e53fea4a175a4"
  }, {
    "url": "31.7d36fcf.js.LICENSE.txt",
    "revision": "219231fef56385e50d9ba6a5a1159e61"
  }, {
    "url": "32.7d36fcf.js",
    "revision": "ebaa81a347f08e76ced06aae8d601b16"
  }, {
    "url": "32.7d36fcf.js.LICENSE.txt",
    "revision": "bfc13791e092a271a2842291c9d85868"
  }, {
    "url": "33.7d36fcf.js",
    "revision": "b8ea9941b4ab2fbfe0cf4f1894b8779a"
  }, {
    "url": "33.7d36fcf.js.LICENSE.txt",
    "revision": "1fa40a51d77a9fed7dabbbc976d4b894"
  }, {
    "url": "34.7d36fcf.js",
    "revision": "d5a3284ccf26efb59e5c6daa57282821"
  }, {
    "url": "34.7d36fcf.js.LICENSE.txt",
    "revision": "9d8ee5a35ce141cb621dccebbe4c0b3e"
  }, {
    "url": "35.7d36fcf.js",
    "revision": "65a402a1c6b19456b3818a9e09c189bc"
  }, {
    "url": "35.7d36fcf.js.LICENSE.txt",
    "revision": "55490747aab4458addb09255007e5acc"
  }, {
    "url": "36.7d36fcf.js",
    "revision": "4de85b9ae6a9c249635ad2a544eb153a"
  }, {
    "url": "36.7d36fcf.js.LICENSE.txt",
    "revision": "2b3122f63f58a31d601bcd2fe4f05fb8"
  }, {
    "url": "37.7d36fcf.js",
    "revision": "ba003f45d79baa5f2eeef52156e65872"
  }, {
    "url": "37.7d36fcf.js.LICENSE.txt",
    "revision": "dca35adc2644d1b37fc0ad99145b73de"
  }, {
    "url": "38.7d36fcf.js",
    "revision": "f6b2bb86772a3c573a0c670ef18e1f1e"
  }, {
    "url": "38.7d36fcf.js.LICENSE.txt",
    "revision": "03d45984b2d1a7bfd6212bc722036525"
  }, {
    "url": "39.7d36fcf.js",
    "revision": "5bb95efc8c3d9ab4c2512a24aa1be92e"
  }, {
    "url": "39.7d36fcf.js.LICENSE.txt",
    "revision": "e159ad4c996758203dafb9647c5b2fa3"
  }, {
    "url": "4.7d36fcf.js",
    "revision": "9dd85f1bb1e716a5599a9e7b6136805f"
  }, {
    "url": "4.7d36fcf.js.LICENSE.txt",
    "revision": "f1114257725d3d1fd60543d753f07490"
  }, {
    "url": "40.7d36fcf.js",
    "revision": "114d2152aea77a7775738d31aca40b0e"
  }, {
    "url": "40.7d36fcf.js.LICENSE.txt",
    "revision": "a8dccc88c4792242badc632c35866555"
  }, {
    "url": "41.7d36fcf.js",
    "revision": "d01402af77ce202464c68fdf037fb736"
  }, {
    "url": "41.7d36fcf.js.LICENSE.txt",
    "revision": "4e185b696e1a546c525b8a707d8fd6fc"
  }, {
    "url": "42.7d36fcf.js",
    "revision": "5505e6e47fe167bb2300ebaa5b06d144"
  }, {
    "url": "42.7d36fcf.js.LICENSE.txt",
    "revision": "fa4791d2daca05056fd399522daca3e8"
  }, {
    "url": "43.7d36fcf.js",
    "revision": "10ce06b875d972ef96bdb2ae3b5b1a38"
  }, {
    "url": "43.7d36fcf.js.LICENSE.txt",
    "revision": "537c2475659226197d5003fdc411bb2b"
  }, {
    "url": "44.7d36fcf.js",
    "revision": "20bb26fd5d53902bca8387169ad33211"
  }, {
    "url": "44.7d36fcf.js.LICENSE.txt",
    "revision": "bf136738103ed49284358dfc75fa3e52"
  }, {
    "url": "45.7d36fcf.js",
    "revision": "dfebc411e044d05a3c2e34c1de351a41"
  }, {
    "url": "45.7d36fcf.js.LICENSE.txt",
    "revision": "20c1a74fc2a8cf207dcc940427a6a7ee"
  }, {
    "url": "46.7d36fcf.js",
    "revision": "79eaf3455ef6d52d48d7ba9793f00303"
  }, {
    "url": "46.7d36fcf.js.LICENSE.txt",
    "revision": "5e7e7d794c4417cddfd1aba66b5dd52b"
  }, {
    "url": "47.7d36fcf.js",
    "revision": "6d807132694203c8bbe3bb48402826f1"
  }, {
    "url": "47.7d36fcf.js.LICENSE.txt",
    "revision": "e83867d8196d4b0264a677c7543c7544"
  }, {
    "url": "48.7d36fcf.js",
    "revision": "230aba39ae2b5ce488218fa4b2203bc6"
  }, {
    "url": "48.7d36fcf.js.LICENSE.txt",
    "revision": "3819cc73191bb85a7e89384ffbcb99ae"
  }, {
    "url": "49.7d36fcf.js",
    "revision": "0b786a7ed83ad090884ee92aa1e63cae"
  }, {
    "url": "49.7d36fcf.js.LICENSE.txt",
    "revision": "c33b266f5ba6ef13eb1fd73146e92a91"
  }, {
    "url": "5.7d36fcf.js",
    "revision": "684e3b01861a528c91c95ab4eb471869"
  }, {
    "url": "5.7d36fcf.js.LICENSE.txt",
    "revision": "823e69f48561b0888f92082b4f14678f"
  }, {
    "url": "50.7d36fcf.js",
    "revision": "717f35c94d89407ee67e5e7e50c9b8b7"
  }, {
    "url": "50.7d36fcf.js.LICENSE.txt",
    "revision": "97c9e9096047198d872e191048260c2c"
  }, {
    "url": "51.7d36fcf.js",
    "revision": "3036bc5ecd5954ba5096b84d9a50e681"
  }, {
    "url": "51.7d36fcf.js.LICENSE.txt",
    "revision": "6c6fce3858bd2defc05be4c0cf9d6dc2"
  }, {
    "url": "52.7d36fcf.js",
    "revision": "d56b49a6bb2ce2e16ddf7f75e39477fb"
  }, {
    "url": "52.7d36fcf.js.LICENSE.txt",
    "revision": "e302fb5732da90786c91a1048c747d12"
  }, {
    "url": "53.7d36fcf.js",
    "revision": "f6fc3a916efb30000f53dcb556886b0a"
  }, {
    "url": "53.7d36fcf.js.LICENSE.txt",
    "revision": "5a6540ad04f821844cab2ca97808577f"
  }, {
    "url": "6.7d36fcf.js",
    "revision": "5f30d38775bb0204bc19ff221e5c9337"
  }, {
    "url": "6.7d36fcf.js.LICENSE.txt",
    "revision": "0f1178b9d2720de0f96203b6ebb8590d"
  }, {
    "url": "7.7d36fcf.js",
    "revision": "529ecffa330f61175dff57276555f3d6"
  }, {
    "url": "7.7d36fcf.js.LICENSE.txt",
    "revision": "5784eb03a1124679789612f54008f4c7"
  }, {
    "url": "8.7d36fcf.js",
    "revision": "8e337bbb4fad7b2633b5d20b8ce6fa41"
  }, {
    "url": "8.7d36fcf.js.LICENSE.txt",
    "revision": "d290e28b48fa42b28ae0a350717f0a96"
  }, {
    "url": "9.7d36fcf.js",
    "revision": "b57ecf91222bbcec4733f54e6eb9e684"
  }, {
    "url": "9.7d36fcf.js.LICENSE.txt",
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
    "revision": "c1c8bb2231a4adc72bca1f11e8c2b455"
  }, {
    "url": "main.67dac35258b22e8795cd.css",
    "revision": "cd428cc18e037f39a5eb12454e98ebf4"
  }, {
    "url": "main.7d36fcf80dcc5d5978e3.js",
    "revision": "40a806a9b857ea38b66c9eff546a34ac"
  }, {
    "url": "main.7d36fcf80dcc5d5978e3.js.LICENSE.txt",
    "revision": "4462aaeaf8e5b6347f45db0e3e53716d"
  }], {});

});
//# sourceMappingURL=service-worker.js.map
