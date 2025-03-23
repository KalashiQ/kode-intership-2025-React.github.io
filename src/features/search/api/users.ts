import axios from "axios";
import { User, TabType } from "../../../shared/types";

export const fetchUsersApi = async (department: TabType = "all"): Promise<User[]> => {
  const response = await axios.get(
    `https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users`,
    {
      params: {
        __example: department
      },
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
  
  return response.data.items;
};
