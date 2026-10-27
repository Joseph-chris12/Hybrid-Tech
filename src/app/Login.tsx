import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

const Login = () => {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-[#F6FAFB]"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerClassName="grow items-center justify-between p-6"
        contentContainerStyle={{ paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="my-auto w-full max-w-sm items-center">
          <View className="mb-8 items-center">
            <View className="relative mb-4 h-24 w-24 items-center justify-center">
              <View className="absolute inset-0 scale-105 rounded-full bg-[#FFF3F5] shadow-sm" />
              <Image
                source={{
                  uri: '/Users/a/code/chacing 2.1/assets/chacing_icon.png',
                }}
                accessibilityLabel="Maskot Chacing"
                className="h-20 w-20 rounded-full"
                resizeMode="cover"
              />
            </View>

            <Text className="mb-1.5 text-3xl font-extrabold tracking-tight text-[#1F2937]">
              Chacing
            </Text>

            <Text className="text-sm font-medium text-[#6B7280]">Catat jajan, budget aman.</Text>
          </View>

          <View className="w-full gap-4 rounded-3xl border border-[#FED1D6]/60 bg-white p-6 shadow-sm">
            <View>
              <Text className="mb-1.5 text-xs font-bold uppercase tracking-wider text-[#1F2937]">
                Email
              </Text>
              <View className="relative">
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="nama@email.com"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  className="w-full rounded-2xl border border-[#FED1D6] bg-white px-4 py-3.5 pr-10 text-sm font-medium text-[#1F2937] focus:border-[#FB6E7F]"
                />
                <View pointerEvents="none" className="absolute inset-y-0 right-3.5 justify-center">
                  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#FB6E7F" strokeWidth={2}>
                    <Path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </Svg>
                </View>
              </View>
            </View>

            <View>
              <View className="mb-1.5 flex-row items-center justify-between">
                <Text className="text-xs font-bold uppercase tracking-wider text-[#1F2937]">
                  Kata Sandi
                </Text>
                <Pressable>
                  <Text className="text-xs font-semibold text-[#B6505C]">Lupa sandi?</Text>
                </Pressable>
              </View>
              <View className="relative">
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Masukkan kata sandi"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoComplete="password"
                  className="w-full rounded-2xl border border-[#FB6E7F] bg-white px-4 py-3.5 pr-10 text-sm font-medium text-[#1F2937] focus:border-[#FB6E7F]"
                />
                <Pressable
                  onPress={() => setShowPassword((value) => !value)}
                  accessibilityRole="button"
                  accessibilityLabel={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                  className="absolute inset-y-0 right-2.5 justify-center p-1"
                >
                  {({ pressed }) => (
                    <Svg
                      width={16}
                      height={16}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={pressed ? '#DB606F' : '#B6505C'}
                      strokeWidth={2}
                    >
                      <Path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <Path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </Svg>
                  )}
                </Pressable>
              </View>
            </View>

            <View className="pt-2">
              <Pressable className="w-full flex-row items-center justify-center gap-2 rounded-2xl bg-[#DB606F] px-4 py-3.5 shadow-md shadow-[#DB606F]/25 active:scale-[0.99] active:bg-[#c94e5d]">
                <Text className="text-base font-bold text-white">Masuk</Text>
                <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={2.5}>
                  <Path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </Svg>
              </Pressable>
            </View>
          </View>

          <View className="mt-4 w-full flex-row items-center justify-center gap-3">
            <View className="h-px flex-1 bg-[#FED1D6]" />
            <Text className="text-[10px] font-semibold uppercase tracking-widest text-[#6B7280]">atau</Text>
            <View className="h-px flex-1 bg-[#FED1D6]" />
          </View>

          <Pressable className="mt-3.5 w-full flex-row items-center justify-center gap-2 rounded-2xl border border-[#FED1D6] bg-white px-4 py-3 shadow-sm active:bg-[#FFF3F5]/60">
            <Svg width={16} height={16} viewBox="0 0 24 24">
              <Path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <Path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <Path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <Path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </Svg>
            <Text className="text-xs font-semibold text-[#1F2937]">Lanjutkan dengan Google</Text>
          </Pressable>
        </View>

        <View className="w-full max-w-sm flex-row items-center justify-center py-4">
          <Text className="text-sm text-[#6B7280]">Belum punya akun?</Text>
          <Pressable className="ml-1">
            <Text className="text-sm font-bold text-[#B6505C]">Daftar</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
