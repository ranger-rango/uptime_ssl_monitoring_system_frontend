import { createFileRoute, redirect } from '@tanstack/react-router'
import '../App.css'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    throw redirect({
      to: '/auth/login',
    })
  },
})

