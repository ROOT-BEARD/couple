import { Card, Button, Typography } from "@heroui/react";
import { Upload, CircleX } from "lucide-react";
import { useRef } from "react";

export default function ImageUploader({setImage, image, handleRemove}:{setImage:(string:File)=>void, image:File|null, handleRemove:()=>void}){
    const inputRef = useRef<HTMLInputElement>(null);


    const handleUpload = () => {
        if(inputRef.current){
            inputRef.current.click();
        }
    };

    return(
        <Card variant='tertiary' className="aspect-square w-80 flex flex-col justify-center items-center">
            {!image?<div>
                <Button onClick={handleUpload} className="hover:scale-110" variant='ghost'>
                    <Upload/>
                    <Typography type='body-sm'>Upload Photo</Typography>
                </Button>
                <input 
                type="file"
                id="file"
                accept="image/*"
                ref={inputRef}
                hidden
                onChange={(event)=> {
                    const uploadImg = event.target.files?.[0];
                    if(uploadImg){ 
                        setImage(uploadImg);
                    }
                }}/>
            </div>:
            <div>
                <div className="flex flex-col relative aspect-square w-full overflow-hidden rounded-3xl">
                    <img className="h-full w-full object-cover" src={URL.createObjectURL(image)}/>
                </div>
                <Button className=' self-end' onClick={handleRemove} variant="danger-soft">
                    <CircleX/>
                </Button>
            </div>
            }
        </Card>
    );
}