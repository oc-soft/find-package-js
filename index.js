const pathLib = require('path'); 
const fsLib = require('fs');
/**
 * find package.json in npm repository.
 */
class FindPackage {

  /**
   * constructor
   */
  constructor(options) {
    this.options = options;
  }

 /**
  * find package.json path
  */
  find(mod) {
    let result;
    result = undefined;
    const filePath = require.resolve(mod, this.options);
    if (filePath) {
      const pathInfo = pathLib.parse(filePath); 
      const pkgJson = this.findPackageJson(pathInfo);
      result = {
        packageJson: pkgJson,
        pathInfo: pathInfo
      };
    } 
    return result;
  }


  /**
   * find package.json
   */
  findPackageJson(pathInfo) {
    let result = undefined;  
    let notFindAnyMore = false; 
    if (pathInfo.root != pathInfo.dir) {
      const jsonPath = pathLib.join(pathInfo.dir, 'package.json');
      let jsonContents = undefined;
      try {
        jsonContents = fsLib.readFileSync(jsonPath);
      } catch (e) {
      }
      if (jsonContents) {
        if (fsLib.lstatSync(jsonPath).isFile()) {
          try {
            result = JSON.parse(jsonContents);
          } catch (e) {
            notFindAnyMore = true;
          }
        } else {
          notFindAnyMore = true;
        }
      } else {
        if (pathLib.basename(pathInfo.dir) == 'node_modules') {
          notFindAnyMore = true;
        }
      }
    } else {
      notFindAnyMore = true;
    }
    if (notFindAnyMore) {
      const err = new Error('package is not found.');
      err.code = MODULE_NOT_FOUND;
      throw err;
    } else {
      if (typeof result === 'undefined') {
        pathInfo.dir = pathLib.dirname(pathInfo.dir);
        result = this.findPackageJson(pathInfo);
      }
    }
    return result;
  }
}



module.exports = FindPackage;
// vi: se ts=2 sw=2 et:
