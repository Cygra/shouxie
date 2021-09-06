Function.prototype.call = function (context) {
  var context = context || window

  var k = Sumbol('k')

  context[k] = this
  var result = context[k](Array.from(arguments).slice(1))

  delete context[k]
  return result
}
