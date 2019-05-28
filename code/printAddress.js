module.exports.function = function printAddress (queryAddr, mode) {
  const config = require('config');
  const http = require('http');
  const console = require('console');
  const fail = require('fail')
  
  const api_key = config.get('api_key');
  let url = config.get('url')+"?confmKey="+api_key+"&currentPage=1&countPerPage=50&keyword="+queryAddr+"&resultType=json";
  
  let response = http.getUrl(url,{format:"json", cacheTime: 0, returnHeaders:true});
  
  response = JSON.parse(response.responseText.slice(1,-1))
  
  if(response.results.common.errorCode != 0){
      throw fail.checkedError(response.results.common.errorMessage);
  }
  
  let result = [];
  response.results.juso.forEach(juso => {
    console.log(result)
    result.push({
      roadAddr : juso.roadAddr,
      engAddr : juso.engAddr,
      zipCode : juso.zipNo
    })
  })
  
  console.log(result[0])

  return result;
}
