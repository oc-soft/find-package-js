const assert = require('assert')

/**
 *  test module 
 */
class Test {

  /**
   * constructor 
   */
  constructor() {
  }

  /**
   *  run test program
   */
  run() {
    const FindPackage = require('../index.js')
    const pathLib = require('path')

    const fp = new FindPackage()

    const pkgInfo = fp.find('@fortawesome/fontawesome-free');

    const submodules = [
      'css/fontawesome.css',
      'css/solid.css',
      'js/fontawesome.js',
      'js/solid.js',
    ]

    const prefix = '@fortawesome/fontawesome-free';

    submodules.forEach(submodule=> {
      console.log(pathLib.join(pkgInfo.pathInfo.dir, submodule));
    })
    assert(true)
  }
}


(() => {
  const t = new Test()
  t.run()
})()

// vi: se ts=2 sw=2 et:
