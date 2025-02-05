import React, { useState } from 'react';
import { Dimensions, FlatList, Modal, Pressable, ScrollView, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, DataTable, IconButton } from 'react-native-paper';
import useGetProducts from '../hooks/useGetProducts';
import Feather from '@expo/vector-icons/Feather';

const { width, height } = Dimensions.get('window');

export default function Home() {
    const { data, loading, page, setPage } = useGetProducts();
    const [modal, setModal] = useState<boolean>(false);
    const [item, setItem] = useState<any>(null)

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };


    return (
        <>
            <Modal transparent={true} visible={modal} onRequestClose={() => setModal(!modal)}>
                <View
                    onTouchStart={() => setModal(!modal)}
                    style={{ width, height }}
                    className="absolute top-0 left-0 bg-[#00000033] bg-opacity-50 flex justify-center items-center z-40" />

                <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: width * 0.9, height: height * 0.7 }} className=" bg-white rounded-xl p-4 z-50">
                        <View className='flex flex-row justify-between items-center'>
                            <Text className='text-2xl font-bold'>Detalhes do Produto</Text>
                            <IconButton icon="close" size={20} onPress={() => setModal(!modal)} />
                        </View>
                        <View className="p-4">
                            <Text className='text-[15px] font-semibold mt-3'>ID: {item?.id}</Text>
                            <Text className='text-[15px] font-semibold mt-3'>Nome: {item?.name}</Text>
                            <Text className='text-[15px] font-semibold mt-3'>Categoria ID: {item?.categoryId}</Text>
                            <Text className='text-[15px] font-semibold mt-3'>Preço: {item?.price}</Text>
                            <Text className='text-[15px] font-semibold mt-3'>Quantidade: {item?.quantity}</Text>
                            <Text className='text-[15px] font-semibold mt-3'>Descrição: {item?.description}</Text>
                            <Text className='text-[15px] font-semibold mt-3'>Dosagem: {item?.dosage}</Text>
                            <Text className='text-[15px] font-semibold mt-3'>Laboratório: {item?.laboratory}</Text>
                            <Text className='text-[15px] font-semibold mt-3'>Requer Prescrição: {item?.requiresPrescription ? "Sim" : "Não"}</Text>
                            <Text className='text-[15px] font-semibold mt-3'>Data de Criação:  {item?.createdAt ? new Intl.DateTimeFormat('pt-BR')?.format(new Date(item?.createdAt)) : ''}</Text>
                        </View>
                    </View>
                </View>
            </Modal>

            {loading && (
                <View className='absolute w-full h-full bg-[#00000057] justify-center items-center z-50'>
                    <ActivityIndicator size="large" color="#00A995" />
                </View>
            )}

            <ScrollView horizontal className='bg-white'>
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
                                        <TouchableOpacity className=''>
                                            <Feather onPress={() => {
                                                setItem(item)
                                                setModal(!modal)
                                            }}
                                                name="eye" size={20} color="black" />
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <Feather name="edit" size={20} color="black" />
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <Feather name="trash-2" size={20} color="black" />
                                        </TouchableOpacity>
                                    </View>
                                </DataTable.Cell>
                                <DataTable.Cell style={{ justifyContent: 'center', height: 70 }}>{item.id}</DataTable.Cell>
                                <DataTable.Cell style={{ justifyContent: 'center', height: 70 }}>{item.name}</DataTable.Cell>
                                <DataTable.Cell style={{ justifyContent: 'center', height: 70 }}>{item.categoryid}</DataTable.Cell>
                                <DataTable.Cell style={{ justifyContent: 'center', height: 70 }}>{item.description}</DataTable.Cell>
                                <DataTable.Cell style={{ justifyContent: 'center', height: 70 }}>{item.dosage}</DataTable.Cell>
                                <DataTable.Cell style={{ justifyContent: 'center', height: 70 }}>{item.laboratory}</DataTable.Cell>
                                <DataTable.Cell style={{ justifyContent: 'center', height: 70 }}>{item.price}</DataTable.Cell>
                                <DataTable.Cell style={{ justifyContent: 'center', height: 70 }}>{item.principleactiveid}</DataTable.Cell>
                                <DataTable.Cell style={{ justifyContent: 'center', height: 70 }}>{item.quantity}</DataTable.Cell>
                                <DataTable.Cell style={{ justifyContent: 'center', height: 70 }}>{item.requiresPrescription === true ? 'Sim' : 'Não'}</DataTable.Cell>
                                <DataTable.Cell style={{ justifyContent: 'center', height: 70 }}>
                                    {new Intl.DateTimeFormat('pt-BR').format(new Date(item.createdAt))}
                                </DataTable.Cell>
                            </DataTable.Row>
                        )}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        style={{ width: width * 3.5, marginBottom: height / 5.2 }}
                    />
                </DataTable>

            </ScrollView >

            <View
                style={{ position: 'absolute', backgroundColor: '#f2f2f2', bottom: height / 12, width: width, height: 80, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <IconButton
                    icon="chevron-left"
                    onPress={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                />
                <Text style={{ fontSize: 20 }}>{page} de {data?.pagination.total}</Text>
                <IconButton
                    icon="chevron-right"
                    onPress={() => handlePageChange(page + 1)}
                    disabled={page === data?.pagination.totalPages}
                />
            </View>
        </>

    );
}