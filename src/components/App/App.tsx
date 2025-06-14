import { keepPreviousData, useQuery } from "@tanstack/react-query";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox";
import css from "./App.module.css";
import { fetchNotes } from "../../services/noteService";
import { useState } from "react";

export default function App() {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useQuery({
    queryKey: ["notes", currentPage, query],
    queryFn: () => fetchNotes(currentPage),
    placeholderData: keepPreviousData,
  });

  const notesRequest = data?.notes ?? [];
  const totalPage = data?.totalPage || 1;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox />
        <Pagination
          totalPages={totalPage}
          currentPage={currentPage}
          setPage={() => setCurrentPage(currentPage + 1)}
        />
        <button className={css.button}>Create note +</button>
      </header>
      <NoteList notes={notesRequest} />
    </div>
  );
}
