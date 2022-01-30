import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import { ButtonSendSticker } from '../source/components/ButtonSendSticker';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';

import appConfig from '../config.json';
import React from 'react';
import Head from 'next/head'

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzQ3MjUxMSwiZXhwIjoxOTU5MDQ4NTExfQ.hJqhXcQlOP8D5CB4nzdMH0wh-Sfa0aZKVnlgw1Lds-A';
const SUPABASE_URL = 'https://mljyqpsfjrtrrdhamlsp.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


function escutaMensagensEmTempoReal(adicionaMensagem) {
    return supabaseClient
      .from('mensagens')
      .on('INSERT', (respostaLive) => {
        adicionaMensagem(respostaLive.new);
      })
      .subscribe();
  }


export default function ChatPage() {

    const roteamento = useRouter();
    const usuarioLogado = roteamento.query.username;
    const [mensagem, setMensagem] = React.useState('')
    const [listaDeMensagens, setListaDeMensagens] = React.useState([])

    React.useEffect(() => {
        supabaseClient
          .from('mensagens')
          .select('*')
          .order('id', { ascending: false })
          .then(({ data }) => {
            setListaDeMensagens(data);
          });
    
        const subscription = escutaMensagensEmTempoReal((novaMensagem) => {
          console.log('Nova mensagem:', novaMensagem);
          console.log('listaDeMensagens:', listaDeMensagens);
          setListaDeMensagens((valorAtualDaLista) => {
            console.log('valorAtualDaLista:', valorAtualDaLista);
            return [
              novaMensagem,
              ...valorAtualDaLista,
            ]
          });
        });
    
        return () => {
          subscription.unsubscribe();
        }
      }, []);
    
      function handleNovaMensagem(novaMensagem) {
        const mensagem = {
          // id: listaDeMensagens.length + 1,
          de: usuarioLogado,
          texto: novaMensagem,
        };
    
        supabaseClient
          .from('mensagens')
          .insert([
            // Tem que ser um objeto com os MESMOS CAMPOS que você escreveu no supabase
            mensagem
          ])
          .then(({ data }) => {
            console.log('Criando mensagem: ', data);
          });
    
        setMensagem('');
      }
    
      return (
        <Box
          styleSheet={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundImage: `url(https://wallpapercave.com/wp/wp2757874.gif)`,
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
            color: appConfig.theme.colors.neutrals['000']
          }}
        >
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
              borderRadius: '5px',
              backgroundColor: appConfig.theme.colors.primary['500'],
              height: '100%',
              maxWidth: '95%',
              maxHeight: '95vh',
              padding: '32px',
            }}
          >

        <Head>
          <title>Codecord</title>
          <link rel="manifest" href="public/favicon.ico"/>
        </Head>
            <Header />
            <Box
              styleSheet={{
                position: 'relative',
                display: 'flex',
                flex: 1,
                height: '80%',
                backgroundColor: appConfig.theme.colors.primary['400'],
                flexDirection: 'column',
                borderRadius: '5px',
                padding: '16px',
              }}
            >
              <MessageList mensagens={listaDeMensagens} />
              <Box
                as="form"
                styleSheet={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <TextField
                  value={mensagem}
                  onChange={(event) => {
                    const valor = event.target.value;
                    setMensagem(valor);
                  }}
                  onKeyPress={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      handleNovaMensagem(mensagem);
                    }
                  }}
                  placeholder="Insira sua mensagem aqui..."
                  type="textarea"
                  styleSheet={{
                    width: '100%',
                    border: '0',
                    resize: 'none',
                    borderRadius: '5px',
                    padding: '6px 8px',
                    backgroundColor: appConfig.theme.colors.primary['500'],
                    marginRight: '12px',
                    color: appConfig.theme.colors.neutrals[200],
                  }}
                />
                {/* CallBack */}
                <ButtonSendSticker
                  onStickerClick={(sticker) => {
                    handleNovaMensagem(':sticker: ' + sticker);
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      )
    }
    
    function Header() {
      return (
        <>
          <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
            <Text variant='heading5'>
              Chat
            </Text>
            <Button
              variant='tertiary'
              colorVariant='neutral'
              label='Logout'
              href="/"
            />
          </Box>
        </>
      )
    }
    
    function MessageList(props) {
      // console.log(props);
      return (
        <Box
          tag="ul"
          styleSheet={{
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column-reverse',
            flex: 1,
            color: appConfig.theme.colors.neutrals["000"],
            marginBottom: '16px',
          }}
        >
          {props.mensagens.map((mensagem) => {
            return (
              <Text
                key={mensagem.id}
                tag="li"
                styleSheet={{
                  borderRadius: '5px',
                  padding: '6px',
                  marginBottom: '12px',
                  backgroundColor: appConfig.theme.colors.primary['500'],
                }}
              >
                <Box
                  styleSheet={{
                    marginBottom: '8px',
                  }}
                >
                  <Image
                    styleSheet={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      display: 'inline-block',
                      marginRight: '8px',
                    }}
                    src={`https://github.com/${mensagem.de}.png`}
                  />
                  <Text tag="strong">
                    {mensagem.de}
                  </Text>
                  <Text
                    styleSheet={{
                      fontSize: '10px',
                      marginLeft: '8px',
                      color: appConfig.theme.colors.neutrals[300],
                    }}
                    tag="span"
                  >
                    {(new Date().toLocaleDateString())}
                  </Text>
                </Box>
                {mensagem.texto.startsWith(':sticker:')
                  ? (
                    <Image src={mensagem.texto.replace(':sticker:', '')} width='100px' height='100px' />
                  )
                  : (
                    mensagem.texto
                  )}
              </Text>
            );
          })}
        </Box>
      )
    }