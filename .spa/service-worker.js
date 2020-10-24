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
    "url": "0.560dbbb.js",
    "revision": "4b9b3c2452d4b0443cd6405c3677aff9"
  }, {
    "url": "0.560dbbb.js.LICENSE.txt",
    "revision": "29c5753de94a4a2d993c390444e9ea12"
  }, {
    "url": "1.2a6efad553e913841edc.css",
    "revision": "a83c8130b03a26ed294a2f9508419706"
  }, {
    "url": "1.560dbbb.js",
    "revision": "e2a0bc6ef1bae5dac57608e013fb1f73"
  }, {
    "url": "1.560dbbb.js.LICENSE.txt",
    "revision": "f60b6259dfbf65009a9658712a83bdcf"
  }, {
    "url": "10.560dbbb.js",
    "revision": "5d6b3d146ca8e8c3ba0ae09c0c0caf7b"
  }, {
    "url": "10.560dbbb.js.LICENSE.txt",
    "revision": "5a043156b28f902ee11d4a7c85b26721"
  }, {
    "url": "11.560dbbb.js",
    "revision": "67d8d2d589659d0848453a65ff930450"
  }, {
    "url": "11.560dbbb.js.LICENSE.txt",
    "revision": "feaca3f8462dc36725030cf603bdb648"
  }, {
    "url": "12.560dbbb.js",
    "revision": "78dc444f4580fcdbf9865aace5858d26"
  }, {
    "url": "12.560dbbb.js.LICENSE.txt",
    "revision": "96d07beda5d75924f5a931fc4c774981"
  }, {
    "url": "13.560dbbb.js",
    "revision": "d0c6f7cc1505954353f781817fb42840"
  }, {
    "url": "13.560dbbb.js.LICENSE.txt",
    "revision": "4639f74b097068c7f13f947cdcf0d93e"
  }, {
    "url": "14.560dbbb.js",
    "revision": "4722dc942f724856722ada22bc53cc73"
  }, {
    "url": "14.560dbbb.js.LICENSE.txt",
    "revision": "1d51a7fff4f1f9cd74ff5a1c0103d4da"
  }, {
    "url": "15.560dbbb.js",
    "revision": "59dae2da7606256cf6ea77d4967f2092"
  }, {
    "url": "15.560dbbb.js.LICENSE.txt",
    "revision": "7e1be9d7e3f10899c735d45e851738db"
  }, {
    "url": "16.560dbbb.js",
    "revision": "1aa708399da5faee7fe57f0a12f53b05"
  }, {
    "url": "16.560dbbb.js.LICENSE.txt",
    "revision": "97394ab7025fbaf3a67da46eee12e351"
  }, {
    "url": "17.560dbbb.js",
    "revision": "a875abf7eec16d855077633203c1b736"
  }, {
    "url": "17.560dbbb.js.LICENSE.txt",
    "revision": "e31d4aee126a3c550530886c7ae6a3c9"
  }, {
    "url": "18.560dbbb.js",
    "revision": "a34a18f05fb64aa59b0d1dbae397ab69"
  }, {
    "url": "18.560dbbb.js.LICENSE.txt",
    "revision": "175bfeba2c1760d2e147bdf05f68c196"
  }, {
    "url": "19.560dbbb.js",
    "revision": "9ef4b7d6b8e78b4c73fa773ed7899e10"
  }, {
    "url": "19.560dbbb.js.LICENSE.txt",
    "revision": "6c7b1e86db688d37143243d839e417f2"
  }, {
    "url": "2.560dbbb.js",
    "revision": "991ca4967e685df52c1397e40a4c3f18"
  }, {
    "url": "2.560dbbb.js.LICENSE.txt",
    "revision": "41e9f2e7120cbeec03e554265428e21d"
  }, {
    "url": "20.560dbbb.js",
    "revision": "82c5e874a0aed87a37772927f6e34da4"
  }, {
    "url": "20.560dbbb.js.LICENSE.txt",
    "revision": "b39caaf80864e581301d65b72dc672e9"
  }, {
    "url": "21.560dbbb.js",
    "revision": "3b1f8803dbe1acc1061f58bde7934a8b"
  }, {
    "url": "21.560dbbb.js.LICENSE.txt",
    "revision": "13b94015d04852b872dfb58532ecd96c"
  }, {
    "url": "22.560dbbb.js",
    "revision": "306d4172912175906d849161d89ae12c"
  }, {
    "url": "22.560dbbb.js.LICENSE.txt",
    "revision": "a5f73056428eb9ff5efa58fda6697d4d"
  }, {
    "url": "23.560dbbb.js",
    "revision": "1f0eb638ad8d81983aebed946d745a53"
  }, {
    "url": "23.560dbbb.js.LICENSE.txt",
    "revision": "6a6e09fec4cef03c683a58d4d08116fc"
  }, {
    "url": "24.560dbbb.js",
    "revision": "4faf6e864def181e8093df594829cc25"
  }, {
    "url": "24.560dbbb.js.LICENSE.txt",
    "revision": "b7231e36cf473a5801ec5a0ef228ed2e"
  }, {
    "url": "25.560dbbb.js",
    "revision": "eec26fbee5401979ff7e35ab0143a9b0"
  }, {
    "url": "25.560dbbb.js.LICENSE.txt",
    "revision": "d2abde1fe8c4ce472559208aedb65599"
  }, {
    "url": "26.560dbbb.js",
    "revision": "dc98732ca0a353d62b84b75f6ef07cca"
  }, {
    "url": "26.560dbbb.js.LICENSE.txt",
    "revision": "eb70d5bc2dfc705aa1096c260a57f703"
  }, {
    "url": "27.560dbbb.js",
    "revision": "5fe794c92dbe50965537a7f79c960fae"
  }, {
    "url": "27.560dbbb.js.LICENSE.txt",
    "revision": "304d3454a969595b0f062cf5efd056f6"
  }, {
    "url": "28.560dbbb.js",
    "revision": "9673b4c3832e559877c24defc4690d39"
  }, {
    "url": "28.560dbbb.js.LICENSE.txt",
    "revision": "8152c1e2189b17fe69ec41f2aaa121e6"
  }, {
    "url": "29.560dbbb.js",
    "revision": "d53dd1f6ea5dd314bd7eedd5d1fe6b32"
  }, {
    "url": "29.560dbbb.js.LICENSE.txt",
    "revision": "320971f04ab85810c5d52eefea0c9b59"
  }, {
    "url": "3.560dbbb.js",
    "revision": "c3ef1ac9c639d2e2c9b2dcbf17cfd669"
  }, {
    "url": "3.560dbbb.js.LICENSE.txt",
    "revision": "046c218dddc75cbb1252aea5e1bb3954"
  }, {
    "url": "30.560dbbb.js",
    "revision": "28fa3745227bee31927d12f1db172664"
  }, {
    "url": "30.560dbbb.js.LICENSE.txt",
    "revision": "6c14f5ff8efa48335a84d2a605a65471"
  }, {
    "url": "31.560dbbb.js",
    "revision": "8cefa083d10b93d6a337bf538c1a9719"
  }, {
    "url": "31.560dbbb.js.LICENSE.txt",
    "revision": "219231fef56385e50d9ba6a5a1159e61"
  }, {
    "url": "32.560dbbb.js",
    "revision": "1b00da538b68842c5cf24eac7683c485"
  }, {
    "url": "32.560dbbb.js.LICENSE.txt",
    "revision": "bfc13791e092a271a2842291c9d85868"
  }, {
    "url": "33.560dbbb.js",
    "revision": "182c79b1704a86e459f9865c915b9297"
  }, {
    "url": "33.560dbbb.js.LICENSE.txt",
    "revision": "1fa40a51d77a9fed7dabbbc976d4b894"
  }, {
    "url": "34.560dbbb.js",
    "revision": "0f1163d5ee125e5a1ce27bbc81fc2d46"
  }, {
    "url": "34.560dbbb.js.LICENSE.txt",
    "revision": "9d8ee5a35ce141cb621dccebbe4c0b3e"
  }, {
    "url": "35.560dbbb.js",
    "revision": "8ee5948e98fcc748d42e56845a86d7ad"
  }, {
    "url": "35.560dbbb.js.LICENSE.txt",
    "revision": "55490747aab4458addb09255007e5acc"
  }, {
    "url": "36.560dbbb.js",
    "revision": "7f0e165713c1537d9dbd7c435926f498"
  }, {
    "url": "36.560dbbb.js.LICENSE.txt",
    "revision": "2b3122f63f58a31d601bcd2fe4f05fb8"
  }, {
    "url": "37.560dbbb.js",
    "revision": "8dd8519e2f8cd7c90dd650d4bf56ffcb"
  }, {
    "url": "37.560dbbb.js.LICENSE.txt",
    "revision": "dca35adc2644d1b37fc0ad99145b73de"
  }, {
    "url": "38.560dbbb.js",
    "revision": "f17df6bdaccc4fea383331027d7c6ce3"
  }, {
    "url": "38.560dbbb.js.LICENSE.txt",
    "revision": "03d45984b2d1a7bfd6212bc722036525"
  }, {
    "url": "39.560dbbb.js",
    "revision": "607cd06ad37adbb38a1bf6e333275af7"
  }, {
    "url": "39.560dbbb.js.LICENSE.txt",
    "revision": "e159ad4c996758203dafb9647c5b2fa3"
  }, {
    "url": "4.560dbbb.js",
    "revision": "0101feb540a3acaa5a43589d9816c594"
  }, {
    "url": "4.560dbbb.js.LICENSE.txt",
    "revision": "f1114257725d3d1fd60543d753f07490"
  }, {
    "url": "40.560dbbb.js",
    "revision": "bf1a2d0932f93931a44f0dc0ee563716"
  }, {
    "url": "40.560dbbb.js.LICENSE.txt",
    "revision": "a8dccc88c4792242badc632c35866555"
  }, {
    "url": "41.560dbbb.js",
    "revision": "54e2e87205d45abc7c18d9f8d6dcaccb"
  }, {
    "url": "41.560dbbb.js.LICENSE.txt",
    "revision": "4e185b696e1a546c525b8a707d8fd6fc"
  }, {
    "url": "42.560dbbb.js",
    "revision": "45b8cb35973715d3b4ecdbd0f90beac4"
  }, {
    "url": "42.560dbbb.js.LICENSE.txt",
    "revision": "fa4791d2daca05056fd399522daca3e8"
  }, {
    "url": "43.560dbbb.js",
    "revision": "f83ab0542da265e0e010c5699c02ae1c"
  }, {
    "url": "43.560dbbb.js.LICENSE.txt",
    "revision": "537c2475659226197d5003fdc411bb2b"
  }, {
    "url": "44.560dbbb.js",
    "revision": "b7d42ccaf844a478a259437259edcaa1"
  }, {
    "url": "44.560dbbb.js.LICENSE.txt",
    "revision": "bf136738103ed49284358dfc75fa3e52"
  }, {
    "url": "45.560dbbb.js",
    "revision": "0f19e14577f331f48dcf2a88f94e389c"
  }, {
    "url": "45.560dbbb.js.LICENSE.txt",
    "revision": "20c1a74fc2a8cf207dcc940427a6a7ee"
  }, {
    "url": "46.560dbbb.js",
    "revision": "8850670e78e9f11b0d05746959b2bb4c"
  }, {
    "url": "46.560dbbb.js.LICENSE.txt",
    "revision": "5e7e7d794c4417cddfd1aba66b5dd52b"
  }, {
    "url": "47.560dbbb.js",
    "revision": "96733d19f59b401621c24df5cea8c0c5"
  }, {
    "url": "47.560dbbb.js.LICENSE.txt",
    "revision": "e83867d8196d4b0264a677c7543c7544"
  }, {
    "url": "48.560dbbb.js",
    "revision": "384b3b156c6f816be878698d930d1078"
  }, {
    "url": "48.560dbbb.js.LICENSE.txt",
    "revision": "3819cc73191bb85a7e89384ffbcb99ae"
  }, {
    "url": "49.560dbbb.js",
    "revision": "ce94805c19f1065329d9dd8abf3c762f"
  }, {
    "url": "49.560dbbb.js.LICENSE.txt",
    "revision": "c33b266f5ba6ef13eb1fd73146e92a91"
  }, {
    "url": "5.560dbbb.js",
    "revision": "f5718568c44c97b2ddfe908108624c67"
  }, {
    "url": "5.560dbbb.js.LICENSE.txt",
    "revision": "823e69f48561b0888f92082b4f14678f"
  }, {
    "url": "50.560dbbb.js",
    "revision": "fd242400c904af9ab7c8eebb532e7ea1"
  }, {
    "url": "50.560dbbb.js.LICENSE.txt",
    "revision": "97c9e9096047198d872e191048260c2c"
  }, {
    "url": "51.560dbbb.js",
    "revision": "1f0c5af673c257d6cc82cf1f15949e40"
  }, {
    "url": "51.560dbbb.js.LICENSE.txt",
    "revision": "6c6fce3858bd2defc05be4c0cf9d6dc2"
  }, {
    "url": "52.560dbbb.js",
    "revision": "5700a16cfd39ff82fbd7a1b1cf17f5e8"
  }, {
    "url": "52.560dbbb.js.LICENSE.txt",
    "revision": "e302fb5732da90786c91a1048c747d12"
  }, {
    "url": "53.560dbbb.js",
    "revision": "6b623746d01913ffda17383077e8fdae"
  }, {
    "url": "53.560dbbb.js.LICENSE.txt",
    "revision": "5a6540ad04f821844cab2ca97808577f"
  }, {
    "url": "6.560dbbb.js",
    "revision": "822b76dc16ce4c9269a9ece7bc987f38"
  }, {
    "url": "6.560dbbb.js.LICENSE.txt",
    "revision": "0f1178b9d2720de0f96203b6ebb8590d"
  }, {
    "url": "7.560dbbb.js",
    "revision": "2c7947c7a9d491ce6084d42891b4e545"
  }, {
    "url": "7.560dbbb.js.LICENSE.txt",
    "revision": "5784eb03a1124679789612f54008f4c7"
  }, {
    "url": "8.560dbbb.js",
    "revision": "e7e9ada6c3a5431a423e97e6356c05ad"
  }, {
    "url": "8.560dbbb.js.LICENSE.txt",
    "revision": "d290e28b48fa42b28ae0a350717f0a96"
  }, {
    "url": "9.560dbbb.js",
    "revision": "a653e12a31d7a85b0871360a43535109"
  }, {
    "url": "9.560dbbb.js.LICENSE.txt",
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
    "revision": "280856d32be51b26908ff7ebbf43b629"
  }, {
    "url": "main.38ce0c1ee7568459e73f.css",
    "revision": "c9230024c030edbd8fac3a763b73f61b"
  }, {
    "url": "main.560dbbba5e5069aa714e.js",
    "revision": "728ece1ddf9d015309464e718b10b2c8"
  }, {
    "url": "main.560dbbba5e5069aa714e.js.LICENSE.txt",
    "revision": "b69336781f50a7a642928c9c1f816135"
  }], {});

});
//# sourceMappingURL=service-worker.js.map
