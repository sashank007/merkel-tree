var SHA256 = require("crypto-js/sha256");

const MerkelTree = function(transactions) {
  this.transactions = transactions;
  this._oldTransaction = {};
};

MerkelTree.prototype = {
  fetchOldTransaction: function() {
    return this._oldTransaction;
  },

  getRoot: function() {
    var idx = Object.keys(this._oldTransaction)[
      Object.keys(this._oldTransaction).length - 1
    ];
    return this._oldTransaction[idx];
  },
  make: function() {
    let trans = this.transactions;
    let arr = [];

    for (let i = 0; i < this.transactions.length; i += 2) {
      let transaction = this.transactions[i];
      let hash = { left: "", right: "" };
      let current_index = parseInt(i) + 1;
      let right;

      hash["left"] = this._oldTransaction[transaction] = String(
        SHA256(transaction)
      );
      if (current_index !== this.transactions.length) {
        right = this.transactions[current_index];
      } else {
        right = "";
      }
      if (right != "") {
        hash["right"] = String(SHA256(right));
        this._oldTransaction[this.transactions[current_index]] = hash["right"];
        arr.push(hash["left"] + hash["right"]);
      } else {
        arr.push(hash["left"]);
      }
    }
    if (this.transactions.length != 1) {
      this.transactions = arr;
      this.make();
    }
  }
};
module.exports = MerkelTree;
