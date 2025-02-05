import React, { useState } from 'react';
import { Dimensions, FlatList, Modal, Pressable, ScrollView, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, DataTable, IconButton } from 'react-native-paper';
import useGetProducts, { Product } from '../hooks/useGetProducts';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';

const { width, height } = Dimensions.get('window');

export default function Home() {
    const { data, page, setPage, loading, setLoading } = useGetProducts();
    const [modal, setModal] = useState<boolean>(false);
    const [item, setItem] = useState<Product | null>(null);

    const handlePageChange = (newPage: number) => {
        setLoading(true);
        setPage(newPage);
    };

    const handleSelectItem = (item: Product) => {
        setItem(item)
        setModal(!modal)
    }

    return (
        <>

            {loading && (
                <View className="absolute h-full w-full flex-1 justify-center items-center bg-[#00000052]  z-50">
                    <ActivityIndicator size="large" color="#00A995" />
                </View>
            )}

            <Modal
                animationType="fade"
                transparent={true}
                visible={modal}
                onRequestClose={() => setModal(!modal)}>

                <Pressable onPress={() => setModal(!modal)} className="absolute w-full h-full bg-[#00000033] z-40" />

                <View style={{ top: height / 8 }} className="self-center w-[90vw] bg-white rounded-xl overflow-hidden p-5 gap-3 z-50">
                    <View className="flex-row justify-center items-center relative">
                        <View className="absolute top-9 left-0 w-full h-[2px] bg-[#00A995]" />
                        <Text className="text-[19px] font-bold text-center">{item?.name}</Text>
                    </View>
                    <View className="mt-5 p-4 bg-gray-100 rounded-lg shadow-md gap-2">
                        <Text className="text-xl font-semibold mb-2">Detalhes do Produto</Text>
                        <Text className="text-lg font-bold">ID: <Text className="font-normal">{item?.id}</Text></Text>
                        <Text className="text-lg font-bold">Nome: <Text className="font-normal">{item?.name}</Text></Text>
                        <Text className="text-lg font-bold">Categoria ID: <Text className="font-normal">{item?.categoryid}</Text></Text>
                        <Text className="text-lg font-bold">Preço: <Text className="font-normal">R${item?.price?.toFixed(2)}</Text></Text>
                        <Text className="text-lg font-bold">Quantidade: <Text className="font-normal">{item?.quantity}</Text></Text>
                        <Text className="text-lg font-bold">Descrição: <Text className="font-normal">{item?.description}</Text></Text>
                        <Text className="text-lg font-bold">Dosagem: <Text className="font-normal">{item?.dosage}</Text></Text>
                        <Text className="text-lg font-bold">Laboratório: <Text className="font-normal">{item?.laboratory}</Text></Text>
                        <Text className="text-lg font-bold">Requer Prescrição: <Text className="font-normal">{String(item?.requiresPrescription).toLowerCase() === 'true' ? 'Sim' : 'Não'}</Text></Text>
                        <Text className="text-lg font-bold">Data de Criação: <Text className="font-normal">{item?.createdAt ? new Intl.DateTimeFormat('pt-BR').format(new Date(item?.createdAt)) : 'N/A'}</Text></Text>
                    </View>
                    <TouchableOpacity
                        className=" w-[98%] items-center justify-center self-center bg-[#00A995] h-12 rounded-full shadow-md mt-[10px]"
                        onPress={() => setModal(!modal)}>
                        <Text className="text-white text-2xl">Fechar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            <ScrollView
                horizontal
                contentContainerStyle={{ backgroundColor: "#fff" }}
                showsHorizontalScrollIndicator={false}>
                <DataTable>
                    <DataTable.Header style={{ width: width * 3.5 }}>
                        <DataTable.Title className='justify-center'>Ações</DataTable.Title>
                        <DataTable.Title className='justify-center'>ID</DataTable.Title>
                        <DataTable.Title className='justify-center'>Nome</DataTable.Title>
                        <DataTable.Title className='justify-center'>Categoria</DataTable.Title>
                        <DataTable.Title className='justify-center'>Descrição</DataTable.Title>
                        <DataTable.Title className='justify-center'>Dosagem</DataTable.Title>
                        <DataTable.Title className='justify-center'>Laboratório</DataTable.Title>
                        <DataTable.Title className='justify-center'>Preço</DataTable.Title>
                        <DataTable.Title className='justify-center'>Principio</DataTable.Title>
                        <DataTable.Title className='justify-center'>Quantidade</DataTable.Title>
                        <DataTable.Title className='justify-center'>Requer Prescrição</DataTable.Title>
                        <DataTable.Title className='justify-center'>Cadastro</DataTable.Title>
                    </DataTable.Header>
                    <FlatList
                        data={data?.data}
                        renderItem={({ item }) => (
                            <DataTable.Row
                                style={{ backgroundColor: item.id % 2 === 0 ? '#c6c6c612' : '#fff' }}>
                                <DataTable.Cell style={{ justifyContent: 'center', height: 70, }}>
                                    <View className='flex-row justify-center items-center gap-3'>
                                        <TouchableOpacity onPress={() => handleSelectItem(item)}><Feather name="eye" size={20} color="black" /></TouchableOpacity>
                                        <TouchableOpacity><Feather name="edit" size={20} color="black" /></TouchableOpacity>
                                        <TouchableOpacity><Feather name="trash-2" size={20} color="black" /></TouchableOpacity>
                                    </View>
                                </DataTable.Cell>
                                <DataTable.Cell className="flex justify-center h-16">{item.id}</DataTable.Cell>
                                <DataTable.Cell className="flex justify-center h-16">{item.name}</DataTable.Cell>
                                <DataTable.Cell className="flex justify-center h-16">{item.categoryid}</DataTable.Cell>
                                <DataTable.Cell className="flex justify-center h-16">{item.description}</DataTable.Cell>
                                <DataTable.Cell className="flex justify-center h-16">{item.dosage}</DataTable.Cell>
                                <DataTable.Cell className="flex justify-center h-16">{item.laboratory}</DataTable.Cell>
                                <DataTable.Cell className="flex justify-center h-16">{item.price}</DataTable.Cell>
                                <DataTable.Cell className="flex justify-center h-16">{item.principleactiveid}</DataTable.Cell>
                                <DataTable.Cell className="flex justify-center h-16">{item.quantity}</DataTable.Cell>
                                <DataTable.Cell className="flex justify-center h-16">{String(item.requiresPrescription).toLowerCase() === 'true' ? 'Sim' : 'Não'}</DataTable.Cell>
                                <DataTable.Cell className="flex justify-center h-16">
                                    {new Intl.DateTimeFormat('pt-BR').format(new Date(item.createdAt))}
                                </DataTable.Cell>
                            </DataTable.Row>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        style={{ width: width * 3.5, marginBottom: height / 5.2 }}
                    />
                </DataTable>

            </ScrollView>

            <View className="absolute bg-[#f2f2f2] bottom-[calc(100vh/12)] w-full h-20 flex-row items-center justify-between px-5">
                <TouchableOpacity onPress={() => handlePageChange(page - 1)} disabled={page === 1}
                    className='disabled:opacity-20' >
                    <AntDesign name="left" size={24} color="black" />
                </TouchableOpacity>
                <Text className="text-lg">{page} / {data?.pagination.totalPages}</Text>
                <TouchableOpacity onPress={() => handlePageChange(page + 1)} disabled={page === data?.pagination.totalPages}
                    className='disabled:opacity-20' >
                    <AntDesign name="right" size={24} color="black" />
                </TouchableOpacity>

            </View>
        </>
    );
}