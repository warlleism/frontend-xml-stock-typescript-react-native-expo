import { Controller } from "react-hook-form";
import { Text, View, TextInput } from "react-native";

interface InputTextProps {
    xmlForm?: boolean;
    errors: any;
    control: any;
    register: any;
    name: string;
    icon?: any;
    placeholder: string;
    type: string;
    watch?: any;
}

export default function InputTextContainer({ xmlForm, errors, control, register, name, type, icon, placeholder }: InputTextProps) {
    return (
        <View className={`mb-5 w-full`}>
            <View
                className={`w-full h-[55px] flex flex-row justify-center items-center border-[1px] ${errors && !xmlForm ? 'border-red-500' : 'border-[#00A995]'} overflow-hidden rounded-xl bg-white shadow-sm`}
                style={{ opacity: xmlForm ? 0.2 : 1 }}
                pointerEvents={xmlForm ? "none" : "auto"}
            >
                <View className="w-full h-full flex-row overflow-hidden">
                    <View className="w-[15%] h-full flex-row justify-center items-center border-r-[.6px] border-[#00A995]">
                        {icon}
                    </View>
                    <View className="w-[85%] h-[100%] flex justify-center align-center">
                        {control && (
                            <Controller
                                control={control}
                                name={name}
                                rules={{ required: true }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        {...register(name)}
                                        style={{ paddingLeft: 15 }}
                                        placeholder={placeholder}
                                        placeholderTextColor={"#94a3b8"}
                                        keyboardType={type === "number" ? "numeric" : "default"}
                                        className="w-full bg-white text-[15px] font-light text-black"
                                        onBlur={onBlur}
                                        onChangeText={(text) => {
                                            if (type === "number") {
                                                const numericValue = text.replace(/[^0-9]/g, '');
                                                onChange(numericValue ? parseFloat(numericValue) : '');
                                            } else {
                                                onChange(text);
                                            }
                                        }}
                                        value={value === 0 ? '' : value?.toString() || ''}
                                    />
                                )}
                            />
                        )}
                    </View>
                </View>
            </View>
            {errors && !xmlForm && (
                <Text className="text-red-500 text-[12px] mt-1 ml-1">
                    {errors?.message !== "Required" ? errors?.message : `${name} é obrigatório`}
                </Text>
            )}
        </View>
    );
}