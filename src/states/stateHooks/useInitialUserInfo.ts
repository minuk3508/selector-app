import { useState } from "react";
import { CustomUser } from "../atoms/user.atom";
import { addUser, getUser } from "../../api/user";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

const useInitialUserInfo = () => {
  const [userInfo, setUserInfo] = useState<CustomUser | null>();
  const userInfoSet = async (user: FirebaseAuthTypes.User | null) => {
    if (user) {
      const getUserInfo = await getUser({ uid: user.uid });
      if (getUserInfo === "") {
        await addUser({
          uid: user.uid,
          name: user.displayName ? user.displayName : null,
          birth: null,
          email: user.email ? user.email : null,
          phone: null,
          account: null,
        }).then(async () => {
          await getUser({ uid: user.uid }).then(res => {
            setUserInfo(res);
          });
        });
      } else {
        setUserInfo(getUserInfo);
      }
    } else {
      setUserInfo(null);
    }
  };
  return { userInfo, userInfoSet };
};

export default useInitialUserInfo;
