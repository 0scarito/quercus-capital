/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import {
  Body, Button, Container, Head, Heading, Html, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'Quercus'
const SITE_URL = 'https://quercus-capital.lovable.app'

interface DepositReminderProps {
  firstName?: string
}

const DepositReminderEmail = ({ firstName }: DepositReminderProps) => (
  <Html lang="fr" dir="ltr">
    <Head />
    <Preview>Activez votre rendement — effectuez votre premier dépôt</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={brand}>QUERCUS</Text>
        <Heading style={h1}>
          {firstName ? `${firstName}, donnons vie à votre compte.` : 'Donnons vie à votre compte.'}
        </Heading>
        <Text style={text}>
          Votre espace {SITE_NAME} est ouvert depuis quelques jours. Pour activer
          vos solutions de rendement et commencer à générer des intérêts dès
          aujourd'hui, il ne vous reste qu'une étape : effectuer un premier dépôt.
        </Text>
        <Section style={highlight}>
          <Text style={highlightText}>
            Le dépôt est sécurisé, traçable et entièrement réversible.
          </Text>
        </Section>
        <Section style={ctaSection}>
          <Button href={`${SITE_URL}/dashboard`} style={button}>
            Effectuer mon premier dépôt
          </Button>
        </Section>
        <Text style={text}>
          Une question ? Votre conseiller dédié reste joignable directement
          depuis votre espace.
        </Text>
        <Text style={footer}>
          {SITE_NAME} — Régulé en France · CIF / ORIAS
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: DepositReminderEmail,
  subject: 'Activez votre rendement chez Quercus',
  displayName: 'Rappel — premier dépôt',
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