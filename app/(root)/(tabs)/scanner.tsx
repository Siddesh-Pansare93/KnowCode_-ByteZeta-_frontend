import { View, StyleSheet } from "react-native";
import React from "react";
import ImageScanner from "@/components/ImageScanner";

const Scanner = () => {
  return (
    <View style={styles.container}>
      <ImageScanner />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB", // Light background color
  },
});

export default Scanner;
