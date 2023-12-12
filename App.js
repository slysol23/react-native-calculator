import React from "react";
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import { evaluate } from "mathjs";
import { useDeviceOrientation } from "@react-native-community/hooks";

export default function App() {
  const [darkTheme, setDarkTheme] = React.useState(false);
  const [result, setResult] = React.useState("0");

  const deviceOrientation = useDeviceOrientation();

  const colors = {
    dark: "#22252D",
    dark1: "#292B36",
    dark2: "#272B33",
    light: "#FFF",
    light1: "#F1F1F1",
    light2: "#F7F7F7",
  };
  const operators = ["+", "-", "*", "/", "%"];

  const calculate = (title) => {
    const lastCharIsOperator = operators.includes(result.slice(-1));
    switch (title) {
      case "C":
        setResult("0");
        break;
      case "DL":
        if (result.length === 1) {
          setResult("0");
        } else {
          setResult(result.substring(0, result.length - 1));
        }
        break;
      case "=":
        try {
          const answer = Number(evaluate(result).toFixed(3)).toString();
          setResult(answer);
        } catch (error) {
          return Alert.alert("Warning", "Invalid Expression");
        }
        break;

      default:
        if (result.length === 1 && result === "0") {
          setResult(title);
        } else {
          const currentInputIsOperator = operators.includes(title);
          if (!lastCharIsOperator || !currentInputIsOperator) {
            setResult(result + title);
          }
        }
        break;
    }
  };

  const Button = ({ title, type }) => (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => calculate(title)}
        style={{
          borderRadius: 10,
          elevation: 2,
          backgroundColor: getColors(colors.light1, colors.dark1),
          height: deviceOrientation === "landscape" ? 30 : 70,
          margin: 10,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: deviceOrientation === "landscape" ? 17 : 27,
            color: "black",
            textAlign: "center",
            textAlignVertical: "center",
            color: getButtonColor(type),
            margin: "auto",
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const getColors = (light, dark) => (darkTheme ? dark : light);
  const getButtonColor = (type) => {
    switch (type) {
      case "top":
        return "#35FBD6";
        break;

      case "right":
        return "#EB6363";
        break;

      default:
        return getColors(colors.dark, colors.light);
        break;
    }
  };

  return (
    <View
      style={{
        flex: 1,
        height: "100%",
        width: "100%",
        paddingVertical: 20,
        backgroundColor: getColors(colors.light, colors.dark),
      }}
    >
      <StatusBar
        backgroundColor={getColors(colors.light1, colors.dark1)}
        barStyle={getColors("dark-content", "light-content")}
      />
      <View style={{ flex: 1 }}>
        <Switch
          value={darkTheme}
          onValueChange={() => setDarkTheme(!darkTheme)}
          thumbColor={getColors(colors.dark, colors.light)}
          trackColor={{ true: colors.light2, false: colors.dark2 }}
        />
      </View>
      <View style={{ flex: deviceOrientation === "landscape" ? 5 : 2 }}>
        <Text
          style={{
            fontSize: 40,
            color: getColors(colors.dark, colors.light),
            width: "100%",
            textAlign: "right",
            paddingRight: 20,
            paddingBottom: 20,
          }}
        >
          {result}
        </Text>
        <View
          style={{
            flex: 1,
            backgroundColor: getColors(colors.light1, colors.dark1),
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Button title="C" type="top" />
            <Button title="DL" type="top" />
            <Button title="/" type="top" />
            <Button title="%" type="top" />
          </View>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Button title="7" type="number" />
            <Button title="8" type="number" />
            <Button title="9" type="number" />
            <Button title="*" type="right" />
          </View>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Button title="4" type="number" />
            <Button title="5" type="number" />
            <Button title="6" type="number" />
            <Button title="-" type="right" />
          </View>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Button title="1" type="number" />
            <Button title="2" type="number" />
            <Button title="3" type="number" />
            <Button title="+" type="right" />
          </View>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Button title="00" type="number" />
            <Button title="0" type="number" />
            <Button title="." type="number" />
            <Button title="=" type="right" />
          </View>
        </View>
      </View>
    </View>
  );
}
