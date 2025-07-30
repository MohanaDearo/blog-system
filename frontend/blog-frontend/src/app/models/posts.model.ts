export interface Post{
  id: number;
  title: string;
  content: string;
  user_id: number;
  created_by: string;
  status: string;
  created_at: string;
  updated_at: string | null;
  approved_by: string | null;
  approved_at: string | null;
  published_at: string | null;
}
