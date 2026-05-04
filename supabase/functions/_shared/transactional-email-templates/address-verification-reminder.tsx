/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import {
  Body, Button, Container, Head, Heading, Html, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'Quercus'
const SITE_URL = 'https://quercus-capital.lovable.app'

interface AddressVerificationReminderProps {
  firstName?: string
}

const AddressVerificationReminderEmail = ({ firstName }: AddressVerificationReminderProps) => (
  <Html lang="fr" dir="ltr">
    <Head />
    <Preview>Vérification de domicile — finalisez votre dossier réglementaire</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={brand}>QUERCUS</Text>
        <Heading style={h1}>
          {firstName ? `${firstName}, finalisons votre dossier.` : 'Finalisons votre dossier.'}
        </Heading>
        <Text style={text}>
          Pour rester en conformité avec la réglementation française et
          européenne (KYC / LCB-FT), nous devons procéder à la vérification de
          votre domicile.
        </Text>
        <Section style={highlight}>
          <Text style={highlightText}>
            <strong>Document attendu :</strong> un justificatif de domicile de
            moins de 3 mois (facture d'énergie, quittance de loyer, avis
            d'imposition).
          </Text>
        </Section>
        <Text style={text}>
          Sans cette pièce, certaines opérations — notamment les retraits au-delà
          d'un certain seuil — pourront être temporairement suspendues.
        </Text>
        <Section style={ctaSection}>
          <Button href={`${SITE_URL}/dashboard`} style={button}>
            Téléverser mon justificatif
          </Button>
        </Section>
        <Text style={footer}>
          {SITE_NAME} — Régulé en France · CIF / ORIAS
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: AddressVerificationReminderEmail,
  subject: 'Vérification de domicile — Quercus',
  displayName: 'Rappel — justificatif de domicile',
  previewData: { firstName: 'Camille' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Inter', Arial, sans-serif" }
const container = { padding: '20px 25px' }
const brand = { fontSize: '14px', fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: '4px', color: '#18454B', fontWeight: 'bold' as const, margin: '0 0 24px' }
const h1 = { fontSize: '24px', fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic' as const, color: '#18454B', margin: '0 0 20px' }
const text = { fontSize: '14px', color: '#666666', lineHeight: '1.6', margin: '0 0 20px' }
const highlight = { backgroundColor: '#F5F3ED', border: '1px solid #E0DDD5', padding: '16px 20px', margin: '20px 0' }
const highlightText = { fontSize: '13px', color: '#18454B', margin: '0', lineHeight: '1.5' }
const ctaSection = { textAlign: 'center' as const, margin: '32px 0' }
const button = { backgroundColor: '#18454B', color: '#F5F3ED', padding: '14px 28px', fontSize: '14px', textDecoration: 'none', letterSpacing: '1.5px', textTransform: 'uppercase' as const, fontFamily: "'Inter', Arial, sans-serif" }
const footer = { fontSize: '11px', color: '#999999', margin: '30px 0 0', letterSpacing: '0.5px' }