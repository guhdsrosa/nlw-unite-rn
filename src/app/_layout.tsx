import "@/styles/global.css";

//Libs
import { Slot } from "expo-router";

//Components
import { Loading } from "@/components/loading";

//Font
import {
   useFonts,
   Roboto_700Bold,
   Roboto_500Medium,
   Roboto_400Regular,
} from "@expo-google-fonts/roboto";

export default function Layout() {
   const [fontsLoaded] = useFonts({
      Roboto_700Bold,
      Roboto_500Medium,
      Roboto_400Regular,
   });

   if (!fontsLoaded) {
      return <Loading />;
   }

   return <Slot />;
}
