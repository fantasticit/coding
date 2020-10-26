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
    "url": "0.chunk.034ab88.js",
    "revision": "6a6c6ab02eadccfd9683852caefed6ad"
  }, {
    "url": "0.chunk.034ab88.js.LICENSE.txt",
    "revision": "29c5753de94a4a2d993c390444e9ea12"
  }, {
    "url": "1.2a6efad553e913841edc.css",
    "revision": "a83c8130b03a26ed294a2f9508419706"
  }, {
    "url": "1.chunk.034ab88.js",
    "revision": "b0d812b81edf12529b7385080b146c9a"
  }, {
    "url": "1.chunk.034ab88.js.LICENSE.txt",
    "revision": "f60b6259dfbf65009a9658712a83bdcf"
  }, {
    "url": "10.chunk.034ab88.js",
    "revision": "b4fc64493e73ed4d9922aaca9074badf"
  }, {
    "url": "10.chunk.034ab88.js.LICENSE.txt",
    "revision": "755f7313df5ed012d94264e6dbd0d004"
  }, {
    "url": "11.chunk.034ab88.js",
    "revision": "c7668d4dc5a052db7e95ac4c9df345fa"
  }, {
    "url": "11.chunk.034ab88.js.LICENSE.txt",
    "revision": "5784eb03a1124679789612f54008f4c7"
  }, {
    "url": "12.chunk.034ab88.js",
    "revision": "e38a11f9cbe03c27b612338d606cd917"
  }, {
    "url": "12.chunk.034ab88.js.LICENSE.txt",
    "revision": "feaca3f8462dc36725030cf603bdb648"
  }, {
    "url": "13.chunk.034ab88.js",
    "revision": "004544762491a4e5d1c99d8ac27ffe34"
  }, {
    "url": "13.chunk.034ab88.js.LICENSE.txt",
    "revision": "96d07beda5d75924f5a931fc4c774981"
  }, {
    "url": "14.chunk.034ab88.js",
    "revision": "87e4a704a27cf864c50dfd5cb823712d"
  }, {
    "url": "14.chunk.034ab88.js.LICENSE.txt",
    "revision": "4639f74b097068c7f13f947cdcf0d93e"
  }, {
    "url": "15.chunk.034ab88.js",
    "revision": "14e8ed9f0e0d8e79eb059af94cd58ed2"
  }, {
    "url": "15.chunk.034ab88.js.LICENSE.txt",
    "revision": "1d51a7fff4f1f9cd74ff5a1c0103d4da"
  }, {
    "url": "16.chunk.034ab88.js",
    "revision": "8eac774624a82721b59ebacfe0fa5905"
  }, {
    "url": "16.chunk.034ab88.js.LICENSE.txt",
    "revision": "7e1be9d7e3f10899c735d45e851738db"
  }, {
    "url": "17.chunk.034ab88.js",
    "revision": "b0a0a98620597691a0bb83606037023e"
  }, {
    "url": "17.chunk.034ab88.js.LICENSE.txt",
    "revision": "97394ab7025fbaf3a67da46eee12e351"
  }, {
    "url": "18.chunk.034ab88.js",
    "revision": "53447d9f604d29b029d20f50b0229010"
  }, {
    "url": "18.chunk.034ab88.js.LICENSE.txt",
    "revision": "e31d4aee126a3c550530886c7ae6a3c9"
  }, {
    "url": "19.chunk.034ab88.js",
    "revision": "7df4bd23b46f173018c597407d3edd52"
  }, {
    "url": "19.chunk.034ab88.js.LICENSE.txt",
    "revision": "175bfeba2c1760d2e147bdf05f68c196"
  }, {
    "url": "2.chunk.034ab88.js",
    "revision": "149c2e43015fead3ea61b2b6aec2f249"
  }, {
    "url": "2.chunk.034ab88.js.LICENSE.txt",
    "revision": "41e9f2e7120cbeec03e554265428e21d"
  }, {
    "url": "20.chunk.034ab88.js",
    "revision": "e37e594a9a35ad54ed488a7932090fbe"
  }, {
    "url": "20.chunk.034ab88.js.LICENSE.txt",
    "revision": "6c7b1e86db688d37143243d839e417f2"
  }, {
    "url": "21.chunk.034ab88.js",
    "revision": "7ec772b4bde13fd299500e895863abb7"
  }, {
    "url": "21.chunk.034ab88.js.LICENSE.txt",
    "revision": "b39caaf80864e581301d65b72dc672e9"
  }, {
    "url": "22.chunk.034ab88.js",
    "revision": "8e13a8cee2b8ec3c89810d3f0f5abcb5"
  }, {
    "url": "22.chunk.034ab88.js.LICENSE.txt",
    "revision": "13b94015d04852b872dfb58532ecd96c"
  }, {
    "url": "23.chunk.034ab88.js",
    "revision": "6980a211ad4d06dbaed11759d89e16bc"
  }, {
    "url": "23.chunk.034ab88.js.LICENSE.txt",
    "revision": "a5f73056428eb9ff5efa58fda6697d4d"
  }, {
    "url": "24.chunk.034ab88.js",
    "revision": "03b6917c4fcec49c194df6ac5355c4d0"
  }, {
    "url": "24.chunk.034ab88.js.LICENSE.txt",
    "revision": "6a6e09fec4cef03c683a58d4d08116fc"
  }, {
    "url": "25.chunk.034ab88.js",
    "revision": "cef62a18ffefd3ad9df720aedbd44e80"
  }, {
    "url": "25.chunk.034ab88.js.LICENSE.txt",
    "revision": "b7231e36cf473a5801ec5a0ef228ed2e"
  }, {
    "url": "26.chunk.034ab88.js",
    "revision": "521a13b4ea46ba11bae8d21c99df4361"
  }, {
    "url": "26.chunk.034ab88.js.LICENSE.txt",
    "revision": "d2abde1fe8c4ce472559208aedb65599"
  }, {
    "url": "27.chunk.034ab88.js",
    "revision": "31503d83a320caac8c80a8568ff1f95f"
  }, {
    "url": "27.chunk.034ab88.js.LICENSE.txt",
    "revision": "eb70d5bc2dfc705aa1096c260a57f703"
  }, {
    "url": "28.chunk.034ab88.js",
    "revision": "7d4458eb3cf3b1018f4b2b135d307d70"
  }, {
    "url": "28.chunk.034ab88.js.LICENSE.txt",
    "revision": "304d3454a969595b0f062cf5efd056f6"
  }, {
    "url": "29.chunk.034ab88.js",
    "revision": "73218ddc0f740c895437e7bc3dcf45be"
  }, {
    "url": "29.chunk.034ab88.js.LICENSE.txt",
    "revision": "8152c1e2189b17fe69ec41f2aaa121e6"
  }, {
    "url": "3.chunk.034ab88.js",
    "revision": "23deb163eb917aa656add331b0643e60"
  }, {
    "url": "3.chunk.034ab88.js.LICENSE.txt",
    "revision": "046c218dddc75cbb1252aea5e1bb3954"
  }, {
    "url": "30.chunk.034ab88.js",
    "revision": "eb782c73aa6d9e248998fd053974ab1e"
  }, {
    "url": "30.chunk.034ab88.js.LICENSE.txt",
    "revision": "320971f04ab85810c5d52eefea0c9b59"
  }, {
    "url": "31.chunk.034ab88.js",
    "revision": "fde6038dde87db492ce2bbf2183a2d91"
  }, {
    "url": "31.chunk.034ab88.js.LICENSE.txt",
    "revision": "6c14f5ff8efa48335a84d2a605a65471"
  }, {
    "url": "32.chunk.034ab88.js",
    "revision": "cb039f8ea1288ee2d08caf62b031ee71"
  }, {
    "url": "32.chunk.034ab88.js.LICENSE.txt",
    "revision": "219231fef56385e50d9ba6a5a1159e61"
  }, {
    "url": "33.chunk.034ab88.js",
    "revision": "608f50d2faafb18084b2324e4d77fde1"
  }, {
    "url": "33.chunk.034ab88.js.LICENSE.txt",
    "revision": "bfc13791e092a271a2842291c9d85868"
  }, {
    "url": "34.chunk.034ab88.js",
    "revision": "8d0121a110ebfb31631415827283ebd7"
  }, {
    "url": "34.chunk.034ab88.js.LICENSE.txt",
    "revision": "1fa40a51d77a9fed7dabbbc976d4b894"
  }, {
    "url": "35.chunk.034ab88.js",
    "revision": "04ab1a3df9355f7db5243b8d3abb450e"
  }, {
    "url": "35.chunk.034ab88.js.LICENSE.txt",
    "revision": "9d8ee5a35ce141cb621dccebbe4c0b3e"
  }, {
    "url": "36.chunk.034ab88.js",
    "revision": "06633a79a1adb80ae53f7f2b93a20b91"
  }, {
    "url": "36.chunk.034ab88.js.LICENSE.txt",
    "revision": "55490747aab4458addb09255007e5acc"
  }, {
    "url": "37.chunk.034ab88.js",
    "revision": "f6ed958d59800221306a1d7846e0f0d2"
  }, {
    "url": "37.chunk.034ab88.js.LICENSE.txt",
    "revision": "2b3122f63f58a31d601bcd2fe4f05fb8"
  }, {
    "url": "38.chunk.034ab88.js",
    "revision": "b156be52c4be8c6053391b34530a7cc5"
  }, {
    "url": "38.chunk.034ab88.js.LICENSE.txt",
    "revision": "dca35adc2644d1b37fc0ad99145b73de"
  }, {
    "url": "39.chunk.034ab88.js",
    "revision": "682804733e81618a481ec22b3039869e"
  }, {
    "url": "39.chunk.034ab88.js.LICENSE.txt",
    "revision": "03d45984b2d1a7bfd6212bc722036525"
  }, {
    "url": "4.chunk.034ab88.js",
    "revision": "9a4b11dad02e3c4da01bd30f1d54cc4e"
  }, {
    "url": "4.chunk.034ab88.js.LICENSE.txt",
    "revision": "90deedbcf3a9012c652ee9f2de405a0f"
  }, {
    "url": "40.chunk.034ab88.js",
    "revision": "d55abcf65fa9b3cd513d4ed927678b0b"
  }, {
    "url": "40.chunk.034ab88.js.LICENSE.txt",
    "revision": "e159ad4c996758203dafb9647c5b2fa3"
  }, {
    "url": "41.chunk.034ab88.js",
    "revision": "1f32024258e20efa53fc9cde15725887"
  }, {
    "url": "41.chunk.034ab88.js.LICENSE.txt",
    "revision": "a8dccc88c4792242badc632c35866555"
  }, {
    "url": "42.chunk.034ab88.js",
    "revision": "34340e314483de32b3e75f89d5150bf4"
  }, {
    "url": "42.chunk.034ab88.js.LICENSE.txt",
    "revision": "4e185b696e1a546c525b8a707d8fd6fc"
  }, {
    "url": "43.chunk.034ab88.js",
    "revision": "00051728fbc06a259b28cb719e78602f"
  }, {
    "url": "43.chunk.034ab88.js.LICENSE.txt",
    "revision": "fa4791d2daca05056fd399522daca3e8"
  }, {
    "url": "44.chunk.034ab88.js",
    "revision": "6f620e0f503f5464ae58b60aed840b7d"
  }, {
    "url": "44.chunk.034ab88.js.LICENSE.txt",
    "revision": "537c2475659226197d5003fdc411bb2b"
  }, {
    "url": "45.chunk.034ab88.js",
    "revision": "d69fdc290fece1243ab80271ee8d60c1"
  }, {
    "url": "45.chunk.034ab88.js.LICENSE.txt",
    "revision": "bf136738103ed49284358dfc75fa3e52"
  }, {
    "url": "46.chunk.034ab88.js",
    "revision": "c06024f5d94b022c685ce7316958f930"
  }, {
    "url": "46.chunk.034ab88.js.LICENSE.txt",
    "revision": "20c1a74fc2a8cf207dcc940427a6a7ee"
  }, {
    "url": "47.chunk.034ab88.js",
    "revision": "5f2bbd71fcc0fe1f07aecb70124000ff"
  }, {
    "url": "47.chunk.034ab88.js.LICENSE.txt",
    "revision": "5e7e7d794c4417cddfd1aba66b5dd52b"
  }, {
    "url": "48.chunk.034ab88.js",
    "revision": "51b120d6f61585677dbe0d136c0dd5d2"
  }, {
    "url": "48.chunk.034ab88.js.LICENSE.txt",
    "revision": "e83867d8196d4b0264a677c7543c7544"
  }, {
    "url": "49.chunk.034ab88.js",
    "revision": "1cdb074151f13b73128a80f09f1e5ab7"
  }, {
    "url": "49.chunk.034ab88.js.LICENSE.txt",
    "revision": "3819cc73191bb85a7e89384ffbcb99ae"
  }, {
    "url": "5.chunk.034ab88.js",
    "revision": "e8d679ce13dbcbc5b0e2b60a878c08f0"
  }, {
    "url": "5.chunk.034ab88.js.LICENSE.txt",
    "revision": "f1114257725d3d1fd60543d753f07490"
  }, {
    "url": "50.chunk.034ab88.js",
    "revision": "39dcd79e16a739c93ea6d994b7e77f0a"
  }, {
    "url": "50.chunk.034ab88.js.LICENSE.txt",
    "revision": "c33b266f5ba6ef13eb1fd73146e92a91"
  }, {
    "url": "51.chunk.034ab88.js",
    "revision": "5849be57360f7780e74762c7d695c744"
  }, {
    "url": "51.chunk.034ab88.js.LICENSE.txt",
    "revision": "97c9e9096047198d872e191048260c2c"
  }, {
    "url": "52.chunk.034ab88.js",
    "revision": "6dfa121a2f7631faecc022252a3486d9"
  }, {
    "url": "52.chunk.034ab88.js.LICENSE.txt",
    "revision": "6c6fce3858bd2defc05be4c0cf9d6dc2"
  }, {
    "url": "53.chunk.034ab88.js",
    "revision": "f297871a8446c16594c70f731608d3ed"
  }, {
    "url": "53.chunk.034ab88.js.LICENSE.txt",
    "revision": "e302fb5732da90786c91a1048c747d12"
  }, {
    "url": "54.chunk.034ab88.js",
    "revision": "d9a818d95515f2ec6a47f0fb1157227c"
  }, {
    "url": "54.chunk.034ab88.js.LICENSE.txt",
    "revision": "5a6540ad04f821844cab2ca97808577f"
  }, {
    "url": "6.chunk.034ab88.js",
    "revision": "26f9f58f30cc331d833f7cb05585c935"
  }, {
    "url": "6.chunk.034ab88.js.LICENSE.txt",
    "revision": "823e69f48561b0888f92082b4f14678f"
  }, {
    "url": "7.chunk.034ab88.js",
    "revision": "98fa9a2c056cba4449ce1ca7bf4434f8"
  }, {
    "url": "7.chunk.034ab88.js.LICENSE.txt",
    "revision": "56c0fbebaa4b0e91a5738799b8620fa4"
  }, {
    "url": "8.chunk.034ab88.js",
    "revision": "e548115951ad91ca394618a21a672591"
  }, {
    "url": "8.chunk.034ab88.js.LICENSE.txt",
    "revision": "aba601e38adf693416afd442a0b4601c"
  }, {
    "url": "9.chunk.034ab88.js",
    "revision": "a06ab16321ddaf7f5c013576deb1888c"
  }, {
    "url": "9.chunk.034ab88.js.LICENSE.txt",
    "revision": "3c112bbb5fc9f187f45a73a497a87dc1"
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
    "url": "assets/trie-tree.png?5ef4067ec57dba8cb2da0139a4ae772b",
    "revision": "5ef4067ec57dba8cb2da0139a4ae772b"
  }, {
    "url": "main.034ab887fe6b673446a8.js",
    "revision": "048b4eb733e8d386d81596db10fffbb8"
  }, {
    "url": "main.034ab887fe6b673446a8.js.LICENSE.txt",
    "revision": "04f5c791615d97a8b9134c98279dcd98"
  }, {
    "url": "main.8574d71132d42fd624c2.css",
    "revision": "ec60dd008e625d2a7fda038b980c0c41"
  }], {});

});
//# sourceMappingURL=service-worker.js.map
