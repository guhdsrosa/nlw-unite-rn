import { useState } from "react";
import {
   View,
   StatusBar,
   Text,
   ScrollView,
   TouchableOpacity,
   Alert,
   Modal,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import { Header } from "@/components/header";
import { Credential } from "@/components/credential";
import { Button } from "@/components/button";
import { colors } from "@/styles/colors";
import { QRCode } from "@/components/qrcode";

export default function Ticket() {
   const [image, setImage] = useState("");
   const [expandQRCode, setExpandQRCode] = useState<boolean>(false);

   async function handleSelectImage() {
      try {
         const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
         });

         if (result.assets) {
            setImage(result.assets[0].uri);
         }
      } catch (error) {
         console.log(error);
         Alert.alert("Foto", "Não foi possível selecionar a imagem.");
      }
   }

   return (
      <View className="flex-1 bg-green-500">
         <StatusBar barStyle="light-content" />

         <Header title="Minha Credencial" />

         <ScrollView
            className="-mt-28 -z-10"
            contentContainerClassName="px-8 pb-8"
            showsVerticalScrollIndicator={false}
         >
            <Credential
               image={image}
               onChangeAvatar={handleSelectImage}
               onExpandQRCode={() => setExpandQRCode(true)}
            />

            <FontAwesome
               name="angle-double-down"
               size={24}
               color={colors.gray[300]}
               className="self-center my-6"
            />

            <Text className="text-white font-bold text-2xl mt-4">
               Compartilhar credencial
            </Text>

            <Text className="text-white font-regular text-base mt-1 mb-6">
               Mostre ao mundo que você vai participar do Unite Summit!
            </Text>

            <Button title="Compartilhar" />

            <TouchableOpacity activeOpacity={0.7} className="mt-10">
               <Text className="text-base text-white font-bold text-center">
                  Remover Ingresso
               </Text>
            </TouchableOpacity>
         </ScrollView>

         <Modal
            visible={expandQRCode}
            statusBarTranslucent
            animationType="fade"
         >
            <View className="flex-1 bg-green-500 items-center justify-center">
               <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setExpandQRCode(false)}
               >
                  <QRCode value="teste" size={300} />
                  <Text className="font-bold text-orange-500 text-sm mt-10 text-center">
                     Fechar QRCode
                  </Text>
               </TouchableOpacity>
            </View>
         </Modal>
      </View>
   );
}