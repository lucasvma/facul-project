import fs from 'fs'
import path from 'path'

export const CLASSES_PATH = path.join(process.cwd(), 'src/classes')
export const COURSES_PATH = path.join(process.cwd(), 'src/courses')

export const classFilePaths = fs
    .readdirSync(CLASSES_PATH)
    .filter((path) => /\.mdx?$/.test(path))

export const coursesFilePaths = fs
    .readdirSync(COURSES_PATH)
    .filter((path) => /\.mdx?$/.test(path))
