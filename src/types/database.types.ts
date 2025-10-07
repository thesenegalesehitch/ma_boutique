export type Json =
| string
| number
| boolean
| null
| { [key: string]: Json | undefined }
| Json[];

export interface Database {
public: {
Tables: {
categories: {
Row: {
id: string;
name: string;
description: string | null;
created_at: string;
};
Insert: {
id?: string;
name: string;
description?: string | null;
created_at?: string;
};
Update: {
id?: string;
name?: string;
description?: string | null;
created_at?: string;
};
};
products: {
Row: {
id: string;
name: string;
description: string;
price: number;
image_url: string;
stock: number;
is_featured: boolean;
created_at: string;
updated_at: string;
category_id?: string;
};
Insert: Omit<Database["public"]["Tables"]["products"]["Row"], "id" | "created_at" | "updated_at">;
Update: Partial<Database["public"]["Tables"]["products"]["Row"]>;
};
reviews: {
Row: {
id: string;
product_id: string;
author: string;
content: string;
rating: number;
is_approved: boolean;
created_at: string;
};
Insert: Omit<Database["public"]["Tables"]["reviews"]["Row"], "id" | "created_at">;
Update: Partial<Database["public"]["Tables"]["reviews"]["Row"]>;
};
};
};
}
