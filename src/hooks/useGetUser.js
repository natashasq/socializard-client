import { useUserDispatch } from "contexts/UserContext";
import { useEffect } from "react";
import { getUser } from "service/user";

export function useGetUser() {
  const dispatch = useUserDispatch();

  useEffect(() => {
    (async () => {
      try {
        const data = await getUser();
        dispatch({ type: "GET_USER_SUCCESS", payload: data });
      } catch (e) {
        dispatch({ type: "GET_USER_FAILED", payload: e });
      }
    })();
  }, []);
}
