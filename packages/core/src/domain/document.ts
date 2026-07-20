export interface Document {
  id: string;
  type: string;
  title: string;
  status: "draft" | "review" | "approved";
}
