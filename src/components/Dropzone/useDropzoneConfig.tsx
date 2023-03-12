import { useCallback, useMemo, useState } from 'react'
import { FileError, FileRejection } from 'react-dropzone'
import { nanoid } from 'nanoid'
import { useTranslation } from 'react-i18next'
import { uniq } from 'lodash'

type TPrevValue<T> = (prevValue: T) => T

type TDropzoneConfig = {
  files: { id: string; file: File }[]
  errors: FileError[]
  setFiles: (value: { id: string; file: File }[] | TPrevValue<{ id: string; file: File }[]>) => void
  setErrors: (value: FileError[] | TPrevValue<FileError[]>) => void
  onDrop: (acceptedFiles: File[], rejectFiles: FileRejection[]) => void
  stringErrors: string[]
}

export const useDropzoneConfig = (maxFiles: number, maxSize: number): TDropzoneConfig => {
  const { t } = useTranslation('common')
  const [files, setFiles] = useState<{ id: string; file: File }[]>([])
  const [errors, setErrors] = useState<FileError[]>([])

  const onDrop = useCallback(
    (acceptedFiles: any, rejectFiles: any) => {
      setErrors(rejectFiles.map((item: FileRejection) => item.errors).flat(Infinity))
      if (files.length + acceptedFiles.length > maxFiles) {
        setErrors((prevState) => [
          ...prevState,
          {
            code: 'too-many-files',
            message: t(`dropzone.errors.too-many-files`, { files: maxFiles, size: maxSize })
          }
        ])
        return
      }
      setFiles((prevState) => [
        ...prevState,
        ...acceptedFiles.map((file: File) => ({
          id: nanoid(5),
          file
        }))
      ])
    },
    [files.length, t, maxFiles, maxSize]
  )

  const stringErrors = useMemo(
    () =>
      uniq(
        errors.map((error) => {
          if (error.code) {
            return t(`dropzone.errors.${error.code}`, { files: maxFiles, size: maxSize })
          }
          return error.message
        })
      ),
    [errors, t, files, maxFiles, maxSize]
  )

  return { files, setFiles, errors, setErrors, stringErrors, onDrop }
}
