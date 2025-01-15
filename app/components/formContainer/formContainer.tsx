import { View } from "react-native";

export default function FormContainer({ children, xmlForm }: { children: React.ReactNode, xmlForm: boolean }) {
    return (
        <View

            className={`w-full flex flex-row justify-center items-center  border-[.9px] border-[#8298ab] overflow-hidden rounded-lg`}
            style={{ opacity: xmlForm ? 0.2 : 1, height: 60 }}
            pointerEvents={xmlForm ? "none" : "auto"}
        >
            {children}
        </View>
    );
}