// app/Validators/BookValidator.ts
import vine from '@vinejs/vine'

/**
 * Validasi untuk membuat buku baru
 */
export const createBookValidator = vine.compile(
  vine.object({
    title: vine.string().trim(),
    author: vine.string().trim(),
  })
)

/**
 * Validasi untuk memperbarui buku
 */
export const updateBookValidator = vine.compile(
  vine.object({
    title: vine.string().trim().optional(),
    author: vine.string().trim().optional(),
  })
)

/**
 * Validasi untuk menghapus buku
 */
export const deleteBookValidator = vine.compile(
  vine.object({
    params: vine.object({
      id: vine.number().positive(),
    }),
  })
)
