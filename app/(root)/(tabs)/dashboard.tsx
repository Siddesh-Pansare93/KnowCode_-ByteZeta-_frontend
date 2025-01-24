import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { CircularProgress } from "@/components/CircularProgress";
import { NutrientBar } from "@/components/NutrientBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

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

 const dashboard = () => {
  const [days, setDays] = useState(generateWeekDays());
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      if (now.getHours() === 0 && now.getMinutes() === 0) {
        setDays(generateWeekDays());
      }
    }, 60000); // Check every minute

    return () => clearInterval(timer);
  }, []);

  const handleAddMeal = (mealType: string) => {
    console.log(`Adding ${mealType}`);
  };

  const handleNavigation = (screen: string) => {
    console.log(`Navigating to ${screen}`);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, paddingVertical: 16 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={{
              uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/iPhone%2013%20mini%20-%2014-131akDJnO3GtW3YoI8Iu0ekwSSTvDN.png",
            }}
            style={{ width: 40, height: 40, borderRadius: 20, marginRight: 12 }}
          />
          <View>
            <Text style={{ fontSize: 14, color: "#666" }}>Welcome</Text>
            <Text style={{ fontSize: 16, fontWeight: "600", color: "#333" }}>Siddesh Pansare</Text>
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

      <ScrollView style={{ paddingHorizontal: 20 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#333" }}>Track your diet journey</Text>
          <Image
            source={{
              uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/iPhone%2013%20mini%20-%2014-131akDJnO3GtW3YoI8Iu0ekwSSTvDN.png",
            }}
            style={{ width: 60, height: 60 }}
          />
        </View>

        <Text style={{ fontSize: 16, color: "#FF9B9B", marginBottom: 16 }}>Today Calorie: 1783</Text>

        <View style={{ flexDirection: "row", gap: 16, marginBottom: 24 }}>
          <View style={{ flex: 1, backgroundColor: "#FFF9C4", borderRadius: 16, padding: 16, justifyContent: "center", alignItems: "center" }}>
            <CircularProgress percentage={10} label="Fat" value="928 kcal" />
          </View>

          <View style={{ flex: 1, backgroundColor: "#FFCDD2", borderRadius: 16, padding: 16 }}>
            <NutrientBar
              label="Protein"
              value={22}
              maxValue={50}
              color="#FF9B9B"
              icon={<FontAwesome name="coffee" size={20} color="#333" />}
            />
            <NutrientBar
              label="Carbs"
              value={18}
              maxValue={50}
              color="#FFB74D"
              icon={<FontAwesome name="coffee" size={20} color="#333" />}
            />
            <NutrientBar
              label="Fat"
              value={19}
              maxValue={50}
              color="#90CAF9"
              icon={<FontAwesome name="coffee" size={20} color="#333" />}
            />
          </View>
        </View>

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

        <View style={{ gap: 16, marginBottom: 24 }}>
          {[
            { type: "Breakfast", icon: FontAwesome, iconName: "coffee", calories: "450-650" },
            { type: "Lunch", icon: MaterialCommunityIcons, iconName: "food", calories: "450-650" },
            { type: "Dinner", icon: MaterialCommunityIcons, iconName: "food", calories: "450-650" },
          ].map((meal) => (
            <TouchableOpacity key={meal.type} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "#F5F5F5", borderRadius: 12, padding: 16 }} onPress={() => handleAddMeal(meal.type)}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                <meal.icon name={meal.iconName as any} size={24} color="#333" />
                <View>
                  <Text style={{ fontSize: 16, fontWeight: "600", color: "#333" }}>Add {meal.type}</Text>
                  <Text style={{ fontSize: 14, color: "#666" }}>Recommended {meal.calories} cal</Text>
                </View>
              </View>
              <Text style={{ fontSize: 24, color: "#4CAF50" }}>+</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", paddingVertical: 16, borderTopWidth: 1, borderTopColor: "#E0E0E0" }}>
        {[
          { icon: Ionicons, label: "Home", name: "home-outline" },
          { icon: Ionicons, label: "Recipes", name: "restaurant-outline" },
          { icon: Ionicons, label: "Stats", name: "stats-chart-outline" },
          { icon: Ionicons, label: "Profile", name: "person-outline" },
        ].map((item) => (
          <TouchableOpacity key={item.label} style={{ padding: 8 }} onPress={() => handleNavigation(item.label.toLowerCase())}>
            <item.icon name={item.name as keyof typeof Ionicons.glyphMap} size={24} color="#333" />
          </TouchableOpacity>
        ))}
      </View> */}
    </SafeAreaView>
  );
};


export default dashboard
