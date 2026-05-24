import Constants from 'expo-constants';
import { Platform } from 'react-native';

/** 
 * Geliştirme: fiziksel cihazdan Mac/PC backend’ine erişim için bilgisayarın yerel IPv4 adresi 
 * Dinamik olarak Expo'nun çalıştığı makinenin IP adresini alır.
 */

// Varsayılan fallback IP (Kendi localhost'unuz)
let BACKEND_IP = 'localhost'; 

const debuggerHost = Constants.expoConfig?.hostUri;

if (Platform.OS === 'web') {
  // Web tarayıcısında çalışıyorsa (örneğin npx expo start sonrasında w'ye basıldıysa)
  // Mevcut URL'in host kısmını (localhost veya ağ IP'si) otomatik alır.
  BACKEND_IP = window.location.hostname;
} else if (__DEV__ && debuggerHost) {
  // Expo mobil uygulamasındayken, hostUri üzerinden PC'nin IP'sini otomatik al
  BACKEND_IP = debuggerHost.split(':')[0];
} else if (__DEV__ && Platform.OS === 'android') {
  // Android emülatör üzerinde çalışıyorsa fallback
  BACKEND_IP = '10.0.2.2';
}

export const API_BASE_URL = `http://${BACKEND_IP}:5000`;

export const ANALYZE_IMAGE_URL = `${API_BASE_URL}/api/analyze`;
export const ANALYZE_QR_URL = `${API_BASE_URL}/api/analyze-url`;
export const NOTIFY_FAMILY_URL = `${API_BASE_URL}/api/notify-family`;
