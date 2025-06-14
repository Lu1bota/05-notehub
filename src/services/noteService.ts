import axios from "axios";
import type { Note } from "../types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

interface FetchNotesValues {
  notes: Note[];
  totalPage: number;
}

interface CreateNoteValues {
  title: string;
  content?: string;
  tag: "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";
}

export async function fetchNotes(
  page: number,
  search?: string
): Promise<FetchNotesValues> {
  const perPage = 12;
  const res = await axios.get<FetchNotesValues>("/notes", {
    params: {
      search: search,
      page: page,
      perPage,
    },
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
  const res = await axios.post<Note>("/notes", {
    title,
    content,
    tag,
  });
  return res.data;
}

export async function deleteNote(id: number): Promise<Note> {
  const res = await axios.delete<Note>(`/notes/${id}`);
  return res.data;
}
