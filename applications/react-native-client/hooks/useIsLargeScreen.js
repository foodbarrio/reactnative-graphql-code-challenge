import * as React from "react";
import { Dimensions, ScaledSize } from "react-native";

const useIsLargeScreen = () => {
  const [dimensions, setDimensions] = React.useState(Dimensions.get("window"));

  React.useEffect(() => {
    const onDimensionsChange = ({ window }: { window: ScaledSize }) => {
      setDimensions(window);
    };

    Dimensions.addEventListener("change", onDimensionsChange);

    return () => Dimensions.removeEventListener("change", onDimensionsChange);
  }, []);

  return dimensions.width > 414;
};

export default useIsLargeScreen;
