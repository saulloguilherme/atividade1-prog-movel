import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Task {
  id: string;
  text: string;
  completo: boolean;
}

interface Props {
  task: Task;
  onToggle: () => void;
  onRemove: () => void;
}

export default function TaskItem({ task, onToggle, onRemove }: Props) {
  return (
    <View style={styles.task}>
      <TouchableOpacity onPress={onToggle}>
        <Ionicons
          name={task.completo ? "checkmark-circle" : "ellipse-outline"}
          size={24}
          color={task.completo ? "#8284FA" : "#4EA8DE"}
        />
      </TouchableOpacity>
      <Text style={[styles.text, task.completo && styles.completo]}>{task.text}</Text>
      <TouchableOpacity onPress={onRemove}>
        <Ionicons name="trash-outline" size={22} color="#888" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  task: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#262626",
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 4,
    justifyContent: "space-between",
  },
  text: {
    flex: 1,
    marginHorizontal: 8,
    color: "#fff",
  },
  completo: {
    textDecorationLine: "line-through",
    color: "#777",
  },
});
