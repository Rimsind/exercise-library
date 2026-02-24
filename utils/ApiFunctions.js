import { BASEURL, fetcher } from "@/config/MainApi";
import useSWR from "swr";
import axios from "axios";

// fet data list
export const GetDataList = ({ endPoint }) => {
  const { data } = useSWR(
    `${BASEURL}/${endPoint}?sort=id:DESC&populate=*`,
    fetcher,
    {
      refreshInterval: 5000,
    },
  );
  return data;
};

// fet data list
export const GetSingleData = ({ auth, endPoint, id }) => {
  const { data } = useSWR(
    `${BASEURL}/${endPoint}/${id}?sort=id:DESC&populate=*`,
    fetcher,
    {
      refreshInterval: 5000,
    },
  );
  return data;
};

// create new test
export const CreateNewData = async ({ endPoint, payload }) => {
  const res = await axios.post(`${BASEURL}/${endPoint}`, payload, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
  });
  return res;
};

// create update data
export const UpdateData = async ({ endPoint, id, payload }) => {
  const res = await axios.put(`${BASEURL}/${endPoint}/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
  });
  return res;
};

// delete data
export const DeleteData = async ({ endPoint, id }) => {
  const res = await axios.delete(`${BASEURL}/${endPoint}/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
  });
  return res;
};
