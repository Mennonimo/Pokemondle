# Pokemondle

--ATENÇÃO--
Este projeto foi feito com intuito acadêmico e possivelmente mais tarde possa se tornar um app distribuido.

Inicialmente temos a estrutura das telas compostas por:
- index.js (sendo a primeira tela, a tela inicial)
- selecao.js (Tela referente a seleção de gerações que serão selecionadas para o jogo)
- help.js (Tela de ajuda e explicação de como funciona o jogo/projeto)
- play.js (Tela com as requisições de API e comandos no geral)

as conexões das telas estão entre:

help.js <-> index.js <-> selecao.js <-> play.js

-- Instruções para execução --

para iniciar o projeto digite:
ou
`npx expo start`
ou
`npm run start`

Caso a conexão não funcione muito bem tente por:

`npx expo start --tunnel`

será gerado um codeQr onde baixando no celular o aplicativo

Expo Go
https://play.google.com/store/apps/details?id=host.exp.exponent&pcampaignid=web_share

-- Dependências --

Criação do package.json
`npm init -y`

Importações:
`npm install @expo/vector-icons @react-native-community/blur @react-navigation/bottom-tabs @react-navigation/native expo expo-blur expo-constants expo-font expo-haptics expo-linking expo-router expo-splash-screen expo-status-bar expo-symbols expo-system-ui expo-web-browser react react-dom react-native react-native-gesture-handler react-native-reanimated react-native-restart react-native-safe-area-context react-native-screens react-native-web react-native-webview`

-- Modelo de estrutura: --
Para todas as páginas foi adicionado uma mesma imagem de fundo e para a index e help foram adicionadas a logo Pokemon (Todos os direitos reservados a Pokemon Company)

-- Estrutura index.js: --
Formado por um estrutura de flex com dois botões sendo a principal estrutura, sua principal função é dar um tema direito para o usuáro. Sendo assim o botão Jogar/Play sendo o botão para dar início ao jogo e o botão como jogar servindo como uma explicação melhor para o propósito do jogo
as estruturas usadas para direcional da página contam com botões de TouchableOpacity dentro Link a qual serve como redirecionamento.

-- Estrutura selecao.js: --
- A estrutura da selecao está com algumas funcionalidades a mais e diferenciais de conexão devido a 
necessidade de passar parâmetros para a tela que fará a requisição para a API. A parte de css está simples, é uma View no centro com uma lista flex de gerações com radio.

- Em relação aos radios eles foram gerados através de um for onde faz um looping criando os 9. Na criação inclui também o valor inicial que de início é dada como falsa por um array previamente criado com indices também de acordo com o número criado de botões e todos sendo inicialmente Falses. Também é criado uma variável chamado copia que serve como uma variável para capturar todos os valores do array criado antes e ser possível mudar.

- Para a parte de função dos radio foi feito uma função para toda vez que o radio mudar de valor (o usuário clicar e ele mudar de true para false). Isso se da pela questão do indice em copia. Como copia está possuindo o atual estado dos arrays eu posso pegar o indice em que o array está e juntamente disso na copia e atribuir a ela o valor contrário a ela (se for false no índice então se torna True). Logo após é usado setValor (a qual foi criado junto do valor {aquele que guarda o valor dos indices como true incialmente}) e é guardado usando ele os novos valores do array feitos usando a variável copia.

- Embaixo há um botão com função de confirmar para ir para o jogo. Ao pressionar esse botão é acionada uma função que percorre o array com os indices boolean dos radio e verifica cada um se é true ou false. Todos que forem false ele pega o index desse true e adiciona mais 1 (isso devido ao index começar por 0 e a gerações terem o começo por 1 sendo então o index 0 a geração 1 por exemplo. o index 2 sendo a geração 3 e assim por diante). Com isso ele com um array chamado geracao criado anteriormente inclui com include o numero da geracao caso ele já não esteja adicionado lá antes.

- Por ultimo é usado um router.push importado com: import { useRouter } from 'expo-router' foi definido router como useRouter() para facilitar posteriormente. Ao usar essa função o /play é acionado como pathname a qual é usado para definir o destino de tela e direcionamento a qual se deve ir após clicar. Junto do pathname é passado o params e nele no formato de objeto é passado com o nome atribuido generation a geração com todos os radios que foram selecionados e é claro em JSON.stringify.

- Para evitar erros e problemas com path e etc foi adicionado uma variável chamada valorzinho que quando é detectado na verificação de forEach do array com false e true toda vez que for visto um true é add 1 a variável, se no final não tiver acima de 0 signfica que todo array é false (ou seja, o usuário não apertou em nenhum radio) e uma mensagem dizendo para selecionar no minimo uma função é acionada.

-- Estrutura help.js: --
A estrutura do help está completamente simples, possuindo necessariamente uma view central com textos explicativos, nenhuma função em geral. Unica "função" em si seria o botão de voltar com Link a qual está nas outras demais telas.

-- Estrutura play.js: --
- A estrutura mais complexa e grande do aplicatvo, tentarei ser breve sobre sua explição pois são muitas chamdas de variáveis e funções devido a quantidade de tratamento de dados diversos que são usados.

- De inicio temos as chamadas de variáveis que serão usadas para passar valores com useState seguindo da mesma forma que a selecao (também foi chamado alguns arrays e route)
De inicio temos a interface normal com titulo, o corpo onde terão as comparativas pro usuário e um campo de input para ele tentar a sorte.

- Seguindo temos um objeto que serve como atribuição para o indice maximo de pokemons existentes em cada geração da API (servirá como base para o sistema de aleatoriedade mais tarde).

- Usamos aqui o useEffect para requisiçõees assincronas com a api. apartir daí começamos as importações usando o fetch e com a conversão dos valores JSON. e usando as variáveis de set. Em geral as estruturas que foram necessárias pegar ao carregar imediatamente a página foram uma geração aleatória escolhida dos radio. Logo após o indice de um pokemon com base na geração decidida aleatóriamente e com isso também seu indice aleatório. utilizando dessa página do nome do pokemon junto dessas outras informações foi percebido que algumas informações foram necessárias acessar esquemas dentro de objetos do array onde lá mostrava url para outras páginas com mais informações do pokemon, então era necessario pegar o url pela API e com esse url fazer a requisição e pegar o valor desse url. Ou seja, uma página da API servia como acesso para a outra. O tipo do pokemon foi necessario ussar algo que percorre um array devido a um pokemon poder ter mais de um tipo.
- Com esse sistema definido, foi basicamente reusado esse sistema para quando o usuário inserir um input, porém remodelado para variaveis condizentes e o sistema ficar limpo. 

- Para comparação de valores do pokemon falado pelo usuário para o pokemon correto selecionado pelo sistema foi necessário apenas um comparativo para cada campo onde a cor seria de acordo com cada valor, usado também "setas" ou até mesmo o V como se fosse uma seta para indicar se o valor é acima ou abaixo.
Para a comparativa dos tipos do pokemon foi criada uma função a parte para que dependendo de com for os tipos ele tenha uma cor diferente. No caso para a comparativa, se os valores forem iguais retorna verde, se forem diferentes retorna vermelho, se um dos valores contidos no array então se torna laranja.

- Assim que o nome do pokemon que a pessoa tentou, condizer com o pokemon correto, o código envia para ele uma View sobrepondo todas as outras onde possui um botão para reinicar, cujo volta a tela de início.
