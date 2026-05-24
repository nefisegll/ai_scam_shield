import { useCallback, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getUserSession, saveUserSession } from '../services/authStorage';
import { colors } from '../theme/colors';
import type { UserSession } from '../types/auth';

export type AuthScreenProps = {
  onAuthenticated: (session: UserSession) => void;
};

type AuthMode = 'login' | 'register';

export function AuthScreen({ onAuthenticated }: AuthScreenProps) {
  const [mode, setMode] = useState<AuthMode>('login');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [loginPhone, setLoginPhone] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [regFullName, setRegFullName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regFamilyEmail, setRegFamilyEmail] = useState('');

  const clearError = useCallback(() => setError(null), []);

  const handleLogin = useCallback(async () => {
    console.log("Login button pressed");
    clearError();
    if (loginPhone.trim() === '' || loginPassword.trim() === '') {
      setError('Lütfen tüm alanları doldurun.');
      return;
    }
    
    setLoading(true);
    try {
      const stored = await getUserSession();
      // isLoggedIn false olsa da kayıtlı telefon + şifre doğruysa girişe izin ver
      if (
        stored == null ||
        stored.phoneNumber.trim() !== loginPhone.trim() ||
        stored.password !== loginPassword
      ) {
        setError('Telefon numarası veya şifre hatalı.');
        setLoading(false);
        return;
      }
      const updated: UserSession = { ...stored, isLoggedIn: true };
      await saveUserSession(updated);
      console.log("Login success");
      onAuthenticated(updated);
    } catch (err) {
      console.log("Auth error:", err);
      Alert.alert("Hata", "İşlem sırasında bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  }, [
    clearError,
    loginPassword,
    loginPhone,
    onAuthenticated,
  ]);

  const handleRegister = useCallback(async () => {
    console.log("Register button pressed");
    clearError();
    const fullName = regFullName.trim();
    const phoneNumber = regPhone.trim();
    const password = regPassword;
    const familyEmail = regFamilyEmail.trim();

    if (
      fullName === '' ||
      phoneNumber === '' ||
      password === '' ||
      familyEmail === ''
    ) {
      setError('Lütfen tüm alanları doldurun.');
      return;
    }
    if (!familyEmail.includes('@')) {
      setError('Lütfen geçerli bir e-posta adresi girin.');
      return;
    }

    setLoading(true);
    try {
      const session: UserSession = {
        fullName,
        phoneNumber,
        password,
        familyEmail,
        isLoggedIn: true,
      };
      await saveUserSession(session);
      console.log("Register success");
      onAuthenticated(session);
    } catch (err) {
      console.log("Auth error:", err);
      Alert.alert("Hata", "İşlem sırasında bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  }, [
    clearError,
    onAuthenticated,
    regFamilyEmail,
    regFullName,
    regPassword,
    regPhone,
  ]);

  const switchToRegister = useCallback(() => {
    setError(null);
    setMode('register');
  }, []);

  const switchToLogin = useCallback(() => {
    setError(null);
    setMode('login');
  }, []);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 8 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.heroTitle}>AI Scam Shield</Text>
          <Text style={styles.heroSubtitle}>
            Güvenli kullanım için giriş yap
          </Text>

          <View style={styles.card}>
            {error != null ? (
              <View style={styles.errorBanner}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            {mode === 'login' ? (
              <>
                <Text style={styles.label}>Telefon Numarası</Text>
                <TextInput
                  style={styles.input}
                  value={loginPhone}
                  onChangeText={(t) => {
                    setLoginPhone(t);
                    if (error) setError(null);
                  }}
                  placeholder="05xx xxx xx xx"
                  placeholderTextColor={colors.textMuted}
                  keyboardType="phone-pad"
                  autoCapitalize="none"
                  autoCorrect={false}
                  accessibilityLabel="Telefon numarası"
                />

                <Text style={styles.label}>Şifre</Text>
                <TextInput
                  style={styles.input}
                  value={loginPassword}
                  onChangeText={(t) => {
                    setLoginPassword(t);
                    if (error) setError(null);
                  }}
                  placeholder="••••••••"
                  placeholderTextColor={colors.textMuted}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  accessibilityLabel="Şifre"
                />

                <Pressable
                  style={({ pressed }) => [
                    styles.primaryButton,
                    pressed && { opacity: 0.88 },
                    loading && { opacity: 0.5 }
                  ]}
                  onPress={handleLogin}
                  disabled={loading}
                  accessibilityRole="button"
                  accessibilityLabel="Giriş Yap"
                >
                  <Text style={styles.primaryButtonText}>Giriş Yap</Text>
                </Pressable>

                <Pressable
                  style={({ pressed }) => [
                    styles.linkButton,
                    pressed && { opacity: 0.7 },
                    loading && { opacity: 0.5 }
                  ]}
                  onPress={switchToRegister}
                  disabled={loading}
                  accessibilityRole="button"
                  accessibilityLabel="Kayıt ol"
                >
                  <Text style={styles.linkButtonText}>
                    Hesabın yok mu? Kayıt ol
                  </Text>
                </Pressable>
              </>
            ) : (
              <>
                <Text style={styles.label}>Ad Soyad</Text>
                <TextInput
                  style={styles.input}
                  value={regFullName}
                  onChangeText={(t) => {
                    setRegFullName(t);
                    if (error) setError(null);
                  }}
                  placeholder="Adınız Soyadınız"
                  placeholderTextColor={colors.textMuted}
                  autoCapitalize="words"
                  accessibilityLabel="Ad Soyad"
                />

                <Text style={styles.label}>Telefon Numarası</Text>
                <TextInput
                  style={styles.input}
                  value={regPhone}
                  onChangeText={(t) => {
                    setRegPhone(t);
                    if (error) setError(null);
                  }}
                  placeholder="05xx xxx xx xx"
                  placeholderTextColor={colors.textMuted}
                  keyboardType="phone-pad"
                  autoCapitalize="none"
                  autoCorrect={false}
                  accessibilityLabel="Kayıt telefon numarası"
                />

                <Text style={styles.label}>Şifre</Text>
                <TextInput
                  style={styles.input}
                  value={regPassword}
                  onChangeText={(t) => {
                    setRegPassword(t);
                    if (error) setError(null);
                  }}
                  placeholder="••••••••"
                  placeholderTextColor={colors.textMuted}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  accessibilityLabel="Kayıt şifresi"
                />

                <Text style={styles.label}>Yakının E-posta Adresi</Text>
                <TextInput
                  style={styles.input}
                  value={regFamilyEmail}
                  onChangeText={(t) => {
                    setRegFamilyEmail(t);
                    if (error) setError(null);
                  }}
                  placeholder="ornek@email.com"
                  placeholderTextColor={colors.textMuted}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  accessibilityLabel="Yakın e-posta"
                />

                <Pressable
                  style={({ pressed }) => [
                    styles.primaryButton,
                    pressed && { opacity: 0.88 },
                    loading && { opacity: 0.5 }
                  ]}
                  onPress={handleRegister}
                  disabled={loading}
                  accessibilityRole="button"
                  accessibilityLabel="Kayıt Ol"
                >
                  <Text style={styles.primaryButtonText}>Kayıt Ol</Text>
                </Pressable>

                <Pressable
                  style={({ pressed }) => [
                    styles.linkButton,
                    pressed && { opacity: 0.7 },
                    loading && { opacity: 0.5 }
                  ]}
                  onPress={switchToLogin}
                  disabled={loading}
                  accessibilityRole="button"
                  accessibilityLabel="Giriş yap"
                >
                  <Text style={styles.linkButtonText}>
                    Zaten hesabın var mı? Giriş yap
                  </Text>
                </Pressable>
              </>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 32,
    justifyContent: 'center',
  },
  heroTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.textPrimary,
    textAlign: 'center',
    letterSpacing: -0.6,
  },
  heroSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 28,
    lineHeight: 22,
  },
  card: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 24,
    elevation: 8,
  },
  errorBanner: {
    backgroundColor: colors.riskHighSurface,
    borderWidth: 1,
    borderColor: colors.riskHighBorder,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 18,
  },
  errorText: {
    color: colors.danger,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 8,
    marginTop: 4,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 14 : 12,
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: 14,
  },
  primaryButton: {
    backgroundColor: colors.buttonPick,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  primaryButtonText: {
    color: colors.buttonOnPrimary,
    fontSize: 17,
    fontWeight: '700',
  },
  linkButton: {
    marginTop: 18,
    paddingVertical: 10,
    alignItems: 'center',
  },
  linkButtonText: {
    color: colors.accent,
    fontSize: 15,
    fontWeight: '600',
  },
});
