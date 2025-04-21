import { Image, TouchableOpacity, Button, StyleSheet, Text, View, StatusBar } from 'react-native';
// import { StatusBar } from 'expo-status-bar';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Link } from 'expo-router'

export default function Home() {
  return (
    <View style={helpi.tela}>
      <Link style={helpi.link} href="/">
        <TouchableOpacity style={helpi.voltar}>
          <Text style={helpi.voltarText}>Voltar</Text>
        </TouchableOpacity>
      </Link>
      <StatusBar backgroundColor="transparent" translucent={true}/>
      <Image style={helpi.fundo} source={require('../assets/images/imgs/pokemonBackground.jpeg')}/>

      <View style={helpi.principal}>

        <Image style={helpi.titulo} source={require('../assets/images/imgs/pokemonTitle.png')}/>


        <View style={helpi.main}>
          <Text style={helpi.textoMaior}>Conceito</Text>
          <Text style={helpi.texto}>Olá para jogar é simples você terá um pokemon sortido onde você terá que adivinhar qual pokemon é.</Text>
          
          <Text style={helpi.textoMaior}>Detalhes</Text>
          <Text style={helpi.texto}>O jogo dá algumas dicas com base nos chutes que você for fazendo, pode usar tabela pokemon, quando você acertar o pokemon a tela irá reiniciar.</Text>
          
          <Text style={helpi.textoMaior}>Selecao</Text>
          <Text style={helpi.texto}>O jogo dá opção de escolher quais gerações você podera escolher para achar o pokemon.</Text>

          <Text style={helpi.textoMaior}>Mecânicas</Text>
          <Text style={helpi.texto}>Durante o jogo as tentativas do jogador tem números, como o da geração ou evolução do pokemon escolhido será mostrado setas como "V ou ^" nesses numeros. Elas mostram se os numeros do pokemon que precisa adivinhar estão acima ou abaixo do número do pokemon digitado</Text>
        </View>
        
      </View>
    </View>
  );
}



const helpi = StyleSheet.create({
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
    width: 300,
    height: 300,
    marginBottom: -50,
    filter: 'drop-shadow(1px 1px 30px #ffffff), drop-shadow(1px 1px 30px #ffffff)'
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
    width: '80%',
    height: '80%',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20
  },
  textoMaior: {
    fontFamily: 'arial',
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 20
  },
  texto: {
    fontFamily: 'arial',
    marginBlock: 10
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
    zIndex: 2,
  },
  voltarText: {
    fontFamily: 'arial',
    fontWeight: 'bold',
  }
});

