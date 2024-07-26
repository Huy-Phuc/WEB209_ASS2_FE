import * as z from 'zod'

export const productSchema = z.object({
	title: z.string().min(6),
	price: z.number().min(0),
	thumbnail: z.string().optional()
})

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6).max(255)
})

// export const registerSchema = z.object({
// 	email: z.string().email(),
// 	password: z.string().min(6).max(255),
// 	confirmPass: z.string().min(6).max(255)
// })

export const categorySchema = z.object({
	title: z.string().min(6, 'Tên danh mục phải có ít nhất 6 ký tự!'),
	description: z.string(),
	// description: z.string().optional(),
	// slug: z.string().optional()
	slug: z.string()
})

export const registerSchema = z
	.object({
		email: z.string().email(),
		password: z.string().min(6),
		confirmPass: z.string().min(6)
	})
	.refine((data) => data.password === data.confirmPass, {
		message: "Passwords don't match",
		path: ['confirmPass']
	})
