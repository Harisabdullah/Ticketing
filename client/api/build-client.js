import axios from "axios";

export default ({ req }) => {
  if(typeof window === 'undefined') {
    // we are on the server
    const baseUrl = 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local';
    return axios.create({
      baseURL: baseUrl,
      headers: req.headers
    });
  } else {
    // we must be on the browser
    return axios.create({
      baseURL: '/'
    });
  }
};