import { Box, Button, Text, TextField, Image, Icon } from '@skynexui/components';
import React from 'react';
import { useRouter } from 'next/router';
import appConfig from '../config.json';
import Head from 'next/head'

const GithubField = (props) => {
  return(
    <Text tag="a" href={"https://github.com/matheusdias20"} target="_blank"   variant="body4" styleSheet={{
      backgroundColor: appConfig.theme.colors.primary['500'],
      border: '1px solid',
      borderColor: appConfig.theme.colors.primary['100'],
      color:appConfig.theme.colors.primary['100'],
      padding: ' 0.5rem 0.8rem',
      display:'flex',
      alignItems:'center',
      gap:'0.8rem',
      borderRadius: '1000px',
      cursor: 'pointer',
      textDecoration: 'none',
      hover: {
        backgroundColor: appConfig.theme.colors.primary['100'],
        color: appConfig.theme.colors.primary['500'],
        borderColor: appConfig.theme.colors.primary['500'],
      }
    }}>
      {props.children}
    </Text>
  )
}



export default function PaginaInicial() {
    // const username = 'matheusdias20';
    const [username, setUsername] = React.useState('');
    const roteamento = useRouter();

    return (
      <>
        <Box
          styleSheet={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundImage: 'url(https://wallpapercave.com/wp/wp2757874.gif)',
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
          }}
        >

        <Head>
          <title>Codecord</title>
          <link rel="manifest" href="public/favicon.ico"/>
        </Head>
          <Box
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              width: '100%', maxWidth: '700px',
              borderRadius: '5px', padding: '32px', margin: '16px',
              boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
              backgroundColor: appConfig.theme.colors.primary['600'],
            }}
          >
            {/* Formulário */}
            <Box
              as="form"
              onSubmit={function (event) {
                event.preventDefault();
                roteamento.push(`/chat?username=${username}`)
              }}
              styleSheet={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
              }}
            >
              <Text styleSheet={{ marginBottom: '18px', fontSize: '32px', color: appConfig.theme.colors.primary['050'] }}>Boas-vindas de volta!</Text>
              <Text variant="body3"  styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.primary['200'] }}>
              <GithubField ><Icon name="FaGithub" size="2.0ch" />{username || "matheusdias20"}</GithubField>
              </Text>
  
              <TextField
                value={username}
                onChange={function handler (event) {
                  const valor = event.target.value
                  setUsername(valor)
                }}
                placeholder='Digite seu usuário do github'
                fullWidth
                textFieldColors={{
                  neutral: {
                    textColor: appConfig.theme.colors.neutrals['000'],
                    mainColor: appConfig.theme.colors.primary[500],
                    mainColorHighlight: appConfig.theme.colors.primary['010'],
                    backgroundColor: appConfig.theme.colors.primary['500'],
                    border: '1px solid',
                    borderColor: appConfig.theme.colors.primary['100'],
                  },
                }}
              />
              <Button
                type='submit'
                label='Entrar'
                fullWidth
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals["000"],
                  mainColor: appConfig.theme.colors.primary['100'],
                  mainColorLight: appConfig.theme.colors.primary[400],
                  mainColorStrong: appConfig.theme.colors.primary[400],
                }}
              />
            </Box>
            {/* Formulário */}
  
  
            {/* Photo Area */}
            <Box
              styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '200px',
                padding: '16px',
                backgroundColor: appConfig.theme.colors.primary['500'],
                border: '1px solid',
                borderColor: appConfig.theme.colors.primary['100'],
                borderRadius: '10px',
                flex: 1,
                minHeight: '240px',
              }}
            >
              <Image
                styleSheet={{
                  borderRadius: '50%',
                  marginBottom: '16px',
                }}
                src={`https://github.com/${username}.png`}
              />
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[200],
                  backgroundColor: appConfig.theme.colors.primary['100'],
                  padding: '3px 10px',
                  borderRadius: '1000px'
                }}
              >
                {username}
              </Text>
            </Box>
            {/* Photo Area */}
          </Box> 
        </Box>
      </>
    );
}