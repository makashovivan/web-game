const httpRequest = async <T = any>(url: string,
                                    method: string = "GET",
                                    body: BodyInit = null,
                                    headers: HeadersInit = {}): Promise<T> => {
  try {
    return fetch(url, {method, body, headers})
    .then(result => result.json()) as Promise<T>
  } catch(e) {
    return e
  }
}

const httpGet = async <T = any>(url: string,
                                args: BodyInit = null,
                                headers: HeadersInit = {}): Promise<T> => {
  return httpRequest(url, "GET", args, headers)
}

const httpPost = async <T = any>(url: string,
                                 args: BodyInit = null,
                                 headers: HeadersInit = {}): Promise<T> => {
  return httpRequest(url, "POST", args, headers)
}

export {httpRequest, httpGet, httpPost}