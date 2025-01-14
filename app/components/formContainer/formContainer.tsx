import { View } from "react-native";

export default function FormContainer({ children, xmlForm, height }: { children: React.ReactNode, xmlForm: boolean, height?: number }) {
    return (
        <View

            className={`w-full flex flex-row justify-center items-center  border-[.9px] border-[#8298ab] overflow-hidden rounded-lg`}
            style={{ opacity: xmlForm ? 0.2 : 1, height: height ? height : 60 }}
            pointerEvents={xmlForm ? "none" : "auto"}
        >
            {children}
        </View>
    );
}