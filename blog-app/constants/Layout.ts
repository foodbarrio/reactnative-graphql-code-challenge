import { Dimensions } from "react-native";

export const DeviceWidth = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default {
  window: {
    DeviceWidth,
    height,
  },
  isSmallDevice: DeviceWidth < 375,
};
