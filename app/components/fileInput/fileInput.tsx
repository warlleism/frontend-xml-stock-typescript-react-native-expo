import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Toast } from 'toastify-react-native';
import axios from 'axios';
import { ActivityIndicator } from '@react-native-material/core';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function XmlFilePicker({ setXmlForm, reset, url }: any) {

    const [file, setFile] = useState<{ name: string, size: number | undefined } | null>(null);
    const [isPending, setIsPending] = useState(false);
    const [xmlContent, setXmlContent] = useState<any>();

    const handleFilePick = async () => {
        setIsPending(true);
        const result = await DocumentPicker.getDocumentAsync({
            type: 'text/xml',
        });

        if (result?.assets) {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setFile({ name: result?.assets[0].name, size: result?.assets[0].size });
            setXmlContent(result?.assets);
            setXmlForm(true);
        }
        setIsPending(false);

    };

    const sendFile = async () => {
        try {
            if (!xmlContent) {
                alert("Por favor, selecione um arquivo.");
                return;
            }

            const apiUrl = url;
            const formData = new FormData();
            const file = xmlContent[0];

            const xmlFile = {
                name: file.name,
                uri: file.uri,
                type: file.mimeType,
                size: file.size
            };

            formData.append("file", xmlFile as any);

            const { data } = await axios.post(apiUrl, formData, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
                },
            });

            Toast.success("Cadastrado feito com sucesso!");
            setXmlContent(null);
            setFile(null);
            setXmlForm(false);
            reset();
        } catch (error) {
            console.error("Erro ao enviar o arquivo:", error);
            Toast.error("Erro ao enviar o arquivo!");
            setXmlForm(false);
            setFile(null);
        }
    };

    const resetFilds = () => {
        setXmlForm(false);
        setFile(null);
        setXmlContent(null);
    };

    return (
        <View>
            <TouchableOpacity
                style={{ backgroundColor: '#fff', borderColor: "#00A995" }}
                className={`w-[100%] h-[120px] border rounded-sm py-6 p-2  justify-center items-center gap-1 border-dashed`}
                onPress={handleFilePick}>
                <MaterialCommunityIcons className={`relative ${isPending ? 'hidden' : 'flex'}`} name={xmlContent ? "file-document-multiple-outline" : "upload"} size={20} color={"#00A995"} />
                {
                    xmlContent && (
                        <View className='absolute top-3 right-3'>
                            <View />
                            <TouchableOpacity
                                className='rounded-full h-[40px] w-[40px] bg-[#F7F7F7] justify-center items-center'
                                onPress={() => resetFilds()}>
                                <Entypo name="trash" size={20} color="#FF0033" />
                            </TouchableOpacity>
                        </View>
                    )
                }

                {isPending ?
                    <ActivityIndicator color="#00A995" /> :
                    file ?
                        <View className="flex-col items-center">
                            <Text style={{ color: '#4a4a4a', fontWeight: "600" }}>{file.name}</Text>
                            <Text style={{ color: '#737373', fontWeight: "600", fontSize: 10 }}>{file.size}KB</Text>
                        </View>
                        :
                        <View className="flex-col items-center">
                            <Text style={{ color: '#737373' }}>Selecionar Arquivo (.xml)</Text>
                            <Text style={{ color: '#B2B2B2', fontSize: 10 }}>Enviar produtos através de um arquivo</Text>
                        </View>
                }
            </TouchableOpacity>

            <TouchableOpacity className={`${xmlContent ? 'flex' : 'hidden'} mb-1 mt-4 w-full bg-[#00A995] rounded-sm py-6 flex-row gap-2 justify-center items-center`} onPress={sendFile}>
                <Ionicons name="send-sharp" size={24} color="white" />
                <Text className="text-white text-center text-xl">Enviar (.xml)</Text>
            </TouchableOpacity>
        </View>
    );
}