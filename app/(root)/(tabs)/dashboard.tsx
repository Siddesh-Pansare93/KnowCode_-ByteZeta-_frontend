import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Pressable } from "react-native";
import { useSelector } from "react-redux";
import { CircularProgress } from "@/components/CircularProgress";
import { NutrientBar } from "@/components/NutrientBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const generateWeekDays = () => {
  const today = new Date();
  const days = [];
  for (let i = -3; i <= 3; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    days.push({
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      date: date.getDate(),
      fullDate: date,
    });
  }
  return days;
};

const Dashboard = () => {
  const [days, setDays] = useState(generateWeekDays());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const user = useSelector((state: any) => state.user.userData);
  const dietData = useSelector((state: any) => state.user.diet);
  // const dailyInsights = useSelector((state: any) => state.insights.dailyInsights);

  const { name, profilePicture } = user || {};
  const { nutrients, calorieIntake } = dietData || {};

  const dailyInsights: string[] = [
    "Add BreakFast", "Add Dinner", "Add Lunch"
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      if (now.getHours() === 0 && now.getMinutes() === 0) {
        setDays(generateWeekDays());
      }
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleNavigation = (screen: string) => {
    console.log(`Navigating to ${screen}`);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, paddingVertical: 16 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={{
              uri: profilePicture || "https://via.placeholder.com/40",
            }}
            style={{ width: 40, height: 40, borderRadius: 20, marginRight: 12 }}
          />
          <View>
            <Text style={{ fontSize: 14, color: "#666" }}>Welcome</Text>
            <Text style={{ fontSize: 16, fontWeight: "600", color: "#333" }}>{name || "User"}</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", gap: 16 }}>
          <TouchableOpacity onPress={() => handleNavigation("search")}>
            <Ionicons name="search-outline" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigation("notifications")}>
            <Ionicons name="notifications-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={{ paddingHorizontal: 20 }}>
        {/* Header */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#333" }}>Track your diet journey</Text>
          <Image
            source={{
              uri: profilePicture || "https://via.placeholder.com/60",
            }}
            style={{ width: 60, height: 60 }}
          />
        </View>

        <Text style={{ fontSize: 16, color: "#FF9B9B", marginBottom: 16 }}>
          Today Calorie: {calorieIntake || 0}
        </Text>

        {/* Nutrient Progress */}
        <View style={{ flexDirection: "row", gap: 16, marginBottom: 24 }}>
          <View style={{ flex: 1, backgroundColor: "#FFF9C4", borderRadius: 16, padding: 16, justifyContent: "center", alignItems: "center" }}>
            <CircularProgress percentage={nutrients?.Fat || 0} label="Fat" value={`${nutrients?.Fat || 0} kcal`} />
          </View>

          <View style={{ flex: 1, backgroundColor: "#FFCDD2", borderRadius: 16, padding: 16 }}>
            <NutrientBar label="Protein" value={nutrients?.Proteins || 0} maxValue={100} color="#FF9B9B" icon={undefined} />
            <NutrientBar label="Carbs" value={nutrients?.Carbohydrates || 0} maxValue={100} color="#FFB74D" icon={undefined} />
            <NutrientBar label="Fat" value={nutrients?.Fats || 0} maxValue={100} color="#90CAF9" icon={undefined} />
          </View>
        </View>

        {/* Date Picker */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 24 }}>
          {days.map((day) => (
            <TouchableOpacity
              key={day.fullDate.toISOString()}
              style={[
                { paddingHorizontal: 16, paddingVertical: 8, marginRight: 8, borderRadius: 20, backgroundColor: "#F5F5F5", alignItems: "center" },
                selectedDate.getDate() === day.date &&
                selectedDate.getMonth() === day.fullDate.getMonth() && { backgroundColor: "#FF9B9B" },
              ]}
              onPress={() => setSelectedDate(day.fullDate)}
            >
              <Text
                style={[
                  { fontSize: 14, color: "#666" },
                  selectedDate.getDate() === day.date &&
                  selectedDate.getMonth() === day.fullDate.getMonth() && { color: "#fff" },
                ]}
              >
                {day.day}
              </Text>
              <Text
                style={[
                  { fontSize: 16, fontWeight: "600", color: "#333" },
                  selectedDate.getDate() === day.date &&
                  selectedDate.getMonth() === day.fullDate.getMonth() && { color: "#fff" },
                ]}
              >
                {day.date}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Daily Insights Section */}
        <View style={{ gap: 16, marginBottom: 24 }}>
          <Text style={{ fontSize: 20, fontWeight: "600", color: "#333", marginBottom: 8 }}>Daily Insights</Text>
          <Pressable>|
            {(dailyInsights || []).map((insight: string, index: number) => (
              <View
                key={index}
                style={{
                  backgroundColor: "#F5F5F5",
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 8,
                }}
              >

                <Text style={{ fontSize: 16, fontWeight: "500", color: "#333" }}>{insight}</Text>
              </View>
            ))}
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
