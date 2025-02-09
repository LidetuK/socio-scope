
import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import type { FileUpload } from '@/types/database';

interface FileUploadProps {
  onUploadComplete?: (filePath: string) => void;
  allowedTypes?: string[];
}

const FileUpload = ({ 
  onUploadComplete,
  allowedTypes = ['.csv', '.xlsx', '.json', '.xml']
}: FileUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileExt = file.name.split('.').pop()?.toLowerCase();
    if (!fileExt || !allowedTypes.includes(`.${fileExt}`)) {
      toast.error('Invalid file type. Please upload a CSV, Excel, JSON, or XML file.');
      return;
    }

    setIsUploading(true);
    try {
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const { data, error } = await supabase.storage
        .from('data_uploads')
        .upload(fileName, file);

      if (error) throw error;

      const { error: dbError } = await supabase
        .from('file_uploads')
        .insert({
          filename: file.name,
          file_path: fileName,
          file_type: fileExt,
          data_type: 'demographics',
          uploaded_by: (await supabase.auth.getUser()).data.user?.id
        } as FileUpload);

      if (dbError) throw dbError;

      toast.success('File uploaded successfully');
      onUploadComplete?.(fileName);
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(error.message || 'Error uploading file');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="relative">
      <input
        type="file"
        accept={allowedTypes.join(',')}
        onChange={handleFileUpload}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        disabled={isUploading}
      />
      <div className="border-2 border-dashed border-gray-200 rounded-lg p-12 text-center">
        <div className="mx-auto flex flex-col items-center">
          <Upload className="w-12 h-12 text-gray-400 mb-4" />
          <p className="text-sm text-gray-600">
            {isUploading ? 'Uploading...' : 'Click to upload or drag and drop'}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Supported formats: CSV, Excel, JSON, XML
          </p>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
