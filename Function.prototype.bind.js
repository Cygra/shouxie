Function.prototype.bind = function (context, ...args) {
  var self = this

  var bound = function () {
    return self.apply(context, args.concat(Array.from(arguments)))
  }


  // var fNOP = function () {}

  // if (this.prototype) {
  //     fNOP.prototype = this.prototype;
  // }  
  // bound.prototype = new fNOP();


  return bound
}
