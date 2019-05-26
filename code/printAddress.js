module.exports.function = function printAddress (input) {
  const config = require('config');
  const http = require('http');
  const console = require('console');
  
  const api_key = config.get('api_key');
  let url = config.get('url')
  url += `?confmKey=${api_key}&currentPage=1&countPerPage=50&keyword=${input.queryAddr}&resultType=json`;
  
  let result = [];
  const response = http.getUrl(url,{format:"json", cacheTime: 0, returnHeaders:true});
  if(response.results.common.errorCode !== 0){
      throw fail.checkedError(response.results.common.errorMessage);
  }
  
  for (let juso in response.results.juso){
    result.push({
      roadAddr : juso.roadAddr,
      engAddr : juso.engAddr,
      zipCode : juso.zipNo
    })
  }

  return result;
}
