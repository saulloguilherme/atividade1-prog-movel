import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.textcontainer}>
      <Image style={styles.rocket} source={require("../assets/rocket.png")}></Image>
      <Text style={styles.logo}>to</Text>
      <Text style={styles.logo2}>do</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rocket: {
    marginTop: 10,
    marginRight: 10
  },
  header: {
    alignItems: "center",
    padding: 16,
    height: "15%",
    backgroundColor: "#0d0d0d",
    alignContent: "center",
    justifyContent: "center",
  },
  logo: {
    fontSize: 45,
    fontWeight: "bold",
    color: "#4EA8DE",
  },
  logo2: {
    fontSize: 45,
    fontWeight: "bold",
    color: "#5E60CE"

  },
  textcontainer: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  }
  
});

export default Header;