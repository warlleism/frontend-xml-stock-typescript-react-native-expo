import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

type IconKey = 'index' | 'formulario';

export default function TabBar({ state, descriptors, navigation }: any) {

    const icons = {
        'index': (props: any) => <AntDesign name="home" size={25} color="#fff" {...props} />,
        'formulario': (props: any) => <AntDesign name="form" size={25} color="#fff" {...props} />,
    };

    const primaryColor = '#000';
    const secondaryColor = '#737373';

    return (
        <View className='absolute bottom-0 py-[20px] w-full flex-row justify-between items-center bg-[#fff]'>
            {state.routes.map((route: any, index: number) => {

                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                if (['_sitemap',
                    '+not-found'
                ].includes(route.name)) return null;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        key={route.key}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarButtonTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ flex: 1, alignItems: 'center' }}
                    >
                        {icons[route.name as IconKey]({
                            color: isFocused ? primaryColor : secondaryColor,
                            size: isFocused ? 27 : 25
                        })}

                        {/* <Text style={{ color: isFocused ? primaryColor : secondaryColor }}>
                            {label.replace('(tabs)/', '') == 'index' ? "Home" : label.replace('(tabs)/', '')}
                        </Text> */}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

