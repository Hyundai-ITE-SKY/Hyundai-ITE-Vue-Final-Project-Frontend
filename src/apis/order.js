import axios from "axios";

function getOrderState(mid){
  const promise = axios.get(`http://kosa1.iptime.org:50211/order/orderstate?mid=${mid}`);
  return promise;
}

function getOrderListItem(oid){
  const promise = axios.get(`http://kosa1.iptime.org:50211/order/orderlist/${oid}`);
  return promise;
}

function createOrderList(orderList){
  const promise = axios.post(`http://kosa1.iptime.org:50211/order/createorderlist`, orderList);
  return promise;
}

function createOrderItem(orderItem){
  const promise = axios.post(`http://kosa1.iptime.org:50211/order/createorderitem`, orderItem);
  return promise;
}

function getOrderList(){
  const promise = axios.get(`http://kosa1.iptime.org:50211/order/orderlist`);
  return promise;
}

function getOrderListByOdate(start, end){
  const promise = axios.get(`http://kosa1.iptime.org:50211/order/search/${start}/${end}`);
  return promise;
}

function cancelOrder(oid){
  const promise = axios.post(`http://kosa1.iptime.org:50211/order/cancelorder/${oid}`);
  return promise;
}

export default{
  getOrderState,
  getOrderListItem,
  createOrderList,
  createOrderItem,
  getOrderList,
  getOrderListByOdate,
  cancelOrder,
}