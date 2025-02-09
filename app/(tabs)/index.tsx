import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, Modal, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, DataTable } from 'react-native-paper';
import useGetProducts, { Product } from '../hooks/useGetProducts';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Modalize } from 'react-native-modalize';
import ModalizeEdit from '../components/modalizeEdit/modalizeEdit';
import DeleteButton from '../components/deleteButton/deleteButton';
import useGetSearchProducts from '../hooks/useGetSearchProducts';

const { width, height } = Dimensions.get('window');

export default function Home() {

    const { data, setData, page, setPage, loading, setLoading } = useGetProducts();
    const { getSearchProducts, filteredProducts } = useGetSearchProducts();
    const [modal, setModal] = useState<boolean>(false);
    const [deleteModal, setDeleteModal] = useState<boolean>(false)
    const [item, setItem] = useState<Product | null>(null);
    const modalizeRef = useRef<Modalize>(null);

    const onOpen = (item: Product) => {
        setItem(item)
        modalizeRef.current?.open();
    };

    const handlePageChange = (newPage: number) => {
        setLoading(true);
        setPage(newPage);
    };

    const handleSelectItem = (item: Product) => {
        setItem(item)
        setModal(!modal)
    }

    const handleSearch = async (text: string) => {
        const response = await getSearchProducts(text)
    }

    const renderData = filteredProducts.length > 0 ? filteredProducts : data?.data;
    return (
        <View
            style={{ height: "100%", width: width, display: 'flex' }}
        >
            {loading && (<View className="absolute h-full w-full flex-1 justify-center items-center bg-[#00000052]  z-50"><ActivityIndicator size="large" color="#00A995" /></View>)}
            <ModalizeEdit item={item} modalizeRef={modalizeRef} />
            <Modal
                animationType="fade"
                transparent={true}
                visible={modal}
                onRequestClose={() => setModal(!modal)}>
                <Pressable onPress={() => setModal(!modal)} className="absolute w-full h-full bg-[#00000033] z-40" />
                <View style={{ top: height / 8 }} className="self-center w-[90vw] bg-white rounded-xl overflow-hidden p-5 gap-5 z-50">
                    <View className="flex-row justify-center items-center relative">
                        <View className="absolute top-9 left-0 w-full h-[2px] bg-[#00A995]" />
                        <Text className="text-[19px] font-bold text-center">{item?.name}</Text>
                    </View>
                    <View className="mt-5 p-4 bg-gray-100 rounded-lg shadow-md gap-2">
                        <Text className="text-xl font-semibold mb-2">Detalhes do Produto</Text>
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
            <Modal
                animationType="fade"
                transparent={true}
                visible={deleteModal}
                onRequestClose={() => setDeleteModal(!deleteModal)}>
                <Pressable onPress={() => setDeleteModal(!deleteModal)} className="absolute w-full h-full bg-[#00000033] z-40" />
                <View style={{ top: height / 3 }} className="self-center w-[90vw] bg-white rounded-xl overflow-hidden p-5 gap-5 z-50">
                    <Text className="text-[19px] font-bold text-start">Confirmar Exclusão</Text>
                    <Text className="text-lg text-start">Você tem certeza que deseja excluir este item?</Text>
                    <View className="flex-row justify-between mt-5">
                        <DeleteButton data={data} setData={setData} setModal={setDeleteModal} url={"http://192.168.0.167:3000/product/get"} id={item?.id as number} />
                        <TouchableOpacity
                            className="w-[48%] items-center justify-center bg-[#00A995] h-12 rounded-full shadow-md"
                            onPress={() => setDeleteModal(!deleteModal)}>
                            <TouchableOpacity onPress={() => setModal(!modal)}>
                                <Feather name="x" size={24} color="white" />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <View style={{ width: width, height: "100%" }}>
                <View
                    style={{ width: width }}
                    className='flex-row h-[60px] bg-[#00A995] items-center justify-around'         >
                    <View
                        style={{ opacity: filteredProducts.length === 0 ? 1 : 0.2, pointerEvents: filteredProducts.length === 0 ? 'auto' : 'none' }}
                        className="flex-row justify-around items-center w-[30%] h-[70%]">
                        <TouchableOpacity onPress={() => handlePageChange(page - 1)} disabled={page === 1}
                            className='disabled:opacity-20 rounded-full bg-[#0000001d] p-1' >
                            <AntDesign name="left" size={15} color="white" />
                        </TouchableOpacity>
                        <Text className="text-lg font-semibold text-white">{page} / {data?.pagination.totalPages}</Text>
                        <TouchableOpacity onPress={() => handlePageChange(page + 1)} disabled={page === data?.pagination.totalPages}
                            className='disabled:opacity-20 rounded-full bg-[#0000001d] p-1' >
                            <AntDesign name="right" size={15} color="white" />
                        </TouchableOpacity>
                    </View>
                    <View className="flex-row items-center bg-white rounded-md shadow-md px-2 w-[60%] h-[70%]">
                        <AntDesign name="search1" size={15} color="gray" />
                        <TextInput
                            onChangeText={handleSearch}
                            placeholder="Buscar..."
                            className="flex-1 h-[90%] text-[10px] text-black font-normal"
                        />
                    </View>
                </View>
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
                            data={renderData}
                            renderItem={({ item }) => (
                                <DataTable.Row
                                    style={{ backgroundColor: item.id % 2 === 0 ? '#c6c6c612' : '#fff' }}>
                                    <DataTable.Cell
                                        className="justify-center align-center h-20">
                                        <View className='flex-row justify-center items-center gap-3'>
                                            <TouchableOpacity onPress={() => handleSelectItem(item)}><Feather name="eye" size={20} color="black" /></TouchableOpacity>
                                            <TouchableOpacity onPress={() => onOpen(item)}><Feather name="edit" size={20} color="black" /></TouchableOpacity>
                                            <TouchableOpacity onPress={() => {
                                                setItem({ ...item, id: item.id })
                                                setDeleteModal(!deleteModal)
                                            }}><Feather name="trash-2" size={20} color="black" /></TouchableOpacity>
                                        </View>
                                    </DataTable.Cell>
                                    <DataTable.Cell className="flex justify-center h-20">{item.id}</DataTable.Cell>
                                    <DataTable.Cell className="flex justify-center h-20">{item.name}</DataTable.Cell>
                                    <DataTable.Cell className="flex justify-center h-20">{item.categoryid}</DataTable.Cell>
                                    <DataTable.Cell className="flex justify-center h-20">{item.description}</DataTable.Cell>
                                    <DataTable.Cell className="flex justify-center h-20">{item.dosage}</DataTable.Cell>
                                    <DataTable.Cell className="flex justify-center h-20">{item.laboratory}</DataTable.Cell>
                                    <DataTable.Cell className="flex justify-center h-20">{item.price}</DataTable.Cell>
                                    <DataTable.Cell className="flex justify-center h-20">{item.principleactiveid}</DataTable.Cell>
                                    <DataTable.Cell className="flex justify-center h-20">{item.quantity}</DataTable.Cell>
                                    <DataTable.Cell className="flex justify-center h-20">{String(item.requiresPrescription).toLowerCase() === 'true' ? 'Sim' : 'Não'}</DataTable.Cell>
                                    <DataTable.Cell className="flex justify-center h-20">
                                        {new Intl.DateTimeFormat('pt-BR').format(new Date(item.createdAt))}
                                    </DataTable.Cell>
                                </DataTable.Row>
                            )}
                            keyExtractor={(item) => item.id.toString()}
                            showsVerticalScrollIndicator={false}
                            style={{ width: width * 3.5 }}
                        />
                    </DataTable>
                </ScrollView>
            </View>
        </View>
    );
}