import { Button, Icon } from "@rneui/themed";
import centralColorPalette from "../../assets/central_colorpalette.json";
export default function Capture() {
  return (
    <>
      <Button
        radius={"sm"}
        size={"lg"}
        type="outline"
        color={centralColorPalette.darkblue}
        buttonStyle={{ borderColor: centralColorPalette.almostwhite }}
        containerStyle={{
          marginHorizontal: 50,
          marginVertical: 50,
        }}
      >
        <Icon name="camera" color={centralColorPalette.almostwhite} />
      </Button>
    </>
  );
}
