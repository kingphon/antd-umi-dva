import { Reducer, Subscription, Effect } from 'umi';
import * as provinceServices from '../../services/location/provinceServices';

export interface Province {
  key: any;
  name: string;
  slugName: string;
  createDate?: string;
  updateDate?: string;
  status?: string;
}

export interface ProvinceModelType {
  namespace: 'province';
  state: {
    filters: {
      status: string;
    };
    dataFilters: Array<Province>;
    provinceList: Array<Province>;
    province: Province;
  };
  effects: {
    getData: Effect;
    doCreate: Effect;
    doUpdate: Effect;
    doDelete: Effect;
    updateStatus: Effect;
    getUpdateAction: Effect;
  };
  reducers: {
    prepareData: Reducer;
    setProvince: Reducer;
    doFilter: Reducer<string>;
  };
}

const ProvinceModel: ProvinceModelType = {
  namespace: 'province',
  state: {
    filters: {
      status: 'ALL',
    },
    dataFilters: [],
    provinceList: [],
    province: {
      key: '',
      name: '',
      slugName: '',
    },
  },
  reducers: {
    prepareData(state, action) {
      const newState = {
        ...state,
        provinceList: action.provinceList,
        dataFilters: action.provinceList,
      };
      return newState!;
    },
    setProvince(state, action) {
      const newState = { ...state, province: action.province };
      return newState!;
    },
    doFilter(state, action) {
      const newState = {
        ...state,
        filters: action.payload,
        dataFilters:
          action.payload === 'ALL'
            ? state.provinceList
            : state.provinceList.filter(
                (province) => province.status === action.payload,
              ),
      };
      return newState!;
    },
  },
  effects: {
    *getData({}, { call, put }) {
      const response = yield call(provinceServices.fetch);
      yield put({ type: 'prepareData', provinceList: response.data });
    },
    *doCreate({ payload }, { call, put }) {
      const response = yield call(provinceServices.create, payload);
      yield put({ type: 'prepareData', provinceList: response.data });
      yield put({ type: 'closeModal' });
    },
    *doUpdate({ payload }, { call, put }) {
      const response = yield call(provinceServices.update, payload);
      yield put({ type: 'prepareData', provinceList: response.data });
      yield put({ type: 'closeModal' });
    },
    *doDelete({ payload }, { call, put }) {
      const response = yield call(provinceServices.remove, payload);
      yield put({ type: 'prepareData', provinceList: response.data });
    },
    *getUpdateAction({ payload }, { call, put }) {
      const response = yield call(provinceServices.getProvince, payload);
      yield put({ type: 'setProvince', province: response.data });
    },
    *updateStatus({ payload }, { call, put }) {
      yield put({
        type: 'doUpdate',
        payload: {
          ...payload,
          status: payload.status === 'ACTIVE' ? 'HIDDEN' : 'ACTIVE',
        },
      });
    },
  },
};

export default ProvinceModel;
