import { keepPreviousData, useQuery } from "@tanstack/react-query";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox";
import css from "./App.module.css";
import { fetchNotes } from "../../services/noteService";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import NoteModal from "../NoteModal/NoteModal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function App() {
  const [query, setQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [debounceQuery] = useDebounce(query, 500);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: ["notes", currentPage, debounceQuery],
    queryFn: () => fetchNotes(debounceQuery, currentPage),
    placeholderData: keepPreviousData,
  });

  function openModal() {
    setIsModalOpen(!isModalOpen);
  }
  function closeModal() {
    setIsModalOpen(false);
  }

  const notesRequest = data?.notes ?? [];
  const totalPage = data?.totalPages ?? 1;

  function handleChange(newQuery: string) {
    setQuery(newQuery);
  }

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleChange} />
        {isSuccess && (
          <Pagination
            totalPages={totalPage}
            currentPage={currentPage}
            setPage={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {isLoading && <Loader />}
      {isError && <ErrorMessage message={error.message} />}
      {isSuccess && <NoteList notes={notesRequest} />}
      {isModalOpen && <NoteModal onClose={closeModal} />}
    </div>
  );
}
