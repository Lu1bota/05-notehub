export interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: string;
}

export interface NoteModalFormProps {
  onClose: () => void;
}

export interface CreateNoteValues {
  title: string;
  content?: string;
  tag: "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";
}
