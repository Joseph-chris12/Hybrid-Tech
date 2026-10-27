import { router } from "expo-router";
import { Pressable, Text, View } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';



export default function Home() {
  return (
        <View className="flex-1 bg-slate-100 px-5 pt-16">
          <Pressable onPress={() => router.push("/Login")}>
            <Text>Ke Login</Text>
           </Pressable>
        </View>
  );
}