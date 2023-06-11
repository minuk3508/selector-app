import { Dimensions, PixelRatio, Platform } from "react-native";
import Toast from "react-native-root-toast";
import { isIPhoneX } from "react-native-status-bar-height";

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
export const ToastMessage = (text: string, options?: any) =>
  Toast.show(text, {
    duration: Toast.durations.LONG,
    position:
      Toast.positions.BOTTOM -
      (Platform.OS === "ios" && isIPhoneX()
        ? wp(80)
        : Platform.OS === "ios" && !isIPhoneX()
        ? wp(56)
        : wp(45)),
    shadow: false,
    animation: true,
    hideOnPress: true,
    delay: 0,
    keyboardAvoiding: true,
    backgroundColor: "black",
    opacity: 1,
    containerStyle: {
      width: wp(343),
      minHeight: wp(42),
      borderRadius: wp(10),
      marginBottom: wp(40),
    },

    textStyle: {
      fontSize: wp(14),
      lineHeight: wp(21),
      fontWeight: 900,
      color: "#fff",
      includeFontPadding: false,
    },
    ...options,
  });
