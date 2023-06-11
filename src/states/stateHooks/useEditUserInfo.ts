import { useState } from "react";
import { CustomUser } from "../atoms/user.atom";
import { editUser, getUser } from "../../api/user";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

const useEditUserInfo = async ({
  uid,
  name,
  birth,
  email,
  phone,
  account,
}: CustomUser) => {
  if (uid) {
    const result = await editUser({ uid, name, birth, email, phone, account });
    console.log(result);

    return result;
  }
};

export default useEditUserInfo;
