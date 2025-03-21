import { Dimensions, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const getLayout = () => {
  const HEIGHT = Dimensions.get("window").height;
  const WIDTH = Dimensions.get("window").width;

  return ({ insets }) => {
    const errVal =
      Dimensions.get("screen").height - HEIGHT < 45 ||
      Dimensions.get("screen").height - HEIGHT > 70
        ? insets.top + insets.bottom
        : insets.bottom;

    const fullHeight = HEIGHT + (Platform.OS === "android" ? errVal : 0);
    const fullWidth = WIDTH;

    return {
      height: fullHeight,
      width: fullWidth,
    };
  };
};

export const layout = () => {
  const insets = useSafeAreaInsets();
  const layout = getLayout();

  return layout({ insets });
};
