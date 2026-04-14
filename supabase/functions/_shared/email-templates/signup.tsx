/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'

interface SignupEmailProps {
  siteName: string
  siteUrl: string
  recipient: string
  confirmationUrl: string
  token?: string
}

export const SignupEmail = ({
  siteName,
  siteUrl,
  recipient,
  confirmationUrl,
  token,
}: SignupEmailProps) => (
  <Html lang="fr" dir="ltr">
    <Head />
    <Preview>Votre code de vérification pour {siteName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={brand}>QUERCUS</Text>
        <Heading style={h1}>Confirmez votre adresse email</Heading>
        <Text style={text}>
          Merci de vous être inscrit sur{' '}
          <Link href={siteUrl} style={link}><strong>{siteName}</strong></Link>.
        </Text>
        <Text style={text}>
          Veuillez confirmer votre adresse email (
          <Link href={`mailto:${recipient}`} style={link}>{recipient}</Link>
          ) en entrant le code ci-dessous :
        </Text>
        {token ? (
          <Section style={codeSection}>
            <Text style={codeText}>{token}</Text>
          </Section>
        ) : (
          <Text style={text}>
            <Link href={confirmationUrl} style={link}>Cliquez ici pour vérifier votre email</Link>
          </Text>
        )}
        <Text style={footer}>
          Ce code expire dans 15 minutes. Si vous n'avez pas créé de compte, vous pouvez ignorer cet email.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default SignupEmail

const main = { backgroundColor: '#ffffff', fontFamily: "'Inter', Arial, sans-serif" }
const container = { padding: '20px 25px' }
const brand = { fontSize: '14px', fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: '4px', color: '#18454B', fontWeight: 'bold' as const, margin: '0 0 24px' }
const h1 = { fontSize: '22px', fontWeight: 'bold' as const, fontFamily: "'Playfair Display', Georgia, serif", color: '#18454B', margin: '0 0 20px' }
const text = { fontSize: '14px', color: '#666666', lineHeight: '1.5', margin: '0 0 25px' }
const link = { color: '#18454B', textDecoration: 'underline' }
const codeSection = { textAlign: 'center' as const, margin: '20px 0 30px', padding: '20px', backgroundColor: '#F5F3ED', border: '1px solid #E0DDD5' }
const codeText = { fontSize: '32px', fontFamily: "'JetBrains Mono', 'Courier New', monospace", fontWeight: 'bold' as const, letterSpacing: '8px', color: '#18454B', margin: '0' }
const footer = { fontSize: '12px', color: '#999999', margin: '30px 0 0' }
