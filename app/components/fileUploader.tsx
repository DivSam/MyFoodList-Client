"use-client"

import { ChangeEvent, useRef, useState } from "react";
import { MdAttachFile } from "react-icons/md"

interface FileUploaderProps {
    onUpload: (fileList: FileList | null) => void;
}

export default function FileUploader(props: FileUploaderProps) {
    const [fileList, setFileList] = useState<FileList | null>(null); 
    const files = fileList ? [...fileList] : [];
    
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFileList(e.target.files);
        props.onUpload(e.target.files);
    };
    
    return (
        <>
            <label htmlFor="file-input">
                <div className="flex text-sm">
                    <MdAttachFile size={20} className="mr-2 -ml-1"/>
                    <span>Upload files (pics!!)</span>
                    {
                        files.length > 0 && 
                            <span className="ml-3 italic text-green-600">&#x2713; {files.length} file(s) uploaded</span>
                    }
                </div>
            </label>
            <input 
                id="file-input" 
                className="hidden" 
                type="file" 
                onChange={handleFileChange}
                multiple
            />
            
        </>
    );
}