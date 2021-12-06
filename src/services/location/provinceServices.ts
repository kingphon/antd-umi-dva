import { Province } from '../../models/location/provinceModel';
import request from '../../commons/request';

const PATH_API = `http://localhost:5000/location/provinces`;

export function fetch() {
  return request(PATH_API);
}

export function create(province: Province) {
  return request(PATH_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(province),
  });
}

export function update(province: Province) {
  return request(`${PATH_API}/${province.key}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(province),
  });
}

export function remove(id: string) {
  return request(`${PATH_API}/${id}`, {
    method: 'DELETE',
  });
}

export function getProvince(id: string) {
  return request(`${PATH_API}/${id}`);
}