import { StatusBar } from 'expo-status-bar';
import { useState } from 'react'
import { Image, Switch, TouchableOpacity, Button, StyleSheet, Text, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useLinkProps } from '@react-navigation/native';
import { useRouter } from 'expo-router'
import { Link } from 'expo-router'

export default function Selecao() {

  const listagem = []

  const [valor, setValor] = useState(Array(9).fill(false));
  const [error, setError] = useState([])

  const router = useRouter();

  function confirmar() {

    let valorzinho = 0
    const geracao = []

    valor.forEach( (num, index) => {
      
      if (num) {
        valorzinho += 1;
        const numero = index + 1
        if (!geracao.includes(numero)) {
          geracao.push(numero)
        }
      }
    })
    console.log(geracao)
    if (valorzinho > 0) {
      router.push({
        pathname: "/play",
        params: { generation: JSON.stringify(geracao)}
      });
    } else {
      setError([
        <>
          <View style={selecao.containerErro} key={"erros"}>
            <Text style={selecao.erro}>Selecione no mínimo uma opção!!</Text>
          </View>
        </>
      ])
    }

  }

  for (let i = 0; i < 9; i++) {

    listagem.push(
      <View key={i} style={selecao.conjunto}>
        <Text style={selecao.testinho}>Geração {i+1}</Text>
        <Switch style={selecao.radio} trackColor={{ false: "#95a5a6", true: "#2c3e50"}} thumbColor={!valor ? "#7f8c8d" : "f1c40f"}
        onValueChange={() => {const copia = [...valor]; copia[i] = !copia[i]; setValor(copia);}} value={valor[i]}/>
      </View>
    )
  }

  return (
    <View style={selecao.tela}>

      <Link style={selecao.link} href="/">
        <TouchableOpacity style={selecao.voltar}>
          <Text style={selecao.voltarText}>Voltar</Text>
        </TouchableOpacity>
      </Link>

      <StatusBar backgroundColor="transparent" translucent={true}/>
      <Image style={selecao.fundo} source={require('../assets/images/imgs/pokemonBackground.jpeg')}/>
      <View style={selecao.main}>
        <Text style={selecao.texto}>Escolha com quais gerações deseja jogar</Text>
        {listagem}

        <TouchableOpacity style={selecao.botaoConfirmar} onPress={confirmar}>
          <Text style={selecao.textoConf}>Confirmar</Text>  
        </TouchableOpacity>

        {error}
      </View>
    </View>
  );
 }


const selecao = StyleSheet.create({
    containerErro: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      alignItems: 'center',
      marginBlock: 12
    },
    erro: {
      fontFamily: 'arial',
      color: '#ff5555',
      fontWeight: 'bold',
      fontSize: 14,
      marginInline: 'auto'
    },
    tela: {
      display: 'flex',
      height: '100%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    fundo: {
      position: 'absolute',
      top: -50,
      height: '120%',
      width: '100%',
      zIndex: -1,
      filter: 'blur(1px)',
      filter: 'brightness(0.8)'
    },
    main: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      width: '70%',
      minHeight: '60%',
      height: 'auto',
      padding: 30,
      backgroundColor: '#ffffff',
      borderRadius: 25,
      boxShadow: '5px 3px 10px 1px #404040'
    },
    texto: {
      fontFamily: 'arial',
      fontWeight: 'bold',
      color: '#000000',
      textAlign: 'center',
      marginBottom: 20,
      fontSize: 20
    },
    conjunto: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    testinho: {
      fontFamily: 'arial',
      fontSize: 17,
      fontWeight: 'bold',
      marginRight: 25
    },
    botaoConfirmar: {
      width: 'auto',
      height: 'auto',
      paddingInline: 20,
      paddingBlock: 15,
      backgroundColor: '#185acc',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      margin: 'auto',
      marginTop: 20
    },
    textoConf: {
      fontFamily: 'arual',
      fontWeight: 'bold',
      color: '#ffffff'
    },
    link: {
      position: 'absolute',
      top: 25,
      left: 25,
      zIndex: 3
    },
    voltar: {
      position: 'absolute',
      backgroundColor: '#ffffff',
      top: 25,
      left: 25,
      padding: 10,
      borderRadius: 6,
    },
    voltarText: {
      fontFamily: 'arial',
      fontWeight: 'bold',
    }
})