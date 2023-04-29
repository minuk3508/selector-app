import api from "../api";

export const Availability = async () => {
  const res = await api.post("/EntryAvailability");
  return res;
};

export const getAds = async ({ userUid }: { userUid: string }) => {
  const res = await api.post("/getAdPlayerObject", { uid: userUid });
  return res;
};

export const stampUser = async ({
  userUid,
  timeStamp,
}: {
  userUid: string;
  timeStamp: number;
}) => {
  const res = await api.post("/stampUserOnTicket", {
    uid: userUid,
    timeStamp: timeStamp,
  });
  return res;
};

export const totalTicket = async ({ userUid }: { userUid: string }) => {
  const res = await api.post("/TotalTicket", {
    uid: userUid,
  });
  return res;
};
