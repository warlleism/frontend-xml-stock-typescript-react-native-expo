import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Toast } from 'toastify-react-native';
import axios from 'axios';
import Entypo from '@expo/vector-icons/Entypo';

export default function XmlFilePicker({ setXmlForm }: any) {

    const [fileName, setFileName] = useState<any>(null);
    const [xmlContent, setXmlContent] = useState<any>();

    const handleFilePick = async () => {
        const result = await DocumentPicker.getDocumentAsync({
            type: 'text/xml',
        });

        if (result?.assets) {
            setFileName(result?.assets[0].name);
            setXmlContent(result?.assets);
            setXmlForm(true)
        }
    };

    const sendFile = async () => {
        try {
            if (!xmlContent) {
                alert("Por favor, selecione um arquivo.");
                return;
            }

            const apiUrl = "http://192.168.0.166:3000/product/create"
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
            setFileName(null);
            setXmlForm(false)
        } catch (error) {
            console.error("Erro ao enviar o arquivo:", error);
            setXmlForm(false)
        }
    };

    return (
        <View>
            {xmlContent && (
                <View className='w-full mb-4 mt-4 flex-row items-center justify-between '>
                    <View />
                    <TouchableOpacity
                        className='flex-row items-center gap-2'
                        onPress={() => {
                            setXmlForm(false)
                            setXmlContent(null)
                        }}>
                        <Text>Remover</Text>
                        <Entypo name="trash" size={20} color="black" />
                    </TouchableOpacity>
                </View>
            )}
            <TouchableOpacity
                style={{ backgroundColor: xmlContent ? '#222222' : '#fff', borderColor: xmlContent ? '#222222' : '#737373' }}
                className={`w-[100%] border rounded-full py-5 p-2  justify-center items-center gap-2`}
                onPress={handleFilePick}>
                <AntDesign name={xmlContent ? "filetext1" : "upload"} size={20} color={xmlContent ? '#fff' : '#737373'} />
                {
                    fileName ? <Text style={{ color: xmlContent ? '#fff' : '#737373' }}>{fileName}</Text> : <Text style={{ color: xmlContent ? '#fff' : '#737373' }}>Selecionar Arquivo (.xml)</Text>
                }

            </TouchableOpacity>

            {
                xmlContent && <TouchableOpacity className="mb-1 mt-4 w-full bg-black rounded-full py-8 p-2" onPress={sendFile}>
                    <Text className="text-white text-center text-xl">Enviar (.xml)</Text>
                </TouchableOpacity>
            }

        </View>
    );
};
