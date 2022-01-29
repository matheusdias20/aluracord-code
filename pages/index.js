import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import { useRouter } from 'next/router';
import appConfig from '../config.json';



function Title(props) {

    const Tag = props.tag

    return (
        <>
            <h1> {props.children} </h1>

            <style jsx>{`
                ${Tag} {
                    color: ${appConfig.theme.colors.neutrals['700']};
                    font-size: 24px;
                    font-weight: 600;
                }
                `}
            </style>
        </>
    )
}

export default function PaginaInicial() {
    // const username = 'matheusdias20';
    const [username, setUsername] = React.useState('matheusdias20');
    const roteamento = useRouter();

    return (
      <>
        <Box
          styleSheet={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundImage: 'url(https://preview.redd.it/t7b5j2cqpce21.png?auto=webp&s=722e7dcb6a150fc6be3513ab186cc60db0a9ab27)',
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
          }}
        >
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
                roteamento.push(`/chat?username=${userna}`)
              }}
              styleSheet={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
              }}
            >
              <Title>Boas-vindas de volta!</Title>
              <Text variant="body3"  styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[700] }}>
                {appConfig.name}
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
                    textColor: appConfig.theme.colors.neutrals[700],
                    mainColor: appConfig.theme.colors.primary[500],
                    mainColorHighlight: appConfig.theme.colors.primary[800],
                    backgroundColor: appConfig.theme.colors.primary[400],
                  },
                }}
              />
              <Button
                type='submit'
                label='Entrar'
                fullWidth
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals["000"],
                  mainColor: appConfig.theme.colors.primary[900],
                  mainColorLight: appConfig.theme.colors.primary[800],
                  mainColorStrong: appConfig.theme.colors.primary[800],
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
                borderColor: appConfig.theme.colors.primary['500'],
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
                  backgroundColor: appConfig.theme.colors.neutrals[900],
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