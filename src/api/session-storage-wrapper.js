const sessionStorage = window.sessionStorage;
if(!sessionStorage) throw 'session storage is inneed!'

function encodeRequest(params, identity){
  return identity + Object.keys(params).map((key) => (`${params}=${params[key]}`)).join('&');
}

function requestWrapper(request, identity){
  return function(params, refresh){
    const key = encodeRequest(params, identity);
    if(!refresh && sessionStorage.getItem(key)){
      return Promise.resolve(JSON.parse(sessionStorage.getItem(key)));
    }
    return new Promise((resolve, reject) => {
      request(params).then((res) => {
        sessionStorage.setItem(key, JSON.stringify(res));
        resolve(res);
      })
    })
  }
}

export default requestWrapper;
