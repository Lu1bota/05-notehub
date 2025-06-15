import axios from "axios";
import type { CreateNoteValues, Note } from "../types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

interface FetchNotesValues {
  notes: Note[];
  totalPages: number;
}

interface ParamsTypes {
  page: number;
  perPage: number;
  search?: string;
}

export async function fetchNotes(
  search: string,
  page: number
): Promise<FetchNotesValues> {
  const perPage = 12;
  const params: ParamsTypes = {
    page,
    perPage,
  };
  if (search?.trim()) {
    params.search = search;
  }
  const res = await axios.get<FetchNotesValues>("/notes", {
    params,
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    },
  });
  return res.data;
}

export async function createNote({
  title,
  content,
  tag,
}: CreateNoteValues): Promise<Note> {
  const params: CreateNoteValues = {
    title,
    content,
    tag,
  };

  const res = await axios.post<Note>("/notes", params, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    },
  });
  return res.data;
}

export async function deleteNote(id: number): Promise<Note> {
  const res = await axios.delete<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    },
  });
  return res.data;
}
