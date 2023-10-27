import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  DrawerLayoutAndroid,
  Button,
} from "react-native";
import { enableScreens } from "react-native-screens";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useState, useRef, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

enableScreens(false);

export default function App() {
  const [puzzles, setPuzzles] = useState([]);
  const [randomPuzzle, setRandomPuzzle] = useState(null);

  const drawer = useRef(null);

  const navigationView = () => (
    <View style={{ marginTop: 40, padding: 10, flex: 1, flexDirection: "col" }}>
      <View style={{ alignSelf: "flex-end" }}>
        <TouchableOpacity onPress={() => drawer.current.closeDrawer()}>
          <Ionicons name="close" size={40} color="black" />
        </TouchableOpacity>
      </View>
      <View>
        <Text>Menu 1</Text>
      </View>
    </View>
  );

  const fetchPuzzles = async () => {
    const response = await fetch(
      "https://raw.githubusercontent.com/ananduremanan/Demo/main/puzzle.json"
    );
    const data = await response.json();
    setPuzzles(data);
  };

  useEffect(() => {
    fetchPuzzles();
  }, []);

  const indexMaker = () => {
    if (puzzles.length > 0) {
      const randomIndex = Math.floor(Math.random() * puzzles.length);
      setRandomPuzzle(puzzles[randomIndex].puzzle);
    }
  };

  useEffect(() => {
    indexMaker();
  }, [puzzles]);

  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor="#fff" />
      <DrawerLayoutAndroid
        ref={drawer}
        drawerWidth={300}
        drawerPosition={"left"}
        renderNavigationView={navigationView}
      >
        <View style={styles.container}>
          <View style={{ marginTop: 20 }}>
            <TouchableOpacity onPress={() => drawer.current.openDrawer()}>
              <Ionicons name="menu" size={40} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.logo}>
            <Image
              source={require("./assets/logo.png")}
              style={{ width: 300, height: 80 }}
              resizeMode="contain"
            />
          </View>
          <View style={styles.card}>
            {randomPuzzle && (
              <Text style={styles.emojiView}>{randomPuzzle}</Text>
            )}
          </View>
          <View style={styles.buttonField}>
            <TouchableOpacity onPress={() => indexMaker()} style={styles.btns}>
              <Ionicons name="refresh" size={30} color="black" />
              <Text>Reload</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btns}>
              <Ionicons name="eye" size={30} color="black" />
              <Text>Show Answer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btns}>
              <Ionicons name="share" size={30} color="black" />
              <Text>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      </DrawerLayoutAndroid>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  card: {
    borderRadius: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 20,
      height: 20,
    },
    shadowOpacity: 1,
    shadowRadius: 60,
    elevation: 6,
    justifyContent: "center",
    alignItems: "center",
    height: "50%",
  },
  logo: {
    marginBottom: 20,
    borderRadius: 20,
    backgroundColor: "#E5E4E2",
    shadowColor: "#000",
    shadowOffset: {
      width: 20,
      height: 20,
    },
    shadowOpacity: 1,
    shadowRadius: 60,
    elevation: 6,
  },
  emojiView: {
    fontSize: 100,
  },
  buttonField: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  btns: {
    borderRadius: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 20,
      height: 20,
    },
    shadowOpacity: 1,
    shadowRadius: 60,
    elevation: 6,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
