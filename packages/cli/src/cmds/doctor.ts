import Doctor from '../doctor'

export const command = 'doctor'

export const desc = 'Check your project setup for potential problems'

export const handler = async () => {
  await new Doctor().run()
}
