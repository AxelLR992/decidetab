import { Request, Response } from 'express';
import { z } from 'zod';
import { calculateResults } from '../services/scoring.service';

const payloadSchema = z.object({
  sex: z.enum(['M', 'F']),
  testAnswers: z.record(z.string(), z.number().min(1).max(5)),
  socioeconomicAnswers: z.record(z.string(), z.string())
});

export async function postCalculateResults(req: Request, res: Response) {
  try {
    const parsed = payloadSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: 'Payload inválido',
        errors: parsed.error.flatten()
      });
    }

    const response = await calculateResults(parsed.data);
    return res.json(response);
  } catch (error) {
    console.error('Error postCalculateResults:', error);
    return res.status(500).json({ message: 'No se pudieron calcular los resultados' });
  }
}
