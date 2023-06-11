import { useState } from "react";
import { CustomUser } from "../atoms/user.atom";
import { getUser } from "../../api/user";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

const useInitialUserInfo = () => {
  const [userInfo, setUserInfo] = useState<CustomUser | null>();
  const userInfoSet = async (user: FirebaseAuthTypes.User | null) => {
    if (user) {
      const getUserInfo = await getUser({ uid: user.uid, name: user.displayName });
      if (getUserInfo) {
        console.log(getUserInfo);
        setUserInfo(getUserInfo);
      } else {
        console.log(getUserInfo);
        setUserInfo(null);
      }
    } else {
      setUserInfo(null);
    }
  };

  return { userInfo, userInfoSet };
};

export default useInitialUserInfo;
