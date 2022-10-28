import * as zod from 'zod'

export const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O intervalo do ciclo deve ser no minimo de 5 minutos')
    .max(60, 'O intervalo do ciclo deve ser no máximo de 60 minutos.'),
})

export type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>
