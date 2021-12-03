import axios from 'axios';
import { Reducer, Subscription, Effect } from 'umi';

import { makeSlug } from '@/commons/utils';

const PATH_API = `http://localhost:5000/location/provinces`;

export interface Province {
  key: any;
  name: string;
  slugName: string;
  createDate?: string;
  updateDate?: string;
  status?: string;
  customizeSlug?: boolean;
}

export interface ProvinceModelType {
  namespace: 'province';
  state: {
    loading: boolean;
    createButtonLoading: boolean;
    openModal: boolean;
    filters: {
      status: string;
    };
    dataFilters: Array<Province>;
    provinceList: Array<Province>;
    province: Province;
  };
  effects: {
    doSave: Effect;
    doCreate: Effect;
    doUpdate: Effect;
    doDelete: Effect;
    getUpdateAction: Effect;
    // throwError: Effect;
  };
  reducers: {
    openModal: Reducer;
    closeModal: Reducer;
    prepareData: Reducer;
    setProvince: Reducer;
    doFilter: Reducer<string>;
    listLoading: Reducer<boolean>;
    decrease: Reducer<number>;
  };
  subscriptions: {
    fetchAll: Subscription;
  };
}

const ProvinceModel: ProvinceModelType = {
  namespace: 'province',
  state: {
    loading: true,
    createButtonLoading: false,
    openModal: false,
    filters: {
      status: 'ALL',
    },
    dataFilters: [],
    provinceList: [],
    province: {
      key: '',
      name: '',
      customizeSlug: false,
      slugName: '',
    },
  },
  reducers: {
    openModal(state) {
      const newState = { ...state, openModal: true };
      return newState!;
    },
    closeModal(state) {
      const newState = { ...state, openModal: false };
      return newState!;
    },
    prepareData(state, action) {
      const newState = {
        ...state,
        provinceList: action.provinceList,
        dataFilters: action.provinceList,
      };
      return newState!;
    },
    listLoading(state, action) {
      const newState = { ...state, loading: action.loading };
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
    decrease(state) {
      return state! - 1;
    },
  },
  subscriptions: {
    fetchAll({ dispatch, history }) {
      dispatch?.({ type: 'province/listLoading', loading: true });
      axios
        .get(PATH_API, { timeout: 5000 })
        .then((response) =>
          dispatch?.({
            type: 'prepareData',
            provinceList: response.data,
          }),
        )
        // .catch((error) => toast.error(error.response.data.message))
        .finally(() => dispatch?.({ type: 'listLoading', loading: false }));
      return history.listen(({}) => {
        // console.log(history);
      });
    },
  },
  effects: {
    *doSave({ payload }, { call, put }) {
      const { key, name, slugName, customizeSlug } = payload;
      const params = {
        name,
        slugName: customizeSlug ? makeSlug(slugName) : makeSlug(name),
        status: 'ACTIVE',
      };
      if (!key) {
        yield put({ type: 'doCreate', payload: params });
      } else {
        yield put({ type: 'doCreate', payload: params });
      }
    },
    *doCreate({ payload }, { call, put }) {
      const params = JSON.stringify(payload);
      const response = yield axios.post(PATH_API, params, {
        timeout: 5000,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      yield put({ type: 'prepareData', provinceList: response.data });
      yield put({ type: 'closeModal' });
    },
    *doUpdate({ payload }, { call, put }) {
      const params = JSON.stringify(payload);
      const response = yield axios.put(`${PATH_API}/${payload.key}`, params, {
        timeout: 5000,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      yield put({ type: 'prepareData', provinceList: response.data });
      yield put({ type: 'closeModal' });
    },
    *doDelete({ payload }, { call, put }) {
      const response = yield axios.delete(`${PATH_API}/${payload}`);
      yield put({ type: 'prepareData', provinceList: response.data });
    },
    *getUpdateAction({ payload }, { call, put }) {
      // console.log(payload)
      yield put({ type: 'listLoading', loading: true });
      const response = yield axios.get(`${PATH_API}/${payload}`, {
        timeout: 5000,
      });

      // yield put({ type: 'prepareData', provinceList: response.data });
      yield put({ type: 'setProvince', province: response.data });
      yield put({ type: 'openModal' });
      yield put({ type: 'listLoading', loading: false });
    },
  },
};

export default ProvinceModel;
