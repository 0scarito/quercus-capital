/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import {
  Body, Button, Container, Head, Heading, Html, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'Quercus'
const SITE_URL = 'https://quercus-capital.lovable.app'

interface WelcomeProps {
  firstName?: string
}

const WelcomeEmail = ({ firstName }: WelcomeProps) => (
  <Html lang="fr" dir="ltr">
    <Head />
    <Preview>Bienvenue chez {SITE_NAME} — votre quête d'excellence commence</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={brand}>QUERCUS</Text>
        <Heading style={h1}>
          {firstName ? `Bienvenue, ${firstName}.` : 'Bienvenue.'}
        </Heading>
        <Text style={text}>
          Votre compte est désormais validé. Nous sommes honorés de vous compter
          parmi nos clients et de vous accompagner dans votre quête d'excellence
          patrimoniale.
        </Text>
        <Text style={text}>
          Votre espace Quercus est prêt. Vous pouvez à présent effectuer votre
          premier dépôt et activer nos solutions de rendement.
        </Text>
        <Section style={ctaSection}>
          <Button href={`${SITE_URL}/dashboard`} style={button}>
            Accéder à mon espace
          </Button>
        </Section>
        <Text style={text}>
          Notre équipe reste à votre disposition pour toute question — votre
          conseiller dédié vous contactera dans les prochains jours.
        </Text>
        <Text style={footer}>
          {SITE_NAME} — Régulé en France · CIF / ORIAS
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: WelcomeEmail,
  subject: 'Bienvenue chez Quercus',
  displayName: 'Bienvenue (compte validé)',
  previewData: { firstName: 'Camille' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Inter', Arial, sans-serif" }
const container = { padding: '20px 25px' }
const brand = { fontSize: '14px', fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: '4px', color: '#18454B', fontWeight: 'bold' as const, margin: '0 0 24px' }
const h1 = { fontSize: '24px', fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic' as const, color: '#18454B', margin: '0 0 20px' }
const text = { fontSize: '14px', color: '#666666', lineHeight: '1.6', margin: '0 0 20px' }
const ctaSection = { textAlign: 'center' as const, margin: '32px 0' }
const button = { backgroundColor: '#18454B', color: '#F5F3ED', padding: '14px 28px', fontSize: '14px', textDecoration: 'none', letterSpacing: '1.5px', textTransform: 'uppercase' as const, fontFamily: "'Inter', Arial, sans-serif" }
const footer = { fontSize: '11px', color: '#999999', margin: '30px 0 0', letterSpacing: '0.5px' }