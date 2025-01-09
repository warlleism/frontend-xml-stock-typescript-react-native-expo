import React, { useState, useTransition } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Toast } from 'toastify-react-native';
import axios from 'axios';
import Entypo from '@expo/vector-icons/Entypo';
import { ActivityIndicator } from '@react-native-material/core';

export default function XmlFilePicker({ setXmlForm, reset }: any) {

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
            setXmlForm(true)
        }
        setIsPending(false);
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
            setFile(null);
            setXmlForm(false)
            reset()
        } catch (error) {
            console.error("Erro ao enviar o arquivo:", error);
            setXmlForm(false)
            setFile(null);
        }
    };

    return (
        <View>
            {xmlContent && (
                <View className='w-full mb-3 flex-row items-center justify-between '>
                    <View />
                    <TouchableOpacity
                        className='flex-row items-center gap-2'
                        onPress={() => {
                            setXmlForm(false)
                            setFile(null);
                            setXmlContent(null)
                        }}>
                        <Text>Remover</Text>
                        <Entypo name="trash" size={20} color="black" />
                    </TouchableOpacity>
                </View>
            )}
            <TouchableOpacity
                style={{ backgroundColor: '#fff', borderColor: xmlContent ? '#b9b9b9' : '#737373' }}
                className={`w-[100%] border rounded-sm py-6 p-2  justify-center items-center gap-1 border-dashed`}
                onPress={handleFilePick}>
                <AntDesign
                    className={`${isPending ? 'hidden' : 'flex'} `}
                    name={xmlContent ? "filetext1" : "upload"} size={20} color={xmlContent ? '#4a4a4a' : '#737373'} />

                {
                    isPending ? <ActivityIndicator color="#737373" /> :
                        file ?
                            (
                                <>
                                    <Text style={{ color: '#4a4a4a', fontWeight: "600" }}>{file.name}</Text>
                                    <Text style={{ color: '#737373', fontWeight: "600", fontSize: 10 }}>{file.size}KB</Text>
                                </>
                            )
                            :
                            <Text style={{ color: xmlContent ? '#fff' : '#737373' }}>Selecionar Arquivo (.xml)</Text>
                }

            </TouchableOpacity>

            {
                xmlContent && <TouchableOpacity className="mb-1 mt-4 w-full bg-[#000000] rounded-sm  py-6" onPress={sendFile}>
                    <Text className="text-white text-center text-xl">Enviar (.xml)</Text>
                </TouchableOpacity>
            }

        </View>
    );
};
