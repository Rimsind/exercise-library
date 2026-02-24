import { BASEURL } from "@/config/MainApi";
import useSWR from "swr";
import axios from "axios";

// fet data list
export const GetDataList = ({ auth, endPoint }) => {
  const { data } = useSWR(
    `${BASEURL}/${endPoint}?sort=id:DESC&populate=*`,
    async (url) => {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      const result = await res.data.data;
      return result;
    },
    {
      refreshInterval: 5000,
    }
  );
  return data;
};

// fet data list
export const GetSingleData = ({ auth, endPoint, id }) => {
  const { data } = useSWR(
    `${BASEURL}/${endPoint}/${id}?sort=id:DESC&populate=*`,
    async (url) => {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      const result = await res.data.data;
      return result;
    },
    {
      refreshInterval: 5000,
    }
  );
  return data;
};

// create new test
export const CreateNewData = async ({ auth, endPoint, payload }) => {
  const res = await axios.post(`${BASEURL}/${endPoint}`, payload, {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  });
  return res;
};

// create update data
export const UpdateData = async ({ auth, endPoint, id, payload }) => {
  const res = await axios.put(`${BASEURL}/${endPoint}/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  });
  return res;
};

// delete data
export const DeleteData = async ({ auth, endPoint, deleteId }) => {
  const res = await axios.delete(`${BASEURL}/${endPoint}/${deleteId}`, {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  });
  return res;
};
