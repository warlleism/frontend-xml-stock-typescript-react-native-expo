import { Dimensions, FlatList, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from "react";
import { Controller } from "react-hook-form";

const { width, height } = Dimensions.get('window');

interface InputPickerProps {
    xmlForm: boolean;
    errors: any;
    control: any;
    register: any;
    name: string;
    icon?: any;
    placeholder: string;
    options: Array<{ label: string; value: any }>;
}

export default function InputPickerContainer({ xmlForm, errors, control, register, name, icon, placeholder, options }: InputPickerProps) {

    const [modal, setModal] = useState<boolean>(false);
    const [optionsList, setOptionsList] = useState([] as any);
    const [selected, setSelected] = useState<any>(null);

    const handleModal = () => {
        setModal(!modal);
    }

    const handleSelect = (value: any) => {
        setModal(false);
        setSelected(value.label);
    }

    const handleSearch = (text: string) => {
        const filteredOptions = options.filter((option: any) => option.label.toLowerCase().includes(text.toLowerCase()));
        setOptionsList(filteredOptions);
    }

    const optionsListRender = optionsList.length > 0 ? optionsList : options;

    return (
        <>
            <Modal
                transparent={true}
                visible={modal}
                onRequestClose={handleModal}
            >
                <View style={{ width, height }} className="absolute top-0 left-0 bg-[#00000033] bg-opacity-50 flex justify-center items-center z-50">
                    <View className="w-[90%] h-[80%] bg-white rounded-xl p-4">
                        <View className="flex flex-row justify-between items-center border-b-[.6px] border-[#0e0e0e3b] w-full h-[50px]">
                            <View className="h-full w-[90%]">
                                <TextInput
                                    placeholder={'Pesquisar...'}
                                    placeholderTextColor={"#94a3b8"}
                                    onChangeText={handleSearch}
                                    className="w-full text-[#000000] font-light text-[14px]"
                                />
                            </View>
                            <View className="flex justify-center items-center w-[10%] h-full">
                                <AntDesign name="search1" size={24} color="#8c8c8c" />
                            </View>
                        </View>
                        <FlatList
                            data={optionsListRender}
                            renderItem={({ item }) => (
                                <Controller
                                    control={control}
                                    name={name}
                                    rules={{ required: true }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TouchableOpacity
                                            {...register(name)}
                                            onPress={() => {
                                                onChange(item.value);
                                                handleSelect(item);
                                            }}
                                            className="w-full h-[50px] flex-row items-center px-3 border-b-[.6px] border-[#0e0e0e3b] my-2"
                                        >
                                            <Text className="text-[#000000] text-[15px] font-light">{item.label}</Text>
                                        </TouchableOpacity>

                                    )}
                                />
                            )}
                            keyExtractor={item => item.value.toString()}
                        />
                    </View>
                </View>
            </Modal>

            <View className={`${xmlForm ? "mb-1" : "mb-4"}`}
                style={{ opacity: xmlForm ? 0.2 : 1 }}
                pointerEvents={xmlForm ? "none" : "auto"}
            >
                <TouchableOpacity className={`flex-row overflow-hidden rounded-md border-[.9px] ${errors && !xmlForm ? 'border-red-500' : 'border-[#00A995]'}`} onPress={handleModal}>
                    <View className="w-[15%] h-[50px] flex-row justify-center items-center border-r-[.6px] border-[#00A995]">
                        {icon}
                    </View>
                    <View className="w-[85%] h-full flex-row justify-between items-center px-3">
                        {selected ? <Text className="text-[16px] font-normal text-black">{selected}</Text> : <Text className="text-[#94a3b8]">{placeholder} </Text>}
                        <AntDesign name="caretdown" size={15} color="#00A995" />
                    </View>
                </TouchableOpacity>
                {errors && !xmlForm && (
                    <Text className="text-red-500 text-[12px] mt-1 ml-1">
                        {errors?.message !== "Required" ? errors?.message : `${name} é obrigatório`}
                    </Text>
                )}
            </View>
        </>
    );
}
