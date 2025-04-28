import { View} from "react-native";
import centralColorPalette from "../assets/central_colorpalette.json";
import Record from "./components/record";
import Capture from "./components/capture";



export default function Index() {
  
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: centralColorPalette.darkblue,
      }}
    >
      <Record/>
      <Capture/>
    </View>
  );
}
