import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";
import TaskItem from "../components/TaskItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Keyboard,
  StyleSheet,
  Platform,
  Alert,
} from "react-native";

interface Task {
  id: string;
  text: string;
  completo: boolean;
}

const STORAGE_KEY = "@tasks";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    saveTasks();
  }, [tasks]);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedTasks !== null) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
      Alert.alert("Erro", "Não foi possível carregar as tarefas salvas");
    }
  };

  const saveTasks = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error("Erro ao salvar tarefas:", error);
      Alert.alert("Erro", "Não foi possível salvar as tarefas");
    }
  };

  const handleAdicionaTask = () => {
    if (!newTask.trim()) {
      return Alert.alert("Erro", "A tarefa não pode ser vazia", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
    const task: Task = {
      id: Date.now().toString(),
      text: newTask,
      completo: false,
    };
    setTasks((prev) => [task, ...prev]);
    setNewTask("");
    Keyboard.dismiss();
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completo: !task.completo } : task
      )
    );
  };

  const removeTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const clearAllTasks = async () => {
    Alert.alert(
      "Limpar Tarefas",
      "Tem certeza que deseja limpar todas as tarefas?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Limpar",
          style: "destructive",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem(STORAGE_KEY);
              setTasks([]);
            } catch (error) {
              console.error("Erro ao limpar tarefas:", error);
            }
          },
        },
      ]
    );
  };

  const criado = tasks.length;
  const completo = tasks.filter((t) => t.completo).length;

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.inputContainer}
      >
        <TextInput
          placeholder="Adicionar uma nova tarefa"
          placeholderTextColor="#888"
          style={styles.input}
          value={newTask}
          onChangeText={setNewTask}
          onSubmitEditing={handleAdicionaTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAdicionaTask}>
          <Ionicons name="add-circle-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </KeyboardAvoidingView>

      <View style={styles.counters}>
        <Text style={styles.criado}>Criadas {criado}</Text>
        <Text style={styles.completo}>Concluídas {completo}</Text>
      </View>

      {tasks.length === 0 ? (
        <View style={styles.emptyBox}>
          <Ionicons name="document-text-outline" size={48} color="#555" />
          <Text style={styles.emptyText}>
            Você ainda não tem tarefas cadastradas
          </Text>
          <Text style={styles.emptyText}>
            Crie tarefas e organize seus itens a fazer
          </Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onToggle={() => toggleTask(item.id)}
              onRemove={() => removeTask(item.id)}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#191919" },
  inputContainer: {
    flexDirection: "row",
    margin: 16,
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: "#222",
    borderRadius: 8,
    padding: 12,
    color: "#fff",
  },
  addButton: {
    backgroundColor: "#1E6F9F",
    borderRadius: 8,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  counters: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginBottom: 8,
    alignItems: "center",
  },
  criado: { color: "#4EA8DE", fontWeight: "bold" },
  completo: { color: "#8284FA", fontWeight: "bold" },
  clearText: { 
    color: "#FF6B6B", 
    fontWeight: "bold",
    fontSize: 12,
  },
  emptyBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  emptyText: { color: "#555", marginTop: 8, textAlign: "center" },
});