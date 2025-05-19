import type { HttpContext } from '@adonisjs/core/http'
import Book from '#models/book'
import { createBookValidator, updateBookValidator, deleteBookValidator } from '#validators/book'

export default class BooksController {
  public async index({ response }: HttpContext) {
    const books = await Book.all()
    return response.ok(books)
  }

  public async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createBookValidator)
    const books = await Book.create(payload)
    return response.created({ message: 'Buku berhasil ditambahkan', books })
  }

  public async show({ params, response }: HttpContext) {
    const books = await Book.find(params.id)
    if (!books) {
      return response.notFound({ message: 'Buku tidak ditemukan' })
    }
    return response.ok(books)
  }

  public async update({ params, request, response }: HttpContext) {
    // Validasi data request menggunakan validator
    const data = await request.validateUsing(updateBookValidator)

    const book = await Book.find(params.id)
    if (!book) {
      return response.notFound({ message: 'Buku tidak ditemukan' })
    }

    // Gabungkan data yang divalidasi ke dalam entitas buku
    book.merge(data)
    await book.save()

    return response.ok({ message: 'Buku berhasil diperbarui', book })
  }

 public async destroy({ request, response }: HttpContext) {
  const { params } = await request.validateUsing(deleteBookValidator)
  const book = await Book.find(params.id)
  if (!book) {
    return response.notFound({ message: 'Buku tidak ditemukan' })
  }

  await book.delete()
  return response.ok({ message: 'Buku berhasil dihapus' })
}
}
