import { Platform } from "react-native";

// Pour un backend local en développement :
// - Android émulateur : http://10.0.2.2:8000
// - iOS simulateur   : http://localhost:8000
// - Appareil réel    : utilisez l'IP locale de votre PC sur le réseau
const LOCAL_ANDROID = "http://10.0.2.2:8000";
const LOCAL_IOS = "http://localhost:8000";
const LOCAL_IP = "http://192.168.1.11:8000";

export const API_URL =
  Platform.OS === "android"
    ? LOCAL_ANDROID
    : Platform.OS === "ios"
    ? LOCAL_IOS
    : LOCAL_IP;
