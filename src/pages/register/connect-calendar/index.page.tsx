import { ArrowRight, Check } from 'phosphor-react'
import { Container, Header } from '../styles'
import { Heading, Text, MultiStep, Button } from '@ignite-ui/react'
import { signIn, useSession } from 'next-auth/react'
// import { api } from '@/src/lib/axios'
import { AuthError, ConnectBox, Connetitem } from './styles'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

export default function ConnectCalendar() {
  const session = useSession()
  const router = useRouter()

  const hasAuthError = !!router.query.error
  const isSignedIn = session.status === 'authenticated'

  async function handleConnectCalendar() {
    await signIn('google')
  }

  async function handleNavigateToNextStep() {
    await router.push('/register/time-intervals')
  }

  return (
    <>
      <NextSeo title="Conecte sua agenda do Google | Ignite Call" noindex />

      <Container>
        <Header>
          <Heading as="strong">Conecte sua agenda!</Heading>
          <Text>
            Conecte o seu calendário para verificar automaticamente as horas
            ocupadas e os novos evendos à medida em que são agendados!
          </Text>

          <MultiStep currentStep={2} size={4} />

          <ConnectBox>
            <Connetitem>
              <Text>Google Calendar</Text>
              {isSignedIn ? (
                <Button size={'sm'} disabled>
                  Conectado
                  <Check />
                </Button>
              ) : (
                <Button
                  variant={'secondary'}
                  size={'sm'}
                  onClick={handleConnectCalendar}
                >
                  Conectar
                  <ArrowRight />
                </Button>
              )}
            </Connetitem>

            {hasAuthError && (
              <AuthError size={'sm'}>
                Falha ao se conectar ao Google, verifique se você habilitou as
                permissões de acesso ao Google Calendar
              </AuthError>
            )}

            <Button
              onClick={handleNavigateToNextStep}
              type="submit"
              disabled={!isSignedIn}
            >
              Próximo passo
              <ArrowRight />
            </Button>
          </ConnectBox>
        </Header>
      </Container>
    </>
  )
}
