import { View, ScrollView, Text } from "react-native";
import centralColorPalette from "../assets/central_colorpalette.json";
import { Button, Icon } from "@rneui/themed";
import { useState } from "react";

import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from "expo-speech-recognition";

export default function Index() {
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
      continuous: false,
    });
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: centralColorPalette.darkblue,
      }}
    >
      {/* <ScrollView>
        <Text style={{color:"white"}}>{transcript}</Text>
      </ScrollView> */}
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
          onPress={() => ExpoSpeechRecognitionModule.stop()}
        />
      )}

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
    </View>
  );
}
