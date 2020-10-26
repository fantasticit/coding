function TrieNode (data) {
  this.data = data
  this.chidlren = []
  this.isEnd = false
}

/**
 * Initialize your data structure here.
 */
var Trie = function() {
  this.root = new TrieNode('')
};

/**
 * Inserts a word into the trie. 
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word) {
  let node = this.root

  for (const char of word) {
    let idx = node.chidlren.findIndex(t => t .data=== char)
    if (idx < 0) {
      node.chidlren.push(new TrieNode(char))
      idx = node.chidlren.length - 1
    }
    node = node.chidlren[idx]
  }

  node.isEnd = true
};

/**
 * Returns if the word is in the trie. 
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function(word) {
  let node = this.root

  for (const char of word) {
    let idx = node.chidlren.findIndex(t => t.data === char)
    if (idx > -1) {
      node = node.chidlren[idx]
    } else {
      return false
    }
  }

  return node.isEnd
};

/**
 * Returns if there is any word in the trie that starts with the given prefix. 
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function(prefix) {
  let node = this.root

  for (const char of prefix) {
    let idx = node.chidlren.findIndex(t => t.data === char)
    if (idx > -1) {
      node = node.chidlren[idx]
    } else {
      return false
    }
  }

  return true
};

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
