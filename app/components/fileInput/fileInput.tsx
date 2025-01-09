import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function XmlFilePicker({ setXmlContent, xmlContent }: any) {

    const [fileName, setFileName] = useState<any>(null);
    const handleFilePick = async () => {
        const result = await DocumentPicker.getDocumentAsync({
            type: 'text/xml',
        });

        if (result?.assets) {
            setFileName(result?.assets[0].name);
            setXmlContent(result?.assets);
        }
    };
    return (
        <View>
            <TouchableOpacity
                style={{ backgroundColor: xmlContent ? '#222222' : '#fff', borderColor: xmlContent ? '#222222' : '#737373' }}
                className={`w-[100%] border rounded-md py-5 p-2  justify-center items-center gap-2`}
                onPress={handleFilePick}>
                <AntDesign name="upload" size={20} color={xmlContent ? '#fff' : '#737373'} />
                <Text style={{ color: xmlContent ? '#fff' : '#737373' }}>Selecionar Arquivo (.xml)</Text>
            </TouchableOpacity>
            {xmlContent && (
                <View className='w-full mt-4 flex-row items-center justify-between '>
                    <View className='flex-row items-center gap-2'>
                        <AntDesign name="filetext1" size={20} color="black" />
                        <Text>{fileName}</Text>
                    </View>
                    <TouchableOpacity onPress={() => setXmlContent(null)}>
                        <AntDesign name="close" size={20} color="black" />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};
