// 1 Importamos en paquete de Cliente de Prisma
const { PrismaClient } = require("@prisma/client")

// 2 Creamos una instancia del Cliente de Prisma
const prisma = new PrismaClient()

// 3 Uilizamos los metodos de Prisma para Buscar todos los Links de la Tabla y mostrarlos en consola
async function main() {
    const newLink = await prisma.link.create({
        data: {
            description: 'Fullstack tutorial for GraphQL',
            url: 'www.howtographql.com',
        },
    })
    const allLinks = await prisma.link.findMany()
    console.log(allLinks)
}

// 4 Nuestra funcion principal controla capturando si existio algun error.
main()
  .catch(e => {
    throw e
  })
  // 5 Nuestra funcion principal controla el cierre de la coneccion que tiene Prisma.
  .finally(async () => {
    await prisma.$disconnect()
  })