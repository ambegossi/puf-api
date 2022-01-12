import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { prisma } from '~/data'

export const login = async ctx => {
  try {
    const { email, password } = ctx.request.body

    const [user] = await prisma.user.findMany({
      where: {
        email,
        password,
      },
    })

    if (!user) {
      ctx.status = 404
      return
    }

    const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET)

    ctx.body = { user, token }
  } catch (error) {
    ctx.status = 500
    ctx.body = 'Ops! Algo deu errado, tente novamente.'
  }
}

export const list = async ctx => {
  try {
    const users = await prisma.user.findMany()
    ctx.body = users
  } catch (error) {
    ctx.status = 500
    ctx.body = 'Ops! Algo deu errado, tente novamente.'
  }
}

export const create = async ctx => {
  try {
    const { name, email, password } = ctx.request.body

    const saltRounds = 10

    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    delete user.password

    ctx.body = user
  } catch (error) {
    ctx.status = 500
    ctx.body = 'Ops! Algo deu errado, tente novamente.'
  }
}

export const update = async ctx => {
  const data = {
    name: ctx.request.body.name,
    email: ctx.request.body.email,
  }

  try {
    const user = await prisma.user.update({
      where: { id: ctx.params.id },
      data,
    })

    ctx.body = user
  } catch (error) {
    ctx.status = 500
    ctx.body = 'Ops! Algo deu errado, tente novamente.'
  }
}

export const remove = async ctx => {
  try {
    const user = await prisma.user.delete({
      where: { id: ctx.params.id },
    })

    ctx.body = user
  } catch (error) {
    ctx.status = 500
    ctx.body = 'Ops! Algo deu errado, tente novamente.'
  }
}
