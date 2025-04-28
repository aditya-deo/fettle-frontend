import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from "expo-speech-recognition";
import { useState } from "react";
import { Button, Icon, Overlay, Text, Input } from "@rneui/themed";
import centralColorPalette from "../../assets/central_colorpalette.json";
import { TextInput } from "react-native";

export default function Record() {
  const [recognizing, setRecognizing] = useState(false);
  const [transcript, setTranscript] = useState("");

  useSpeechRecognitionEvent("start", () => setRecognizing(true));
  useSpeechRecognitionEvent("end", () => setRecognizing(false));
  useSpeechRecognitionEvent("result", (event) => {
    setTranscript(event.results[0]?.transcript);
  });
  useSpeechRecognitionEvent("error", (event) => {
    console.log("error code:", event.error, "error message:", event.message);
  });

  const handleStart = async () => {
    const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
    if (!result.granted) {
      console.warn("Permissions not granted", result);
      return;
    }
    ExpoSpeechRecognitionModule.start({
      lang: "en-US",
      interimResults: true,
      continuous: true,
    });
  };

  const handleStop = () => {
    ExpoSpeechRecognitionModule.stop();
    setVisible(true);
  };

  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <>
      {!recognizing ? (
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
          onPress={handleStart}
        >
          <Icon name="mic" color={centralColorPalette.almostwhite} />
        </Button>
      ) : (
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
          onPress={() => handleStop()}
        >
          <Icon name="stop" color={centralColorPalette.almostwhite} />
        </Button>
      )}

      <Overlay
        fullScreen={false}
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={{
          backgroundColor: centralColorPalette.darkblue,
        }}
      >
        <TextInput
          multiline={true}
          numberOfLines={8}
          onChangeText={(text) => setTranscript(text)}
          value={transcript}
          style={{
            height: 200,
            width: 300,
            textAlignVertical: "top",
            borderColor: centralColorPalette.almostwhite,
            borderStyle: "solid",
            borderWidth: 1,
            margin: 10,
            padding: 15,
            paddingTop: 15,
            color: centralColorPalette.almostwhite,
          }}
        ></TextInput>
        <Button
          icon={
            <Icon
              name="save"
              type="font-awesome"
              color="white"
              size={25}
              iconStyle={{ marginRight: 10 }}
            />
          }
          title="Save"
          onPress={toggleOverlay}
          color={centralColorPalette.darkmaroon}
        />
      </Overlay>
    </>
  );
}
