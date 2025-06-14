// import { keepPreviousData, useQuery } from "@tanstack/react-query";
// import { fetchNotes } from "../../services/noteService";
import css from "./NoteList.module.css";
import type { Note } from "../../types/note";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ["notes"],
  //   queryFn: () => fetchNotes(),
  //   enabled: data.length > 0,
  //   placeholderData: keepPreviousData,
  // });

  return (
    <ul className={css.list}>
      {notes &&
        notes.map((note) => (
          <li className={css.listItem} key={note.id}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
              <button className={css.button}>Delete</button>
            </div>
          </li>
        ))}
    </ul>
  );
}
