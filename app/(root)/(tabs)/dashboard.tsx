import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native"
import { Home, ChefHat, PieChart, User, Search, Bell, Coffee, UtensilsCrossed } from "lucide-react-native"
import { CircularProgress } from "@/components/CircularProgress"
import { NutrientBar } from "@/components/NutrientBar"
import { SafeAreaView } from "react-native-safe-area-context"

const generateWeekDays = () => {
  const today = new Date()
  const days = []
  for (let i = -3; i <= 3; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    days.push({
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      date: date.getDate(),
      fullDate: date,
    })
  }
  return days
}

const DAYS = [
  { day: "Mon", date: 12 },
  { day: "Tue", date: 13 },
  { day: "Wed", date: 14 },
  { day: "Thu", date: 15 },
  { day: "Fri", date: 16 },
  { day: "Sat", date: 17 },
  { day: "Sun", date: 18 },
]

export const DashboardScreen = () => {
  const [days, setDays] = useState(generateWeekDays())
  const [selectedDate, setSelectedDate] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      if (now.getHours() === 0 && now.getMinutes() === 0) {
        setDays(generateWeekDays())
      }
    }, 60000) // Check every minute

    return () => clearInterval(timer)
  }, [])

  const handleAddMeal = (mealType: string) => {
    // TODO: Implement meal addition logic
    console.log(`Adding ${mealType}`)
  }

  const handleNavigation = (screen: string) => {
    // TODO: Implement navigation logic
    console.log(`Navigating to ${screen}`)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profile}>
          <Image
            source={{
              uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/iPhone%2013%20mini%20-%2014-131akDJnO3GtW3YoI8Iu0ekwSSTvDN.png",
            }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.welcome}>Welcome</Text>
            <Text style={styles.name}>Siddesh Pansare</Text>
          </View>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => handleNavigation("search")}>
            <Search size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigation("notifications")}>
            <Bell size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Track your diet journey</Text>
          <Image
            source={{
              uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/iPhone%2013%20mini%20-%2014-131akDJnO3GtW3YoI8Iu0ekwSSTvDN.png",
            }}
            style={styles.avocado}
          />
        </View>

        <Text style={styles.calories}>Today Calorie: 1783</Text>

        <View style={styles.statsContainer}>
          <View style={styles.intakeCard}>
            <CircularProgress percentage={10} label="Fat" value="928 kcal" />
          </View>

          <View style={styles.nutrientsCard}>
            <NutrientBar
              label="Protein"
              value={22}
              maxValue={50}
              color="#FF9B9B"
              icon={<Coffee size={20} color="#333" />}
            />
            <NutrientBar
              label="Carbs"
              value={18}
              maxValue={50}
              color="#FFB74D"
              icon={<Coffee size={20} color="#333" />}
            />
            <NutrientBar
              label="Fat"
              value={19}
              maxValue={50}
              color="#90CAF9"
              icon={<Coffee size={20} color="#333" />}
            />
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.calendar}>
          {days.map((day) => (
            <TouchableOpacity
              key={day.fullDate.toISOString()}
              style={[
                styles.dayButton,
                selectedDate.getDate() === day.date &&
                  selectedDate.getMonth() === day.fullDate.getMonth() &&
                  styles.selectedDay,
              ]}
              onPress={() => setSelectedDate(day.fullDate)}
            >
              <Text
                style={[
                  styles.dayText,
                  selectedDate.getDate() === day.date &&
                    selectedDate.getMonth() === day.fullDate.getMonth() &&
                    styles.selectedDayText,
                ]}
              >
                {day.day}
              </Text>
              <Text
                style={[
                  styles.dateText,
                  selectedDate.getDate() === day.date &&
                    selectedDate.getMonth() === day.fullDate.getMonth() &&
                    styles.selectedDayText,
                ]}
              >
                {day.date}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.mealsContainer}>
          {[
            { type: "Breakfast", icon: Coffee, calories: "450-650" },
            { type: "Lunch", icon: UtensilsCrossed, calories: "450-650" },
            { type: "Dinner", icon: UtensilsCrossed, calories: "450-650" },
          ].map((meal) => (
            <TouchableOpacity key={meal.type} style={styles.mealButton} onPress={() => handleAddMeal(meal.type)}>
              <View style={styles.mealInfo}>
                <meal.icon size={24} color="#333" />
                <View style={styles.mealText}>
                  <Text style={styles.mealType}>Add {meal.type}</Text>
                  <Text style={styles.mealCalories}>Recommended {meal.calories} cal</Text>
                </View>
              </View>
              <Text style={styles.addButton}>+</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        {[
          { icon: Home, label: "Home" },
          { icon: ChefHat, label: "Recipes" },
          { icon: PieChart, label: "Stats" },
          { icon: User, label: "Profile" },
        ].map((item) => (
          <TouchableOpacity
            key={item.label}
            style={styles.navItem}
            onPress={() => handleNavigation(item.label.toLowerCase())}
          >
            <item.icon size={24} color="#333" />
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  welcome: {
    fontSize: 14,
    color: "#666",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  headerIcons: {
    flexDirection: "row",
    gap: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  avocado: {
    width: 60,
    height: 60,
  },
  calories: {
    fontSize: 16,
    color: "#FF9B9B",
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 24,
  },
  intakeCard: {
    flex: 1,
    backgroundColor: "#FFF9C4",
    borderRadius: 16,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  nutrientsCard: {
    flex: 1,
    backgroundColor: "#FFCDD2",
    borderRadius: 16,
    padding: 16,
  },
  calendar: {
    marginBottom: 24,
  },
  dayButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
  },
  selectedDay: {
    backgroundColor: "#FF9B9B",
  },
  dayText: {
    fontSize: 14,
    color: "#666",
  },
  dateText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  selectedDayText: {
    color: "#fff",
  },
  mealsContainer: {
    gap: 16,
    marginBottom: 24,
  },
  mealButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    padding: 16,
  },
  mealInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  mealText: {
    gap: 4,
  },
  mealType: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  mealCalories: {
    fontSize: 14,
    color: "#666",
  },
  addButton: {
    fontSize: 24,
    color: "#4CAF50",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  navItem: {
    padding: 8,
  },
})

