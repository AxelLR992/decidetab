import { Request, Response } from 'express';
import { pool } from '../config/db';

export async function getTestItems(_req: Request, res: Response) {
  try {
    const { rows } = await pool.query(
      'SELECT id, item_number, text, area FROM hereford_items ORDER BY item_number ASC'
    );
    res.json(rows);
  } catch (error) {
    console.error('Error getTestItems:', error);
    res.status(500).json({ message: 'No se pudieron cargar los ítems del test' });
  }
}

export async function getSocioeconomicQuestions(_req: Request, res: Response) {
  try {
    const { rows } = await pool.query(
      `SELECT id, section, question_number, question_text, options
       FROM socioeconomic_questions
       ORDER BY question_number ASC`
    );
    res.json(rows);
  } catch (error) {
    console.error('Error getSocioeconomicQuestions:', error);
    res.status(500).json({ message: 'No se pudieron cargar las preguntas socioeconómicas' });
  }
}
