import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
} from "react-native";

import Footer from "../components/Footer";

import { useNavigation } from "@react-navigation/native";

const DAYS_HEADER = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

const MONTHS = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  const day = new Date(year, month, 1).getDay();
  return (day + 6) % 7;
}

const TIME_SLOTS = [
  "9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM",
  "3:00 PM", "5:00 PM", "7:00 PM", "8:30 PM",
];

export default function Calendrier() {
    const navigation = useNavigation();

  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [selectedTime, setSelectedTime] = useState("7:00 PM");
  const [showTimePicker, setShowTimePicker] = useState(false);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
    setSelectedDay(null);
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
    setSelectedDay(null);
  };

  // Build calendar grid cells
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  // fill trailing
  while (cells.length % 7 !== 0) cells.push(null);

  const formattedDate = selectedDay
    ? `${String(selectedDay).padStart(2, "0")}/${String(currentMonth + 1).padStart(2, "0")} à ${selectedTime}`
    : `-- / -- à ${selectedTime}`;

  return (
    <>
    <View style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#8B0000" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn}>
          <Text style={styles.backIcon} onPress={() => navigation.navigate("Recherche")}>‹</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuBtn}>
          <Text style={styles.menuIcon}>⋮</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        {/* Sport Banner */}
        <View style={styles.banner}>
          <View style={styles.bannerOverlay} />
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>FOOTBALL</Text>
            <TouchableOpacity>
              <Text style={styles.heartIcon}>♡</Text>
            </TouchableOpacity>
          </View>
          {/* Futsal ball decoration */}
          <View style={styles.ballDecoration}>
            <Text style={styles.ballEmoji}>⚽</Text>
          </View>
        </View>

        {/* Calendar Section */}
        <View style={styles.calendarContainer}>
          {/* Month Nav */}
          <View style={styles.monthNav}>
            <Text style={styles.monthTitle}>
              {MONTHS[currentMonth]} {currentYear}
            </Text>
            <View style={styles.navArrows}>
              <TouchableOpacity onPress={prevMonth} style={styles.arrowBtn}>
                <Text style={styles.arrowText}>‹</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={nextMonth} style={styles.arrowBtn}>
                <Text style={styles.arrowText}>›</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Day Headers */}
          <View style={styles.daysHeader}>
            {DAYS_HEADER.map((d) => (
              <View key={d} style={styles.dayHeaderCell}>
                <Text style={styles.dayHeaderText}>{d}</Text>
              </View>
            ))}
          </View>

          {/* Calendar Grid */}
          <View style={styles.grid}>
            {cells.map((day, idx) => {
              if (!day) {
                return <View key={`empty-${idx}`} style={styles.cell} />;
              }
              const isSelected = day === selectedDay;
              const isToday =
                day === today.getDate() &&
                currentMonth === today.getMonth() &&
                currentYear === today.getFullYear();
              return (
                <TouchableOpacity
                  key={`day-${day}`}
                  style={[
                    styles.cell,
                    isSelected && styles.cellSelected,
                    isToday && !isSelected && styles.cellToday,
                  ]}
                  onPress={() => setSelectedDay(day)}
                >
                  <Text
                    style={[
                      styles.cellText,
                      isSelected && styles.cellTextSelected,
                      isToday && !isSelected && styles.cellTextToday,
                    ]}
                  >
                    {day}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Time Picker */}
        <TouchableOpacity
          style={styles.timePicker}
          onPress={() => setShowTimePicker(!showTimePicker)}
        >
          <Text style={styles.timePickerText}>{formattedDate}</Text>
          <Text style={styles.timePickerArrow}>
            {showTimePicker ? "▲" : "▼"}
          </Text>
        </TouchableOpacity>

        {showTimePicker && (
          <View style={styles.timeDropdown}>
            {TIME_SLOTS.map((t) => (
              <TouchableOpacity
                key={t}
                style={[
                  styles.timeOption,
                  selectedTime === t && styles.timeOptionSelected,
                ]}
                onPress={() => {
                  setSelectedTime(t);
                  setShowTimePicker(false);
                }}
              >
                <Text
                  style={[
                    styles.timeOptionText,
                    selectedTime === t && styles.timeOptionTextSelected,
                  ]}
                >
                  {t}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        
        <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.confirmBtn}>
          <Text style={styles.confirmText}>CONFIRMER</Text>
          <Text style={styles.confirmArrow}>›</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
      
    </View>

    <Footer />
    </>
  );
}

const DARK_RED = "#8B0000";


const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  backBtn: { padding: 6 },
  backIcon: { fontSize: 28, color: "#222", fontWeight: "300" },
  menuBtn: { padding: 6 },
  menuIcon: { fontSize: 22, color: "#222" },

  

  // Banner
  banner: {
    marginHorizontal: 16,
    borderRadius: 16,
    backgroundColor: DARK_RED,
    height: 160,
    overflow: "hidden",
    marginBottom: 20,
    justifyContent: "flex-start",
  },
  bannerOverlay: {
    
    backgroundColor: "rgba(0,0,0,0.15)",
  },
  bannerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  bannerTitle: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "800",
    letterSpacing: 2,
  },
  heartIcon: { color: "#fff", fontSize: 22 },
  ballDecoration: {
    position: "absolute",
    right: 20,
    bottom: 10,
  },
  ballEmoji: {
    fontSize: 90,
    opacity: 0.85,
  },

  // Calendar
  calendarContainer: {
    paddingHorizontal: 16,
  },
  monthNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  navArrows: { flexDirection: "row" },
  arrowBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  arrowText: { fontSize: 22, color: "#555", fontWeight: "300" },

  daysHeader: {
    flexDirection: "row",
    marginBottom: 4,
  },
  dayHeaderCell: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 4,
  },
  dayHeaderText: {
    fontSize: 12,
    color: "#888",
    fontWeight: "700",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  cell: {
    width: `${70 / 5}%`,
    aspectRatio: 2,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  cellSelected: {
    backgroundColor: DARK_RED,
    borderRadius: 50,
    marginVertical: 9,
  },
  cellToday: {
    borderWidth: 1.5,
    borderColor: DARK_RED,
    borderRadius: 50,
    marginVertical: 9,
  },
  cellText: {
    fontSize: 15,
    color: "#333",
    fontWeight: "400",
  },
  cellTextSelected: {
    color: "#fff",
    fontWeight: "700",
  },
  cellTextToday: {
    color: DARK_RED,
    fontWeight: "700",
  },

  // Time Picker
  timePicker: {
    marginHorizontal: 16,
    borderWidth: 1.5,
    borderColor: "#ddd",
    borderRadius: 50,
    paddingVertical: 14,
    paddingHorizontal: 22,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  timePickerText: {
    fontSize: 15,
    color: "#333",
    fontWeight: "500",
  },
  timePickerArrow: {
    fontSize: 13,
    color: "#555",
  },

  timeDropdown: {
    marginHorizontal: 16,
    marginTop: 4,
    borderWidth: 1.5,
    borderColor: "#ddd",
    borderRadius: 16,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  timeOption: {
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  timeOptionSelected: {
    backgroundColor: DARK_RED,
  },
  timeOptionText: {
    fontSize: 15,
    color: "#333",
  },
  timeOptionTextSelected: {
    color: "#fff",
    fontWeight: "700",
  },

  // Footer
  btnContainer: {
    paddingHorizontal: 16,
    paddingBottom: 28,
    paddingTop: 12,
    backgroundColor: "#fff",
  },
  confirmBtn: {
    backgroundColor: DARK_RED,
    borderRadius: 50,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    
  },
  confirmText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  confirmArrow: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "300",
  },
});
