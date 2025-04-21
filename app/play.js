import { StatusBar } from 'expo-status-bar';
import { ScrollView, TouchableOpacity, Image, TextInput, StyleSheet, Text, View, TouchableHighlight  } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useLocalSearchParams } from 'expo-router';
import React, {useEffect, useState} from 'react';
import { useRouter } from 'expo-router'
import { Link } from 'expo-router'


export default function Play() {
    const {generation} = useLocalSearchParams();
    const router = useRouter();
    
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [pokemonName, setPokemonName] = useState('');
    const [ID, setID] = useState('')
    const [type, setType] = useState('')
    const [altura, setAltura] = useState('')
    const [peso, setPeso] = useState('')
    const [novaTentativa, setNovaTentativa] = useState([])
    const [evolutionStage, setEvolutionStage] = useState(1);
    const [geracaozinha, setGeracaozinha] = useState('')
    const [spriteUrl, setSpriteUrl] = useState('')
    const [vencedor, setVencedor] = useState([])
    const [pokeErrado, setPokeErrado] = useState([])

    const geracaoData = {
        g1: 151,
        g2: 100,
        g3: 135,
        g4: 107,
        g5: 156,
        g6: 72,
        g7: 86,
        g8: 96,
        g9: 110
    }

    useEffect(() => {
        const getgen = async () => {
          try {

            const randomico = (maximox) => Math.floor(Math.random() * maximox);
            const geracoesArray = generation?.includes("[") ? JSON.parse(generation) : generation.split(',').map(Number);
            console.log(geracoesArray);
          
            const tamanho = geracoesArray.length;
            const sorteado = randomico(tamanho);
            const geras = geracoesArray[sorteado];

            const url = `https://pokeapi.co/api/v2/generation/${geras}`;
            const response = await fetch(url);
            const json = await response.json();
            setData(json);
          
            console.log('------')
            console.log("Número sorteado:", sorteado);
            console.log("geração escolhida:", geras);
            console.log('------')
    
            const ind = `g${geras}`;
            const geracaoEscolhida = geracaoData[ind]
            console.log(geracaoEscolhida);
    
            const pokemonEscolhido = randomico(geracaoEscolhida)
            console.log(`Pokemon escolhido: ${pokemonEscolhido}`)

            setPokemonName(json.pokemon_species[pokemonEscolhido].name);
            const nomePokemon = json.pokemon_species[pokemonEscolhido].name;

            console.log('------------------------------')


            console.log(json.pokemon_species[pokemonEscolhido].url)
            const responseId = await fetch(json.pokemon_species[pokemonEscolhido].url)  // Aqui é o url do pokemon_species pra pegar id e egg_groupe -> tipo
            const jsonID = await responseId.json(); // Coletando os dados

            const responseEvo = await fetch(jsonID.evolution_chain.url) // Página API que tem o tipo de evolução pegando por dado do pokemon_species a mesma do egg_group
            const jsonEvo = await responseEvo.json(); // Dados da API de evolução coletados coletados



            let evo = 1;

            if (jsonEvo.chain.evolves_to[0]) {
                if (jsonEvo.chain.evolves_to[0].evolves_to[0]) {
                    // Verifica se o nome do Pokémon é o da segunda evolução
                    if (nomePokemon == jsonEvo.chain.evolves_to[0].evolves_to[0].species.name) {
                        evo = 3;
                    }
                }
                // Verifica se o nome do Pokémon é o da primeira evolução
                if (nomePokemon == jsonEvo.chain.evolves_to[0].species.name) {
                    evo = 2;
                }
            }
            

            const urlAltura = `https://pokeapi.co/api/v2/pokemon/${nomePokemon}/`

            const responseStats = await fetch(urlAltura)
            const jsonStats = await responseStats.json();
            const sprite = jsonStats.sprites.other['official-artwork'].front_default || jsonStats.sprites.front_default;

            setSpriteUrl(sprite)
            console.log(sprite)
            setAltura(jsonStats.height)
            setPeso(jsonStats.weight)
            setEvolutionStage(evo)
            setGeracaozinha(geras)

            const tipos = jsonStats.types;
            const nomesTipos = tipos.map((tipo) => tipo.type.name);
            setType(nomesTipos);

            const pokemonDefinido = {
                nome: nomePokemon,
                tipo: type,
                altura: altura,
                peso: peso,
                evolutionStage: evo,
                geracao: geracaoEscolhida,
            }


        } catch (error) {
            console.error(error);
          } finally {
            setLoading(false);
          }
        };
        // {isLoading ? "Carregando informações..." : `SLK AÍ COMPENSA PRO${pokemonName}`} Ignora aqui, só tinha testado algo antes que deu erradissimo depois
        getgen();
      }, [generation]);



    function ganhou() {

        setVencedor([
            <>
                <View key={"Ganhoooou"} style={play.fundoPreto} />
                <View style={play.popUp}>

                    <Text style={play.textoPopUp}>Você acertou!!</Text>
                    {spriteUrl !== '' && (
                        <Image style={play.sprite} source={{uri: spriteUrl}}></Image>
                    )}
                    <Text style={play.nomeDoPoke}>É o {pokemonName}!!</Text>
                    <TouchableHighlight style={play.botaoPopUp} onPress={reiniciar}>
                        <Text style={play.textBtPopUp}>Reiniciar</Text>
                    </TouchableHighlight>
                </View>
            </>
        ]);
    }

    function tentativa(event) {
        const tentativaNome = event.nativeEvent.text.toLowerCase();
        const keyUnica = Date.now();
    
        const buscarDados = async () => {
            try {
                const responseId = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${tentativaNome}`);
                const jsonID = await responseId.json();

                const urlRomana = jsonID.generation.url;
                const numeroGeracao = urlRomana.split('/').filter(Boolean).pop();
    
                const responseEvo = await fetch(jsonID.evolution_chain.url);
                const jsonEvo = await responseEvo.json();
    
                let tentativaEvo = 1;
                if (jsonEvo.chain.evolves_to[0]) {
                    if (jsonEvo.chain.evolves_to[0].evolves_to[0]) {
                        if (tentativaNome === jsonEvo.chain.evolves_to[0].evolves_to[0].species.name) {
                            tentativaEvo = 3;
                        }
                    }
                    if (tentativaNome === jsonEvo.chain.evolves_to[0].species.name) {
                        tentativaEvo = 2;
                    }
                }
    
                const responseStats = await fetch(`https://pokeapi.co/api/v2/pokemon/${tentativaNome}`);
                const jsonStats = await responseStats.json();
    
                const alturaTentativa = jsonStats.height;
                const pesoTentativa = jsonStats.weight;


                const tipos = jsonStats.types;
                const nomesTipos = tipos.map((tipo) => tipo.type.name);


                const spriteTentativa = jsonStats.sprites.other['official-artwork'].front_default
    
                const tentativaInfo = {
                    nome: tentativaNome,
                    tipo: nomesTipos,
                    altura: alturaTentativa,
                    peso: pesoTentativa,
                    evolutionStage: tentativaEvo,
                    geracao: numeroGeracao,
                    sprite: spriteTentativa
                };
    
                // Aqui só fiz pra comparar mesmo
                console.log("Tentativa:", tentativaInfo);
                console.log("Correto:", {
                    nome: pokemonName,
                    tipo: type,
                    altura: altura,
                    peso: peso,
                    evolutionStage: evolutionStage,
                    geracao: geracaozinha
                });

                function compararTipos(tipo1, tipo2) {

                    console.log(`Tipo Correto: ${tipo1} do tipo ${typeof tipo1}`)
                    console.log(`tipo Tentativa: ${tipo2} do tipo ${typeof tipo2}`)

                    const correto = Object.values(tipo1)
                    const tentativa = Object.values(tipo2) 

                    console.log(`Tipo Correto: ${correto} do tipo ${typeof correto}`)
                    console.log(`tipo Tentativa: ${tentativa} do tipo ${typeof tentativa}`)

                
                    const algumIgual = tentativa.some(tipo => correto.includes(tipo));

                    if (JSON.stringify(correto) == JSON.stringify(tentativa)) {
                        return '#55ff55';
                    } else if (algumIgual) {
                        return '#ffaa55'; // laranja ou amaralho sei lá se pelo menos um tipo for igual
                    } else {
                        return '#ff5555'; // vermelho se nenhum tipo for igual nessa budega
                    }
                }
    
                setNovaTentativa([
                    ...novaTentativa,
                    <View key={keyUnica} style={play.conjuntoCaixas}>
                        <TouchableHighlight style={[ play.caixa, { backgroundColor: pokemonName == tentativaNome ? '#55ff55' : '#ff5555'} ]} >
                            <Image style={play.imagemPokemon} source={{uri: tentativaInfo.sprite}} />
                        </TouchableHighlight>
    
                        <TouchableHighlight style={[ play.caixa, { backgroundColor: compararTipos(type, tentativaInfo.tipo)} ]} >
                            <Text style={play.textoBotao}> {tentativaInfo.tipo.join(', ')}</Text>
                        </TouchableHighlight>
    
                        <TouchableHighlight style={[ play.caixa, { backgroundColor: altura == alturaTentativa ? '#55ff55' : '#ff5555'} ]} >
                            <Text style={play.textoBotao}> {tentativaInfo.altura} {alturaTentativa != altura ? alturaTentativa < altura ? '^' : 'V' : ''} </Text>
                        </TouchableHighlight>
    
                        <TouchableHighlight style={[ play.caixa, { backgroundColor: peso == pesoTentativa ? '#55ff55' : '#ff5555'} ]} >
                            <Text style={play.textoBotao}> {tentativaInfo.peso} {pesoTentativa != peso ? pesoTentativa < peso ? '^' : 'V' : ''}</Text>
                        </TouchableHighlight>
    
                        <TouchableHighlight style={[ play.caixa, { backgroundColor: evolutionStage == tentativaEvo ? '#55ff55' : '#ff5555'} ]} >
                            <Text style={play.textoBotao}>{tentativaInfo.evolutionStage} {tentativaEvo != evolutionStage ? tentativaEvo < evolutionStage ? '^' : 'V' : ''}</Text>
                        </TouchableHighlight>
    
                        <TouchableHighlight style={[ play.caixa, { backgroundColor: geracaozinha == numeroGeracao ? '#55ff55' : '#ff5555'} ]} >
                            <Text style={play.textoBotao}>{tentativaInfo.geracao} {numeroGeracao != geracaozinha ? numeroGeracao < geracaozinha ? '^' : 'V' : ''}</Text>
                        </TouchableHighlight>
                    </View>
                ]);
                setPokeErrado(null);
    
            } catch (error) {
                console.log('Erro ao buscar o Pokémon:', error);
                setPokeErrado ([
                    <Text style={{ color: 'red', textAlign: 'center'}}>O nome do pokemon está errado! Tente de novo.</Text>
                ]);
            }
        };
        if (pokemonName == tentativaNome) {
            ganhou();
        }
            buscarDados();
    }


    function reiniciar() {
        router.push ("/")
    }

    return (
        <View style={play.total}>

            <Link style={play.link} href="/">
                <TouchableOpacity style={play.voltar}>
                    <Text style={play.voltarText}>Voltar</Text>
                </TouchableOpacity>
            </Link>

            {vencedor}

            <Image style={play.fundo} source={require('../assets/images/imgs/pokemonBackground.jpeg')}/>
            
            <ScrollView style={play.ScrollView}>
                <View style={play.tela}>
                        
                        <StatusBar backgroundColor="transparent" translucent={true}/>
                        

                        <View style={play.main}>

                            <Text style={play.titulo}>Adivinhe o pokemon!!</Text>

                            <View style={play.form}>
                                <Text style={play.textLabel}>Digite qual pokemon você acha que é</Text>
                                <TextInput style={play.input} placeholder='bulbasaur' onSubmitEditing={tentativa}/>
                                {pokeErrado}
                            </View>
                        </View>
                        <View style={play.tabela}>
                            <View style={play.textsTabelas}>
                                <Text style={play.testTabe}>Pokemon</Text>
                                <Text style={play.testTabe}>Tipo</Text>
                                <Text style={play.testTabe}>Altura</Text>
                                <Text style={play.testTabe}>Peso</Text>
                                <Text style={play.testTabe}>Estágio</Text>
                                <Text style={play.testTabe}>Geração</Text>
                            </View>

                            {novaTentativa}
                        </View>

                </View>
            </ScrollView>
        </View>

    )
}
const play = StyleSheet.create({
    total: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tela: {
        position: 'relative',
        display: 'flex',
        flex: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    popUp: {
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '75%',
        height: '55%',
        backgroundColor: '#ffffff',
        borderRadius: 20,
        zIndex: 2,
    },
    fundoPreto: {
        position: 'absolute',
        top: -44,
        width: 450,
        height: 875,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1
    },
    textoPopUp: {
        fontFamily: 'arial',
        fontWeight: 'bold',
        fontSize: 30,
    },
    sprite: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginVertical: 20
    },
    nomeDoPoke: {
        fontFamily: 'arial',
        fontWeight: 'bold',
        color: '#ff5555',
        fontSize: 30,
    },
    botaoPopUp: {
        backgroundColor: '#185acc',
        padding: 15,
        borderRadius: 12
    },
    textBtPopUp: {
        fontFamily: 'arial',
        fontWeight: 'bold',
        color: '#ffffff'
    },
    fundo: {
        position: 'absolute',
        top: -44,
        height: 1000,
        width: 420,
        zIndex: -1,
        filter: 'blur(1px)',
        filter: 'brightness(0.8)'
    },
    ScrollView: {
        flexGrow: 1,
    },
    main: {
        flex: 1,
        display: 'flex',
        paddingBlock: '30%',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    titulo: {
        fontFamily: 'arial',
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 30,
        filter: 'drop-shadow(1px 1px 20px #000000), drop-shadow(1px 1px 15px #000000)' 
    },
    form: {
        display: 'flex',
        height: 'auto',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        padding: 10,
        borderRadius: 15,
    },
    textLabel: {
        fontFamily: 'arial',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 15,

    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderWidth: 0,
        backgroundColor: '#dddddd',
        borderRadius: 10
    },
    conjuntoCaixas: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-around'

    },
    caixa: {
        width: 50,
        height: 50,
        marginInline: 5,
        marginBlock: 10,
        borderColor: '#000000',
        borderWidth: 2,
        borderRadius: 10, 
        backgroundColor: '#ff5555',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textoBotao: {
        fontFamily: 'arial',
        color: '#ffffff',
        fontSize: 10,
        fontWeight: 'bold'
    },
    imagemPokemon: {
        width: '100%',
        height: '100%',
    },
    tabela: {
        minWidth: '80%',
        height: 'auto',
        paddingBlock: 20,
        paddingInline: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 15
    },
    textsTabelas: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'nowrap'
    },
    testTabe: {
        fontFamily: 'arial',
        fontWeight: 'bold',
        marginInline: 9
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
        boxShadow: '1px 1px 4px 1px #707070'
      },
      voltarText: {
        fontFamily: 'arial',
        fontWeight: 'bold',
      }
})