import { Image, TouchableOpacity, Button, StyleSheet, Text, View, StatusBar } from 'react-native';
// import { StatusBar } from 'expo-status-bar';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Link } from 'expo-router'

export default function Home() {
  return (
    <View style={index.tela}>
      <StatusBar backgroundColor="transparent" translucent={true}/>
      <Image style={index.fundo} source={require('../assets/images/imgs/pokemonBackground.jpeg')}/>

      <View style={index.principal}>

        <Image style={index.titulo} source={require('../assets/images/imgs/pokemonTitle.png')}/>


        <View style={index.botoes}>
          <Link href="/selecao" asChild>
            <TouchableOpacity style={index.botao}>
              <Text style={index.textBotao}>Jogar</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/help" asChild>
            <TouchableOpacity style={index.botao}>
              <Text style={index.textBotao}>Como Jogar</Text>
            </TouchableOpacity>
          </Link>
        </View>
        
      </View>
    </View>
  );
}



const index = StyleSheet.create({
  tela: {
    display: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  principal: {
    display: 'flex',
    flexDirection: 'collumm',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  titulo: {
    resizeMode: 'contain',
    width: 350,
    height: 350,
    filter: 'drop-shadow(1px 1px 30px #ffffff), drop-shadow(1px 1px 30px #ffffff)'
  },

  botoes: {
    display: 'flex',
    height: '40%',
    flexDirection: 'collum',
    justifyContent: 'space-around'
  },

  Link: {
    width: 'auto',
    height: 'auto'
  },

  botao: {
    width: 200,
    height: 75,
    backgroundColor: '#185acc',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#ffffff',
    borderRadius: 10,
    boxShadow: '1px 1px 50px 1px #ffffff'
  },

  textBotao: {
    color: '#ffffff',
    fontFamily: 'arial',
    fontSize: 20,
    fontWeight: 'bold',
  },

  fundo: {
    position: 'absolute',
    top: -50,
    height: '120%',
    width: '100%',
    zIndex: -1,
    filter: 'blur(1px)',
    filter: 'brightness(0.8)'
  }
});

