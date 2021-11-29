import axios from "axios";

function getOrderState(mid){
  const promise = axios.get(`http://kosa1.iptime.org:50211/order/orderstate?mid=${mid}`);
  return promise;
}

export default{
  getOrderState,
}