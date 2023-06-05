import { Dimensions, PixelRatio } from "react-native";

export const screenWidth = Dimensions.get("window").width;
export const screenHeight = Dimensions.get("window").height;

const getWidthPercent = (dp: number) => {
  const percent = (dp / 375) * 100;
  return percent;
};
const getHeightPercent = (dp: number) => {
  const percent = (dp / 667) * 100;
  return percent;
};

export const wp = (dp: number) => {
  // Convert string input to decimal number
  const widthPercent = getWidthPercent(dp);
  // const elemWidth = parseFloat(widthPercent);
  const elemWidth = widthPercent;
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};

export const hp = (dp: number) => {
  // Convert string input to decimal number
  const heightPercent = getHeightPercent(dp);
  // const elemWidth = parseFloat(heightPercent);
  const elemHeight = heightPercent;
  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};
