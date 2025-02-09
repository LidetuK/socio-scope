
export type MetadataField = {
  id: string;
  field_name: string;
  data_type: string;
  description: string | null;
  default_value: string | null;
  created_at: string;
  updated_at: string;
};

export type MetadataDatasetLink = {
  id: string;
  metadata_field_id: string;
  dataset_name: string;
  created_at: string;
};

export type FileUpload = {
  id: string;
  filename: string;
  file_path: string;
  file_type: string;
  data_type: string;
  uploaded_by: string | null;
  created_at: string;
};
